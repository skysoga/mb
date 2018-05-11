<template>
  <div class="lottery_sscCon">
    <div :class="{'lottery_ssc':true,'KL8':this.$parent.ltype=='KL8'}" v-show = "!ifShowBasket">
      <div class="DontSelect sscActive">
        <!-- 头部： 玩法选择， 同类彩种选择-->

        <lt-header></lt-header>
        <template v-if="!$store.state.ShowTrendchart">
          <!-- 开奖号码 以及 投注截止时间  -->
          <div class="isLotteryCon" v-show="ifShowType">
            <!-- 开奖结果和历史开奖结果 -->
            <lt-result></lt-result>
            <!-- 倒计时和我的投注 -->
            <lt-timebar></lt-timebar>
          </div>
          <!-- PK10 KL8 开奖号码栏 -->
          <lt-PKKL v-show="!ifShowType"/>

          <!-- 投注区，各彩种不同 -->
          <!-- <ssc></ssc> -->
          <playArea></playArea>

          <!-- 倍和单位， 确认投注， 号码篮 -->
          <ltFooterBJSC v-if="gyhlh"></ltFooterBJSC>
          <lt-footer v-else></lt-footer>
        </template>
      </div>
    </div>

    <!-- 号码篮 -->
    <basket @click.native.stop v-show = "ifShowBasket"></basket>

  </div>
</template>
<style lang = "scss" scoped>
.isLotteryCon{
  position: fixed;
  top:2.3em;
  left: 0;
  width: 100%;
  background: #e1d9ba;
  z-index: 6;
  height: 3em;
}
</style>
<script>
  import lt_header from '../components/lottery/lt_header'
  import lt_result from '../components/lottery/lt_result'
  import lt_timebar from '../components/lottery/lt_timebar'
  import lt_footer from '../components/lottery/lt_footer'
  import lt_footerBJSC from '../components/lottery/lt_footerBJSC'
  import lt_PKKL from '../components/lottery/lt_PKKL'
  import playArea from '../components/lottery/play_area'
  import basket from '../components/lottery/basket'

  // var BJSCres=['PK10']//北京赛车配置
  // var arrMode=['G11','H11']//北京赛车，双面盘，冠亚和
  var isShowBox=['PK10G11','PK10H11','SSCJ11','SSCK11','SSCL11']
  export default {
    components:{
      'lt-header': lt_header,
      'lt-result': lt_result,
      'lt-timebar': lt_timebar,
      'lt-footer': lt_footer,
      'playArea': playArea,
      'basket': basket,
      'lt-PKKL':lt_PKKL,
      'ltFooterBJSC':lt_footerBJSC
    },
    created(){
      this.$store.commit('lt_initConfig')
    },
    computed:{
      ifShowBasket(){
        return this.$store.state.lt.box === 'basket'
      },
      ifShowType(){
        var lotteryArr=['KL8','PK10']
        return lotteryArr.indexOf(this.$parent.ltype)==-1
      },
      mode:()=>state.lt.mode.mode,
      lottery:()=>state.lt.lottery.LotteryType,
      gyhlh(){
        return isShowBox.indexOf(this.lottery+this.mode)!==-1
      }
    },
  }
</script>
