<template>
  <div class="fzf-contain">
    <div>
      <img src="../assets/401.gif"/>
    </div>
    <div class="f-info">
      <span>您的页面迷路了哦...</span>
      <div class="f-btn">
        <md-button type="link" @click="backHome" class="f-btn">
          <md-icon name="home" size="md"></md-icon>回主页
        </md-button>
      </div>
      <div>
        <md-button type="link" @click="backLogin" class="f-btn">
          <md-icon name="authentication" size="md"></md-icon>回登录
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Icon } from 'mand-mobile'
export default {
  name: 'FZF',
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon
  },
  methods: {
    backHome () {
      this.$router.replace('/downTabBar/index/createList')
    },
    backLogin () {
      this.$router.replace('/login')
    }
  }
}

</script>
<style scoped>
  .f-info{
    font-size: 40px;
  }
  .f-btn{
    margin-top: 30px;
    text-align: center;
    cursor: pointer;
  }
</style>
