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
      >
        <md-icon name="search" slot="left" size="lg" @click="usersSearch"></md-icon>
      </md-input-item>
      <md-button class="s-btn" type="default"  size="small" round @click="addUser" :loading="loading" :inactive="inactive" icon="right">添加</md-button>
    </div>
    <div class="s-list" v-if="findUser.length > 0">
      <md-scroll-view
      >
        <md-field title="查询结果">
          <md-check-list
            v-model="selector"
            class="scroll-view-item"
            iconPosition="left"
            :options="findUser"
          />
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
  name: 'SelectUsers',
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
      selector: [],
      findUser: [],
      loading: false,
      inactive: false
    }
  },
  methods: {
    async usersSearch () {
      if (this.keyValue) {
        const result = await this.$http.get('user/find', { params: { keyValue: this.keyValue } })
        if (result.data.length > 0) {
          this.findUser = result.data
        } else {
          this.findUser = []
        }
      } else {
        alert('请输入关键字')
      }
    },
    clearData () {
      this.keyValue = ''
      this.findUser = []
      this.selector = []
    },
    async addUser () {
      if (this.selector) {
        console.log(this.selector)
        const result = await this.$http.post('user/adds', { params: { selectors: this.selector } })
        if (result.data > 0) {
          Dialog.succeed({
            title: '成功',
            content: '创建人添加成功',
            confirmText: '确定'
          })
          this.selector = []
          this.findUser = []
          this.keyValue = ''
        } else {
          Dialog.failed({
            title: '失败',
            content: '添加失败，请稍后重试',
            confirmText: '确定'
          })
        }
      } else {
        Dialog.alert({
          title: '提示',
          content: '请选中要添加的员工',
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
