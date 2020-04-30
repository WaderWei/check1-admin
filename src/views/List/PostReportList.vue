<template>
  <div class="create-contain">
    <div class="c-btn">
      <md-button type="link" icon="edit"  style="padding: 15px;color: red" @click="operate">操作</md-button>
    </div>
    <div class="c-list" v-if="reportList.length > 0">
      <md-scroll-view
        :auto-reflow="true"
        :scrolling-x="false"
      >
        <md-field :title=checkName>
          <md-check-list
            v-model="selector"
            class="scroll-view-item"
            iconPosition="left"
            :options="reportList"
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
// 1.未提交(编辑不新增) 2.已提交(编辑新增) 3.作废
const optionsAll = [
  { label: '查看', value: 0, tableState: ['未提交', '已提交', '作废'] },
  { label: '编辑', value: 1, tableState: ['未提交'] },
  { label: '提交', value: 2, tableState: ['未提交'] },
  // { label: '作废', value: 3, tableState: ['已提交'] }, 去掉此功能
  { label: '删除', value: 4, tableState: ['未提交'] }, // , '作废'
  { label: '发送', value: 5, tableState: ['已提交'] },
  { label: '据此重做', value: 6, tableState: ['已提交', '作废'] }
]
export default {
  name: 'PostReportList',
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
      reportList: [],
      opeTitle: '',
      isShoeSheet: false,
      defaultIndex: 0,
      options: [],
      reportListFlag: -1,
      checkName: '所有的报告列表'
    }
  },
  created () {
    this.reportListFlag = sessionStorage.getItem('reportListFlag')
    // const checkId = this.$route.query.checkId
    this.getList()
  },
  mounted () {
  },
  computed: {
    spliceTitle: function () {
      if (this.opeTitle.indexOf('能否') > 0) {
        return this.opeTitle
      } else {
        return '[' + this.opeTitle + '] 报告的操作权限'
      }
    }
  },
  methods: {
    getList () {
      this.checkName = (parseInt(this.reportListFlag) !== -1 ? sessionStorage.getItem('reportNameFlag') : '所有') + '的报告列表'
      this.$http.get('report/findReportList', { params: {
        creatorId: getUser()[0].userId,
        checkId: this.reportListFlag
      } })
        .then(res => {
          if (res.code === 1) {
            this.reportList = res.data
          } else {
            this.reportList = []
          }
        })
    },
    operate () {
      if (this.selector.length === 0) {
        Dialog.alert({
          title: ' ',
          content: '请先选择要操作的报告',
          confirmText: '确定'
        })
        return
      }
      this.options = []
      // 当只选中一个时
      if (this.selector.length === 1) {
        const selectItem = this.reportList.find(c => c.value === this.selector[0])
        this.opeTitle = selectItem.brief
        const filterOpe = optionsAll.filter(o => o.tableState.indexOf(selectItem.brief) !== -1)
        this.options = filterOpe
      } else {
        let selectItems = findObjArrWithIdArr(this.reportList, this.selector)
        // 都是未提交的检查表
        if (!(selectItems.find(s => s.brief !== '未提交'))) {
          this.options = optionsAll.filter(o => o.value === 2 || o.value === 4)
          this.opeTitle = '批量: 未提交'
        } else if (!(selectItems.find(s => s.brief !== '已提交'))) {
          this.options = optionsAll.filter(o => o.value === 3 || o.value === 5)
          this.opeTitle = '批量: 已提交'
        } else {
          this.opeTitle = '请检查你选择的报告能否进行批量操作'
        }
      /* else if (!(selectItems.find(s => s.brief !== '作废'))) {
          this.options = optionsAll.filter(o => o.value === 4)
          this.opeTitle = '批量: 作废'
        } */
      }
      this.$_showActionSheet()
    },
    $_showActionSheet () {
      this.isShoeSheet = true
    },
    $_selected (item) {
      switch (item.value) {
        // 查看
        case 0: {
          this.$router.push({ name: 'reportLookOver', query: { id: this.selector[0] } })
          break
        }
        // 编辑
        case 1: {
          this.$router.push({ name: 'createReport', query: { id: this.selector[0] } })
          break
        }
        // 提交
        case 2: {
          this.commonOperate('report/operateReport', 'put', {
            reportIds: this.selector,
            status: 2,
            userId: getUser()[0].userId
          }, '提交')
          break
        }
        // 作废
        case 3: {
          Dialog.confirm({
            title: ' ',
            content: '您确定要进行【作废】吗？',
            onConfirm: () => {
              this.commonOperate('report/operateReport', 'put', {
                reportIds: this.selector,
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
              this.commonOperate('report/deleteReport', 'delete', {
                reportIds: this.selector
              }, '删除')
            }
          })
          break
        }
        // 发送
        case 5: {
          this.$router.push({ name: 'sentSelectUsers', query: { ids: this.selector } })
          break
        }
        // 编辑新增
        case 6: {
          Toast.loading('加载中...')
          this.$http.get('report/editAddReport', {
            params: { reportId: this.selector[0] }
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
