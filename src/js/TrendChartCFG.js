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
//单双
function DanShuang(key,type){
  var num=HeZhi(key)
      num=num%2?'单':'双'
  return setValue(num,0,0,0)
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
  var num=key.LotteryOpen.split(',')
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

export {Title,NavCfg,SanLianHao,SanBuTong,SanTongHao,Chart,FengBu,QiHao,KuaDu,DanShuang,setNumber,getNum,KaiJiang,HeDaXiao,HeZhi,setValue}