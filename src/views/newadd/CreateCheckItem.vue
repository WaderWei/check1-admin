<template>
  <div>
    <div class="s-backBar">
      <back-bar v-bind:title="title" v-bind:type="type"></back-bar>
    </div>
    <div class="s-from">
      <md-scroll-view ref="msv"
        :scrolling-x="false"
        :auto-reflow="true"
      >
        <md-field>
          <div style="font-size: 0.32rem">检查内容</div>
          <md-textarea-item
            ref="checkContent"
            title=""
            placeholder="描述信息在500字以内"
            v-model="checkContent"
            :autosize="true"
            :rows="3"
            @focus="moveEnd($event)"
            @blur="checkWayBlur"
            :style="areaStyle"
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
          <div style="height: 1px;background-color: #e0e0e0"></div>
          <div class="md-example-child md-example-child-reader md-example-child-reader-0">
            <div style="font-size: 0.32rem;margin: 15px 0 1px 0">
              图片
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
          <div style="height: 1px;background-color: #e0e0e0"></div>
          <div style="font-size: 0.32rem;margin-top: 15px">检查办法</div>
          <md-textarea-item style="clear: both"
            ref="checkWay"
            title=""
            v-model="checkWay"
            :clearable="true"
            :rows="3"
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
          <div style="height: 1px;background-color: #e0e0e0"></div>
          <div style="font-size: 0.32rem;margin-top: 15px">奖罚单位</div>
          <md-field-item title="" solid>
            <div style="display: flex;justify-content: space-between">
              <md-radio name="1" @input="changNumber" v-model="bonusUnit" label="分(分数)"/>
              <md-radio name="2" @input="changNumber" v-model="bonusUnit" label="元(金额)"/>
              <md-radio name="3" @input="changOther" v-model="bonusUnit" label="其它"/>
            </div>
          </md-field-item>
          <div style="height: 1px;background-color: #e0e0e0"></div>
            <md-input-item
              title="奖罚标准"
              :type="inputType"
              v-model="bonus"
              placeholder="请输入此检查项奖罚标准"
              @blur="checkWayBlur"
            ></md-input-item>
          <!--<div style="height: 1px;background-color: #e0e0e0"></div>
          <div class="c-proof">
            <span>证据是否必填</span>
            <md-switch class="c-switch"
              v-model="isProof"
            ></md-switch>
          </div>-->
          <div style="height: 1px;background-color: #e0e0e0"></div>
          <div class="c-file">
            <span>附件是否上传</span>
            <md-switch class="c-switch"
                       v-model="isFile"
                       @change="uploadFileChange(isFile)"
            ></md-switch>
            <md-button type="link" style="padding: 15px;color: blue;position: absolute;right: 20px" @click="lookoverRule">查看添加附件规则</md-button>
          </div>
          <div class="c-uploader">
            <multi-file-uploader :is-uploader-show="isFile" :handle="handle"
                                 :is-delete-btn-show="true" :item-id="checkItemId" :type-flag="3"></multi-file-uploader>
          </div>
          <div class="s-clear-btn">
            <md-button type="link" style="padding: 15px;color: red" @click="clearAdd">
              <span style="line-height: 13px;font-size: 16px">
                <img src="../../my-svg/clear-add.svg" style="color: red;width:20px;height: 13px;margin-right: 2px;line-height: 13px"/>
                清空再次新增</span></md-button>
            <md-button type="link" v-show="this.checkItemId !== -1" style="padding: 15px;color: red" @click="clearInsert">
              <span style="line-height: 13px;font-size: 16px">
                <img src="../../my-svg/clear-insert.svg" style="color: red;width:20px;height: 13px;margin-right: 2px;line-height: 13px"/>
                清空再次插入</span></md-button>
          </div>
          <div class="s-btn">
            <md-button type="default" style="background-color: red;color: white" round @click="saveCheckItem">{{btnContent}}</md-button>
          </div>
        </md-field>
        <md-field style="margin-top: 50px;visibility: hidden" title="Adjustment Style">
        </md-field>
      </md-scroll-view>
    </div>
  </div>
</template>

<script>
import { InputItem, Field, Icon, Toast, ScrollView, Button, FieldItem, TextareaItem, ImageReader, Tag, Switch, Radio, Dialog } from 'mand-mobile'
import BackBar from '../../components/BackBar'
import MultiFileUploader from '../../components/MultiFileUploader'
// import imageProcessor from 'mand-mobile/components/image-reader/image-processor'
import { KeyboardJackUp, getUser } from '../../utils'
export default {
  name: 'CreateCheckItem',
  components: {
    MultiFileUploader,
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
      btnContent: '保存',
      type: 1,
      checkContent: '',
      checkWay: '',
      isProof: true,
      isFile: false,
      bonus: 0,
      bonusUnit: '1',
      imageList: {
        reader0: []
      },
      checkId: -1,
      checkItemId: -1,
      inputType: 'money',
      handle: -1,
      upLoaderItemId: -1,
      areaStyle: {
        height: ''
      }
    }
  },
  created () {
    this.checkId = this.$route.query.checkId // 绝对不为-1
    this.handle = this.$route.query.handle
    let itemId = parseInt(this.$route.query.id)
    if (itemId !== -1) {
      this.checkItemId = itemId
      // 刷新以后莫名其妙变成了handle 从 1 变成了 '1' ????
      if (this.handle === 1 || this.handle === '1') {
        this.title = '插入检查项'
      } else {
        this.handle = -1
        this.title = '编辑检查项'
        // TODO
        // 请求后端给data中的数据赋值
        this.getCheckItemById()
      }
    } else {
      this.handle = -1
    }
  },
  destroyed () {
  },
  watch: {
    checkItemId: function (val) {
      if (!val) {
        this.checkItemId = -1
      } else {
        this.checkItemId = parseInt(val)
      }
    }
  },
  methods: {
    saveCheckItem () {
      if (!this.valid()) {
        return
      }
      this.$http.post('checkItem/addCheckItem', {
        id: this.checkItemId,
        checkId: this.checkId,
        checkContent: this.checkContent,
        checkWay: this.checkWay,
        files: this.imageList.reader0,
        bonus: this.bonus,
        unit: this.bonusUnit,
        isProof: this.isProof,
        creatorId: getUser()[0].userId,
        handle: this.handle
      })
        .then(res => {
          if (res.code === 1) {
            Dialog.alert({
              title: ' ',
              content: '保存成功',
              onConfirm: () => {
                if (this.checkItemId === -1) {
                  this.checkContent = ''
                  this.checkWay = ''
                  // this.isProof = false
                  this.bonus = 0
                  this.bonusUnit = '1'
                  this.checkItemId = -1
                  this.imageList.reader0 = []
                }
              }
            })
          } else {
            Dialog.failed({
              title: ' ',
              content: '失败信息: ' + res.msg
            })
          }
        })
    },
    getCheckItemById () {
      this.$http.get('checkItem/findCheckItemById', { params: {
        id: this.checkItemId
      } }).then(res => {
        if (res.code === 1) {
          const checkItem = res.data
          this.checkContent = checkItem.checkContent
          this.checkWay = checkItem.checkWay
          this.imageList.reader0 = checkItem.imageQoList
          this.bonus = checkItem.bonus
          this.inputType = checkItem.unit === '3' ? '' : 'money'
          this.bonusUnit = checkItem.unit
          // this.isProof = checkItem.proof
        } else {
          Dialog.failed({
            title: ' ',
            content: '失败信息:' + res.msg
          })
        }
      })
    },
    onReaderSelect (name, { files }) {
      if (this.imageList.reader0.length + files.length > 10) {
        Dialog.alert({
          title: ' ',
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
        /* imageProcessor({
          dataUrl,
          width: 460,
          height: 460,
          quality: 0.6
        }).then(({ dataUrl }) => {
          dataUrl &&
        }) */
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
    },
    moveEnd (event) {
      let area = document.getElementsByClassName('md-textarea-item__textarea')[0]
      area.style.height = (parseInt(this.checkContent.length / 15) * 25) + 80 + 'px'
    },
    changOther () {
      this.inputType = ''
      this.bonus = '按照绩效考核标准'
    },
    changNumber () {
      this.inputType = 'money'
      this.bonus = 0
    },
    clearAdd () {
      this.$refs.msv.scrollTo(0, 0, true)
      this.$refs.checkContent.focus()
      let that = this
      setTimeout(function () {
        that.title = '创建检查项'
        that.checkContent = ''
        that.checkWay = ''
        // that.isProof = false
        that.bonus = 0
        that.bonusUnit = '1'
        // 区别
        that.checkItemId = -1
        that.handle = -1
        that.imageList.reader0 = []
        that.isFile = false
      }, 400)
    },
    clearInsert () {
      this.$refs.msv.scrollTo(0, 0, true)
      this.$refs.checkContent.focus()
      let that = this
      setTimeout(function () {
        that.title = '插入检查项检查项'
        that.checkContent = ''
        that.checkWay = ''
        // that.isProof = false
        that.bonus = 0
        that.bonusUnit = '1'
        // 区别
        that.handle = 1
        that.isFile = false
        that.imageList.reader0 = []
      }, 400)
    },
    lookoverRule () {
      Dialog.alert({
        title: ' ',
        content: '选择上传附件，检查项内容将不自动清空，可通过【清空再次新增】进行清空再编辑。'
      })
    },
    uploadFileChange (isFile) {
      if (!isFile) {
        return
      }
      if (this.checkItemId !== -1 && parseInt(this.handle) !== 1) {
        return
      }
      if (!this.checkContent) {
        Dialog.alert({
          title: ' ',
          content: '请先填写检查内容，然后再选择上传附件'
        })
        this.isFile = false
        return
      }
      this.$http.post('checkItem/addCheckItem', {
        id: this.checkItemId,
        checkId: this.checkId,
        checkContent: this.checkContent,
        checkWay: this.checkWay,
        files: this.imageList.reader0,
        bonus: this.bonus,
        unit: this.bonusUnit,
        isProof: this.isProof,
        creatorId: getUser()[0].userId,
        handle: this.handle
      })
        .then(res => {
          if (res.code === 1) {
            this.checkItemId = parseInt(res.data)
            if (parseInt(this.handle) === 1) {
              this.handle = -1
            }
            this.title = '编辑检查项'
            // Toast.info('保存检查表成功', 1)
          } else {
            // Toast.failed('失败:' + res.ms)
          }
        })
    },
    valid () {
      if (!this.checkContent) {
        Dialog.alert({
          title: ' ',
          content: '请填写检查内容'
        })
        return false
      }
      if (!this.imageList || !this.imageList.reader0 || this.imageList.reader0.length < 1) {
        Dialog.alert({
          title: ' ',
          content: '请上传要检查的图片'
        })
        return false
      }
      if (!this.checkWay) {
        Dialog.alert({
          title: ' ',
          content: '请填写检查办法'
        })
        return false
      }
      return true
    }
  }
}

</script>

<style  lang="stylus" scoped>
  .s-from{
    height:1200px;
    text-align: left;
  }
  .s-btn{
    margin: 20px 20px 0;
  }
  .c-footer{
    text-align: right;
  }
  .s-clear-btn{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top :30px;
  }
  .c-proof
    display -webkit-flex
    display flex
    text-align left
    font-size 30px
    align-items center
    border-bottom 1px solid rgba(220, 220, 220, 0.2)
  .c-file
    display -webkit-flex
    display flex
    text-align left
    font-size 30px
    align-items center
    border-bottom 1px solid rgba(220, 220, 220, 0.2)
  .c-uploader
    width 100%
  .c-switch
    margin 20px 0 20px 30px

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
