<template>
  <div>
    <div class="f-contain">
      <uploader v-if="isUploaderShow" :options="options" :fileStatusText="fileStatusText" class="f-uploader"
                @file-success="onFileSuccess">
        <uploader-unsupport></uploader-unsupport>
        <uploader-drop class="f-selectBtn">
          <span class="up-records">上传记录</span>
          <uploader-btn>选择文件</uploader-btn>
          <!--<uploader-btn :attrs="attrs">选择图片</uploader-btn>
          <uploader-btn :directory="true">选择文件夹</uploader-btn>-->
        </uploader-drop>
        <uploader-list></uploader-list>
      </uploader>
    </div>
    <div v-if="fileListInBack.length > 0" class="f-fileList">
      <div class="file-list">
        <table border="1" cellpadding="0" cellspacing="0" style="width: 100%;">
          <caption style="font-weight: bold;margin: 10px 0;font-size: 16px">已上传的附件列表</caption>
          <tr align="center" style="font-size: 14px">
            <th>名称</th>
            <th  v-if="isDeleteBtnShow">操作</th>
          </tr>
          <tr align="center" style="font-size: 12px" v-for="(item,index) in fileListInBack" :key="index">
            <td >
              <div class="file-a">
                <a :href="item.url" target="_blank" :download="item.autoName">{{item.name}}</a>
              </div>
            </td>
            <td v-if="isDeleteBtnShow" >
              <md-button type="link" @click="deleteFileBtn(item.id)"><span style="font-size: 12px">删除</span></md-button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Dialog, Toast } from 'mand-mobile'
export default {
  name: 'MultiFileUploader',
  components: {
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Toast.name]: Toast
  },
  props: {
    isUploaderShow: {
      type: Boolean,
      default: false
    },
    isDeleteBtnShow: {
      type: Boolean,
      default: true
    },
    handle: {
      type: Number,
      default: -1
    },
    itemId: {
      type: Number,
      default: -1
    },
    typeFlag: { // 是检查项附件3还是报告项附件4
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      options: {
        target: this.$http.defaults.baseURL + '/file/upload',
        // target: 'http://localhost:8081/file/upload',
        testChunks: false,
        query: {
          itemId: -1,
          type: this.typeFlag
        }
      },
      attrs: {
        accept: 'image/*'
      },
      fileStatusText: {
        success: '成功',
        error: '错误',
        uploading: '上传中...',
        paused: '暂停',
        waiting: '等待...'
      },
      fileListInBack: []
    }
  },
  watch: {
    itemId: function (newVal, oldVal) {
      if (!newVal || newVal === -1) {
        this.fileListInBack = []
        return
      }
      if (this.handle === 1) {
        this.fileListInBack = []
        return
      }
      this.$set(this.options.query, 'itemId', newVal)
      this.getFileList()
    },
    handle: function (newVal, oldVal) {
      if (!newVal || newVal === 1) {
        this.fileListInBack = []
      }
    }
  },
  created () {
    if (!this.itemId || this.itemId === -1) {
      this.fileListInBack = []
      return
    }
    if (this.handle === 1) {
      this.fileListInBack = []
      return
    }
    this.$set(this.options.query, 'itemId', this.itemId)
    this.getFileList()
  },
  methods: {
    // 文件上传成功，刷新附件列表
    onFileSuccess (rootFile, file) {
      this.getFileList()
    },
    // 获取附件列表
    async getFileList () {
      const result = await this.$http.get('file/fileList', {
        params: { itemId: this.itemId, type: this.typeFlag }
      })
      if (result.code === 1) {
        this.fileListInBack = result.data
      } else {
        this.fileListInBack = []
      }
    },
    // 删除附件事件
    deleteFileBtn (id) {
      this.deleteFileById(id)
    },
    deleteFileById (id) {
      Dialog.confirm({
        title: ' ',
        content: '是否确定要删除',
        onConfirm: () => {
          let qs = this.$qs
          this.$http.delete('file/delFile',
            { params: {
              id: id
            },
            paramsSerializer: params => {
              return qs.stringify(params, { indices: false })
            } }).then(res => {
            if (res.code === 1) {
              Dialog.alert({
                title: ' ',
                content: '删除成功',
                onConfirm: () => {
                  this.getFileList()
                }
              })
            } else {
              Dialog.alert({
                title: ' ',
                content: '失败信息：' + res.msg
              })
            }
          })
        }
      })
    }

  }
}
</script>

<style>
  .file-a{
    max-width: 400px;
    display:block;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    margin: 8px 0;
  }
  .f-uploader {
    width: 100%;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
  .file-list{
    margin-top: 10px;
    font-size: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
    display: flex;
  }

  .f-uploader .uploader-btn {
    margin-right: 4px;
  }

  .f-uploader .uploader-list {
  }

  .uploader-file-info {
    display: flex !important;
    display: -webkit-flex !important;
    flex-direction: row !important;
    justify-content: space-between !important;
  }

  .uploader-file-name {
    width: 45% !important;
    flex-grow: 1 !important;
  }

  .uploader-file-size {
    width: 10% !important;
  }

  .uploader-file-meta {
    width: 0 !important;
  }

  .uploader-file-status {
    width: 30% !important;
  }

  .uploader-file-actions {
    display: flex !important;
    display: -webkit-flex !important;
    flex-direction: row !important;
    width: 15% !important;
  }

  .f-selectBtn {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .up-records{
  }
</style>
