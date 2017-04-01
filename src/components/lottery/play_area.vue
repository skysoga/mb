<template>
  <div :class="{'sscMain':true,'quWei':getQW}">
    <div class="sscTips">
      <p>{{tip}}<i>{{award}}</i>元 </p>
      <!-- <p>每位至少选1个号码，按位猜对号码即中196000元 </p> -->
    </div>

    <!-- 普通 -->
    <betbox v-if = "!ltCfg[mode].box"
            v-for = "alias in ltCfg[mode].render"
            :alias = "alias"
            v-on:choose = "whenChoose">
            </betbox>

    <!-- 单式 -->
    <!-- <notebet v-if = "!isNaN(ltCfg[mode])" :len = "ltCfg[mode]"></notebet> -->

    <!-- len:多少位一注， special:是否为特殊玩法（组三，组六） -->
    <noteBet v-if = "ltCfg[mode].box && ltCfg[mode].box === 'normal'" :len = "ltCfg[mode].len" :special = "ltCfg[mode].special"></noteBet>
    <syx5NoteBet v-if = "ltCfg[mode].box && ltCfg[mode].box === 'syx5'" :len = "ltCfg[mode].len" :special = "ltCfg[mode].special"></syx5NoteBet>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import betbox from './betbox'
import noteBet from './notebet'
import syx5NoteBet from './syx5_notebet'
import {sscPlay} from '../../js/page_config/lt_ssc'
import {syx5Play} from '../../js/page_config/lt_syx5'
import {pk10Play} from '../../js/page_config/lt_pk10'
import {factorial, mul, C, combNoRepeat, unique, normalSum2, normalSum3, accumulate,
  diff2, diff3, combSum2, combSum3} from '../../js/kit'

var countSingle = (order,tmp)=>betSum(order,tmp)[0]  //单行计数
// 单式只要传一个数字

var playCfg = {
  'SSC': sscPlay,
  'SYX5': syx5Play,
  'PK10': pk10Play,
  // 'FC3D': fc3dPlay,
  // 'PL35': pl3Play,
  // 'KL8': kl8Play,
}
var modeArr=['定单双']
export default {
  components:{
    betbox,
    noteBet,
    syx5NoteBet
  },
  created(){
    this.ltCfg = playCfg[this.$route.params.type]

    //初始化各个alias的tmp
    for(var item in this.ltCfg){
      if(this.ltCfg[item].render){
        this.ltCfg[item].render.forEach(alias=>{
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
      ltCfg: {}
    }
  },
  computed:mapState({
    tip:()=>state.lt.mode.tip,      //提示
    award:()=>state.lt.award,        //奖金
    mode:()=>state.lt.mode.mode,
    getQW:()=>{
      return modeArr.indexOf(state.lt.mode.name)>-1
    }
  }),
  methods:{
    whenChoose(alias, choose){
      var tmp = state.lt.tmp                     //即时投注号码
      // 处理胆码和拖码不可重选
      var isSYX5=this.$route.params.type==='SYX5'
      if(isSYX5){
        if(alias === 'dm'){
          tmp['dm'].forEach(itemDm=>{
            var indexTm = tmp['tm'].indexOf(itemDm)
            if(indexTm > -1){
              var _tm = tmp['tm'].slice(0)
              _tm.splice(indexTm, 1)
              this.$store.commit({
                type:'lt_updateTmp',
                alias: 'tm',
                arr: _tm
              })
            }
          })
        }else if(alias === 'tm'){
          tmp['tm'].forEach(itemDm=>{
            var indexTm = tmp['dm'].indexOf(itemDm)
            if(indexTm > -1){
              var _dm = tmp['dm'].slice(0)
              _dm.splice(indexTm, 1)
              this.$store.commit({
                type:'lt_updateTmp',
                alias: 'dm',
                arr: _dm
              })
            }
          })
        }
      }
      var order = this.ltCfg[this.mode].render  //按渲染数组的顺序
      var result = this.ltCfg[this.mode].alg(order, tmp)  //当前投注注数
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
  i{
    color:#dc3b40;
  }
}
</style>
