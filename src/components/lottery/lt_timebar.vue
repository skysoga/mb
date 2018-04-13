<template>
  <div class="lotteryCloseItem fix" v-if = "$store.state.lt.OldIssue" :class = "{active:ifShowBetRecord}">
    <!-- 倒计时 -->
    <div class="lotteryClose"
         @click.stop = "togglePastOpen">
      <span>{{nowIssue}}期投注截止</span>
      <div class="openNumber-01">
        <em>{{TimeBar}}</em>
      </div>
    </div>

    <!-- 我的投注 -->
    <table class="pastOpen" v-show = "ifShowBetRecord">
      <tr>
        <th>期号</th>
        <th>投注金额</th>
        <th>奖金</th>
      </tr>

      <tr v-for = "item in BetRecord">
        <td>{{item.issueNo.length < 7 ? item.issueNo : item.issueNo.slice(4)}}</td>
        <td>
          {{item.normal_money}}
        </td>
        <td :class = "{award: !isNaN(+item.openState)}">{{item.openState}}</td>
      </tr>
    </table>

    <template v-if = "$store.state.lt.LotteryResults[lcode]">
      <table class="pastOpen" v-show = "ifShowPastOpen" >
        <tr>
          <th>期号</th>
          <th>开奖号码</th>
          <th>开奖时间</th>
        </tr>
        <!-- 历史开奖的列表 -->
        <tr v-for = "item in pastOpen">
          <td>{{item.IssueNo}}</td>
          <td>
            <a v-for = "num in item.LotteryOpen"><span>{{num}}</span></a>
          </td>
          <td>{{item.OpenTime}}</td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default{
  computed:mapState({
    nowIssue:()=>{
      var nowIssue = state.lt.NowIssue
      return nowIssue.length < 8 ? nowIssue : nowIssue.slice(4)
    },
    TimeBar:()=>state.lt.TimeBar,
    BetRecord(){
      var Record = state.lt.BetRecord
      if(!Record || Record.length === 0){
        var emptyObj = {issueNo:'    ', normal_money:'', openState:''}
        Record = [0,0,0,0,0].map(item=>emptyObj)
      }
      return Record
    },
    ifShowBetRecord(){
      return state.lt.box === 'BetRecord'
    },
    ifShowPastOpen(){
      return state.lt.box === 'pastOpen'
    }
  }),
  methods:{
    //彩种选择框，切换
    toggleBetRecord(){
      this.$store.state.lt.box === 'BetRecord' ?
         this.$store.commit('lt_changeBox', '') :
           this.$store.commit('lt_changeBox', 'BetRecord')
    },
    togglePastOpen(){
      this.$store.state.lt.box === 'pastOpen' ?
         this.$store.commit('lt_changeBox', '') :
           this.$store.commit('lt_changeBox', 'pastOpen')
    },
  }

}
</script>

<style lang = "scss" scoped>
@import '../../scss/isLotteryCon.scss';
.openNumber-01{
  em{
    background: none;
    color:#333;
    width: inherit;
    font-size: .9em;
    box-shadow: none;
  }
}
.lotteryCloseItem.active{
  &:after{
    left: initial;
    right: 0;
  }
}
</style>