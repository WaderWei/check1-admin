<template>
  <div class="create-contain">
    <div style="display: -webkit-flex;display: flex;flex-direction: row;justify-content: flex-end;align-items: center;font-size: 0.28rem">
      <img :src="require('@/my-svg/组织架构.svg')" style="color: red;height: 20px"/>
      <md-button type="link" style="margin: 10px 10px 10px 0px;color: red" @click="toTree()">按组织结构查看</md-button>
    </div>
    <div class="c-list" v-if="list.length > 0">
      <md-scroll-view
        :auto-reflow="true"
        :scrolling-x="false"
      >
        <md-field title="执行的检查表">
          <!--<md-radio-list
            :options="exeList"
            @change="$_showActionSheet1"
          />-->
          <read-list :list="list" @openSheet="open"></read-list>
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
import ReadList from '../../components/ReadList'
import { getUser } from '../../utils'
export default {
  name: 'ExeList',
  components: {
    [ActionSheet.name]: ActionSheet,
    [Field.name]: Field,
    [ScrollView.name]: ScrollView,
    [RadioList.name]: RadioList,
    [ResultPage.name]: ResultPage,
    [Dialog.name]: Dialog,
    [Icon.name]: Icon,
    [Button.name]: Button,
    ReadList
  },
  data () {
    return {
      opeTitle: '请选择操作',
      selectId: -1,
      isShoeSheet: false,
      defaultIndex: 0,
      options: [{
        label: '查看',
        value: 0 }],
      list: []
    }
  },
  created () {
  },
  mounted () {
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
        roleType: 3
      }
    }
    this.getList(url, data)
  },
  computed: {
  },
  methods: {
    getList (url, data) {
      // todo 这里还要给roleType
      this.$http.get(url, { params: data })
        .then(res => {
          if (res.code === 1) {
            this.list = res.data
          } else {
            this.list = []
          }
        })
    },
    open (val) {
      this.selectId = val.value
      this.$_showActionSheet()
    },
    $_showActionSheet () {
      this.isShoeSheet = true
    },
    $_showActionSheet1 (option, val) {
      this.selectId = option.value
      this.isShoeSheet = true
    },
    $_selected (item) {
      this.$router.push({ name: 'readLookOver', query: { id: this.selectId, pageFlag: 3 } })
    },
    toTree () {
      this.$router.push({ name: 'organizationView', query: { listName: 'exeList' } })
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
