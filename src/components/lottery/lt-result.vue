<template>
  <div>

    <div class="isLottery" >
      <span>{{oldIssue}}期开奖号码<i class="iconfont">&#xe601;</i></span>
      <div class="openNumber">
        <em v-for = "item in display">{{item}}</em>
        <!-- <em>2</em><em>3</em><em>5</em><em>6</em><em>7</em> -->
      </div>
    </div>

    <table class="pastOpen">
      <tr>
        <th>期号</th>
        <th>开奖号码</th>
        <th>开奖时间</th>
      </tr>

      <tr v-for = "item in pastOpen">
        <td>{{item.IssueNo}}</td>
        <td>
          <a v-for = "num in item.LotteryOpen"><span>{{num}}</span></a>
        </td>
        <td>{{item.OpenTime}}</td>
      </tr>
<!--
      <tr>
        <td>1128040</td>
        <td><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a></td>
        <td>8</td>
        <td>大</td>
        <td>单</td>
      </tr>
      <tr>
        <td>1128040</td>
        <td><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a></td>
        <td>8</td>
        <td>大</td>
        <td>单</td>
      </tr>
      <tr>
        <td>1128040</td>
        <td><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a></td>
        <td>8</td>
        <td>大</td>
        <td>单</td>
      </tr>
      <tr>
        <td>1128040</td>
        <td><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a></td>
        <td>8</td>
        <td>大</td>
        <td>单</td>
      </tr>
      <tr>
        <td>1128040</td>
        <td><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a></td>
        <td>8</td>
        <td>大</td>
        <td>单</td>
      </tr>
      <tr>
        <td>1128040</td>
        <td><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a></td>
        <td>8</td>
        <td>大</td>
        <td>单</td>
      </tr>
      <tr>
        <td>1128040</td>
        <td><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a></td>
        <td>8</td>
        <td>大</td>
        <td>单</td>
      </tr>
      <tr>
        <td>1128040</td>
        <td><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a></td>
        <td>8</td>
        <td>大</td>
        <td>单</td>
      </tr>
      <tr>
        <td>1128040</td>
        <td><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a></td>
        <td>8</td>
        <td>大</td>
        <td>单</td>
      </tr>
      <tr>
        <td>2228040</td>
        <td><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a><a><span>20</span></a></td>
        <td>82</td>
        <td>大</td>
        <td>单</td>
      </tr> -->
    </table>
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

    console.log(state.lt.LotteryResults)
    if(!state.lt.LotteryResults[this.lcode]){
      store.commit({
        type: 'lt_setLotteryResult',
        code: this.lcode,
        results:[]
      })
    }

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
    results:()=>state.lt.resultNums,
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
    }
  }
}
</script>

<style lang = "scss" scoped>
  @import '../../scss/newssc.scss';
</style>