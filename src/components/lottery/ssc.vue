<template>
  <div class="sscMain">
    <div class="sscTips">
      <p>{{tip}}{{award}}元 </p>
      <!-- <p>每位至少选1个号码，按位猜对号码即中196000元 </p> -->
    </div>
    <betbox v-for = "alias in ltCfg[mode].render"
            :alias = "alias"
            v-on:choose = "whenChoose">
            </betbox>
  </div>
</template>

<script>
import betbox from './betbox'
import {factorial, mul, C, combNoRepeat} from '../../js/kit'
var ltCfg = {
  H11:{
    render:['10000', '1000', '100', '10', '1'],
    alg:(order, tmp)=>mul(5, getBetSum(order, tmp))
  },
  H21:{
    render:['whole'],
    alg:(order, tmp)=>C(tmp['whole'].length, 5)
  },
}

export default {
  props:['mode'],
  components:{
    'betbox': betbox
  },
  created(){

  },
  data(){
    return {
      ltCfg: ltCfg
    }
  },
  computed:{
    tip:()=>state.lt.mode.tip,      //提示
    award:()=>state.lt.award        //奖金
  },
  methods:{
    whenChoose(){
      var order = this.ltCfg[this.mode].render  //按渲染数组的顺序
          ,tmp = state.lt.tmp                     //即时投注号码
          ,result = this.ltCfg[this.mode].alg(order, tmp)  //当前投注注数

      store.commit('lt_setBetStr', getBetStr(order, tmp))
      store.commit('lt_setBetCount', result)
      console.log(getBetSum(order, tmp))    //获得每个框的号码数
      console.log(this.ltCfg[this.mode].alg(order, tmp))
    }
  }
}

function getBetStr(order, tmp){
  var betStrArr = []
  for(var i = 0;i < order.length;i++){
    betStrArr.push(tmp[order[i]].join(' '))
  }

  betStrArr = betStrArr.map(item=>{
    if(item === ''){
      return '-'
    }else{
      return item
    }
  })
  return betStrArr.join(',')
}

//获得每个框的号码的数目
function getBetSum(order, tmp){
  var arr = [];
  for(var i = 0;i < order.length;i++){
    arr.push(tmp[order[i]].length)
  }
  return arr;
}


</script>

<style lang = "scss" scoped>
@import '../../scss/newssc.scss';
</style>