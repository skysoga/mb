export default {
  data:()=>{
    return{
      Content:'',
      StateData:'',
      UnClick:true,
      ClickMsg:'',
      Img:''
    }
  },
  beforeRouteEnter(to,from,next){
    var arr = ["SysActivity","RewardData"]
    RootApp.GetInitData(arr)
    var xname='每日加奖'
    var theArr={Action:'GetActivityStateData',Qort:xname}
    _fetch(theArr).then(json=>{
        next(vm=>{
          if(json.Code==1){
            vm.StateData=json.BackData
          }
          var dataArr=state.SysActivity
          var thState=-1
          if(vm.StateData){
            thState=vm.StateData.State
          }
          vm.UnClick=thState*1
          vm.ClickMsg=thState=='0'?'立即领取':(thState=='1'?'已领取':'不可领取')
          for(var i=0;i<dataArr.length;i++){
            if(dataArr[i].Name==xname){
              vm.Content=dataArr[i].Content
              vm.Img=dataArr[i].Img
              if (typeof(vm.Img)==="object") {
                vm.Img=vm.Img[0]
              }
              return
            }
          }
        })
      })
  },
  methods:{
    getBtn(){
      if(this.UnClick)return;
      var dataArr={Action:"GetReward",Qort:"每日加奖"}
      layer.msgWait("正在处理")
      _fetch(dataArr).then(json=>{
          if(json.Code==1){
            this.UnClick=true
            this.ClickMsg="已领取"
            layer.msgWarn(json.StrCode)
          }else{
            layer.msgWarn(json.StrCode)
          }
      })
    }
  }
}
