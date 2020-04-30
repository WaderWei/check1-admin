<template>
  <div>
    <admin-back-bar :title="title" :is-show-back="isShowBack" @backEvent="backUpDept" @receive="operateDept"></admin-back-bar>
    <div style="height: 3px;background-color: #e0e0e0"></div>
    <bread-crumbs :bcText="bcText" v-if="bcText!==''"></bread-crumbs>
    <post-list :dept-list="deptList" :post-list="postList" @receive="showNextDept"></post-list>
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
        title="岗位名称"
        placeholder="请输入"
        :maxlength="10"
        v-model="postNameValue"
        clearable
      ></md-input-item>
    </md-dialog>
  </div>
</template>

<script>
import AdminBackBar from '../../components/AdminBackBar'
import BreadCrumbs from '../../components/BreadCrumbs'
import PostList from '../../components/PostList'
import { ActionSheet, Dialog, InputItem } from 'mand-mobile'
export default {
  name: 'PostMana',
  components: {
    [ActionSheet.name]: ActionSheet,
    [InputItem.name]: InputItem,
    [Dialog.name]: Dialog,
    AdminBackBar,
    BreadCrumbs,
    PostList
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
      currentDeptId: 0,
      deptSaveUpArr: [],
      title: '岗位管理',
      isShowBack: false,
      bcText: '',
      deptList: [],
      postList: [],
      postNameValue: '',
      selectPostName: '',
      selectOptionId: -1
    }
  },
  created () {
    this.getDeptList(0)
    this.getPostList(0)
  },
  methods: {
    getDeptList (parentId) {
      this.$http.get('tree/selectDep', { params: {
        parentId: parentId
      } }).then(res => {
        if (res.code === 1) {
          this.deptList = res.data
        } else {
          this.deptList = []
        }
      })
    },
    getPostList (parentId) {
      this.$http.get('tree/selectJob', { params: {
        depId: parentId
      } }).then(res => {
        if (res.code === 1) {
          this.postList = res.data
        } else {
          this.postList = []
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
      this.getPostList(this.currentDeptId)
    },
    backUpDept () {
      const rst = this.deptSaveUpArr.pop()
      this.currentDeptId = rst.id
      this.bcText = rst.bc
      this.getDeptList(this.currentDeptId)
      this.getPostList(this.currentDeptId)
    },
    $_showActionSheet () {
      this.isShoeSheet = true
    },
    $_selected (item) {
      this.selectOptionId = item.value
      switch (item.value) {
        // 添加  弹框
        case 0: {
          this.postNameValue = ''
          this.basicDialog.open = true
          break
        }
        // 修改 弹框
        case 1: {
          const selectArr = this.postList.filter(d => d.isChecked)
          if (selectArr.length === 1) {
            this.basicDialog.open = true
            this.selectPostName = selectArr[0].jobName
            this.postNameValue = selectArr[0].jobName
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
          const selectArr = this.postList.filter(d => d.isChecked)
          if (selectArr.length >= 1) {
            Dialog.confirm({
              title: ' ',
              content: '您确定要删除选中的岗位吗？',
              onConfirm: () => {
                const jobIds = selectArr.map(function (item) {
                  return item.id
                })
                this.crudJob('tree/crudJob', 3, null, jobIds, null)
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
      if (this.postNameValue === '') {
        Dialog.alert({
          title: ' ',
          content: '提示：岗位名称不能为空！',
          confirmText: '确定'
        })
        return
      } else if (this.selectPostName === this.postNameValue) {
        Dialog.alert({
          title: ' ',
          content: '提示：岗位名称不能和修改前相同！',
          confirmText: '确定'
        })
        return
      } else {
        const url = 'tree/crudJob'
        let type = -1
        let depId = this.currentDeptId
        let jobIds = []
        let postName
        if (this.selectOptionId === 0) { // 增加
          type = 1
          postName = this.postNameValue
        } else if (this.selectOptionId === 1) { // 修改
          type = 2
          postName = this.postNameValue
          jobIds = this.postList.filter(s => s.isChecked).map(function (item) {
            return item.id
          })
        } else { // 删除
        }
        this.crudJob(url, type, depId, jobIds, postName)
      }
      this.basicDialog.open = false
    },
    onBasicCancel () {
      this.basicDialog.open = false
    },
    crudJob (url, type, depId, jobIds, jobName) {
      let qs = this.$qs
      let data = {
        type: type,
        depId: depId,
        jobIds: jobIds,
        jobName: jobName
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
              this.getPostList(this.currentDeptId)
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
