<template>
  <div>
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
        <ssc :mode = "$store.state.lt.mode.mode"></ssc>

        <!-- 倍和单位， 确认投注， 号码篮 -->
        <lt-footer></lt-footer>
      </div>
    </div>
    <basket @click.native.stop v-show = "ifShowBasket"></basket>
  </div>
</template>
<style lang = "scss" scoped>
@import '../scss/newssc.scss';
.isLotteryCon{
  > div{
    float: left;
    width: 50%;
  }
}
</style>
<script>
	import lt_header from '../components/lottery/lt-header'
  import lt_result from '../components/lottery/lt-result'
  import lt_timebar from '../components/lottery/lt-timebar'
  import lt_footer from '../components/lottery/lt-footer'
  import ssc from '../components/lottery/ssc'
  import basket from '../components/lottery/basket'
  import {DAY_TIME, HOUR_TIME, MINUTE_TIME, SECOND_TIME} from '../JSconfig'

	export default {
    beforeRouteEnter(to, from, next){
      next()
    },
		components:{
			'lt-header': lt_header,
      'lt-result': lt_result,
      'lt-timebar': lt_timebar,
      'lt-footer': lt_footer,
      'ssc': ssc,
      'basket': basket,
		},
    created(){
      //从路径上获取彩种
      [,this.ltype, this.lcode] = this.$route.fullPath.slice(1).split('/')
      this.$store.commit('lt_initConfig')
    },
		data () {
			return {
				ltype:'', //彩种类型
        lcode:'',  //彩种code
			}
		},
    computed:{
      ifShowBasket(){
        return this.$store.state.lt.box === 'basket'
      },
    },
    methods:{
    }

	}
</script>