<template>
    <div class="create-contain">
      <div class="c-btn">
        <md-button type="link" icon="right" style="padding: 15px" @click="addCheck">新增</md-button>
        <md-button type="link" icon="edit"  style="padding: 15px" @click="operate">操作</md-button>
      </div>
      <div class="c-list" v-if="createList.length > 0">
        <md-scroll-view>
          <md-field title="制定人列表">
            <md-check-list
              v-model="selector"
              class="scroll-view-item"
              iconPosition="left"
              :options="createList"
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
          :title="spliceTitle"
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
import { Button, Icon, Field, ActionSheet, ScrollView, CheckList, ResultPage, Dialog } from 'mand-mobile'
import { findObjArrWithIdArr } from '../../utils'
const selectUser = 'selectUser'
// 1.未提交(编辑不新增) 2.已提交(编辑新增) 3.作废
const optionsAll = [
  { label: '查看', value: 0, tableState: ['未提交', '已提交', '作废'] },
  { label: '编辑', value: 1, tableState: ['未提交', '已提交'] },
  { label: '提交', value: 2, tableState: ['未提交'] },
  { label: '作废', value: 3, tableState: ['已提交'] },
  { label: '删除', value: 4, tableState: ['未提交', '作废'] }
]
export default {
  name: 'CreateList',
  components: {
    [ActionSheet.name]: ActionSheet,
    [Field.name]: Field,
    [Button.name]: Button,
    [ScrollView.name]: ScrollView,
    [CheckList.name]: CheckList,
    [ResultPage.name]: ResultPage,
    [Dialog.name]: Dialog,
    [Icon.name]: Icon
  },
  data () {
    return {
      selector: [],
      createList: [],
      opeTitle: '',
      isShoeSheet: false,
      defaultIndex: 0,
      options: []
    }
  },
  created () {
    sessionStorage.removeItem(selectUser + 2)
    sessionStorage.removeItem(selectUser + 3)
    sessionStorage.removeItem(selectUser + 4)
  },
  mounted () {
    this.getList()
  },
  computed: {
    spliceTitle: function () {
      if (this.opeTitle.indexOf('能否') > 0) {
        return this.opeTitle
      } else {
        return '[' + this.opeTitle + '] 检查表的操作权限'
      }
    }
  },
  methods: {
    getList () {
      // TODO wade userId，roleType作为参数给sq
      this.$http.get('check/findAll')
        .then(res => {
          if (res.code === 1) {
            this.createList = res.data
          } else {
            this.createList = []
            console.log('createList:' + res.msg)
          }
        })
    },
    operate () {
      if (this.selector.length === 0) {
        Dialog.alert({
          title: '警告',
          content: '请先选择要操作的检查表',
          confirmText: '确定'
        })
        return
      }
      this.options = []
      // 当只选中一个时
      if (this.selector.length === 1) {
        const selectItem = this.createList.find(c => c.value === this.selector[0])
        this.opeTitle = selectItem.brief
        const filterOpe = optionsAll.filter(o => o.tableState.indexOf(selectItem.brief) !== -1)
        this.options = filterOpe
      } else {
        /* { label: '提交', value: 2, tableState: ['未提交'] },
        { label: '作废', value: 3, tableState: ['已提交'] },
        { label: '删除', value: 4, tableState: ['未提交'] } */
        let selectItems = findObjArrWithIdArr(this.createList, this.selector)
        // 都是未提交的检查表
        if (!(selectItems.find(s => s.brief !== '未提交'))) {
          this.options = optionsAll.filter(o => o.value === 2 || o.value === 4)
          this.opeTitle = '批量: 未提交'
        } else if (!(selectItems.find(s => s.brief !== '已提交'))) {
          this.options = optionsAll.filter(o => o.value === 3)
          this.opeTitle = '批量: 已提交'
        } else if (!(selectItems.find(s => s.brief !== '作废'))) {
          this.options = optionsAll.filter(o => o.value === 4)
          this.opeTitle = '批量: 作废'
        } else {
          this.opeTitle = '请检查你选择的检查表能否进行批量操作'
        }
      }
      this.$_showActionSheet()
    },
    addCheck () {
      this.$router.push('/createCheckTb')
    },
    $_showActionSheet () {
      this.isShoeSheet = true
    },
    $_selected (item) {
      console.log('action-sheet selected:', JSON.stringify(item))
      // 操作
      switch (item.value) {
        // 查看
        case 0: {
          this.$router.push({ name: 'lookOver', params: { type: 'lookover' } })
          break
        }
        // 编辑
        case 1: {
          break
        }
        // 提交
        case 2: {
          break
        }
        // 作废
        case 3: {
          break
        }
        // 删除
        case 4: {
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
    height: 1100px;
  }
</style>
