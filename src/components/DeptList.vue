<template>
  <div class="dept-list">
    <md-scroll-view
      :auto-reflow="true"
      :scrolling-x="false"
    >
    <div class="dept-row" v-for="(dept,index) in list" :key="index">
      <div class="dept-name">
        <md-check v-model="dept.isChecked" :label="dept.depName" />
      </div>
      <div class="arrow-flag" @click="goNextLevel(dept)" >
        >
      </div>
    </div>
    </md-scroll-view>
  </div>
</template>

<script>
import { Check, ScrollView } from 'mand-mobile'
export default {
  name: 'DeptList',
  components: {
    [ScrollView.name]: ScrollView,
    [Check.name]: Check
  },
  props: {
    list: {
      type: Array,
      required: true,
      defalut: []
    }
  },
  methods: {
    goNextLevel (dept) {
      this.$emit('receive', dept)
    }
  }
}
</script>

<style scoped>
  .dept-list{
    height: 1000px;
  }
.dept-row{
    display: -webkit-flex;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    border-bottom: 1px solid #e0e0e0;
    font-size: 0.38rem;
    padding: 20px 30px;
    align-items: center;
  }
.dept-name{

}
  .arrow-flag{
    width: 100px;
    padding: 0 50px 0 200px;
    color: gray;
  }
</style>
