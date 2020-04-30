<template>
  <div style="width:100%;margin-top: 50px">
    <div class="test-textarea"
         v-html="innerText"
         contenteditable
         @focus="isLocked = true"
         @blur="isLocked = false"
         @input="changeText"
    ><br /></div>
  </div>
</template>
<script>
export default {
  name: 'editDiv',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      innerText: this.value,
      isLocked: false
    }
  },
  watch: {
    'value' () {
      if (!this.isLocked || !this.innerText) {
        this.innerText = this.value
      }
    }
  },
  mounted () {
  },
  methods: {
    changeText () {
      this.$emit('input', this.$el.innerHTML)
    }
  }
}
</script>

<style>
  .test-textarea {
    margin-top: 50px;
    width: 99%;
    line-height: 24px;
    _height: 40px;
    padding-left: 0px;
    outline: 0;
    font-size: 50px;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-user-modify: read-write-plaintext-only;
    border-radius: 2px;
  }
</style>
