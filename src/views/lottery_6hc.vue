<template>
  <div class="lottery_sscCon">
    <div :class="{'lottery_ssc':true,'KL8':this.$parent.ltype=='KL8','PK10':this.$parent.ltype=='PK10'}">
      <div class="DontSelect sscActive">
        <!-- 头部： 玩法选择， 同类彩种选择-->
        <lt-header></lt-header>

        <!-- 开奖号码 以及 投注截止时间  -->
        <div class="isLotteryCon" >
          <!-- 开奖结果和历史开奖结果 -->
          <lt-result></lt-result>
          <!-- 倒计时和我的投注 -->
          <lt-timebar></lt-timebar>
        </div>

        <div class = "sscMain" v-if = "false">
          <div class="sscTips">
            <p v-if="isBonus" @click="showBonus">{{tip}}<span>奖金详情</span></p>
            <p v-else>{{tip}}<i>{{award}}</i>元</p>
            <!-- <p>每位至少选1个号码，按位猜对号码即中196000元 </p> -->
          </div>

          <!-- 普通 -->
          <betbox v-if = "!ltCfg[mode].box"
                  v-for = "alias in ltCfg[mode].render"
                  :alias = "alias"
                  v-on:choose = "whenChoose">
                  </betbox>

        </div>


        <!-- 新彩种自己开一个playArea -->

        <!-- 投注区，各彩种不同 -->
        <!-- <playArea></playArea > -->

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

export default {
  components:{
      'lt-header': lt_header,
      'lt-result': lt_result,
      'lt-timebar': lt_timebar,
      'lt-footer': lt_footer,
      // 'playArea': playArea,
  },
  created(){
    console.log('jkjk')
  },
}
</script>

<style lang = "scss" scoped>
@import '../scss/newssc.scss';
</style>