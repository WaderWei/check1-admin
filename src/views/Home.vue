<template>
  <div class="home-contain">
    <div class="h-heard">
        <div class="h-avatar" @click="showViewer()"
             :style="`background: url(${imgUrl[0]}) center no-repeat;background-size:cover;`">
        </div>
      <md-image-viewer style="text-align: left;"
        v-model="isViewerShow"
        :list="imgUrl"
        :has-dots="false">
      </md-image-viewer>
      <div class="h-info">
          <div class="h-name">wade</div>
          <div class="h-dept">软件部</div>
      </div>
    </div>
    <div class="h-border">
      <div>
        <md-field-item solid title="修改密码" arrow @click="onClick" />
      </div>
      <div>
        <md-field-item solid title="动作条目" arrow @click="onClick" />
      </div>
      <div>
        <md-field-item solid title="动作条目" arrow @click="onClick" />
      </div>
    </div>
    <div class="footer">
      <md-button type="default" plain round>退出登录</md-button>
    </div>
  </div>
</template>

<script>
import { ImageViewer, FieldItem, Icon, Button } from 'mand-mobile'
export default {
  name: 'Home1',
  components: {
    [ImageViewer.name]: ImageViewer,
    [FieldItem.name]: FieldItem,
    [Icon.name]: Icon,
    [Button.name]: Button
  },
  data () {
    return {
      isViewerShow: false,
      imgUrl: ['http://manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7']
    }
  },
  methods: {
    showViewer () {
      this.isViewerShow = true
    },
    onClick () {
      alert('123')
    }
  }
}
</script>

<style scoped>
  .home-contain{
  }
  .h-heard{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    margin: 20px;
    padding-bottom: 10px;
    align-items: center;
    border-bottom: 3px solid gray;
    height: 200px;
  }
  .h-avatar{
    width: 160px;
    height: 160px;
    border-radius: 20px;
  }
  .h-info{
    margin-left: 60px;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-around;
  }
  .h-name{
    font-size: 60px;
  }
  .h-dept{
    font-size: 35px;
    color: gray;
    align-self: flex-end;
  }
  .h-border{
    margin: 0 20px;
  }
  .footer{
    margin-top: 40px;
  }
</style>
