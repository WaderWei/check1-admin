<template>
    <div class="back-contain">
      <div @click="goBack" class="b-back">
        <md-icon name="arrow-left" size="lg" ></md-icon>返回
      </div>
      <div class="b-title" style="color: red">
        {{title}}
      </div>
      <div class="b-clear" @click="$emit('receive')">
        <span v-if="!type">清空</span>
      </div>
    </div>
</template>

<script>
import { Icon, Button } from 'mand-mobile'
export default {
  name: 'BackBar',
  props: ['title', 'type'],
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
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
    color: white;
  }
  .b-back{
    margin-left: 20px;
    color: black;
  }
  .b-clear{
    margin-right: 20px;
    color: black;
  }
</style>
