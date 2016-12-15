<template>
  <div class="fix" v-if = "$store.state.lt.OldIssue">
    <!-- 倒计时 -->
    <div class="lotteryClose"
         @click.stop = "toggleBetRecord"
         :class = "{active:ifShowBetRecord}">
      <span>{{nowIssue}}期投注截止</span>
      <div class="waitNumber">
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
        <td>{{item.issueNo.slice(4)}}</td>
        <td>
          {{item.normal_money}}
        </td>
        <td :class = "{award: !isNaN(+item.openState)}">{{item.openState}}</td>
      </tr>

    </table>

  </div>

</template>

<script>
export default{
  created(){
  },
  computed:{
    nowIssue:()=>state.lt.NowIssue.slice(4),
    TimeBar:()=>state.lt.TimeBar,
    BetRecord(){
      var Record = state.lt.BetRecord
      if(!Record || Record.length === 0){
        var emptyObj = {issueNo:'xxxx', normal_money:'', openState:''}
        Record = [0,0,0,0,0].map(item=>emptyObj)
      }
      return Record
    },
    ifShowBetRecord(){
      return this.$store.state.lt.box === 'BetRecord'
    }
  },
  methods:{
    //彩种选择框，切换
    toggleBetRecord(){
      this.$store.state.lt.box === 'BetRecord' ?
         this.$store.commit('lt_changeBox', '') :
           this.$store.commit('lt_changeBox', 'BetRecord')
    }
  }

}
</script>

<style lang = "scss" scoped>
  @import '../../scss/isLotteryCon.scss';
</style>