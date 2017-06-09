<template>
  <div class="lottery_sscCon">
    <div :class="{'lottery_ssc':true,'KL8':this.$parent.ltype=='KL8','PK10':this.$parent.ltype=='PK10'}">
      <div class="DontSelect sscActive">
        <!-- 头部： 玩法选择， 同类彩种选择-->
        <lt-header></lt-header>

        <time-result></time-result>


        <!-- 开奖号码 以及 投注截止时间  -->
        <div class="isLotteryCon" v-if = "false">
          <!-- 开奖结果和历史开奖结果 -->
          <lt-result></lt-result>
          <!-- 倒计时和我的投注 -->
          <lt-timebar></lt-timebar>
        </div>

        <div class = "sscMain">
          <bet-tip :award = "award" :tip = "tip" :itemArr = "bonusText[lotteryMode]"></bet-tip>
          <!-- 三色玩法框(01-49) -->
          <colorbox v-if = "renderItem.box === 'colorbox'"
                    @choose = "choose"
                    :chosen = "chosen"></colorbox>

          <!-- 号码/赔率 -->
          <normal-box v-if = "renderItem.box === 'normalbox'"
                      :itemArr = "renderItem.itemArr"
                      @choose = "choose"
                      :chosen = "chosen"></normal-box>

          <!-- 复合型 -->
          <combobox v-if = "renderItem.box === 'combobox'"
                    :itemArr = "renderItem.itemArr"
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


        <!-- 倍和单位， 确认投注， 号码篮 -->
        <!-- <lt-footer></lt-footer> -->
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
import time_result from '../components/lottery/time_result'
import lt_footer1 from '../components/lottery/lt_footer1'
import {renderConfig} from '../js/page_config/lt_6hc'
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
      bonusText: {},
      renderConfig:renderConfig, //页面配置
      perbet:'',
    }
  },
  computed:mapState({
    tip:()=>state.lt.mode.tip,      //提示
    award:()=>state.lt.award,        //奖金
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
  padding-top:4.2rem;
  padding-bottom:6rem;
}
</style>