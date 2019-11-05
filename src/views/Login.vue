<template>
<div class="contain">
  <div class="login-title">
    <div class="title">美宿标准化检查管理系统</div>
    <div class="version">V1.0</div>
  </div>
  <div class="login-from">
    <md-field>
      <md-input-item style="margin: 30px 0"
        ref="input9"
        placeholder="账户"
        clearable
        v-model="userId"
        is-highlight
        @blur="checkUserId"
      >
        <md-icon name="authentication" slot="left" size="lg"></md-icon>
        <p
          v-if="isUserIdError"
          class="error"
          slot="error"
        >
          <span class="error-info">{{userIdError}}</span><span class="error-action" @click="userIdTip">查看账户规则</span>
        </p>
      </md-input-item>

      <md-input-item style="margin: 30px 0"
        ref="input11"
        type="password"
        placeholder="密码"
        clearable
        is-highlight
        v-model="password"
        @blur="checkPassword"
      >
        <md-icon name="security" slot="left" size="lg"></md-icon>
        <p
          v-if="isPasswordError"
          class="error"
          slot="error"
        >
          <span class="error-info">{{passwordError}}</span><span class="error-action" @click="passwordTip">查看密码规则</span>
        </p>
      </md-input-item>
    </md-field>
  </div>
  <div class="login-button">
    <div class="l-switch">
      <md-switch
        v-model="isActive"
      ></md-switch><span>记住密码</span>
    </div>
    <div class="l-login">
      <md-button type="warning" round @click="login" :loading="loading" :inactive="inactive">登录</md-button>
    </div>
  </div>
</div>
</template>

<script>
import { compileStr, uncompileStr, KeyboardJackUp } from '../utils'
import { InputItem, Field, Icon, Dialog, Button, Switch } from 'mand-mobile'

export default {
  name: 'Login',
  components: {
    [InputItem.name]: InputItem,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Switch.name]: Switch,
    [Field.name]: Field
  },
  data () {
    return {
      isActive: false,
      userId: '',
      password: '',
      isUserIdError: true,
      isPasswordError: true,
      userIdError: '',
      passwordError: '',
      loading: false,
      inactive: false
    }
  },
  methods: {
    checkUserId () {
      if (!this.userId) {
        this.isUserIdError = true
        this.userIdError = '用户名不能为空'
      } else {
        this.isUserIdError = false
        this.userIdError = ''
      }
      // KeyboardJackUp()
    },
    checkPassword () {
      if (!this.password) {
        this.isPasswordError = true
        this.passwordError = '密码不能为空'
      } else {
        this.isPasswordError = false
        this.passwordError = ''
      }
      KeyboardJackUp()
    },
    userIdTip () {
      Dialog.alert({
        content: '输入你的OA用户名'
      })
    },
    passwordTip () {
      Dialog.alert({
        content: '输入你的OA密码'
      })
    },
    async login () {
      if (!this.isUserIdError && !this.isPasswordError) {
        this.loading = true
        this.inactive = true
        const result = await this.$http.get('user/login', { params: { userId: this.userId, password: this.password } })
        if (result.code === 1) {
          if (this.isActive) {
            const rememberUserInfo = { userId: this.userId, password: this.password }
            localStorage.setItem('rememberInfo', compileStr(JSON.stringify(rememberUserInfo)))
          } else {
            localStorage.removeItem('rememberInfo')
          }
          this.$store.commit('setToken', result.token)
          this.$store.commit('setUser', JSON.stringify(result.data))
          this.$router.replace({ path: 'downTabBar/index/createList' })
        } else {
          Dialog.alert({
            content: result.msg
          })
        }
        this.loading = false
        this.inactive = false
      }
    }

  },
  mounted () {
    const info = localStorage.getItem('rememberInfo')
    if (info) {
      const user = JSON.parse(uncompileStr(info))
      this.userId = user.userId
      this.password = user.password
      this.isActive = true
      this.isUserIdError = false
      this.isPasswordError = false
    }
    this.$refs.input9.focus()
  }
}

</script>

<style scoped>
  .contain{
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: column;
  }
  .error{
    text-align: left;
    width: 100%;
  }
  .error-info{

  }
  .error-action{
    position: absolute;
    right: 0;
    color: #5878B4;
  }
  .login-button{
    margin:0 50px;
  }
  .login-title{
    margin: 150px 0 60px;
  }
  .login-title .title{
    font-size: 40px;
    margin: 20px;
    font-weight: bold;
  }
  .login-title .version{
    font-size: 30px;
  }
  .l-switch{
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin: 20px 0;
  }
  .l-switch > span{
    margin-left: 10px;
    font-size: 30px;
  }
</style>
