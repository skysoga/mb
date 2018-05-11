//文案配置

var Title={
    K3Num:[1,2,3,4,5,6],//号码分布
    K3Chart:[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],//号码走势
    SSCChart:[0,1,2,3,4,5,6,7,8,9],//时时彩走势
    Zhi:[1,2,3,5,7],//质
    He:[0,4,6,8,9],//合
    K3KJJL:['期号','开奖','和值','大小','单双'],
    K3HMZS:['期号','开奖','和值','跨度',1,2,3,4,5,6],
    K3HZZS:['期号','开奖','大小','单双',3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
    K3XTZS:['期号','开奖','三同号','三不同','三连号'],
    SSCKJJL:['期号','开奖号码','万位','千位','百位','十位','个位'],
    SSCHMZS:['期号','大小','单双','质合','0','1','2','3','4','5','6','7','8','9'],
    SSCLHD:['期号','万千','万百','万十','万个','千百','千十','千个','百十','百个','十个']
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
    Value:Value,
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

function SSCKaiJiang(key,type){
  return setValue(key.LotteryOpen.replace(/\,/g,' '),0,0,0)
}

function getAnd(key){
  var num=key.LotteryOpen.split(',')
  num=num.reduce((a,b)=>Number(a)+Number(b))
  return num
}

function HeZhi(key,type){
  var num=getAnd(key)
  return setValue(num,0,0,0)
}
function HeDaXiao(key,type){
  var num=getAnd(key)
  var str=''
  switch(type){
    case 'K3':
    str=num>11?'大':'小'
    break;
    case 'SSC':
    str=num>22?'大':'小'
    break;
    default:
    str=''
    break;
  }
  return setValue(str,0,str?(str==='大'?'da':'xiao'):'',0)
}

//单值大小
function DaXiao(num,type,bool){
  var str=''
  switch(type){
    case 'K3':
    str=num>11?'大':'小'
    break;
    case 'SSC':
    str=num>4?'大':'小'
    break;
    default:
    str=''
    break;
  }
  return setValue(str,0,str?(str==='大'?'da':(!bool?'dan':'xiao')):'',0)
}
//单值单双
function DanShuang(num,bool){
  return num%2?setValue('单',0,'dan',0):setValue('双',0,!bool?'da':'shuang',0)  
}
//单值质合
function ZhiHe(num){
  var He=Title.He
  return He.indexOf(+num)>-1?setValue('合',0,'da',0):setValue('质',0,'dan',0)
}

//大小单双万位
function dxdsWan(key,type){  
  return setdxds(key,type,0)
}
//大小单双千位
function dxdsQian(key,type){
  return setdxds(key,type,1)
}
//大小单双百位
function dxdsBai(key,type){
  return setdxds(key,type,2)
}
//大小单双十位
function dxdsShi(key,type){
  return setdxds(key,type,3)
}
//大小单双个位
function dxdsGe(key,type){
  return setdxds(key,type,4)
}

function setdxds(key,type,n){
  var Arr=[]
  var num=key.LotteryOpen.split(',')[n]
      Arr.push(DaXiao(num,type,true))
      Arr.push(DanShuang(num,true))
  return Arr
}

function WanDaXiao(key,type){
  var num=key.LotteryOpen.split(',')[0]
  return DaXiao(num,type)
}
function WanDanShuang(key,type){
  var num=key.LotteryOpen.split(',')[0]
  return DanShuang(num)
}
function WanZhihe(key,type){
  var num=key.LotteryOpen.split(',')[0]
  return ZhiHe(num)
}
function WanChart(key,type){
  var Arr=Title.SSCChart
  var num=key.LotteryOpen.split(',')[0]
  return setChart(Arr,+num)
}

function QianDaXiao(key,type){
  var num=key.LotteryOpen.split(',')[1]
  return DaXiao(num,type)
}
function QianDanShuang(key,type){
  var num=key.LotteryOpen.split(',')[1]
  return DanShuang(num)
}
function QianZhihe(key,type){
  var num=key.LotteryOpen.split(',')[1]
  return ZhiHe(num)
}
function QianChart(key,type){
  var Arr=Title.SSCChart
  var num=key.LotteryOpen.split(',')[1]
  return setChart(Arr,+num)
}

function BaiDaXiao(key,type){
  var num=key.LotteryOpen.split(',')[2]
  return DaXiao(num,type)
}
function BaiDanShuang(key,type){
  var num=key.LotteryOpen.split(',')[2]
  return DanShuang(num)
}
function BaiZhihe(key,type){
  var num=key.LotteryOpen.split(',')[2]
  return ZhiHe(num)
}
function BaiChart(key,type){
  var Arr=Title.SSCChart
  var num=key.LotteryOpen.split(',')[2]
  return setChart(Arr,+num)
}

function ShiDaXiao(key,type){
  var num=key.LotteryOpen.split(',')[3]
  return DaXiao(num,type)
}
function ShiDanShuang(key,type){
  var num=key.LotteryOpen.split(',')[3]
  return DanShuang(num)
}
function ShiZhihe(key,type){
  var num=key.LotteryOpen.split(',')[3]
  return ZhiHe(num)
}
function ShiChart(key,type){
  var Arr=Title.SSCChart
  var num=key.LotteryOpen.split(',')[3]
  return setChart(Arr,+num)
}

function GeDaXiao(key,type){
  var num=key.LotteryOpen.split(',')[4]
  return DaXiao(num,type)
}
function GeDanShuang(key,type){
  var num=key.LotteryOpen.split(',')[4]
  return DanShuang(num)
}
function GeZhihe(key,type){
  var num=key.LotteryOpen.split(',')[4]
  return ZhiHe(num)
}
function GeChart(key,type){
  var Arr=Title.SSCChart
  var num=key.LotteryOpen.split(',')[4]
  return setChart(Arr,+num)
}

//龙虎斗

function WanQianLh(key,type){
  return getLHH(key,0,1)
}
function WanBaiLh(key,type){
  return getLHH(key,0,2)
}
function WanShiLh(key,type){
  return getLHH(key,0,3)
}
function WanGeLh(key,type){
  return getLHH(key,0,4)
}
function QianBaiLh(key,type){
  return getLHH(key,1,2)
}
function QianShiLh(key,type){
  return getLHH(key,1,3)
}
function QianGeLh(key,type){
  return getLHH(key,1,4)
}
function BaiShiLh(key,type){
  return getLHH(key,2,3)
}
function BaiGeLh(key,type){
  return getLHH(key,2,4)
}
function ShiGeLh(key,type){
  return getLHH(key,3,4)
}

//龙虎和计算
function getLHH(key,n,m){
  var num=key.LotteryOpen.split(',').map(v=>+v)
  if(num[n]>num[m]){
    return setValue('龙',0,'da',0)
  }else if(num[n]<num[m]){
    return setValue('虎',0,'dan',0)
  }else{
    return setValue('和',0,'shuang',0)
  }
  return {}
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
//和单双
function HeDanShuang(key,type){
  var num=getAnd(key)
      num=DanShuang(+num)
  return num
}
//跨度
function KuaDu(key,type){
  var num=key.LotteryOpen.split(',')
  var max=Math.max.apply(null,num)
  var min=Math.min.apply(null,num)
  return setValue(max-min,0,0,0)
}
//号码分布
function FengBu(key,type){
  var Arr=Title.K3Num
  var num=key.LotteryOpen.split(',')
  return Arr.map((v,i,a)=>{
    return num.indexOf(v+'')>-1?setValue(v,0,'open-num',getNum(num,v+'')):setValue('',0,0,0)
  })
}

//和值走势
function Chart(key,type){
  var Arr=Title.K3Chart
  var num=getAnd(key)
  return setChart(Arr,num)
}

//号码走势
function setChart(Arr,num){
  return Arr.map((v,i,a)=>{
    return num===v?setValue(v,1,'open-num',0):setValue('',0,0,0)
  })
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
  var strNum = key.LotteryOpen.replace(/\,/g,'').toString();
  var n=true
      for(var i = 0,test = strNum[0];i<strNum.length;i++,test = parseInt(test),test++){
          if(strNum[i]!==test+""){
            n=false
          }
      }
  return n?setValue('三连号',0,'sanlianhao',0):setValue('',0,0,0)
}

function Unique(data){
  var arr=[]
  var obj={}
  for(var i=0,l=data.length;i<l;i++){
    var str=data[i].OpenTime
    if(!obj[str]&&arr.length<20){
      obj[str]=1
      arr.push(data[i])
    }
  }
  return arr.sort((a,b)=>new Date(b.OpenTime).getTime()-new Date(a.OpenTime).getTime())
}

function ChartTrend(Type){
  var Objdiv=document.getElementById('fakeTable')
  var chart_canvas=document.getElementById('ChartCanvas')      
  clearChart()
  var Nums=Objdiv.querySelectorAll('ul').length
  if(!Nums)return;
  var tdleng=Objdiv.querySelectorAll('ul')[0].querySelectorAll('.OpenNo').length
  for(var i=0;i<tdleng;i++){
    for(var x=0;x<Nums-1;x++){
      var start=Objdiv.querySelectorAll('ul')[x].querySelectorAll('.OpenNo')[i]
      var end=Objdiv.querySelectorAll('ul')[x+1].querySelectorAll('.OpenNo')[i]          
      setChartLine(start,end,chart_canvas,Type)
    }
  }
}
function clearChart(){
  document.getElementById('ChartCanvas')!==null&&(document.getElementById('ChartCanvas').innerHTML='')
}
function setChartLine(start_pos,end_pos,Canvas_cont,Type){
  //获取画布的大小
  var _cavans_w = Math.abs(start_pos.offsetLeft - end_pos.offsetLeft)
  if (_cavans_w == 0) {
    _cavans_w = 2
  }
  var _cavans_h = Math.abs(start_pos.offsetTop - end_pos.offsetTop)
  var _cavans_id = "canvas_" + parseInt(Math.random() * 1000) + "_" + parseInt(Math.random() * 1500)
  var _canvasObj = document.createElement('canvas')
  _canvasObj.id=_cavans_id
  _canvasObj.width=_cavans_w
  _canvasObj.height=_cavans_h
  _canvasObj.style.position = "absolute"
    Canvas_cont.appendChild(_canvasObj)
  //计算位置
  var theLeft = start_pos.offsetLeft < end_pos.offsetLeft ? start_pos.offsetLeft : end_pos.offsetLeft
  var theTop = start_pos.offsetTop < end_pos.offsetTop ? start_pos.offsetTop : end_pos.offsetTop
  var _thePointW = end_pos.clientWidth / 2+1.5
  var drawline_canvas=document.getElementById(_cavans_id)
  drawline_canvas.style.left=(theLeft + _thePointW - 1) + "px"
  drawline_canvas.style.top=(theTop + _thePointW - 2) + "px"
  var drawline_obj = drawline_canvas.getContext("2d")
  var saveNum=""
  if (start_pos.offsetLeft > end_pos.offsetLeft) {
    saveNum = mathNum(_cavans_w, 0, 0, _cavans_h, 7.5)
  } else {
    saveNum = mathNum(0, 0, _cavans_w, _cavans_h, 7.5)
  }
  var color=""
  switch(Type){
    case "SSC":
    color="#df303f"
    break;
    default:
    color="#5a7d36"
    break;    
  }
  drawline_obj.beginPath()
  drawline_obj.moveTo(saveNum[0], saveNum[1])
  drawline_obj.lineTo(saveNum[2], saveNum[3])
  drawline_obj.lineWidth = 1
  drawline_obj.strokeStyle = color
  drawline_obj.fill()
  drawline_obj.stroke()
  drawline_obj.closePath()
}
function mathNum(x1, y1, x2, y2, r) {
  var a = x1 - x2,
  b = y1 - y2,
  c = Math.round(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))),
  _a = Math.round((a * r) / c),
  _b = Math.round((b * r) / c);
  return [x2 + _a, y2 + _b, x1 - _a, y1 - _b]
}

//渲染各彩种走势配置

var NavCfg={
  'K3':{
    Title:[{Name:'开奖记录',Key:0,NavType:0,SubType:0,List:Title.K3KJJL},{Name:'号码走势',Key:1,NavType:1,SubType:0,List:Title.K3HMZS},{Name:'和值走势',Key:2,NavType:2,SubType:0,List:Title.K3HZZS},{Name:'形态走势',Key:3,NavType:3,SubType:0,List:Title.K3XTZS}],
    Body:[],
    fun:[[KaiJiang,HeZhi,HeDaXiao,HeDanShuang],[KaiJiang,HeZhi,KuaDu,FengBu],[KaiJiang,HeDaXiao,HeDanShuang,Chart],[KaiJiang,SanTongHao,SanBuTong,SanLianHao]]
  },
  'SSC':{
    Title:[{Name:'开奖记录',Key:0,NavType:0,SubType:0,List:Title.SSCKJJL},{Name:'号码走势',Key:1,NavType:1,SubType:0,List:Title.SSCHMZS,Nav:[{Name:'万位走势',Key:1,NavType:1,SubType:0,List:Title.SSCHMZS},{Name:'千位走势',Key:2,NavType:1,SubType:1,List:Title.SSCHMZS},{Name:'百位走势',Key:3,NavType:1,SubType:2,List:Title.SSCHMZS},{Name:'十位走势',Key:4,NavType:1,SubType:3,List:Title.SSCHMZS},{Name:'个位走势',Key:5,NavType:1,SubType:4,List:Title.SSCHMZS}]},{Name:'龙虎斗',Key:6,NavType:2,SubType:0,List:Title.SSCLHD}],
    Body:[],
    fun:[[SSCKaiJiang,dxdsWan,dxdsQian,dxdsBai,dxdsShi,dxdsGe],[WanDaXiao,WanDanShuang,WanZhihe,WanChart],[QianDaXiao,QianDanShuang,QianZhihe,QianChart],[BaiDaXiao,BaiDanShuang,BaiZhihe,BaiChart],[ShiDaXiao,ShiDanShuang,ShiZhihe,ShiChart],[GeDaXiao,GeDanShuang,GeZhihe,GeChart],[WanQianLh,WanBaiLh,WanShiLh,WanGeLh,QianBaiLh,QianShiLh,QianGeLh,BaiShiLh,BaiGeLh,ShiGeLh]]
  },
}

export {NavCfg,QiHao,Unique,ChartTrend}