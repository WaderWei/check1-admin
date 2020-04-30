<template>
  <div>
    <md-field-item class="i-f-i" align="right" solid  :title="title" arrow content="  请选择" @click="selectUser">
    </md-field-item>
    <div class="user-con">
      <div class="user-title" v-if="selectUsers.length > 0">已选-{{title}}</div>
      <div class = 'user-item'>
        <div class="i-item" v-for="user in selectUsers" :key="user.value">
          <span class="i-name">{{user.label}}</span><span class="i-cha" v-if="user.label !== '全体'" @click="removeUser(user.value)">×</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FieldItem, Tag } from 'mand-mobile'
const selectUser = 'selectUser'
export default {
  name: 'SelectItem',
  props: {
    title: String,
    selectType: Number,
    selectUserArr: Array,
    selectRoleType: Number
  },
  components: {
    [FieldItem.name]: FieldItem,
    [Tag.name]: Tag
  },
  data () {
    return {
      selectUsers: this.selectUserArr
    }
  },
  created () {
  },
  watch: {
    selectUserArr (n, o) {
      this.selectUsers = n
    }
  },
  methods: {
    selectUser () {
      this.$router.push({ name: 'selectUsers', query: { type: this.selectType, roleType: this.selectRoleType } })
    },
    removeUser (value) {
      let newArr = this.selectUsers.filter(s => s.value !== value)
      this.selectUsers = newArr
      sessionStorage.setItem(selectUser + this.selectType, JSON.stringify(newArr))
      if (parseInt(this.selectType) === 10) {
        this.$store.commit('setSelectUserArr', newArr)
      }
      if (parseInt(this.selectType) === 11) {
        this.$store.commit('setSelectUserArrCheck', newArr)
      }
      if (parseInt(this.selectType) === 12) {
        this.$store.commit('setSelectUserArrReport', newArr)
      }
    }
  }
}
</script>

<style scoped>
  .user-con{
    display: -webkit-flex;
    display: flex;
  }
  .user-title{
    font-size: 0.32rem;
    color: #cbcbcb;
    white-space: nowrap;
    margin-top: 30px;
  }
.user-item{
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 20px;
  font-size: 28px;
  text-align: center;
}
  .i-item{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 8%;
    align-items: center;
    padding: 10px;
    background-color: white;
    border: 1px solid red;
    margin: 5px 15px;
    color: red;
    width: 130px;
  }
  .i-cha{
    border-radius: 100%;
  }
  .i-cha:hover{
    background-color: #5063e6;
    color: white;
  }
  .i-f-i{
  }
</style>
