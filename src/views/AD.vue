<template>
  <div class="ad-contain">
    <div class="ad-img">
      <img src="../assets/ad.png" style="width: 250px">
    </div>
    <div class="ad-btn">
      <span style="color: red">{{time}}</span>
      <md-button type="link" @click="toLogin" style="color: red">跳过<md-icon name="arrow-right" size="md"></md-icon></md-button>
    </div>
  </div>
</template>

<script>
import { Button, Icon } from 'mand-mobile'
let interval = {}
export default {
  name: 'AD',
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon
  },
  data () {
    return {
      time: 5
    }
  },
  created () {
    let that = this
    interval = setInterval(function () {
      if (that.time === 1) {
        clearInterval(interval)
        that.toLogin()
      }
      that.time--
    }, 1000)
  },
  methods: {
    toLogin () {
      clearInterval(interval)
      this.$router.replace('/login')
    }
  }
}

</script>

<style scoped>
  .ad-img{
    position: absolute;
    top: 40%;
    left: 50%;
    -webkit-transform: translateY(-50%)  translateX(-50%);
    transform: translateY(-50%)  translateX(-50%);
  }
  .ad-btn{
    padding: 3px 10px;
    color: blue;
    font-size: 30px;
    position: absolute;
    top:50px;
    right: 40px;
  }
</style>
