<template>
  <div class="lv-contain">
    <lg-preview></lg-preview>
    <div class="lv-backBar">
      <back-bar v-bind:title="title" v-bind:type="type" ></back-bar>
    </div>
    <div class="lv-body">
      <md-scroll-view
        ref="scrollView"
        :auto-reflow="true"
        :scrolling-x="false"
        @end-reached="$_onEndReached"
        :end-reached-threshold="300"
      >
        <md-field>
          <div style="font-weight: bold">
            <div style="display: -webkit-flex;display: flex;font-size: 0.35rem;justify-content: space-between;margin-bottom: 15px">
              <div style="white-space: nowrap;text-align: left">检查项名称</div>
              <div style="color: rgba(123,127,145,0.9);font-size: 0.32rem;text-align: right;font-weight: normal">{{check.name}}</div>
            </div>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <md-input-item title="适用部门" align="right" v-model="check.deptName" disabled/>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <md-input-item title="报告周期" align="right" v-model="check.checkPeriod" disabled/>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <md-input-item title="短信提醒" align="right" v-model="msgTipStr" disabled/>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <user-item title="检查人" :user-list="check.checkUserRoleList"></user-item>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <user-item title="接收人" :user-list="check.receiveUserRoleList"></user-item>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <user-item title="执行人" :user-list="check.exeUserRoleList"></user-item>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <user-item title="统计" :user-list="allTotal"></user-item>
            <div style="background-color: #f1f1f1;display: flex;padding: 12px">
              <span style="font-size: 16px">总金额：</span><span style="font-size: 16px">{{this.check.money}}元</span>
            </div>
            <div style="background-color: #dddddd;display: flex;padding: 12px">
              <span style="font-size: 16px">总分数：</span><span style="font-size: 16px">{{this.check.grade}}分</span>
            </div>
          </div>
          <div style="height: 1px;background-color: #e0e0e0"></div>
          <div class="lv-checkContain">
            <div v-for="n in checkItems" :key="n.id">
              <md-button type="warning" style="font-size: 16px; margin-top: 30px;background-color: white;color: red">{{n.number}}</md-button>
              <div class="lv-item">
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
                                  style="clear: both;"
                                  disabled
                />
                <div style="height: 1px;background-color: #e0e0e0"></div>
                <md-input-item title="奖罚单位" align="right" :value="n.unit === '1' ? '分': ( n.unit === '2' ? '元' : '其它')" style="clear: both" disabled/>
                <div style="height: 1px;background-color: #e0e0e0"></div>
                <md-input-item title="证据必填" align="right" :value="n.isProof? '是':'否'" style="clear: both;" disabled/>
                <div style="height: 1px;background-color: #e0e0e0"></div>
                <div style="font-size: 18px;margin-top: 10px">检查图片</div>
                <div class="lv-img-viewer">
                  <img-viewer :images="n.examineImageVos"></img-viewer>
                </div>
                <multi-file-uploader :is-uploader-show="false" :is-delete-btn-show="false" :item-id="n.checkItemId"></multi-file-uploader>
              </div>
            </div>
          </div>
        </md-field>
        <md-scroll-view-more style="z-index: 10000;"
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
import MultiFileUploader from '../../components/MultiFileUploader'
import { Icon, Field, ScrollView, FieldItem, TextareaItem, ImageViewer, InputItem, Dialog, ScrollViewMore, Button } from 'mand-mobile'
import MdField from 'mand-mobile/components/field/index'
import UserItem from '../../components/UserItem'
// import MdFieldItem from 'mand-mobile/components/field/item'
let pageCount = 5
let pageIndex = 0
export default {
  name: 'LookOver',
  components: {
    // MdFieldItem,
    MdField,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [ScrollView.name]: ScrollView,
    [ScrollViewMore.name]: ScrollViewMore,
    [TextareaItem.name]: TextareaItem,
    [ImageViewer.name]: ImageViewer,
    [InputItem.name]: InputItem,
    [Dialog.name]: Dialog,
    [Button.name]: Button,
    BackBar,
    ImgViewer,
    UserItem,
    MultiFileUploader
  },
  data () {
    return {
      title: '查看检查表',
      type: 1,
      isViewerShow: false,
      viewerIndex: 0,
      check: {},
      checkItems: [],
      isFinished: false,
      id: -1,
      checkUserList: '',
      exeUserList: '',
      receiveUserList: '',
      msgTipStr: '不提醒',
      allTotal: []
    }
  },
  created () {
    this.id = this.$route.query.id
    pageIndex = 0
    pageCount = 5
    // 根据id查询所有要展示的数据
    this.getExamineCheckById(this.id)
    // this.getExamineCheckItmById(this.id, pageIndex, pageCount)
  },
  methods: {
    async getExamineCheckById (id) {
      const result = await this.$http.get('checkItem/examineCheck', {
        params: { id: id }
      })
      if (result.code === 1) {
        this.check = result.data
        if (this.check.msgTipWay != null) {
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
        }
        this.$nextTick(() => {
          this.allTotal.push({ lastName: '总共' + this.check.examineCount + '项' })
        })
      } else {
        Dialog.failed({
          title: ' ',
          content: '请确定此检查表是否有检查项'
        })
      }
    },
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
          this.checkItems = result.data.examineCheckItemVos
        }
      }
    },
    $_onEndReached () {
      if (this.isFinished) {
        return
      }
      // async data
      const that = this
      this.$http.get('checkItem/examineCheckItem', {
        params: {
          id: this.id,
          index: pageIndex,
          count: pageCount
        }
      }).then(res => {
        if (res.code === 1) {
          if (res.data.examineCheckItemVos && res.data.examineCheckItemVos.length > 0) {
            for (let i = 0; i < res.data.examineCheckItemVos.length; i++) {
              that.checkItems.push(res.data.examineCheckItemVos[i])
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
  .lv-contain{
  }
  .lv-body
    height 1200px
    text-align left
  .lv-checkContain
    margin-top 30px
  .lv-item
    margin-top 10px
    border: 3px solid rgba(128, 128, 128, 0.12)
    padding 10px 20px
</style>
