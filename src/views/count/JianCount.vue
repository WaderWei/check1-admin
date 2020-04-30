<template>
  <div class="create-contain">
    <div class="s-backBar">
      <back-bar v-bind:title="title" v-bind:type="type"></back-bar>
    </div>
    <div style="height: 5px;background-color: #e0e0e0"></div>
    <div class="s-from">
      <md-scroll-view
        :auto-reflow="true"
        :scrolling-x="false"
      >
        <md-field>
          <!--10：标记为被监督人选择-->
          <select-item :title="jianUserTitle"
                       :select-type="jianUserType"
                       :select-user-arr="jianSelectUser">
          </select-item>
          <div style="height: 1px;background-color: #e0e0e0"></div>
          <md-field-item
            title="开始日期"
            arrow="arrow-right"
            align="right"
            :content="startDate"
            @click.native="showDp(1)">
          </md-field-item>
          <div style="height: 1px;background-color: #e0e0e0"></div>
          <md-field-item
            title="结束日期"
            arrow="arrow-right"
            align="right"
            :content="endDate"
            @click.native="showDp(2)">
          </md-field-item>
          <div style="height: 1px;background-color: #e0e0e0"></div>
        </md-field>
        <div style="height: 1px;background-color: #e0e0e0"></div>
        <div style="height: 8px;background-color: #e0e0e0"></div>
        <md-field style="white-space: nowrap">
          <div>
            <span style="margin-right: 10px;float: left;font-size: 0.80rem;color: red">|</span>
            <md-field-item solid title="共监督检查表" align="right" :content="allCheck+'个'" arrow @click="toList(1)"/>
          </div>
          <md-field-item solid title="正常完成检查" align="right" :content="normalCheck+'起'" arrow @click="toList(2)"/>
          <div style="height: 1px;background-color: #e0e0e0"></div>
          <md-field-item solid title="逾期未处理" align="right" :content="overdueCheck+'起'" arrow @click="toList(3)"/>
          <div style="height: 1px;background-color: #e0e0e0"></div>
          <md-field-item solid title="逾期已处理" align="right" :content="overdueDisposeCheck+'起'" arrow @click="toList(4)"/>
          <div style="height: 1px;background-color: #e0e0e0"></div>

        </md-field>
        <md-field style="margin-top: 50px;visibility: hidden" title="Adjustment Style">
        </md-field>
      </md-scroll-view>
    </div>
    <md-date-picker
      ref="datePicker"
      v-model="isDatePickerShow"
      title="选择日期"
      large-radius
      :min-date="minDate"
      :max-date="maxDate"
      :default-date="currentDate"
      @confirm="onDatePickerConfirm"
      @initialed="onDatePickerInitialed"
    ></md-date-picker>
  </div>
</template>

<script>
import {
  InputItem,
  Field,
  Icon,
  Toast,
  ScrollView,
  Button,
  FieldItem,
  Dialog,
  Radio,
  RadioBox,
  DatePicker
} from 'mand-mobile'
import { getUser } from '../../utils'
import BackBar from '../../components/BackBar'
import SelectItem from '../../components/SelectItem'

let all = { value: -1, label: '全体', brief: '全体' }
export default {
  name: 'jianCount',
  components: {
    //  MdRadioBox,
    [DatePicker.name]: DatePicker,
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
      type: 1,
      title: '检查表执行统计',
      jianUserTitle: '被监督人(检查人)',
      jianUserType: 10, /* 标记为被监督人选择 */
      jianSelectUser: [],
      currentDate: new Date(),
      isDatePickerShow: false,
      startDate: '',
      endDate: '',
      minDate: new Date('2018/01/01'),
      maxDate: new Date(),
      dateFlag: 1,
      allCheck: '0',
      allCheckIds: [],
      normalCheck: '0',
      normalCheckIds: [],
      overdueCheck: '0',
      overdueCheckIds: [],
      overdueDisposeCheck: '0',
      overdueDisposeCheckIds: []
    }
  },
  created () {
    this.startDate = this.getStartDate()
    this.endDate = this.getEndDate()
    let jianStr = sessionStorage.getItem('selectUser' + this.jianUserType)
    this.jianSelectUser = (jianStr === null || jianStr === undefined) ? [all] : JSON.parse(jianStr)
    this.getData()
  },
  methods: {
    getData () {
      // todo 这里还要给roleType
      let ids = this.jianSelectUser.map(s => s.value)
      let qs = this.$qs
      this.$http.get('/statement/querySupervise', {
        params: {
          userId: getUser()[0].userId,
          checkUserId: ids,
          dateFrom: this.startDate,
          dateTo: this.endDate
        },
        paramsSerializer: params => {
          return qs.stringify(params, { indices: false })
        }
      })
        .then(res => {
          if (res.code === 1) {
            let data = res.data
            this.allCheck = data.allCheck.toString()
            this.normalCheck = data.normalCheck.toString()
            this.overdueCheck = data.overdueCheck.toString()
            this.overdueDisposeCheck = data.overdueDisposeCheck.toString()
            this.allCheckIds = data.allCheckIds ? data.allCheckIds : []
            this.normalCheckIds = data.normalCheckIds ? data.normalCheckIds : []
            this.overdueCheckIds = data.overdueCheckIds ? data.overdueCheckIds : []
            this.overdueDisposeCheckIds = data.overdueDisposeCheckIds ? data.overdueDisposeCheckIds : []
          }
        })
    },
    showDp (val) {
      this.dateFlag = val
      this.isDatePickerShow = true
    },
    onDatePickerConfirm (columnsValue) {
      if (this.dateFlag === 1) {
        this.startDate = this.$refs.datePicker.getFormatDate('yyyy/MM/dd')
      } else {
        this.endDate = this.$refs.datePicker.getFormatDate('yyyy/MM/dd')
      }
    },
    onDatePickerInitialed () {
      // console.log(`[Mand Mobile] DatePicker getFormatDate: ${this.$refs.datePicker.getFormatDate('yyyy/MM/dd')}`)
    },
    getCount () {
      if (this.Datetab(this.startDate, this.endDate)) {
        Dialog.alert({
          title: ' ',
          content: '开始时间不能大于结束时间',
          confirmText: '确定'
        })
      } else {
        this.getData()
      }
    },
    Datetab (startDate, endDate) {
      let oDate1 = new Date(startDate)
      let oDate2 = new Date(endDate)
      return oDate1.getTime() > oDate2.getTime()
    },
    toList (val) {
      switch (val) {
        case 1: {
          // console.log(this.allCheckIds)
          this.$router.push({ name: 'searchCheckList', query: { ids: this.allCheckIds } })
          break
        }
        case 2: {
          this.$router.push({ name: 'completeReport', query: { ids: this.normalCheckIds } })
          break
        }
        case 3: {
          this.$router.push({ name: 'unCompleteReport', query: { ids: this.overdueCheckIds } })
          break
        }
        case 4: {
          this.$router.push({ name: 'unComUnDealReport', query: { ids: this.overdueDisposeCheckIds } })
          break
        }
      }
    },
    setStartDate (val) {
      sessionStorage.setItem('startDate', JSON.stringify(val))
    },
    setEndDate (val) {
      sessionStorage.setItem('endDate', JSON.stringify(val))
    },
    getStartDate () {
      let s = JSON.parse(sessionStorage.getItem('startDate'))
      if (s === null) {
        let date1 = new Date()
        let date2 = new Date(date1)
        date2.setDate(date1.getDate() - 30)
        this.endDate = date1.getFullYear() + '/' + ((date1.getMonth() + 1) < 10 ? ('0' + (date1.getMonth() + 1)) : (date1.getMonth() + 1)) + '/' + date1.getDate()
        s = date2.getFullYear() + '/' + ((date2.getMonth() + 1) < 10 ? ('0' + (date2.getMonth() + 1)) : (date2.getMonth() + 1)) + '/' + date2.getDate()
      }
      return s
    },
    getEndDate () {
      let s = JSON.parse(sessionStorage.getItem('endDate'))
      if (s === null) {
        let date1 = new Date()
        let date2 = new Date(date1)
        date2.setDate(date1.getDate() - 30)
        s = date1.getFullYear() + '/' + ((date1.getMonth() + 1) < 10 ? ('0' + (date1.getMonth() + 1)) : (date1.getMonth() + 1)) + '/' + date1.getDate()
      }
      return s
    }
  },
  watch: {
    '$store.state.selectUserArr': {
      handler (newVal, oldVal) {
        if (!oldVal) {
          return
        }
        if (newVal.length === 0) {
          this.jianSelectUser = []
          this.jianSelectUser.push(all)
        }
        this.getCount()
      },
      deep: true
    },
    startDate (newVal, oldVal) {
      if (!oldVal) {
        return
      }
      this.setStartDate(newVal)
      this.getCount()
    },
    endDate (newVal, oldVal) {
      if (!oldVal) {
        return
      }
      this.setEndDate(newVal)
      this.getCount()
    }
  }
}
</script>

<style scoped>
  .create-contain {
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
  }

  .s-from {
    height: 1100px;
    text-align: left;
  }

  .s-btn {
    margin: 20px 20px 0;
  }

  .activeClass {
    background-color: red;
  }

  .inactiveClass {
    background-color: rgba(255, 0, 0, 0.29);
  }

  .msgInfo {
    font-size: 0.22rem;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-top: 30px;
  }

  .i-f-i {
  }

  .i-detail {
    font-weight: bolder;
    color: #c0a0e6;
  }

  .massageTip {
    /*margin-left: -0.2rem;*/
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    font-size: 0.32rem;
    color: #cbcbcb;
  }

  .checkPClass {
    font-size: 0.32rem;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .msgFont {
    color: red;
    display: flex;
    display: -webkit-flex;
  }

  .beforeP {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .afterP {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  .msgTitle {
    font-size: 0.32rem;
    margin-bottom: 35px;
    margin-top: 25px;
  }

  .time-week {
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }

  .week-box {
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

  .day-box {
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
