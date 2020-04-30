<template>
  <div>
    <div v-for="(l,i) in list" :key="i" class="row-content" >
      <div class="c-check" @click="show(l)">
        <input name="radio" type="radio" value="false" style="width: 30px;height: 16px"/>
      </div>
      <div class="c-info">
        <div class="c-info-up">
          <div class="c-read" :class="l.status === 1? 'readStyle':'unreadStyle'">{{l.status === 1 ? '已读': '未读'}}</div>
          <div class="c-name">{{l.label}}</div>
        </div>
        <div class="c-info-down">{{l.brief}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Radio } from 'mand-mobile'

export default {
  name: 'ReadList',
  props: {
    list: {
      type: Array,
      required: true,
      defalut: []
    }
  },
  components: {
    [Radio.name]: Radio
  },
  data () {
    return {
    }
  },
  methods: {
    show (val) {
      this.$emit('openSheet', val)
    }
  }
}
</script>

<style scoped>
  .row-content {
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    font-size: 0.32rem;
    margin: 30px 0;
  }
  .c-check{
    display: -webkit-flex;
    display: flex;
    align-items: center;
    margin-right: 30px;
  }

  .c-info-up {
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
  }
  .c-info-down{
    color: #bebebe;
    font-size:  0.25rem;
  }
  .c-read{
    margin-right: 20px;
    white-space: nowrap;
  }
  .c-name{
  }
  .readStyle{
    color: #bfbfbf;
  }
  .unreadStyle{
    color: red;
  }
</style>
