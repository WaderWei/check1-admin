<template>
  <div class="index-contain">
    <div class="i-title">
      <md-button type="link" size="large" @click="showPopUp('left')" style="color: red">
        <span style="line-height: 13px;font-size: 16px"><img src="../my-svg/menu.svg"
                                                             style="width:20px;height: 13px;margin-right: 10px;line-height: 13px"/>菜单</span>
      </md-button>
    </div>
    <div class="i-router">
      <router-view></router-view>
    </div>
    <md-popup
      v-model="isPopupShow.left"
      position="left"
    >
      <div class="md-example-popup md-example-popup-left">
        <div>
          <img :src="require('@/my-svg/制定人管理.svg')" class="imgSty"/>
          <md-field-item solid title="制定人管理    >" :class="selectItem === 0 ? 'selectItemSty' :''"
                         @click="addMan('left')"/>
        </div>
        <div>
          <img :src="require('@/my-svg/超级监督人.svg')" class="imgSty"/>
          <md-field-item solid title="超级监督人管理    >" :class="selectItem === 1 ? 'selectItemSty' :''"
                         @click="addSuperMan('left')"/>
        </div>
        <div>
          <img :src="require('@/my-svg/部门管理.svg')" class="imgSty"/>
          <md-field-item solid title="部门管理    >" :class="selectItem === 2 ? 'selectItemSty' :''"
                         @click="deptMan('left')"/>
        </div>
        <div>
          <img :src="require('@/my-svg/岗位管理.svg')" class="imgSty"/>
          <md-field-item solid title="岗位管理    >" :class="selectItem === 3 ? 'selectItemSty' :''"
                         @click="postMan('left')"/>
        </div>
        <div>
          <img :src="require('@/my-svg/岗位员工关系管理.svg')" class="imgSty"/>
          <md-field-item solid title="岗位员工关系管理    >" :class="selectItem === 4 ? 'selectItemSty' :''"
                         @click="postStaffMan('left')"/>
        </div>
      </div>
    </md-popup>
  </div>
</template>

<script>
import { Popup, FieldItem, PopupTitleBar, Button, Icon } from 'mand-mobile'

export default {
  name: 'AdminIndex',
  mounted () {
  },
  components: {
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Button.name]: Button,
    [FieldItem.name]: FieldItem,
    [Icon.name]: Icon
  },
  data () {
    return {
      isPopupShow: {},
      selectItem: 0
    }
  },
  created () {
    if (sessionStorage.getItem('adminPageIndex')) {
      let apiNum = parseInt(sessionStorage.getItem('adminPageIndex'))
      this.selectItem = apiNum
      switch (apiNum) {
        case 0: {
          this.$router.push('/downTabBar/adminIndex/initSelection')
          this.$set(this.isPopupShow, 'left', false)
          break
        }
        case 1: {
          this.$router.push('/downTabBar/adminIndex/superManSelection')
          this.$set(this.isPopupShow, 'left', false)
          break
        }
        case 2: {
          this.$router.push('/downTabBar/adminIndex/deptMana')
          this.$set(this.isPopupShow, 'left', false)
          break
        }
        case 3: {
          this.$router.push('/downTabBar/adminIndex/postMana')
          this.$set(this.isPopupShow, 'left', false)
          break
        }
        case 4: {
          this.$router.push('/downTabBar/adminIndex/staffRelationMana')
          this.$set(this.isPopupShow, 'left', false)
          break
        }
        case 5: {
          break
        }
      }
    } else {
      this.selectItem = 0
    }
    /* const routeName = this.$route.name
        switch (routeName) {
          case 'addMan': {
            this.selectItem = 0
            break
          }
          case 'addSuperMan': {
            this.selectItem = 1
            break
          }
        } */
  },
  watch: {},
  methods: {
    showPopUp (type) {
      this.$set(this.isPopupShow, type, true)
    },
    hidePopUp (type) {
      this.$set(this.isPopupShow, type, false)
    },
    addMan (type) {
      this.$router.push('/downTabBar/adminIndex/initSelection')
      this.$set(this.isPopupShow, type, false)
      this.selectItem = 0
      sessionStorage.setItem('adminPageIndex', 0)
    },
    addSuperMan (type) {
      this.$router.push('/downTabBar/adminIndex/superManSelection')
      this.$set(this.isPopupShow, type, false)
      this.selectItem = 1
      sessionStorage.setItem('adminPageIndex', 1)
    },
    deptMan (type) {
      this.$router.push('/downTabBar/adminIndex/deptMana')
      this.$set(this.isPopupShow, 'left', false)
      this.selectItem = 2
      sessionStorage.setItem('adminPageIndex', 2)
    },
    postMan (type) {
      this.$router.push('/downTabBar/adminIndex/postMana')
      this.$set(this.isPopupShow, 'left', false)
      this.selectItem = 3
      sessionStorage.setItem('adminPageIndex', 3)
    },
    postStaffMan (type) {
      this.$router.push('/downTabBar/adminIndex/staffRelationMana')
      this.$set(this.isPopupShow, 'left', false)
      this.selectItem = 4
      sessionStorage.setItem('adminPageIndex', 4)
    }
  }
}
</script>

<style scoped>
  .index-contain {
  }

  .i-router {
    height: 100%;
  }

  .i-title {
    text-align: left;
    background-color: rgba(243, 250, 255, 0.26);
  }

  .md-example-popup {;
    position: relative;
    font-size: 28px;
    font-family: DINPro;
    font-weight: 500;
    box-sizing: border-box;
    text-align: center;
    background-color: #FFF;
  }

  .md-example-popup-left {
    height: 100%;
    width: 430px;
    padding: 40px 30px 40px 0px;
    display: flex;
    background-color: ghostwhite;
    align-items: center;
    white-space: nowrap;
    flex-direction: column;
    justify-content: flex-start;
  }

  .md-example-popup-left > div {
    margin-right: 100px;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .selectItemSty {
    color: red;
  }

  .imgSty {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
</style>
