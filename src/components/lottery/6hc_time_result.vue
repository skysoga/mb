<template>
<div class="isLotteryCon">
  <!-- 开奖号码 -->
  <div class="result"  v-if="$store.state.lt.OldIssue" @click.stop="togglePastOpen">
    <span class="text-small" :class="{'show-list':ifShowPastOpen}">
      {{oldIssue}}期开奖号码 <i class="iconfont">&#xe601;</i>
    </span>

    <div class="openNumber"  v-if="!displayResults">
      <template v-for="(numStr, index) in results">
          <div class="number-box plus" v-if="index === 6"><em class="symbol">+</em></div>
          <div :class="['number-box','nocolor']">
            <em :class="numColor[numStr*1]">{{numStr}}</em>
            <span class="number-box-text">{{getAnimal(numStr,results.natal)}}</span>
          </div>
      </template>
    </div>
    <div class="openNumber"  v-else>
      <template v-for="(numStr, index) in results.LotteryOpen">
          <div class="number-box plus" v-if="index === 6"><em class="symbol">+</em></div>
          <div :class="['number-box']">
            <em :class="numColor[numStr*1]">{{numStr}}</em>
            <span class="number-box-text">{{getAnimal(numStr,results.natal)}}</span>
          </div>
      </template>
    </div>
  </div>

  <!-- 倒计时 -->
  <div class="timebar"  v-if = "$store.state.lt.NowIssue"  @click.stop = "togglePastOpen"  >
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
        <tr v-for = "item in pastOpen" >
          <td>{{item.IssueNo}}</td>
          <td class = "past-open-result">
            <template v-for = "(numStr, index) in item.LotteryOpen">
              <div class = "past-open-result-box" v-if="index === 6"><span class = "symbol">+</span></div>
              <div class = "past-open-result-box">
                <em :class = "numColor[numStr*1]">{{numStr}}</em>
                <span>{{getAnimal(numStr,item.natal)}}</span>
              </div>
            </template>
          </td>
          <td>{{item.OpenTime}}</td>
        </tr>

      </tbody>
    </table>
  </div>

</div>
</template>

<script>
import {numColor,getAnimal} from '../../js/page_config/lt_6hc'
import {createStringArray} from '../../js/kit'
export default {
  data(){
    return {
      numColor,
      // red:['01','02','07','08','12','13','18','19','23','24','29','30','34','35','40','45','46'],
      // blue:['03','04','09','10','14','15','20','25','26','31','36','37','41','42','47','48'],
      // green:['05','06','11','16','17','21','22','27','28','32','33','38','39','43','44','49'],
      wait4Results:['01','01','01','01','01','01','01'],
      timer:null,
    }
  },
  methods:{
    getAnimal(numStr,natal){
      // console.log(natal)
      return getAnimal(numStr, natal||this.natal)
    },
    inArray(arr, item){
      return arr.indexOf(item) > -1
    },
    togglePastOpen(){
      if(this.$store.state.lt.box === 'pastOpen'){
        this.$store.commit('lt_changeBox', '')
      }else{
        this.$store.commit('lt_changeBox', 'pastOpen')
      }
    }
  },
  created(){
    function circle(numStr){
      var num = +numStr
      num++
      if(num > 49){
        return '01'
      }else{
        return ('0' + num).slice(0,2)
      }
    }
    var arr = ['01','01','01','01','01','01','01']
    this.timer = setInterval(()=>{
      arr = arr.map(circle)
      this.wait4Results = arr
    },40)
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
      }else if(!this.displayResults){
        return this.wait4Results
      }else{
        return {
          LotteryOpen:_results[0].LotteryOpen.split(',').slice(0,20),
          natal:_results[0].natal
        }
      }
    },
    pastOpen(){
      var code = this.$route.params.code
      var showTime=['1300'].indexOf(code)>-1
      return state.lt.LotteryResults[code].map(item=>{
        var el = {}
        el.IssueNo = item.IssueNo.length === 7 ? item.IssueNo :item.IssueNo.slice(4)        //把年份砍掉
        el.LotteryOpen = item.LotteryOpen.split(',').map(str=>('0' + str).slice(-2))
        var mdy = item.OpenTime.split(' ')[0] //开奖时间的年月日
        var sTime= item.OpenTime.split(' ')[1]
        var [year,month, date] = mdy.split('/')
        year = year.slice(-2)
        month = ('0' + month).slice(-2)
        date = ('0' + date).slice(-2)
        el.OpenTime =showTime?sTime:`${year}.${month}.${date}`
        el.natal=item.natal
        return el
      })
    },
    displayResults(){
      return this.$store.state.lt.displayResults
    },
    natal(){
      return this.$store.getters.lt_natal
    }
  },
  beforeDestroy(){
    clearInterval(this.timer)
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
.show-list{
  i{
    transform:rotate(180deg);
  }
}
.isLotteryCon{
  color:#333;
  position: fixed;
  top:2.3em;
  left: 0;
  width: 100%;
  background: #e1d9ba;
  z-index: 5;
  height: 3.75em;
}

.result{
  float: left;
  padding-top:.24em;
  border-top: 1px solid white;
  width: 68%;
}

.timebar{
  float: left;
  position: relative;
  border-top: 1px solid white;
  width: 32%;
  &:before{
    content:'';
    display: block;
    position: absolute;
    height: calc(3.75em - 1px);
    width: 1px;
    background-image: -webkit-linear-gradient(0deg, #bdb48b, #bdb48b 50%, transparent 50%);
    left: 0;
    top:0;
  }
}

.up{
  margin-top:-1rem;
}


.openNumber{
  width:100%;
  padding:0 .6em;
  margin-top:.46em;
  font-size:.7em;
  display: table;
  table-layout: fixed;
}

.number-box{
  vertical-align: top;
  display: table-cell;
  margin:0 .3em;
  text-align: center;
  em,span{
    width: 100%;
    display: block;
    margin:0 auto;
    text-align: center;
  }
  em{
    height: 1.8em;
    width: 1.8em;
    line-height: 1.8em;
    box-shadow: 0px 2px 1px #bbb59c;
    border-radius: 50%;
    color:white;
    font-size: 0.8em;
    margin-bottom:.4em;
  }

  em.red{
    @include bg-linear-gradient('top, #f87b7e 0%,#dc3b40 75%')
  }

  em.blue{
    @include bg-linear-gradient('top, #6ebefa 0%,#218ddd 75%')
  }

  em.green{
    @include bg-linear-gradient('top, #69d893 0%,#38b366 75%')
  }
  &.plus{
    width: 1em;
    em{
      color:#333;
      box-shadow: none;
      font-size: 1.1em;
      line-height: 1.2em;
      width: 100%;
    }
  }
  &:first-child,&:last-child{
    margin-right: 0;
  }
  span{
    line-height: 1em;
  }

  &.nocolor{
  em{
    background: linear-gradient(to top, #bbb59c 0%,#bbb59c 75%);
    background: -webkit-linear-gradient(top, #bbb59c 0%,#bbb59c 75%);
  }
  }
}

.text-small{
  font-size:.7em;
  line-height: 1.3em;
  margin-left:1em;
  display: block;
  i{
    display: inline-block;
    transition:.5s;
  }
}

.past-open{
  position: absolute;
  top:3.74em;
  left:0;
  width:100%;
  min-height:10rem;
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
    color:#666;
  }
  td{
    padding:0.2rem 0.4rem;
    &:first-child,&:last-child{
      width:5.6em;
      color:#666;
    }
  }
}

.past-open-result{
  position: relative;
  border-left: 1px solid #bdb48b;
}

td.past-open-result{
  padding:0.2rem 0.7rem;
  padding-right: .3rem;
}

.past-open-result::before{
  content:"";
  width: .8em;
  height: 1px;
  background: #a7a182;
  position:absolute;
  left:-.4em;
  top:50%;
}

.past-open-result-box{
  font-size: 0.7em;
  text-align: center;
  float: left;
  width: 12.5%;
  em{
    font-size:1.3em;
    display: block;
  }
  span{
    color:#666;
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
  padding-top:.24em;
  font-size:.7em;
  line-height: 1.5em;
  text-align: center
}

.timebar h4{
  color:#333;
  text-align: center;
  font-weight:400;
}

</style>
