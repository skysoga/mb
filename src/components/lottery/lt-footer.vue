<template>
  <!-- 倍和单位， 确认投注， 号码篮 -->
  <div class="sscFooter active">

    <div class="sscBetInfo fix">
      <div class="betContent">
        <em>+</em>
        <div>
          <h3>已选{{betCount}}注，{{betMoney}}元</h3>
          <p>每位选1个号码为1注</p>
        </div>
      </div>
      <div class="betCart" ><a><i class="iconfont">&#xe75a;<em>88</em></i>号码篮</a></div>
    </div>

    <div class="multipleCon">
      <div class="multipleConLine fix">
        <div class="multiple"><em class="noMore">-</em><input type="tel" value="1"><em>+</em>
        </div><span>倍</span>
        <div class="moneyUnit">
          <a class="curr" >元</a><a>角</a><a>分</a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  created(){
    console.log('jkjk')
  },
  computed:{
    betCount:()=>state.lt.bet.betting_count,
    betMoney:()=>state.lt.bet.betting_money
  }
}
</script>

<style lang = "scss" scoped>
  @import '../../scss/newssc.scss';
</style>