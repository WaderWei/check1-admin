<template>
  <div class="index-contain">
    index
  </div>
</template>

<script>
export default {
  name: 'Index',
  mounted () {
    const contain = document.querySelector('.index-contain')
    const bodyHeight = document.documentElement.clientHeight
    contain.style.height = (bodyHeight - 55) + 'px'
  }
}
</script>

<style scoped>
  .index-contain{
    height: 100px;
    background-color: blue;
  }
</style>
