<template>
  <div>
    <md-field-item class="i-f-i" solid  title="对象" arrow content="  请选择酒店/部门" @click="selectDeptMethod">
    </md-field-item>
    <div class = 'dept-item'>
      <div class="i-item">
        <span class="i-name">{{selectDept.label}}</span><span class="i-cha" @click="removeDept()">×</span>
      </div>
    </div>
  </div>
</template>

<script>
import { FieldItem, Tag } from 'mand-mobile'
const selectDept = 'selectDept'
export default {
  name: 'SelectItemDept',
  props: {
    selectDept: Object
  },
  components: {
    [FieldItem.name]: FieldItem,
    [Tag.name]: Tag
  },
  data () {
    return {
    }
  },
  created () {
  },
  watch: {
    selectDept (n, o) {
      this.selectDept = n
    }
  },
  methods: {
    selectDeptMethod () {
      this.$router.push({ name: 'selectDept' })
    },
    removeDept () {
      sessionStorage.setItem(selectDept, '')
    }
  }
}
</script>

<style scoped>
.dept-item{
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 20px;
  font-size: 28px;
  text-align: center;
}
  .i-item{
    border-radius: 8%;
    align-items: center;
    padding: 10px;
    background-color: lightblue;
    margin: 5px 15px;
  }
  .i-cha{
    padding: 0 10px;
    border-radius: 100%;
    margin-left: 20px;
  }
  .i-cha:hover{
    background-color: #5063e6;
    color: white;
  }
</style>
