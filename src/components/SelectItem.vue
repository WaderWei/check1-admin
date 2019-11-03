<template>
  <div>
    <md-field-item class="i-f-i" solid  :title="title" arrow content="请选择" @click="selectUser">
    </md-field-item>
    <div class = 'user-item'>
      <div class="i-item" v-for="user in selectUsers" :key="user.value">
        <span class="i-name">{{user.label}}</span><span class="i-cha" @click="removeUser(user.value)">×</span>
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
    selectUserArr: Array
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
  methods: {
    selectUser () {
      this.$router.push({ name: 'selectUsers', params: { type: this.selectType } })
    },
    removeUser (value) {
      let newArr = this.selectUsers.filter(s => s.value !== value)
      this.selectUsers = newArr
      sessionStorage.setItem(selectUser + this.selectType, JSON.stringify(newArr))
    }
  }
}
</script>

<style scoped>
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
    border-radius: 8%;
    align-items: center;
    padding: 10px;
    background-color: lightblue;
    margin: 5px 15px;
  }
  .i-cha{
    padding: 0 10px;
    border-radius: 100%;
    margin-left: 20px;
  }
  .i-cha:hover{
    background-color: #5063e6;
    color: white;
  }
</style>
