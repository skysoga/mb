const {interviewApp,state}=require("../main.js");
export default {
  data:()=>{
    return{
      Content:'',
      RewardData:'',
      StateData:'',
      UnClick:true,
      ClickMsg:'',
      Login:'',
      Img:''
    }
  },
  created:function(){
    var theArr={Action:'GetActivityStateData',Qort:'每日加奖'}
    _fetch(theArr).then(res=>{
        res.json().then(data=>{
          console.log(data)
          var Data=data.BackData
          if(data.Code==1){
            this.StateData=Data||0
          }
        })
      })
    var arr = ["ActivityConfig","Login","RewardData"]
    this.$root.GetInitData(arr)
    var xname='每日加奖'
    var dataArr=state.ActivityConfig
    this.RewardData=state.RewardData
    var thState=-1
    if(this.StateData){
      thState=this.StateData.State||'不可领取'
    }
    this.UnClick=thState!=0?true:false
    this.ClickMsg=thState==0?'立即领取':thState=='1'?'已领取':'不可领取'
    this.Login=state.Login||1
    for(var i=0;i<dataArr.length;i++){
      if(dataArr[i].Name==decodeURIComponent(xname)){
        this.Content=dataArr[i].Content
        this.Img=state.constant.ImgHost+state.constant.PhotoPath+dataArr[i].Img[0]
        return
      }
    }
  }
}
