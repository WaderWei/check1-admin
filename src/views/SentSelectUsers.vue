<template>
  <div class="select-contain">
    <div class="s-backBar">
      <back-bar v-bind:title="title" @receive="clearData"></back-bar>
    </div>
    <div class="s-input">
      <md-input-item class="s-item"
                     ref="input9"
                     placeholder="请输入姓名/手机号/部门"
                     clearable
                     v-model="keyValue"
                     @change="usersSearch"
      >
        <md-icon name="search" slot="left" size="lg" @click="usersSearch"></md-icon>
      </md-input-item>
      <md-button class="s-btn" type="default"  round @click="addUser" :loading="loading" :inactive="inactive" icon="right">发送</md-button>
    </div>
    <div class="s-list" v-if="findUser.length > 0">
      <md-scroll-view
        :auto-reflow="true"
        :scrolling-x="false"
      >
        <md-field title="查询结果">
          <md-check-list
            v-model="selector"
            class="scroll-view-item"
            iconPosition="left"
            :options="findUser"
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
import { InputItem, Icon, ScrollView, CheckList, Field, ResultPage, Button, Dialog } from 'mand-mobile'
export default {
  name: 'SentSelectUsers',
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [ScrollView.name]: ScrollView,
    [Icon.name]: Icon,
    [CheckList.name]: CheckList,
    [ResultPage.name]: ResultPage,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    BackBar
  },
  data () {
    return {
      title: '选人',
      keyValue: '',
      ids: [],
      selector: [],
      findUser: [],
      loading: false,
      inactive: false
    }
  },
  created () {
    this.ids = this.$route.query.ids
  },
  methods: {
    async usersSearch () {
      if (this.keyValue) {
        const result = await this.$http.get('user/userListByLike', { params: { keyValue: this.keyValue } })
        if (result.data.length > 0) {
          this.findUser = result.data
        } else {
          this.findUser = []
        }
      }
    },
    clearData () {
      this.keyValue = ''
      this.findUser = []
      this.selector = []
    },
    addUser () {
      if (this.selector && this.selector.length > 0) {
        let qs = this.$qs
        let data = {
          method: 'post',
          params: {
            reportIds: this.ids,
            userIds: this.selector
          },
          paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
          } }
        let url = 'report/freedomSend'
        let tipContent = '发送成功'
        this.$http(url, data).then(res => {
          this.comm(res, tipContent)
        })
      } else {
        Dialog.alert({
          title: ' ',
          content: '请选中要添加的员工',
          confirmText: '确定'
        })
      }
    },
    comm (res, tip) {
      if (res.code === 1) {
        Dialog.succeed({
          title: ' ',
          content: tip,
          confirmText: '确定'
        })
        this.selector = []
        this.findUser = []
        this.keyValue = ''
      } else {
        Dialog.failed({
          title: ' ',
          content: '失败信息：' + res.msg,
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
