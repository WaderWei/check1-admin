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
      <md-button class="s-btn" type="default"  round @click="addUser" :loading="loading" :inactive="inactive" icon="right">添加</md-button>
    </div>
    <div class="s-list" v-if="findUser.length > 0">
      <div class="s-allSelect">
        <md-agree
          v-model="agreeConf.checked"
          :disabled="agreeConf.disabled"
          :size="agreeConf.size"
          @change="allSelector(agreeConf.name, agreeConf.checked, $event)"
        >
          全选
        </md-agree>
      </div>
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
import { InputItem, Icon, ScrollView, CheckList, Field, ResultPage, Button, Dialog, DropMenu, Agree } from 'mand-mobile'
import { findObjArrWithIdArr, getUser } from '../utils'
const selectUser = 'selectUser'
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
    [DropMenu.name]: DropMenu,
    [Agree.name]: Agree,
    BackBar
  },
  data () {
    return {
      title: '选人',
      keyValue: '',
      routeType: '',
      roleType: 0,
      selector: [],
      findUser: [],
      loading: false,
      inactive: false,
      isAllSelect: false,
      agreeConf: {
        checked: false,
        name: 'all',
        size: 'lg',
        disabled: false,
        introduction: '选中状态'
      }
    }
  },
  created () {
    this.routeType = this.$route.query.type
    this.roleType = this.$route.query.roleType
  },
  methods: {
    async usersSearch () {
      if (this.keyValue) {
        this.agreeConf.checked = false
        this.selector = []
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
    allSelector (name, status, event) {
      if (status) {
        this.selector = this.findUser.map(s => s.value)
      } else {
        this.selector = []
      }
    },
    addUser () {
      if (this.selector && this.selector.length > 0) {
        this.loading = true
        this.inactive = true
        // admin
        if (this.routeType === '1') {
          this.commonAdd('user/addUserRole', 1, '制定人添加成功')
        } else if (this.routeType === '2') {
          this.commonAdd('user/addUserRole', 6, '超级监督人添加成功')
        } else if (parseInt(this.routeType) === 10) {
          this.judgeUser(2)
        } else if (parseInt(this.routeType) === 11) {
          this.judgeUser(this.roleType)
        } else if (parseInt(this.routeType) === 12) {
          this.judgeUser(this.roleType)
        } else {
          this.addStore()
        }
      } else {
        Dialog.alert({
          title: ' ',
          content: '请选中要添加的员工',
          confirmText: '确定'
        })
      }
    },
    commonAdd (url, type, tip) {
      let userRoles = []
      for (let i = 0; i < this.selector.length; i++) {
        userRoles.push({ userId: this.selector[i], roleType: type })
      }
      this.$http.post(url, {
        parameter: userRoles
      }).then(res => {
        if (res.code === 1) {
          Dialog.alert({
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
            content: '失败信息' + res.msg,
            confirmText: '确定'
          })
        }
        this.loading = false
        this.inactive = false
      })
    },
    judgeUser (val) {
      let qs = this.$qs
      this.$http.get('statement/isUserCheckUser', {
        params: {
          userId: getUser()[0].userId,
          checkUserIds: this.selector,
          roleType: val
        },
        paramsSerializer: params => {
          return qs.stringify(params, { indices: false })
        }
      }).then(res => {
        if (res.code === 1) {
          this.keyValue = ''
          this.addStore()
        } else if (res.code === 0) {
          Dialog.alert({
            title: ' ',
            content: '选择的人不在此范围内',
            confirmText: '确定' })
        } else {
          Dialog.failed({
            title: ' ',
            content: '失败信息' + res.msg,
            confirmText: '确定'
          })
        }
        this.loading = false
        this.inactive = false
      })
    },
    addStore () {
      let storageUserArr = []
      let selectUserArr = findObjArrWithIdArr(this.findUser, this.selector)
      if (this.selector[0] === 0) {
        storageUserArr = selectUserArr
      } else {
        let storageUserStr = sessionStorage.getItem(selectUser + this.routeType)
        if (storageUserStr) {
          storageUserArr = JSON.parse(storageUserStr)
          for (let i = 0; i < selectUserArr.length; i++) {
            // 如果存储中的数组中不存在，则加入到存储中的数组中
            if (!(storageUserArr.find(s => s.value === selectUserArr[i].value))) {
              storageUserArr.push(selectUserArr[i])
            }
          }
          for (let i = 0; i < storageUserArr.length; i++) {
            if (storageUserArr[i].value === 0) {
              storageUserArr.splice(i, 1)
              break
            }
          }
        } else {
          storageUserArr = selectUserArr
        }
      }
      sessionStorage.setItem(selectUser + this.routeType, JSON.stringify(storageUserArr))
      Dialog.alert({
        title: ' ',
        content: '选择成功，返回查看',
        confirmText: '确定'
      })
      this.loading = false
      this.inactive = false
      this.selector = []
      this.findUser = []
      this.keyValue = ''
    }
  }
}
</script>

<style scoped>
  .s-allSelect{
    font-size: 30px;
    margin: 30px 0 20px 40px;
  }
  .s-input {
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
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
