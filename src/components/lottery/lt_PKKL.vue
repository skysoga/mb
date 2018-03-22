<template>
  <div class="minIsLotteryCon" @click="isShow=!isShow">
<!--     <template>
      <div class="title">{{nowIssue}}期投注截至：<em>{{TimeBar}}</em></div>
      <ul :class="{'record':true,'open':isShow}">
        <li class="fix" v-for="item in pastOpen">
          <div class="left">第{{item.IssueNo}}期<br>{{item.OpenTime}}</div>
          <div class="right">
            <template v-if="ltype==='KL8'">
              <div class="line1">
                <a v-for = "(num,key) in item.LotteryOpen" v-if="key<10"><span>{{num}}</span></a>
              </div>
              <div class="line2">
                <a v-for = "(num,key) in item.LotteryOpen" v-if="key>9&&key<20"><span>{{delEnd(num)}}</span></a>
              </div>
            </template>
            <div class="line1" v-else>
              <a v-for = "num in item.LotteryOpen"><span>{{num}}</span></a>
            </div>
          </div>
        </li>
      </ul>
      <div :class="{'lernMore':true,'close':!isShow}"><em class="iconfont"><i>&#xe64c;</i></em></div>
  </template> -->
    <div class="StateStyle2" v-if = "$store.state.lt.LotteryResults[lcode]&&pastOpen.length">
      <div class="past">{{openNum(pastOpen[0].IssueNo)}}期开奖：
        <div class="resultCon">
          <em v-for="(d,i) in display" v-if="i<10">{{d}}</em><ins v-show="pastOpen[0].LotteryOpen.length>10">&nbsp;...</ins>
        </div>
      </div>
      <div class="current" :class="{'open':isShow}">{{nowIssue}}期投注：<em>{{TimeBar}}</em>&nbsp;<i class="iconfont">&#xe601;</i></div>
      <ul :class="{'record':true,'open':isShow}">
        <li class="fix" v-for="item in pastOpen">
          <div class="left">第{{openNum(item.IssueNo)}}期<br>{{item.OpenTime}}</div>
          <div class="right">
            <template v-if="ltype==='KL8'">
              <div class="line1">
                <a v-for = "(num,key) in item.LotteryOpen" v-if="key<10"><span>{{num}}</span></a>
              </div>
              <div class="line2">
                <a v-for = "(num,key) in item.LotteryOpen" v-if="key>9&&key<20"><span>{{delEnd(num)}}</span></a>
              </div>
            </template>
            <div class="line1" v-else>
              <a v-for = "num in item.LotteryOpen"><span>{{num}}</span></a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default{
  created(){
    [,this.ltype, this.lcode] = this.$route.fullPath.slice(1).split('/')
    function circle(num){
      num ++
      if(num > 10){
        return '01'
      }else{
        return num>9?num+'':('0'+num)
      }
    }
    var arr = ['01','01','01','01','01','01','01','01','01','01']
    this.timer = setInterval(()=>{
      arr = arr.map(circle)
      this.wait4Results = arr
    },40)
  },
  data(){
    return{
      isShow:false,
      wait4Results:['01','01','01','01','01','01','01','01','01','01'],
      ltype: '',    //彩种类型
      lcode: '',    //彩种code
      timer:null,
    }
  },
  watch:{
    $route(){
      [,this.ltype, this.lcode] = this.$route.fullPath.slice(1).split('/')
    }
  },  
  computed:mapState({
    nowIssue:()=>{
      var nowIssue = state.lt.NowIssue
      return nowIssue.length < 8 ? nowIssue : nowIssue.slice(4)
    },
    TimeBar:()=>state.lt.TimeBar,
    display(){
      return state.lt.displayResults ? this.results : this.wait4Results
    },
    results(){
      var _results = state.lt.LotteryResults[this.lcode]
      if(!_results || !_results.length){
        return []
      }else{
        return _results[0].LotteryOpen.split(',').slice(0,20)
      }
    },
    pastOpen(){
      return state.lt.LotteryResults[this.lcode].map(item=>{
        var el = {}
        el.IssueNo = item.IssueNo.slice(0)        //把年份砍掉
        el.LotteryOpen = item.LotteryOpen.split(',')
        el.OpenTime = item.OpenTime.split(' ')[1] //开奖时间的时分秒
        return el
      })
    }    
  }),
  methods:{
    delEnd(num){
      var num=num.split('+')[0]
      return num
    },
    openNum(arr){
      return arr.length>6?arr.slice(4):arr
    }
  },
  beforeDestroy(){
    clearInterval(this.timer)
  }
}
</script>
<style lang='scss' scoped>
.StateStyle2{
  font-size: .65em;
  margin: .12em 0;
  line-height: 2.2;
  .resultCon{
    display: inline-block;
    em{
      &:first-child{
        margin-left: 0;
      }
      &:last-child{
        margin-right: 0;
      }
    }
  }
  ins{
    position: absolute;
  }
}
.resultCon em,.record span{
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  background: #faf9f6;
  border-radius: 50%;
  text-align: center;
  margin:0 .05em;
  line-height: 1.7em;
  background: linear-gradient(unquote('to top, #f86469 0%,#bf1f24 75%'));
  box-shadow: 0px 2px 1px #bbb59c;
  color:white;
  font-size: 0.85em;
}
.current,.past{
  padding-left: 1em;

}
.current{
  &:before{
    position: absolute;
    margin-left: -1em;
    content:'';
    width: 100%;
    height: 1px;
    display: block;
    background-image: -webkit-linear-gradient(90deg, #bdb48b, #bdb48b 50%, transparent 50%);
  }
  &.open{
    i{
      transform:rotate(180deg);
    }
  }
  em{
    color:#dc3b40;
  }
  i{
    transition: .5s;
    display: inline-block;
  }
}
.minIsLotteryCon{
  position: fixed;
  top: 2.3em;
  left: 0;
  width: 100%;
  z-index: 6;
  background: #e1d9ba;
  .record.open{
    height: 38.6em;
  }
}
.title{
  text-align: center;
  font-size: .65em;
  line-height: 2em;
  height: 1.9em;
  background: #f5f1e5;
  em{
    color:#dc3b40;
  }
}
.record{
  background: #ece6d2;
  font-size: .65em;
  line-height: 1.4em;
  color: #333;
  transition: .6s;
  height: 0;
  overflow: hidden;
  background: #f5f1e5;
  border-color: #bdb58b;
  box-shadow: 0 -1px 0 #bdb58b ;
  position: absolute;
  margin-top: 2px;
  width: 100%;
  font-size: 1em;
  li{
    .left,.right{
      float: left;
      padding-top: 1em;
    }
    &:last-child{
      .left,.right{
        padding-bottom: 1em;
      }
    }
    .left{
      width: 7.8em;
      padding-left: 1em;
      border-right:1px solid #bdb58b;
    }
    .right{
      position: relative;
      width: 16.5em;
      padding-left: 1.3em;
      a{
      }
      &:before{
        content:"";
        display: block;
        position: absolute;
        left: -.315em;
        top:2.2em;
        width: .3em;
        height: .3em;
        border-radius: .4em;
        /*box-shadow: 0 0 0 .2em #bdb58b;*/
        border:.15em solid #bdb58b;
        background: #f5f1e5;
      }
    }
  }
}
.lernMore{
  border-top: 1px solid #bdb58b;
  em{
    background: #f5f1e5;
    display: block;
    margin:0 auto;
    width: 4.8em;
    color: #d3cdaf;
    margin-top: -1px;
    text-align: center;
    border:1px solid #bdb58b;
    border-top: 1px solid #f5f1e5;
    border-radius: .6em;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    font-size: .6em;
    height: .9em;
    line-height: .75em;
    i{
      display: block;
      /*transition: .6s;*/
      transform:rotate(180deg);
    }
  }
  &.close{
    i{
      transform:rotate(0);
    }
  }
}
</style>
