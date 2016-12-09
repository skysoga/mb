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
<div class="cart" v-show = "false">
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
</div>
</div>
</template>
<style lang = "scss" scoped>
  @import '../scss/newssc.scss';
  .cartTotal{
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    .change{
      background: #f8f8f8;
      font-size: .7em;
      padding: .8em 0;
      .stop{
        position: absolute;
        top:-4em;
        left: -1.5em;
        width: 10em;
        background: white;
        border:1px solid #ddd;
        border-radius: .2em;
        padding: 0 .2em;
        text-align: center;
        box-shadow: 0 .2em .3em #ccc;
        height: 2.3em;
        line-height: 2.3em;
        font-size: .9em;
        &:after{
          content:"";
          position: absolute;
          width: 0;
          height: 0;
          border-left: .5em solid transparent;
          border-right: .5em solid transparent;
          border-top: .5em solid white;
          margin-left:-4.8em;
          margin-top:2.1em;
        }
        label{
          margin:0;
          margin-left: .2em;
        }
      }
      label{
        margin:0 .8em;
        color:#666;
        position: relative;
      }
      input[type=tel]{
        border:1px solid #d2d2d2;
        border-radius: 0;
        -webkit-appearance: none;
        appearance: none;
        width: 4em;
        height: 2em;
        margin:0 .4em;
      }
    }
    .result{
      background: #ff8a00;
      height: 3em;
      .left{
        float: left;
        height: 3em;
        background: #212121;
        padding: .4em;
        line-height: 1em;
        width: 66.5%;
        span{
          font-size: .75em;
          color:white;
          display: block;
        }
        em{
          font-size: .65em;
          color:#a9a9a9;
        }
      }
      .right{
        float: left;
        width: 33.5%;
        position: relative;
        text-align: center;
        color:white;
        height: 3em;
        i{
          font-size: .8em;
          line-height: 3.75em;
          display: block;
          height: 3.75em;
        }
        &:before{
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border-left:0.6em solid #212121;
          border-top: 1.5em solid hsla(0, 0%, 0%, 0);
          border-bottom: 1.5em solid hsla(0, 0%, 0%, 0);
          left: 0;
          top: 0;
        }
      }
    }
  }
  .cartContent{
    box-shadow: 0 0 .5em #ccc;
    margin:0 .6em;
  }
  .clear{
    background-color: white;
    padding: 0 .6em;
    text-align: center;
    color:#666;
    font-size: .8em;
    padding: .6em 0;
    background: url('http://virjay.com/cartButtom.png') left bottom white;
    background-repeat: repeat-x;
    background-size: 10px;
    &:before{
      content:"\e620";
      font-family: 'iconfont';
      color:#c4c5c5;
      font-size: 1.4em;
    }
  }
  .numberbox{
    background: white;
    padding: 0 .6em;
    li{
      border-bottom: 1px dashed #ccc;
      padding: .6em 0;
      position: relative;
      em{
        display: block;
        color:#ff8a00;
        font-size: .75em;
        line-height: 1.2em;
      }
      span{
        font-size: .75em;
        color:#666;
        line-height: 1em;
      }
      a{
        display: block;
        position: absolute;
        right: 0;
        top:1.1em;
        background: #dc3b40;
        width: 1.2em;
        height: 1.2em;
        border-radius: 50%;
        &:before{
          content:"";
          display: block;
          width: .75em;
          height: .1em;
          background: white;
          margin-top: .55em;
          margin-left: .225em;
          border-radius: .1em;
        }
      }
    }
  }
  .cart{
    background: white;
    position: fixed;
    top:0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1000;
    header{
      height: 2.55556em;
    }
  }
  .cartMain{
    padding-top: 2.3em;
    height: 100%;
    background: #efeef4;
  }
  .someBtn{
    text-align: center;
    padding: .6em;
    box-shadow: 0 0 .5em #b9b9b9;
    position: relative;
    z-index: 99;
    background: white;
    a{
      display: inline-block;
      color:#333;
      border:1px solid #d2d2d2;
      border-radius: .3em;
      font-size: .7em;
      padding: 0 .8em;
      height: 2.4em;
      line-height: 2.4em;
      margin-left: .8em;
      &:first-child{
        margin-left:0;
      }
      &:before{
        content:"\e646";
        font-family: "iconfont";
        color:#a3a3a3;
        margin-right: .2em;
        font-size: .8em;
        line-height: 1em;
      }
      &:active{
        background: #ff8a00;
        color:white;
        border:1px solid #ff8a00;
        &:before{
          color:white;
        }
      }
    }
  }
</style>
<script>
	import lt_header from '../components/lottery/lt-header'
  import lt_result from '../components/lottery/lt-result'
  import lt_timebar from '../components/lottery/lt-timebar'
  import lt_footer from '../components/lottery/lt-footer'
  import ssc from '../components/lottery/ssc'
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
      'ssc': ssc
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