<template>
<div class="k3">
  <header class="top">
    <!-- 玩法下拉框开关 -->
    <div>
      <p>玩法</p>
      <span id="MethodStr"
            @click.stop = "toggleModeSelect"
            :class = "{on: ifShowModeSelect}">
        {{nowModeName}}<i class="iconfont xiala"></i>
      </span>
    </div>

    <div class="fr" id="lotteryChoice" :class = "{on: ifShowTypeSelect}">
      <!-- 彩种选择下拉框开关 -->
      <label @click.stop= "toggleTypeSelect">{{LotteryName.slice(0,2)}}</label>
      <i @click.stop= "toggleTypeSelect" class="iconfont xiala"></i>
      <!-- 快三彩种切换 -->
        <div class="fix" style ="display:block" v-show = "ifShowTypeSelect" v-if = "LotteryList.length">
          <ins></ins>
          <a v-for = "lottery in LotteryList"
             @click = "changeLottery(lottery.LotteryCode)">
            {{lottery.LotteryName}}
          </a>
        </div>
    </div>
    <router-link to="/index" class="iconfont back"></router-link>

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
      </li><li></li>
    </ul>
  </header>

  <section class="State" :class = "{on: ifShowPastOpen}">
    <!-- 上期开奖结果 -->
    <div v-if = "$store.state.lt.OldIssue" @click.stop = "togglePastOpen" >
      <p>{{oldIssue}}期开奖号码</p>
      <div class="DiceImg" style="display: block;">
        <div class = "Dice"
             :class = "displayClass + item"
             v-for = "item in display"></div>
        <i class="iconfont xiala"></i>
      </div>
      <div class="DiceText" style="display: block;">
        <div class = "Dice"
             v-for = "item in display">{{item}}</div>
        <i class="iconfont xiala"></i>
      </div>
    </div>

    <!-- timebar -->
    <div v-if = "$store.state.lt.NowIssue" @click.stop = "togglePastOpen">
      <p>{{nowIssue}}期投注截止</p>
      <div>{{TimeBar}}</div>
    </div>

    <!-- 往期开奖结果 -->
    <table class="openPast" style="display: block" v-show = "ifShowPastOpen">
      <tr><td>期号</td> <td>开奖号码</td> <td>和值</td> <td>大小</td> <td>单双</td></tr>
      <tr v-for = "item in pastOpen">
        <td>&nbsp;&nbsp;&nbsp;{{item.IssueNo}}<i>—</i></td>
        <td style="position:relative;">
          <div class="openPastDiceImg"><div class="Dice" :class = "'Dice' + num" v-for = "num in item.LotteryOpen"></div></div>
          <div class="openPastDiceText"><div class="Dice" v-for = "num in item.LotteryOpen">{{num}}</div></div>
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
        <td>{{item.issueNo.length < 7 ? item.issueNo : item.issueNo.slice(4)}}</td>
        <td>
          {{item.normal_money}}
        </td>
        <td>{{item.openState}}</td>
      </tr>
    </table>
  </section>

  <!-- 玩法区 -->
  <div class="main">
    <div class="MethodWrap">
      <div class="Method" :class = "'Method' + nowModeIndex">
        <p class="MethodMsg">{{tip}}{{tipRebate}}</p>
        <ul>
          <li v-for = "(item,index) in itemArr"
              @click = "choose(item)"
              :class = "{checked: chosen.indexOf(item) > -1}">{{item}}
              <p v-if = "mode === 'A10' && award">{{index < 4 ? '赔率': '赔'}}{{getSumRebate(index)}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <footer class="bottom">
    <table v-show = "chosen.length">
      <tbody>
        <tr>
          <td>当前选号</td>
          <td><span id="choice">{{this.chosen.join(' ')}}</span></td>
        </tr>
        <tr>
          <td>每注金额</td>
          <td>
            <input type="tel" maxlength="7"
                   v-model = "showPrice"
                   @input = "changeShowPrice"/>
            <div v-show = "!showPrice">请输入要投注的金额</div>
            <div v-show = "showPrice">最高可中<span>{{mode === 'A10' ? getMaxAwardA10() : (+this.showPrice * this.award).toFixed(2)}}</span>元</div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="ft0">
      <div class="fl" @click = "clear">清空</div>
      <p class="fl"> {{betCountStr}}{{betMoneyStr}}</p>
      <div class="fr" @click = "confirmBet">马上投注</div>
    </div>
  </footer>
 </div>
</template>

<script>
import {mapState} from 'vuex'
import {unique,C,mul,BaseBet,deleteCompress,PERBET} from '../js/kit'
var eachLen = data=>data.map(arr=>arr.length)
var getBetStr = (data, mode)=>{
  var line =  data.map(arr=>arr.join(' '))
  if(mode === 'C10'){
    return line.filter(str=>str).join(',')
  }else{
    return line.join(',')
  }
}

var cfg = {
  'A10':{
    itemArr:['大','小','单','双',3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
    line:[['大','小','单','双'],[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]],
    index:0,
    alg:data=>eachLen(data).reduce((p,c)=>p+c)
  },
  'B10':{
    itemArr:['三同号通选'],
    index:1,
    line:[['三同号通选']],
    alg:data=>data[0].length
  },
  'C10':{
    itemArr:[111,222,333,444,555,666],
    index:2,
    line:[[111],[222],[333],[444],[555],[666]],
    alg:data=>eachLen(data).reduce((p,c)=>p+c)
  },
  'D10':{
    itemArr:[1,2,3,4,5,6],
    index:3,
    line:[[1,2,3,4,5,6]],
    alg:data=>C(data[0].length, 3)
  },
  'E10':{
    itemArr:['三连号通选'],
    index:4,
    line:[['三连号通选']],
    alg:data=>data[0].length
  },
  'F10':{
    itemArr:[11,22,33,44,55,66],
    index:5,
    line:[[11,22,33,44,55,66]],
    alg:data=>data[0].length
  },
  'G10':{
    itemArr:[11,22,33,44,55,66,1,2,3,4,5,6],
    index:6,
    line:[[11,22,33,44,55,66],[1,2,3,4,5,6]],
    alg:data=>mul(2,eachLen(data))
  },
  'H10':{
    itemArr:[1,2,3,4,5,6],
    index:7,
    line:[[1,2,3,4,5,6]],
    alg:data=>C(data[0].length, 2)
  },
}

export default {
  created (){
    this.$store.commit({
      type:'lt_updateTmp',
      alias: 'K3',
      arr: []
    })
    ;[,this.ltype, this.lcode] = this.$route.fullPath.slice(1).split('/')
    //处理得各彩种的List
    var LotteryConfig = this.$store.state.LotteryConfig
    if(LotteryConfig && LotteryConfig.length){
      LotteryConfig.forEach(item=>{
        if(item.LotteryClassID.indexOf(this.lcode.slice(0,2)) > -1){
          this.LotteryList = item.LotteryList.map(code=>{
            var el = this.$store.state.LotteryList[code]
            return el
          })
        }
      })
    }

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
      wait4Results:[1,2,3],    //等待开奖的默认状态
      showPrice:'',            //每注投多少，展示
    }
  },
  watch:{
    $route(){
      [,this.ltype, this.lcode] = this.$route.fullPath.slice(1).split('/')
      this.clear()
    }
  },
  computed:mapState({
    //header部分
    ifShowTypeSelect (){
      return this.$store.state.lt.box === 'typeSelect'
    },
    ifShowModeSelect (){
      return this.$store.state.lt.box === 'modeSelect'
    },
    LotteryName: ()=>state.lt.lottery.LotteryName,
    config:()=>state.lt.config,
    award:()=>state.lt.award,
    odds:()=>state.lt.Odds['K3'],
    nowModeName:()=>state.lt.mode.name,
    nowModeIndex:()=>cfg[state.lt.mode.mode].index,
    //开奖结果部分
    oldIssue(){
      return state.lt.lottery.LotteryCode === '1406' ? state.lt.OldIssue : state.lt.OldIssue.slice(4)
    },
    nowIssue(){
      return state.lt.lottery.LotteryCode === '1406' ? state.lt.NowIssue : state.lt.NowIssue.slice(4)
    },
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
      var pastOpen = state.lt.LotteryResults[this.lcode].map(item=>{
        var el = {}
        el.IssueNo = item.IssueNo.length < 7 ? item.IssueNo :item.IssueNo.slice(4)        //把年份砍掉
        var results = item.LotteryOpen.split(',')
        el.LotteryOpen = results
        el.sum = results.reduce((a,b)=>(+a)+(+b))
        el.bigOrSmall = el.sum > 10 ? '大' : '小'
        el.singleOrDouble = el.sum % 2 === 1 ? '单' : '双'
        return el
      })
      return pastOpen
    },
    BetRecord(){
      var Record = state.lt.BetRecord
      if(!Record || Record.length === 0){
        var emptyObj = {issueNo:'xxxx', normal_money:'', openState:''}
        Record = [0,0,0].map(item=>emptyObj)
      }
      return Record
    },
    tip:()=>state.lt.mode.tip,
    //玩法区
    itemArr:()=>cfg[state.lt.mode.mode].itemArr,
    mode:()=>state.lt.mode.mode,
    award:()=>state.lt.award,
    tipRebate(){
      return typeof this.award === 'string' ? `赔率${this.award}倍。` : ''
    },
    chosen:()=>state.lt.tmp['K3'],
    bet:()=>state.lt.bet,
    betStr:()=>state.lt.bet.betting_number,
    betCountStr:()=>state.lt.bet.betting_number ? `共${state.lt.bet.betting_count}注`:'',
    betMoneyStr(){
      return (state.lt.bet.betting_money && this.showPrice)  ? `，${state.lt.bet.betting_money}元` : ''
    },
    basket:()=>state.lt.basket,
  }),
  methods:{
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
      if(this.odds){
        this.odds.forEach(item=>{
          if(mode === item.PlayCode){
            rebate = item.Bonus
          }
        })
      }else{
        rebate = ''
      }

      if(rebate.indexOf(',') > -1){
        var rebateArr = rebate.split(',')
        return `${rebateArr[rebateArr.length -1]}-${rebateArr[0]}倍`
      }else if(rebate){
        return `赔率${rebate}倍`
      }else{
        return ''
      }
    },
    changeMode(mode){
      this.$store.commit('lt_changeMode', mode)
    },
    togglePastOpen(){
      this.$store.state.lt.box === 'pastOpen' ?
         this.$store.commit('lt_changeBox', '') :
           this.$store.commit('lt_changeBox', 'pastOpen')
    },
    toggleBetRecord(){
      this.$store.state.lt.box === 'BetRecord' ?
         this.$store.commit('lt_changeBox', '') :
           this.$store.commit('lt_changeBox', 'BetRecord')
    },
    getSumRebate(index){
      if(!this.award || !this.award.length){
        return ''
      }

      if(index <= 3){
        return this.award ? this.award[8] : ''
      }else if(index >= 4 && index <=11){
        return this.award[index - 4]
      }else{
        return this.award[19 - index]
      }
    },
    //玩法
    choose(item){
      if(!this.award)return
      var _pos = this.chosen.indexOf(item),
          _chosen = this.chosen.slice(0)

      //如果已经存在，就删除该项
      if(_pos > -1){
        _chosen.splice(_pos, 1)
        var tmp = _chosen
      }else{
        if(this.mode === 'G10'){
          //如果是二同号单选
          var firstChar = item.toString()[0]
              ,_x = _chosen.indexOf(+firstChar)
              ,_xx = _chosen.indexOf(+(firstChar + firstChar))
              ,removeArr = [_x, _xx]

          removeArr.forEach(pos=>{
            if(pos > -1){
              _chosen.splice(pos,1)
            }
          })
        }

        //不存在添加该项
        _chosen.push(item)
        //去重加排序
        _chosen = unique(_chosen)
        var tmp = []
        for(var i = 0;i < this.itemArr.length;i++){
          if(_chosen.indexOf(this.itemArr[i]) > -1){
            tmp.push(this.itemArr[i])
          }
        }
      }
      this.$store.commit({
        type:'lt_updateTmp',
        alias: 'K3',
        arr: tmp
      })

      //分行
      var line = cfg[this.mode].line,
          _data = []

      line.forEach(lineArr=>{
        var _l = []
        for(var i = 0;i < lineArr.length;i++){
          if(_chosen.indexOf(lineArr[i]) > -1){
            _l.push(lineArr[i])
          }
        }
        _data.push(_l)
      })

      var betCount = cfg[this.mode].alg(_data)

      this.$store.commit('lt_setBetCount', betCount)
      this.$store.commit('lt_setBetStr', getBetStr(_data, this.mode))
    },
    changeShowPrice(){
      if(!/^\d+$/.test(this.showPrice)|| !(+this.showPrice)){
        this.showPrice = ''
      }

      if(this.showPrice){
        this.$store.commit('lt_setPerbet', +this.showPrice)
        this.$store.commit('lt_setMoney')
      }
    },
    clear(){
      this.showPrice = ''
      this.$store.commit('lt_clearBet')
    },
    confirmBet(){
      if(!this.bet.betting_count){
        layer.alert('请至少选择一注号码投注')
      }else if(!(+this.showPrice)){
        layer.alert('请填写您要投注的金额')
      }else{

        var msg = `${this.LotteryName}: ${this.nowIssue}期<br>
                    投注金额: <span style = "color:red">${this.bet.betting_money}元</span><br>
                    投注内容:${this.chosen.join(' ')}`

        layer.open({
          title:"投注确认",
          style:'width:18em;font-size:.7em',
          shadeClose: false,
          content: msg,
          btn: ['确定', '取消'],
          yes: ()=>{
            var basebet = new BaseBet(this.$store.state)
            if(this.mode === 'A10'){
              basebet.setRebate('180', this.$store.state)
            }
            var basket = deleteCompress([basebet])
            layer.msgWait('正在投注')
            _fetch({
              'Action':'AddBetting',
              'data': {BettingData:basket}
            }).then((json)=>{
              if(json.Code === 1){
                this.showPrice = ''
                // layer.msg(json.StrCode)
                this.$store.commit('lt_clearBet')
                this.$store.commit('lt_changeBox', '')

                //开奖后自己添记录到“我的投注里”
                var totalMoney = basket.map(bet=>bet.betting_money).reduce((a,b)=>a+b)  //本注总金额
                var issueNo = basket[0].betting_issuseNo                                  //期号
                var _betRecord = this.$store.state.lt.BetRecord.slice(0)
                var record = {issueNo: issueNo, normal_money:totalMoney.toFixed(2), openState: '等待开奖'}
                _betRecord.unshift(record)
                if(_betRecord.length > 5){
                  _betRecord.length = 5
                }

                this.$store.commit('lt_setBetRecord', _betRecord)

                // //隔3s获取我的投注
                // this.timer3 = setTimeout(()=>{
                //   this.$store.dispatch('lt_updateBetRecord')
                // }, 3000)

                layer.confirm(`<span style = "color:red">投注成功</span>，您可以在我的账户查看注单详情`
                  ,['继续投注','查看注单']
                  ,()=>{}
                  ,()=>{this.$router.push('/userCenter')})

              }else if(json.Code === -9){
                //清除rebate
                layer.alert(json.StrCode)
                this.$store.dispatch('lt_getRebate', true)
              }else{
                layer.msgWarn(json.StrCode)
              }
            })
          },
          no:()=>{}
        })
      }
    },
    //获得和值的最大获奖
    getMaxAwardA10(){
      var maxAward
      var dsdsRebate = this.award ? this.award[8] : ''  //大小单双的返点在和值的最后一个
      //大小单双选择情况
      var dsds = [
        this.chosen.indexOf('大') > -1,
        this.chosen.indexOf('小') > -1,
        this.chosen.indexOf('单') > -1,
        this.chosen.indexOf('双') > -1
      ]

      var numPart = [], numMax = 0
      this.chosen.forEach(item=>{
        if(['大','小','单','双'].indexOf(item)===-1){
          var award1 = item >= 11 ? this.award[18-item] : this.award[item - 3]
          var award2 = ((item >= 11 && dsds[0]) || (item < 11 && dsds[1])) ? dsdsRebate : 0
          var award3 = (((item % 2 ===1) && dsds[2]) || ((item % 2 ===0) && dsds[3])) ? dsdsRebate : 0
          var award = ((+award1) + (+award2) + (+award3)).toFixed(2)
          numPart.push(award)
        }
      })

      //如果选择的数组中含有数字
      //未考虑完全没有选择任何一个按钮的选项，因为不选不会进入这个程序
      if(this.chosen.some(item=>typeof item === 'number')){
        numMax = Math.max.apply({}, numPart)
        maxAward = numMax
      }else if((dsds[0] || dsds[1]) && (dsds[2] || dsds[3])){
        maxAward = 2 * dsdsRebate
      }else{
        maxAward = dsdsRebate
      }
      return (+this.showPrice * maxAward).toFixed(2)
    },
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/k3.scss';
</style>