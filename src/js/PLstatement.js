export default {
  data:()=>{
    return{
      ArrObj:''
    }
  },
  beforeRouteEnter(to,from,next){
      let dataArr={Action:"GetProfitLoss",BetweenDays:0}
      _fetch(dataArr).then(json=>{
          next(vm=>{
            var datas=json.BackData
            if(json.Code==1){
              vm.ArrObj=datas
            }else{
              layer.msgWarn(json.StrCode)
            }
          })
      })
  },
  methods:{
    setNum(Num){
      return String(Math.floor(Num)).length>7?Math.floor(Num):Num
    }
  }
}
