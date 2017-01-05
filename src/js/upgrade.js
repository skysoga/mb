export default {
  data:()=>{
    return{
      Content:'',
      UnClick:true,
      Img:'',
    }
  },
  beforeRouteEnter(to,from,next){
    RootApp.AjaxGetInitData(['UserUpGradeBonus'],ref=>{
      var arr = ["SysActivity","GradeList"];
      RootApp.GetInitData(arr,ref=>{
        next()
      })
    })
  },
  created:function(){
    var xname='晋级奖励'
    var dataArr=state.SysActivity
    if(state.UserUpGradeBonus){
      this.UnClick=state.UserUpGradeBonus.State
    }
    for(var i=0;i<dataArr.length;i++){
      if(dataArr[i].Name==decodeURIComponent(xname)){
        this.Content=dataArr[i].Content
        this.Img=dataArr[i].Img
        if (typeof(this.Img)==="object") {
          this.Img=this.Img[0]
        }
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
            state.UserUpGradeBonus.State=1
            layer.msgWarn(json.StrCode)
          }else{
            layer.msgWarn(json.StrCode)
          }
      })
    }
  }
}
