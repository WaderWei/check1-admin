<template>
  <div class="select-contain">
    <div class="s-title">
      <div class="s-span">
        <span>制定人管理</span>
      </div>
      <div class="s-btn">
        <md-button type="primary" round  icon="right" size="small" style="margin: 0 10px;font-size: 16px" @click="addUsers">添加</md-button>
        <md-button type="warning" round  icon="delete" size="small" style="margin: 0 10px;font-size: 16px">删除</md-button>
      </div>
    </div>
    <div class="s-list" v-if="creator.length > 0">
      <md-scroll-view>
      <md-field title="制定人列表">
        <md-check-list
          v-model="selector"
          class="scroll-view-item"
          iconPosition="left"
          :options="creator"
        />
      </md-field>
    </md-scroll-view>
    </div>
    <div v-else style="width: 100%;">
      <md-result-page></md-result-page>
    </div>
  </div>
</template>

<script>
import { Field, CheckList, Button, ScrollView, ResultPage } from 'mand-mobile'

export default {
  name: 'InitSelection',
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [ScrollView.name]: ScrollView,
    [ResultPage.name]: ResultPage,
    [CheckList.name]: CheckList
  },
  data () {
    return {
      selector: [],
      creator: []
    }
  },
  created () {
    this.$http.get('user/findCreator', { params: { roleType: 1 } })
      .then(res => {
        if (res.data.length > 0) {
          this.creator = res.data
        } else {
          this.creator = []
          this.selector = []
        }
      })
  },
  mounted () {
    const contain = document.querySelector('.select-contain')
    const bodyHeight = document.documentElement.clientHeight
    contain.style.height = (bodyHeight - 45) + 'px'
  },
  methods: {
    addUsers () {
      // 如果是管理员添加用户，则直接保存到user-role表中
      // 如果是新建检查表添加用户，则先保存到本地sessionStorage中
      this.$router.push({ name: 'selectUsers', params: { type: 1 } })
    }
  }
}

</script>

<style lang="stylus" scoped>
  .s-list{
    height 1000px
    background #FFF
    text-align left
  }
  .s-title{
    width: 100%;
    display -webkit-flex
    display flex
    flex-direction row
    justify-content space-between
    border-bottom 2px solid gray
    height 200px
  }
  .s-span{
    margin-left 20px
    line-height 200px
    font-size 50px
    font-weight bold
  }
  .s-btn{
    display -webkit-flex
    display flex
    justify-content flex-end
    align-items center
  }
</style>
