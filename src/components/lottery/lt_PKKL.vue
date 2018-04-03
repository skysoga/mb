<template>
  <div class="minIsLotteryCon" @click.stop="togglePastOpen">
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
    <div class="StateStyle2">
      <div class="past">{{openNum(oldIssue)}}开奖：<div class="resultCon">
          <em v-for="(d,i) in display" v-if="i<10">{{d}}</em><ins v-show="display.length>10">&nbsp;...</ins>
        </div>
      </div>
      <div class="current" :class="{'open':ifShowPastOpen}">{{nowIssue}}投注：<em>{{TimeBar}}</em>&nbsp;<i class="iconfont">&#xe601;</i></div>
      <ul :class="{'record':true,'open':ifShowPastOpen}">
        <li class="title">
          <div class="left"><i>期号</i></div>
          <div class="right"><i>开奖号码</i></div>
        </li>
        <li class="fix" v-if = "$store.state.lt.LotteryResults[lcode]&&pastOpen.length" v-for="item in pastOpen">
          <div class="left">{{openNum(item.IssueNo)}}<br>{{item.OpenTime}}</div>
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
    //开奖结果部分
    oldIssue(){
      return state.lt.OldIssue
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
      var arr = state.lt.LotteryResults[this.lcode].map(item=>{
        var el = {}
        el.IssueNo = item.IssueNo.slice(0)        //把年份砍掉
        el.LotteryOpen = item.LotteryOpen.split(',')
        el.OpenTime = item.OpenTime.split(' ')[1] //开奖时间的时分秒
        return el
      })
      try{
      //需要去掉的期数
      var num = arr.length - 8
      if (num>0) {
        for (var i = 0; i < num; i++) {
          arr.pop()
        }
      }
      }catch(e){

      }
      return arr
    },
    ifShowPastOpen(){
      return state.lt.box === 'pastOpen'
    },
  }),
  methods:{
    delEnd(num){
      var num=num.split('+')[0]
      return num
    },
    openNum(arr){
      return arr.length>6?arr.slice(4):arr
    },
    togglePastOpen(){
      this.$store.state.lt.box === 'pastOpen' ?
         this.$store.commit('lt_changeBox', '') :
           this.$store.commit('lt_changeBox', 'pastOpen')
    },
  },
  beforeDestroy(){
    clearInterval(this.timer)
  }
}
</script>
<style lang='scss' scoped>
.StateStyle2{
  font-size: .65em;
  background: #e1d9ba;
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
.resultCon em{
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  background: #faf9f6;
  border-radius: 50%;
  text-align: center;
  margin:0 .05em;
  line-height: 1.7em;
  background: linear-gradient(unquote('to bottom, #f86469 0%,#bf1f24 75%'));
  box-shadow: 0px 2px 1px #bbb59c;
  color:white;
  font-size: 0.85em;
}
.record span{
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  // background: #faf9f6;
  // border-radius: 50%;
  text-align: center;
  margin:0 .05em;
  line-height: 1.7em;
  // background: linear-gradient(unquote('to top, #f86469 0%,#bf1f24 75%'));
  // box-shadow: 0px 2px 1px #bbb59c;
  // color:white;
  color:#e54042;
  font-size: 0.85em;
}
.current,.past{
  padding-left: 1em;
  height: 2.308em;
  line-height: 2.308em;
}
.past::before{
  content: "";
    position: absolute;
    left: 0;
    width: 16rem;
    height: 1px;
    border-top: 1px solid #fff;
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
  .record.open{
    // height: 38.6em;
    display: block;
  }
}
.title{
  text-align: center;
  height: 2.4em;
  font-weight: 400;
  line-height: 2.4em;
  border-bottom: 1px solid #bdb48b;
  em{
    color:#dc3b40;
  }
  i{
    font-size: 1.1em;
  }
  > div{
    padding-top: 0 !important;
  }
  .left{
    border:none !important;
  }
  .right{
    &:before{
      display: none !important;
    }
  }
}
.record{
  background: #e1d9ba;
  line-height: 1.4em;
  // height: 0;
  display: none;
  overflow: hidden;
  border-color: #bdb58b;
  box-shadow: 0 -1px 0 white ;
  position: absolute;
  margin-top: 1px;
  width: 100%;
  font-size: 1em;
  color: #666;
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
      border-right:1px solid #bdb58b;
      text-align: center;
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
