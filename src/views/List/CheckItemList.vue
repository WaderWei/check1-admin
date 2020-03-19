<template>
  <div class="create-contain">
    <div class="c-backBar">
      <back-bar v-bind:title="title" :type="type"></back-bar>
    </div>
    <div class="c-btn">
      <md-button type="link" icon="right" style="padding: 15px;color: red" @click="addCheckItem">新增</md-button>
      <md-button type="link" icon="edit"  style="padding: 15px;color: red" @click="operate">操作</md-button>
    </div>
    <div class="c-list" v-if="checkItemList.length > 0">
      <md-scroll-view
        :auto-reflow="true"
        :scrolling-x="false"
      >
        <md-field title="检查项目列表">
          <md-check-list
            v-model="selector"
            class="scroll-view-item"
            iconPosition="left"
            :options="checkItemList"
            icon="right"
          />
        </md-field>
        <md-field style="margin-top: 50px;visibility: hidden" title="Adjustment Style">
        </md-field>
      </md-scroll-view>
    </div>
    <div  v-else style="width: 100%;">
      <md-result-page></md-result-page>
    </div>
    <div class="c-sheet">
      <md-action-sheet
        v-model="isShoeSheet"
        :title="opeTitle"
        :default-index="defaultIndex"
        cancel-text="取消"
        :options="options"
        @selected="$_selected"
        :large-radius="true"
      ></md-action-sheet>
    </div>
  </div>
</template>

<script>
import BackBar from '../../components/BackBar'
import { Button, Icon, Field, ActionSheet, ScrollView, CheckList, ResultPage, Dialog } from 'mand-mobile'
export default {
  name: 'CheckItemList',
  components: {
    [ActionSheet.name]: ActionSheet,
    [Field.name]: Field,
    [Button.name]: Button,
    [ScrollView.name]: ScrollView,
    [CheckList.name]: CheckList,
    [ResultPage.name]: ResultPage,
    [Dialog.name]: Dialog,
    [Icon.name]: Icon,
    BackBar
  },
  data () {
    return {
      title: '检查项目列表',
      type: 1,
      selector: [],
      checkItemList: [],
      opeTitle: '',
      isShoeSheet: false,
      defaultIndex: 0,
      options: [],
      checkId: -1
    }
  },
  created () {
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.checkId = this.$route.query.checkId
      this.$http.get('checkItem/findCheckItem', { params: {
        checkId: this.checkId
      } })
        .then(res => {
          if (res.code === 1) {
            this.checkItemList = res.data
          } else {
            this.checkItemList = []
          }
        })
    },
    operate () {
      if (this.selector.length === 0) {
        Dialog.alert({
          title: ' ',
          content: '请先选择要操作的检查项目',
          confirmText: '确定'
        })
        return
      }
      this.options = []
      // 当只选中一个时
      if (this.selector.length === 1) {
        this.opeTitle = '[单个]检查项目操作权限'
        this.options = [
          { label: '编辑', value: 1 },
          { label: '删除', value: 2 },
          { label: '插入', value: 3 }
        ]
      } else {
        this.opeTitle = '[批量]检查项目操作权限'
        this.options = [
          { label: '删除', value: 2 }
        ]
      }
      this.$_showActionSheet()
    },
    addCheckItem () {
      this.$router.push({ name: 'createCheckItem', query: { id: -1, checkId: this.checkId } })
    },
    $_showActionSheet () {
      this.isShoeSheet = true
    },
    $_selected (item) {
      switch (item.value) {
        // 编辑
        case 1: {
          // 如果是编辑模式，将id传递到创建检查项页面(请求后端)，然后赋值
          this.$router.push({ name: 'createCheckItem', query: { id: this.selector[0], checkId: this.checkId } })
          break
        }
        // 删除
        case 2: {
          Dialog.confirm({
            title: ' ',
            content: '是否确定要删除',
            onConfirm: () => {
              let qs = this.$qs
              this.$http.delete('checkItem/deleteCheckItem',
                { params: {
                  ids: this.selector
                },
                paramsSerializer: params => {
                  return qs.stringify(params, { indices: false })
                } }).then(res => {
                if (res.code === 1) {
                  Dialog.alert({
                    title: ' ',
                    content: '删除成功',
                    onConfirm: () => {
                      this.getList()
                      this.selector = []
                    }
                  })
                } else {
                  Dialog.alert({
                    title: ' ',
                    content: '失败信息：' + res.msg
                  })
                }
              })
            }
          })
          break
        }
        // 插入
        case 3: {
          this.$router.push({ name: 'createCheckItem', query: { id: this.selector[0], checkId: this.checkId, handle: 1 } })
          break
        }
      }
    }
  }
}
</script>

<style scoped>
  .c-btn{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .c-item{
    text-align: left;
  }
  .c-list{
    text-align: left;
    text-overflow:ellipsis;
    white-space: nowrap;
    overflow:hidden;
    margin: 0 30px;
    height: 80%;
  }
  .create-contain{
    height: 100%;
  }
</style>
