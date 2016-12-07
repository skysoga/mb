<template>
  <div class="isLottery">
    <span>{{oldIssue}}期开奖号码<i class="iconfont">&#xe601;</i></span>
    <div class="openNumber">
      <em v-for = "item in results">{{item}}</em>
      <!-- <em>2</em><em>3</em><em>5</em><em>6</em><em>7</em> -->
    </div>
  </div>
</template>

<script>
export default {
  // created(){
  //  function circle(num){
  //     num ++
  //     if(num > 9){
  //       return 0
  //     }else{
  //       return num
  //     }
  //   }
  //  var arr = [0,0,0,0,0]
  //   setInterval(()=>{
  //     arr = arr.map(num=>{
  //       return circle(num)
  //     })
  //     console.log(arr)
  //   },1000)
  //   this.wait4Results = arr
  // },
  data(){
    return {
      // wait4Results:[0,0,0,0,0]
    }
  },
  computed:{
    oldIssue:()=>state.lt.OldIssue.slice(4),
    results:()=>state.lt.resultNums,
  }
}
</script>

<style lang = "scss" scoped>
  @import '../../scss/newssc.scss';
</style>