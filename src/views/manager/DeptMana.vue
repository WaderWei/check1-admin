<template>
  <div>
    <admin-back-bar :title="title" :is-show-back="isShowBack" @backEvent="backUpDept" @receive="operateDept"></admin-back-bar>
    <div style="height: 3px;background-color: #e0e0e0"></div>
    <bread-crumbs :bcText="bcText" v-if="bcText!==''"></bread-crumbs>
    <dept-list :list="deptList" @receive="showNextDept"></dept-list>
    <div class="c-sheet">
      <md-action-sheet
        v-model="isShoeSheet"
        :title="opeTitle"
        :default-index="defaultIndex"
        cancel-text="取消"
        :options="options"
        @selected="$_selected"
        :large-radius="true"
      ></md-action-sheet>
    </div>
    <md-dialog
      title=""
      :closable="true"
      v-model="basicDialog.open"
      :btns="basicDialog.btns"
    >
      <md-input-item
        title="部门名称"
        placeholder="请输入"
        :maxlength="10"
        v-model="deptNameValue"
        clearable
      ></md-input-item>
    </md-dialog>
  </div>
</template>

<script>
import AdminBackBar from '../../components/AdminBackBar'
import BreadCrumbs from '../../components/BreadCrumbs'
import DeptList from '../../components/DeptList'
import { ActionSheet, Dialog, InputItem } from 'mand-mobile'
export default {
  name: 'DeptMana',
  components: {
    [ActionSheet.name]: ActionSheet,
    [InputItem.name]: InputItem,
    [Dialog.name]: Dialog,
    AdminBackBar,
    BreadCrumbs,
    DeptList
  },
  data () {
    return {
      basicDialog: {
        open: false,
        btns: [
          {
            text: '取消',
            handler: this.onBasicCancel
          },
          {
            text: '确认',
            handler: this.onBasicConfirm
          }
        ]
      },
      isShoeSheet: false,
      opeTitle: '',
      defaultIndex: 0,
      options: [
        { label: '添加', value: 0 },
        { label: '修改', value: 1 },
        { label: '删除', value: 2 }
      ],
      selectOptionId: -1,
      currentDeptId: 0,
      deptSaveUpArr: [],
      title: '部门管理',
      isShowBack: false,
      bcText: '',
      deptList: [],
      deptNameValue: '',
      selectDeptName: ''
    }
  },
  created () {
    this.getDeptList(0)
  },
  methods: {
    getDeptList (parentId) {
      this.$http.get('tree/selectDep', { params: {
        parentId: parentId
      } }).then(res => {
        if (res.code === 1) {
          this.deptList = res.data
          // console.log(this.deptList)
        } else {
          this.deptList = []
        }
      })
    },
    operateDept () {
      this.$_showActionSheet()
    },
    showNextDept (dept) {
      this.deptSaveUpArr.push({ id: this.currentDeptId, bc: this.bcText }) // 将部门id保存到集合中
      this.currentDeptId = dept.id
      if (this.bcText === '') {
        this.bcText = dept.depName
      } else {
        this.bcText += ' > ' + dept.depName
      }
      this.getDeptList(this.currentDeptId)
    },
    backUpDept () {
      const rst = this.deptSaveUpArr.pop()
      this.currentDeptId = rst.id
      this.bcText = rst.bc
      this.getDeptList(this.currentDeptId)
    },
    $_showActionSheet () {
      this.isShoeSheet = true
    },
    $_selected (item) {
      this.selectOptionId = item.value
      switch (item.value) {
        // 添加  弹框
        case 0: {
          this.deptNameValue = ''
          this.basicDialog.open = true
          break
        }
        // 修改 弹框
        case 1: {
          const selectArr = this.deptList.filter(d => d.isChecked)
          if (selectArr.length === 1) {
            this.basicDialog.open = true
            this.selectDeptName = selectArr[0].depName
            this.deptNameValue = selectArr[0].depName
          } else {
            Dialog.alert({
              title: ' ',
              content: '提示：请先在列表选中某一项且只能一项，才能进行这项操作！',
              confirmText: '确定'
            })
          }
          break
        }
        //  删除
        case 2: {
          const selectArr = this.deptList.filter(d => d.isChecked)
          if (selectArr.length >= 1) {
            Dialog.confirm({
              title: ' ',
              content: '您确定要删除选中的部门吗？',
              onConfirm: () => {
                const depIds = selectArr.map(function (item) {
                  return item.id
                })
                // console.log(depIds)
                this.crudDep('tree/crudDep', 3, null, depIds, null)
              }
            })
          } else {
            Dialog.alert({
              title: ' ',
              content: '提示：请在列表中选择要操作的项目',
              confirmText: '确定'
            })
          }
          break
        }
      }
    },
    onBasicConfirm () {
      if (this.deptNameValue === '') {
        Dialog.alert({
          title: ' ',
          content: '提示：部门名称不能为空！',
          confirmText: '确定'
        })
        return
      } else if (this.selectDeptName === this.deptNameValue) {
        Dialog.alert({
          title: ' ',
          content: '提示：部门名称不能和修改前相同！',
          confirmText: '确定'
        })
        return
      } else {
        const url = 'tree/crudDep'
        let type = -1
        let partentDepId = this.currentDeptId
        let depIds = []
        let depName
        if (this.selectOptionId === 0) { // 增加
          type = 1
          depName = this.deptNameValue
        } else if (this.selectOptionId === 1) { // 修改
          type = 2
          depName = this.deptNameValue
          depIds = this.deptList.filter(s => s.isChecked).map(function (item) {
            return item.id
          })
        } else { // 删除
        }
        this.crudDep(url, type, partentDepId, depIds, depName)
      }
      this.basicDialog.open = false
    },
    onBasicCancel () {
      this.basicDialog.open = false
    },
    crudDep (url, type, partentDepId, depIds, depName) {
      let qs = this.$qs
      let data = {
        type: type,
        partentDepId: partentDepId,
        depIds: depIds,
        depName: depName
      }
      this.$http.post(url, qs.stringify(data, { indices: false })
      ).then(res => {
        if (res.code === 1) {
          Dialog.alert({
            title: ' ',
            content: res.msg,
            confirmText: '确定',
            onConfirm: () => {
              this.getDeptList(this.currentDeptId)
            }
          })
        } else {
          Dialog.failed({
            title: ' ',
            content: '失败信息:' + res.msg,
            confirmText: '确定'
          })
        }
      })
    }
  },
  watch: {
    currentDeptId () {
      if (this.currentDeptId === 0) {
        this.isShowBack = false
      } else {
        this.isShowBack = true
      }
    }
  }
}
</script>

<style scoped>

</style>
