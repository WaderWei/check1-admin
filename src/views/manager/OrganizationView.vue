<template>
  <div>
    <div>
      <admin-back-bar :title="title" :is-show-back="isShowBack" :is-show-slot="false" @backEvent="backUpDept"></admin-back-bar>
      <div style="height: 3px;background-color: #e0e0e0"></div>
      <bread-crumbs :bcText="bcText" v-if="bcText!==''"></bread-crumbs>
      <inquire-list :dept-list="deptList" :post-list="postList" :user-list="userList" @receive="showNextLevel" @showSheet="showSheet"></inquire-list>
    </div>
    <div class="c-sheet">
      <md-action-sheet
        v-model="isShoeSheet"
        :title="opeTitle"
        :default-index="defaultIndex"
        cancel-text="取消"
        :options="options"
        @selected="$_selected"
        :large-radius="true"
      ></md-action-sheet>
    </div>
  </div>
</template>

<script>
import AdminBackBar from '../../components/AdminBackBar'
import BreadCrumbs from '../../components/BreadCrumbs'
import InquireList from '../../components/InquireList'
import { ActionSheet, Dialog, InputItem } from 'mand-mobile'
export default {
  name: 'OrganizationView',
  components: {
    [ActionSheet.name]: ActionSheet,
    [InputItem.name]: InputItem,
    [Dialog.name]: Dialog,
    AdminBackBar,
    BreadCrumbs,
    InquireList
  },
  data () {
    return {
      isShoeSheet: false,
      opeTitle: '',
      defaultIndex: 0,
      options: [
        { label: '查询检查表', value: 0 }
      ],
      currentId: 0,
      currentJobId: 0,
      deptSaveUpArr: [],
      title: '按组织架构查看',
      isShowBack: true,
      bcText: '',
      deptList: [],
      postList: [],
      userList: [],
      listName: '',
      clickDate: '',
      clickType: 1
    }
  },
  created () {
    this.listName = this.$route.query.listName
    this.getDeptList(0)
    this.getPostList(0)
  },
  methods: {
    getDeptList (parentId) {
      this.$http.get('tree/selectDep', { params: {
        parentId: parentId
      } }).then(res => {
        if (res.code === 1) {
          this.deptList = res.data
        } else {
          this.deptList = []
        }
      })
    },
    getPostList (parentId) {
      this.$http.get('tree/selectJob', { params: {
        depId: parentId
      } }).then(res => {
        if (res.code === 1) {
          this.postList = res.data
        } else {
          this.postList = []
        }
      })
    },
    getPostUserList (jobId) { // 根据岗位id获取员工id
      this.$http.get('tree/selectUser', { params: {
        jobId: jobId
      } }).then(res => {
        if (res.code === 1) {
          this.userList = res.data
        } else {
          this.userList = []
        }
      })
    },
    showNextLevel (val) {
      this.deptSaveUpArr.push({ id: this.currentId, bc: this.bcText, isDept: val.typeFlag === 0 }) // 将部门id保存到集合中
      this.currentId = val.id
      if (this.bcText === '') {
        if (val.typeFlag === 0) {
          this.bcText = val.depName
        } else {
          this.bcText = val.jobName
        }
      } else {
        if (val.typeFlag === 0) {
          this.bcText += ' > ' + val.depName
        } else {
          this.bcText += ' > ' + val.jobName
        }
      }
      if (val.typeFlag === 0) { // 部门
        this.getDeptList(this.currentId)
        this.getPostList(this.currentId)
        this.userList = []
      } else { // 岗位
        this.currentJobId = val.id
        this.deptList = []
        this.postList = []
        this.getPostUserList(val.id)
      }
    },
    backUpDept () {
      if (this.currentId === 0) {
        this.$router.push('/downTabBar/index/' + this.listName)
      } else {
        const rst = this.deptSaveUpArr.pop()
        this.bcText = rst.bc
        this.currentId = rst.id
        this.userList = []
        this.getDeptList(this.currentId)
        this.getPostList(this.currentId)
      }
    },
    showSheet (val, type) {
      this.clickDate = val
      this.clickType = type // 1 部门 2用户
      this.$_showActionSheet()
    },
    $_showActionSheet () {
      this.isShoeSheet = true
    },
    $_selected (item) {
      switch (item.value) {
        // 查看
        case 0: {
          this.$router.push({ name: this.listName, query: { val: this.clickDate.id, type: this.clickType } })
          break
        }
      }
    }
  },
  computed: {
    isPostSelectUserPage () {
      return this.$store.state.isPostSelectUserPage
    }
  },
  watch: {
    /* currentId () {
      if (this.currentId === 0) {
        this.isShowBack = false
      } else {
        this.isShowBack = true
      }
    } */
  }
}
</script>

<style scoped>

</style>
