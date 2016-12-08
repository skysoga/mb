<template>
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

  <!-- 投注区 -->
  <div class="sscMain">
    <div class="sscTips">
      <p>{{tip}}{{award}}元 </p>
      <!-- <p>每位至少选1个号码，按位猜对号码即中196000元 </p> -->
    </div>

    <!--<ssc lmode = "H11"></ssc>   -->
    <!-- ssc中包裹几个box -->

    <!-- <betbox alias = "10000"></betbox> -->

    <!-- 复式 -->
    <div class="selectNumber">
      <div class="title fix">
        <em>万位</em>
        <div class="filterNumber">
          <a class="curr">全</a><a>大</a><a>小</a><a>奇</a><a>偶</a><a>清</a>
        </div>
      </div>

      <div class="numberContent">
        <a class="curr"><span>0</span></a>
        <a><span>1</span></a>
        <a><span>2</span></a>
        <a><span>3</span></a>
        <a><span>4</span></a>
        <a><span>5</span></a>
        <a><span>6</span></a>
        <a><span>7</span></a>
        <a><span>8</span></a>
        <a><span>9</span></a>
      </div>
    </div>

    <!-- 单式 -->
    <div class="textareaNumber">
      <textarea placeholder=" 每1个号码之间请用空格( )、逗号(,)、分号(;)隔开"></textarea>
    </div>

    <!-- 直选和值 -->
    <div class="selectNumber">
      <div class="title fix">
        <em>直选和值</em>
        <div class="filterNumber"><a>清</a></div>
      </div>
      <div class="numberContent"><a class="curr"><span>0</span></a><a><span>1</span></a><a><span>2</span></a><a><span>3</span></a><a><span>4</span></a><a><span>5</span></a><a><span>6</span></a><a><span>7</span></a><a><span>8</span></a><a><span>9</span></a><a><span>10</span></a><a><span>11</span></a><a><span>12</span></a><a><span>13</span></a><a><span>14</span></a><a><span>15</span></a><a><span>16</span></a><a><span>17</span></a><a><span>18</span></a><a><span>19</span></a><a><span>20</span></a><a><span>21</span></a><a><span>22</span></a><a><span>23</span></a><a><span>24</span></a><a><span>25</span></a><a><span>26</span></a><a><span>27</span></a>
      </div>
    </div>


    <div class="selectNumber selectNumberCenter">
      <div class="title fix">
        <em>万位</em>
        <div class="filterNumber"><a>清</a></div>
      </div>
      <div class="numberContent"><a class="curr"><span>大</span></a><a><span>小</span></a><a><span>单</span></a><a><span>双</span></a>
      </div>
    </div>
  </div>

  <!-- 倍和单位， 确认投注， 号码篮 -->
  <div class="sscFooter active">
    <div class="sscBetInfo fix">
      <div class="betContent">
        <em>+</em>
        <div>
          <h3>已选1注，2.00元</h3>
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

</div>
</template>

<script>
	import lt_header from '../components/lottery/lt-header'
  import lt_result from '../components/lottery/lt-result'
  import lt_timebar from '../components/lottery/lt-timebar'
  import {DAY_TIME, HOUR_TIME, MINUTE_TIME, SECOND_TIME} from '../JSconfig'

  //获取某个玩法的返点-时时彩
  function getRebate(mode){
    //前三中三后三一样，前二后二一样
    switch(mode[0]){
      case 'E':
      case 'D':
        mode = 'F' + mode.slice(1);
        break;
      case 'B':
        mode = 'C' + mode.slice(1);
        break;
      case 'I':
        if(mode === 'I92')mode = 'I91';
        if(mode === 'I94' || mode === 'I95')mode = 'I93';
        break;
    }
    var rebateSSC = JSON.parse(sessionStorage.getItem('RebateSSC')).Odds;
    for(var i = 0;i < rebateSSC.length;i++){
      if(rebateSSC[i].PlayCode === mode){
        return rebateSSC[i].Bonus;
      }
    }
  }

	export default {
    beforeRouteEnter(to, from, next){
      next()
    },
		components:{
			'lt-header': lt_header,
      'lt-result': lt_result,
      'lt-timebar': lt_timebar
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
      //提示
      tip(){
        return state.lt.mode.tip
      },
      //奖金
      award(){
        var mode = state.lt.mode.mode
        return getRebate(mode)
      }
    }

	}
</script>

<style lang = "scss" scoped>
	@import '../scss/newssc.scss';
</style>