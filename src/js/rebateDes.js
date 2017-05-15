import BottomBox from '../components/bottom-box';
  export default{
    data(){
      return{
        BetweenType:'',
        BottomBoxShow:false,
        BottomBoxList:{K3:"快3",SSC:"时时彩",SYX5:"11选5",FC3D:"福彩3D",PL35:"排列3",KL8:"北京快乐8",PK10:"北京PK10"},
        AgentRebate:'',//自身返点数组
        setObj:{Max:'8.0',Min:'0.0'},//最大返点
        ArrObj:'',//当前总数据
        reeData:{},
        theWidth:'',//当前列表宽度
        OrData:'',//可能性注数
        ListArr:''//大小值
      }
    },
    created(){
      if(RootApp.$route&&RootApp.$route.params.id){
        this.BetweenType=RootApp.$route.params.id
      }else{
        this.BetweenType="K3"
      }
      var isLaw=!this.BottomBoxList[this.BetweenType]
      if(isLaw){
        return router.replace('/manageInvite')
      }
      this.AgentRebate=JSON.parse(localStorage.getItem("AgentRebate"))
      this.OrData={
        "SSC":[
          {"Mode":"大小单双-二星","Odd":[1,4]},
          {"Mode":"大小单双-三星","Odd":[1,8]},
          {"Mode":"一星-复式","Odd":[1,10]},
          {"Mode":"二星-直选复式","Odd":[1,100]},
          {"Mode":"二星-直选单式","Odd":[1,100]},
          {"Mode":"二星-直选和值","Odd":[1,100]},
          {"Mode":"二星-跨度","Odd":[1,100]},
          {"Mode":"二星-组选复式","Odd":[2,100]},
          {"Mode":"二星-组选单式","Odd":[2,100]},
          {"Mode":"二星-组选和值","Odd":[2,100]},
          {"Mode":"二星-组选包胆","Odd":[2,100]},
          {"Mode":"三星-复式","Odd":[1,1000]},
          {"Mode":"三星-单式","Odd":[1,1000]},
          {"Mode":"三星-直选和值","Odd":[1,1000]},
          {"Mode":"三星-跨度","Odd":[1,1000]},
          {"Mode":"三星-组选和值","Odd":[6,1000]},
          {"Mode":"三星-组三","Odd":[3,1000]},
          {"Mode":"三星-组六","Odd":[6,1000]},
          {"Mode":"三星-混合组选","Odd":[6,1000]},
          {"Mode":"三星-组选包胆","Odd":[6,1000]},
          {"Mode":"三星-组三单式","Odd":[3,1000]},
          {"Mode":"三星-组六单式","Odd":[6,1000]},
          {"Mode":"三星-一码不定位","Odd":[271,1000]},
          {"Mode":"三星-二码不定位","Odd":[54,1000]},
          {"Mode":"四星-复式","Odd":[1,10000]},
          {"Mode":"四星-单式","Odd":[1,10000]},
          {"Mode":"四星-组选24","Odd":[24,10000]},
          {"Mode":"四星-组选12","Odd":[12,10000]},
          {"Mode":"四星-组选6","Odd":[6,10000]},
          {"Mode":"四星-组选4","Odd":[4,10000]},
          {"Mode":"四星-一码不定位","Odd":[3439,10000]},
          {"Mode":"四星-二码不定位","Odd":[974,10000]},
          {"Mode":"五星-复式","Odd":[1,100000]},
          {"Mode":"五星-单式","Odd":[1,100000]},
          {"Mode":"五星-组选120","Odd":[120,100000]},
          {"Mode":"五星-组选60","Odd":[60,100000]},
          {"Mode":"五星-组选30","Odd":[30,100000]},
          {"Mode":"五星-组选20","Odd":[20,100000]},
          {"Mode":"五星-组选10","Odd":[10,100000]},
          {"Mode":"五星-组选5","Odd":[5,100000]},
          {"Mode":"五星-一码不定位","Odd":[40951,100000]},
          {"Mode":"五星-二码不定位","Odd":[14670,100000]},
          {"Mode":"五星-三码不定位","Odd":[4350,100000]},
          {"Mode":"五星-一帆风顺","Odd":[40951,100000]},
          {"Mode":"五星-好事成双","Odd":[8146,100000]},
          {"Mode":"五星-三星报喜","Odd":[856,100000]},
          {"Mode":"五星-四季发财","Odd":[46,100000]}
        ],
        "SYX5":[
          {"Mode":"三码-前三直选复式","Odd":[1,990]},
          {"Mode":"三码-前三直选单式","Odd":[1,990]},
          {"Mode":"三码-前三组选复式","Odd":[6,990]},
          {"Mode":"三码-前三组选单式","Odd":[6,990]},
          {"Mode":"三码-前三组选胆拖","Odd":[6,990]},
          {"Mode":"二码-前二直选复式","Odd":[1,110]},
          {"Mode":"二码-前二直选单式","Odd":[1,110]},
          {"Mode":"二码-前二组选复式","Odd":[2,110]},
          {"Mode":"二码-前二组选单式","Odd":[2,110]},
          {"Mode":"二码-前二组选胆拖","Odd":[2,110]},
          {"Mode":"不定位-前三一码不定位","Odd":[270,990]},
          {"Mode":"定位胆-复式","Odd":[1,11]},
          {"Mode":"趣味-定单双-5单0双","Odd":[720,55440]},
          {"Mode":"趣味-定单双-4单1双","Odd":[9000,55440]},
          {"Mode":"趣味-定单双-3单2双","Odd":[24000,55440]},
          {"Mode":"趣味-定单双-2单3双","Odd":[18000,55440]},
          {"Mode":"趣味-定单双-1单4双","Odd":[3600,55440]},
          {"Mode":"趣味-定单双-0单5双","Odd":[120,55440]},
          {"Mode":"趣味-猜中位-03/09","Odd":[3360,55440]},
          {"Mode":"趣味-猜中位-04/08","Odd":[7560,55440]},
          {"Mode":"趣味-猜中位-05/07","Odd":[10800,55440]},
          {"Mode":"趣味-猜中位-06","Odd":[12000,55440]},
          {"Mode":"任选复式-一中一","Odd":[25200,55440]},
          {"Mode":"任选复式-二中二","Odd":[10080,55440]},
          {"Mode":"任选复式-三中三","Odd":[3360,55440]},
          {"Mode":"任选单式-一中一","Odd":[25200,55440]},
          {"Mode":"任选复式-四中四","Odd":[840,55440]},
          {"Mode":"任选复式-五中五","Odd":[120,55440]},
          {"Mode":"任选复式-六中五","Odd":[720,55440]},
          {"Mode":"任选复式-七中五","Odd":[2520,55440]},
          {"Mode":"任选复式-八中五","Odd":[6720,55440]},
          {"Mode":"任选单式-二中二","Odd":[10080,55440]},
          {"Mode":"任选单式-三中三","Odd":[3360,55440]},
          {"Mode":"任选单式-四中四","Odd":[840,55440]},
          {"Mode":"任选单式-五中五","Odd":[120,55440]},
          {"Mode":"任选单式-六中五","Odd":[720,55440]},
          {"Mode":"任选单式-七中五","Odd":[2520,55440]},
          {"Mode":"任选单式-八中五","Odd":[6720,55440]},
          {"Mode":"任选胆拖-二中二","Odd":[10080,55440]},
          {"Mode":"任选胆拖-三中三","Odd":[3360,55440]},
          {"Mode":"任选胆拖-四中四","Odd":[840,55440]},
          {"Mode":"任选胆拖-五中五","Odd":[120,55440]},
          {"Mode":"任选胆拖-六中五","Odd":[720,55440]},
          {"Mode":"任选胆拖-七中五","Odd":[2520,55440]},
          {"Mode":"任选胆拖-八中五","Odd":[6720,55440]},
        ],
        "FC3D":[
          {"Mode":"大小单双-二星","Odd":[1,4]},
          {"Mode":"一星-复式","Odd":[1,10]},
          {"Mode":"后二-直选","Odd":[1,100]},
          {"Mode":"后二-组选","Odd":[2,100]},
          {"Mode":"前二-直选","Odd":[1,100]},
          {"Mode":"前二-组选","Odd":[2,100]},
          {"Mode":"三星-直选","Odd":[1,1000]},
          {"Mode":"三星-组选和值","Odd":[3,1000]},
          {"Mode":"三星-组三","Odd":[3,1000]},
          {"Mode":"三星-组六","Odd":[6,1000]},
          {"Mode":"三星-混合组选","Odd":[3,1000]},
          {"Mode":"三星-组选包胆","Odd":[3,1000]},
          {"Mode":"三星-组三单式","Odd":[3,1000]},
          {"Mode":"三星-组六单式","Odd":[6,1000]},
          {"Mode":"三星-一码不定位","Odd":[271,1000]},
          {"Mode":"三星-二码不定位","Odd":[54,1000]},
        ],
        "PL35":[
          {"Mode":"大小单双-二星","Odd":[1,4]},
          {"Mode":"一星-复式","Odd":[1,10]},
          {"Mode":"后二-直选","Odd":[1,100]},
          {"Mode":"后二-组选","Odd":[2,100]},
          {"Mode":"前二-直选","Odd":[1,100]},
          {"Mode":"前二-组选","Odd":[2,100]},
          {"Mode":"三星-直选","Odd":[1,1000]},
          {"Mode":"三星-组选和值","Odd":[3,1000]},
          {"Mode":"三星-组三","Odd":[3,1000]},
          {"Mode":"三星-组六","Odd":[6,1000]},
          {"Mode":"三星-混合组选","Odd":[3,1000]},
          {"Mode":"三星-组选包胆","Odd":[3,1000]},
          {"Mode":"三星-一码不定位","Odd":[3,1000]},
          {"Mode":"三星-组六单式","Odd":[6,1000]},
          {"Mode":"三星-一码不定位","Odd":[271,1000]},
          {"Mode":"三星-二码不定位","Odd":[54,1000]},
        ],
        "KL8":[
          {"Mode":"任选-任选一","Odd":[20,80]},
          {"Mode":"任选-任选二","Odd":[190,3160]},
          {"Mode":"任选-任选三(中三)","Odd":[1140,82160]},
          {"Mode":"任选-任选三(中二)","Odd":[11400,82160]},
          {"Mode":"任选-任选四(中四)","Odd":[4845,1581580]},
          {"Mode":"任选-任选四(中三)","Odd":[68400,1581580]},
          {"Mode":"任选-任选四(中二)","Odd":[336300,1581580]},
          {"Mode":"任选-任选五(中五)","Odd":[15504,24040016]},
          {"Mode":"任选-任选五(中四)","Odd":[290700,24040016]},
          {"Mode":"任选-任选五(中三)","Odd":[2017800,24040016]},
          {"Mode":"任选-任选六(中六)","Odd":[38760,300500200]},
          {"Mode":"任选-任选六(中五)","Odd":[930240,300500200]},
          {"Mode":"任选-任选六(中四)","Odd":[8575650,300500200]},
          {"Mode":"任选-任选六(中三)","Odd":[39010800,300500200]},
          {"Mode":"任选-任选七(中七)","Odd":[77520,3176716400]},
          {"Mode":"任选-任选七(中六)","Odd":[2325600,3176716400]},
          {"Mode":"任选-任选七(中五)","Odd":[27442080,3176716400]},
          {"Mode":"任选-任选七(中四)","Odd":[165795900,3176716400]},
          {"Mode":"任选-任选七(中零)","Odd":[386206920,3176716400]},
          {"Mode":"趣味-上下盘(上下)","Odd":[1408393885741460000,3535316142212170000]},
          {"Mode":"趣味-上下盘(和)","Odd":[718528370729238000,3535316142212170000]},
          {"Mode":"趣味-奇偶盘(奇偶)","Odd":[1408393885741460000,3535316142212170000]},
          {"Mode":"趣味-奇偶盘(和)","Odd":[718528370729238000,3535316142212170000]},
          {"Mode":"趣味-和值大小单双","Odd":[1,4]},
        ],
        "PK10":[  {"Mode":"定位胆-标准","Odd":[1,10]},
          {"Mode":"前五-复式","Odd":[120,3628800]},
          {"Mode":"前五-单式","Odd":[120,3628800]},
          {"Mode":"前四-复式","Odd":[720,3628800]},
          {"Mode":"前四-单式","Odd":[720,3628800]},
          {"Mode":"前三-复式","Odd":[5040,3628800]},
          {"Mode":"前三-单式","Odd":[5040,3628800]},
          {"Mode":"前二-复式","Odd":[40320,3628800]},
          {"Mode":"前二-单式","Odd":[40320,3628800]},
          {"Mode":"前一-复式","Odd":[362880,3628800]},
        ]
      }
      this.ListArr={
          "K3":{"Rebate":[7.5,0.0],"List":[{"Mode":"\u5927/\u5C0F/\u5355/\u53CC","Odd":["1.95","1.80"]},{"Mode":"\u548C\u503C3/18","Odd":["189.00","172.80"]},{"Mode":"\u548C\u503C4/17","Odd":["63.00","57.60"]},{"Mode":"\u548C\u503C5/16","Odd":["31.50","28.80"]},{"Mode":"\u548C\u503C6/15","Odd":["18.90","17.28"]},{"Mode":"\u548C\u503C7/14","Odd":["12.60","11.52"]},{"Mode":"\u548C\u503C8/13","Odd":["9.00","8.228"]},{"Mode":"\u548C\u503C9/12","Odd":["7.56","6.912"]},{"Mode":"\u548C\u503C10/11","Odd":["7.00","6.40"]},{"Mode":"\u4E09\u540C\u53F7\u901A\u9009","Odd":["31.50","28.80"]},{"Mode":"\u4E09\u540C\u53F7\u5355\u9009","Odd":["189.00","172.80"]},{"Mode":"\u4E09\u4E0D\u540C\u53F7","Odd":["31.50","28.80"]},{"Mode":"\u4E09\u8FDE\u53F7\u901A\u9009","Odd":["7.87","7.20"]},{"Mode":"\u4E8C\u540C\u53F7\u590D\u9009","Odd":["12.60","11.52"]},{"Mode":"\u4E8C\u540C\u53F7\u5355\u9009","Odd":["63.00","57.60"]},{"Mode":"\u4E8C\u4E0D\u540C\u53F7","Odd":["6.30","5.76"]}]},
          "SSC":{"Rebate":[8.0,0.00],"List":[]},
          "SYX5":{"Rebate":[8.0,0.00],"List":[]},
          "FC3D":{"Rebate":[8.0,0.00],"List":[]},
          "PL35":{"Rebate":[8.0,0.00],"List":[]},
          "KL8":{"Rebate":[8.0,0.00],"List":[]},
          "PK10":{"Rebate":[8.0,0.00],"List":[]}
      }
      this.setListDate(this.BetweenType)
    },
    methods:{
      bottomBox(k,v){
        this.BetweenType=k
        this.BottomBoxShow=false
        router.push('/rebateDes/'+k)
        this.setListDate(k)
      },
      setMsg(key,index){
        if(index>0){
          return key!="K3"?"奖金":"赔率"
        }else{
          return ""
        }
      },
      setListDate(key){
          this.reeData=this.ListArr[key]
          var i=0;
          for(;i<this.AgentRebate.length;i++){
              var iCode=this.AgentRebate[i].LotteryType;
              if(iCode==key){
                  var Max=this.AgentRebate[i].Point
                  var Min=this.AgentRebate[i].MinPoint
                  this.reeData.Rebate[0]=Max
                  this.reeData.Rebate[1]=Min
              }

          }
          if(key=='K3'){
            this.setObj.Max=7.5
            this.setObj.Min=0.0
          }else{
            this.setObj.Max=8.0
            this.setObj.Min=0.0
          }
          if(this.OrData[key]){
             this.setPlayArr(this.OrData[key]);
           }
          if(!this.reeData.List.length){
            this.ArrObj=""
            return
          }
          var Mode=this.ReMode().Mode
          var Data=this.ReMode().Data
          var isArr=[],
                reArr=this.Rebate(this.setObj.Max,this.setObj.Min),
                ModeArr=this.ReMode().Data,
                i=0;
            for(;i<reArr.length;i++){
                var nArr=[],
                    Onum=reArr[i],
                        j=0;
                nArr.push(reArr[i]);
                for(;j<ModeArr.length;j++){
                    nArr.push(ModeArr[j][i]);
                }
              if(Onum<=this.reeData.Rebate[0]&&Onum>=this.reeData.Rebate[1]){
                isArr.push(nArr)
              }
            }
            this.ArrObj={Data:isArr,Mode:Mode}
            this.theWidth={width:this.ArrObj.Data.length*7.4*.7*em+2+'px'}
      },
      Rebate(Max,Min){//返点区间
          var isArr=[],
                  toli=(Max-Min)*10;
          for(var i=0;i<=toli;i++){
              var theObj=(Max*10-i)/10;
              isArr.push(theObj.toFixed(1));
          }
          return isArr;
      },
      SetOdd(max,min,set){//赔率区间
          var Num=this.Rebate(this.setObj.Max,this.setObj.Min).length-1;
          var Arr=[];
          var toli=(max-min)/Num;
          for(var i=Num;i>=0;i--){
              var iser=toli*i+Number(min);
              if(set){
                  Arr.push(Number(Math.floor(iser*1000)/1000).toFixed(3));
              }else{
                  Arr.push(Number(Math.floor(iser*100)/100).toFixed(2));
              }
          }
          return Arr;
      },
      ReMode(){//玩法序列和赔率
          var isArr=new Object();
              isArr.Mode=[];
              isArr.Data=[];
          var isMode= this.reeData['List'];
          for(var i=0;i<isMode.length;i++){
              isArr.Mode.push(isMode[i].Mode);
              var set=false,
                  Mode=isMode[i].Mode,
                  iMo=Mode.substr(Mode.length-2);
              if(iMo=='三星'||iMo=='二星'||iMo=='/双'){
                  set=true;
              }
              var Num=this.SetOdd(isMode[i].Odd[0],isMode[i].Odd[1],set);
              isArr.Data.push(Num);
          }
          return isArr
      },
      setPlayArr(ObjArr){//可能性注数算法
          var Arr=[],i=0,ObjAll=ObjArr,Num=this.Rebate(this.setObj.Max,this.setObj.Min);
          for(var l=ObjAll.length;i<l;i++){
              var Obj=new Object(),j=0;
                  Obj.Mode=ObjAll[i].Mode;
                  Obj.Odd=[];
                  Obj.Odd.push(ObjAll[i].Odd[1]/ObjAll[i].Odd[0]*(0.9+8/100)*2,ObjAll[i].Odd[1]/ObjAll[i].Odd[0]*(0.9+0/100)*2)
                  Arr.push(Obj);
          }
          this.reeData['List']=Arr;
      }
    },
    components:{
      'bottom-box': BottomBox
    }
  }
