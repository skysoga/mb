<template>
<div class="cart" v-show = "ifShowBasket">
  <header class="top sscHeader fix" >
    <a class="iconfont back" @click.stop = "back"></a>
    <div class="playSort" ref = "playSort">号码篮</div>
  </header>

  <div class="cartMain">
    <div class="someBtn" ref = "someBtn"><div><a @click.stop = "machineSelect(1)">机选1注</a><a @click.stop = "machineSelect(5)">机选5注</a><a @click.stop = "back">继续选号</a></div>
    </div>

    <div class="cartContent">
      <ul class="numberbox">
        <li v-for = "(bet,index) in basket">
          <em>{{bet.betting_number}}</em>
          <span>{{getTag(bet.play_detail_code.slice(-3), config)[0]}} {{bet.betting_count}}注×{{PERBET * bet.betting_model}}元×{{bet.graduation_count}}倍  = {{bet.betting_money}}元</span>
          <a @click = "deleteBet(index)"></a>
        </li>
      </ul>
      <div v-show = "ifShowClearAll" class="moreOption fix">
        <div class="stop">
          <input type="checkbox" id="stoping" v-model = "isChase">
          <label for="stoping">追号</label>
        </div>
        <div class="clear"  @click = "clearBasket">清空</div>
      </div>
  </div>
  </div>
  <div class="cartTotal">
    <!-- 追号的配置 -->
    <div class="change" ref = "change" v-show = "isChase">
      <label>投<input type="tel" v-model.lazy = "chasePower">倍</label>
      <label>追<input type="tel" v-model.lazy = "chaseIssue">期</label>
      <div class="stopBtn">
        <input type="checkbox" id="stopBtn" v-model = "isStopAfterWin">
        <label for="stopBtn">中奖即停</label>
      </div>
    </div>

    <div class="result fix" ref = "result">
      <div class="left" v-show = "true">
          <span>方案{{basketNums}}注,{{total}}元</span>
          <em v-show = "!isChase">普通投注</em>
          <em v-show = "isChase">投{{chasePower}}倍，追{{chaseIssue}}期</em>
      </div>

      <div class="right" @click = "confirmBet">
        <i>立即投注</i>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import {PERBET,Max_Rate,Max_Chase_Issue} from '../../JSconfig'
import {normalSum3, normalSum2, diff3, diff2, combSum3, combSum2, BaseBet,bus} from '../../js/kit'
import {sscRandom, sscRandomNote, sscSpecialMode} from '../../js/page_config/lt_ssc'
import {syx5Random, syx5RandomNote, syx5SpecialMode} from '../../js/page_config/lt_syx5'

function getBetStr(arr, isSYX5Type){
  arr = arr.map(item=>item.join(' ')).map(item=>{
    if(item===''){
      if(isSYX5Type){
        return '--'
      }else{
        return '-'
      }
    }else{
      return item
    }
  })

  return arr.join(',')
}

//获取tag和 [五星, 复式， 直选这种]
function getTag(code, config){
  for(var group in config){
    var groupItem = config[group]
    for(var subGroup in groupItem){
      var subGroupItem = groupItem[subGroup]
      for(var i = 0;i < subGroupItem.length;i++){
        if(subGroupItem[i].mode === code){
          var str = `[${subGroupItem[i].group},${subGroupItem[i].subGroup},${subGroupItem[i].name}]`
          return [subGroupItem[i].tag, str]
        }
      }
    }
  }
}


var randomCfgs = {
  SSC: sscRandom,
  SYX5: syx5Random,
  // PK10: pk10Random
}


// //复式的机选生成函数
// var randomCfg = {
//   //五星
//   H11:()=>_random([1,1,1,1,1], true, _0to9),  //五星复式
//   H21:()=>_random([5], false, _0to9),         //组选120
//   H22:()=>_random([1,3], false, _0to9),       //组选60
//   H23:()=>_random([2,1], false, _0to9),       //组选30
//   H24:()=>_random([1,2], false, _0to9),       //组选20
//   H25:()=>_random([1,1], false, _0to9),       //组选10
//   H26:()=>_random([1,1], false, _0to9),       //组选5
//   H31:()=>_random([1], false, _0to9),         //一码不定位
//   H32:()=>_random([2], false, _0to9),         //二码不定位
//   H33:()=>_random([3], false, _0to9),         //三码不定位
//   H41:()=>_random([1], false, _0to9),         //一帆风顺
//   H42:()=>_random([1], false, _0to9),         //好事成双
//   H43:()=>_random([1], false, _0to9),         //三星报喜
//   H44:()=>_random([1], false, _0to9),         //四季发财
//   //四星
//   G11:()=>_random([1,1,1,1], true, _0to9),    //四星复式
//   G21:()=>_random([4], false, _0to9),         //四星组选24
//   G22:()=>_random([1,2], false, _0to9),       //四星组选12
//   G23:()=>_random([2], false, _0to9),         //四星组选6
//   G24:()=>_random([1,1], false, _0to9),       //四星组选4
//   G31:()=>_random([1], false, _0to9),         //一码不定位
//   G32:()=>_random([2], false, _0to9),         //二码不定位
//   //前三
//   F11:()=>_random([1,1,1], true, _0to9),     //直选复式
//   F13:()=>_random([1], false, _0to27),        //直选和值
//   F14:()=>_random([1], false, _0to9),         //跨度
//   F21:()=>_random([1], false, _1to26),        //组选和值
//   F22:()=>_random([2], false, _0to9),         //组三
//   F23:()=>_random([3], false, _0to9),         //组六
//   F25:()=>_random([1], false, _0to9),         //组选包胆
//   F31:()=>_random([1], false, _0to9),         //一码不定位
//   F32:()=>_random([2], false, _0to9),         //二码不定位
//   //中三
//   E11:()=>_random([1,1,1], true, _0to9),     //直选复式
//   E13:()=>_random([1], false, _0to27),        //直选和值
//   E14:()=>_random([1], false, _0to9),         //跨度
//   E21:()=>_random([1], false, _1to26),        //组选和值
//   E22:()=>_random([2], false, _0to9),         //组三
//   E23:()=>_random([3], false, _0to9),         //组六
//   E25:()=>_random([1], false, _0to9),         //组选包胆
//   E31:()=>_random([1], false, _0to9),         //一码不定位
//   E32:()=>_random([2], false, _0to9),         //二码不定位
//   //后三
//   D11:()=>_random([1,1,1], true, _0to9),     //直选复式
//   D13:()=>_random([1], false, _0to27),        //直选和值
//   D14:()=>_random([1], false, _0to9),         //跨度
//   D21:()=>_random([1], false, _1to26),        //组选和值
//   D22:()=>_random([2], false, _0to9),         //组三
//   D23:()=>_random([3], false, _0to9),         //组六
//   D25:()=>_random([1], false, _0to9),         //组选包胆
//   D31:()=>_random([1], false, _0to9),         //一码不定位
//   D32:()=>_random([2], false, _0to9),         //二码不定位
//   //前二
//   C11:()=>_random([1,1], true, _0to9),       //直选复式
//   C13:()=>_random([1], false, _0to18),        //直选和值
//   C14:()=>_random([1], false, _0to9),         //跨度
//   C21:()=>_random([2], false, _0to9),         //组选复式
//   C23:()=>_random([1], false, _1to17),        //组选和值
//   C24:()=>_random([1], false, _0to9),         //组选包胆
//   //后二
//   B11:()=>_random([1,1], true, _0to9),       //直选复式
//   B13:()=>_random([1], false, _0to18),        //直选和值
//   B14:()=>_random([1], false, _0to9),         //跨度
//   B21:()=>_random([2], false, _0to9),         //组选复式
//   B23:()=>_random([1], false, _1to17),        //组选和值
//   B24:()=>_random([1], false, _0to9),         //组选包胆
//   //一星
//   A11:()=>oneStar(),                          //一星
//   //大小单双
//   I91:()=>_random([1,1], true, _dsds),         //前二大小单双
//   I92:()=>_random([1,1], true, _dsds),         //后二大小单双
//   I93:()=>_random([1,1,1], true, _dsds),         //前三大小单双
//   I95:()=>_random([1,1,1], true, _dsds),         //后三大小单双
// }


var randomNoteBets = {
  SSC: sscRandomNote,
  SYX5: syx5RandomNote,
  // PK10: pk10RandomNote
}

//单式的机选生成函数
// var randomNoteBet = {
//   H12:()=>[0,0,0,0,0].map(item=>oneRandom()),    //五星单式
//   G12:()=>[0,0,0,0].map(item=>oneRandom()),      //四星单式
//   F12:()=>[0,0,0].map(item=>oneRandom()),        //前三单式
//   F24:()=>_random([3], false, _0to9)[0],         //前三混合组选单式
//   F26:()=>z3NoteBet(),                           //前三组三单式
//   F27:()=>_random([3], false, _0to9)[0],         //前三组六单式
//   E12:()=>[0,0,0].map(item=>oneRandom()),        //中三单式
//   E24:()=>_random([3], false, _0to9)[0],         //中三混合组选单式
//   E26:()=>z3NoteBet(),                           //中三组三单式
//   E27:()=>_random([3], false, _0to9)[0],         //中三组六单式
//   D12:()=>[0,0,0].map(item=>oneRandom()),        //后三单式
//   D24:()=>_random([3], false, _0to9)[0],         //后三混合组选单式
//   D26:()=>z3NoteBet(),                           //后三组三单式
//   D27:()=>_random([3], false, _0to9)[0],         //后三组六单式
//   C12:()=>[0,0].map(item=>oneRandom()),          //前二直选单式
//   C22:()=>_random([2], false, _0to9)[0],         //前二组选单式
//   B12:()=>[0,0].map(item=>oneRandom()),          //后二直选单式
//   B22:()=>_random([2], false, _0to9)[0],         //后二组选单式
// }

var specialModes = {
  SSC: sscSpecialMode,
  SYX5: syx5SpecialMode,
  // PK10: pk10SpecialMode
}

//哪种机选注数不是一注的，在这里特殊处理
// var specialMode = {
//   F13:(feed)=>normalSum3(feed[0][0]),
//   F14:(feed)=>diff3(feed[0][0]),
//   F21:(feed)=>combSum3(feed[0][0]),
//   F22:(feed)=>2,
//   F25:(feed)=>54,
//   E13:(feed)=>normalSum3(feed[0][0]),
//   E14:(feed)=>diff3(feed[0][0]),
//   E21:(feed)=>combSum3(feed[0][0]),
//   E22:(feed)=>2,
//   E25:(feed)=>54,
//   D13:(feed)=>normalSum3(feed[0][0]),
//   D14:(feed)=>diff3(feed[0][0]),
//   D21:(feed)=>combSum3(feed[0][0]),
//   D22:(feed)=>2,
//   D25:(feed)=>54,
//   C13:(feed)=>normalSum2(feed[0][0]),
//   C14:(feed)=>diff2(feed[0][0]),
//   C23:(feed)=>combSum2(feed[0][0]),
//   C24:(feed)=>9,
//   B13:(feed)=>normalSum2(feed[0][0]),
//   B14:(feed)=>diff2(feed[0][0]),
//   B23:(feed)=>combSum2(feed[0][0]),
//   B24:(feed)=>9,
// }

export default {
  data(){
    return {
      PERBET:PERBET,
    }
  },
  computed:{
    ltype(){
      return this.$route.params.type
    },
    randomCfg(){
      return randomCfgs[this.ltype]
    },
    randomNoteBet(){
      return randomNoteBets[this.ltype]
    },
    specialMode(){
      return specialModes[this.ltype]
    },
    chasePower:{
      get(){
        return this.$store.state.lt.chaseConf.power
      },
      set(power){
        var store = this.$store
        store.commit('lt_setChasePower', +power)
        if(power.search(/[^\d]+/) > -1 || power <= 0){
          store.commit('lt_setChasePower', 1)
          store.dispatch('lt_ordinaryChase')
        }else if(power > Max_Rate){
          store.commit('lt_setChasePower', Max_Rate)
          store.dispatch('lt_ordinaryChase')
          layer.msgWarn(`最多${Max_Rate}倍`)
        }else{
          if(this.isChase){
            store.dispatch('lt_ordinaryChase')
          }
        }
      }
    },
    chaseIssue:{
      get(){
        return this.$store.state.lt.chaseConf.buy_count
      },
      set(issue){
        var store = this.$store
        store.commit('lt_setChaseIssue', +issue)
        if(issue.search(/[^\d]+/) > -1 || issue <= 0){
          store.commit('lt_setChaseIssue', 1)
          store.dispatch('lt_ordinaryChase')
        }else if(issue > Max_Chase_Issue){
          issue = Max_Chase_Issue
          store.commit('lt_setChaseIssue', +issue)
          store.dispatch('lt_ordinaryChase')
          layer.msgWarn(`最多${Max_Chase_Issue}期`)
        }else{
          if(this.isChase){
            store.dispatch('lt_ordinaryChase')
          }
        }
      }
    },
    basket(){return this.$store.state.lt.basket},
    basketNums(){
      var s = 0
      for(var i = 0;i < this.basket.length;i++){
        s += this.basket[i].betting_count
      }
      return s
    },
    scheme(){return this.$store.state.lt.scheme},
    ifShowBasket(){
      return this.$store.state.lt.box === 'basket'
    },
    ifShowClearAll(){return !!state.lt.basket.length},
    mode(){return state.lt.mode.mode},
    config(){return state.lt.config},
    basketTotal(){
      var total = 0
      for(var i = 0;i < this.basket.length;i++){
        total += this.basket[i].betting_money
      }
      return +(total).toFixed(2)
    },
    schemeTotal(){
      var total = 0
      for(var i = 0;i < this.scheme.length;i++){
        total += this.scheme[i].money
      }
      return +(total).toFixed(2)
    },
    total(){
      return this.isChase ? this.schemeTotal : this.basketTotal
    },
    lottery(){return this.$store.state.lt.lottery.LotteryName},
    NowIssue(){return this.$store.state.lt.NowIssue},
    showBubble(){
      return this.chaseIssue > 1
    },
    isChase:{
      get(){
        return this.$store.state.lt.isChase
      },
      set(val){
        this.$store.commit('lt_setIsChase', val)
      }
    },
    isStopAfterWin:{
      get(){
        return this.$store.state.lt.chaseConf.isstop_afterwinning
      },
      set(val){
        this.$store.commit('lt_isStopAfterWin', val)
      }
    }
  },
  methods:{
    //返回投注页
    back(){
      if(this.isChase){
        this.leaveChase(()=>{
          this.$store.commit('lt_changeBox', '')
        })
      }else{
        this.$store.commit('lt_changeBox', '')
      }
    },
    //追号时，如果涉及选号操作，离开追号
    leaveChase(fn){
      layer.confirm(`追号时再次选号，将切换回普通投注模式，是否继续？`
        ,()=>{
          this.isChase = false
          if(fn)fn()
        },()=>{})
    },
    //确认投注
    confirmBet(){
      if(this.isChase){
        if(this.basket.length){
          //普通追号
          var betDetail = []
          this.basket.forEach(bet=>{
            betDetail.push(`${this.getTag(bet.play_detail_code.slice(-3),this.config)[1]} ${bet.betting_number}`)
          })

          var scheme = state.lt.scheme, last = scheme.length - 1
          var msg = `${this.lottery}: 第${scheme[0].issueNo}期至第${scheme[last].issueNo}期,共${scheme.length}期<br>投注金额: <span style = "color:red">${this.schemeTotal}元</span><br>投注内容:<br>${betDetail.join('<br>')}`

          layer.open({
            title:"投注确认",
            style:'width:18em;font-size:.7em',
            shadeClose: false,
            content: msg,
            btn: ['确定', '取消'],
            yes: ()=>{
               this.$store.dispatch('lt_chase')      //追号投注
            },
            no:()=>{}
          })
        }
      }else{
        //普通投注
        var betDetail = []
        this.basket.forEach(bet=>{
          betDetail.push(`${this.getTag(bet.play_detail_code.slice(-3),this.config)[1]} ${bet.betting_number}`)
        })

        var msg = `${this.lottery}: ${this.NowIssue}期<br>投注金额: <span style = "color:red">${this.basketTotal}元</span><br>投注内容:<br>${betDetail.join('<br>')}`

        if(this.basket.length){
          layer.open({
            title:"投注确认",
            style:'width:18em;font-size:.7em',
            shadeClose: false,
            content: msg,
            btn: ['确定', '取消'],
            yes: ()=>{
              this.$store.dispatch('lt_confirmBet')
            },
            no:()=>{}
          })
        }
      }
    },
    deleteBet(index){
      this.$store.commit('lt_deleteBet', index)
    },
    clearBasket(){
      this.$store.commit('lt_clearBasket')
    },
    getTag:getTag,
    machineSelect(n){
      if(this.isChase){
        this.leaveChase(()=>{
          this.random(n)
        })
      }else{
        this.random(n)
      }
    },
    //机选n注
    random(n){
      for(var i = 0;i < n;i++){
        var isNoteBet = Object.keys(this.randomNoteBet).indexOf(this.mode) > -1
        var isSYX5Type = ['SYX5', 'PK10'].indexOf(this.ltype) > -1

        if(isNoteBet === false){
          var randomFeed = this.randomCfg[this.mode]() //层次数组
          var betStr = getBetStr(randomFeed, isSYX5Type)
          var count = this.specialMode[this.mode] ? this.specialMode[this.mode](randomFeed) : 1
          var randomBet = new BaseBet(this.$store.state, count, betStr)
        }else{
          var noteBetArr = this.randomNoteBet[this.mode]()
          var delimiter = isSYX5Type ? ' ' : ''
          var betStr = noteBetArr.join(delimiter)
          var randomBet = new BaseBet(this.$store.state, 1, betStr)
        }

        // //单式的处理
        // var betStr = noteBetList.indexOf(this.mode) > -1 ? randomFeed : getBetStr(randomFeed)
        // //有些机选不了一注的。至少n注
        // var count = specialMode[this.mode] ? specialMode[this.mode](randomFeed) : 1
        // var randomBet = new BaseBet(this.$store.state,count, betStr)
        randomBet.clearCompress()
        this.$store.commit('lt_addRandomBet', randomBet)
      }
    },
  },
}
</script>

<style lang = "scss" scoped>
$bottomHeight : 2.4em;

.stopBtn{
  float: right;
  margin-right: .8em;
  color:#666;
  line-height: 2.16em;
  input{
    display: none;
  }
  input:checked+label:before{
    content:"\e84d";
  }
  label{
    &:before{
      content:"\e64a";
      display: inline;
      font-family: "iconfont";
      margin-right: .2em;
    }
  }
}

.cartTotal{
position: fixed;
width: 100%;
bottom: 0;
left: 0;
.change{
  background: white;
  font-size: .7em;
  padding: .6em 0;
  &:before{
    content:"";
    position: absolute;
    width: 32rem;
    border-top:1px solid #ddd;
    top:0;
    left: 0;
    webkit-transform:scaleY(.5);
    webkit-transform-origin:0 0;
    transform:scaleY(.5);
    transform-origin:0 0;
  }
  >label{
    margin-left: .8em;
    color:#666;
    position: relative;
  }
  input[type=tel]{
    border:1px solid #d2d2d2;
    border-radius: 0;
    -webkit-appearance: none;
    appearance: none;
    width: 4em;
    height: 2em;
    margin:0 .4em;
    border-radius: .2em;
    padding: 0 .4em;
  }
}
.result{
  background: #dc3b40;
  height: $bottomHeight;
  .left{
    float: left;
    height: $bottomHeight;
    background: #212121;
    padding: .3em .4em;
    line-height: 1em;
    width: 66.5%;
    span{
      font-size: .7em;
      color:white;
      display: block;
    }
    em{
      font-size: .65em;
      color:#a9a9a9;
      display: block;
    }
  }
  .right{
    float: left;
    width: 33.5%;
    position: relative;
    text-align: center;
    color:white;
    height: $bottomHeight;
    i{
      font-size: .8em;
      line-height: 3.1em;
      display: block;
      height: 3em;
    }
    &:before{
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-left:0.6em solid #212121;
      border-top: $bottomHeight/2 solid hsla(0, 0%, 0%, 0);
      border-bottom: $bottomHeight/2 solid hsla(0, 0%, 0%, 0);
      left: 0;
      top: 0;
    }
  }
}
}
.cartContent{
  box-shadow: 0 0 .5em #ccc;
  margin:0 .6em;
  background: white;
}
.moreOption{
  background-color: white;
  background: url('http://virjay.com/cartButtom.png') left bottom white;
  background-repeat: repeat-x;
  background-size: 10px;
}
.clear{
  position: relative;
  &:after{
    content:"";
    position: absolute;
    left:0;
    top:0;
    width: 1px;
    height: 100%;
      background-image: -webkit-linear-gradient(right, #d0d0d0, #d0d0d0 50%, transparent 50%);
      background-image: -o-linear-gradient(right, #d0d0d0, #d0d0d0 50%, transparent 50%);
      background-image: linear-gradient(to left, #d0d0d0, #d0d0d0 50%, transparent 50%);
  }
  &:before{
    content:"\e652";
  }
}
.stop{
  input{
    display: none;
  }
  label{
    &:before{
      content:"\e654";
    }
  }
  input:checked+label:before{
    content:"\e651";
  }
}
.stop label,.clear{
  float: left;
  width: 50%;
  padding: 0;
  text-align: center;
  font-size: .7em;
  margin:1em 0;
  color:#666;
  &:before{
    font-family: 'iconfont';
    color:#bdbdbd;
    font-size: 1.1em;
    margin-right: .2em;
  }
}
.numberbox{
  background: white;
  padding: 0 .6em;
  li{
    border-bottom: 1px dashed #ccc;
    padding: .5em 0;
    position: relative;
    em{
      display: block;
      color:#dc3b40;
      font-size: .75em;
      line-height: 1.4em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 90%;
      height: 1.4em;
    }
    span{
      font-size: .75em;
      color:#666;
      line-height: 1.2em;
      width: 90%;
      display: block;
    }
    a{
      font-size: .9em;
      display: block;
      position: absolute;
      right: 0;
      top:1.1em;
      background: #dc3b40;
      width: 1.2em;
      height: 1.2em;
      border-radius: 50%;
      &:before{
        content:"";
        display: block;
        width: .75em;
        height: .1em;
        background: white;
        margin-top: .55em;
        margin-left: .225em;
        border-radius: .1em;
      }
    }
  }
}
.cart{
background: white;
height: 100%;
header{
  height: 2.55556em;
}
}
.cartMain{
padding-top: 4.56em;
padding-bottom: 5.1em;
min-height: 20em;
background: #f9f8f0;
min-height: 100%;
}
.someBtn{
  text-align: center;
  padding: .3em .6em;
  box-shadow: 0 0 .5em #b9b9b9;
  position: fixed;
  z-index: 99;
  background: #f9f8f0;
  top:2.3em;
  left: 0;
  width: 100%;
  >div{
    position: relative;
    a{
      &:nth-child(1){
        position: absolute;
        left: 0;
      }
      &:nth-child(2){
        margin:0 auto;
      }
      &:nth-child(3){
        position: absolute;
        right: 0;
      }
    }
  }
a{
  display: inline-block;
  color:#333;
  border:1px solid #d2d2d2;
  border-radius: .3em;
  font-size: .7em;
  /*padding: 0 .8em;*/
  height: 2.4em;
  width: 31%;
  line-height: 2.4em;
  margin-left: .8em;
  background: white;
  &:first-child{
    margin-left:0;
    left: 0;
  }
  &:before{
    content:"\e64e";
    font-family: "iconfont";
    color:#a3a3a3;
    margin-right: .4em;
    font-size: .8em;
    line-height: 1em;
  }
  &:active{
    background: #dc3b40;
    color:white;
    border:1px solid #dc3b40;
    &:before{
      color:white;
    }
  }
}
}
</style>