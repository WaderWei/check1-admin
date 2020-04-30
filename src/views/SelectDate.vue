<template>
  <div class="select-contain">
    <div class="s-backBar">
      <back-bar v-bind:title="title" @receive="clearData" :type="1"></back-bar>
    </div>
    <div>
      <md-date-picker
        ref="datePicker"
        today-text="今天"
        :min-date="minDate"
        :max-date="maxDate"
        :default-date="currentDate"
        is-view
      ></md-date-picker>
    </div>
    <div style="margin-top: 50px">
      <md-button type="warning" @click="selectDate">确定</md-button>
    </div>
  </div>
</template>

<script>
import BackBar from '../components/BackBar'
import { DatePicker, Button, Dialog } from 'mand-mobile'
const selectDate = 'selectDate'
export default {
  name: 'SelectDate',
  components: {
    [DatePicker.name]: DatePicker,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    BackBar
  },
  data () {
    return {
      title: '选择时间',
      minDate: new Date(),
      maxDate: new Date('2100/12/31'),
      currentDate: new Date()
    }
  },
  created () {
  },
  methods: {
    clearData () {
    },
    selectDate () {
      sessionStorage.setItem(selectDate, this.$refs.datePicker.getFormatDate('yyyy-MM-dd'))
      Dialog.alert({
        title: ' ',
        content: '选择成功，返回查看',
        confirmText: '确定'
      })
    }
  }
}
</script>

<style scoped>
</style>
