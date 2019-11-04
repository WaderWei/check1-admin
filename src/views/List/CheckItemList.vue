<template>
  <div class="create-contain">
    <div class="c-backBar">
      <back-bar v-bind:title="title" :type="type"></back-bar>
    </div>
    <div class="c-btn">
      <md-button type="link" icon="right" style="padding: 15px" @click="addCheck">新增</md-button>
      <md-button type="link" icon="edit"  style="padding: 15px" @click="operate">操作</md-button>
    </div>
    <div class="c-list" v-if="checkItemList.length > 0">
      <md-scroll-view>
        <md-field title="检查项目列表">
          <md-check-list
            v-model="selector"
            class="scroll-view-item"
            iconPosition="left"
            :options="checkItemList"
            icon="right"
          />
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
      options: []
    }
  },
  created () {
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.$http.get('check/findItemAll')
        .then(res => {
          if (res.code === 1) {
            this.checkItemList = res.data
          } else {
            this.checkItemList = []
            console.log('checkItemList:' + res.msg)
          }
        })
    },
    operate () {
      if (this.selector.length === 0) {
        Dialog.alert({
          title: '警告',
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
          { label: '删除', value: 2 }
        ]
      } else {
        this.opeTitle = '[批量]检查项目操作权限'
        this.options = [
          { label: '删除', value: 2 }
        ]
      }
      this.$_showActionSheet()
    },
    addCheck () {
      this.$router.push('createCheckItem')
    },
    $_showActionSheet () {
      this.isShoeSheet = true
    },
    $_selected (item) {
      // 操作
      // 编辑
      switch (item.value) {
        // 编辑
        case 1: {
          console.log(this.selector)
          this.$router.push({ name: 'createCheckItem', params: { type: this.selector[0] } })
          break
        }
        // 删除
        case 2: {
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
    height: 1200px;
    text-align: left;
    text-overflow:ellipsis;
    white-space: nowrap;
    overflow:hidden;
    width: 82%;
  }
  .create-contain{
  }
</style>
