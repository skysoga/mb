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
import {factorial, mul, C, combNoRepeat, unique, normalSum2, normalSum3, accumulate,
  diff2, diff3, combSum2, combSum3} from '../../js/kit'

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
  H33:{render:['whole'],alg:(order,tmp)=>C(betSum(order,tmp)[0],3)},
  H41:{render:['whole'],alg:countSingle},
  H42:{render:['whole'],alg:countSingle},
  H43:{render:['whole'],alg:countSingle},
  H44:{render:['whole'],alg:countSingle},
  /**四星**/
  G11:{render:['10000','100','10','1'],alg:(order, tmp)=>mul(4, betSum(order, tmp))},
  G12:4,
  G21:{render:['whole'],alg:(order,tmp)=>C(tmp['whole'].length, 4)},
  G22:{render:['xx','x'],alg:(order,tmp)=>combNoRepeat(tmp['xx'],tmp['x'],2)},
  G23:{render:['xx'],alg:(order,tmp)=>C(tmp['xx'].length, 2)},
  G24:{render:['xxx','x'],alg:(order,tmp)=>combNoRepeat(tmp['xxx'],tmp['x'],1)},
  G31:{render:['whole'],alg:countSingle},
  G32:{render:['whole'],alg:(order,tmp)=>C(tmp['whole'].length, 2)},
  /**前三**/
  F11:{render:['10000','1000','100'],alg:(order, tmp)=>mul(3, betSum(order, tmp))},
  F12:3,
  F13:{render:['psum27'],alg:(order,tmp)=>accumulate(tmp['psum27'], normalSum3)},
  F14:{render:['whole'],alg:(order,tmp)=>accumulate(tmp['whole'],diff3)},
  F21:{render:['csum26'],alg:(order,tmp)=>accumulate(tmp['csum26'], combSum3)},
  F22:{render:['whole'],alg:(order,tmp)=>2 * C(tmp['whole'].length, 2)},
  F23:{render:['whole'],alg:(order,tmp)=>C(tmp['whole'].length,3)},
  F24:3,
  F25:{render:['baodan'],alg:(order,tmp)=>54},
  F26:3,
  F27:3,
  F31:{render:['whole'],alg:countSingle},
  F32:{render:['whole'],alg:(order,tmp)=>C(tmp['whole'].length,2)},
  /**中三**/
  E11:{render:['10000','1000','100'],alg:(order, tmp)=>mul(3, betSum(order, tmp))},
  E12:3,
  E13:{render:['psum27'],alg:(order,tmp)=>accumulate(tmp['psum27'], normalSum3)},
  E14:{render:['whole'],alg:(order,tmp)=>accumulate(tmp['whole'],diff3)},
  E21:{render:['csum26'],alg:(order,tmp)=>accumulate(tmp['csum26'], combSum3)},
  E22:{render:['whole'],alg:(order,tmp)=>2 * C(tmp['whole'].length, 2)},
  E23:{render:['whole'],alg:(order,tmp)=>C(tmp['whole'].length,3)},
  E24:3,
  E25:{render:['baodan'],alg:(order,tmp)=>54},
  E26:3,
  E27:3,
  E31:{render:['whole'],alg:countSingle},
  E32:{render:['whole'],alg:(order,tmp)=>C(tmp['whole'].length,2)},
  /**后三**/
  D11:{render:['10000','1000','100'],alg:(order, tmp)=>mul(3, betSum(order, tmp))},
  D12:3,
  D13:{render:['psum27'],alg:(order,tmp)=>accumulate(tmp['psum27'], normalSum3)},
  D14:{render:['whole'],alg:(order,tmp)=>accumulate(tmp['whole'],diff3)},
  D21:{render:['csum26'],alg:(order,tmp)=>accumulate(tmp['csum26'], combSum3)},
  D22:{render:['whole'],alg:(order,tmp)=>2 * C(tmp['whole'].length, 2)},
  D23:{render:['whole'],alg:(order,tmp)=>C(tmp['whole'].length,3)},
  D24:3,
  D25:{render:['baodan'],alg:(order,tmp)=>54},
  D26:3,
  D27:3,
  D31:{render:['whole'],alg:countSingle},
  D32:{render:['whole'],alg:(order,tmp)=>C(tmp['whole'].length,2)},
  /**前二**/
  C11:{render:['10000','1000'],alg:(order,tmp)=>mul(2,betSum(order,tmp))},
  C12:2,
  C13:{render:['psum18'],alg:(order,tmp)=>accumulate(tmp['psum18'],normalSum2)},
  C14:{render:['whole'],alg:(order,tmp)=>accumulate(tmp['whole'],diff2)},
  C21:{render:['whole'],alg:(order,tmp)=>C(tmp['whole'].length,2)},
  C22:2,
  C23:{render:['csum17'],alg:(order,tmp)=>accumulate(tmp['csum17'].map(item=>item),combSum2)},
  C24:{render:['baodan'],alg:(order,tmp)=>9},
  /**后二**/
  B11:{render:['10000','1000'],alg:(order,tmp)=>mul(2,betSum(order,tmp))},
  B12:2,
  B13:{render:['psum18'],alg:(order,tmp)=>accumulate(tmp['psum18'],normalSum2)},
  B14:{render:['whole'],alg:(order,tmp)=>accumulate(tmp['whole'],diff2)},
  B21:{render:['whole'],alg:(order,tmp)=>C(tmp['whole'].length,2)},
  B22:2,
  B23:{render:['csum17'],alg:(order,tmp)=>accumulate(tmp['csum17'].map(item=>item),combSum2)},
  B24:{render:['baodan'],alg:(order,tmp)=>9},
  /**一星**/
  A11:{render:['10000', '1000', '100', '10', '1'],alg:(order, tmp)=>betSum(order, tmp).reduce(function(a,b){return a + b})},
  /**大小单双**/
  I91:{render:['i10000','i1000'],alg:(order,tmp)=>mul(2,betSum(order,tmp))},
  I92:{render:['i10','i1'],alg:(order,tmp)=>mul(2,betSum(order,tmp))},
  I93:{render:['i10000','i1000','i100'],alg:(order,tmp)=>mul(3,betSum(order,tmp))},
  I94:{render:['i1000','i100','i10'],alg:(order,tmp)=>mul(3,betSum(order,tmp))},
  I95:{render:['i100','i10','i1'],alg:(order,tmp)=>mul(3,betSum(order,tmp))},
}

export default {
  props:['mode'],
  components:{
    'betbox': betbox,
    'notebet': notebet
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

      console.log(result)
      store.commit('lt_setBetStr', getBetStr(order, tmp))
      store.commit('lt_setBetCount', result)
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