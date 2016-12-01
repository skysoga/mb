<template>
<div class="DontSelect sscActive">
	<!-- 头部： 玩法选择， 同类彩种选择-->
	<!-- <header class="sscHeader fix">
    <a href="/" class="iconfont"></a>
    <div class="playSort">
      <p>玩
        <br>法</p><span><em>五星直选</em><i class="iconfont">&#xe61e;</i>
          <div class="playSortMore">
            <div class="playSortMoreCon">
              <ul class="betFilter fix"><li class="curr">五星</li><li>四星</li><li>前三</li><li>中三</li><li>后三</li><li>前二</li><li>后二</li><li>一星</li><li>大小单双</li></ul>
              <ul class="betFilterAnd">
                <li><span>直选</span><div class="fix"><a class="curr">复式</a><a>单式</a>
                  </div>
                </li>
                <li><span>组选</span><div class="fix groupSelect"><a>组选120</a><a>组选60</a><a>组选30</a><a>组选20</a><a>组选10</a><a>组选5</a>
                  </div>
                </li>
                <li><span>不定位</span><div class="fix"><a>一码不定位</a><a>二码不定位</a><a>三码不定位</a>
                  </div>
                </li>
                <li><span>趣味</span><div class="fix"><a>一帆风顺</a><a>好事成双</a><a>三星报喜</a><a>四季发财</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </span>
    </div>

    <div class="lotterySort">
	    <em>江苏</em><i class="iconfont">&#xe61e;</i>
      <div class="lotteryList fix">
	      <a>重庆时时彩</a>
	      <a>新疆时时彩</a>
	      <a>天津时时彩</a><a>大发时时彩</a>
      </div>
    </div>
  </header> -->
	<lt-header></lt-header>


  <!-- 开奖号码 以及 投注截止时间  -->
  <div class="isLotteryCon fix">
  	<div class="isLottery"><span>1021049期开奖号码<i class="iconfont">&#xe601;</i></span>
			<div class="openNumber">
				<em>2</em><em>3</em><em>5</em><em>6</em><em>7</em>
			</div>
  	</div>
  	<div class="lotteryClose"><span>1021049期投注截止</span>
      <div class="waitNumber">
        <em>00:49:36</em>
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
      <div class="betCart"><a><i class="iconfont">&#xe75a;<em>88</em></i>号码篮</a></div>
    </div>
    <div class="multipleCon">
      <div class="multipleConLine fix">
        <div class="multiple"><em class="noMore">-</em><input type="tel" value="1"><em>+</em>
        </div><span>倍</span>
        <div class="moneyUnit">
          <a class="curr">元</a><a>角</a><a>分</a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
	import lt_header from '../components/lottery/lt-header'
	export default {
		components:{
			'lt-header': lt_header
		},
		data () {
			return {
				
			}
		}

	}
</script>

<style lang = "scss" scoped>
	@import '../scss/newssc.scss';
</style>