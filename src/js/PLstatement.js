const {interviewApp,state}=require("../main.js");
export default {
  data:()=>{
    return{
      AllProfitLoss:'',
      Betting:'',
      BonusMoney:'',
      Activity:'',
      Rebate:'',
      Recharge:'',
      Withdraw:''
    }
  },
  created(){
    this.getData(0)
  },
  methods:{
    getData(index){
      let dataArr={Action:"GetProfitLoss",BetweenDays:index}
      layer.msgWait("正在加载")
      _fetch(dataArr).then(json=>{
          var datas=json.BackData
          if(json.Code==1){
            this.AllProfitLoss=datas.AllProfitLoss
            this.Betting=datas.Betting
            this.BonusMoney=datas.BonusMoney
            this.Activity=datas.Activity
            this.Rebate=datas.Rebate
            this.Recharge=datas.Recharge
            this.Withdraw=datas.Withdraw
            layer.msgWarn(json.StrCode)
          }else{
            layer.msgWarn(json.StrCode)
          }
      })
    }
  }
}
