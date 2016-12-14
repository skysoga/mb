export default {
  data:()=>{
    return{
      Content:'',
      RewardData:'',
      StateData:'',
      UnClick:true,
      ClickMsg:'',
      Login:'',
      Img:'',
      noimg:false
    }
  },
  beforeRouteEnter(to,from,next){
    var arr = ["ActivityConfig","RewardData"]
    RootApp.GetInitData(arr)
     var theArr={Action:'GetActivityStateData',Qort:'每日加奖'}
    _fetch(theArr).then(json=>{
          next(vm=>{
            if(json.Code==1){
              vm.StateData=json.BackData||{}
            }
          })
      })
  },
  created:function(){
    var xname='每日加奖'
    var dataArr=store.state.ActivityConfig
    this.RewardData=store.state.RewardData
    var thState=-1
    if(this.StateData){
      thState=this.StateData.State||'不可领取'
    }
    this.UnClick=thState!=0?true:false
    this.ClickMsg=thState==0?'立即领取':thState=='1'?'已领取':'不可领取'
    for(var i=0;i<dataArr.length;i++){
      if(dataArr[i].Name==decodeURIComponent(xname)){
        this.Content=dataArr[i].Content
        this.Img=dataArr[i].Img
        this.noimg=this.Img||true
        return
      }
    }
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
