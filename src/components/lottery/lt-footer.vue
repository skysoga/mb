<template>
  <!-- 倍和单位， 确认投注， 号码篮 -->
  <div class="sscFooter " :class = "betCount ? 'active' : ''">

    <div class="sscBetInfo fix">
      <div class="betContent" @click = "addBet">
        <em>+</em>
        <div>
          <h3>已选{{betCount}}注，{{betMoney}}元</h3>
          <p>{{betCount ? betStr: ''}}</p>
        </div>
      </div>

      <div class="betCart" >
        <a @click.stop = "showBasket">
          <i class="iconfont">&#xe75a;<em>{{betAmount}}</em></i>
          号码篮</a>
      </div>
    </div>

    <div class="multipleCon">
      <div class="multipleConLine fix">
        <div class="multiple">
          <!-- 倍率 -->
          <em class="noMore" @click = "reduce">-</em>
          <input type="tel"  v-model.lazy = "power">
          <em @click = "add">+</em>
        </div>
        <span>倍</span>
        <div class="moneyUnit">
          <a v-for =  "obj in unitArr"
             @click = "changeUnit(obj.unit)"
             :class = "unit === obj.unit ? 'curr' : '' ">
            {{obj.word}}
          </a>
         <!--  <a class="curr">元</a>
          <a>角</a>
          <a>分</a> -->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {Max_Rate} from '../../JSconfig'
export default {
  created(){
  },
  data(){
    return {
      unitArr:[
        {unit: 1, word: '元'},
        {unit: 0.1, word: '角'},
        {unit: 0.01, word: '分'},
      ],
      power: 1,
      unit: 1
    }
  },
  computed:{
    betCount:()=>state.lt.bet.betting_count,
    betMoney:()=>state.lt.bet.betting_money.toFixed(2),
    betStr:()=>state.lt.bet.betting_number,
    betAmount:()=>state.lt.basket.length
  },
  watch:{
    power(val){
      store.commit('lt_setPower', +val)
    }
  },
  methods:{
    reduce(){
      this.power > 1 && this.power--      //倍数必须大于1
    },
    add(){
      this.power < Max_Rate && this.power ++   //倍数小于最大倍数限制
    },
    changeUnit(unit){
      this.unit = unit
      store.commit('lt_setUnit', unit)
    },
    addBet(){
      //如果没有选择一注， 就没有反应
      if(this.betCount <= 0){
        return
      }
      store.commit('lt_addBet')
    },
    showBasket(){
     //如果号码篮没有注单， 就没有反应
      if(this.betAmount <= 0){
        return
      }
      store.commit('lt_changeBox', 'basket')
    }
  }
}
</script>

<style lang = "scss" scoped>
  @import '../../scss/newssc.scss';
</style>