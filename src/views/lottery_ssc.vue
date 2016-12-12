<template>
<div>
<div class="DontSelect sscActive">
	<!-- 头部： 玩法选择， 同类彩种选择-->
	<lt-header></lt-header>

  <!-- 开奖号码 以及 投注截止时间  -->
  <div class="isLotteryCon fix">
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

<basket @click.native.stop></basket>

<!-- <div class="cart" v-show = "true">
  <header class="top sscHeader fix" ><a href="/index" class="iconfont back"></a><div class="playSort">号码蓝</div></header>
  <div class="cartMain">
    <div class="someBtn"><a>机选1注</a><a>机选5注</a><a>继续选号</a></div>
    <div class="cartContent">
      <ul class="numberbox">
        <li><em>8,8,8,8,8</em><span>五星直选 1注×2.0元 = 2.00元</span><a></a></li>
        <li><em>8,8,8,8,8</em><span>五星直选 1注×2.0元 = 2.00元</span><a></a></li>
      </ul>
      <div class="clear">清空</div>
  </div>
  </div>
  <div class="cartTotal">
    <div class="change">
      <label>投<input type="tel">倍</label>
      <label>追<input type="tel">期<div class="stop">
        <input type="checkbox" id="stop"><label for="stop">中奖后停止追号</label>
      </div></label>
    </div>
    <div class="result fix">
      <div class="left">
        <span>2注×1=4.00元</span>
        <em>可用余额 88.80元</em>
      </div>
      <div class="right">
        <i>立即投注</i>
      </div>
    </div>
  </div>
</div> -->
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
    },
    methods:{
    }

	}
</script>