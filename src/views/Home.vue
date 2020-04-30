<template>
  <div class="home-contain">
    <div class="h-heard">
        <div class="h-avatar">
          <img :src="require('@/my-svg/headnew.png')" style="width: 100%"/>
        </div>
      <div class="h-info">
          <div class="h-lastName">{{lastName}}</div>
          <div class="h-roleName" v-html="roleName"></div>
      </div>
    </div>
    <div style="width: 100%;height: 5px;background-color: #e6e6e6"></div>
    <div class="h-border">
      <div class="h-item" v-if="roleType !== 0">
        <img :src="require('@/my-svg/comp.png')" style="width: 20px;height: 20px;margin: 0 15px"/>
        <md-field-item solid title="对比报表" style="flex-grow: 1" arrow @click="compareReport" />
      </div>
      <div class="h-item" v-if="isShowCountRow" @click="operation">
        <img :src="require('@/my-svg/统计2.svg')" style="width: 20px;height: 20px;margin: 0 15px"/>
        <md-field-item solid title="监督统计" style="flex-grow: 1" arrow />
      </div>
      <div class="h-item">
        <img :src="require('@/my-svg/passwordh.png')" style="width: 20px;height: 20px;margin: 0 15px"/>
        <md-field-item solid title="修改密码" style="flex-grow: 1" arrow @click="editPassword" />
      </div>
      <!--<div>
        <md-field-item solid title="扩展2" arrow @click="onClick" />
      </div>-->
    </div>
    <div class="footer">
      <md-button type="default" plain round @click="logout">退出登录</md-button>
    </div>
    <div class="c-sheet">
      <md-action-sheet
        v-model="isShoeSheet"
        :title="opeTitle"
        cancel-text="取消"
        :options="options"
        @selected="$_selected"
        :large-radius="true"
      ></md-action-sheet>
    </div>
  </div>
</template>

<script>
import { ImageViewer, FieldItem, Icon, Button, Dialog, ActionSheet } from 'mand-mobile'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    [ActionSheet.name]: ActionSheet,
    [ImageViewer.name]: ImageViewer,
    [FieldItem.name]: FieldItem,
    [Icon.name]: Icon,
    [Dialog.name]: Dialog,
    [Button.name]: Button
  },
  data () {
    return {
      isViewerShow: false,
      imgUrl: ['http://223.240.65.137:7777/1.png'],
      roleName: '当前角色：',
      lastName: '',
      roleType: -1,
      opeTitle: '',
      isShoeSheet: false,
      options: [
        { label: '检查表执行统计', value: 0 },
        { label: '检查表阅读统计', value: 1 },
        { label: '检查报告阅读统计', value: 2 }
      ],
      isShowCountRow: false
    }
  },
  created () {
    sessionStorage.removeItem('selectUser' + 10) // 删除被检查人的选择存储
    sessionStorage.removeItem('selectUser' + 11)
    sessionStorage.removeItem('selectUser' + 12)
    sessionStorage.removeItem('jianCheckSelect')
    sessionStorage.removeItem('jianReportSelect')
    this.isShowCountRow = this.user.filter(u => u.roleType === 5 || u.roleType === 6).length > 0
    this.roleType = this.user[0].roleType
    this.lastName = this.user[0].lastName
    /* this.roleName = this.user.map(function (u) {
      return u.roleName
    }) */
    for (let i = 0; i < this.user.length; i++) {
      if (i === this.user.length - 1) {
        this.roleName += this.user[i].roleName
      } else if (i === 2 && this.user.length - 1 !== 2) {
        this.roleName += this.user[i].roleName + ',<br/>'
      } else {
        this.roleName += this.user[i].roleName + ','
      }
    }
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
    editPassword () {
      this.$router.push('/resetPassword')
    },
    compareReport () {
      this.$router.push('/compareReport')
    },
    logout () {
      Dialog.confirm({
        title: ' ',
        content: '请确认是否要退出',
        confirmText: '确定',
        onConfirm: () => {
          sessionStorage.removeItem('token')
          sessionStorage.removeItem('user')
          this.$router.replace('/')
        }
      })
    },
    operation () {
      this.$_showActionSheet()
    },
    $_showActionSheet () {
      this.isShoeSheet = true
    },
    $_selected (item) {
      switch (item.value) {
        // 检查表执行统计
        case 0: {
          // 进去之前清除一下开始与结束时间
          sessionStorage.removeItem('startDate')
          sessionStorage.removeItem('endDate')
          this.$router.push({ name: 'jianCount', query: { id: 0 } })
          break
        }
        // 检查表阅读统计
        case 1: {
          // 进去之前清除一下开始与结束时间
          sessionStorage.removeItem('startDate')
          sessionStorage.removeItem('endDate')
          this.$router.push({ name: 'jianCheckCount', query: { id: 0 } })
          break
        }
        // 检查报告阅读统计
        case 2: {
          // 进去之前清除一下开始与结束时间
          sessionStorage.removeItem('startDate')
          sessionStorage.removeItem('endDate')
          this.$router.push({ name: 'jianReportCount', query: { id: 0 } })
          break
        }
      }
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
    margin: 50px 20px;
    padding-bottom: 10px;
    align-items: center;
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
    text-align: left;
  }
  .h-border{
    margin: 0 20px;
  }
  .footer{
    margin: 40px 15px 0px 15px;
  }
  .h-item{
    display: -webkit-flex;
    display: flex;
    margin-bottom: 30px;
    width: 100%;
    align-items: center;
  }
</style>
