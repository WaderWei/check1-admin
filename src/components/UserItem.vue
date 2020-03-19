<template>
  <div class="u-contain">
    <div class="u-title">{{title}}</div>
    <div class="u-user">{{userList | changeList}}</div>
  </div>
</template>

<script>
export default {
  name: 'UserItem',
  props: {
    title: String,
    userList: Array
  },
  filters: {
    changeList: function (value) {
      if (!(value && value.length > 0)) {
        return ''
      }
      return value.map(function (u) {
        return u.lastName
      }).toString()
    }
  }
}
</script>

<style scoped>
  .u-contain{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    font-size: 32px;
    font-weight: normal;
    padding: 25px 0;
  }
  .u-title{
    font-weight: bold;
    margin-bottom: 15px;
    width: 190px;
  }
  .u-user{
    color: #858B9C;
    width: 80%;
    text-align: right;
  }
</style>
