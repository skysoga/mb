<template>
  <!-- 倍和单位， 确认投注， 号码篮 -->
  <div class="sscFooter " :class = "betCount ? 'active' : ''">

    <div class="sscBetInfo fix">
      <div class="betContent" @click = "addBet">
        <em class="iconfont">&#xe64e;</em>
        <div>
          <h3>共{{betCount}}注，{{betMoney}}元</h3>
          <p>{{betCount ? betStr: ''}}</p>
        </div>
      </div>
      <div class="betCart" >
        <a @click.stop = "showBasket">
          <i class="iconfont">&#xe64d;<em v-show = "betAmount">{{betAmount}}</em>
            <div :class="'moveNum '+moveClass"><span>1</span></div>
          </i>
          号码篮</a>
      </div>
    </div>

    <div class="multipleCon">
      <div class="multipleConLine fix">
        <div class="multiple">
          <!-- 倍率 -->
          <em :class="canReduce ? '':'noMore'" @click = "reduce">-</em>
          <input type="tel"  v-model.lazy = "power">
          <em :class="canAdd ? '':'noMore'"  @click = "add">+</em>
        </div>
        <span>倍</span>
        <div class="moneyUnit">
          <a v-for =  "obj in unitArr"
             @click = "changeUnit(obj.unit)"
             :class = "unit === obj.unit ? 'curr' : '' ">
            {{obj.word}}
          </a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import {bus, Max_Rate} from '../../js/kit'
export default {
  data(){
    return {
      unitArr:[
        {unit: 1, word: '元'},
        {unit: 0.1, word: '角'},
        {unit: 0.01, word: '分'},
      ],
      moveClass:''
    }
  },
  computed:{
    betCount(){
      return this.$store.state.lt.bet.betting_count
    },
    betMoney(){return this.$store.state.lt.bet.betting_money.toFixed(2)},
    betStr(){return this.$store.state.lt.bet.betting_number},
    betAmount(){return this.$store.state.lt.basket.length},
    canReduce(){
      return this.power > 1
    },
    canAdd(){
      return this.power < Max_Rate
    },
    unit(){return this.$store.state.lt.bet.betting_model},
    power:{
      get(){
        return this.$store.state.lt.bet.graduation_count
      },
      set(power){
        this.$store.commit('lt_setPower', +power)
        if(power.toString().search(/[^\d]+/) > -1 || power <= 0){
          this.$store.commit('lt_setPower', 1)
        }
        if(power > Max_Rate){
          this.$store.commit('lt_setPower', Max_Rate)
          layer.msgWarn(`最多${Max_Rate}倍`)
        }
      }
    }
  },
  methods:{
    reduce(){
      //倍数必须大于1
      this.power > 1 && this.$store.commit('lt_setPower', this.power-1)
    },
    add(){
      //倍数小于最大倍数限制
      this.power < Max_Rate && this.$store.commit('lt_setPower', this.power+1)
    },
    changeUnit(unit){
      this.unit = unit
      this.$store.commit('lt_setUnit', unit)
    },
    addBet(){
      //如果没有选择一注， 就没有反应
      if(this.betCount <= 0){
        return
      }
      bus.$emit('clearNoteStr')   //清空文本框文字
      this.$store.commit('lt_addBet')

      this.moveClass = 'move'
      setTimeout(()=>{
        this.moveClass = ''
      },1000)
    },
    showBasket(){
      store.commit('lt_changeBox', 'basket')
    }
  }
}
</script>

<style lang = "scss" scoped>
@import '../../scss/scssConfig','../../scss/mixin';

$height:2.4em;
.move{
  animation: xAxismove .5s 1 ease-in;
  span{
    animation: yAxismove .5s 1 cubic-bezier(1, 1, 1, 1);
  }
}
.moveNum{
  font-size: .5em;
  position: absolute;
  left: 0.2em;
  top: 0.6em;
  z-index: 6;
  will-change: transform;
  width: 1.6em;
  height: 1.6em;
  transform: translateX(-10rem);
  span{
    background: #dc3b40;
    border-radius: 1.6em;
    width: 1.6em;
    height: 1.6em;
    line-height: 1.7em;
    text-align: center;
    color: white;
  }
}

.moveNum {
}

.moveNum span {
  display: block;
  will-change: transform;
}
@keyframes yAxismove {
  50% {
    animation-timing-function: cubic-bezier(0.53, -0.51, 0.99, 0.03);
    transform: translateY(-4em);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes xAxismove {
  100% {
    animation-timing-function: ease-in;
    transform: translateX(0);
  }
}

.sscBetInfo{
  position: fixed;
  height: $height;
  left: 0;
  bottom:0;
  background: #575858;
  width: 100%;
  z-index: 5;
}
.betContent{
  width: 66.5%;
  float: left;
  height: 100%;
  background: #252625;
  position: relative;
  z-index: 7;
  transition: .1s;
}
.betCart{
  float: left;
  width: 33.5%;
  height: 100%;
  color:white;
  position: relative;
  &:before{
    content: "";
    position: absolute;
    transition: .1s;
    width: 0;
    height: 0;
    border-top: $height/1.96 solid transparent;
    border-left: 0.5em solid #252625;
    border-bottom: $height/1.96 solid transparent;
    left: 0;
    top: 0;
  }
  a{
    display: block;
    width: 100%;
    height: 100%;
    line-height: 3em;
    font-size:0.8em;
    text-align: center;
    padding-left: 0.6em;
    i{
      font-size: 1.4em;
      transform:translateY(0.05em);
      display: inline-block;
      position: relative;
      width: 1em;
      em{
        background: #dc3b40;
        position: absolute;
        border-radius: 1.6em;
        left: 0.2em;
        top:0.6em;
        font-size: 0.5em;
        width: 1.6em;
        height: 1.6em;
        line-height: 1.7em;
        text-align: center;
        z-index: 7;
      }
    }
  }
}
.betContent{
  color:white;
  div{
    height: $height;
    padding:.2em 0.6em;
  }
  h3{
    font-size: 0.8em;
  }
  p{
    font-size: 0.65em;
    color:#a9a9a9;
    line-height: 1em;
    padding-top: 0.4em;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  em{
    position: absolute;
    height: 100%;
    left:.4em;
    top:.8em;
    font-size:.9em;
    width:1.4em;
    text-align:center;
    display: none;
  }
}
.multipleCon{
  position: fixed;
  left: 0;
  bottom:$height;
  background: #f8f8f8;
  width: 100%;
  height: $height;
  display: none;
  z-index: 2;
  span{
    font-size: 0.8em;
    color:#666;
    margin:0 .4em;
  }
}
.multipleConLine{
  position: relative;
  height: $height;
  padding: 0.4em;
  &:before,&:after{
    content:"";
    position: absolute;
    width: 16rem;
    height: 1px;
    left: 0;

  }
  &:before{
    top:0;
    @include bgImg-linear-gradient('90deg, transparent,transparent 50%, #d0d0d0 50%');
  }
  &:after{
    bottom: 0;
    @include bgImg-linear-gradient('90deg, #d0d0d0,#d0d0d0 50%, transparent 50%');
  }
}
.multiple{
  border:1px solid #d2d2d2;
  height: 1.6em;
  display: inline-block;
  vertical-align: middle;
  border-radius: 0.15em;
  background: white;
  input{
    border:none;
    width: 3em;
    height: 100%;
    text-align: center;
    font-size: 0.75em;
    color:#666;
    display: block;
    float: left;
    vertical-align: top;
    line-height: 2.13333em;
  }
  em{
    display: block;
    vertical-align: top;
    width: 1.6em;
    height: 100%;
    color:#a3a3a3;
    text-align: center;
    line-height: 1.4em;
    float: left;
    &:first-child{
      border-right: 1px solid #d2d2d2;
    }
    &:last-child{
      border-left: 1px solid #d2d2d2;
    }
    &:active{
      background: #ff8a00;
      color: white;
    }
  }
  .noMore,.noMore:active{
    color:#d1d1d1;
  }
}
.moneyUnit{
  display: inline-block;
  vertical-align: top;
  text-align: right;
  float: right;
  border:1px solid #d2d2d2;
  border-radius: 0.15em;
  height: 1.6em;
  background: white;
  overflow: hidden;
  a{
    display: inline-block;
    vertical-align: top;
    font-size: 0.7em;
    height: 100%;
    width: 2.25em;
    line-height: 2.15em;
    text-align: center;
    &+a{
      border-left: 1px solid #d2d2d2;
    }
  }
  .curr{
    background: #dc3b40;
    color:white;
  }
}
.sscFooter.active{
  .sscBetInfo{
    .betContent{
      background: #dc3b40;
      p{
        color:#ffebdd;
      }
      div{
        padding-left: 2em;
      }
      em{
        display: block;
      }
    }
  }
  .betCart{
    &:before{
      border-left: 0.6em solid #dc3b40;
    }
  }
  .multipleCon{
    display: block;
  }
}
</style>