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
          :has-ink="false"
          :immediate="false"
          @change="changeBar"
        >
          <template slot="item" slot-scope="{ item }">
            <div class="custom-item" :style="{ color: current === item.name ? 'red':''}">
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
import { mapState } from 'vuex'
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
  computed: {
    ...mapState({
      user: state => JSON.parse(state.user)
    })
  },
  created () {
    if (this.$route.name !== 'home') {
      this.current = 1
      this.$router.push({ path: this.$route.path, query: this.$route.query })
    } else {
      this.current = 2
      this.$router.push({ path: '/downTabBar/home' })
    }
  },
  methods: {
    changeBar (item, index, prevIndex) {
      switch (index) {
        case 0: {
          this.current = 1
          if (this.user[0].roleType === 0) {
            this.$router.push({ path: '/downTabBar/adminIndex/InitSelection' })
          } else {
            // this.$router.push({ path: '/downTabBar/index/createList' })
            let roleTypes = this.user.map(r => {
              return r.roleType
            })
            if (roleTypes.indexOf(1) !== -1) {
              this.$router.replace({ path: '/downTabBar/index/createList' })
              return
            }
            if (roleTypes.indexOf(2) !== -1) {
              this.$router.replace({ path: '/downTabBar/index/checkList' })
              return
            }
            if (roleTypes.indexOf(3) !== -1) {
              this.$router.replace({ path: '/downTabBar/index/exeList' })
              return
            }
            if (roleTypes.indexOf(4) !== -1) {
              this.$router.replace({ path: '/downTabBar/index/receiveReportList' })
              return
            }
            this.$router.replace({ path: '/downTabBar/home' })
          }
          break
        }
        case 1: {
          this.$router.push({ path: '/downTabBar/home' })
          this.current = 2
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
  .custom-item{
  /* color: red;*/
  }
</style>
