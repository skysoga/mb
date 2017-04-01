<template>
  <div class="minIsLotteryCon" @click="isShow=!isShow">
    <div class="title">{{nowIssue}}期投注截至：<em>{{TimeBar}}</em></div>
    <ul :class="{'record':true,'open':isShow}">
      <li class="fix" v-for="item in pastOpen">
        <div class="left">第{{item.IssueNo}}期<br>{{item.OpenTime}}</div>
        <div class="right">
          <div class="line1">
            <a v-for = "num in item.LotteryOpen"><span>{{num}}</span></a>
          </div>
          <!-- <div class="line2">
          </div> -->
        </div>
      </li>
    </ul>
    <div :class="{'lernMore':true,'close':!isShow}"><em class="iconfont"><i>&#xe64c;</i></em></div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
export default{
  data(){
    return{
      isShow:false,
      ltype: '',    //彩种类型
      lcode: '',    //彩种code
    }
  },
  watch:{
    $route(){
      [,this.ltype, this.lcode] = this.$route.fullPath.slice(1).split('/')
    }
  },
  created(){
    [,this.ltype, this.lcode] = this.$route.fullPath.slice(1).split('/')
  },
  computed:mapState({
    nowIssue:()=>{
      var nowIssue = state.lt.NowIssue
      return nowIssue.length < 8 ? nowIssue : nowIssue.slice(4)
    },
    TimeBar:()=>state.lt.TimeBar,
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

  }
}
</script>
<style lang='scss' scoped>
.minIsLotteryCon{
  position: fixed;
  top: 2.3em;
  left: 0;
  width: 100%;
  z-index: 5;
  .record.open{
    height: 12.3em;
    border-top:1px solid #bdb58b;
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
  transition: 1s;
  height: 0;
  overflow: hidden;
  background: #f5f1e5;
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
    }
    .right{
      position: relative;
      width: 65%;
      border-left:1px solid #bdb58b;
      padding-left: 1.52em;
      &:before{
        content:"";
        display: block;
        position: absolute;
        left: -.18em;
        top:2em;
        width: .3em;
        height: .3em;
        border-radius: .4em;
        box-shadow: 0 0 0 .2em #bdb58b;
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
    }
  }
  &.close{
    i{
      transform:rotate(180deg);
    }
  }
}
</style>
