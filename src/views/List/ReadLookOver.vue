<template>
  <div class="lv-contain">
    <lg-preview></lg-preview>
    <div class="lv-backBar">
      <back-bar v-bind:title="title" v-bind:type="type"></back-bar>
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
            <div
              style="display: -webkit-flex;display: flex;font-size: 0.35rem;justify-content: space-between;margin-bottom: 15px">
              <div style="white-space: nowrap;text-align: left">检查表名称</div>
              <div style="color: rgba(123,127,145,0.9);font-size: 0.32rem;text-align: right;font-weight: normal">
                {{check.name}}
              </div>
            </div>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <md-input-item title="检查周期" align="right" :value="msgSelectPeriod == null?'':msgSelectPeriod" disabled/>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <md-input-item title="生效日期" align="right" :value="check.takeEffectTime == null ? '' :check.takeEffectTime"
                           disabled/>
            <div style="height: 10px;background-color: rgba(195,195,195,0.2);margin: 0 -50px"></div>
            <md-input-item title="适用部门" align="right" v-model="check.deptName" disabled/>
            <div v-if="isEditNew && getOldVal(-1) !== null && compareValue(check.deptName,getOldVal(-1).deptName,1)">
              <div style="height: 1px;background-color: #e0e0e0"></div>
              <div class="info-row">
                <div>更改前</div>
                <div>{{oldCheck.deptName}}</div>
              </div>
            </div>
            <div style="height: 10px;background-color: rgba(195,195,195,0.2);margin: 0 -50px"></div>
            <!--<div style="height: 1px;background-color: #e0e0e0"></div>
            <md-input-item title="报告周期" align="right" v-model="check.checkPeriod" disabled/>-->

            <!-- <div style="height: 1px;background-color: #e0e0e0"></div>
             <md-input-item title="短信提醒" align="right" v-model="msgTipStr" disabled/>-->

            <user-item title="检查人" :user-list="check.checkUserRoleList"></user-item>
            <div v-if="isEditNew && getOldVal(-1) !== null && compareValue(check.checkUserRoleList,getOldVal(-1).checkUserRoleList,2,10)">
              <div style="height: 1px;background-color: #e0e0e0"></div>
              <div class="info-row">
                <div>更改前</div>
                <div>{{oldCheck.checkUserRoleList | changeList}}</div>
              </div>
            </div>
            <div style="height: 10px;background-color: rgba(195,195,195,0.2);margin: 0 -50px"></div>
            <user-item title="接收人" :user-list="check.receiveUserRoleList"></user-item>
            <div v-if="isEditNew && getOldVal(-1) !== null && compareValue(check.receiveUserRoleList,getOldVal(-1).receiveUserRoleList,2,10)">
              <div style="height: 1px;background-color: #e0e0e0"></div>
              <div class="info-row">
                <div>更改前</div>
                <div>{{oldCheck.receiveUserRoleList | changeList}}</div>
              </div>
            </div>
            <div style="height: 10px;background-color: rgba(195,195,195,0.2);margin: 0 -50px"></div>
            <user-item title="执行人" :user-list="check.exeUserRoleList"></user-item>
            <div v-if="isEditNew && getOldVal(-1) !== null && compareValue(check.exeUserRoleList,getOldVal(-1).exeUserRoleList,2,10)">
              <div style="height: 1px;background-color: #e0e0e0"></div>
              <div class="info-row">
                <div>更改前</div>
                <div>{{oldCheck.exeUserRoleList | changeList}}</div>
              </div>
            </div>
            <div style="height: 10px;background-color: rgba(195,195,195,0.2);margin: 0 -50px"></div>
            <user-item title="监督人" :user-list="check.superVersionUserRoleList"></user-item>
            <div v-if="isEditNew && getOldVal(-1) !== null && compareValue(check.superVersionUserRoleList,getOldVal(-1).superVersionUserRoleList,2,10)">
              <div style="height: 1px;background-color: #e0e0e0"></div>
              <div class="info-row">
                <div>更改前</div>
                <div>{{oldCheck.superVersionUserRoleList | changeList}}</div>
              </div>
            </div>
            <div style="height: 10px;background-color: rgba(195,195,195,0.2);margin: 0 -50px"></div>
            <div>
              <div class="readCheck" @click="changeRead(check,1)">
                <md-check v-model="check.readStatus" :label="check.readStatus?'已读':'未读'"
                          :class="check.readStatus?'readStyle':'unreadStyle'" :disabled ="check.readStatus"/>
              </div>
              <div style="height: 10px;background-color: rgba(195,195,195,0.2);margin: 0 -50px"></div>
            </div>
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
            <div v-for="(n,i) in checkItems" :key="n.id">
              <md-button :type="n.readStatus ? 'primary':'warning'" style="font-size: 0.32rem; margin-top: 30px;">
                {{'('+ (n.readStatus ? '已读':'未读') +')' + n.number}}
              </md-button>
              <div class="lv-item">
                <div style="font-size: 0.32rem">检查内容</div>
                <md-textarea-item style="clear: both;"
                                  title=""
                                  :autosize="true"
                                  :value="n.checkContent"
                                  disabled
                />
                <div v-if="isEditNew && getOldVal(n.motherId)!==null && compareValue(n.checkContent,getOldVal(n.motherId).checkContent ,1)">
                  <div style="height: 1px;background-color: #e0e0e0;margin-bottom: 15px"></div>
                  <div class="item-comm" style="margin-bottom: 15px">更改前</div>
                  <div class="item-comm" style="margin-bottom: 40px">
                    {{oldCheckItems[i].checkContent}}
                  </div>
                </div>
                <div style="height: 10px;background-color: rgba(195,195,195,0.2);margin-bottom: 15px"></div>
                <div style="font-size: 0.32rem">检查方式</div>
                <md-textarea-item title="" :autosize="true" :value="n.checkWay" disabled/>
                <div v-if="isEditNew && getOldVal(n.motherId)!==null && compareValue(n.checkWay,getOldVal(n.motherId).checkWay,1)">
                  <div style="height: 1px;background-color: #e0e0e0;margin-bottom: 15px"></div>
                  <div class="item-comm" style="margin-bottom: 15px">更改前</div>
                  <div class="item-comm" style="margin-bottom: 40px">
                    {{oldCheckItems[i].checkWay}}
                  </div>
                </div>
                <div style="height: 10px;background-color: rgba(195,195,195,0.2);margin-bottom: 15px"></div>
                <div style="font-size: 0.32rem">奖罚标准</div>
                <md-textarea-item title=""
                                  :autosize="true"
                                  :value="n.bonus+''"
                                  style="clear: both;"
                                  disabled
                />
                <div v-if="isEditNew && getOldVal(n.motherId)!==null && compareValue(n.bonus,getOldVal(n.motherId).bonus,1)">
                  <div style="height: 1px;background-color: #e0e0e0;margin-bottom: 15px"></div>
                  <div class="item-comm" style="margin-bottom: 15px">更改前</div>
                  <div class="item-comm" style="margin-bottom: 50px">
                    {{oldCheckItems[i].bonus}}
                  </div>
                </div>
                <div style="height: 10px;background-color: rgba(195,195,195,0.2);margin-bottom: 15px"></div>
                <md-input-item title="奖罚单位" align="right" :value="n.unit === '1' ? '分': ( n.unit === '2' ? '元' : '其它')"
                               style="clear: both" disabled/>
                <div v-if="isEditNew && getOldVal(n.motherId)!==null && compareValue(n.unit,getOldVal(n.motherId).unit,1)">
                  <div style="height: 1px;background-color: #e0e0e0;margin-bottom: 15px"></div>
                  <div class="info-row">
                    <div>更改前</div>
                    <div>{{oldCheckItems[i].unit === '1' ? '分': ( oldCheckItems[i].unit === '2' ? '元' : '其它')}}</div>
                  </div>
                </div>
                <div style="height: 10px;background-color: rgba(195,195,195,0.2);margin-bottom: 15px"></div>
                <!--<div style="height: 1px;background-color: #e0e0e0"></div>
                <md-input-item title="证据必填" align="right" :value="n.isProof? '是':'否'" style="clear: both;" disabled/>-->
                <div style="font-size: 18px;margin-top: 10px">检查图片</div>
                <div class="lv-img-viewer">
                  <img-viewer :images="n.examineImageVos"></img-viewer>
                </div>
                <div v-if="isEditNew && getOldVal(n.motherId)!==null && compareValue(n.examineImageVos,getOldVal(n.motherId).examineImageVos,2,11)">
                  <div style="height: 1px;background-color: #e0e0e0;margin-bottom: 15px"></div>
                  <div style="font-size: 18px;margin-top: 10px;color: lightgrey">更改前</div>
                  <div class="lv-img-viewer">
                    <img-viewer :images="oldCheckItems[i].examineImageVos"></img-viewer>
                  </div>
                </div>
                <div style="height: 10px;background-color: rgba(195,195,195,0.2);margin-bottom: 15px"></div>
                <multi-file-uploader :is-uploader-show="false" :is-delete-btn-show="false"
                                     :item-id="n.checkItemId"></multi-file-uploader>
                <div style="height: 1px;background-color: #e0e0e0"></div>
                <div class="readCheck" @click="changeRead(n,2)">
                  <md-check v-model="n.readStatus" :label="n.readStatus?'已读':'未读'"
                            :class="n.readStatus?'readStyle':'unreadStyle'" :disabled ="n.readStatus"/>
                </div>
              </div>
            </div>
          </div>
        </md-field>
        <!--非据此重做-->
        <!--<md-field v-else>
          <div style="font-weight: bold">
            <div
              style="display: -webkit-flex;display: flex;font-size: 0.35rem;justify-content: space-between;margin-bottom: 15px">
              <div style="white-space: nowrap;text-align: left">检查表名称</div>
              <div style="color: rgba(123,127,145,0.9);font-size: 0.32rem;text-align: right;font-weight: normal">
                {{check.name}}
              </div>
            </div>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <md-input-item title="检查周期" align="right" :value="msgSelectPeriod == null?'':msgSelectPeriod" disabled/>
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <md-input-item title="生效日期" align="right" :value="check.takeEffectTime == null ? '' :check.takeEffectTime"
                           disabled/>
            <div style="height: 10px;background-color: rgba(195,195,195,0.2);margin: 0 -50px"></div>
            <md-input-item title="适用部门" align="right" v-model="check.deptName" disabled/>
            <div style="height: 10px;background-color: rgba(195,195,195,0.2);margin: 0 -50px"></div>
            &lt;!&ndash;<div style="height: 1px;background-color: #e0e0e0"></div>
            <md-input-item title="报告周期" align="right" v-model="check.checkPeriod" disabled/>&ndash;&gt;

            &lt;!&ndash; <div style="height: 1px;background-color: #e0e0e0"></div>
             <md-input-item title="短信提醒" align="right" v-model="msgTipStr" disabled/>&ndash;&gt;

            <user-item title="检查人" :user-list="check.checkUserRoleList"></user-item>
            <div style="height: 10px;background-color: rgba(195,195,195,0.2);margin: 0 -50px"></div>
            <user-item title="接收人" :user-list="check.receiveUserRoleList"></user-item>
            <div style="height: 10px;background-color: rgba(195,195,195,0.2);margin: 0 -50px"></div>
            <user-item title="执行人" :user-list="check.exeUserRoleList"></user-item>
            <div style="height: 10px;background-color: rgba(195,195,195,0.2);margin: 0 -50px"></div>
            <user-item title="监督人" :user-list="check.superVersionUserRoleList"></user-item>
            <div style="height: 10px;background-color: rgba(195,195,195,0.2);margin: 0 -50px"></div>
            <div>
              <div class="readCheck" @click="changeRead(check,1)">
                <md-check v-model="check.readStatus" :label="check.readStatus?'已读':'未读'"
                          :class="check.readStatus?'readStyle':'unreadStyle'" :disabled ="check.readStatus"/>
              </div>
              <div style="height: 10px;background-color: rgba(195,195,195,0.2);margin: 0 -50px"></div>
            </div>
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
            <div v-for="(n) in checkItems" :key="n.id">
              <md-button :type="n.readStatus ? 'primary':'warning'" style="font-size: 0.32rem; margin-top: 30px;">
                {{'('+ (n.readStatus ? '已读':'未读') +')' + n.number}}
              </md-button>
              <div class="lv-item">
                <div style="font-size: 0.32rem">检查内容</div>
                <md-textarea-item style="clear: both;"
                                  title=""
                                  :autosize="true"
                                  :value="n.checkContent"
                                  disabled
                />
                <div style="height: 10px;background-color: rgba(195,195,195,0.2);margin-bottom: 15px"></div>
                <div style="font-size: 0.32rem">检查方式</div>
                <md-textarea-item title="" :autosize="true" :value="n.checkWay" disabled/>
                <div style="height: 10px;background-color: rgba(195,195,195,0.2);margin-bottom: 15px"></div>
                <div style="font-size: 0.32rem">奖罚标准</div>
                <md-textarea-item title=""
                                  :autosize="true"
                                  :value="n.bonus+''"
                                  style="clear: both;"
                                  disabled
                />
                <div style="height: 10px;background-color: rgba(195,195,195,0.2);margin-bottom: 15px"></div>
                <md-input-item title="奖罚单位" align="right" :value="n.unit === '1' ? '分': ( n.unit === '2' ? '元' : '其它')"
                               style="clear: both" disabled/>
                <div style="height: 10px;background-color: rgba(195,195,195,0.2);margin-bottom: 15px"></div>
                &lt;!&ndash;<div style="height: 1px;background-color: #e0e0e0"></div>
                <md-input-item title="证据必填" align="right" :value="n.isProof? '是':'否'" style="clear: both;" disabled/>&ndash;&gt;
                <div style="font-size: 18px;margin-top: 10px">检查图片</div>
                <div class="lv-img-viewer">
                  <img-viewer :images="n.examineImageVos"></img-viewer>
                </div>
                <div style="height: 10px;background-color: rgba(195,195,195,0.2);margin-bottom: 15px"></div>
                <multi-file-uploader :is-uploader-show="false" :is-delete-btn-show="false"
                                     :item-id="n.checkItemId"></multi-file-uploader>
                <div style="height: 1px;background-color: #e0e0e0"></div>
                <div class="readCheck" @click="changeRead(n,2)">
                  <md-check v-model="n.readStatus" :label="n.readStatus?'已读':'未读'"
                            :class="n.readStatus?'readStyle':'unreadStyle'" :disabled ="n.readStatus"/>
                </div>
              </div>
            </div>
          </div>
        </md-field>-->
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
import { getUser } from '../../utils'
import ImgViewer from '../../components/ImgViewer'
import MultiFileUploader from '../../components/MultiFileUploader'
import {
  Icon,
  Field,
  ScrollView,
  FieldItem,
  TextareaItem,
  ImageViewer,
  InputItem,
  Dialog,
  ScrollViewMore,
  Button,
  Check
} from 'mand-mobile'
import MdField from 'mand-mobile/components/field/index'
import UserItem from '../../components/UserItem'
// import MdFieldItem from 'mand-mobile/components/field/item'
let pageCount = 5
let pageIndex = 0
export default {
  name: 'ReadLookOver',
  components: {
    // MdFieldItem,
    MdField,
    [Check.name]: Check,
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
      checked: false,
      title: '查看检查表',
      type: 1,
      isViewerShow: false,
      viewerIndex: 0,
      check: {},
      oldCheck: {},
      checkItems: [],
      oldCheckItems: [],
      isFinished: false,
      id: -1,
      checkUserList: '',
      exeUserList: '',
      receiveUserList: '',
      msgTipStr: '不提醒',
      msgSelectPeriod: '',
      allTotal: [],
      isEditNew: false,
      pageFlag: -1
    }
  },
  created () {
    this.id = this.$route.query.id
    this.pageFlag = this.$route.query.pageFlag
    pageIndex = 0
    pageCount = 5
    // 判断是否是编辑新增
    this.getCheckIsEditNew()
    // 根据id查询所有要展示的数据
    this.getExamineCheckById(this.id)
  },
  methods: {
    getCheckIsEditNew () {
      this.$http.get('statement/isReform', {
        params: {
          id: this.id
        }
      }).then(res => {
        this.isEditNew = res.data === '1'
      })
    },
    async getExamineCheckById (id) {
      const result = await this.$http.get('checkItem/examineChecks', {
        params: {
          id: id,
          userId: getUser()[0].userId,
          userType: this.pageFlag
        }
      })
      if (result.code === 1) {
        // console.log(result)
        this.check = result.data[0]
        this.oldCheck = result.data[1]
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
      } else {
        Dialog.failed({
          title: ' ',
          content: '请确定此检查表是否有检查项'
        })
      }
    },
    async getExamineCheckItmById (id, index, count) {
      const result = await this.$http.get('checkItem/examineCheckItems', {
        params: this.$qs.stringify({
          id: id,
          userId: getUser()[0].userId,
          userType: this.pageFlag,
          index: index,
          count: count
        })
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
      this.$http.get('checkItem/examineCheckItems', {
        params: {
          id: this.id,
          userId: getUser()[0].userId,
          userType: this.pageFlag,
          index: pageIndex,
          count: pageCount
        }
      }).then(res => {
        if (res.code === 1) {
          // console.log(res)
          if (res.data[0] && res.data[0].examineCheckItemVos && res.data[0].examineCheckItemVos.length > 0) {
            for (let i = 0; i < res.data[0].examineCheckItemVos.length; i++) {
              that.checkItems.push(res.data[0].examineCheckItemVos[i])
            }
            // console.log(that.checkItems)
            if (res.data[1] && res.data[1].examineCheckItemVos && res.data[1].examineCheckItemVos.length > 0) {
              for (let i = 0; i < res.data[1].examineCheckItemVos.length; i++) {
                that.oldCheckItems.push(res.data[1].examineCheckItemVos[i])
              }
              // console.log(that.oldCheckItems)
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
    },
    getOldVal (a) {
      if (!this.isEditNew) {
        // 不是编辑新增就直接不显示
        return null
      }
      let oldValue = null
      if (a === -1) { // 检查表
        oldValue = this.oldCheck
      } else { // 检查项
        if (!a) {
          oldValue = null
        } else {
          oldValue = this.oldCheckItems.filter(o => o.checkItemId === parseInt(a))
        }
        if (!oldValue || oldValue.length === 0) {
          oldValue = null
        } else {
          oldValue = oldValue[0]
        }
      }
      return oldValue
    },
    compareValue (c1, c2, type, te) {
      let isEqual = true
      switch (type) {
        // 非数组比较
        case 1:
          isEqual = c1 === c2
          break
        // 数组
        case 2:
          if (c1 && c2) {
            if (c1.length !== c2.length) {
              isEqual = false
            } else {
              for (let i = 0; i < c1.length; i++) {
                if (te === 10) {
                  if (c1[i].id !== c2[i].id) {
                    isEqual = false
                    break
                  }
                } else if (te === 11) {
                  if (c1[i].url !== c2[i].url) {
                    isEqual = false
                    break
                  }
                } else {
                  if (c1[i].toString() !== c2[i].toString()) {
                    isEqual = false
                    break
                  }
                }
              }
            }
          } else {
            isEqual = c1 === c2
          }
          break
      }
      return !isEqual // 相等则不显示，不相等则显示
    },
    changeRead (val, type) {
      /* if (val.readStatus) {
        return
      } */
      let data
      if (type === 1) {
        data = {
          id: this.id,
          userId: getUser()[0].userId,
          status: 1,
          type: type,
          userType: this.pageFlag
        }
      } else {
        data = {
          id: val.checkItemId,
          userId: getUser()[0].userId,
          status: 1,
          type: type,
          userType: this.pageFlag
        }
      }
      this.$http.put('statement/isRead', this.$qs.stringify(data))
        .then(res => {
          if (res.code === 1) {
            val.readStatus = true
          } else {
            val.readStatus = false
          }
        })
    }
  },
  filters: {
    changeList: function (value) {
      if (!(value && value.length > 0)) {
        return ''
      }
      return value.map(function (u) {
        return u.lastName
      }).toString()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .lv-contain {
  }

  .readCheck {
    display flex
    display -webkit-flex
    justify-content center
    margin-top 10px
    font-size 0.32rem
  }

  .info-row {
    display -webkit-flex
    display flex
    flex-direction row
    font-size 0.32rem
    align-items center
    justify-content space-between
    color lightgrey
    margin 20px 0
  }

  #r-check /deep/ .md-radio-icon {
    color: red !important;
  }

  .item-comm {
    color: lightgrey
    font-size: 0.32rem
  }

  .readStyle {
    color gainsboro
  }

  .unreadStyle {
    color red
  }

  .changeAgo {
    color #e0e0e0
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
