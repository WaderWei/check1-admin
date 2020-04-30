<template>
  <div class="md-example-child md-example-child-reader md-example-child-reader-0">
    <div style="font-size: 17px;margin: 10px 0">
      添加图片
    </div>
    <ul class="image-reader-list">
      <li
        class="image-reader-item"
        v-for="(img, index) in images['reader0']"
        :key="index"
        :style="{
          'backgroundImage': `url(${img.url})`,
          'backgroundPosition': 'center center',
          'backgroundRepeat': 'no-repeat',
          'backgroundSize': 'cover'
        }">
        <md-tag
          class="image-reader-item-del"
          size="small"
          shape="quarter"
          fill-color="#111A34"
          type="fill"
          font-color="#fff"
          @click.native="onDeleteImage('reader0', index)"
        >
          <md-icon name="close"></md-icon>
        </md-tag>
      </li>
      <li class="image-reader-item add">
        <md-image-reader
          name="reader0"
          @select="onReaderSelect"
          @complete="onReaderComplete"
          @error="onReaderError"
          is-multiple
        ></md-image-reader>
        <md-icon name="camera" size="md" color="#CCC"></md-icon>
        <p>图片</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { Icon, ImageReader, Tag, Toast } from 'mand-mobile'
// import imageProcessor from 'mand-mobile/components/image-reader/image-processor'
export default {
  name: 'ImgReader',
  components: {
    [Icon.name]: Icon,
    [ImageReader.name]: ImageReader,
    [Tag.name]: Tag
  },
  props: {
    images: Object
  },
  created () {
  },
  methods: {
    onReaderSelect (name, { files }) {
      Toast.loading('图片读取中...')
    },
    onReaderComplete (name, { dataUrl, file }) {
      Toast.hide()
      setTimeout(() => {
        const demoImageList = this.images[name] || []
        demoImageList.push({ name: file.name, size: file.size, url: dataUrl })
        /* imageProcessor({
          dataUrl,
          width: 460,
          height: 460,
          quality: 1
        }).then(({ dataUrl }) => {
          dataUrl && demoImageList.push({ name: file.name, size: file.size, url: dataUrl })
        }) */
        this.$set(this.images, name, demoImageList)
      }, 100)
    },
    onReaderError (name, { msg }) {
      Toast.failed(msg)
    },
    onDeleteImage (name, index) {
      const demoImageList = this.images[name] || []
      demoImageList.splice(index, 1)
      this.$set(this.images, name, demoImageList)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .md-example-child-reader
    .image-reader-list
      float left
      width 100%
      .image-reader-item
        position relative
        float left
        width 23.5%
        padding-bottom 23.5%
        margin-bottom 2%
        margin-right 2%
        background #FFF
        box-shadow 0 5px 20px rgba(197, 202, 213, .25)
        box-sizing border-box
        list-style none
        border-radius 4px
        background-size cover
        overflow hidden
        &:nth-of-type(4n)
          margin-right 0
        &.add
          .md-icon
            position absolute
            top 40%
            left 50%
            transform translate(-50%, -50%)
            opacity .5
          p
            position absolute
            top 50%
            left 0
            width 100%
            margin-top 15px
            font-size 22px
            color #CCC
            text-align center
        .image-reader-item-del
          position absolute
          top 0
          right 0
          z-index 3
          opacity .8
          .md-icon-close
            font-size 24px
</style>
