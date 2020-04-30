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
            :disabled="isEditNew === '1'"
          ></md-input-item>
          <div style="height: 1px;background-color: #e0e0e0"></div>
          <!--<md-input-item
            ref="reportPeriod"
            v-model="reportPeriodName"
            title="周期"
            placeholder="请输入"
            align="right"
            clearable
            @blur="check()"
          ></md-input-item>-->

          <div class="msgTitle">
            <span>检查周期</span>
          </div>
          <div class="checkPClass">
            <div class="beforeP">
              <span style="margin-right: 10px">每</span>
              <!--<md-button ref="zhouBtn" style="width: 60px;height: 35px;" type="warning"
                         :class="selectBtnNum === 1?'activeClass':'inactiveClass'"
                          @click="selectDateBtn(1)">周</md-button>
              <md-button ref="yueBtn" style="width: 60px;height: 35px;" type="warning"
                         :class="selectBtnNum === 2?'activeClass':'inactiveClass'"
                         @click="selectDateBtn(2)">月</md-button>
              <md-button ref="jiBtn" style="width: 60px;height: 35px;" type="warning"
                         :class="selectBtnNum === 3?'activeClass':'inactiveClass'"
                         @click="selectDateBtn(3)">季</md-button>-->

              <div style="width: 60px;height: 35px;line-height: 35px;text-align: center"
                         :class="selectBtnNum === 1?'activeClass':'inactiveClass'"
                         @click="selectDateBtn(1,-7,7)">周</div>
              <div style="width: 60px;height: 35px;line-height: 35px;text-align: center"
                         :class="selectBtnNum === 2?'activeClass':'inactiveClass'"
                         @click="selectDateBtn(2,-28,28)">月</div>
              <div style="width: 60px;height: 35px;line-height: 35px;text-align: center"
                         :class="selectBtnNum === 3?'activeClass':'inactiveClass'"
                         @click="selectDateBtn(3,-84,84)">季</div>
            </div>
            <div class="afterP">
              <span>第</span>
              <input  name="day" ref="datInp"  v-model="selectDayIpt" @input="dayChange" :disabled="isEditNew === '1'"  style="width: 40px;text-align: center;margin: 0 10px">
              <!--<md-input-item
                style="border: 1px solid lightgrey;width: 60px;margin: 0 10px 10px;"
                v-model="selectDayIpt"
                @change="dayChange"
                align="center"
              ></md-input-item>-->
              <span>天</span>
            </div>
          </div>
          <div class="msgInfo">
            <div class="msgFont">
              <md-icon name="warn" color="red" size="sm" style="margin-right: 10px;padding-bottom: 5px"></md-icon>特殊的：倒数第一天填写-1；倒数第二天填写-2；以此类推。
            </div>
            <div class="msgFont">
              <md-icon name="warn" color="red" size="sm"  style="margin-right: 10px;padding-bottom: 20px"></md-icon>未按期检查，系统自动发送手机短信进行催办。
            </div>
          </div>
          <div style="height: 1px;background-color: #e0e0e0"></div>
          <md-field-item solid title="生效日期" align="right" :content="selectDateStr ? selectDateStr : '请选择'" :disabled="isEditNew === '1'" class="divFieldItem" arrow @click="selectEffectiveDate"/>
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
          <div style="height: 1px;background-color: #e0e0e0;margin-top: 10px"></div>
          <select-item :title="jianUserTitle"
                       :select-type="jianUserType"
                       :select-user-arr="jianSelectUser">
          </select-item>
          <div style="height: 1px;background-color: #e0e0e0;margin-top: 10px"></div>
          <!--暂时不用-->
          <!--<div style="height: 1px;background-color: #e0e0e0;margin-top: 10px"></div>
          <div class="msgTitle">
            <span>短信提醒</span>
          </div><div style="height: 1px;background-color: #e0e0e0;margin-top: 10px"></div>
          <select-item :title="exeUserTitle"
                       :select-type="exeUserType"
                       :select-user-arr="exeSelectUser">
          </select-item>
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
          <div style="height: 1px;background-color: #e0e0e0"></div>
          <div class="s-btn">
            <!--<div style="height: 1px;background-color: #e0e0e0"></div>-->
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
// import MdRadioBox from 'mand-mobile/components/radio/box'
const selectUser = 'selectUser'
const checkName = 'checkName'
const reportPeriod = 'reportPeriod'
const checkPeriodNew = 'checkPeriodNew'
const selectDept = 'selectDept'
// const msgTipKey = 'msgTipKey'
const selectDate = 'selectDate'
export default {
  name: 'CreateCheckTb',
  components: {
    //  MdRadioBox,
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
      selectDateStr: '',
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
      jianUserTitle: '监督人',
      jianUserType: 5,
      jianSelectUser: [],
      checkId: '-1',
      selectDayIpt: 1,
      selectBtnNum: 2,
      isEditNew: '0'
      /* tiemChecked: '3',
      selectWeek: '6',
      currDay: 28,
      selectDay: '1' */
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
      this.getCheckIsEditNew()
    } else {
      this.checkId = sessionStorage.getItem('sCheckId')
      if (!this.checkId) {
        this.checkId = '-1'
      }
      this.getValue()
      this.getCheckIsEditNew()
    }
  },
  methods: {
    onDatePickerInitialed () {
      /* console.log(`[Mand Mobile] DatePicker getFormatDate: ${this.$refs.datePicker.getFormatDate('yyyy/MM/dd')}`) */
    },
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
    getCheckIsEditNew () {
      this.$http.get('statement/isReform', { params: {
        id: this.checkId
      } }).then(res => {
        this.isEditNew = res.data
      })
    },
    saveCheckTb () {
      this.getValue()
      if (this.valid().isValid) {
        /* let msgTipWay = ''
        if (this.tiemChecked === '3' || this.tiemChecked === '1') {
          msgTipWay = this.tiemChecked
        } else if (this.tiemChecked === '0') {
          msgTipWay = this.tiemChecked + ',' + this.selectWeek
        } else {
          msgTipWay = this.tiemChecked + ',' + this.selectDay
        } */
        this.$http.post('check/addCheck', {
          checkId: this.checkId,
          name: this.checkTbName,
          deptName: this.checkDeptName,
          checkPeriod: this.reportPeriodName,
          periodWay: this.selectBtnNum + ',' + this.selectDayIpt,
          takeEffectTime: this.selectDateStr,
          creatorId: getUser()[0].userId,
          checkUserRoleList: changeValueToUser(this.checkSelectUser, 2),
          receiveUserRoleList: changeValueToUser(this.receiveSelectUser, 4),
          exeUserRoleList: changeValueToUser(this.exeSelectUser, 3),
          superVersionUserRoleList: changeValueToUser(this.jianSelectUser, 5)
          /* msgTipWay: msgTipWay */
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
      } else {
        Dialog.failed({
          title: ' ',
          content: this.valid().msg,
          confirmText: '确定'
        })
      }
    },
    check () {
      KeyboardJackUp()
    },
    valid () {
      let obj = {
        isValid: true,
        msg: ''
      }
      if (!this.checkTbName) {
        obj.isValid = false
        obj.msg = '检查表名称不能为空'
        return obj
      }
      if (this.checkTbName.length > 20) {
        obj.isValid = false
        obj.msg = '检查表名称不能大于20个字符'
        return obj
      }
      if (!this.selectDayIpt) {
        obj.isValid = false
        obj.msg = '天数不能为空'
        return obj
      }
      if (!this.selectDateStr) {
        obj.isValid = false
        obj.msg = '生效日期不能为空'
        return obj
      }
      if (!this.checkDeptName) {
        obj.isValid = false
        obj.msg = '对象不能为空'
        return obj
      }
      if (!this.checkSelectUser || this.checkSelectUser < 1) {
        obj.isValid = false
        obj.msg = '检查人不能为空'
        return obj
      }
      if (!this.receiveSelectUser || this.receiveSelectUser < 1) {
        obj.isValid = false
        obj.msg = '接收人不能为空'
        return obj
      }
      if (!this.exeSelectUser || this.exeSelectUser < 1) {
        obj.isValid = false
        obj.msg = '执行人不能为空'
        return obj
      }
      if (!this.jianSelectUser || this.jianSelectUser < 1) {
        obj.isValid = false
        obj.msg = '监督人不能为空'
        return obj
      }
      return obj
    },
    async getCheckById () {
      const result = await this.$http.get('check/getCheckById', {
        params: { checkId: this.checkId }
      })
      const checkTb = result.data
      sessionStorage.setItem(checkName, checkTb.name)
      sessionStorage.setItem(selectDept, checkTb.deptName)
      sessionStorage.setItem(reportPeriod, checkTb.checkPeriod)
      sessionStorage.setItem(checkPeriodNew, checkTb.periodWay === null ? 'e,0' : checkTb.periodWay) // 检查周期
      sessionStorage.setItem(selectDate, checkTb.takeEffectTime === null ? '' : checkTb.takeEffectTime) // 生效日期
      sessionStorage.setItem(selectUser + this.checkUserType, JSON.stringify(changeUserToValue(checkTb.checkUserRoleList)))
      sessionStorage.setItem(selectUser + this.receiveUserType, JSON.stringify(changeUserToValue(checkTb.receiveUserRoleList)))
      sessionStorage.setItem(selectUser + this.exeUserType, JSON.stringify(changeUserToValue(checkTb.exeUserRoleList)))
      sessionStorage.setItem(selectUser + this.jianUserType, JSON.stringify(changeUserToValue(checkTb.superVersionUserRoleList)))
      // sessionStorage.setItem(msgTipKey, checkTb.msgTipWay)
      this.getValue()
    },
    getValue () {
      let checkTbName = sessionStorage.getItem(checkName)
      let checkDeptName = sessionStorage.getItem(selectDept)
      // let reportPeriodName = sessionStorage.getItem(reportPeriod)
      let checkPeriodNewStr = sessionStorage.getItem(checkPeriodNew)
      let selectDateStr = sessionStorage.getItem(selectDate)
      let checkStr = sessionStorage.getItem(selectUser + this.checkUserType)
      let receiveStr = sessionStorage.getItem(selectUser + this.receiveUserType)
      let exeStr = sessionStorage.getItem(selectUser + this.exeUserType)
      let jianStr = sessionStorage.getItem(selectUser + this.jianUserType)
      /* let msgTitStr = sessionStorage.getItem(msgTipKey)
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
      } */
      if (!checkPeriodNewStr) {
        this.selectBtnNum = 2
        this.selectDayIpt = 1
      } else {
        let msgArr = checkPeriodNewStr.split(',')
        this.selectBtnNum = parseInt(msgArr[0])
        this.selectDayIpt = parseInt(msgArr[1])
      }
      this.checkTbName = (checkTbName === null || checkTbName === undefined) ? '' : checkTbName
      this.checkDeptName = (checkDeptName === null || checkDeptName === undefined) ? '' : checkDeptName
      // this.reportPeriodName = (reportPeriodName === null || reportPeriodName === undefined) ? '' : reportPeriodName
      this.selectDateStr = (selectDateStr === null || selectDateStr === undefined) ? '' : selectDateStr
      this.checkSelectUser = (checkStr === null || checkStr === undefined) ? [] : JSON.parse(checkStr)
      this.receiveSelectUser = (receiveStr === null || receiveStr === undefined) ? [] : JSON.parse(receiveStr)
      this.exeSelectUser = (exeStr === null || exeStr === undefined) ? [] : JSON.parse(exeStr)
      this.jianSelectUser = (jianStr === null || jianStr === undefined) ? [] : JSON.parse(jianStr)
    },
    selectDeptMethod () {
      this.$router.push({ name: 'selectDept' })
    },
    selectEffectiveDate () {
      this.$router.push({ name: 'selectDate' })
    },
    getCountDays () {
      var curDate = new Date()
      /* 获取当前月份 */
      var curMonth = curDate.getMonth()
      /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
      curDate.setMonth(curMonth + 1)
      /* 将日期设置为0,  */
      curDate.setDate(0)
      /* 返回当月的天数 */
      this.currDay = curDate.getDate()
    },
    selectDateBtn (val, min, max) {
      if (this.isEditNew === '1') {
        return
      }
      if (this.selectDayIpt < min || this.selectDayIpt > max) {
        Dialog.alert({
          title: ' ',
          content: '请将天数修改至' + min + ' - ' + max + '之间',
          confirmText: '确定'
        })
        return
      }
      this.selectBtnNum = val
    },
    dayChange () {
      if (this.selectDayIpt === '' || this.selectDayIpt === '-') {
        this.$refs.datInp.focus()
        return
      }
      if (parseInt(this.selectDayIpt) === 0) {
        Dialog.alert({
          title: ' ',
          content: '填写的天数不能是0',
          confirmText: '确定'
        })
        this.selectDayIpt = ''
        this.$refs.datInp.focus()
        return
      }
      if (this.selectDayIpt.split('-').length > 2) {
        Dialog.alert({
          title: ' ',
          content: '填写的天数不能包含多个-号',
          confirmText: '确定'
        })
        this.selectDayIpt = ''
        this.$refs.datInp.focus()
        return
      }
      if (/^[0-9]*[1-9][0-9]*$/.test(this.selectDayIpt) || /^-[0-9]*[1-9][0-9]*$/.test(this.selectDayIpt)) {
        let numDay = parseInt(this.selectDayIpt)
        switch (this.selectBtnNum) {
          case 1: {
            if (numDay > 7 || numDay < -7) {
              Dialog.alert({
                title: ' ',
                content: '当选择每周时，填写的天数要在-7 - 7 之间，但不包含0',
                confirmText: '确定'
              })
              this.selectDayIpt = ''
              this.$refs.datInp.focus()
            }
            break
          }
          case 2: {
            if (numDay > 28 || numDay < -28) {
              Dialog.alert({
                title: ' ',
                content: '当选择每月时，填写的天数要在-28 - 28 之间，但不包含0',
                confirmText: '确定'
              })
              this.selectDayIpt = ''
              this.$refs.datInp.focus()
            }
            break
          }
          case 3: {
            if (numDay > 84 || numDay < -84) {
              Dialog.alert({
                title: ' ',
                content: '当选择每季时，填写的天数要在-84 - 84 之间，但不包含0',
                confirmText: '确定'
              })
              this.selectDayIpt = ''
              this.$refs.datInp.focus()
            }
            break
          }
        }
      } else {
        this.selectDayIpt = ''
        this.$refs.datInp.focus()
      }
    }
  },
  watch: {
    checkTbName () {
      sessionStorage.setItem(checkName, this.checkTbName)
    },
    reportPeriodName () {
      sessionStorage.setItem(reportPeriod, this.reportPeriodName)
    },
    selectDateStr () {
      sessionStorage.setItem(selectDate, this.selectDateStr)
    },
    selectBtnNum () {
      sessionStorage.setItem(checkPeriodNew, this.selectBtnNum + ',' + this.selectDayIpt)
    },
    selectDayIpt () {
      sessionStorage.setItem(checkPeriodNew, this.selectBtnNum + ',' + this.selectDayIpt)
    }
    /* tiemChecked () {
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
    } */
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
  .activeClass{
    background-color: red;
  }
  .inactiveClass{
    background-color: rgba(255, 0, 0, 0.29);
  }
  .msgInfo{
    font-size: 0.22rem;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-top: 30px;
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
  .checkPClass{
    font-size: 0.32rem;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .msgFont{
    color: red;
    display: flex;
    display: -webkit-flex;
  }
  .beforeP{
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .afterP{
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  .msgTitle{
    font-size: 0.32rem;
    margin-bottom: 35px;
    margin-top: 25px;
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
  [v-cloak]{
    display: none;
  }
</style>
