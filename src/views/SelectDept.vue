<template>
  <div class="select-contain">
    <div class="s-backBar">
      <back-bar v-bind:title="title" @receive="clearData"></back-bar>
    </div>
    <div class="s-input">
      <md-input-item class="s-item"
                     ref="input9"
                     placeholder="请输入部门名称"
                     clearable
                     v-model="keyValue"
                     @change="deptSearch"
      >
        <md-icon name="search" slot="left" size="lg" @click="deptSearch"></md-icon>
      </md-input-item>
      <md-button class="s-btn" type="default"  round @click="addDept" :loading="loading" :inactive="inactive" icon="right">添加</md-button>
    </div>
    <div class="s-list" v-if="findDepts.length > 0">
      <md-scroll-view
        :auto-reflow="true"
        :scrolling-x="false"
      >
        <md-field title="查询结果">
          <md-radio-list
            v-model="selectDept"
            :options="findDepts"
            iconPosition="left"
            class="scroll-view-item"
          />
        </md-field>
        <md-field style="margin-top: 50px;visibility: hidden" title="Adjustment Style">
        </md-field>
      </md-scroll-view>
    </div>
    <div v-else class="s-noData">
      <md-result-page></md-result-page>
    </div>
  </div>
</template>

<script>
import BackBar from '../components/BackBar'
import { InputItem, Icon, ScrollView, CheckList, Field, ResultPage, Button, Dialog, RadioList } from 'mand-mobile'
const selectDept = 'selectDept'
export default {
  name: 'SelectDept',
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [ScrollView.name]: ScrollView,
    [Icon.name]: Icon,
    [CheckList.name]: CheckList,
    [ResultPage.name]: ResultPage,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [RadioList.name]: RadioList,
    BackBar
  },
  data () {
    return {
      selectDept: '',
      title: '选择部门',
      keyValue: '',
      findDepts: [],
      loading: false,
      inactive: false
    }
  },
  created () {
  },
  methods: {
    async deptSearch () {
      if (this.keyValue) {
        const result = await this.$http.get('report/queryDep', { params: { like: this.keyValue } })
        if (result.data && result.data.length > 0) {
          this.findDepts = result.data
        } else {
          this.findDepts = []
        }
      }
    },
    clearData () {
      this.keyValue = ''
      this.findDepts = []
      this.selectDept = ''
    },
    addDept () {
      if (this.selectDept) {
        this.loading = true
        this.inactive = true
        let deptThat = this.selectDept
        let obj = this.findDepts.find(function (obj) {
          return obj.value === deptThat
        })
        sessionStorage.setItem(selectDept, obj.text)
        Dialog.alert({
          title: ' ',
          content: '选择成功，返回查看',
          confirmText: '确定'
        })
        this.loading = false
        this.inactive = false
        this.findDepts = []
        this.selectDept = ''
        this.keyValue = ''
      } else {
        Dialog.alert({
          title: ' ',
          content: '请选中要添加的部门',
          confirmText: '确定'
        })
      }
    }
  }
}
</script>

<style scoped>
  .s-input {
    display: -webkit-flex;
    display: flex;
    align-items: center;
    background-color: #D5D5D5;
    padding: 15px 0;
  }
  .s-item {
    margin: 0px 20px;
    background-color: white;
    border-radius: 20px;
    width: 400%;
  }
  .s-list{
    height:1000px;
    background :#FFF;
    text-align :left;
  }
</style>
