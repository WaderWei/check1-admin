<template>
    <div class="create-contain">
      <div class="s-backBar">
        <back-bar v-bind:title="title" v-bind:type="type"></back-bar>
      </div>
    </div>
</template>

<script>
import BackBar from '../components/BackBar'
export default {
  name: 'CreateCheckTb',
  components: {
    BackBar
  },
  data () {
    return {
      title: '创建检查表',
      type: 1
    }
  }
}
</script>

<style scoped>

</style>
