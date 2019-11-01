<template>
  <div class="index-contain">
    <div class="i-title">
      <md-button type="link" size="large" icon="arrow-right" @click="showPopUp('left')">展开</md-button>
    </div>
    <div class="i-router">
      <router-view/>
    </div>
    <md-popup
      v-model="isPopupShow.left"
      position="left"
    >
      <div class="md-example-popup md-example-popup-left">
        <div>
          <md-icon name="address-book" :color="selectItem === 0 ? 'blue' : ''" size="lg"></md-icon>
          <md-field-item solid title="制定的表" :class="selectItem === 0 ? 'selectItemSty' :''" arrow @click="createList('left')" />
        </div>
        <div>
          <md-icon name="edit" size="lg" :color="selectItem === 1 ? 'blue' : ''"></md-icon>
          <md-field-item solid title="要执行的表" :class="selectItem === 1 ? 'selectItemSty' :''" arrow @click="exeList('left')" />
        </div>
        <div>
          <md-icon name="filter" size="lg" :color="selectItem === 2 ? 'blue' : ''"></md-icon>
          <md-field-item solid title="待检查的表" :class="selectItem === 2 ? 'selectItemSty' :''" arrow @click="checkList('left')" />
        </div>
        <div>
          <md-icon name="order" size="lg" :color="selectItem === 3 ? 'blue' : ''"></md-icon>
          <md-field-item solid title="收到的报告" :class="selectItem === 3 ? 'selectItemSty' :''" arrow @click="receiveReport('left')" />
        </div>
        <div>
          <md-icon name="share" size="lg" :color="selectItem === 4 ? 'blue' : ''"></md-icon>
          <md-field-item solid title="提交的报告" :class="selectItem === 4 ? 'selectItemSty' :''" arrow @click="postReport('left')" />
        </div>
      </div>
    </md-popup>
  </div>
</template>

<script>
import { Popup, FieldItem, PopupTitleBar, Button, Icon } from 'mand-mobile'

export default {
  name: 'Index',
  mounted () {
    const contain = document.querySelector('.index-contain')
    const bodyHeight = document.documentElement.clientHeight
    contain.style.height = (bodyHeight - 55) + 'px'
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
    receiveReport (type) {
      this.$router.push('/downTabBar/index/receiveReportList')
      this.$set(this.isPopupShow, type, false)
      this.selectItem = 3
    },
    postReport (type) {
      this.$router.push('/downTabBar/index/postReportList')
      this.$set(this.isPopupShow, type, false)
      this.selectItem = 4
    }
  }
}
</script>

<style scoped>
  .index-contain {
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
    color: blue;
  }
</style>
