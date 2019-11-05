<template>
  <div class="md-example-child md-example-child-image-reader">
    <div>
      <ul>
        <template v-for="(item, index) in images">
          <li @click="showViewer(index, $event)" :key="index">
            <div class="img"
                 :style="`background: url(${item}) center no-repeat;background-size:cover;`">
            </div>
          </li>
        </template>
      </ul>
    </div>
    <md-image-viewer
      v-model="isViewerShow"
      :list="images"
      :has-dots="true"
      :initial-index="viewerIndex">
    </md-image-viewer>
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
    return {
      isViewerShow: false,
      viewerIndex: 0
    }
  },
  created () {
  },
  methods: {
    showViewer (index, event) {
      /* this.viewerIndex = index
      this.isViewerShow = true */
    }
  }
}

</script>

<style lang="stylus" scoped>
  .div{
  }
  .md-example-child-image-reader
    float left
    width 100%
    ul
      float left
      width 100%
      li
        position relative
        float left
        width 100%
        height 200px
        padding-bottom 22%
        margin-left 2%
        margin-top 2%
        border-sizing border-box
        border-radius 2px
        overflow hidden
        list-style none
        .img
          position absolute
          width 100%
          height 100%
</style>
