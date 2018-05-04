<template>
  <div ref="trendchart" class="trendchart-container" :class="$store.state.LotteryType"><!-- K3:代表K3彩种 -->
    <div>
    <div class="tc-back-btn" @click="$store.state.ShowTrendchart = 0"></div>
    <div class="tc-title"><em>走势图</em></div>
    <div style="display: none;" class="lottery-type"><em>大发</em></div>
    <div class="tc-nav">
      <ul class="fix">
        <li v-for="n,key in AllList.Title" :class="{curr:showType===key}" @click="changeShowType(key)"><em>{{n.Name}}</em></li>
      </ul>
    </div>
    <!-- type1:代表第一个查看方式（开奖记录、号码走势、和值走势、形态走势） -->
    <div class="tc-content-container" :class="'type'+showType">
      <vuetable ref="vuetable" :height="contentHeight" :datas="getData" :titles="gettitles" :columns="getcolumns">
        <ul v-if="$refs.vuetable&&getData" slot="datas" v-for="d in getData" class="fix">
          <li v-for="(e,i) in d" :style="{width:($refs.vuetable.widthArr[i+1]>1)?($refs.vuetable.widthArr[i+1]+'px'):'auto'}">
            <!-- class 可设置为：open-num、da、shuang、xiao、dan、sanbutong、sanlianhao、santonghao -->
            <em :class="e.Css">{{e.Value}}</em>
            <i v-if="e.Pos" class="chonghao">{{e.Pos}}</i>
          </li>
        </ul>
      </vuetable>
    </div>
    </div>
  </div>
</template>
<script>
import vuetable from './vuetable';

//文案配置

var Title={
    K3Num:[1,2,3,4,5,6],//号码分布
    K3Chart:[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],//号码走势
    K3KJJL:['期号','开奖','和值','大小','单双'],
    K3HMZS:['期号','开奖','和值','跨度',1,2,3,4,5,6],
    K3HZZS:['期号','开奖','大小','单双',3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
    K3XTZS:['期号','开奖','三同号','三不同','三连号']
}

//配置值
/**@augments
 * Value 正常值
 * Chart 是否显示走势
 * Css   背景样式
 * Pos   是否有重号值
 */
function setValue(Value,Chart,Css,Pos){
  return {
    Value:Value||'',
    Chart:Chart?'OpenNo':'',
    Css:Css||'',
    Pos:Pos||''
  }
}

// 函数库
function QiHao(key,lCode){//期号
  var str=key.IssueNo
  switch(lCode){
    case '1201':
    case '1202':
    str=str.slice(-2)
    break;    
    case '1008':
    case '1300':
    case '1304':
    case '1407':
    str=str.slice(-4)
    break;
    default:
    str=str.slice(-3)
    break;
  }
  return str
}

function KaiJiang(key,type){
  return setValue(key.LotteryOpen,0,0,0)
}

function HeZhi(key,type){
  var num=key.LotteryOpen.split(',')
      num=num.reduce((a,b)=>Number(a)+Number(b))
  return setValue(num,0,0,0)
}
function HeDaXiao(key,type){
  var num=HeZhi(key)
  var str=''
  switch(type){
    case 'K3':
    str=num>11?'大':'小'
    break;
    case 'SSC':
    str=num>22?'大':'小'
    break;
  }
  return setValue(str,0,0,0)
}
//计算重复数
function getNum(arr,num){
  var n=0
  for(var i=0;i<arr.length;i++){
    if(arr[i]===num){
      n+=1
    }
  }
  return n>1?n:''
}

function setNumber(key){
  var num=key.LotteryOpen.split(',')
  var n=[]
  for(var i=0,l=num.length;i<l;i++){
    if(n.indexOf(num[i])===-1){
      n.push(num[i])
    }
  }
  return n
}


function DanShuang(key,type){
  var num=HeZhi(key)
      num=num%2?'单':'双'
  return setValue(num,0,0,0)
}
function KuaDu(key,type){
  var num=key.LotteryOpen.split(',')
  var max=Math.max.apply(null,num)
  var min=Math.min.apply(null,num)
  return setValue(max-min,0,0,0)
}
function FengBu(key,type){
  var Arr=Title.K3Num
  var num=key.LotteryOpen.split(',')  
  return Arr.map((v,i,a)=>{
          return num.indexOf(v+'')>-1?setValue(v,0,'open-num',getNum(num,v+'')):setValue('',0,0,0)
        })
}
function Chart(key,type){
  return ''
}
function SanTongHao(key,type){
  var n=setNumber(key)
  return n.length===1?setValue('三同号',0,'santonghao',0):setValue('',0,0,0)
}
function SanBuTong(key,type){
  var n=setNumber(key)
  return n.length===3?setValue('三不同',0,'sanbutong',0):setValue('',0,0,0)
}
function SanLianHao(key,type){
  var strNum = key.toString();
      for(var i = 0,test = strNum[0];i<strNum.length;i++,test = parseInt(test),test++){
          if(strNum[i]!==test+""){
              return '';
          }
      }  
  return setValue('三连号',0,'sanlianhao',0)
}


var NavCfg={
  'K3':{
    Title:[{Name:'号码记录',List:Title.K3KJJL},{Name:'号码走势',List:Title.K3HMZS},{Name:'和值走势',List:Title.K3HZZS},{Name:'形态走势',List:Title.K3XTZS}],
    Body:[],
    fun:[[KaiJiang,HeZhi,HeDaXiao,DanShuang],[KaiJiang,HeZhi,KuaDu,FengBu],[KaiJiang,HeDaXiao,DanShuang,Chart],[KaiJiang,SanTongHao,SanBuTong,SanLianHao]]
  },
  'SSC':{
    Title:[{Name:'号码记录',List:Title.K3KJJL},{Name:'号码走势',List:Title.K3HMZS},{Name:'龙虎斗',List:[]},{Name:'和值',List:[]},{Name:'跨度',List:[]}],
    Body:[],
    fun:[]
  },
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
      return this.AllList.Body&&this.AllList.Body[this.showType]
    },
    gettitles(){
      return this.AllList.Title&&this.AllList.Title[this.showType].List
    },
    getcolumns(){
      return this.OpenNum&&this.setOpenNum()
    }
  },
  data(){
    return {
      contentHeight:0,
      showType:0,
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
      var OpenNum=this.OpenNum
      var Arr=[]
      for(var i=0;i<OpenNum.length;i++){
        OpenNum[i].IssueNo=QiHao(OpenNum[i],this.lCode)
        Arr.push(OpenNum[i])
      }
      return Arr
    },
    changeShowType(v){
      this.showType = v
      this.$refs.vuetable.changing()
    },
    // 设置各行数据
    setFun(Arr){
      var list=[]
      var fun=Arr&&Arr.fun
      var OpenNum=this.OpenNum
      for(var i=0;i<fun.length;i++){
        var line=[]
        var FArr=fun[i]
          //IssueNo,  LotteryOpen
        for(var j=0;j<OpenNum.length;j++){
          var cos=[]
          var key=OpenNum[j]
          for(var k=0;k<FArr.length;k++){
            var name=FArr[k].name
            switch(name){
              case 'FengBu':
              cos=cos.concat(FArr[k](key,this.lottery))
              break;
              default:
              cos.push(FArr[k](key,this.lottery))
              break;
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
          this.OpenNum=json.BackData
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