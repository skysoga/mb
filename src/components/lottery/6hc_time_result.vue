<template>
<div class = "isLotteryCon">
  <!-- 开奖号码 -->
  <div class = "result"  v-if = "$store.state.lt.OldIssue" @click.stop = "togglePastOpen">
    <span class = "text-small">
      {{oldIssue}}期开奖号码 <i class = "iconfont">&#xe601;</i>
    </span>

    <div class = "openNumber">
      <div v-for = "(numStr, index) in openNumbers" v-if = "index < 6" class = "number-box">
        <em :class = "{red:inArray(red, numStr), blue:inArray(red, numStr), green:inArray(green, numStr)}">{{numStr}}</em>
        <span class = "number-box-text">{{getAnimal(numStr)}}</span>
      </div>
      <div class = "number-box"><span class = "symbol">+</span></div>
      <div class = "number-box">
        <em :class = "{red:inArray(red, openNumbers[6]), blue:inArray(red, openNumbers[6]), green:inArray(green, openNumbers[6])}">{{openNumbers[6]}}</em>
        <span class = "number-box-text">{{getAnimal(openNumbers[6])}}</span>
      </div>
      <!-- <div class = "number-box"><em class = "red">07</em><span class = "number-box-text">兔</span></div> -->
    </div>
  </div>

  <!-- 倒计时 -->
  <div class = "timebar"  v-if = "$store.state.lt.NowIssue"  @click.stop = "togglePastOpen"  >
    <div class = "timebar-issue">
      <p>{{nowIssue}}期</p>
      <p>投注截止</p>
    </div>
    <h4>{{TimeBar}}</h4>
  </div>

  <div class = "past-open" v-if = "ifShowPastOpen">
    <table class = "past-open-table">
      <thead>
        <tr>
          <th>期号</th><th>开奖号码</th><th>开奖日期</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for = "n in 8" >
          <td>2017056</td>
          <td class = "past-open-result">
            <div class = "past-open-result-box"><em class = "red">07</em><span>兔</span></div>
            <div class = "past-open-result-box"><em class = "green">05</em><span>兔</span></div>
            <div class = "past-open-result-box"><em class = "blue">15</em><span>兔</span></div>
            <div class = "past-open-result-box"><em class = "blue">10</em><span>兔</span></div>
            <div class = "past-open-result-box"><em class = "red">01</em><span>兔</span></div>
            <div class = "past-open-result-box"><em class = "blue">09</em><span>兔</span></div>
            <div class = "past-open-result-box"><span class = "symbol">+</span></div>
            <div class = "past-open-result-box"><em class = "blue">03</em><span>兔</span></div>
          </td>
          <td>17.05.12</td>
        </tr>

      </tbody>
    </table>
  </div>

</div>
</template>

<script>
import {createStringArray, getAnimal} from '../../js/kit'

export default {
  data(){
    return {
      openNumbers:['07','05','15','10','01','09','03'],
      red:['01','02','07','08','12','13','18','19','23','24','29','30','34','35','40','45','46'],
      blue:['03','04','09','10','14','15','20','25','26','31','36','37','41','42','47','48'],
      green:['05','06','11','16','17','21','22','27','28','32','33','38','39','43','44','49'],
      // wait4Results:['01','01','01','01','01','01','01']
    }
  },
  methods:{
    getAnimal:getAnimal,
    inArray(arr, item){
      return arr.indexOf(item) > -1
    },
    togglePastOpen(){
      this.$store.state.lt.box === 'pastOpen' ?
         this.$store.commit('lt_changeBox', '') :
           this.$store.commit('lt_changeBox', 'pastOpen')
    },
  },
  created(){
    // function circle(numStr){
    //   var num = +numStr
    //   num++
    //   if(num > 49){
    //     return '01'
    //   }else{
    //     return ('0' + num).slice(0,2)
    //   }
    // }
    // var arr = ['01','01','01','01','01','01','01']
    // setInterval(()=>{
    //   arr = arr.map(circle)
    //   this.wait4Results = arr
    // },40)
  },
  computed:{
    ifShowPastOpen(){
      return state.lt.box === 'pastOpen'
    },
    TimeBar(){
      return this.$store.state.lt.TimeBar
    },
    nowIssue(){
      var nowIssue = this.$store.state.lt.NowIssue
      return nowIssue.length < 8 ? nowIssue : nowIssue.slice(4)
    },
    oldIssue(){
      var oldIssue = this.$store.state.lt.OldIssue
      return oldIssue.length < 8 ? oldIssue : oldIssue.slice(4)
    },
    results(){
      var code = this.$route.params.code
      var _results = this.$store.state.lt.LotteryResults[code]
      if(!_results || !_results.length){
        return []
      }else{
        return _results[0].LotteryOpen.split(',').slice(0,20)
      }
    },
    // openNumbers(){
    //   return this.wait4Results
    // }
  }
}
</script>

<style lang = "scss" scoped>
@mixin bg-linear-gradient($v){
  background: -ms-linear-gradient(unquote($v));
  background: -moz-linear-gradient(unquote($v));
  background: linear-gradient(unquote('to '+$v));
  background: -webkit-linear-gradient(unquote($v));
}

.isLotteryCon{
  display: flex;
  position: fixed;
  top:2.3em;
  left: 0;
  width: 100%;
  background: #e1d9ba;
  z-index: 5;
  height: 4.2rem;
}

.result{
  flex:2;
  margin-top:.2rem;
}

.timebar{
  flex:1;
  border-left:1px solid #bdb48b;
}

.symbol{
  font-size:1.2em;
  padding:0.1rem;
}

.openNumber{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width:100%;
  height:2.8rem;
  padding:0 .6rem;
  font-size:.7em;
}

.number-box{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height:2.2rem;
  /*border: 1px solid #aaa;*/
  em{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.8em;
    height: 1.8em;
    /*background: #dc3b40;*/
    @include bg-linear-gradient('top, #f86469 0%,#bf1f24 75%')
    box-shadow: 0px 3px 1px #bbb59c;
    border-radius: 50%;
    color:white;
    font-size: 0.8em;
  }

  em.red{
    background: #dc3b40;
  }

  em.blue{
    background: #218ddd;
  }

  em.green{
    background: #38b366;
  }
}

.number-box-text{margin-top:.2rem;}

.text-small{
  font-size:.7em;
  margin-left:1rem;
}

.past-open{
  position: absolute;
  top:4.2rem;
  left:0;
  width:100%;
  height:22rem;
  border-top:1px solid #fff;
  background: #e1d9ba;
}

.past-open-table{
  width:100%;
  font-size:.7em;
  th{
    font-weight:400;
    line-height:2.4em;
    border-bottom:1px solid #bdb48b;
  }
  td{
    padding:0.4rem 0.4rem;
  }
}

.past-open-result{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  border-left: 1px solid #bdb48b;
}

td.past-open-result{
  padding:0.4rem 0.7rem;
}

.past-open-result::before{
  content:"-";
  position:absolute;
  left:-0.2em;
  top:0.7rem;
}

.past-open-result-box{
  width:1rem;
  display: flex;
  flex-wrap:wrap;
  justify-content: center;
  flex:1;
  font-size: 0.7em;

  em{
    font-size:1.3em;
  }

  .red{
    color:#dc3b40;
  }

  .blue{
    color:#218ddd;;
  }

  .green{
    color:#38b366;
  }
}


.timebar-issue{
  padding:0.2rem;
  font-size:.7em;
  text-align: center
}

.timebar h4{
  margin-top:0.2rem;
  text-align: center;
  font-weight:400;
}

</style>