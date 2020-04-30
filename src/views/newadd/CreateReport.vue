<template>
  <div class="cp-contain">
    <lg-preview></lg-preview>
    <div class="cp-backBar">
      <back-bar v-bind:title="title" v-bind:type="type" ></back-bar>
    </div>
    <div class="cp-body">
      <md-scroll-view
        ref="msv"
        :auto-reflow="true"
        :scrolling-x="false"
        @end-reached="$_onEndReached"
        :end-reached-threshold="300"
      >
        <md-field>
          <div style="font-weight: bold">
            <div style="font-size: 0.32rem">报告名称</div>
            <md-textarea-item
              ref="reportName"
              title=""
              autosize
              :rows="2"
              align="right"
              v-model="reportName"
              placeholder="请输入"
            />
            <md-input-item title="检查表名称" align="right" :solid="false" :value="check.name" disabled/>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <md-input-item title="适用部门" align="right" :value="check.deptName" disabled/>
            <!--<div style="height: 1px;background-color: #e0e0e0"></div>
            <md-input-item title="报告周期" align="right" :value="check.checkPeriod" disabled/>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <md-input-item title="短信提醒" align="right" v-model="msgTipStr" disabled/>-->
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <md-input-item title="检查周期" align="right" :value="msgSelectPeriod== null?'':msgSelectPeriod" disabled/>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <md-input-item title="生效日期" align="right" :value="check.takeEffectTime== null ? '' :check.takeEffectTime" disabled/>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <user-item title="检查人" :user-list="check.checkUserRoleList"></user-item>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <user-item title="执行人" :user-list="check.exeUserRoleList"></user-item>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <user-item title="接收人" :user-list="check.receiveUserRoleList"></user-item>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <user-item title="监督人" :user-list="check.superVersionUserRoleList"></user-item>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <user-item title="统计" :user-list="allTotal"></user-item>
            <div style="background-color: #f1f1f1;display: flex;padding: 12px">
              <span style="font-size: 16px">总金额：</span><span style="font-size: 16px">{{this.check.money}}元</span>
            </div>
            <div style="background-color: #dddddd;display: flex;padding: 12px">
              <span style="font-size: 16px">总分数：</span><span style="font-size: 16px">{{this.check.grade}}分</span>
            </div>
          </div>
          <div class="cp-checkContain">
            <div v-for="n in check.examineCheckItemVos" :key="n.id">
              <md-button type="warning" style="font-size: 16px; margin-top: 30px;background-color: white;color: red">{{n.number}}</md-button>
              <div class="cp-item">
                <div style="font-size: 0.32rem">检查内容</div>
                <md-textarea-item style="clear: both;"
                                  title=""
                                  :autosize="true"
                                  :value="n.checkContent"
                                  disabled
                />
                <div style="height: 1px;background-color: #e0e0e0;margin-bottom: 15px"></div>
                <md-textarea-item title="检查方式" :autosize="true" :value="n.checkWay" disabled/>
                <div style="height: 1px;background-color: #e0e0e0;margin-bottom: 15px"></div>
                <div style="font-size: 0.32rem">奖罚标准</div>
                <md-textarea-item title=""
                                  :autosize="true"
                                  :value="n.bonus+''"
                                  disabled
                />
                <div style="height: 1px;background-color: #e0e0e0"></div>
                <md-input-item title="奖罚单位" align="right" :value="n.unit === '1' ? '分': ( n.unit === '2' ? '元' : '其它')" disabled/>
                <!--<div style="height: 1px;background-color: #e0e0e0"></div>
                <md-input-item title="证据必填" align="right" :value="n.isProof? '是':'否'" disabled/>-->
                <div style="height: 1px;background-color: #e0e0e0"></div>
                <div style="font-size: 18px;margin-top: 10px">检查图片</div>
                <div class="cp-img-viewer">
                  <img-viewer :images="n.examineImageVos"></img-viewer>
                </div>
                <multi-file-uploader :is-uploader-show="false" style="margin-bottom: 10px"
                                     :is-delete-btn-show="false" :item-id="n.checkItemId"></multi-file-uploader>
                <div style="height: 1px;background-color: #e0e0e0;margin-bottom: 15px"></div>
                <div style="font-size: 0.32rem">检查证据</div>
                <md-textarea-item ref="proofContent" title=""
                  autosize :rows="2" v-model="n.proofContent" placeholder="请输入" @blur="reviseBoard"/>
                <img-reader :images="n.proofImgs"></img-reader>
                <div style="height: 1px;background-color: #e0e0e0"></div>
                <md-input-item title="上次结果" align="right" :value="n.isQualified ? n.isQualified : '无'" disabled style="clear: both"/>
                <div style="height: 1px;background-color: #e0e0e0"></div>
                <md-field-item title="本次结果" align="right">
                  <md-radio name="0" @input="disqualified(n)" v-model="n.thisResult" label="不合格" inline/>
                  <md-radio name="1" @input="qualified(n)" v-model="n.thisResult" label="合格" inline/>
                </md-field-item>
                <div style="height: 1px;background-color: #e0e0e0"></div>
                <md-input-item type="number" :is-highlight="true" :title="n.unit === '1' ? '扣除分数':'扣除金额'" align="right" placeholder="请输入" v-model="n.judgeBonus"
                               @blur="reviseBoard"/>
                <div style="height: 1px;background-color: #e0e0e0"></div>
                <md-input-item title="检查时间" align="right" :value="n.updateTime" disabled></md-input-item>
                <div style="height: 1px;background-color: #e0e0e0"></div>
                <md-button style="margin: 10px 0" :type="n.updateTime ? 'warning': 'default'" @click="Checked(n)">{{n.updateTime ? '已检查': '检查完毕'}}</md-button>
                <div v-if="n.reportItemId !== null" class="c-uploader">
                  <div style="font-size: 16px;margin:20px 0 -10px 0">可以选择需要上传的附件</div>
                  <multi-file-uploader :is-uploader-show="n.reportItemId !== null" style="margin-bottom: 10px"
                                       :is-delete-btn-show="true" :item-id="n.reportItemId" :type-flag="4"></multi-file-uploader>
                </div>
              </div>
            </div>
          </div>
         <!-- <div class="cp-btn">
            <md-button type="default" round @click="saveReport">保存</md-button>
          </div>-->
        </md-field>
        <md-scroll-view-more
                             slot="more"
                             :is-finished="isFinished"
                             loading-text="加载中..."
                             finished-text="全部已加载"
        >
        </md-scroll-view-more>
        <md-field style="margin-top: 50px;visibility: hidden" title="Adjustment Style">
        </md-field>
      </md-scroll-view>
    </div>
  </div>
</template>

<script>
import BackBar from '../../components/BackBar'
import ImgViewer from '../../components/ImgViewer'
import { Icon, Field, ScrollView, FieldItem, TextareaItem, ImageViewer, InputItem, Button, Dialog, Radio, ScrollViewMore, Switch } from 'mand-mobile'
import MdField from 'mand-mobile/components/field/index'
import MdFieldItem from 'mand-mobile/components/field/item'
import ImgReader from '../../components/ImgReader'
import { getUser, getCurrentTime, KeyboardJackUp } from '../../utils'
import UserItem from '../../components/UserItem'
import MultiFileUploader from '../../components/MultiFileUploader'
let pageCount = 5
let pageIndex = 0
export default {
  name: 'CreateReport',
  components: {
    MdFieldItem,
    MdField,
    ImgReader,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [ScrollView.name]: ScrollView,
    [TextareaItem.name]: TextareaItem,
    [ImageViewer.name]: ImageViewer,
    [InputItem.name]: InputItem,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [ScrollViewMore.name]: ScrollViewMore,
    [Radio.name]: Radio,
    [Switch.name]: Switch,
    MultiFileUploader,
    BackBar,
    ImgViewer,
    UserItem
  },
  data () {
    return {
      title: '新增检查报告',
      type: 1,
      isViewerShow: false,
      viewerIndex: 0,
      reportName: '',
      id: null,
      checkId: -1,
      isFinished: false,
      check: {},
      count: '',
      allTotal: [],
      msgTipStr: '不提醒',
      msgSelectPeriod: ''
    }
  },
  created () {
    this.id = this.$route.query.id
    pageIndex = 0
    pageCount = 5
    if (!this.id) {
      this.id = -1
      this.checkId = this.$route.query.checkId
      // 根据checkId查询所有要展示的数据
      this.getCheckById()
    } else {
      this.title = '编辑检查报告'
      this.getReportById()
    }
  },
  computed: {
  },
  methods: {
    async getCheckById () {
      const result = await this.$http.get('checkItem/examineCheck', {
        params: { id: this.checkId }
      })
      if (result.code === 1) {
        this.check = result.data
        this.reportName = this.check.reportName
        /* if (this.check.msgTipWay != null) {
          if (this.check.msgTipWay === '1') {
            this.msgTipStr = '每月最后一天'
          } else if (this.check.msgTipWay === '3') {
            this.msgTipStr = '不提醒'
          } else {
            let msgArr = this.check.msgTipWay.split(',')
            if (msgArr[0] === '0') {
              this.msgTipStr = '每周星期' + msgArr[1]
            } else if (msgArr[0] === '2') {
              this.msgTipStr = '每月' + msgArr[1] + '号'
            } else {
              this.msgTipStr = '异常短信提醒'
            }
          }
        } else {

        } */
        if (this.check.periodWay != null) {
          let msgArr = this.check.periodWay.split(',')
          let dayNum = parseInt(msgArr[1])
          if (msgArr[0] === '1') {
            this.msgSelectPeriod = '每周第' + dayNum + '天'
          } else if (msgArr[0] === '2') {
            this.msgSelectPeriod = '每月第' + dayNum + '天'
          } else if (msgArr[0] === '3') {
            this.msgSelectPeriod = '每季第' + dayNum + '天'
          } else {
            this.msgSelectPeriod = '无'
          }
        }
        this.$nextTick(() => {
          this.allTotal.push({ lastName: '总共' + this.check.examineCount + '项' })
        })
        // this.getExamineCheckItmById(this.checkId, pageIndex, pageCount)
      } else {
      }
    },
    // 获得所有检查项
    async getExamineCheckItmById (id, index, count) {
      const result = await this.$http.get('checkItem/examineCheckItem', {
        params: {
          id: id,
          index: index,
          count: count
        }
      })
      if (result.code === 1) {
        if (result.data.examineCheckItemVos) {
          this.check.examineCheckItemVos = result.data.examineCheckItemVos
        }
      }
    },
    getReportById () {
      this.$http.get('report/findReport', {
        params: { reportId: this.id }
      }).then(res => {
        if (res.code === 1) {
          this.check = res.data
          this.reportName = res.data.reportName
          this.count = '合格数：' + this.check.qualifiedTotal + '；不合格数：' + (this.check.countReportItem - this.check.qualifiedTotal) + '；合格率：' +
            (this.check.qualifiedRate * 100).toFixed(2) + '%；最终金额：' + this.check.calamount + '元；最终分数：' + this.check.calScore + '分。'
          // this.getReportItmById(this.id, pageIndex, pageCount)
          this.$nextTick(() => {
            this.allTotal.push({ lastName: '总共' + this.check.countReportItem + '项' })
          })
        }
      })
    },
    // 查到检查表和报告的所有项
    getReportItmById (id, index, count) {
      this.$http.get('report/findReportItem', {
        params: {
          reportId: id,
          index: index,
          count: count
        }
      }).then(res => {
        if (res.code === 1) {
          if (res.data.examineCheckItemVos) {
            this.check.examineCheckItemVos = res.data.examineCheckItemVos
          }
        }
      })
    },
    $_onEndReached () {
      if (this.isFinished) {
        return
      }
      let url = 'checkItem/examineCheckItem'
      let params = {
        id: this.checkId,
        index: pageIndex,
        count: pageCount
      }
      if (this.id !== -1) {
        url = 'report/findReportItem'
        params = {
          reportId: this.id,
          index: pageIndex,
          count: pageCount
        }
      }
      this.getItem(url, params)
    },
    generateTime (item) {
      this.$set(item, 'updateTime', getCurrentTime(true))
    },
    reviseBoard () {
      KeyboardJackUp()
    },
    getItem (url, params) {
      const that = this
      this.$http.get(url, {
        params: params
      }).then(res => {
        if (res.code === 1) {
          if (res.data.examineCheckItemVos && res.data.examineCheckItemVos.length > 0) {
            for (let i = 0; i < res.data.examineCheckItemVos.length; i++) {
              if (!that.check.examineCheckItemVos) {
                that.check.examineCheckItemVos = []
              }
              that.check.examineCheckItemVos.push(res.data.examineCheckItemVos[i])
            }
          } else {
            this.isFinished = true
          }
          pageIndex += pageCount
          this.$refs.msv.finishLoadMore()
        } else {
          this.isFinished = true
          this.$refs.msv.finishLoadMore()
        }
      })
    },
    disqualified (n) {
      n.judgeBonus = n.bonus
    },
    qualified (n) {
      n.judgeBonus = '0.00'
    },
    Checked (item) {
      if (!this.valid(item)) {
        return
      }
      // 生成检查的时间
      this.generateTime(item)
      let checkId = this.check.id
      let creatorId = getUser()[0].userId
      let reportName = this.reportName
      let reportItems = []
      let url = ''
      if (!this.id) {
        this.id = -1
      }
      if (!item.reportItemId) {
        item.reportItemId = -1
      }
      if (this.id !== -1 && item.reportItemId !== -1) {
        url = 'report/editReport'
      } else {
        url = 'report/addReport'
      }
      let newObject = {}
      newObject.checkItemId = item.checkItemId
      newObject.examineImageVoList = item.proofImgs.reader0 // 2
      newObject.proofContent = item.proofContent // 1
      newObject.thisResult = item.thisResult // 3
      newObject.judgeBonus = item.judgeBonus // 4
      newObject.updateTime = item.updateTime
      newObject.id = item.reportItemId
      reportItems.push(newObject)
      // 保存报表
      this.$http.post(url,
        {
          reportId: this.id,
          checkId: checkId,
          creatorId: creatorId,
          reportName: reportName,
          reportItemQos: reportItems
        }
      ).then(res => {
        let that = this
        if (res.code === 1) {
          Dialog.alert({
            title: ' ',
            content: item.reportItemId === -1 ? '检查完毕' : '编辑成功',
            confirmText: '确定',
            onConfirm: () => {
              that.id = res.data.reportId
              item.reportItemId = res.data.reportItemId
            }
          })
        } else {
          Dialog.failed({
            title: item.reportItemId === -1 ? '添加失败' : '编辑失败',
            content: '失败信息:' + res.msg,
            confirmText: '确定'
          })
        }
      })
    },
    saveReport () {
      if (!this.reportName) {
        Dialog.alert({
          title: ' ',
          content: '输入报表名称',
          onConfirm: () => {
            this.$refs.reportName.focus()
            this.$refs.msv.scrollTo(0, 0, true)
          }
        })
      } else if (this.reportName.length > 35) {
        Dialog.alert({
          title: ' ',
          content: '报表名称不能超过35个字符',
          onConfirm: () => {
            this.$refs.reportName.focus()
            this.$refs.msv.scrollTo(0, 0, true)
          }
        })
      } else {
        let checkId = this.check.id
        let creatorId = getUser()[0].userId
        let reportName = this.reportName
        let reportItems = []
        for (let i = 0; i < this.check.examineCheckItemVos.length; i++) {
          let newObject = {}
          newObject.checkItemId = this.check.examineCheckItemVos[i].checkItemId
          newObject.examineImageVoList = this.check.examineCheckItemVos[i].proofImgs.reader0
          newObject.proofContent = this.check.examineCheckItemVos[i].proofContent
          newObject.thisResult = this.check.examineCheckItemVos[i].thisResult
          newObject.judgeBonus = this.check.examineCheckItemVos[i].judgeBonus
          newObject.updateTime = this.check.examineCheckItemVos[i].updateTime ? this.check.examineCheckItemVos[i].updateTime : getCurrentTime()
          reportItems.push(newObject)
        }
        // 保存报表
        this.$http.post('report/addReport',
          {
            reportId: this.id,
            checkId: checkId,
            creatorId: creatorId,
            reportName: reportName,
            reportItemQos: reportItems
          }
        ).then(res => {
          if (res.code === 1) {
            // this.checkId = res.data
            let that = this
            Dialog.alert({
              title: ' ',
              content: this.id === -1 ? '添加成功' : '编辑成功',
              confirmText: '确定',
              onConfirm: () => {
                this.$router.push({ name: 'postReportList', query: { checkId: that.checkId, checkName: that.check.name } })
              }
            })
          } else {
            Dialog.failed({
              title: this.id === -1 ? '添加失败' : '编辑失败',
              content: '失败信息:' + res.msg,
              confirmText: '确定'
            })
          }
        })
      }
    },
    valid (item) {
      /* if (item.isProof) {
        if (!item.proofContent) {
          Dialog.alert({
            title: ' ',
            content: '证据必填'
          })
          return
        }
      } */
      if (!this.reportName) {
        Dialog.alert({
          title: ' ',
          content: '输入报表名称',
          onConfirm: () => {
            this.$refs.reportName.focus()
            this.$refs.msv.scrollTo(0, 0, true)
          }
        })
        return
      }
      if (this.reportName.length > 35) {
        Dialog.alert({
          title: ' ',
          content: '报表名称不能超过35个字符',
          onConfirm: () => {
            this.$refs.reportName.focus()
            this.$refs.msv.scrollTo(0, 0, true)
          }
        })
      }
      if (!item.proofContent) {
        Dialog.alert({
          title: ' ',
          content: '请填写证据内容'
        })
        return false
      }
      if (!item.proofImgs || !item.proofImgs.reader0 || item.proofImgs.reader0.length < 1) {
        Dialog.alert({
          title: ' ',
          content: '请上传证据图片'
        })
        return false
      }
      if (!item.judgeBonus) {
        Dialog.alert({
          title: ' ',
          content: '请填写扣除金额'
        })
        return false
      }
      return true
    }
  }
}
</script>

<style lang="stylus" scoped>
  .cp-contain{
  }
  .c-uploader
    width 100%
  .cp-body
    height 1200px
    text-align left
  .cp-checkContain
    margin-top 30px
  .cp-item
    margin-top 10px
    border: 3px solid rgba(128, 128, 128, 0.12)
    padding 10px 20px
  .cp-btn{
    margin-top 20px
  }
  .md-textarea-item__textarea{
    padding : 0!important;
  }
  .md-example-child-reader
    height 500px
    .image-reader-list
      float left
      width 100%
      max-height 500px
      overflow-y:auto;
      .image-reader-item
        position relative
        float left
        width 23.5%
        padding-bottom 23.5%
        margin-bottom 2%
        margin-right 2%
        background #FFF
        box-shadow 0 5px 20px rgba(197, 202, 213, .25)
        box-sizing border-box
        list-style none
        border-radius 4px
        background-size cover
        overflow hidden
        &:nth-of-type(4n)
          margin-right 0
        &.add
          .md-icon
            position absolute
            top 40%
            left 50%
            transform translate(-50%, -50%)
            opacity .5
          p
            position absolute
            top 50%
            left 0
            width 100%
            margin-top 15px
            font-size 22px
            color #CCC
            text-align center
        .image-reader-item-del
          position absolute
          top 0
          right 0
          z-index 3
          opacity .8
          .md-icon-close
            font-size 24px
</style>
