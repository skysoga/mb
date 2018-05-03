<template>
  <div ref="trendchart" class="trendchart-container" :class="$store.state.LotteryType"><!-- K3:代表K3彩种 -->
    <div>
    <div class="tc-back-btn" @click="$store.state.ShowTrendchart = 0"></div>
    <div class="tc-title"><em>走势图</em></div>
    <div style="display: none;" class="lottery-type"><em>大发</em></div>
    <div class="tc-nav">
      <ul class="fix">
        <li :class="{curr:showType===1}" @click="changeShowType(1)"><em>开奖记录</em></li>
        <li :class="{curr:showType===2}" @click="changeShowType(2)"><em>号码走势</em></li>
        <li :class="{curr:showType===3}" @click="changeShowType(3)"><em>和值走势</em></li>
        <li :class="{curr:showType===4}" @click="changeShowType(4)"><em>形态走势</em></li>
      </ul>
    </div>
    <!-- type1:代表第一个查看方式（开奖记录、号码走势、和值走势、形态走势） -->
    <div class="tc-content-container" :class="'type'+showType">
      <vuetable ref="vuetable" :height="contentHeight" :datas="getData" :titles="gettitles" :columns="OpenNum">
        <ul v-if="$refs.vuetable" slot="datas" v-for="d in getData" class="fix">
          <li v-for="(e,i) in d" :style="{width:($refs.vuetable.widthArr[i+1]>1)?($refs.vuetable.widthArr[i+1]+'px'):'auto'}">
            <!-- class 可设置为：open-num、da、shuang、xiao、dan、sanbutong、sanlianhao、santonghao -->
            <em class="">{{e}}</em>
            <!-- <i class="chonghao">2</i> -->
          </li>
        </ul>
      </vuetable>
    </div>
    </div>
  </div>
</template>
<script>
import vuetable from './vuetable';

//配置值
function setValue(Value,Chart,Css,Pos){
  return {
    Value:Value||'',
    Chart:Chart?'openNo':'',
    Css:Css||'',
    Pos:Pos||false
  }
}

//文案配置

var Title={
    K3num:[1,2,3,4,5,6],//号码分布
    K3chart:[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],//号码走势
    K3KJJL:['期号','开奖','和值','大小','单双'],
    K3HMZS:['期号','开奖','和值','跨度',1,2,3,4,5,6],
    K3HZZS:['期号','开奖','大小','单双',3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
    K3XTZS:['期号，开奖，三同号，三不同，三连号']
}

var NavCfg={
  'K3':{
    Title:[{Name:'号码记录',List:Title.K3KJJL},{Name:'号码走势',List:Title.K3HMZS},{Name:'和值走势',List:Title.K3HZZS},{Name:'形态走势',List:Title.K3XTZS}],
    Body:[]
  },
  'SSC':[],
}
export default{
  components:{
    vuetable,
  },
  computed:{
    lCode:()=>state.lt.lottery.LotteryCode,
    lottery:()=>state.lt.lottery.LotteryType,
    lotteryName:()=>state.lt.lottery.LotteryName,
    getData(){
      // return this.datas1      
    },
    gettitles(){
      // return this.titles1      
    },
    getcolumns(){
      // return this.columns1
    },
  },
  data(){
    return {
      contentHeight:0,
      showType:1,
      datas1:[
        [123,12,'大','单'],
      ],
      titles:['期号','开奖','和值','大小','单双'],
      OpenNum:[]
    }
  },
  mounted(){
    this.contentHeight = this.$refs.trendchart.offsetHeight - (2.3+2)*em
  },
  created(){
    this.getBackData(this.lCode,0,20)
  },
  methods:{
    changeShowType(v){
      this.showType = v
      this.$refs.vuetable.changing()
    },
    setListAll(){
      if(NavCfg[this.lottery]){
        NavCfg[this.lottery].Title

      }
    },
    getBackData(Code,IssueNo,DataNum){
      var ajax={
        Action:"GetLotteryOpen",
        LotteryCode:Code,
        IssueNo:IssueNo,
        DataNum:DataNum
      }
      _fetch(ajax).then(json=>{
        if(json.Code===1){
          this.OpenNum=json.BackData
        }else{
          layer.msgWarn(json.StrCode)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.trendchart-container{
  height: 100%;
}
.tc-back-btn,.tc-title,.lottery-type{
  position: absolute;
  margin-top:-2.3em;
  height: 2.3em;
  line-height: 1em;
  background: black;
  line-height: 2.3em;
  color: white;
}
.tc-back-btn{
  width: 4em;
  padding-left: .4em;
  z-index: 2;
  &:before{
    content:'\e60a';
    font-family: 'iconfont';
  }
}
.tc-title{
  pointer-events: none;
  width: 100%;
  text-align: center;
  z-index: 1;
  em{
    width: 10em;
    display: inline-block;
    text-align: center;
    font-size: .9em;
  }
}
.lottery-type{
  width: 4em;
  text-align: right;
  em{
    &:after{
      content: '\e61e';
      font-family: 'iconfont';
      font-size: .8em;
      margin-left: .4em;
    }
  }
}
.tc-nav{
  height: 2em;
  line-height: 2em;
  ul{
    li{
      width: 25%;
      float: left;
      text-align: center;
      em{
        font-size: .7em;
        display: block;
      }
    }
  }
  .curr{
    box-shadow: 0 2px 0;
  }
}
</style>