<template>
  <div class="container-list">
    <md-scroll-view
      :auto-reflow="true"
      :scrolling-x="false"
    >
      <div class="dept-row" v-for="(dept,index) in deptList" :key="index">
        <div class="dept-name">
          <img :src="require('@/my-svg/部门管理.svg')" class="imgSty"/>{{dept.depName}}
        </div>
        <div class="arrow-flag" @click="goNextLevel(dept)" >
          >
        </div>
      </div>
      <div class="dept-row" v-for="(post,index) in postList" :key="index+10000000">
        <div class="dept-name">
          <md-check v-model="post.isChecked" :label="post.jobName" />
        </div>
      </div>
    </md-scroll-view>
  </div>
</template>

<script>
import { Check, ScrollView } from 'mand-mobile'
export default {
  name: 'PostList',
  components: {
    [ScrollView.name]: ScrollView,
    [Check.name]: Check
  },
  props: {
    deptList: {
      type: Array,
      required: true,
      defalut: []
    },
    postList: {
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
  .container-list{
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
  .imgSty {
    height: 40px;
    margin-right: 10px;
  }
</style>
