<template>
  <div class="create-contain">
    <div class="c-list" v-if="exeList.length > 0">
      <md-scroll-view
        :auto-reflow="true"
        :scrolling-x="false"
      >
        <md-field title="监督的检查表">
          <md-radio-list
            :options="exeList"
          />
        </md-field>
      </md-scroll-view>
    </div>
    <div  v-else style="width: 100%;">
      <md-result-page></md-result-page>
    </div>
  </div>
</template>

<script>
import { Icon, Field, ActionSheet, ScrollView, RadioList, ResultPage, Dialog, Button } from 'mand-mobile'
export default {
  name: 'test',
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
      exeList: [],
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
    this.getList('check/findCheckList', {
      userId: 862,
      roleType: 1
    })
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
            this.exeList = res.data
          } else {
            this.exeList = []
          }
        })
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
