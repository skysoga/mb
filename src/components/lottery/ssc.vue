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
import betbox from './betbox'
import notebet from './notebet'
import {factorial, mul, C, combNoRepeat} from '../../js/kit'

var countSingle = (order,tmp)=>betSum(order,tmp)[0]  //单行计数
// 单式只要传一个数字
var ltCfg = {
  /**五星**/
  H11:{render:['10000', '1000', '100', '10', '1'], alg:(order, tmp)=>mul(5, betSum(order, tmp))},
  H12:5,
  H21:{render:['whole'], alg:(order,tmp)=>C(tmp['whole'].length, 5)},
  H22:{render:['xx', 'x'],alg:(order,tmp)=>combNoRepeat(tmp['xx'],tmp['x'],3)},
  H23:{render:['xx', 'x'],alg:(order,tmp)=>combNoRepeat(tmp['x'],tmp['xx'],2)},
  H24:{render:['xxx', 'x'],alg:(order,tmp)=>combNoRepeat(tmp['xxx'],tmp['x'],2)},
  H25:{render:['xxx', 'xx'],alg:(order,tmp)=>combNoRepeat(tmp['xxx'],tmp['xx'],1)},
  H26:{render:['xxxx', 'x'],alg:(order,tmp)=>combNoRepeat(tmp['xxxx'],tmp['x'],1)},
  H31:{render:['whole'],alg:countSingle},
  H32:{render:['whole'],alg:(order,tmp)=>C(betSum(order,tmp)[0], 2)},
  H33:{render:['whole'],},
  H41:{render:['whole'],},
  H42:{render:['whole'],},
  H43:{render:['whole'],},
  H44:{render:['whole'],},
  /**四星**/
  G11:{render:['10000','100','10','1'],},
  G12:4,
  G21:{render:['whole'],},
  G22:{render:['xx','x'],},
  G23:{render:['xx'],},
  G24:{render:['xxx','x'],},
  G31:{render:['whole'],},
  G32:{render:['whole'],},
  /**前三**/
  F11:{render:['10000','1000','100'],},
  F12:3,
  F13:{render:['psum27'],},
  F14:{render:['whole'],},
  F21:{render:['csum26'],},
  F22:{render:['whole'],},
  F23:{render:['whole'],},
  F24:3,
  F25:{render:['baodan'],},
  F26:3,
  F27:3,
  F31:{render:['whole'],},
  F32:{render:['whole'],},
  /**中三**/
  E11:{render:['10000','1000','100'],},
  E12:3,
  E13:{render:['psum27'],},
  E14:{render:['whole'],},
  E21:{render:['csum26'],},
  E22:{render:['whole'],},
  E23:{render:['whole'],},
  E24:3,
  E25:{render:['baodan'],},
  E26:3,
  E27:3,
  E31:{render:['whole'],},
  E32:{render:['whole'],},
  /**后三**/
  D11:{render:['10000','1000','100'],},
  D12:3,
  D13:{render:['psum27'],},
  D14:{render:['whole'],},
  D21:{render:['csum26'],},
  D22:{render:['whole'],},
  D23:{render:['whole'],},
  D24:3,
  D25:{render:['baodan'],},
  D26:3,
  D27:3,
  D31:{render:['whole'],},
  D32:{render:['whole'],},
  /**前二**/
  C11:{render:['10000','1000'],},
  C12:2,
  C13:{render:['psum18'],},
  C14:{render:['whole'],},
  C21:{render:['whole'],},
  C22:2,
  C23:{render:['csum17'],},
  C24:{render:['baodan'],},
  /**后二**/
  B11:{render:['10000','1000'],},
  B12:2,
  B13:{render:['psum18'],},
  B14:{render:['whole'],},
  B21:{render:['whole'],},
  B22:2,
  B23:{render:['csum17'],},
  B24:{render:['baodan'],},
  /**一星**/
  A11:{render:['10000', '1000', '100', '10', '1'],alg:(order, tmp)=>betSum(order, tmp).reduce(function(a,b){return a + b})},
  /**大小单双**/
  I91:{render:['i10000','i1000'],},
  I92:{render:['i10','i1'],},
  I93:{render:['i10000','i1000','i100'],},
  I94:{render:['i1000','i100','i10'],},
  I95:{render:['i100','i10','i1'],},
}

export default {
  props:['mode'],
  components:{
    'betbox': betbox,
    'notebet': notebet
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
      console.log(betSum(order, tmp))    //获得每个框的号码数
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
function betSum(order, tmp){
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