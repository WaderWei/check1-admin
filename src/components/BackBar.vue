<template>
    <div class="back-contain">
      <div @click="goBack" class="b-back">
        <md-icon name="arrow-left" size="lg" ></md-icon>返回
      </div>
      <div class="b-title">
        {{title}}
      </div>
      <div class="b-clear" @click="$emit('receive')">
        清空
      </div>
    </div>
</template>

<script>
import { Icon, Button } from 'mand-mobile'
export default {
  name: 'BackBar',
  props: ['title'],
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
    background: #4C83E8;
    align-items: center;
    height: 120px;
    font-size: 40px;
    color: white;
  }
  .b-back{
    margin-left: 20px;
  }
  .b-clear{
    margin-right: 20px;
  }
</style>
