<template>
  <div class="lottery_sscCon">
    <div  class = "lottery_ssc">
      <div class="DontSelect sscActive">
        <!-- 头部： 玩法选择， 同类彩种选择-->
        <lt-header></lt-header>
        <time-result></time-result>

        <div class = "sscMain">
          <bet-tip :award = "renderAward" :tip = "tip" :itemArr = "bonusText[lotteryMode]"></bet-tip>

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
import lt_header from '../components/lottery/lt_header'
import lt_result from '../components/lottery/lt_result'
import lt_timebar from '../components/lottery/lt_timebar'
import lt_footer from '../components/lottery/lt_footer'
import lt_PKKL from '../components/lottery/lt_PKKL'
import bet_tip from '../components/lottery/bet_tip'
import colorbox from '../components/lottery/colorbox'
import normal_box from '../components/lottery/normal_box'
import combobox from '../components/lottery/combobox'
import time_result from '../components/lottery/6hc_time_result'
import lt_footer1 from '../components/lottery/lt_footer1'
import {renderConfig} from '../js/page_config/lt_6hc'
import {C, natal, animals} from '../js/kit'
export default {
  created(){
    this.$store.commit({
      type:'lt_updateTmp',
      alias: '6HC',
      arr: []
    })
  },
  components:{
      'lt-header': lt_header,
      'lt-result': lt_result,
      'lt-timebar': lt_timebar,
      'lt-footer': lt_footer,
      'bet-tip': bet_tip,
      'colorbox': colorbox,
      'normal-box': normal_box,
      'combobox': combobox,
      'lt-footer1': lt_footer1,
      'time-result': time_result
  },
  data(){
    return {
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
      renderConfig:renderConfig, //页面配置
      perbet:'',
      poultry: ['牛','马','羊','鸡','狗','猪'],//家禽
      wild: ['鼠','虎','兔','龙','蛇','猴'], //野兽
    }
  },
  computed:mapState({
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
    renderOdds(){
      var mode = this.mode
      var award = this.award.map(item=>item/2)
      var odds = []

      var arrayHandler = {
        'A02':()=>{
          var res = []
          // 野兽家禽（哪个含本命）
          if(this.wild.indexOf(natal) > -1){
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
        if(this.wild.indexOf(natal) > -1){
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
        var natalIndex = animals.indexOf(natal)
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
      return C(this.chosen.length, this.renderItem.alg)
    },
  }),
  methods:{
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

      var lotteryCode = this.$store.state.lt.lottery.LotteryCode
      var nowIssue = this.$store.state.lt.NowIssue
      var lotteryName = this.$store.state.lt.lottery.LotteryName
      var betMoney = this.betCount * this.perbet
      var bet = {
        lottery_code: lotteryCode,
        play_detail_code: lotteryCode + this.mode,
        betting_number: this.betStr,
        betting_count: this.betCount,
        betting_money: betMoney,
        betting_point: '',    //还没好
        betting_model: 1,
        betting_issuseNo: nowIssue,
        graduation_count:1
      }
      var basket = [bet]

      var msg = `${lotteryName}: ${nowIssue}期<br>
                    投注金额: <span style = "color:red">${betMoney}元</span><br>
                    投注内容:${this.betStr}`
      layer.open({
        title:"投注确认",
        style:'width:18em;font-size:.7em',
        shadeClose: false,
        content: msg,
        btn: ['确定', '取消'],
        yes: ()=>{
          this.$store.dispatch('lt_confirmBet1', basket)
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
  padding-top:6.8rem;
  padding-bottom:6rem;
}
</style>