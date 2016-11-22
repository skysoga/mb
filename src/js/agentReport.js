import BottomBox from '../components/bottom-box';
export default {
  data:()=>{
    return{
      DateName:"今天",
      UserName:"",
      DateType:"",
      Datalist:"",
      listNum:"",
      BottomBoxShow: false,
      BottomBoxList:['今天','昨天','本月','上月'],
      NameObj:{BetMoney:"投注金额", Bonus:"中奖金额", ActivityMoney:"活动礼金", RebateMoney:"团队返点", ProfitMoney:"团队盈利", RechargeMoney:"充值金额", WithdrawMoney:"提现金额", FirstChargeNum:"首充人数", RegisterNum:"注册人数", BetNum:"投注人数", TeamNum:"下级人数", TeamBalance:"团队余额", AgentRebate:"代理返点", AgentWages:"代理工资", AgentDividends:"代理分红"}
    }
  },
  created(){
    sessionStorage.clear()
    this.UserName=this.$route.query.name||''
    this.DateType=0
    this.doSearch()
  },
  methods:{
    BottomBoxfun(key,value){
      this.DateName=value
      this.DateType=key
      this.doSearch()
      this.BottomBoxShow=false
    },
    doSearch(){
      var Type=this.DateType
      var Name=this.UserName||0
      var ObjS=sessionStorage.getItem('agentReport'+Name+Type)
      if(ObjS){
        this.Datalist=JSON.parse(ObjS)
      }else{
        this.renderData(Type,Name)
      }
    },
    renderData(Type,Name){
        let RenData={Action:"GetAgencyHender",BetweenType:Type,UserName:Name}
        layer.msgWait("正在加载")
        _fetch(RenData).then(res=>{
          res.json().then(json=>{
            var xarr=json.BackData
            console.log(xarr)
            if(json.Code==1){
              sessionStorage.setItem('agentReport'+Name+Type,JSON.stringify(xarr))
              layer.msgWarn("加载完成");
              this.Datalist=xarr
              this.listLong()
            }else{
              layer.msgWarn(json.StrCode)
            }
          })
        })

    },
    NameFun(key){
      return this.NameObj[key]
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
  components:{
    'bottom-box': BottomBox
  }
}
