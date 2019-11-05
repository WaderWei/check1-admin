<template>
  <div class="lv-contain">
    <div class="lv-backBar">
      <back-bar v-bind:title="title" v-bind:type="type" ></back-bar>
    </div>
    <div class="lv-body">
      <md-scroll-view
        :scrolling-x="false"
      >
        <md-field>
          <div style="font-weight: bold">
            <md-field-item title="检查项名称" :placeholder="title" />
            <md-field-item title="使用部门" :placeholder="title" />
            <md-field-item title="报告周期" :placeholder="title" />
            <md-textarea-item
              ref="count"
              title="统计"
              :autosize="true"
              value="禁用文本域, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述"
              placeholder="500字以内"
              :max-height="150"
              disabled
            />
          </div>
          <div class="lv-checkContain">
            <div class="lv-item" v-for="n in checkItems" :key="n.id">
              <md-textarea-item style="clear: both;"
                title="检查内容"
                :autosize="true"
                value="禁用文本域, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述, 理赔报案描述"
                placeholder="500字以内"
                :max-height="150"
                disabled
              />
              <div style="font-size: 18px;margin-top: 10px">检查图片</div>
              <div class="lv-img-viewer">
                  <img-viewer :images="n.imgs"></img-viewer>
              </div>
              <md-field-item title="奖赏标准" align="center" :placeholder="n.bonus" style="clear: both;"/>
              <md-field-item title="标准单位" align="center" :placeholder="n.unit" style="clear: both"/>
              <md-field-item title="证据必填" align="center" :placeholder="n.isProof" style="clear: both;white-space: nowrap;"/>
            </div>
          </div>
        </md-field>
      </md-scroll-view>
    </div>
  </div>
</template>

<script>
import BackBar from '../../components/BackBar'
import ImgViewer from '../../components/ImgViewer'
import { Icon, Field, ScrollView, FieldItem, TextareaItem, ImageViewer, InputItem } from 'mand-mobile'
import MdField from 'mand-mobile/components/field/index'
import MdFieldItem from 'mand-mobile/components/field/item'
export default {
  name: 'LookOver',
  components: {
    MdFieldItem,
    MdField,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [ScrollView.name]: ScrollView,
    [TextareaItem.name]: TextareaItem,
    [ImageViewer.name]: ImageViewer,
    [InputItem.name]: InputItem,
    BackBar,
    ImgViewer
  },
  data () {
    return {
      title: '查看检查表',
      type: 1,
      isViewerShow: false,
      viewerIndex: 0,
      checkItems: [
        {
          id: 1,
          checkContain: '1',
          imgs: [
            'http://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a',
            'http://manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7',
            'http://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/6ee5a0ba9340ca452cbc827902e76be0'
          ],
          bonus: '20',
          unit: '分',
          isProof: '是'
        },
        {
          id: 2,
          checkContain: '2',
          imgs: [
            'http://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a',
            'http://manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7'
          ],
          bonus: '20',
          unit: '分',
          isProof: '是'
        },
        {
          id: 3,
          checkContain: '3',
          imgs: [
            'http://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a',
            'http://manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7',
            'http://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/6ee5a0ba9340ca452cbc827902e76be0',
            'http://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/d751dd4487e265de3b8587f504eee2c3',
            'http://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a',
            'http://manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7',
            'http://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a',
            'http://manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7'
          ],
          bonus: '20',
          unit: '分',
          isProof: '是'
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
  .lv-contain{
  }
  .lv-body
    height 1200px
    text-align left
  .lv-checkContain
    margin-top 30px
  .lv-item
    margin-top 10px
    border: 3px solid rgba(128, 128, 128, 0.12)
    padding 10px 20px
</style>
