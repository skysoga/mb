<template>
  <div class="lottery_sscCon">
    <div :class="{'lottery_ssc':true,'KL8':this.$parent.ltype=='KL8','PK10':this.$parent.ltype=='PK10'}" v-show = "!ifShowBasket">
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
        <div class="minIsLotteryCon">
          <div class="title">810286期投注截至：<em>05:46</em></div>
          <ul class="record open">
            <li class="fix">
              <div class="left">第810285期<br>11:30:31</div>
              <div class="right">
                <div class="line1">
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                </div>
                <div class="line2">
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                </div>
              </div>
            </li>
            <li class="fix">
              <div class="left">第810285期<br>11:30:31</div>
              <div class="right">
                <div class="line1">
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                </div>
                <div class="line2">
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                </div>
              </div>
            </li>
            <li class="fix">
              <div class="left">第810285期<br>11:30:31</div>
              <div class="right">
                <div class="line1">
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                </div>
                <div class="line2">
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                  <a>06</a>
                </div>
              </div>
            </li>
          </ul>
          <div class="lernMore close"><em class="iconfont"><i>&#xe64c;</i></em></div>
        </div>

        <!-- 投注区，各彩种不同 -->
        <!-- <ssc></ssc> -->
        <playArea></playArea>

        <!-- 倍和单位， 确认投注， 号码篮 -->
        <lt-footer></lt-footer>
      </div>
    </div>

    <basket @click.native.stop v-show = "ifShowBasket"></basket>

  </div>
</template>
<style lang = "scss" scoped>
@import '../scss/newssc.scss';
.minIsLotteryCon{
  position: fixed;
  top: 2.3em;
  left: 0;
  width: 100%;
  z-index: 5;
  .record.open{
    height: 12.3em;
    border-top:1px solid #bdb58b;
  }
}
.title{
  text-align: center;
  font-size: .65em;
  line-height: 2em;
  height: 1.9em;
  background: #f5f1e5;
  em{
    color:#dc3b40;
  }
}
.record{
  background: #ece6d2;
  font-size: .65em;
  line-height: 1.4em;
  color: #333;
  transition: 1s;
  height: 0;
  overflow: hidden;
  background: #f5f1e5;
  li{
    .left,.right{
      float: left;
      padding-top: 1em;
    }
    &:last-child{
      .left,.right{
        padding-bottom: 1em;
      }
    }
    .left{
      width: 7.8em;
      padding-left: 1em;
    }
    .right{
      position: relative;
      width: 65%;
      border-left:1px solid #bdb58b;
      padding-left: 1.52em;
      &:before{
        content:"";
        display: block;
        position: absolute;
        left: -.18em;
        top:2em;
        width: .3em;
        height: .3em;
        border-radius: .4em;
        box-shadow: 0 0 0 .2em #bdb58b;
        background: #f5f1e5;
      }
    }
  }
}
.lernMore{
  border-top: 1px solid #bdb58b;
  em{
    background: #f5f1e5;
    display: block;
    margin:0 auto;
    width: 4.8em;
    color: #d3cdaf;
    margin-top: -1px;
    text-align: center;
    border:1px solid #bdb58b;
    border-top: 1px solid #f5f1e5;
    border-radius: .6em;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    font-size: .6em;
    height: .9em;
    line-height: .75em;
    i{
      display: block;
      /*transition: .6s;*/
    }
  }
  &.close{
    i{
      transform:rotate(180deg);
    }
  }
}
</style>
<script>
  import lt_header from '../components/lottery/lt_header'
  import lt_result from '../components/lottery/lt_result'
  import lt_timebar from '../components/lottery/lt_timebar'
  import lt_footer from '../components/lottery/lt_footer'
  import playArea from '../components/lottery/play_area'
  import basket from '../components/lottery/basket'

  export default {
    components:{
      'lt-header': lt_header,
      'lt-result': lt_result,
      'lt-timebar': lt_timebar,
      'lt-footer': lt_footer,
      'playArea': playArea,
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
