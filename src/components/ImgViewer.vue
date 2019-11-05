<template>
  <div class="imgs">
    <div style="width: 40%;margin: 10px 10px 0" v-for="(item, index) in images" v-preview="item" :key="index">
      <img :src="item" :key="index"
           style="width: 100%;"
           preview-title-enable="true"
           preview-nav-enable="true"/>

    </div>
  </div>
</template>

<script>
import { ImageViewer } from 'mand-mobile'

export default {
  name: 'ImgViewer',
  props: {
    images: Array
  },
  components: {
    [ImageViewer.name]: ImageViewer
  },
  data () {
    return {}
  },
  created () {
  },
  methods: {}
}

</script>

<style lang="stylus" scoped>
  .imgs
    display -webkit-flex
    display flex
    flex-direction row
    flex-wrap wrap
    justify-content center
    border 2px solid #cddbe6
</style>
