<template>
  <div class="textareaNumber">
    <textarea placeholder=" 每1个号码之间请用空格( )、逗号(,)、分号(;)隔开" v-model = "betStr"></textarea>
  </div>
</template>

<script>
export default {
  created(){
    console.log('noteBet')
  },
  data(){
    return {
      betStr:''
    }
  },
  watch:{
    betStr(str){
      console.log(betStr)
      this.betStr = 'jkjk'
    }
  }
}
</script>

<style lang = "scss" scoped>
@import '../../scss/newssc.scss';
</style>