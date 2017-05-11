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
import {pk10Random, pk10RandomNote, pk10SpecialMode} from '../../js/page_config/lt_pk10'
import {kl8Random, kl8RandomNote, kl8SpecialMode} from '../../js/page_config/lt_kl8'

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
  PK10: pk10Random,
  KL8: kl8Random
}

var randomNoteBets = {
  SSC: sscRandomNote,
  SYX5: syx5RandomNote,
  PK10: pk10RandomNote,
  KL8: kl8RandomNote
}

var specialModes = {
  SSC: sscSpecialMode,
  SYX5: syx5SpecialMode,
  PK10: pk10SpecialMode,
  KL8: kl8SpecialMode
}
function scrollTop(){document.body.scrollTop = 0}  //滚动置顶
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
      scrollTop()
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
        if(isNoteBet === false){
          var randomFeed = this.randomCfg[this.mode]() //层次数组
          var isSYX5Type = ['SYX5'].indexOf(this.ltype) > -1
          var betStr = getBetStr(randomFeed, isSYX5Type)
          var count = this.specialMode[this.mode] ? this.specialMode[this.mode](randomFeed) : 1
          var randomBet = new BaseBet(this.$store.state, count, betStr)
        }else{
          var noteBetArr = this.randomNoteBet[this.mode]()
          var isSYX5Type = ['SYX5','PK10'].indexOf(this.ltype) > -1
          var delimiter = isSYX5Type ? ' ' : ''
          var betStr = noteBetArr.join(delimiter)
          var randomBet = new BaseBet(this.$store.state, 1, betStr)
        }

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
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAFCAIAAAD67UpFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDg4NTdGNzlCNjA4MTFFNjk2RkRCQjhEOUJBNkIwM0MiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDg4NTdGN0FCNjA4MTFFNjk2RkRCQjhEOUJBNkIwM0MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEODg1N0Y3N0I2MDgxMUU2OTZGREJCOEQ5QkE2QjAzQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEODg1N0Y3OEI2MDgxMUU2OTZGREJCOEQ5QkE2QjAzQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ps6yJOQAAABuSURBVHjabMw7CoAwEATQ/YQUYinaCHr/UynY+MEqiAaSddVGSKbaGR6LIgJJvPfLvDl36F2WRd1U1lpMqbpxmEKIAPgOwkxd35r05brsMQIRIT5Uf2nVMUPP82Lmz31RrWOGMhsBQfjRp8ItwAChVzJfsFDx6QAAAABJRU5ErkJggg==) left bottom white;
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
