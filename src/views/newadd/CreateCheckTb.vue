<template>
    <div class="create-contain">
      <div class="s-backBar">
        <back-bar v-bind:title="title" v-bind:type="type"></back-bar>
      </div>
      <div class="s-from">
        <md-scroll-view>
        <md-field>
          <md-input-item
            ref="checkInput"
            title="检查表名称"
            placeholder="请输入检查表名称"
            clearable
            @blur="check"
          ></md-input-item>
          <md-input-item
            ref="deptInput"
            title="检查对象"
            placeholder="请输入部门/酒店"
            clearable
            @blur="check"
          ></md-input-item>
          <md-input-item
            ref="reportPeriod"
            title="报告周期"
            placeholder="请输入报告周期"
            clearable
            @blur="check"
          ></md-input-item>
          <select-item :title="checkUserTitle"
                       :select-type="checkUserType"
                       :select-user-arr="checkSelectUser">
          </select-item>
          <select-item :title="receiveUserTitle"
                       :select-type="receiveUserType"
                       :select-user-arr="receiveSelectUser">
          </select-item>
          <select-item :title="exeUserTitle"
                       :select-type="exeUserType"
                       :select-user-arr="exeSelectUser">
          </select-item>
          <md-field-item :solid="false" class="i-detail" title="检查项目明细："
                         arrow @click="checkItemList"/>
          <div class="s-btn">
            <md-button type="default" round @click="saveCheckTb">保存</md-button>
          </div>
        </md-field>
          <md-field style="visibility: hidden" title="Adjustment Style">
          </md-field>
        </md-scroll-view>
      </div>
    </div>
</template>

<script>
import { InputItem, Field, Icon, Toast, ScrollView, Button, FieldItem } from 'mand-mobile'
import BackBar from '../../components/BackBar'
import SelectItem from '../../components/SelectItem'
import { KeyboardJackUp } from '../../utils'
const selectUser = 'selectUser'
export default {
  name: 'CreateCheckTb',
  components: {
    [InputItem.name]: InputItem,
    [ScrollView.name]: ScrollView,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [Button.name]: Button,
    [FieldItem.name]: FieldItem,
    BackBar,
    SelectItem
  },
  data () {
    return {
      title: '创建检查表',
      type: 1,
      checkUserTitle: '检查人',
      checkUserType: 2,
      checkSelectUser: [],
      receiveUserTitle: '接收人',
      receiveUserType: 3,
      receiveSelectUser: [],
      exeUserTitle: '执行人',
      exeUserType: 4,
      exeSelectUser: []
    }
  },
  created () {
    let checkStr = sessionStorage.getItem(selectUser + this.checkUserType)
    let receiveStr = sessionStorage.getItem(selectUser + this.receiveUserType)
    let exeStr = sessionStorage.getItem(selectUser + this.exeUserType)
    if (checkStr) {
      this.checkSelectUser = JSON.parse(checkStr)
    }
    if (receiveStr) {
      this.receiveSelectUser = JSON.parse(receiveStr)
    }
    if (exeStr) {
      this.exeSelectUser = JSON.parse(exeStr)
    }
  },
  destroyed () {
  },
  methods: {
    checkItemList () {
      this.$router.push({ name: 'checkItemList', params: { type: this.selectType } })
    },
    saveCheckTb () {

    },
    check () {
      KeyboardJackUp()
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
</style>
