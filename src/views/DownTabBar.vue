<template>
  <div class="down-contain">
    <div class="d-router">
      <transition :name="transitionName">
          <router-view class="router"/>
      </transition>
    </div>
    <div class="d-bar">
        <md-tab-bar
          v-model="current"
          :items="items"
          :has-ink="true"
          :immediate="true"
          @change="changeBar"
        >
          <template slot="item" slot-scope="{ item }">
            <div class="custom-item">
              <div class="icon">
                <md-icon :name="item.icon" />
              </div>
              <div class="text">
                <span v-text="item.label"></span>
              </div>
            </div>
          </template>
        </md-tab-bar>
      </div>
  </div>
</template>

<script>
import { TabBar, Icon } from 'mand-mobile'
export default {
  name: 'DownTabBar',
  components: {
    [TabBar.name]: TabBar,
    [Icon.name]: Icon
  },
  data () {
    return {
      transitionName: 'slide-right',
      current: 1,
      items: [{ name: 1, label: '首页', icon: 'home' }, { name: 2, label: '我的', icon: 'user' }]
    }
  },
  methods: {
    changeBar (item, index, prevIndex) {
      switch (index) {
        case 0: {
          if (index === 0) {
            this.$router.push({ path: '/downTabBar/index' })
          } else {
            this.$router.push({ path: '/downTabBar/InitSelection' })
          }
          break
        }
        case 1: {
          this.$router.push({ path: '/downTabBar/home' })
          break
        }
      }
    }
  }
}
</script>

<style scoped>
  .down-contain{
  }
  .d-bar{
    position:fixed;
    bottom: 0;
    z-index: 1000;
    width :100%;
  }
  .router{
    position :absolute;
    transition: all 0.5s ease;
    width:100%;
  }
  .silde-left-enter, .slide-right-leave-active{
    opacity: 0;
    -webkit-transform :translate(100%, 0);
    transform: translate(100%, 0);
  }
  .slide-left-leave-active, .slide-right-enter{
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform :translate(-100%, 0);
  }
</style>
