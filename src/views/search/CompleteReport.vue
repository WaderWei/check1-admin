<template>
  <div class="create-contain">
    <div class="s-backBar">
      <back-bar v-bind:title="title" v-bind:type="type"></back-bar>
    </div>
    <div style="height: 5px;background-color: #e0e0e0"></div>
    <!--<div style="display: -webkit-flex;display: flex;flex-direction: row;justify-content: flex-end;align-items: center;font-size: 0.28rem">
      <img :src="require('@/my-svg/组织架构.svg')" style="color: red;height: 20px"/>
      <md-button type="link" style="margin: 10px 10px 10px 0;color: red" @click="toTree()">按组织结构查看</md-button>
    </div>-->
    <div class="c-list" v-if="list.length > 0">
      <md-scroll-view
        :auto-reflow="true"
        :scrolling-x="false"
      >
        <md-field :title="title">
          <md-radio-list
            :options="list"
            @change="$_showActionSheet"
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
import { Icon, Field, ActionSheet, ScrollView, RadioList, ResultPage, Dialog, Button } from 'mand-mobile'
import BackBar from '../../components/BackBar'
export default {
  name: 'CompleteReport',
  components: {
    BackBar,
    [ActionSheet.name]: ActionSheet,
    [Field.name]: Field,
    [ScrollView.name]: ScrollView,
    [RadioList.name]: RadioList,
    [ResultPage.name]: ResultPage,
    [Dialog.name]: Dialog,
    [Icon.name]: Icon,
    [Button.name]: Button
  },
  data () {
    return {
      type: 1,
      title: '完成的报告',
      list: [],
      opeTitle: '请选择操作',
      selectId: -1,
      isShoeSheet: false,
      defaultIndex: 0,
      options: [{
        label: '查看',
        value: 0 }]
    }
  },
  created () {
  },
  mounted () {
    let ids = this.$route.query.ids
    this.getList('statement/normalReports', { ids: ids })
  },
  computed: {
  },
  methods: {
    getList (url, data) {
      let qs = this.$qs
      this.$http.get(url, { params: data,
        paramsSerializer: params => {
          return qs.stringify(params, { indices: false })
        } })
        .then(res => {
          if (res.code === 1) {
            this.list = res.data
          } else {
            this.list = []
          }
        })
    },
    $_showActionSheet (option, index) {
      this.selectId = option.value
      this.isShoeSheet = true
    },
    $_selected (item) {
      this.$router.push({ name: 'reportLookOver', query: { id: this.selectId } })
    }
    /* toTree () {
        this.$router.push({ name: 'organizationView', query: { listName: 'jianCheckList' } })
      } */
  }
}
</script>

<style scoped>
  .c-list{
    text-align: left;
    height: 1200px;
  }
</style>
