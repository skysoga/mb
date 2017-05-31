<template>
  <div class="lottery_sscCon">
    <div :class="{'lottery_ssc':true,'KL8':this.$parent.ltype=='KL8','PK10':this.$parent.ltype=='PK10'}" v-show = "!ifShowBasket">
      <div class="DontSelect sscActive">
        <!-- 头部： 玩法选择， 同类彩种选择-->
        <lt-header></lt-header>

        <!-- 开奖号码 以及 投注截止时间  -->
        <div class="isLotteryCon" v-show="ifShowType" v-if = "false">
          <!-- 开奖结果和历史开奖结果 -->
          <lt-result></lt-result>
          <!-- 倒计时和我的投注 -->
          <lt-timebar></lt-timebar>
        </div>

        <!-- 投注区，各彩种不同 -->
        <playArea v-if = "false"></playArea >

        <!-- 倍和单位， 确认投注， 号码篮 -->
        <lt-footer v-if = "false"></lt-footer>
      </div>
    </div>


  </div>
</template>

<script>
import lt_header from '../components/lottery/lt_header'
import lt_result from '../components/lottery/lt_result'
import lt_timebar from '../components/lottery/lt_timebar'
import lt_footer from '../components/lottery/lt_footer'
import lt_PKKL from '../components/lottery/lt_PKKL'
import playArea from '../components/lottery/play_area'

export default {
  components:{
      'lt-header': lt_header,
      'lt-result': lt_result,
      'lt-timebar': lt_timebar,
      'lt-footer': lt_footer,
      'playArea': playArea,
  },
  created(){
    console.log('jkjk')
  }
}
</script>

<style lang = "scss" scoped>
@import '../scss/newssc.scss';
</style>