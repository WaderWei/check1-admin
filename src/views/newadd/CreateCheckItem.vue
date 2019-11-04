<template>
  <div class="create-contain">
    <div class="s-backBar">
      <back-bar v-bind:title="title" v-bind:type="type"></back-bar>
    </div>
    <div class="s-from">
      <md-scroll-view
        :scrolling-x="false"
      >
        <md-field>
          <md-textarea-item
            ref="checkContent"
            title="检查内容"
            v-model="checkContent"
            :max-length="500"
            :clearable="true"
            :rows="4"
            placeholder="描述信息在500字以内"
          >
            <template slot="footer">
              <p class="c-footer">
            <span
              class="c-footer-left"
              v-if="checkContent.length"
            >
              {{ checkContent.length }}/500</span>
                <span v-else></span>
              </p>
            </template>
          </md-textarea-item>
          <div class="md-example-child md-example-child-reader md-example-child-reader-0">
            <div style="font-size: 17px;margin: 10px 0">
              添加图片
            </div>
            <ul class="image-reader-list">
              <li
                class="image-reader-item"
                v-for="(img, index) in imageList['reader0']"
                :key="index"
                :style="{
                  'backgroundImage': `url(${img.baseStr})`,
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
                <p>添加图片</p>
              </li>
            </ul>
          </div>

          <md-textarea-item style="clear: both"
            ref="checkWay"
            title="检查办法"
            v-model="checkWay"
            :max-length="200"
            :clearable="true"
            :rows="2"
            placeholder="描述信息在200字以内"
            @blur="checkWayBlur"
          >
            <template slot="footer">
              <p class="c-footer">
            <span
              class="c-footer-left"
              v-if="checkWay.length"
            >
              {{ checkWay.length }}/200</span>
                <span v-else></span>
              </p>
            </template>
          </md-textarea-item>

            <md-input-item
              title="标准"
              type="money"
              v-model="bonus"
              placeholder="请输入此检查项奖赏标准"
            ></md-input-item>

          <md-field-item title="标准单位" solid>
            <md-radio name="1" v-model="bonusUnit" label="分(分数)" inline />
            <md-radio name="2" v-model="bonusUnit" label="元(金额)" inline />
          </md-field-item>
          <div class="c-proof">
            <span>证据是否必填</span>
            <md-switch class="c-switch"
              v-model="isProof"
            ></md-switch>
          </div>
          <div class="s-btn">
            <md-button type="default" round @click="saveCheckItem">保存</md-button>
          </div>
        </md-field>
      </md-scroll-view>
    </div>
  </div>
</template>

<script>
import { InputItem, Field, Icon, Toast, ScrollView, Button, FieldItem, TextareaItem, ImageReader, Tag, Switch, Radio, Dialog } from 'mand-mobile'
import BackBar from '../../components/BackBar'
import { KeyboardJackUp } from '../../utils'
export default {
  name: 'CreateCheckItem',
  components: {
    [InputItem.name]: InputItem,
    [ScrollView.name]: ScrollView,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [Button.name]: Button,
    [FieldItem.name]: FieldItem,
    [TextareaItem.name]: TextareaItem,
    [ImageReader.name]: ImageReader,
    [Tag.name]: Tag,
    [Switch.name]: Switch,
    [Radio.name]: Radio,
    BackBar
  },
  data () {
    return {
      title: '创建检查项',
      type: 1,
      checkContent: '',
      checkWay: '',
      isProof: true,
      bonus: 0,
      bonusUnit: '1',
      imageList: {
        reader0: []
      }
    }
  },
  created () {
  },
  destroyed () {
  },
  methods: {
    saveCheckItem () {
      console.log(this.imageList)
      this.$http.post('check/upload', {
        checkContent: this.checkContent,
        checkWay: this.checkWay,
        files: this.imageList.reader0
      })
        .then(res => {
          if (res.code === 1) {
            this.checkItemList = res.data
          } else {
            this.checkItemList = []
            console.log('checkItemList:' + res.msg)
          }
        })
    },
    onReaderSelect (name, { files }) {
      if (this.imageList.reader0.length + files.length > 10) {
        Dialog.alert({
          title: '警告',
          content: '上传的图片最多不能超过10张',
          confirmText: '确定'
        })
        return
      }
      Toast.loading('图片读取中...')
    },
    onReaderComplete (name, { dataUrl, file }) {
      Toast.hide()
      setTimeout(() => {
        const demoImageList = this.imageList[name] || []
        if (demoImageList.length > 9) {
          return
        }
        demoImageList.push({ name: file.name, size: file.size, baseStr: dataUrl })
        this.$set(this.imageList, name, demoImageList)
      }, 100)
    },
    onReaderError (name, { msg }) {
      Toast.failed(msg)
    },
    onDeleteImage (name, index) {
      const demoImageList = this.imageList[name] || []
      demoImageList.splice(index, 1)
      this.$set(this.imageList, name, demoImageList)
    },
    checkWayBlur () {
      KeyboardJackUp()
    }
  }
}

</script>

<style  lang="stylus" scoped>
  .s-from{
    height: 1200px;
    text-align: left;
  }
  .s-btn{
    margin: 20px 20px 0;
  }
  .c-footer{
    text-align: right;
  }
  .c-proof
    display -webkit-flex
    display flex
    text-align left
    font-size 30px
    align-items center
    border-bottom 1px solid rgba(220, 220, 220, 0.2)

  .c-switch
    margin 20px 0 20px 150px

  .md-example-child-reader
    height 500px
    .image-reader-list
      float left
      width 100%
      max-height 500px
      overflow-y:auto;
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
