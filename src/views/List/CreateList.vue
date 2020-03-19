<template>
    <div class="create-contain">
      <div class="c-btn">
        <md-button type="link" icon="right" style="padding: 15px;color: red" @click="addCheck">新增</md-button>
        <md-button type="link" icon="edit"  style="padding: 15px;color: red" @click="operate">操作</md-button>
      </div>
      <div class="c-list" v-if="createList.length > 0">
        <md-scroll-view
          :auto-reflow="true"
          :scrolling-x="false"
        >
          <md-field title="我创建的表">
            <md-check-list
              v-model="selector"
              class="scroll-view-item"
              iconPosition="left"
              :options="createList"
            />
          </md-field>
          <md-field style="margin-top: 50px;visibility: hidden" title="Adjustment Style">
          </md-field>
        </md-scroll-view>
      </div>
      <div  v-else style="width: 100%;">
        <md-result-page></md-result-page>
      </div>
      <div class="c-sheet">
        <md-action-sheet
          v-model="isShoeSheet"
          :title="spliceTitle"
          :default-index="defaultIndex"
          cancel-text="取消"
          :options="options"
          @selected="$_selected"
          :large-radius="true"
        ></md-action-sheet>
      </div>
    </div>
</template>

<script>
import { Button, Icon, Field, ActionSheet, ScrollView, CheckList, ResultPage, Dialog, Toast } from 'mand-mobile'
import { findObjArrWithIdArr, getUser } from '../../utils'
const selectUser = 'selectUser'
const checkName = 'checkName'
const selectDept = 'selectDept'
const reportPeriod = 'reportPeriod'
const msgTipKey = 'msgTipKey'
// 1.未提交(编辑不新增) 2.已提交(编辑新增) 3.作废
const optionsAll = [
  { label: '查看', value: 0, tableState: ['未提交', '已提交', '作废'] },
  { label: '编辑', value: 1, tableState: ['未提交'] },
  { label: '提交', value: 2, tableState: ['未提交'] },
  { label: '作废', value: 3, tableState: ['已提交'] },
  { label: '删除', value: 4, tableState: ['未提交'] }, // , '作废'
  { label: '据此重做', value: 5, tableState: ['已提交'] }
]
export default {
  name: 'CreateList',
  components: {
    [ActionSheet.name]: ActionSheet,
    [Field.name]: Field,
    [Button.name]: Button,
    [ScrollView.name]: ScrollView,
    [CheckList.name]: CheckList,
    [ResultPage.name]: ResultPage,
    [Dialog.name]: Dialog,
    [Icon.name]: Icon,
    [Toast.name]: Toast
  },
  data () {
    return {
      selector: [],
      createList: [],
      opeTitle: '',
      isShoeSheet: false,
      defaultIndex: 0,
      options: []
    }
  },
  created () {
    sessionStorage.removeItem('first')
    sessionStorage.removeItem(checkName)
    sessionStorage.removeItem(selectDept)
    sessionStorage.removeItem(reportPeriod)
    sessionStorage.removeItem(selectUser + 2)
    sessionStorage.removeItem(selectUser + 3)
    sessionStorage.removeItem(selectUser + 4)
    sessionStorage.removeItem('sCheckId')
    sessionStorage.removeItem(msgTipKey)
  },
  mounted () {
    this.getList()
  },
  computed: {
    spliceTitle: function () {
      if (this.opeTitle.indexOf('能否') > 0) {
        return this.opeTitle
      } else {
        return '[' + this.opeTitle + '] 检查表的操作权限'
      }
    }
  },
  methods: {
    getList () {
      // todo 这里还要给roleType
      this.$http.get('check/findCheckList', { params: {
        userId: getUser()[0].userId,
        roleType: 1
      } })
        .then(res => {
          if (res.code === 1) {
            this.createList = res.data
          } else {
            this.createList = []
          }
        })
    },
    operate () {
      if (this.selector.length === 0) {
        Dialog.alert({
          title: ' ',
          content: '请先选择要操作的检查表',
          confirmText: '确定'
        })
        return
      }
      this.options = []
      // 当只选中一个时
      if (this.selector.length === 1) {
        const selectItem = this.createList.find(c => c.value === this.selector[0])
        this.opeTitle = selectItem.brief
        const filterOpe = optionsAll.filter(o => o.tableState.indexOf(selectItem.brief) !== -1)
        this.options = filterOpe
      } else {
        /* { label: '提交', value: 2, tableState: ['未提交'] },
        { label: '作废', value: 3, tableState: ['已提交'] },
        { label: '删除', value: 4, tableState: ['未提交'] } */
        let selectItems = findObjArrWithIdArr(this.createList, this.selector)
        // 都是未提交的检查表
        if (!(selectItems.find(s => s.brief !== '未提交'))) {
          this.options = optionsAll.filter(o => o.value === 2 || o.value === 4)
          this.opeTitle = '批量: 未提交'
        } else if (!(selectItems.find(s => s.brief !== '已提交'))) {
          this.options = optionsAll.filter(o => o.value === 3)
          this.opeTitle = '批量: 已提交'
        } else {
          this.opeTitle = '请检查你选择的检查表能否进行批量操作'
        }
      /* else if (!(selectItems.find(s => s.brief !== '作废'))) {
          this.options = optionsAll.filter(o => o.value === 4)
          this.opeTitle = '批量: 作废'
        } */
      }
      this.$_showActionSheet()
    },
    addCheck () {
      this.$router.push({ name: 'createCheckTb', query: { checkId: '-1' } }) // -1表示增加
    },
    $_showActionSheet () {
      this.isShoeSheet = true
    },
    $_selected (item) {
      switch (item.value) {
        // 查看
        case 0: {
          this.$router.push({ name: 'lookOver', query: { id: this.selector[0] } })
          break
        }
        // 编辑
        case 1: {
          this.$router.push({ name: 'createCheckTb', query: { checkId: this.selector[0] } })
          break
        }
        // 提交
        case 2: {
          this.commonOperate('check/operateCheck', 'put', {
            checkIds: this.selector,
            status: 2
          }, '提交')
          break
        }
        // 作废
        case 3: {
          Dialog.confirm({
            title: ' ',
            content: '您确定要进行【作废】吗？',
            onConfirm: () => {
              this.commonOperate('check/operateCheck', 'put', {
                checkIds: this.selector,
                status: 3
              }, '作废')
            }
          })
          break
        }
        // 删除
        case 4: {
          Dialog.confirm({
            title: ' ',
            content: '您确定要进行【删除】吗？',
            onConfirm: () => {
              this.commonOperate('check/deleteCheck', 'delete', {
                checkIds: this.selector
              }, '删除')
            }
          })
          break
        }
        // 编辑新增
        case 5: {
          Toast.loading('加载中...')
          this.$http.get('check/editNew', {
            params: { checkId: this.selector[0] }
          }).then(res => {
            Toast.hide()
            if (res.code === 1) {
              Dialog.alert({
                title: ' ',
                content: '据此重做成功',
                onConfirm: () => {
                  this.getList()
                  this.selector = []
                }
              })
            } else {
              Dialog.failed({
                title: ' ',
                content: '据此重做失败:' + res.msg
              })
            }
          })
          break
        }
      }
    },
    commonOperate (url, way, params, tip) {
      let qs = this.$qs
      this.$http(url, {
        method: way,
        params: params,
        paramsSerializer: params => {
          return qs.stringify(params, { indices: false })
        } })
        .then(res => {
          if (res.code === 1) {
            Dialog.alert({
              title: ' ',
              content: tip + '成功',
              onConfirm: () => {
                this.getList()
                this.selector = []
              }
            })
          } else {
            Dialog.failed({
              title: ' ',
              content: tip + '失败:' + res.msg
            })
          }
        })
    }
  }
}
</script>

<style scoped>
  .create-contain{}
  .c-btn{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    position: fixed;
    right: 0;
    top: 35px;
    z-index: 100;
  }
  .c-item{
    text-align: left;
  }
  .c-list{
    text-align: left;
    height: 1100px;
  }
</style>
