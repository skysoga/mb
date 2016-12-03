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
  beforeRouteEnter(to,from,next){
      let dataArr={Action:"GetProfitLoss",BetweenDays:0}
      _fetch(dataArr).then(json=>{
          next(vm=>{
            var datas=json.BackData
            if(json.Code==1){
              vm.AllProfitLoss=datas.AllProfitLoss
              vm.Betting=datas.Betting
              vm.BonusMoney=datas.BonusMoney
              vm.Activity=datas.Activity
              vm.Rebate=datas.Rebate
              vm.Recharge=datas.Recharge
              vm.Withdraw=datas.Withdraw
            }else{
              layer.msgWarn(json.StrCode)
            }
          })
      })
  }
}
