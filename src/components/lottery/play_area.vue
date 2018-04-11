<template>
  <div :class="{'sscMain':true,'quWei':getQW}">
    <!-- 奖金详情 -->    
    <div class="sscTips" v-if = "!tipDisplayFlag && tipOverLong">
            <p>
              {{actualTip}}
              <span @click = "toggleDetail(true)" style = "color:#218ddd;">详细</span>
            </p>
          </div>
    <bet-tip v-else :award = "notBJSC?award:[]" :tip = "tip" :itemArr = "bonusText[lotteryMode]">
      <span v-if = "tipDisplayFlag" @click = "toggleDetail(false)" style = "color:#218ddd;">收起</span>
    </bet-tip>

    <!-- 普通 -->
    <betbox v-if = "!ltCfg[mode].box"
            v-for = "alias in ltCfg[mode].render"
            :alias = "alias"
            :awardArr="getAward(alias)"
            v-on:choose = "whenChoose">
            </betbox>


    <!-- len:多少位一注， special:是否为特殊玩法（组三，组六） -->
    <noteBet v-if = "ltCfg[mode].box && ltCfg[mode].box === 'normal'" :len = "ltCfg[mode].len" :special = "ltCfg[mode].special"></noteBet>
    <syx5NoteBet v-if = "ltCfg[mode].box && ltCfg[mode].box === 'syx5'" :len = "ltCfg[mode].len" :special = "ltCfg[mode].special"></syx5NoteBet>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import betbox from './betbox'
import noteBet from './notebet'
import bet_tip from './bet_tip'
import syx5NoteBet from './syx5_notebet'
import {sscPlay} from '../../js/page_config/lt_ssc'
import {syx5Play} from '../../js/page_config/lt_syx5'
import {pk10Play} from '../../js/page_config/lt_pk10'
import {kl8Play} from '../../js/page_config/lt_kl8'
import {factorial, mul, C, combNoRepeat, unique, normalSum2, normalSum3, accumulate,
  diff2, diff3, combSum2, combSum3} from '../../js/kit'

var countSingle = (order,tmp)=>betSum(order,tmp)[0]  //单行计数
// 单式只要传一个数字

var playCfg = {
  'SSC': sscPlay,
  'SYX5': syx5Play,
  'PK10': pk10Play,
  'KL8': kl8Play,
}
var modeArr=['定单双','趣味']
// 奖金详情专用
var bonusText={
'KL8A12':[3,2],
'KL8A13':[4,3,2],
'KL8A14':[5,4,3],
'KL8A15':[6,5,4,3],
'KL8A16':[7,6,5,4,0],
'KL8B10':["中","上","下"],
'KL8B11':["和","奇","偶"],
'SYX5I11':['0单5双','5单0双','1单4双','4单1双','2单3双','3单2双'],
'SYX5I12':['03,09','04,08','05,07','06'],
'SSCF21':['033**','015**'],
'SSCF24':['001**','123**'],
'SSCF25':['311**或331**','345**'],
'SSCE21':['*033*','*015*'],
'SSCE24':['*001*','*123*'],
'SSCE25':['*311*或*331*','*345*'],
'SSCD21':['**033','**015'],
'SSCD24':['**001','**123'],
'SSCD25':['**311或**331','**345'],
}

// var BJSCres=['PK10']//北京赛车配置
// var arrMode=['G11','H11']//北京赛车，双面盘，冠亚和
var isShowBox=['PK10G11','PK10H11','SSCJ11','SSCK11','SSCL11']

export default {
  components:{
    betbox,
    noteBet,
    syx5NoteBet,
    'bet-tip': bet_tip,
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
      ltCfg: {},
      bonusText:bonusText,
      ellipsisWidth: 46,
    }
  },
  computed:mapState({
    tip:()=>state.lt.mode.tip,      //提示
    award:()=>state.lt.award,        //奖金
    mode:()=>state.lt.mode.mode,
    lottery:()=>state.lt.lottery.LotteryType,
    getQW:()=>{
      return modeArr.indexOf(state.lt.mode.name)>-1||state.lt.lottery.LotteryType=='KL8'&&modeArr.indexOf(state.lt.mode.group)>-1
    },
    isBonus(){
      return !!bonusText[this.lotteryMode]&&(state.lt.award.indexOf(',')>-1)
    },
    lotteryMode(){
      return [this.lottery, this.mode].join('')
    },
    //渲染赔率-北京赛车
    renderOdds(){
      var line=this.ltCfg[this.mode].render
      return this.setOddsArr(line)
    },
    notBJSC(){
      return isShowBox.indexOf(this.lottery+this.mode)===-1
    },
    tipDisplayFlag:()=>state.lt.tipDisplayFlag,
    tipOverLong(){
      return this.tip.length > this.ellipsisWidth
    },
    actualTip(){
      if(!this.tipOverLong){
        return this.tip
      }else{
        return this.tip.slice(0, this.ellipsisWidth) + '...'
      }
    },
  }),
  methods:{
    getAward(alias){      
      return isShowBox.indexOf(this.lottery+this.mode)>-1?this.renderOdds[alias]:[]
    },
    toggleDetail(bool){
      this.$store.commit('lt_showFullTip', bool)
    },
    setOddsArr(arr){
      if(!this.award||this.notBJSC){
        return {}
        // layer.msgWarn('奖金不存在')
      }
      var line=[]      
      var award=this.award?this.award.split(" "):[]
      var obj=[]//输出数组
      var objList={}
      switch(this.mode){
        case 'G11':
        line=[50]
        // line=[1,2,1,50]
        objList={
          // "igyh":4,
          "ifirst":6,
          "isecond":6,
          "ithird":6,
          "ifourth":6,
          "ififth":6,
          "isixth":4,
          "iseventh":4,
          "ieighth":4,
          "ininth":4,
          "itenth":4
        }
        break;
        case 'H11':
        line=[1,2,1,2,2,2,2,1,2,2,2,2]
        objList={
          "igyh":4,
          "gyhz":17
        }
        break;
        case 'J11':
        line=[10]
        objList={
          'cbz':10
        }
        break;
        case 'K11':
        line=[4,2,1,30]
        objList={
          "zhlh":7,
          "z10000":6,
          "z1000":6,
          "z100":6,
          "z10":6,
          "z1":6,
        }
        break;
        case 'L11':
        var arr=[]        
        line=[2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1]
        for(var i=0;i<10;i++){
          arr.push(award)
        }
        award=arr.reduce((a,b)=>a.concat(b))
        objList={
          "wQian":3,
          "wBai":3,
          "wShi":3,
          "wGe":3,
          "qBai":3,
          "qShi":3,
          "qGe":3,
          "bShi":3,
          "bGe":3,
          "sGe":3,
        }
        break;
        default:
        line=[]
      }
      if(line.length){
        for(var i=0;i<award.length;i++){
          for(var j=0;j<line[i];j++){
            obj.push(award[i])
          }
        }
      }
      return this.setLineOdd(objList,obj)
    },
    setLineOdd(objList,award){
        var obj={}        
        for(var i in objList){
          if(objList.hasOwnProperty(i)){
            obj[i]=[]
            for(var j=0;j<objList[i];j++){
              obj[i].push(award[0])
              award.splice(0,1)            
            }
          }
      }
      return obj
    },
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
          ,result = this.ltCfg[this.mode].alg(order, tmp)  //当前投注注数

      //快乐8的字符串需特殊处理,两行合一行
      var betStr = ''
      var isKL8Random = this.$route.params.type === 'KL8' && this.mode.slice(0,2) === 'A1'
      var isSYX5 = this.$route.params.type === 'SYX5'
      if(isKL8Random){
        var _tmp = {kl8:tmp['above'].concat(tmp['below'])}
        betStr = getBetStr(['kl8'], _tmp, 2)
      }else if(isSYX5){
        betStr = getBetStr(order, tmp, 2)
      }else{
        betStr = getBetStr(order, tmp, 1)
      }
      this.$store.commit('lt_setBetStr', betStr)
      this.$store.commit('lt_setBetCount', result)
    },
    BonusArr(str){
      return str.split(',')
    },
    showBonus(){
      var trArr=[]
      var Arr=bonusText[this.lotteryMode]
      var Bonus=this.BonusArr(this.award)
      for(var i=0;i<Arr.length;i++){
        trArr.push('<tr><td>'+Arr[i]+'</td><td><span>'+(Bonus[i]||Bonus[i-1])+'<span>元</td></tr>')
      }
      var table=`
          <table>
            <tr>
              <th>猜中</th>
              <th>单注最高奖金</th>
            </tr>
            ${trArr.join('')}
          </table>
        `
      layer.open({
        title: false,
        content:table,
        className:'table',
        btn:['确定']
      })
    }
  }
}

function getBetStr(order, tmp, digit){
  var betStrArr = []
  for(var i = 0;i < order.length;i++){
    betStrArr.push(tmp[order[i]].join(' '))
  }
  betStrArr = betStrArr.map(item=>{
    var placeholder = ''
    for(var j = 0;j < digit;j++){
      placeholder += '-'
    }
    if(item === ''){
      return placeholder
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
  span{
    color:#ff9831;
    display: inline-block;
  }
}
</style>
