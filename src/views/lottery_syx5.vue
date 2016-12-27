<template>
  <div class="lottery_sscCon">
    <div class="lottery_ssc" v-show = "!ifShowBasket">
      <div class="DontSelect sscActive">
        <!-- 头部： 玩法选择， 同类彩种选择-->
        <lt-header></lt-header>
        <!-- 开奖号码 以及 投注截止时间  -->
        <div class="isLotteryCon">
          <!-- 开奖结果和历史开奖结果 -->
          <lt-result></lt-result>
          <!-- 倒计时和我的投注 -->
        <lt-timebar></lt-timebar>
        </div>

        <!-- 投注区，各彩种不同 -->
        <syx5 :mode = "$store.state.lt.mode.mode"></syx5>
        <!-- <ssc :mode = "$store.state.lt.mode.mode"></ssc> -->

        <!-- 倍和单位， 确认投注， 号码篮 -->
        <lt-footer></lt-footer>
      </div>
    </div>
    <basket @click.native.stop v-show = "ifShowBasket"></basket>
  </div>
</template>
<style lang = "scss" scoped>
@import '../scss/newssc.scss';
</style>
<script>
  import lt_header from '../components/lottery/lt-header'
  import lt_result from '../components/lottery/lt-result'
  import lt_timebar from '../components/lottery/lt-timebar'
  import lt_footer from '../components/lottery/lt-footer'
  import syx5 from '../components/lottery/syx5'
  import basket from '../components/lottery/basket'

  export default {
    components:{
      'lt-header': lt_header,
      'lt-result': lt_result,
      'lt-timebar': lt_timebar,
      'lt-footer': lt_footer,
      'syx5': syx5,
      'basket': basket,
    },
    created(){
      this.$store.commit('lt_initConfig')
    },
    computed:{
      ifShowBasket(){
        return this.$store.state.lt.box === 'basket'
      },
    },
  }
</script>