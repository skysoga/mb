<template>
  <div ref="trendchart" class="trendchart-container" :class="$store.state.LotteryType"><!-- K3:代表K3彩种 -->
    <div>
    <div class="tc-back-btn" @click="$store.state.ShowTrendchart = 0"></div>
    <div class="tc-title"><em>{{lotteryName}}走势图</em></div>
    <div style="display: none;" class="lottery-type"><em>大发</em></div>
    <div class="tc-nav">
      <ul class="fix">
        <li v-for="n in AllList.Title" :class="{curr:NavType===n.NavType}" @click="changeShowType(n.Key,n.NavType,n.SubType)"><em>{{n.Name}}</em></li>
      </ul>
      <div class="son-of-tcnav">
        <ul class="fix" v-if="AllList.Title&&AllList.Title[NavType].Nav">
          <li :class="{'curr-son':SubType===n.SubType}" v-for="n in AllList.Title[NavType].Nav"  @click="changeShowType(n.Key,n.NavType,n.SubType)"><em>{{n.Name}}</em></li>
        </ul>
      </div>
    </div>
    <!-- type1:代表第一个查看方式（开奖记录、号码走势、和值走势、形态走势） -->
    <div class="tc-content-container" :class="'type'+showType">
      <vuetable ref="vuetable" :height="contentHeight" :datas="getData" :titles="gettitles" :Trend="Trend" :columns="getcolumns">
        <ul v-if="$refs.vuetable&&getData" slot="datas" v-for="d in getData" class="fix">
          <li v-for="(e,i) in d" :style="{width:($refs.vuetable.widthArr[i+1]>1)?($refs.vuetable.widthArr[i+1]+'px'):'auto'}">
            <!-- class 可设置为：open-num、da、shuang、xiao、dan、sanbutong、sanlianhao、santonghao -->
            <template v-if="Object.prototype.toString.call(e)==='[object Array]'">
              <em v-for="n in e" :class="[n.Css,n.Chart]">{{n.Value}}</em>
            </template>
            <template v-else>
              <em :class="[e.Css,e.Chart]">{{e.Value}}</em>
              <i v-if="e.Pos" class="chonghao">{{e.Pos}}</i>
            </template>
          </li>
        </ul>
      </vuetable>
    </div>
    </div>
  </div>
</template>
<script>
import vuetable from './vuetable';
import {NavCfg,Unique,QiHao} from '../js/TrendChartCFG'

export default{
  components:{
    vuetable,
  },
  computed:{
    lCode:()=>state.lt.lottery.LotteryCode,
    lottery:()=>state.lt.lottery.LotteryType,
    lotteryName:()=>state.lt.lottery.LotteryName,
    getData(){
      return this.AllList.Body&&this.AllList.Body[this.showType]
    },
    gettitles(){
      return this.AllList.Title&&this.AllList.Title[this.NavType].List
    },
    getcolumns(){
      return this.OpenNum&&this.setOpenNum()
    }
  },
  data(){
    return {
      contentHeight:0,
      showType:0,
      NavType:0,
      SubType:0,
      Trend:0,
      AllList:[],
      OpenNum:[]//初始数据
    }
  },
  mounted(){
    this.contentHeight = this.$refs.trendchart.offsetHeight - (2.3+2)*em    
  },
  created(){
    this.getBackData(this.lCode,0,20,()=>{
      this.setListAll()
      this.$refs.vuetable.changing()
    })
  },
  methods:{
    setOpenNum(){
      //重置期号 IssueNo  QiHao
      var OpenNum=JSON.parse(JSON.stringify(this.OpenNum))
      var Arr=[]
      for(var i=0;i<OpenNum.length;i++){
        OpenNum[i].IssueNo=QiHao(OpenNum[i],this.lCode)
        Arr.push(OpenNum[i])
      }
      return Arr
    },
    changeShowType(v,NavType,SubType){
      this.showType = v
      this.NavType = NavType
      this.SubType = SubType
      this.$refs.vuetable.changing()
      this.setChartLine()
    },
    setChartLine(){
      var key=this.lottery+this.NavType
      if(key==='K32'||key==='SSC1'){
        this.Trend=1
        this.$nextTick(()=>{
          setTimeout(()=>{
            this.$refs.vuetable.getListNum()            
          },0)
        })
      }else{
        this.Trend=0
      }
    },
    // 设置各行数据
    setFun(Arr){
      var list=[]
      var fun=Arr&&Arr.fun
      var OpenNum=this.OpenNum      
      var lottery=this.lottery
      for(var i=0;i<fun.length;i++){
        var line=[]
        var FArr=fun[i]
          //IssueNo,  LotteryOpen
        for(var j=0;j<OpenNum.length;j++){
          var cos=[]
          var key=OpenNum[j]
          for(var k=0;k<FArr.length;k++){            
            var name=FArr[k].toString()
            var K3Num=name.indexOf('K3Num')>-1
            var K3Chart=name.indexOf('K3Chart')>-1
            var SSCChart=name.indexOf('SSCChart')>-1
            if(K3Num||K3Chart||SSCChart){
              cos=cos.concat(FArr[k](key,lottery))
            }else{
              cos.push(FArr[k](key,lottery))
            }            
          }
          line.push(cos)
        }
        list.push(line)
      }
      Arr.Body=list
      return Arr
    },
    setListAll(){
      if(NavCfg[this.lottery]){
        this.AllList=this.setFun(NavCfg[this.lottery])
      }
    },
    getBackData(Code,IssueNo,DataNum,fun){
      var ajax={
        Action:"GetLotteryOpen",
        LotteryCode:Code,
        IssueNo:IssueNo,
        DataNum:DataNum
      }
      _fetch(ajax).then(json=>{
        if(json.Code===1){
          var data=JSON.parse(JSON.stringify(this.OpenNum))
          var BackData=json.BackData
          var arr=data.concat(BackData)       
          this.OpenNum=Unique(arr)
          fun()
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
  position: relative;
  z-index: 2;
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