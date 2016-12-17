<template>
 <div class="k3">
<header class="top">
    <div>
      <p>玩法</p>
      <span id="MethodStr" @click.stop = "toggleModeSelect">
        {{nowModeName}}<i class="iconfont xiala"></i>
      </span>
    </div>

    <div class="fr" id="lotteryChoice">
      <label @click.stop= "toggleTypeSelect">{{LotteryName}}</label>
      <i @click.stop= "toggleTypeSelect" class="iconfont xiala"></i>
      <!-- 快三彩种切换 -->
      <div class="fix" style ="display:block" v-show = "ifShowTypeSelect">
        <a v-for = "lottery in LotteryList"
           @click = "changeLottery(lottery.LotteryCode)">
          {{lottery.LotteryName}}
        </a>
      </div>
    </div>
    <a class="iconfont" @click = "back2index"></a>

    <!-- 玩法下拉框 -->
    <ul class="betTopDetail" v-show = "ifShowModeSelect">
      <li v-for = "mode in config" @click = "changeMode(mode)" :class = "{checked:mode.name === nowModeName}">
        <p class="p0">{{mode.name}}</p>
        <p class="p1">{{renderRebate(mode.mode)}}</p>
        <p class="p2">
          <span class="Dice" :class = "`Dice${mode.eg[0]}`"></span>
          <span class="Dice" :class = "`Dice${mode.eg[1]}`"></span>
          <span class="Dice" :class = "`Dice${mode.eg[2]}`"></span>
        </p>
      </li>
      <li></li>
    </ul>
  </header>

  <section class="State">
    <!-- 上期开奖结果 -->
    <div @click.stop = "togglePastOpen">
      <p>{{oldIssue}}期开奖号码</p>
      <div style="display: block;">
        <div class = "Dice"
             :class = "displayClass + item"
             v-for = "item in display"></div>
        <i class="iconfont xiala"></i>
      </div>
    </div>

    <div @click.stop = "toggleBetRecord">
      <p>{{nowIssue}}期投注截止</p>
      <div>{{TimeBar}}</div>
    </div>

    <!-- 往期开奖结果 -->
    <table class="openPast" style="display: block" v-show = "ifShowPastOpen">
      <tr><td>期号</td> <td>开奖号码</td> <td>和值</td> <td>大小</td> <td>单双</td></tr>
      <tr v-for = "item in pastOpen">
        <td>&nbsp;&nbsp;&nbsp;{{item.IssueNo}}<i>—</i></td>
        <td>
          <div class="Dice" :class = "'Dice' + num" v-for = "num in item.LotteryOpen"></div>
        </td>
        <td>{{item.sum}}</td>
        <td><span class="light">{{item.bigOrSmall}}</span></td>
        <td><span class="light">{{item.singleOrDouble}}</span></td>
      </tr>
    </table>

    <!-- 我的投注 -->
    <table class="myBet" style="display: block" v-show = "ifShowBetRecord">
      <tr><td>期号</td> <td>投注金额</td><td>奖金</td></tr>
      <tr v-for = "item in BetRecord">
        <td>{{item.issueNo.slice(4)}}</td>
        <td>
          {{item.normal_money}}
        </td>
        <td>{{item.openState}}</td>
      </tr>
    </table>
  </section>

<div class="main">
    <div class="MethodWrap">
      <div class="Method Method0"><p class="MethodMsg">猜3个开奖号相加的和，3-10为小，11-18为大。</p><ul><li>大<p>赔率1.946</p></li><li>小<p>赔率1.946</p></li><li>单<p>赔率1.946</p></li><li>双<p>赔率1.946</p></li><li>3<p>赔188.56</p></li><li>4<p>赔62.85</p></li><li>5<p>赔31.42</p></li><li>6<p>赔18.85</p></li><li>7<p>赔12.57</p></li><li>8<p>赔8.97</p></li><li>9<p>赔7.54</p></li><li>10<p>赔6.98</p></li><li>11<p>赔6.98</p></li><li>12<p>赔7.54</p></li><li>13<p>赔8.97</p></li><li>14<p>赔12.57</p></li><li>15<p>赔18.85</p></li><li>16<p>赔31.42</p></li><li>17<p>赔62.85</p></li><li>18<p>赔188.56</p></li></ul></div>
    </div>
  </div>

  <footer class="bottom">
    <table>
      <tbody>
        <tr>
          <td>当前选号</td>
          <td><span id="choice"></span></td>
        </tr>
        <tr>
          <td>每注金额</td>
          <td>
            <input type="tel" name="unit" maxlength="7" />
            <div id="maxReturn"></div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="ft0">
      <div class="fl" id="clear">清空</div>
      <p class="fl" id="total"></p>
      <div class="fr" id="bet">马上投注</div>
    </div>
  </footer>
 </div>
</template>

<script>
export default {
  created (){
    [,this.ltype, this.lcode] = this.$route.fullPath.slice(1).split('/')
    //处理得各彩种的List
    var LotteryConfig = this.$store.state.LotteryConfig
    LotteryConfig.forEach(item=>{
      if(item.LotteryClassID.indexOf(this.lcode.slice(0,2)) > -1){
        this.LotteryList = item.LotteryList.map(code=>{
          var el = state.LotteryList[code]
          return el
        })
      }
    })

    function circle(num){
      num ++
      if(num > 3){
        return 0
      }else{
        return num
      }
    }
    var arr = [0,0,0]
    setInterval(()=>{
      arr = arr.map(circle)
      this.wait4Results = arr
    },80)
  },
  data(){
    return {
      LotteryList: [], //彩种list
      ltype: '',       //彩种类型
      lcode: '',       //彩种code
      wait4Results:[1,2,3]    //等待开奖的默认状态
    }
  },
  computed:{
    //header部分
    ifShowTypeSelect (){
      return state.lt.box === 'typeSelect'
    },
    ifShowModeSelect (){
      return this.$store.state.lt.box === 'modeSelect'
    },
    LotteryName: ()=>state.lt.lottery.LotteryName,
    config:()=>state.lt.config,
    award:()=>state.lt.award,
    odds:()=>state.lt.Odds['K3'],
    nowModeName:()=>state.lt.mode.name,
    //开奖结果部分
    oldIssue:()=>state.lt.OldIssue.slice(4),
    nowIssue:()=>state.lt.NowIssue.slice(4),
    TimeBar:()=>state.lt.TimeBar,
    results(){
      var _results = state.lt.LotteryResults[this.lcode]
      if(!_results || !_results.length){
        return []
      }else{
        return _results[0].LotteryOpen.split(',')
      }
    },
    display(){
      return state.lt.displayResults ? this.results : this.wait4Results
    },
    displayClass(){
      return state.lt.displayResults ? 'Dice' : 'rDice'
    },
    ifShowPastOpen(){
      return this.$store.state.lt.box === 'pastOpen'
    },
    ifShowBetRecord(){
      return this.$store.state.lt.box === 'BetRecord'
    },
    pastOpen(){
      return state.lt.LotteryResults[this.lcode].map(item=>{
        var el = {}
        el.IssueNo = item.IssueNo.slice(4)        //把年份砍掉
        var results = item.LotteryOpen.split(',')
        el.LotteryOpen = results
        el.sum = results.reduce((a,b)=>(+a)+(+b))
        el.bigOrSmall = el.sum > 10 ? '大' : '小'
        el.singleOrDouble = el.sum % 2 === 1 ? '单' : '双'
        return el
      })
    },
    BetRecord(){
      var Record = state.lt.BetRecord
      if(!Record || Record.length === 0){
        var emptyObj = {issueNo:'xxxx', normal_money:'', openState:''}
        Record = [0,0,0].map(item=>emptyObj)
      }
      return Record
    },
  },
  methods:{
    back2index(){
      store.commit('lt_leaveLottery')
      this.$router.push('/index')
    },
    //彩种选择框，切换
    toggleTypeSelect(){
      this.$store.state.lt.box === 'typeSelect' ?
         this.$store.commit('lt_changeBox', '') :
           this.$store.commit('lt_changeBox', 'typeSelect')
    },
    //玩法选择框，切换
    toggleModeSelect(){
      this.$store.state.lt.box === 'modeSelect' ?
         this.$store.commit('lt_changeBox', '') :
           this.$store.commit('lt_changeBox', 'modeSelect')
    },
    //彩种选择框，切换
    toggleBetRecord(){
      this.$store.state.lt.box === 'BetRecord' ?
         this.$store.commit('lt_changeBox', '') :
           this.$store.commit('lt_changeBox', 'BetRecord')
    },
    //更改彩种
    changeLottery(code){
      this.$store.dispatch('lt_updateLottery', code)
    },
    renderRebate(mode){
      var rebate
      this.odds.forEach(item=>{
        if(mode === item.PlayCode){
          rebate = item.Bonus
        }
      })

      if(rebate.indexOf(',') > -1){
        var rebateArr = rebate.split(',')
        return `${rebateArr[rebateArr.length -1]}-${rebateArr[0]}倍`
      }else{
        return `赔率${rebate}倍`
      }
    },
    changeMode(mode){
      store.commit('lt_changeMode', mode)
    },
    togglePastOpen(){
      this.$store.state.lt.box === 'pastOpen' ?
         this.$store.commit('lt_changeBox', '') :
           this.$store.commit('lt_changeBox', 'pastOpen')
    },
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/k3.scss';
</style>