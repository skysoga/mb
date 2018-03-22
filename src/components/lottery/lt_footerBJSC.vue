<template>
<div class = "sscFooter">
  <div class = "bet-money" v-if = "betCount">
    <em>当前选号</em>
    <span class = "text-ellipsis" @click = "showBetStr">{{displayBetStr}}</span>
  </div>

  <div class = "bet-money" v-if = "betCount">每注金额<input type = "tel" maxlength="7" v-model="betvalue" @input = "inputPerbet">
    <template v-if="betvalue.length">
      最高可中<span>{{(betvalue*maxAward).toFixed(2)}}</span>元
    </template>
    <template v-else>
      请输入要投注金额
    </template>
  </div>

  <div class = "bet-info fix">
    <div class = "bet-info-left">
      <a class = "bet-info-clear" @click = "clearBet"><i class="iconfont"></i>清空</a>
      <span v-show="betCount" class = "bet-info-count">共{{betCount}}注<template v-if="betvalue.length">,{{betCount*betvalue}}元</template></span>
    </div>
    <div class = "bet-info-right">
      <button class = "bet-info-confirm" @click = "confirmBet">马上投注</button>
    </div>
  </div>
</div>
</template>

<script>
//处理最大奖金
import {pk10Play} from '../../js/page_config/lt_pk10'
import {_dsdslh,_dsds,_3to19,_gyhdsds} from '../../js/kit'
// 测试数据
var awardObj={
  'H11':'2.182 1.746 2.182 43.65 21.825 14.55 10.912 8.73 10.912 14.55 21.825 43.65',
  'G11':'1.94'
}

var BJSCres=['PK10']//北京赛车配置
var arrMode=['G11','H11']//北京赛车，双面盘，冠亚和
var playCfg = {
  'PK10': pk10Play
}
// G11,H11配置
var cfg={
  //双面盘大小单双龙虎
  'igyh':{tag:'冠亚和', itemArr: _gyhdsds},
  'ifirst':{tag:'冠军', itemArr: _dsdslh},
  'isecond':{tag:'亚军', itemArr: _dsdslh},
  'ithird':{tag:'季军', itemArr: _dsdslh},
  'ifourth':{tag:'第四', itemArr: _dsdslh},
  'ififth':{tag:'第五', itemArr: _dsdslh},
  'isixth':{tag:'第六', itemArr: _dsds},
  'iseventh':{tag:'第七', itemArr: _dsds},
  'ieighth':{tag:'第八', itemArr: _dsds},
  'ininth':{tag:'第九', itemArr: _dsds},
  'itenth':{tag:'第十', itemArr: _dsds},
  //冠亚军
  'gyhz':{tag:'冠亚和值', itemArr: _3to19},
}
export default{
  data(){
    return {
      betvalue:'',
      lengthLimit: 30,
    }
  },
  computed:{
    displayBetStr(){
      var overlong = this.betStr.length > this.lengthLimit
      var betStr=this.betStr
      if(overlong){
        return betStr.slice(0, this.lengthLimit) + '...'
      }else{
        return betStr
      }
    },
    betCount(){
      return this.$store.state.lt.bet.betting_count
    },
    award:()=>state.lt.award||awardObj[state.lt.mode.mode],        //奖金
    mode:()=>state.lt.mode.mode,
    lottery:()=>state.lt.lottery.LotteryType,
    betMoney(){return this.$store.state.lt.bet.betting_money.toFixed(2)},
    betStr(){return this.$store.state.lt.bet.betting_number},
    chosen:()=>state.lt.tmp,    
    betskt(){
      var arr=playCfg[this.lottery][this.mode]
      if(arr.render){
        return arr.render
      }
      return []
    },
    //选号对赔率
    NumToAward(){
      var obj={}
      var Arr=this.setOddsArr()
      for(var i in Arr){
        if(Arr.hasOwnProperty(i)){
          var x={}
          var itemArr=cfg[i].itemArr
          for(var j=0;j<Arr[i].length;j++){
            var key=itemArr[j]
            var value=Arr[i][j]
            x[key]=value
          }
          obj[i]=x
        }
      }
      return obj
    },
    //每行选号的数组
    getBetMax(){
      var betstr=this.betskt
      var chosen=this.chosen
      var obj={}
      for(var i in betstr){
        if(betstr.hasOwnProperty(i)){
          obj[betstr[i]]=chosen[betstr[i]]
        }
      }
      return obj
    },    
    //最高可中金额
    maxAward(){
      if(this.betCount===0){
        // 注数为0的时候直接返回
        return 0
      }
      var maxAward=0
      var getBetMax=this.getBetMax
      var NumToAward=this.NumToAward//选号和对应赔率
      if(this.mode==='G11'){
        var setData=function(n,data,obj){
          var awardArr=obj[n]
          var award=awardArr['大']
          var dx=(data.indexOf('大')>-1||data.indexOf('小')>-1)?+award:0
          var ds=(data.indexOf('单')>-1||data.indexOf('双')>-1)?+award:0
          var lh=(data.indexOf('龙')>-1||data.indexOf('虎')>-1)?+award:0
          var num=dx+ds+lh
          return num
        }

        for(var i in getBetMax){
          var Max=setData(i,getBetMax[i],NumToAward)
          maxAward+=Max*1
        }
      }
      //计算冠亚和
      if(this.mode==='H11'){
        var dsds=getBetMax.igyh
        var dadsAward=NumToAward.igyh
        var gyhz=getBetMax.gyhz
        var gyhzAward=NumToAward.gyhz
            dsds=[
              dsds.indexOf('和大')>-1,
              dsds.indexOf('和小')>-1,
              dsds.indexOf('和单')>-1,
              dsds.indexOf('和双')>-1
            ]
        var getLine=[]
        getBetMax['gyhz'].forEach((v,i,a)=>{
          var self=gyhzAward[v]
          var hd=(v>11&&dsds[0])?dadsAward['和大']:0
          var hx=(v<12&&dsds[1])?dadsAward['和小']:0
          var hdd=(v%2!==0&&dsds[2])?dadsAward['和单']:0
          var hss=(v%2===0&&dsds[3])?dadsAward['和双']:0
          var dx=+Math.max(hd,hx)
          var ds=+Math.max(hdd,hss)
          getLine.push(+self+dx+ds)
        })        
        maxAward=getLine.length?Math.max.apply({},getLine):0
      }
      return maxAward.toFixed(3)
    }
  },
  methods:{
    setOddsArr(){
      if(!this.award){
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
        default:
        line=[]
      }
      if(line.length&&BJSCres.indexOf(this.lottery)!==-1){
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
    // 清空当前选号
    clearBet(){
      var betskt=this.betskt
      this.betvalue = ''
      this.$store.commit('lt_clearBet')//清除选中内容

      for(var i=0;i<betskt.length;i++){
        this.$store.commit({
          type:'lt_updateTmp',
          alias: betskt[i],
          arr: []
        })
      }
    },
    inputPerbet($event){
      var value = $event.target.value
      var reg = /^\d*$/  //正整数
      if(!reg.test(value)){
        value = ''
        $event.target.value = value
      }
      this.$emit('input', value)
    },
    showBetStr(){
      layer.confirm(this.betStr,['确定'],()=>{})
    },// 确认投注
    confirmBet(){
      if(!this.betCount){
        layer.alert('请至少选择一注号码投注')
        return
      }else if(!(+this.betvalue)){
        layer.alert('请填写您要投注的金额')
        return
      }

      var lt = this.$store.state.lt
      var lotteryCode = lt.lottery.LotteryCode
      var nowIssue = lt.NowIssue
      var lotteryName = lt.lottery.LotteryName
      // var betMoney = this.betvalue*1//单注金额
      var betMoney = this.betCount * this.betvalue
      var rebate = lt.Rebate[this.lottery]
      var lotteryMode = this.mode

      var {group,name,subGroup}=lt.mode
    
      // 投注格式
      var bet = {
        lottery_code: lotteryCode,
        play_detail_code: lotteryCode + this.mode,
        betting_number: this.betStr,
        betting_count: this.betCount,
        betting_money: betMoney,
        betting_point: '0-' + rebate,
        betting_model: 1,
        betting_issuseNo: nowIssue,
        graduation_count:1
      }
      
      var basket = [bet]

      var msg = `${lotteryName}: ${nowIssue}期<br>
                    投注金额: <span style = "color:red">${betMoney}元</span><br>
                    投注内容: [${group},${subGroup},${name}] ${this.betStr}`
      var that = this
      layer.open({
        title:"投注确认",
        style:'width:18em;font-size:.7em',
        shadeClose: false,
        content: msg,
        btn: ['确定', '取消'],
        yes: ()=>{
          this.$store.dispatch({
            type: 'lt_confirmBet1',
            basket: basket,
            success: function(){
              //清空每注单价
              that.betvalue = ''
            }
          })
          // this.$store.dispatch('lt_confirmBet1', basket)
        },
        no:()=>{}
      })
    }    
  },
}
</script>
<style scoped lang = "scss">
@import '../../scss/scssConfig','../../scss/mixin';

$footer-left:0.5em;
.text-ellipsis{
  display: inline-block;
  width:15em;
  overflow:hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sscFooter{
  position:fixed;
  left:0;
  bottom:0;
  width:100%;
  font-size:.7em;
  z-index: 3;
}

.bet-money{
  width:100%;
  height:2.5em;
  line-height: 2.5em;
  padding-left:$footer-left;
  background: #fff;
  border-top:1px solid #dfdfdf;
  color:#666;
  input{
    display: inline-block;
    height: 1.7em;
    font-weight: 500;
    width:5em;
    line-height: 1em;
    margin-left:0.4em;
    border:1px solid #dfdfdf;
    border-radius:0.1em;
    padding:0.35em;
    -webkit-appearance:none;
  }
  span{
    margin-left:0.4em;
  }
  em{
    display: inline-block;
    overflow: hidden;
  }
  .text-ellipsis{
    font-weight: bold;
  }
}

.bet-info{
  width:100%;
  height:3.2em;
  background: #252525;
  color:#ddd;
  padding: .5em;
}
.bet-info-left{
  float: left;
  line-height: 2.2em;
}
.bet-info-right{
  float: right;
}
.bet-info-right{
  margin-right: .3em;
  text-align: right;
}

.bet-info-clear{
  padding-left:0;
  /*color:#717271;*/
  color:#ffaf36;
  font-size:1.4em;
  /*i{
    &:before{
      content:'\e620';
      font-size: 1.6em;
      display: inline-block;
      transform: translateY(.12em);
      padding-right: .2em;
    }
  }*/
}

.bet-info-count{
  padding-left:0.5rem;
  color:white;
}

.bet-info-confirm{
  background: #dc3b40;
  border:none;
  display: block;
  text-align: center;
  height: 2.2em;
  line-height: 2.2em;
  width: 6em;
  border-radius: 0.26rem;
}
</style>