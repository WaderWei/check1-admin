<template>
  <div class="create-contain">
    <div class="c-list" v-if="receiveList.length > 0">
      <md-scroll-view
        :auto-reflow="true"
        :scrolling-x="false"
      >
        <md-field title="收到的报告">
          <md-radio-list
            :options="receiveList"
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
import { Icon, Field, ActionSheet, ScrollView, RadioList, ResultPage, Dialog } from 'mand-mobile'
import { getUser } from '../../utils'
export default {
  name: 'ReceiveReportList',
  components: {
    [ActionSheet.name]: ActionSheet,
    [Field.name]: Field,
    [ScrollView.name]: ScrollView,
    [RadioList.name]: RadioList,
    [ResultPage.name]: ResultPage,
    [Dialog.name]: Dialog,
    [Icon.name]: Icon
  },
  data () {
    return {
      receiveList: [],
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
    this.getList()
  },
  computed: {
  },
  methods: {
    getList () {
      // todo 这里还要给roleType
      this.$http.get('report/findReportByUserId', { params: {
        userId: getUser()[0].userId
      } })
        .then(res => {
          if (res.code === 1) {
            this.receiveList = res.data
          } else {
            this.receiveList = []
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
  }
}
</script>

<style scoped>
  .c-list{
    text-align: left;
    height: 1200px;
  }
</style>
