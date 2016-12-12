<template>
  <div v-if = "$store.state.lt.OldIssue">
    <div class="isLottery" @click.stop = "togglePastOpen">
      <span>{{oldIssue}}期开奖号码<i class="iconfont">&#xe601;</i></span>
      <!-- 开奖号码 -->
      <div class="openNumber">
        <em v-for = "item in display">{{item}}</em>
      </div>
    </div>

    <template v-if = "$store.state.lt.LotteryResults[lcode]">
      <table class="pastOpen" v-show = "ifShowPastOpen">
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
export default {
  created(){
    [,this.ltype, this.lcode] = this.$route.fullPath.slice(1).split('/')
    function circle(num){
      num ++
      if(num > 9){
        return 0
      }else{
        return num
      }
    }
    var arr = [0,0,0,0,0]
    setInterval(()=>{
      arr = arr.map(circle)
      this.wait4Results = arr
    },40)
    console.log(state.lt.OldIssue)
  },
  data(){
    return {
      wait4Results:[0,0,0,0,0],
      ltype: '',    //彩种类型
      lcode: '',    //彩种code
    }
  },
  watch:{
    $route(){
      [,this.ltype, this.lcode] = this.$route.fullPath.slice(1).split('/')
    }
  },
  computed:{
    oldIssue:()=>state.lt.OldIssue.slice(4),
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
    pastOpen(){
      return state.lt.LotteryResults[this.lcode].map(item=>{
        var el = {}
        el.IssueNo = item.IssueNo.slice(4)        //把年份砍掉
        el.LotteryOpen = item.LotteryOpen.split(',')
        el.OpenTime = item.OpenTime.split(' ')[1] //开奖时间的时分秒
        return el
      })
    },
    ifShowPastOpen(){
      return this.$store.state.lt.box === 'pastOpen'
    }
  },
  methods:{
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
</style>