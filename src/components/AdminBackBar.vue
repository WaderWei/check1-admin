<template>
  <div class="back-contain">
    <div @click="$emit('backEvent')" class="b-back">
      <div v-show="isShowBack"><md-icon name="arrow-left" size="lg" ></md-icon>返回</div>
    </div>
    <div class="b-title" style="color: red">
      {{title}}
    </div>
    <div class="b-clear" @click="$emit('receive')" >
      <span v-show="isShowSlot">…</span>
    </div>
  </div>
</template>

<script>
import { Icon, Button } from 'mand-mobile'
export default {
  name: 'BackBar',
  props: {
    title: {
      type: String,
      required: true
    },
    isShowBack: {
      type: Boolean,
      default: true
    },
    isShowSlot: {
      type: Boolean,
      default: true
    }
  },
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button
  },
  methods: {
  }
}
</script>

<style scoped>
  .back-contain{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: white;
    align-items: center;
    height: 120px;
    font-size: 40px;
    background-color: #e9e9e9;
  }
  .b-back{
    margin-left: 20px;
    color: black;
  }
  .b-clear{
    margin-right: 20px;
    color: black;
    margin-bottom: 15px;
  }
</style>
