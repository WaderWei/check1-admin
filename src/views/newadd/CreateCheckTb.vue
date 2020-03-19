<template>
    <div class="create-contain">
      <div class="s-backBar">
        <back-bar v-bind:title="title" v-bind:type="type"></back-bar>
      </div>
      <div class="s-from">
        <md-scroll-view
          :auto-reflow="true"
          :scrolling-x="false"
        >
        <md-field>
          <md-input-item
            ref="checkInput"
            v-model="checkTbName"
            title="名称"
            placeholder="请输入"
            clearable
            align="right"
            @blur="check()"
          ></md-input-item>
          <div style="height: 1px;background-color: #e0e0e0"></div>
          <md-input-item
            ref="reportPeriod"
            v-model="reportPeriodName"
            title="周期"
            placeholder="请输入"
            align="right"
            clearable
            @blur="check()"
          ></md-input-item>
          <div style="height: 1px;background-color: #e0e0e0"></div>
          <md-field-item solid title="对象" align="right" :content="checkDeptName ? checkDeptName : '请选择部门'" class="divFieldItem" arrow @click="selectDeptMethod"/>
          <div style="height: 1px;background-color: #e0e0e0"></div>
          <select-item :title="checkUserTitle"
                       :select-type="checkUserType"
                       :select-user-arr="checkSelectUser">
          </select-item>
          <div style="height: 1px;background-color: #e0e0e0;margin-top: 10px"></div>
          <select-item :title="receiveUserTitle"
                       :select-type="receiveUserType"
                       :select-user-arr="receiveSelectUser">
          </select-item>
          <div style="height: 1px;background-color: #e0e0e0;margin-top: 10px"></div>
          <select-item :title="exeUserTitle"
                       :select-type="exeUserType"
                       :select-user-arr="exeSelectUser">
          </select-item>
          <!--z-->
          <!--<div style="height: 1px;background-color: #e0e0e0;margin-top: 10px"></div>
          <div class="msgTitle">
            <span>短信提醒</span>
          </div>
          <div class="massageTip">
            <md-radio name="0" v-model="tiemChecked" label="每周"/>
            <div class="time-week" v-if="tiemChecked === '0'">
              <md-radio-box class="week-box" name="1" v-model="selectWeek" label="星期一" />
              <md-radio-box class="week-box" name="2" v-model="selectWeek" label="星期二" />
              <md-radio-box class="week-box" name="3" v-model="selectWeek" label="星期三" />
              <md-radio-box class="week-box" name="4" v-model="selectWeek" label="星期四" />
              <md-radio-box class="week-box" name="5" v-model="selectWeek" label="星期五" />
              <md-radio-box class="week-box" name="6" v-model="selectWeek" label="星期六" />
              <md-radio-box class="week-box" name="7" v-model="selectWeek" label="星期天" />
            </div>
            <md-radio name="1" v-model="tiemChecked" label="每月最后一天"/>
            <md-radio name="2" v-model="tiemChecked" label="每月"/>
            <div class="time-month" v-if="tiemChecked === '2'">
                <md-radio-box v-for="(item,inx) in currDay" :key="inx" class="day-box" :name="item.toString()" v-model="selectDay" :label="item.toString()"></md-radio-box>
            </div>
            <md-radio name="3" v-model="tiemChecked" label="不提醒"/>
          </div>
          <div style="height: 1px;background-color: #e0e0e0"></div>-->
          <md-field-item :solid="false" class="i-detail" title="检查项目明细："
                         arrow @click="checkItemList"/>
          <div class="s-btn">
            <div style="height: 1px;background-color: #e0e0e0"></div>
            <md-button type="warning" round @click="saveCheckTb">保存</md-button>
          </div>
        </md-field>
          <md-field style="margin-top: 50px;visibility: hidden" title="Adjustment Style">
          </md-field>
        </md-scroll-view>
      </div>
    </div>
</template>

<script>
import { InputItem, Field, Icon, Toast, ScrollView, Button, FieldItem, Dialog, Radio, RadioBox } from 'mand-mobile'
import BackBar from '../../components/BackBar'
import SelectItem from '../../components/SelectItem'
import { KeyboardJackUp, getUser, changeValueToUser, changeUserToValue } from '../../utils'
import MdRadioBox from 'mand-mobile/components/radio/box'
const selectUser = 'selectUser'
const checkName = 'checkName'
const reportPeriod = 'reportPeriod'
const selectDept = 'selectDept'
const msgTipKey = 'msgTipKey'
export default {
  name: 'CreateCheckTb',
  components: {
    MdRadioBox,
    [InputItem.name]: InputItem,
    [ScrollView.name]: ScrollView,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [Button.name]: Button,
    [FieldItem.name]: FieldItem,
    [Dialog.name]: Dialog,
    [Radio.name]: Radio,
    [RadioBox.name]: RadioBox,
    BackBar,
    SelectItem
  },
  data () {
    return {
      title: '创建检查表',
      type: 1,
      checkTbName: '',
      checkDeptName: '',
      reportPeriodName: '',
      checkUserTitle: '检查人',
      checkUserType: 2,
      checkSelectUser: [],
      receiveUserTitle: '接收人',
      receiveUserType: 3,
      receiveSelectUser: [],
      exeUserTitle: '执行人',
      exeUserType: 4,
      exeSelectUser: [],
      checkId: '-1',
      tiemChecked: '3',
      selectWeek: '6',
      currDay: 28,
      selectDay: '1'
    }
  },
  created () {
    // this.getCountDays()
    this.checkId = this.$route.query.checkId
    // 编辑状态记录是不是第一次进来
    if (this.checkId !== '-1' && !sessionStorage.getItem('first')) {
      sessionStorage.setItem('first', 'flag')
      sessionStorage.setItem('sCheckId', this.checkId)
      // todo 请求后端赋值
      this.title = '编辑检查表'
      this.getCheckById()
    } else {
      this.checkId = sessionStorage.getItem('sCheckId')
      if (!this.checkId) {
        this.checkId = '-1'
      }
      this.getValue()
    }
  },
  methods: {
    checkItemList () {
      if (this.checkId === '-1') {
        Dialog.alert({
          title: ' ',
          content: '请先保存此检查表',
          confirmText: '确定'
        })
        return
      }
      this.$router.push({ name: 'checkItemList', query: { checkId: this.checkId } })
    },
    saveCheckTb () {
      if (this.valid()) {
        let msgTipWay = ''
        if (this.tiemChecked === '3' || this.tiemChecked === '1') {
          msgTipWay = this.tiemChecked
        } else if (this.tiemChecked === '0') {
          msgTipWay = this.tiemChecked + ',' + this.selectWeek
        } else {
          msgTipWay = this.tiemChecked + ',' + this.selectDay
        }
        this.getValue()
        this.$http.post('check/addCheck', {
          checkId: this.checkId,
          name: this.checkTbName,
          deptName: this.checkDeptName,
          checkPeriod: this.reportPeriodName,
          creatorId: getUser()[0].userId,
          checkUserRoleList: changeValueToUser(this.checkSelectUser, 2),
          receiveUserRoleList: changeValueToUser(this.receiveSelectUser, 4),
          exeUserRoleList: changeValueToUser(this.exeSelectUser, 3),
          msgTipWay: msgTipWay
        }).then(res => {
          if (res.code === 1) {
            Dialog.alert({
              title: ' ',
              content: this.checkId === '-1' ? '添加成功' : '编辑成功',
              confirmText: '确定',
              onConfirm: () => {
                this.checkId = res.data
                sessionStorage.setItem('sCheckId', this.checkId)
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
    check () {
      KeyboardJackUp()
    },
    valid () {
      if (this.checkTbName && this.reportPeriodName) {
        if (this.checkTbName.length > 20) {
          Dialog.alert({
            title: ' ',
            content: '检查表名称不能超过20个字',
            confirmText: '确定'
          })
          return false
        }
        if (this.reportPeriodName.length > 40) {
          Dialog.alert({
            title: ' ',
            content: '检查表周期不能超过40个字',
            confirmText: '确定'
          })
          return false
        }
        return true
      } else {
        Toast.failed('请检查是否有未填写的项')
        return false
      }
    },
    async getCheckById () {
      const result = await this.$http.get('check/getCheckById', {
        params: { checkId: this.checkId }
      })
      const checkTb = result.data
      sessionStorage.setItem(checkName, checkTb.name)
      sessionStorage.setItem(selectDept, checkTb.deptName)
      sessionStorage.setItem(reportPeriod, checkTb.checkPeriod)
      sessionStorage.setItem(selectUser + this.checkUserType, JSON.stringify(changeUserToValue(checkTb.checkUserRoleList)))
      sessionStorage.setItem(selectUser + this.receiveUserType, JSON.stringify(changeUserToValue(checkTb.receiveUserRoleList)))
      sessionStorage.setItem(selectUser + this.exeUserType, JSON.stringify(changeUserToValue(checkTb.exeUserRoleList)))
      sessionStorage.setItem(msgTipKey, checkTb.msgTipWay)
      // sessionStorage.setItem(msgTipKey, '0,2')
      this.getValue()
    },
    getValue () {
      let checkTbName = sessionStorage.getItem(checkName)
      let checkDeptName = sessionStorage.getItem(selectDept)
      let reportPeriodName = sessionStorage.getItem(reportPeriod)
      let checkStr = sessionStorage.getItem(selectUser + this.checkUserType)
      let receiveStr = sessionStorage.getItem(selectUser + this.receiveUserType)
      let exeStr = sessionStorage.getItem(selectUser + this.exeUserType)
      let msgTitStr = sessionStorage.getItem(msgTipKey)
      if (!msgTitStr) {
      } else if (msgTitStr === '3' || msgTitStr === '1') {
        this.tiemChecked = msgTitStr
      } else {
        let msgArr = msgTitStr.split(',')
        this.tiemChecked = msgArr[0]
        if (msgArr[0] === '0') {
          this.selectWeek = msgArr[1]
        } else if (msgArr[0] === '2') {
          this.selectDay = msgArr[1]
        } else {
          this.tiemChecked = '3'
        }
      }
      this.checkTbName = (checkTbName === null || checkTbName === undefined) ? '' : checkTbName
      this.checkDeptName = (checkDeptName === null || checkDeptName === undefined) ? '' : checkDeptName
      this.reportPeriodName = (reportPeriodName === null || reportPeriodName === undefined) ? '' : reportPeriodName
      this.checkSelectUser = (checkStr === null || checkStr === undefined) ? [] : JSON.parse(checkStr)
      this.receiveSelectUser = (receiveStr === null || receiveStr === undefined) ? [] : JSON.parse(receiveStr)
      this.exeSelectUser = (exeStr === null || exeStr === undefined) ? [] : JSON.parse(exeStr)
    },
    selectDeptMethod () {
      this.$router.push({ name: 'selectDept' })
    },
    getCountDays () {
      var curDate = new Date()
      /* 获取当前月份 */
      var curMonth = curDate.getMonth()
      /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
      curDate.setMonth(curMonth + 1)
      /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
      curDate.setDate(0)
      /* 返回当月的天数 */
      this.currDay = curDate.getDate()
    }
  },
  watch: {
    checkTbName () {
      sessionStorage.setItem(checkName, this.checkTbName)
    },
    reportPeriodName () {
      sessionStorage.setItem(reportPeriod, this.reportPeriodName)
    },
    tiemChecked () {
      let msgTipWay = ''
      if (this.tiemChecked === '3' || this.tiemChecked === '1') {
        msgTipWay = this.tiemChecked
      } else if (this.tiemChecked === '0') {
        msgTipWay = this.tiemChecked + ',' + this.selectWeek
      } else {
        msgTipWay = this.tiemChecked + ',' + this.selectDay
      }
      sessionStorage.setItem(msgTipKey, msgTipWay)
    },
    selectWeek () {
      let msgTipWay = ''
      if (this.tiemChecked === '3' || this.tiemChecked === '1') {
        msgTipWay = this.tiemChecked
      } else if (this.tiemChecked === '0') {
        msgTipWay = this.tiemChecked + ',' + this.selectWeek
      } else {
        msgTipWay = this.tiemChecked + ',' + this.selectDay
      }
      sessionStorage.setItem(msgTipKey, msgTipWay)
    },
    selectDay () {
      let msgTipWay = ''
      if (this.tiemChecked === '3' || this.tiemChecked === '1') {
        msgTipWay = this.tiemChecked
      } else if (this.tiemChecked === '0') {
        msgTipWay = this.tiemChecked + ',' + this.selectWeek
      } else {
        msgTipWay = this.tiemChecked + ',' + this.selectDay
      }
      sessionStorage.setItem(msgTipKey, msgTipWay)
    }
  }
}
</script>

<style scoped>
  .create-contain{
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
  }
  .s-from{
    height: 1100px;
    text-align: left;
  }
  .s-btn{
    margin: 20px 20px 0;
  }
  .i-f-i{
  }
  .i-detail{
    font-weight: bolder;
    color: #c0a0e6;
  }
  .massageTip{
    /*margin-left: -0.2rem;*/
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    font-size: 0.32rem;
    color: #cbcbcb;
  }
  .msgTitle{
    font-size: 0.32rem;
    margin-bottom: 15px;
    margin-top: 20px;
  }
  .time-week{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  .week-box{
    margin-right: 20px;
    margin-top: 20px;
  }
  .time-month {
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  .day-box{
    width: 80px;
    height: 80px;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-right: 15px;
  }
</style>
