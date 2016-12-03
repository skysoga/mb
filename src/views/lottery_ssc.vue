<template>
<div class="DontSelect sscActive">
	<!-- 头部： 玩法选择， 同类彩种选择-->
	<lt-header ltype = "ssc" :lcode = "lcode"></lt-header>

  <!-- 开奖号码 以及 投注截止时间  -->
  <div class="isLotteryCon fix">
  	<div class="isLottery"><span>1021049期开奖号码<i class="iconfont">&#xe601;</i></span>
			<div class="openNumber">
				<em>2</em><em>3</em><em>5</em><em>6</em><em>7</em>
			</div>
  	</div>
  	<div class="lotteryClose"><span>1021049期投注截止</span>
      <div class="waitNumber">
        <em>{{day}}</em>
      </div>
    </div>
  </div>
  <!-- 投注区 -->
  <div class="sscMain">
    <div class="sscTips">
      <p>每位至少选1个号码，按位猜对号码即中196000元 </p>
    </div>
    <div class="selectNumber">
      <div class="title fix">
        <em>万位</em>
        <div class="filterNumber"><a class="curr">全</a><a>大</a><a>小</a><a>奇</a><a>偶</a><a>清</a>
        </div>
      </div>
      <div class="numberContent"><a class="curr"><span>0</span></a><a><span>1</span></a><a><span>2</span></a><a><span>3</span></a><a><span>4</span></a><a><span>5</span></a><a><span>6</span></a><a><span>7</span></a><a><span>8</span></a><a><span>9</span></a>
      </div>
    </div>
    <div class="textareaNumber">
      <textarea placeholder=" 每1个号码之间请用空格( )、逗号(,)、分号(;)隔开"></textarea>
    </div>
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
  import lt_ssc from '../json/lt_ssc.json'
  import {DAY_TIME, HOUR_TIME, MINUTE_TIME, SECOND_TIME} from '../JSconfig'
	export default {
    beforeRouteEnter(to, from, next){
      //获取返点--不阻塞
      //获取开奖计划--不阻塞
      next()
    },
		components:{
			'lt-header': lt_header
		},
    created(){
      //从路径上获取彩种
      [,this.ltype, this.lcode] = this.$route.fullPath.slice(1).split('/')
      this.$store.commit('lt_initConfig', lt_ssc)
    },
		data () {
			return {
				ltype:'', //彩种类型
        lcode:'',  //彩种code
			}
		},
    computed:{

    },

	}
</script>

<style lang = "scss" scoped>
	@import '../scss/newssc.scss';
</style>