<template>
  <div class="select-contain">
    <div class="s-title">
      <div class="s-span">
        <span>超级监督人管理</span>
      </div>
      <div class="s-btn">
        <md-button type="primary" round  icon="right" size="small" style="margin: 0 10px;font-size: 16px" @click="addUsers">添加</md-button>
        <md-button type="warning" round  icon="delete" size="small"
                   style="margin: 0 10px;font-size: 16px"
                   :loading="loading" :inactive="inactive"
                   @click="deleteUsers">删除</md-button>
      </div>
    </div>
    <div class="s-list" v-if="creator.length > 0">
      <md-scroll-view
        :auto-reflow="true"
        :scrolling-x="false"
      >
        <md-field title="超级监督人列表">
          <md-check-list
            v-model="selector"
            class="scroll-view-item"
            iconPosition="left"
            :options="creator"
          />
        </md-field>
        <md-field style="height: 50px;visibility: hidden" title="Adjustment Style">
        </md-field>
      </md-scroll-view>
    </div>
    <div v-else style="width: 100%;">
      <md-result-page></md-result-page>
    </div>
  </div>
</template>

<script>
import { Field, CheckList, Button, ScrollView, ResultPage, Dialog } from 'mand-mobile'

export default {
  name: 'superManSelection',
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [ScrollView.name]: ScrollView,
    [ResultPage.name]: ResultPage,
    [Dialog.name]: Dialog,
    [CheckList.name]: CheckList
  },
  data () {
    return {
      selector: [],
      creator: [],
      loading: false,
      inactive: false
    }
  },
  created () {
    this.findUsers()
  },
  mounted () {
    /* const contain = document.querySelector('.select-contain')
      const bodyHeight = document.documentElement.clientHeight
      contain.style.height = (bodyHeight - 80) + 'px' */
  },
  methods: {
    findUsers () {
      this.$http.get('user/findCreator', {
        params: { roleType: 6 }
      })
        .then(res => {
          if (res.code === 1) {
            this.creator = res.data
          } else {
            this.creator = []
            this.selector = []
          }
        })
    },
    addUsers () {
      // 如果是管理员添加用户，则直接保存到user-role表中
      // 如果是新建检查表添加用户，则先保存到本地sessionStorage中
      this.$router.push({ name: 'selectUsers', query: { type: '2' } })
    },
    deleteUsers () {
      if (this.selector.length === 0) {
        Dialog.alert({
          title: ' ',
          content: '请选择要删除的超级监督人',
          confirmText: '确定'
        })
        return
      }

      Dialog.confirm({
        title: ' ',
        content: '是否确定要删除此超级监督人，他的关联检查表也会被删除',
        confirmText: '确定',
        onConfirm: () => {
          this.loading = true
          this.inactive = true
          let qs = this.$qs
          this.$http.delete('user/deleteCreator',
            {
              params: {
                userIds: this.selector,
                roleType: 6
              },
              paramsSerializer: params => {
                return qs.stringify(params, { indices: false })
              } })
            .then(res => {
              if (res.code === 1) {
                Dialog.alert({
                  title: ' ',
                  content: '删除成功',
                  confirmText: '确定',
                  onConfirm: () => {
                    this.findUsers()
                  }
                })
              } else {
                Dialog.failed({
                  title: ' ',
                  content: `删除失败，请稍后重试。<br/> 失败信息：` + res.msg,
                  confirmText: '确定'
                })
              }
            })
          this.selector = []
          this.loading = false
          this.inactive = false
        }
      })
    }
  }
}

</script>

<style lang="stylus" scoped>
  .select-contain{
    height 100%
  }
  .s-list{
    height 1200px
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
