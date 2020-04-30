<template>
  <div class="cp-contain">
    <lg-preview></lg-preview>
    <div class="cp-backBar">
      <back-bar v-bind:title="title" v-bind:type="type"></back-bar>
    </div>
    <div class="cp-body">
      <div class="c-btn" v-if="isShowDealBtn">
        <md-button type="link" style="margin: 10px 10px 10px 0;color: red" @click="deal()">{{ check.overdueDisposeStatus === '1' ? '取消处理': '处理'}}</md-button>
      </div>
      <div style="position: fixed;bottom: 20px;right: 20px;z-index: 500" v-if="check.overdueDisposeStatus === '1'">
        <img :src="require('@/my-svg/deal.png')" style="width: 100%"/>
      </div>
      <md-scroll-view
        ref="scrollView"
        :auto-reflow="true"
        :scrolling-x="false"
        @end-reached="$_onEndReached"
        :end-reached-threshold="300"
      >
        <md-field>
          <div style="font-weight: bold">
            <div style="font-size: 0.32rem;color: red">逾期处理</div>
            <md-textarea-item
              style="color: red"
              ref="reportName"
              title=""
              autosize
              :rows="2"
              align="right"
              v-model="check.processingConten"
              :placeholder="isShowDealBtn ? '请输入':''"
              :disabled="check.overdueDisposeStatus === '1' || !isShowDealBtn "
            />
            <div style="height: 1px;background-color: #e0e0e0;margin-bottom: 15px"></div>
            <div
              style="display: -webkit-flex;display: flex;font-size: 0.35rem;justify-content: space-between;margin-bottom: 15px">
              <div style="white-space: nowrap;text-align: left">报告名称</div>
              <div style="color: rgba(123,127,145,0.9);font-size: 0.32rem;text-align: right;font-weight: normal">
                {{check.reportName}}
              </div>
            </div>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <md-input-item title="检查表名称" :solid="false" align="right" :value="check.name" disabled/>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <md-input-item title="适用部门" align="right" :value="check.deptName" disabled/>
            <!-- <div style="height: 1px;background-color: #e0e0e0"></div>
             <md-input-item title="报告周期" align="right" :value="check.checkPeriod" disabled/>
             <div style="height: 1px;background-color: #e0e0e0"></div>
             <md-input-item title="短信提醒" align="right" :value="msgTipStr" disabled/>-->
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <md-input-item title="检查周期" align="right" :value="msgSelectPeriod== null ? '':msgSelectPeriod" disabled/>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <md-input-item title="生效日期" align="right" :value="check.takeEffectTime == null ? '':check.takeEffectTime"
                           disabled/>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <user-item title="检查人" :user-list="check.checkUserRoleList"></user-item>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <user-item title="执行人" :user-list="check.exeUserRoleList"></user-item>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <user-item title="接收人" :user-list="check.receiveUserRoleList"></user-item>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <user-item title="监督人" :user-list="check.superVersionUserRoleList"></user-item>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <!--this.count = '合格数：' + this.check.qualifiedTotal + '；不合格数：' + (this.check.countReportItem - this.check.qualifiedTotal) + '；合格率：' +
            (this.check.qualifiedRate * 100).toFixed(2) + '%；最终金额：' + this.check.calamount + '元；最终分数：' + this.check.calScore + '分。'-->
            <div>
              <div style="height: 1px;background-color: #e0e0e0"></div>
              <user-item title="统计" :user-list="allTotal"></user-item>
              <div style="background-color: #f1f1f1;display: flex;padding: 12px" v-if="check.status !==1 ">
                <span style="font-size: 16px">合格数：</span><span
                style="font-size: 16px">{{this.check.qualifiedTotal}}</span>
              </div>
              <div style="background-color: #dddddd;display: flex;padding: 12px" v-if="check.status !==1 ">
                <span style="font-size: 16px">不合格数：</span><span style="font-size: 16px">{{this.check.countReportItem - this.check.qualifiedTotal}}</span>
              </div>
              <div style="background-color: #f1f1f1;display: flex;padding: 12px" v-if="check.status !==1 ">
                <span style="font-size: 16px">合格率：</span><span style="font-size: 16px">{{(this.check.qualifiedRate * 100).toFixed(2)}}%</span>
              </div>
              <div style="background-color: #dddddd;display: flex;padding: 12px">
                <span style="font-size: 16px">最终金额：</span><span style="font-size: 16px">{{this.check.calamount}}元</span>
              </div>
              <div style="background-color: #f1f1f1;display: flex;padding: 12px">
                <span style="font-size: 16px">最终分数：</span><span style="font-size: 16px">{{this.check.calScore}}分</span>
              </div>
            </div>
          </div>
          <div class="cp-checkContain">
            <div v-for="n in bothItems" :key="n.id">
              <md-button type="warning" style="font-size: 16px; margin-top: 30px;background-color: white;color: red">
                {{n.number}}
              </md-button>
              <div class="cp-item">
                <div style="font-size: 0.32rem">检查内容</div>
                <md-textarea-item style="clear: both;"
                                  title=""
                                  :autosize="true"
                                  :value="n.checkContent"
                                  disabled
                />
                <div style="height: 1px;background-color: #e0e0e0;margin-bottom: 15px"></div>
                <div style="font-size: 0.32rem">检查方式</div>
                <md-textarea-item title="" :autosize="true" :value="n.checkWay" disabled/>
                <div style="height: 1px;background-color: #e0e0e0;margin-bottom: 15px"></div>
                <div style="font-size: 0.32rem">奖罚标准</div>
                <md-textarea-item title=""
                                  :autosize="true"
                                  :value="n.bonus+''"
                                  disabled
                />
                <div style="height: 1px;background-color: #e0e0e0"></div>
                <md-input-item title="奖罚单位" align="right" :value="n.unit === '1' ? '分': ( n.unit === '2' ? '元' : '其它')"
                               disabled/>
               <!-- <div style="height: 1px;background-color: #e0e0e0"></div>
                <md-input-item title="证据必填" align="right" :value="n.isProof? '是':'否'" disabled/>-->
                <div style="font-size: 18px;margin-top: 10px">检查图片</div>
                <div class="cp-img-viewer">
                  <img-viewer :images="n.examineImageVos"></img-viewer>
                </div>
                <multi-file-uploader :is-uploader-show="false" style="margin-bottom: 10px"
                                     :is-delete-btn-show="false" :item-id="n.checkItemId"></multi-file-uploader>
                <div style="height: 1px;background-color: #e0e0e0;margin-bottom: 15px"></div>
                <div style="font-size: 0.32rem">检查证据</div>
                <md-textarea-item title=""
                                  autosize :rows="2" :value="n.proofContent === null ? '无': n.proofContent" disabled/>
                <div style="height: 1px;background-color: #e0e0e0"></div>
                <div style="font-size: 18px;margin-top: 10px">证据图片</div>
                <div class="cp-img-viewer">
                  <img-viewer :images="n.proofImgs ? n.proofImgs.reader0 : []"></img-viewer>
                </div>
                <multi-file-uploader :is-uploader-show="false" style="margin-bottom: 10px"
                                     :is-delete-btn-show="false" :item-id="n.reportItemId"
                                     :type-flag="4"></multi-file-uploader>
                <div style="height: 1px;background-color: #e0e0e0"></div>
                <md-input-item title="上次结果" align="right" :value="n.isQualified" disabled/>
                <div style="height: 1px;background-color: #e0e0e0"></div>
                <md-input-item title="本次结果" align="right" :value="n.thisResult === '1'? '合格':'不合格'" disabled/>
                <div style="height: 1px;background-color: #e0e0e0"></div>
                <md-input-item type="money" :title="n.unit === '1' ? '扣除分数':'扣除金额'" align="right" disabled
                               :value="n.judgeBonus === null ? '0': n.judgeBonus+''"
                />
                <div style="height: 1px;background-color: #e0e0e0"></div>
                <md-input-item title="检查时间" align="right" disabled
                               :value="n.updateTime ? n.updateTime : '' "></md-input-item>
                <div style="height: 1px;background-color: #e0e0e0"></div>
              </div>
            </div>
          </div>
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
import { mapState } from 'vuex'
import {
  Icon,
  Field,
  ScrollView,
  FieldItem,
  TextareaItem,
  ImageViewer,
  InputItem,
  Radio,
  ScrollViewMore,
  Button,
  Dialog
} from 'mand-mobile'
import MdField from 'mand-mobile/components/field/index'
import UserItem from '../../components/UserItem'
import MultiFileUploader from '../../components/MultiFileUploader'
// import MdFieldItem from 'mand-mobile/components/field/item'
let pageCount = 5
let pageIndex = 0
export default {
  name: 'SearchReportLookOver',
  components: {
    // MdFieldItem,
    MdField,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [ScrollView.name]: ScrollView,
    [TextareaItem.name]: TextareaItem,
    [ImageViewer.name]: ImageViewer,
    [InputItem.name]: InputItem,
    [Radio.name]: Radio,
    [ScrollViewMore.name]: ScrollViewMore,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    BackBar,
    ImgViewer,
    UserItem,
    MultiFileUploader
  },
  data () {
    return {
      title: '查看检查报告',
      type: 1,
      isViewerShow: false,
      viewerIndex: 0,
      reportName: '',
      reportId: -1,
      isFinished: false,
      check: {},
      bothItems: [],
      count: '',
      allTotal: [],
      msgTipStr: '不提醒',
      msgSelectPeriod: '',
      isDeal: true,
      isShowDealBtn: true
    }
  },
  created () {
    this.isShowDealBtn = this.user.filter(u => u.roleType === 6).length > 0
    this.reportId = this.$route.query.id
    pageIndex = 0
    pageCount = 5
    // 根据id查询所有要展示的数据
    this.getCheckById()
    // this.getReportItmById(this.reportId, pageIndex, pageCount)
  },
  computed: {
    ...mapState({
      user: state => JSON.parse(state.user)
    })
  },
  methods: {
    deal () {
      if (this.check.overdueDisposeStatus === '0') {
        this.dealReport(1)
      } else {
        this.dealReport(0)
      }
    },
    dealReport (status) {
      let qs = this.$qs
      this.$http.put('statement/disposeOverdueReport', qs.stringify({ id: this.reportId, status: status, content: this.check.processingConten }))
        .then(res => {
          if (res.code === 1) {
            Dialog.alert({
              title: ' ',
              content: '处理成功',
              confirmText: '确定'
            })
            this.getCheckById()
          } else {
            Dialog.failed({
              title: ' ',
              content: `操作失败，请稍后重试。<br/> 失败信息：` + res.msg,
              confirmText: '确定'
            })
          }
          this.loading = false
          this.inactive = false
        })
    },
    async getCheckById () {
      const result = await this.$http.get('report/findReport', {
        params: {
          reportId: this.reportId
        }
      })
      if (result.code === 1) {
        this.check = result.data
        this.$nextTick(() => {
          this.allTotal.push({ lastName: '总共' + this.check.checkItemCount + '项' })
        })
        /* if (this.check.msgTipWay != null) {
            if (!this.check.msgTipWay) {
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
            }
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
      } else {
      }
    },
    async getReportItmById (id, index, count) {
      const result = await this.$http.get('report/findReportItem', {
        params: {
          reportId: id,
          index: index,
          count: count
        }
      })
      if (result.code === 1) {
        if (result.data.examineCheckItemVos) {
          this.bothItems = result.data.examineCheckItemVos
        }
      }
    },
    $_onEndReached () {
      if (this.isFinished) {
        return
      }
      // async data
      const that = this
      this.$http.get('report/findReportItem', {
        params: {
          reportId: this.reportId,
          index: pageIndex,
          count: pageCount
        }
      }).then(res => {
        if (res.code === 1) {
          if (res.data.examineCheckItemVos && res.data.examineCheckItemVos.length > 0) {
            for (let i = 0; i < res.data.examineCheckItemVos.length; i++) {
              that.bothItems.push(res.data.examineCheckItemVos[i])
            }
          } else {
            this.isFinished = true
          }
          pageIndex += pageCount
          this.$refs.scrollView.finishLoadMore()
        } else {
          this.isFinished = true
          this.$refs.scrollView.finishLoadMore()
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .cp-contain {
  }
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
  .cp-body
    height 1200px
    text-align left

  .cp-checkContain
    margin-top 30px

  .cp-item
    margin-top 10px
    border: 3px solid rgba(128, 128, 128, 0.12)
    padding 10px 20px

  .md-example-child-reader
    height 500px

    .image-reader-list
      float left
      width 100%
      max-height 500px
      overflow-y: auto;

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
