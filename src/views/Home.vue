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
          <div class="h-lastName">{{lastName}}</div>
          <div class="h-roleName">{{roleName}}</div>
      </div>
    </div>
    <div class="h-border">
      <div>
        <md-field-item solid title="修改密码" arrow @click="onClick" />
      </div>
      <div>
        <md-field-item solid title="扩展1" arrow @click="onClick" />
      </div>
      <div>
        <md-field-item solid title="扩展2" arrow @click="onClick" />
      </div>
    </div>
    <div class="footer">
      <md-button type="default" plain round @click="logout">退出登录</md-button>
    </div>
  </div>
</template>

<script>
import { ImageViewer, FieldItem, Icon, Button, Dialog } from 'mand-mobile'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    [ImageViewer.name]: ImageViewer,
    [FieldItem.name]: FieldItem,
    [Icon.name]: Icon,
    [Dialog.name]: Dialog,
    [Button.name]: Button
  },
  data () {
    return {
      isViewerShow: false,
      imgUrl: ['https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'],
      roleName: '',
      lastName: ''
    }
  },
  created () {
    this.lastName = this.user[0].lastName
    this.roleName = this.user.map(function (u) {
      return u.roleName
    })
  },
  computed: {
    ...mapState({
      user: state => JSON.parse(state.user)
    })
  },
  methods: {
    showViewer () {
      this.isViewerShow = true
    },
    onClick () {
      this.$router.push('/resetPassword')
    },
    logout () {
      Dialog.confirm({
        title: '确认',
        content: '请确认是否要退出',
        confirmText: '确定',
        onConfirm: () => {
          sessionStorage.removeItem('token')
          sessionStorage.removeItem('user')
          this.$router.replace('/login')
        }
      })
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
  .h-lastName{
    align-self: flex-start;
    font-size: 60px;
  }
  .h-roleName{
    font-size: 25px;
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
