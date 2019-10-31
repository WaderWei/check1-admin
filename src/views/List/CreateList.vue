<template>
    <div class="create-contain">
      <md-button type="link" icon="right" class="c-add" @click="addCheck">新增</md-button>
      <div class="c-list">
        <md-field>
          <md-cell-item v-for="item in createList" v-bind:key="item.id"
                        class="c-item" :title="item.name" :addon="item.state"
                        arrow @click="operat(item.id)"/>
        </md-field>
      </div>
      <div>
        <md-action-sheet
          v-model="value"
          :title="title"
          :default-index="defaultIndex"
          :invalid-index="invalidIndex"
          :cancel-text="cancelText"
          :options="options"
          @selected="$_selected"
          @cancel="$_cancel"
        ></md-action-sheet>
      </div>
    </div>
</template>

<script>
import { Button, Icon, Field, ActionSheet, CellItem } from 'mand-mobile'

export default {
  name: 'CreateList',
  components: {
    [ActionSheet.name]: ActionSheet,
    [Field.name]: Field,
    [CellItem.name]: CellItem,
    [Button.name]: Button,
    [Icon.name]: Icon
  },
  data () {
    return {
      createList: [],
      value: false,
      title: '操作说明的标题',
      options: [
        {
          label: '选项1',
          value: 0
        },
        {
          label: '选项2',
          value: 1
        },
        {
          label: '选项3',
          value: 2
        }
      ],
      defaultIndex: 1,
      invalidIndex: 2,
      cancelText: '取消'
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
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
    operat (id) {
      this.$_showActionSheet()
    },
    addCheck () {
      alert('添加检查表')
    },
    $_showActionSheet () {
      this.value = true
    },
    $_selected (item) {
      console.log('action-sheet selected:', JSON.stringify(item))
    },
    $_cancel () {
      console.log('action-sheet cancel')
    }
  }
}
</script>

<style scoped>
  .c-add{
    float: right;
    margin-top: -50px;
  }
  .c-item{
    text-align: left;
  }
</style>
