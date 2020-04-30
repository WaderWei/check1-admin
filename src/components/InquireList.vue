<template>
  <div class="container-list">
    <md-scroll-view
      :auto-reflow="true"
      :scrolling-x="false"
    >
      <div class="dept-row" v-for="(dept,index) in deptList" :key="index">
        <div class="dept-name">
          <input name="dept" type="radio" value="false" style="width: 30px;height: 16px" @click="inquireList(dept,1)"/>
          <img :src="require('@/my-svg/部门管理.svg')" class="imgSty"/><span style="white-space: nowrap">{{dept.depName}}</span>
        </div>
        <div class="arrow-flag" @click="goNextLevel(dept)" v-if="dept.junior == 1">
          >
        </div>
      </div>
      <div class="dept-row" v-for="(post,index) in postList" :key="index+10000000">
        <div class="dept-name">
          <img :src="require('@/my-svg/岗位管理.svg')" class="imgSty"/> <span style="white-space: nowrap">{{post.jobName}}</span>
        </div>
        <div class="arrow-flag" @click="goNextLevel(post)" v-if="post.junior == 1">
          >
        </div>
      </div>
      <div class="dept-row" v-for="(user,index) in userList" :key="index+1000000000">
        <div class="dept-name">
          <input name="dept" type="radio" value="false" style="width: 30px;height: 16px" @click="inquireList(user,2)"/>
          {{user.name}}
        </div>
      </div>
    </md-scroll-view>
  </div>
</template>

<script>
import { Radio, ScrollView } from 'mand-mobile'
export default {
  name: 'InquireList',
  components: {
    [ScrollView.name]: ScrollView,
    [Radio.name]: Radio
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
    },
    userList: {
      type: Array,
      required: true,
      defalut: []
    }
  },
  methods: {
    goNextLevel (dept) {
      this.$emit('receive', dept)
    },
    inquireList (val, type) {
      this.$emit('showSheet', val, type)
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
    display: -webkit-flex;
    display: flex;
    align-items: center;
    margin: 8px 0;
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
