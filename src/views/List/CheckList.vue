<template>
  <div class="create-contain">
    <div style="display: -webkit-flex;display: flex;flex-direction: row;justify-content: flex-end;align-items: center;font-size: 0.28rem">
      <img :src="require('@/my-svg/组织架构.svg')" style="color: red;height: 20px"/>
      <md-button type="link" style="margin: 10px 10px 10px 0;color: red" @click="toTree()">按组织结构查看</md-button>
    </div>
    <div class="c-list" v-if="checkList.length > 0">
      <md-scroll-view
        :auto-reflow="true"
        :scrolling-x="false"
      >
        <md-field title="待检查的检查表">
          <md-radio-list
            :options="checkList"
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
import { getUser } from '../../utils'
export default {
  name: 'CheckList',
  components: {
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
      checkList: [],
      opeTitle: '请选择操作',
      selectId: -1,
      isShoeSheet: false,
      defaultIndex: 0,
      options: [
        {
          label: '新增报告',
          value: 0
        },
        {
          label: '查看报告',
          value: 1
        }
      ]
    }
  },
  created () {
    let clickType = this.$route.query.type
    let url
    let data
    if (clickType === 1) {
      let clickDate = this.$route.query.val
      url = 'tree/queryCheckByDepId'
      data = {
        dpeId: clickDate
      }
    } else if (clickType === 2) {
      let clickDate = this.$route.query.val
      url = 'tree/queryCheckByUserId'
      data = {
        userId: clickDate
      }
    } else {
      url = 'check/findCheckList'
      data = {
        userId: getUser()[0].userId,
        roleType: 2
      }
    }
    this.getList(url, data)
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    getList (url, data) {
      // todo 这里还要给roleType
      this.$http.get(url, { params: data })
        .then(res => {
          if (res.code === 1) {
            this.checkList = res.data
          } else {
            this.checkList = []
          }
        })
    },
    $_showActionSheet (option, index) {
      this.selectId = option.value
      this.isShoeSheet = true
    },
    $_selected (item) {
      switch (item.value) {
        // add
        case 0: {
          this.$router.push({ name: 'createReport', query: { checkId: this.selectId } })
          break
        }
        // look over
        case 1: {
          const label = (this.checkList.filter(check => check.value === this.selectId)[0]).label
          this.$router.push({ name: 'postReportList', query: { checkId: this.selectId, checkName: label } })
          break
        }
      }
    },
    toTree () {
      this.$router.push({ name: 'organizationView', query: { listName: 'checkList' } })
    }
  }
}
</script>

<style scoped>
  .c-list{
    text-align: left;
    height: 1200px;
  }
</style>
