<template>
  <div class="BreadCrumbs">
    {{bcText}}
  </div>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  props: {
    bcText: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
  .BreadCrumbs{
    background-color: #cbcbcb;
    height: 100px;
    padding-left: 30px;
    font-size: 0.32rem;
    line-height: 100px;
    text-align: left;
    color: #686868;
  }
</style>
