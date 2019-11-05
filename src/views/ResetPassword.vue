<template>
  <div class="reset-contain">
    <div class="s-backBar">
      <back-bar v-bind:title="title" v-bind:type="type" ></back-bar>
    </div>
    <div class="s-body">
      <form>
        <md-input-item
          type="password"
          title="旧密码"
          v-model="oldPassword"
          placeholder="请输入旧的密码"
          clearable
          @blur="check(1)"
        >
          <p
            class="error"
            slot="error"
          >{{oldPasswordError}}</p>
        </md-input-item>
        <md-input-item
          type="password"
          title="新密码"
          v-model="newPassword1"
          placeholder="请输入新的密码"
          clearable
          @blur="check(2)"
        >
          <p
            class="error"
            slot="error"
          >{{newPasswordError1}}</p>
        </md-input-item>
        <md-input-item
          type="password"
          title="确认新密码"
          placeholder="请再次输入新的密码"
          v-model="newPassword2"
          clearable
          @blur="check(3)"
        >
          <p
            class="error"
            slot="error"
          > {{newPasswordError2}}</p>
        </md-input-item>
    </form>
    </div>
    <div class="l-btn">
      <md-button type="warning" round @click="updatePws" :loading="loading" :inactive="inactive">修改密码</md-button>
    </div>
  </div>
</template>

<script>
import BackBar from '../components/BackBar'
import { InputItem, Icon, Button, Dialog, Field } from 'mand-mobile'

export default {
  name: 'ResetPassword',
  components: {
    [InputItem.name]: InputItem,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Field.name]: Field,
    BackBar
  },
  data () {
    return {
      title: '重置密码',
      type: 1,
      oldPassword: '',
      newPassword1: '',
      newPassword2: '',
      oldPasswordError: '',
      newPasswordError1: '',
      newPasswordError2: '',
      loading: false,
      inactive: false
    }
  },
  methods: {
    check (num) {
      switch (num) {
        case 1: {
          if (!this.oldPassword) {
            this.oldPasswordError = '旧密码不能为空'
          } else {
            this.oldPasswordError = ''
          }
          break
        }
        case 2: {
          if (!this.newPassword1) {
            this.newPasswordError1 = '新密码不能为空'
            break
          } else {
            this.newPasswordError1 = ''
          }
          break
        }
        case 3: {
          if (!this.newPassword2) {
            this.newPasswordError2 = '确认新密码不能为空'
            break
          } else {
            if (!this.newPasswordError2) {
              this.newPasswordError2 = ''
            }
          }
          break
        }
      }
    },
    updatePws () {
      if (!(this.oldPassword && this.newPassword1 && this.newPassword2)) {
        return
      }
      if (this.newPassword1 !== this.newPassword2) {
        this.newPasswordError2 = '两次输入的新密码不相同'
        return
      }
      if (this.oldPassword === this.newPassword1) {
        this.newPasswordError2 = '旧密码不能与新密码相同'
        return
      }
      this.loading = true
      this.inactive = true
      const currUser = JSON.parse(sessionStorage.getItem('user'))
      this.$http.put('user/updatePwd', { userId: currUser[0].userId, oldPwd: this.oldPassword, newPwd: this.newPassword1 })
        .then(res => {
          if (res.code === 1) {
            Dialog.alert({
              title: '成功',
              content: '修改密码成功,请重新登录',
              confirmText: '确定',
              onConfirm: () => {
                localStorage.removeItem('rememberInfo')
                sessionStorage.removeItem('user')
                this.$router.replace('/login')
              }
            })
          } else {
            Dialog.failed({
              title: '失败',
              content: `操作失败，请稍后重试。<br/> 失败信息：` + res.msg,
              confirmText: '确定'
            })
          }
          this.loading = false
          this.inactive = false
        }).catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  .reset-contain{
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
  }
  .s-body{
    margin:40px 20px;
  }
  .error{
    text-align: left;
    margin-left: 20px;
  }
  .l-btn{
    margin:20px;
  }
</style>
