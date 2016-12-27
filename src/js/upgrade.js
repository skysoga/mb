export default {
  data:()=>{
    return{
      Content:'',
      GradeList:'',
      UnClick:true,
      ClickMsg:'',
      isBouns:'',
      Img:'',
      noimg:false
    }
  },
  beforeRouteEnter(to,from,next){
    var arr = ["SysActivity","GradeList","UserUpGradeBonus"];
    RootApp.GetInitData(arr,ref=>{
      next()
    })
  },
  created:function(){
    var xname='晋级奖励'
    var dataArr=store.state.SysActivity
    this.GradeList=store.state.GradeList
    this.isBouns=store.state.UserUpGradeBonus
    var thState=-1
    if(this.isBouns){
      thState=this.isBouns.State||-1
    }
    this.UnClick=thState==0?false:true
    this.ClickMsg=thState==0?'立即领取':thState==1?'已领取':'不可领取'
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
      var dataArr={Action:"GetReward",Qort:"晋级奖励"}
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
