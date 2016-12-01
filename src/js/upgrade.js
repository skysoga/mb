const {interviewApp,state}=require("../main.js");
export default {
  data:()=>{
    return{
      Content:'',
      GradeList:'',
      UnClick:true,
      ClickMsg:'',
      Login:'',
      isBouns:'',
      Img:''
    }
  },
  created:function(){
    var arr = ["ActivityConfig","Login","GradeList","UserUpGradeBonus"];
    this.$root.GetInitData(arr)
    var xname='晋级奖励'
    var dataArr=state.ActivityConfig
    this.GradeList=state.GradeList
    this.isBouns=state.UserUpGradeBonus
    var thState=-1
    if(this.isBouns){
      thState=this.isBouns.State||'不可领取'
    }
    this.UnClick=thState!=0?true:false
    this.ClickMsg=thState==0?'立即领取':thState==1?'已领取':'不可领取'
    this.Login=state.Login||1
    for(var i=0;i<dataArr.length;i++){
      if(dataArr[i].Name==decodeURIComponent(xname)){
        this.Content=dataArr[i].Content
        this.Img=state.constant.ImgHost+dataArr[i].Img[0]
        return
      }
    }
  },
  methods:{
    getBtn(){
      if(this.UnClick)return;
      var dataArr={Action:"GetReward",Qort:"晋级奖励"}
      layer.msgWait("正在处理")
      _fetch(dataArr).then(ref=>{
        ref.json().then(json=>{
          if(json.Code==1){
            this.UnClick=true
            this.ClickMsg="已领取"
            layer.msgWarn(json.StrCode)
          }else{
            layer.msgWarn(json.StrCode)
          }
        })
      })
    }
  }
}
