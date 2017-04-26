import BottomBox from '../components/bottom-box';
  export default{
    data(){
      return{
        BetweenType:'',
        BottomBoxShow:false,
        BottomBoxList:{K3:"快3",SSC:"时时彩",SYX5:"11选5",FC3D:"福彩3D",PL35:"排列3/5",KL8:"北京快乐8",PK10:"北京PK10"},
        AgentRebate:'',//自身返点数组
        setObj:{Max:'8.0',Min:'0.0'},//最大返点
        ArrObj:'',//当前总数据
        reeData:{},
        theWidth:'',//当前列表宽度
        SSCData:'',//可能性注数
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
      this.SSCData={"SSC":[{"Mode":"大小单双-二星","Odd":[1,4]},{"Mode":"大小单双-三星","Odd":[1,8]},{"Mode":"一星-复式","Odd":[1,10]},{"Mode":"二星-直选复式","Odd":[1,100]},{"Mode":"二星-直选单式","Odd":[1,100]},{"Mode":"二星-直选和值","Odd":[1,100]},{"Mode":"二星-跨度","Odd":[1,100]},{"Mode":"二星-组选复式","Odd":[2,100]},{"Mode":"二星-组选单式","Odd":[2,100]},{"Mode":"二星-组选和值","Odd":[2,100]},{"Mode":"二星-组选包胆","Odd":[2,100]},{"Mode":"三星-复式","Odd":[1,1000]},{"Mode":"三星-单式","Odd":[1,1000]},{"Mode":"三星-直选和值","Odd":[1,1000]},{"Mode":"三星-跨度","Odd":[1,1000]},{"Mode":"三星-组选和值","Odd":[6,1000]},{"Mode":"三星-组三","Odd":[3,1000]},{"Mode":"三星-组六","Odd":[6,1000]},{"Mode":"三星-混合组选","Odd":[6,1000]},{"Mode":"三星-组选包胆","Odd":[6,1000]},{"Mode":"三星-组三单式","Odd":[3,1000]},{"Mode":"三星-组六单式","Odd":[6,1000]},{"Mode":"三星-一码不定位","Odd":[271,1000]},{"Mode":"三星-二码不定位","Odd":[54,1000]},{"Mode":"四星-复式","Odd":[1,10000]},{"Mode":"四星-单式","Odd":[1,10000]},{"Mode":"四星-组选24","Odd":[24,10000]},{"Mode":"四星-组选12","Odd":[12,10000]},{"Mode":"四星-组选6","Odd":[6,10000]},{"Mode":"四星-组选4","Odd":[4,10000]},{"Mode":"四星-一码不定位","Odd":[3439,10000]},{"Mode":"四星-二码不定位","Odd":[974,10000]},{"Mode":"五星-复式","Odd":[1,100000]},{"Mode":"五星-单式","Odd":[1,100000]},{"Mode":"五星-组选120","Odd":[120,100000]},{"Mode":"五星-组选60","Odd":[60,100000]},{"Mode":"五星-组选30","Odd":[30,100000]},{"Mode":"五星-组选20","Odd":[20,100000]},{"Mode":"五星-组选10","Odd":[10,100000]},{"Mode":"五星-组选5","Odd":[5,100000]},{"Mode":"五星-一码不定位","Odd":[40951,100000]},{"Mode":"五星-二码不定位","Odd":[14670,100000]},{"Mode":"五星-三码不定位","Odd":[4350,100000]},{"Mode":"五星-一帆风顺","Odd":[40951,100000]},{"Mode":"五星-好事成双","Odd":[8146,100000]},{"Mode":"五星-三星报喜","Odd":[856,100000]},{"Mode":"五星-四季发财","Odd":[46,100000]}]}
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
          return key=="SSC"?"奖金":"赔率"
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
         if(key=="SSC"){
            this.setPlayArr(this.SSCData[key]);
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
