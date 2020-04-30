<template>
    <div class="date-contain">
      <div>
        日期：
      </div>
      <div class="date-inp">
        <input id="date-start" type="date" :value="startDate" style="width: 150px"/>
            <span style="margin: 0 10px">至</span>
        <input id="date-end" type="date" :value="endDate" style="width: 150px"/>
      </div>
    </div>
</template>

<script>
export default {
  name: 'dateSelector',
  props: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  },
  created () {
  }
}
</script>

<style scoped>
 .date-contain{
   display: -webkit-flex;
   display: flex;
   flex-direction: row;
   align-items: center;
   font-size: 0.32rem;
   justify-content: flex-start;
   margin: 20px 0;
 }
  .date-inp{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    font-size: 0.32rem;
    align-items: center;
    position: absolute;
    right: 0;
  }
</style>
