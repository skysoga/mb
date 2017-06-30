<template>
  <div class="lottery_sscCon">
    <div  class = "lottery_ssc">
      <div class="DontSelect sscActive">
        <!-- 头部： 玩法选择， 同类彩种选择-->
        <lt-header></lt-header>

        <time-result></time-result>

        <div class = "sscMain">
          <div class="sscTips" v-if = "!tipDisplayFlag && tipOverLong">
            <p>
              {{actualTip}}
              <span @click = "toggleDetail(true)" style = "color:#218ddd;">详细</span>
            </p>
          </div>

          <bet-tip v-else :award = "renderAward" :tip = "tip" :itemArr = "bonusText[lotteryMode]" :isOdds = "true">
            <span v-if = "tipDisplayFlag" @click = "toggleDetail(false)" style = "color:#218ddd;">收起</span>
          </bet-tip>

          <!-- 三色玩法框(01-49)(无赔率) -->
          <colorbox v-if = "renderItem.box === 'colorbox'"
                    @choose = "choose"
                    :chosen = "chosen"></colorbox>

          <!-- 号码/赔率 -->
          <normal-box v-if = "renderItem.box === 'normalbox'"
                      :itemArr = "renderItem.itemArr"
                      :renderOdds = "renderOdds"
                      @choose = "choose"
                      :chosen = "chosen"></normal-box>

          <!-- 复合型(号码/赔率/示例) -->
          <combobox v-if = "renderItem.box === 'combobox'"
                    :itemArr = "renderItem.itemArr"
                    :renderOdds = "renderOdds"
                    :egArr = "renderItem.egArr"
                    :needAward = "renderItem.needAward"
                    @choose = "choose"
                    :chosen = "chosen"></combobox>
        </div>

        <lt-footer1 :betStr = "betStr"
                    :betCount = "betCount"
                    v-model = "perbet"
                    @clearBet = "clearBet"
                    @confirmBet = "confirmBet"></lt-footer1>

      </div>
    </div>


  </div>
</template>

<script>
import {mapState} from 'vuex'
import lt_header from '../components/lottery/lt_header1'
import bet_tip from '../components/lottery/bet_tip'
import colorbox from '../components/lottery/colorbox'
import normal_box from '../components/lottery/normal_box'
import combobox from '../components/lottery/combobox'
import time_result from '../components/lottery/6hc_time_result'
import lt_footer1 from '../components/lottery/lt_footer1'
import {renderConfig, animals, getAnimalIndex} from '../js/page_config/lt_6hc'
import {C} from '../js/kit'

export default {
  created(){
    this.$store.commit({
      type:'lt_updateTmp',
      alias: '6HC',
      arr: []
    })
  },
  components:{
      'lt-header': lt_header,  //头部切换玩法，和其他彩种不太一致
      'bet-tip': bet_tip,      //玩法说明
      'colorbox': colorbox,    //三色投注框
      'normal-box': normal_box,//两面投注框
      'combobox': combobox,    //复合投注框
      'lt-footer1': lt_footer1, //投注确认框
      'time-result': time_result //倒计时及开奖结果显示
  },
  data(){
    return {
      // 彩种的显示文本
      bonusText: {
        '6HCC02':['中二','中特'],
        '6HCC04':['二中','中特'],
        '6HCE03':['含本命','不含本命'],
        '6HCE04':['含本命','不含本命'],
        '6HCE05':['含本命','不含本命'],
        '6HCF02':['含0尾', '不含0尾'],
        '6HCF03':['含0尾', '不含0尾'],
        '6HCF04':['含0尾', '不含0尾'],
      },
      perbet:'',
      poultry: ['牛','马','羊','鸡','狗','猪'],//家禽
      wild: ['鼠','虎','兔','龙','蛇','猴'], //野兽
      ellipsisWidth: 46,
    }
  },
  computed:mapState({
    // 6HC的页面信息配置
    renderConfig(){
      var animalEgMode = ['E01','E02']
      animalEgMode.forEach(mode=>{
        renderConfig[mode].egArr = animals.map(char=>this.getAnimalEg(char, this.natal))
      })
      return renderConfig
    },
    tip:()=>state.lt.mode.tip,      //提示
    award:()=>state.lt.award,        //奖金（当前玩法）
    renderAward(){
      var award = this.award
      if(Array.isArray(award)){
        return award.map(item=>(+item/2).toString())
      }else{
        return  (+award/2).toString()
      }
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
    natal(){
      return this.$store.getters.lt_natal
    },
    // 用于渲染的赔率
    renderOdds(){
      if(!Array.isArray(this.award)){
        return null
      }
      var mode = this.mode
      var award = this.award.map(item=>item/2)
      var odds = []

      var arrayHandler = {
        'A02':()=>{
          var res = []
          // 野兽家禽（哪个含本命）
          if(this.wild.indexOf(this.natal) > -1){
            // 如果含本命的是野兽
            var tmp = award[4]
            award[4] = award[5]
            award[5] = tmp
          }

          var refer = [4,4,4,2,1,1,1,2]
          for(var i = 0;i < award.length;i++){
            for(var j = 0;j < refer[i]; j++){
              res.push(award[i])
            }
          }
          return res
        }
      }

      // 两面（特码和正特）
      var liangmian = ()=>{
        var res = []
        // 野兽家禽（哪个含本命）
        if(this.wild.indexOf(this.natal) > -1){
          // 如果含本命的是野兽
          var tmp = award[4]
          award[4] = award[5]
          award[5] = tmp
        }

        var refer = [4,4,4,2,1,1,1,2]
        for(var i = 0;i < award.length;i++){
          for(var j = 0;j < refer[i]; j++){
            res.push(award[i])
          }
        }
        return res
      }

      // 特肖
      var benming = ()=>{
        var res = []
        var natalIndex = animals.indexOf(this.natal)
        for(var i = 0;i < 12;i++){
          if(i === natalIndex){
            res.push(award[0])
          }else{
            res.push(award[1])
          }
        }
        return res
      }

      //特码头尾
      var tematouwei = ()=>{
        var res = []
        var refer = [1,4,1,9]
        for(var i = 0;i < award.length;i++){
          for(var j = 0;j < refer[i]; j++){
            res.push(award[i])
          }
        }
        return res
      }


      if(Array.isArray(award)){
        switch(mode){
          case 'A02':
          case 'B09':
          case 'B10':
          case 'B11':
          case 'B12':
          case 'B13':
          case 'B14':
            odds = liangmian()
            break;
          case 'E01':
          case 'E02':
            odds = benming()
            break;
          case 'E03':
          case 'E04':
          case 'E05':
            odds = []
            break;
          case 'F01':
            odds = tematouwei()
            break;
          default:
            odds = award
        }
      }

      return odds
    },
    mode:()=>state.lt.mode.mode,
    lottery:()=>state.lt.lottery.LotteryType,
    lotteryMode(){
      return [this.lottery, this.mode].join('')
    },
    renderItem(){
      return this.renderConfig[this.mode]
    },
    chosen(){
      return this.$store.state.lt.tmp['6HC']
    },
    // 不再使用vuex去共享--看看效果，如果比较好就用这个
    betStr(){
      return this.chosen.join(',')
    },
    betCount(){
      return Math.round(C(this.chosen.length, this.renderItem.alg))
    },
  }),
  methods:{
    //获取各个生肖的示例文字
    getAnimalEg(char, natal){
      if(animals.indexOf(char) === -1){
        return false
      }

      var eg = []
      var tmp = getAnimalIndex(char, natal)
      if(tmp === 0){
        tmp = 12
      }
      while(tmp <= 49){
        eg.push(tmp)
        tmp = tmp + 12
      }
      return eg.join(',')
    },
    toggleDetail(bool){
      this.$store.commit('lt_showFullTip', bool)
    },
    choose(item, order){
      var chosen = this.chosen.slice()
      if(chosen.indexOf(item) === -1){
        //添加并排序
        chosen.push(item)
        chosen.sort((a,b)=>{
          var pos1 = order.indexOf(a)
          var pos2 = order.indexOf(b)
          return pos1 - pos2
        })
      }else{
        // 已经存在就删除
        var pos = chosen.indexOf(item)
        chosen.splice(pos,1)
      }

      // 全部用vuex中的tmp['6HC']作为存储
      this.$store.commit({
        type:'lt_updateTmp',
        alias: '6HC',
        arr: chosen
      })
    },
    // 清空当前选号
    clearBet(){
      this.perbet = ''
      this.$store.commit({
        type:'lt_updateTmp',
        alias: '6HC',
        arr: []
      })
    },
    // 确认投注
    confirmBet(){
      if(!this.betCount){
        layer.alert('请至少选择一注号码投注')
        return
      }else if(!(+this.perbet)){
        layer.alert('请填写您要投注的金额')
        return
      }

      var lt = this.$store.state.lt
      var lotteryCode = lt.lottery.LotteryCode
      var nowIssue = lt.NowIssue
      var lotteryName = lt.lottery.LotteryName
      var betMoney = this.betCount * this.perbet
      var rebate = lt.Rebate[this.lottery]

      var lotteryMode = lotteryCode + this.mode
      var chosen = this.chosen


      // 关于生肖的处理
      var sxLotteryMode = ['1301E01','1301E02','1301E03','1301E04','1301E05'] //和生肖相关的玩法
      var poultryWild = ['1301A02','1301B09','1301B10','1301B11','1301B12','1301B13','1301B14']  //家禽野兽相关玩法
      var lwMode = ['1301F02','1301F03','1301F04']  //尾数
      if(sxLotteryMode.indexOf(lotteryMode) > -1){
        //对生肖进行转换
        chosen = chosen.map(char=>getAnimalIndex(char, this.natal))
      }else if(poultryWild.indexOf(lotteryMode) > -1){
         //转成数字，排序，再以空格为分隔拼起
        var annimal2Index = (arr)=>arr.map(char=>getAnimalIndex(char, this.natal)).sort((a,b)=>a-b).join(' ')
        var poultryStr = annimal2Index(this.poultry)
        var wildStr = annimal2Index(this.wild)
        chosen = chosen.map(char=>{
          var item = char;
          if(char === '家禽'){
            item = `家禽(${poultryStr})`
          }else if(char === '野兽'){
            item = `野兽(${wildStr})`
          }
          return item
        })
      }else if(lwMode.indexOf(lotteryMode) > -1){
        chosen = chosen.map(char=>char[0])
      }

      var betStr = chosen.join(',')

      var bet = {
        lottery_code: lotteryCode,
        play_detail_code: lotteryCode + this.mode,
        betting_number: betStr + `@${this.natal}`,
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
                    投注内容: <br>${this.betStr}`
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
              that.perbet = ''
            }
          })
          // this.$store.dispatch('lt_confirmBet1', basket)
        },
        no:()=>{}
      })
    }
  }
}
</script>

<style lang = "scss" scoped>
@import '../scss/newssc.scss';
.sscMain{
  padding-top:6.5em;
  padding-bottom:6rem;
}

.sscTips{
  margin:0 0.6em;
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