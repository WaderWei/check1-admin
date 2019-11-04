<template>
  <div class="lv-contain">
    <div class="lv-title">
      <back-bar v-bind:title="title" v-bind:type="type" ></back-bar>
    </div>
    <div class="lv-body">
    </div>
  </div>
</template>

<script>
import BackBar from '../components/BackBar'
export default {
  name: 'LookOver',
  components: {
    BackBar
  },
  data () {
    return {
      title: '查看检查表',
      type: 1
    }
  },
  created () {
    console.log(this.$route.params.type)
  }
}
</script>

<style scoped>
.lv-contain{
  height: 1200px;
}
</style>
