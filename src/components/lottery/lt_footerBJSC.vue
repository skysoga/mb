<template>
<div class = "sscFooter">
  <div class = "bet-money" v-if = "betCount">
    <em>当前选号</em>
    <span class = "text-ellipsis" @click = "showBetStr">{{displayBetStr}}</span>
  </div>

  <div class = "bet-money" v-if = "betCount">每注金额<input type = "tel" maxlength="7" v-model="betvalue" @input = "inputPerbet">
    <template v-if="betvalue.length">
      单注最高可中<span>{{(betvalue*maxAward).toFixed(2)}}</span>元
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
var playCfg = {
  'PK10': pk10Play
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
    award:()=>state.lt.award,        //奖金
    mode:()=>state.lt.mode.mode,
    lottery:()=>state.lt.lottery.LotteryType,
    betMoney(){return this.$store.state.lt.bet.betting_money.toFixed(2)},
    betStr(){return this.$store.state.lt.bet.betting_number},
    chosen:()=>state.lt.tmp,
    betNum(){
      var betskt=this.betskt
      var Str=this.betStr.split(",")
      var Arr={}
      for(var i=0;i<betskt.length;i++){
        Arr[betskt[i]]=Str[i].split(" ")
      }
      return Arr
    },
    betskt(){
      var arr=playCfg[this.lottery][this.mode]
      if(arr.render){
        return arr.render
      }
      return []
    },
    //最高可中金额
    maxAward(){
      if(this.betCount===0){
        // 注数为0的时候直接返回
        return 0
      }
      var award=this.award.split(" ")
      return Math.max.apply({}, award);//虚拟数据
    }
  },
  methods:{
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