<template>
  <div class="index-contain">
    <div class="i-title">
      <md-button type="link" size="large" @click="showPopUp('left')" style="color: red">
        <span style="line-height: 13px;font-size: 16px"><img src="../my-svg/menu.svg" style="width:20px;height: 13px;margin-right: 10px;line-height: 13px"/>菜单</span>
      </md-button>
    </div>
    <div class="i-router">
      <router-view/>
    </div>
    <md-popup
      v-model="isPopupShow.left"
      position="left"
    >
      <div class="md-example-popup md-example-popup-left">
        <div v-if="userRole.indexOf(1) > -1">
          <img :src="require('@/my-svg/createCheck.svg')" class="imgSty"/>
          <md-field-item solid title="创建的表" :class="selectItem === 0 ? 'selectItemSty' :''" arrow @click="createList('left')" />
        </div>
        <div v-if="userRole.indexOf(3) > -1">
          <img :src="require('@/my-svg/exeCheck.svg')" class="imgSty"/>
          <md-field-item solid title="要执行的表" :class="selectItem === 1 ? 'selectItemSty' :''" arrow @click="exeList('left')" />
        </div>
        <div v-if="userRole.indexOf(2) > -1">
          <img :src="require('@/my-svg/waitCheck.svg')" class="imgSty"/>
          <md-field-item solid title="待检查的表" :class="selectItem === 2 ? 'selectItemSty' :''" arrow @click="checkList('left')" />
        </div>
        <div v-if="userRole.indexOf(5) || userRole.indexOf(6)> -1">
          <img :src="require('@/my-svg/监督表格.svg')" class="imgSty"/>
          <md-field-item solid title="监督的表" :class="selectItem === 5 ? 'selectItemSty' :''" arrow @click="jianCheckList('left')" />
        </div>
        <div v-if="userRole.indexOf(2) > -1">
          <img :src="require('@/my-svg/postReport.svg')" class="imgSty"/>
          <md-field-item solid title="生成的报告" :class="selectItem === 3 ? 'selectItemSty' :''" arrow @click="postReport('left')" />
        </div>
        <div v-if="userRole.indexOf(4) > -1">
          <img :src="require('@/my-svg/receiveReport.svg')" class="imgSty"/>
          <md-field-item solid title="收到的报告" :class="selectItem === 4 ? 'selectItemSty' :''" arrow @click="receiveReport('left')" />
        </div>
        <div v-if="userRole.indexOf(3) > -1">
          <img :src="require('@/my-svg/执行的报告.svg')" class="imgSty"/>
          <md-field-item solid title="执行的报告" :class="selectItem === 7 ? 'selectItemSty' :''" arrow @click="exeReportList('left')" />
        </div>
        <div v-if="userRole.indexOf(5) > -1">
          <img :src="require('@/my-svg/waitCheck.svg')" class="imgSty"/>
          <md-field-item solid title="监督的报告" :class="selectItem === 6 ? 'selectItemSty' :''" arrow @click="jianCheckReport('left')" />
        </div>
      </div>
    </md-popup>
  </div>
</template>

<script>
import { Popup, FieldItem, PopupTitleBar, Button, Icon } from 'mand-mobile'
import { getUser } from '../utils'
export default {
  name: 'Index',
  mounted () {
    /* const contain = document.querySelector('.index-contain')
    const bodyHeight = document.documentElement.clientHeight
    contain.style.height = (bodyHeight - 80) + 'px' */
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
      selectItem: 0,
      userRole: []
    }
  },
  created () {
    this.userRole = getUser().map(function (u) {
      return u.roleType
    })
    const routeName = this.$route.name
    switch (routeName) {
      case 'createList': {
        this.selectItem = 0
        break
      }
      case 'exeList': {
        this.selectItem = 1
        break
      }
      case 'checkList': {
        this.selectItem = 2
        break
      }
      case 'postReportList': {
        this.selectItem = 3
        break
      }
      case 'receiveReportList': {
        this.selectItem = 4
        break
      }
      case 'jianCheckList': {
        this.selectItem = 5
        break
      }
      case 'jianReport': {
        this.selectItem = 6
        break
      }
      case 'exeReportList': {
        this.selectItem = 7
        break
      }
    }
  },
  watch: {
    $route (to, from) {
      if (to.name === 'postReportList' && to.query.checkId) {
        this.selectItem = 3
      }
    }
  },
  methods: {
    showPopUp (type) {
      this.$set(this.isPopupShow, type, true)
    },
    hidePopUp (type) {
      this.$set(this.isPopupShow, type, false)
    },
    createList (type) {
      this.$router.push('/downTabBar/index/createList')
      this.$set(this.isPopupShow, type, false)
      this.selectItem = 0
    },
    exeList (type) {
      this.$router.push('/downTabBar/index/exeList')
      this.$set(this.isPopupShow, type, false)
      this.selectItem = 1
    },
    checkList (type) {
      this.$router.push('/downTabBar/index/checkList')
      this.$set(this.isPopupShow, type, false)
      this.selectItem = 2
    },
    postReport (type) {
      this.$router.push('/downTabBar/index/postReportList')
      this.$set(this.isPopupShow, type, false)
      this.selectItem = 3
    },
    receiveReport (type) {
      this.$router.push('/downTabBar/index/receiveReportList')
      this.$set(this.isPopupShow, type, false)
      this.selectItem = 4
    },
    jianCheckList (type) {
      this.$router.push('/downTabBar/index/jianCheckList')
      this.$set(this.isPopupShow, type, false)
      this.selectItem = 5
    },
    jianCheckReport (type) {
      this.$router.push('/downTabBar/index/jianReport')
      this.$set(this.isPopupShow, type, false)
      this.selectItem = 6
    },
    exeReportList (type) {
      this.$router.push('/downTabBar/index/exeReportList')
      this.$set(this.isPopupShow, type, false)
      this.selectItem = 7
    }
  }
}
</script>

<style scoped>
  .index-contain {
  }
  .i-router{
    height: 100%;
  }
  .i-title{
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
    padding: 60px 50px;
    display: flex;
    background-color: ghostwhite;
    align-items: center;
    white-space: nowrap;
    flex-direction: column;
    justify-content: flex-start;
  }
  .md-example-popup-left > div {
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .selectItemSty{
    color: red;
  }
  .imgSty{
    height: 40px;
    margin-right: 10px;
  }
</style>
