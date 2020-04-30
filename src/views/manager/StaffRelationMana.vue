<template>
  <div>
    <div v-if="!$store.state.isPostSelectUserPage">
      <admin-back-bar :title="title" :is-show-back="isShowBack" @backEvent="backUpDept" @receive="operateDept"></admin-back-bar>
      <div style="height: 3px;background-color: #e0e0e0"></div>
      <bread-crumbs :bcText="bcText" v-if="bcText!==''"></bread-crumbs>
      <staff-relation-list :dept-list="deptList" :post-list="postList" :user-list="userList" @receive="showNextLevel"></staff-relation-list>
    </div>
    <div v-else>
        <router-view></router-view>
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
import StaffRelationList from '../../components/StaffRelationList'
import { ActionSheet, Dialog, InputItem } from 'mand-mobile'
export default {
  name: 'StaffRelationMana',
  components: {
    [ActionSheet.name]: ActionSheet,
    [InputItem.name]: InputItem,
    [Dialog.name]: Dialog,
    AdminBackBar,
    BreadCrumbs,
    StaffRelationList
  },
  data () {
    return {
      isShoeSheet: false,
      opeTitle: '',
      defaultIndex: 0,
      options: [
        { label: '添加', value: 0 },
        { label: '删除', value: 1 }
      ],
      currentId: 0,
      currentJobId: 0,
      deptSaveUpArr: [],
      title: '岗位员工关系管理',
      isShowBack: false,
      bcText: '',
      deptList: [],
      postList: [],
      userList: [],
      isUserLevel: false,
      isSelectUserPage: false
    }
  },
  created () {
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
    getDeptListWithJobId (jobId) { // 根据岗位id获取同级的部门列表
      this.$http.get('tree/queryVisDep', { params: {
        jobId: jobId
      } }).then(res => {
        if (res.code === 1) {
          this.postList = res.data
        } else {
          this.postList = []
        }
      })
    },
    getPostListWithJobId (jobId) { // 根据岗位id获取同级的岗位列表
      this.$http.get('tree/queryVisJob', { params: {
        jobId: jobId
      } }).then(res => {
        if (res.code === 1) {
          this.postList = res.data
        } else {
          this.postList = []
        }
      })
    },
    operateDept () {
      // 是岗位的下层
      if (this.isUserLevel) {
        this.$_showActionSheet()
      } else {
        Dialog.alert({
          title: ' ',
          content: '提示：岗位下才能进行此操作！',
          confirmText: '确定'
        })
      }
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
        this.isUserLevel = false
        this.getDeptList(this.currentId)
        this.getPostList(this.currentId)
        this.userList = []
      } else { // 岗位
        this.isUserLevel = true
        this.currentJobId = val.id
        this.deptList = []
        this.postList = []
        this.getPostUserList(val.id)
      }
    },
    backUpDept () {
      this.isUserLevel = false
      const rst = this.deptSaveUpArr.pop()
      this.bcText = rst.bc
      this.currentId = rst.id
      this.userList = []
      /* if (rst.isDept) { */
      this.getDeptList(this.currentId)
      this.getPostList(this.currentId)
      /* } else {
        this.getDeptListWithJobId(this.currentId)
        this.getPostListWithJobId(this.currentId)
      } */
    },
    $_showActionSheet () {
      this.isShoeSheet = true
    },
    $_selected (item) {
      switch (item.value) {
        // 添加  弹框
        case 0: {
          this.$store.commit('setUserPage', true)
          this.$router.push({ name: 'postSelectUser', query: { jobId: this.currentJobId } })
          break
        }
        //  删除
        case 1: {
          const selectArr = this.userList.filter(d => d.isChecked).map(item => item.id)
          if (selectArr.length >= 1) {
            Dialog.confirm({
              title: ' ',
              content: '您确定要删除选中的员工吗？',
              onConfirm: () => {
                this.crudUser('tree/crudUser', 3, [], this.currentJobId, selectArr)
              }
            })
          } else {
            Dialog.alert({
              title: ' ',
              content: '提示：请在列表中选择要操作的项目',
              confirmText: '确定'
            })
          }
          break
        }
      }
    },
    crudUser (url, type, userIds, jobId, ids) {
      let qs = this.$qs
      let data = {
        type: type,
        userIds: userIds,
        jobId: jobId,
        ids: ids
      }
      this.$http.post(url, qs.stringify(data, { indices: false })
      ).then(res => {
        if (res.code === 1) {
          Dialog.alert({
            title: ' ',
            content: res.msg,
            confirmText: '确定',
            onConfirm: () => {
              this.getPostUserList(this.currentJobId)
            }
          })
        } else {
          Dialog.failed({
            title: ' ',
            content: '失败信息:' + res.msg,
            confirmText: '确定'
          })
        }
      })
    }
  },
  computed: {
    isPostSelectUserPage () {
      return this.$store.state.isPostSelectUserPage
    }
  },
  watch: {
    currentId () {
      if (this.currentId === 0) {
        this.isShowBack = false
      } else {
        this.isShowBack = true
      }
    },
    isPostSelectUserPage (val) {
      if (!val) {
        this.deptList = []
        this.postList = []
        this.getPostUserList(this.currentJobId)
      }
    }
  }
}
</script>

<style scoped>

</style>
