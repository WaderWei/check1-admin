<template>
  <div class="reset-contain">
    <md-scroll-view
      :auto-reflow="true"
      :scrolling-x="false"
    >
    <div class="s-backBar">
      <back-bar v-bind:title="title" v-bind:type="type" ></back-bar>
    </div>
    <div class="s-body">
      <v-table
        is-horizontal-resize
        style="width:100%;"
        :columns="columns"
        :table-data="tableData"
        row-hover-color="#eee"
        row-click-color="#edf7ff"
      ></v-table>
    </div>
    <div>
      <hr/>
    </div>
    <div ref="schart" class="echart">

    </div>
    </md-scroll-view>
  </div>
</template>

<script>
import BackBar from '../components/BackBar'
import { ScrollView } from 'mand-mobile'
import { getUser } from '../utils'
export default {
  name: 'CompareReport',
  components: {
    BackBar,
    [ScrollView.name]: ScrollView
  },
  data () {
    return {
      title: '对比报表',
      type: 1,
      tableData: [
        { 'name': '合格总数', 'newMonth': '', 'lastMonth': '' },
        { 'name': '合格率', 'newMonth': '', 'lastMonth': '' },
        { 'name': '不合格总数', 'newMonth': '', 'lastMonth': '' },
        { 'name': '不合格率', 'newMonth': '', 'lastMonth': '' },
        { 'name': '奖罚金额', 'newMonth': '', 'lastMonth': '' },
        { 'name': '奖罚分数', 'newMonth': '', 'lastMonth': '' }
      ],
      columns: [
        { field: 'name', title: ' ', width: 160, titleAlign: 'center', columnAlign: 'center', isResize: true },
        { field: 'newMonth', title: '本月', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true },
        { field: 'lastMonth', title: '上月', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true }
      ],
      reportData: [
      ],
      option: {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['product', '本月', '上月'],
            ['合格数', 0, 0],
            ['合格率', 0, 0],
            ['不合格数', 0, 0],
            ['不合格率', 0, 0],
            ['奖罚金额', 0, 0],
            ['奖罚分数', 0, 0]
          ]
        },
        xAxis: { type: 'category',
          axisLabel: {
            interval: 0, // 强制文字产生间隔
            rotate: 45, // 文字逆时针旋转45°
            textStyle: { // 文字样式
              color: 'black',
              // fontSize: 16,
              fontFamily: 'Microsoft YaHei' } }
        },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          { type: 'bar' },
          { type: 'bar' }
        ],
        grid: { // 控制图的大小，调整下面这些值就可以，
          x: 100, // 控制x轴文字与底部的距离
          y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        }
      }
    }
  },
  created () {
    this.initReportData()
  },
  methods: {
    async initReportData () {
      const result = await this.$http.get('statement/querySta', { params: { userId: getUser()[0].userId } })
      if (result.data && result.data.length > 0) {
        this.reportData = result.data
        let sourceArr = this.option.dataset.source
        // 本月
        if (this.reportData[0]) {
          this.tableData[0].newMonth = this.reportData[0].sumQualified
          this.tableData[1].newMonth = this.reportData[0].passQualified
          this.tableData[2].newMonth = this.reportData[0].sumNoQualified
          this.tableData[3].newMonth = this.reportData[0].passNoQualified
          this.tableData[4].newMonth = this.reportData[0].sumMoney
          this.tableData[5].newMonth = this.reportData[0].sumScore
        }
        // 上月
        if (this.reportData[1]) {
          this.tableData[0].lastMonth = this.reportData[1].sumQualified
          this.tableData[1].lastMonth = this.reportData[1].passQualified
          this.tableData[2].lastMonth = this.reportData[1].sumNoQualified
          this.tableData[3].lastMonth = this.reportData[1].passNoQualified
          this.tableData[4].lastMonth = this.reportData[1].sumMoney
          this.tableData[5].lastMonth = this.reportData[1].sumScore
        }
        sourceArr.push(['合格数', this.reportData[0].sumQualified, this.reportData[1].sumQualified])
        sourceArr.push(['合格率', this.reportData[0].passQualified, this.reportData[1].passQualified])
        sourceArr.push(['不合格数', this.reportData[0].sumNoQualified, this.reportData[1].sumNoQualified])
        sourceArr.push(['不合格率', this.reportData[0].passNoQualified, this.reportData[1].passNoQualified])
        sourceArr.push(['奖罚金额', this.reportData[0].sumMoney, this.reportData[1].sumMoney])
        sourceArr.push(['奖罚分数', this.reportData[0].sumScore, this.reportData[1].sumScore])
        let myChart = this.$echarts.init(this.$refs.schart)
        myChart.setOption(this.option)
      } else {
        this.reportData = []
      }
    },
    getChartData () {
      // myChart.setOption(this.option)
    }
  }
}
</script>

<style scoped>
  .reset-contain{
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    height: 1200px;
  }
  .s-body{
    font-size: 28px;
    margin:40px 20px;
  }
  .echart{
    text-align: left;
    width: 800px;
    height: 800px;
    margin-left: -40px;
  }
</style>
