import datatype from '../components/top-right-chose';
import loading from '../components/loading';
var listArr={BetMoney:"投注金额", Bonus:"中奖金额", ActivityMoney:"活动礼金", RebateMoney:"团队返点", ProfitMoney:"团队盈利", RechargeMoney:"充值金额", WithdrawMoney:"提现金额", FirstChargeNum:"首充人数", RegisterNum:"注册人数", BetNum:"投注人数", TeamNum:"下级人数", TeamBalance:"团队余额", AgentRebate:"代理返点", AgentWages:"代理工资", AgentDividends:"代理分红"}
export default {
  data:()=>{
    return{
      BetweenType:0,
      DateName:"今天",
      UserName:"",
      DateType:"",
      Datalist:"",
      listNum:"",
      isDataNot:true
    }
  },
  created(){
    this.UserName=this.$route.query.username||''
    this.DateType=0
    this.doSearch()
  },
  methods:{
    doSearch(){
      var Type=this.DateType
      var Name=this.UserName||0
      var ObjS=sessionStorage.getItem('agentReport'+Name+Type)
      if(ObjS){
        this.Datalist=this.setArrObj(JSON.parse(ObjS))
        this.listLong()
        this.isDataNot=false
      }else{
        this.renderData(Type,Name)
      }
    },
    renderData(Type,Name){
        let RenData={Action:"GetAgencyHender",BetweenType:Type,UserName:Name}
        this.isDataNot=true
        _fetch(RenData).then(json=>{
            var xarr=json.BackData
            if(json.Code==1){
              layer.closeAll()
              this.isDataNot=false
              sessionStorage.setItem('agentReport'+Name+Type,JSON.stringify(xarr))
              this.Datalist=this.setArrObj(xarr)
              this.listLong()
            }else{
              layer.msgWarn(json.StrCode)
              this.isDataNot=true
              this.UserName=""
              this.DateType=0
              this.DateName="今天"
            }
        })
    },
    setArrObj(Obj){
      var Arr=[]
      var theD=Obj.TeamNum||0
      if(!theD){
        listArr.RebateMoney="会员返点"
        listArr.ProfitMoney="会员赢利"
        listArr.TeamBalance="会员余额"
      }
      for(var n in listArr){
        var theNum=Obj[n]
        if(theNum!=null){
          let obj=[theNum,listArr[n]]
          Arr.push(obj)
        }
      }
      return Arr
    },
    listLong(){
      var Type=this.DateType
      var Name=this.UserName||0
      var Num=[]
      var obj=JSON.parse(sessionStorage.getItem('agentReport'+Name+Type))
      for(var n in obj){
        obj[n]&&Num.push(obj[n])
      }
     this.listNum=3-parseInt(Num.length%3)
    }
  },
  beforeRouteLeave(to,from,next){
    sessionStorage.clear()
    next()
  },
  components:{
    'datatype': datatype,
    'loading': loading
  }
}
