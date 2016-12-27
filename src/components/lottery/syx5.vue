<template>
  <div class="sscMain">
    <div class="sscTips">
      <p>{{tip}}{{award}}元 </p>
      <!-- <p>每位至少选1个号码，按位猜对号码即中196000元 </p> -->
    </div>

    <!-- 普通 -->
    <betbox v-if = "isNaN(ltCfg[mode])"
            v-for = "alias in ltCfg[mode].render"
            :alias = "alias"
            v-on:choose = "whenChoose">
            </betbox>

    <!-- 单式 -->
    <notebet v-if = "!isNaN(ltCfg[mode])" :len = "ltCfg[mode]"></notebet>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import betbox from './betbox'
import notebet from './notebet'
import {factorial, mul, C, combNoRepeat, unique, normalSum2, normalSum3, accumulate,
  diff2, diff3, combSum2, combSum3} from '../../js/kit'

var countSingle = (order,tmp)=>betSum(order,tmp)[0]  //单行计数
// 单式只要传一个数字
var ltCfg = {
  /**选一**/
  A11:{render:['d'],alg:countSingle},
  A21:{render:['d1','d2','d3']},
  A31:{render:['d']},
  B11:{render:['d1','d2']},
  B21:{render:['qezx']},
  B23:{render:['dm','tm']},
  B31:{render:['x2z2']},
  B32:{render:['dm','tm']},
  C11:{render:['d1','d2','d3']},
  C21:{render:['qszx']},
  C23:{render:['dm','tm']},
  C31:{render:['x3z3']},
  C32:{render:['dm','tm']},
  D11:{render:['x4z4']},D13:{render:['dm','tm']},
  E11:{render:['x5z5']},E13:{render:['dm','tm']},
  F11:{render:['x6z5']},F13:{render:['dm','tm']},
  G11:{render:['x7z5']},G13:{render:['dm','tm']},
  H11:{render:['x8z5']},H13:{render:['dm','tm']},
  //趣味要
}

export default {
  props:['mode'],
  components:{
    'betbox': betbox,
    'notebet': notebet
  },
  created(){
    //初始化各个alias的tmp
    for(var item in ltCfg){
      if(ltCfg[item].render){
        ltCfg[item].render.forEach(alias=>{
          this.$store.commit({
            type:'lt_updateTmp',
            alias: alias,
            arr: []
          })
        })
      }
    }
  },
  data(){
    return {
      ltCfg: ltCfg
    }
  },
  computed:mapState({
    tip:()=>state.lt.mode.tip,      //提示
    award:()=>state.lt.award        //奖金
  }),
  methods:{
    whenChoose(){
      var order = this.ltCfg[this.mode].render  //按渲染数组的顺序
          ,tmp = state.lt.tmp                     //即时投注号码
          ,result = this.ltCfg[this.mode].alg(order, tmp)  //当前投注注数

      this.$store.commit('lt_setBetStr', getBetStr(order, tmp))
      this.$store.commit('lt_setBetCount', result)
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
function betSum(order, tmp){
  var arr = [];
  for(var i = 0;i < order.length;i++){
    arr.push(tmp[order[i]].length)
  }
  return arr;
}


</script>

<style lang = "scss" scoped>
/*@import '../../scss/newssc.scss';*/
@import '../../scss/scssConfig','../../scss/mixin';
.sscMain{
  min-height: 23em;
  padding-bottom: 4.8em;
  margin-bottom: 0;
}

.sscTips{
  margin:0 0.6em;
  padding-top:5.7em;
  color:#333;
  p{
    font-size: 0.65em;
  }
  &+.selectNumber{
    &:before{
      display:none;
    }
  }
}
</style>
