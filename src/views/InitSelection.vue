<template>
  <div class="select-contain">
    <div class="s-title">
      <div class="s-span">
        <span>创建人管理</span>
      </div>
      <div class="s-btn">
        <md-button type="primary" round  icon="right" size="small" style="margin: 0 10px;font-size: 16px">添加</md-button>
        <md-button type="warning" round  icon="delete" size="small" style="margin: 0 10px;font-size: 16px">删除</md-button>
      </div>
    </div>
    <div class="s-list">
      <md-scroll-view
      >
      <md-field title="创建人列表">
        <md-check-list
          v-model="favorites"
          class="scroll-view-item"
          iconPosition="left"
          :options="fruits"
        />
      </md-field>
    </md-scroll-view>
    </div>
  </div>
</template>

<script>
import { Field, CheckList, Button, ScrollView } from 'mand-mobile'

export default {
  name: 'InitSelection',
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [ScrollView.name]: ScrollView,
    [CheckList.name]: CheckList
  },
  data () {
    return {
      favorites: ['apple'],
      fruits: [
        { value: 'wade1', label: 'wade1', brief: '软件部' },
        { value: 'wade2', label: 'wade2', brief: '研发部' },
        { value: 'wade3', label: 'wade3', brief: '销售部' },
        { value: 'wade4', label: 'wade4', brief: '运行部' },
        { value: 'wade1', label: 'wade1', brief: '软件部' },
        { value: 'wade2', label: 'wade2', brief: '研发部' },
        { value: 'wade3', label: 'wade3', brief: '销售部' },
        { value: 'wade4', label: 'wade4', brief: '运行部' },
        { value: 'wade1', label: 'wade1', brief: '软件部' },
        { value: 'wade2', label: 'wade2', brief: '研发部' },
        { value: 'wade3', label: 'wade3', brief: '销售部' },
        { value: 'wade4', label: 'wade4', brief: '运行部' },
        { value: 'wade1', label: 'wade1', brief: '软件部' },
        { value: 'wade2', label: 'wade2', brief: '研发部' },
        { value: 'wade3', label: 'wade3', brief: '销售部' },
        { value: 'wade4', label: 'wade4', brief: '运行部' },
        { value: 'wade5', label: 'wade5', brief: '财务部' }
      ]
    }
  },
  mounted () {
    const contain = document.querySelector('.select-contain')
    const bodyHeight = document.documentElement.clientHeight
    contain.style.height = (bodyHeight - 45) + 'px'
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
