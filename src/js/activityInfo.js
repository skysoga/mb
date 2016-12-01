const {interviewApp,state}=require("../main.js");
export default {
  data:()=>{
    return{
      Content:'',
      Img:''
    }
  },
  beforeRouteEnter:(to,from,next)=>{
        var name= to.query.name
        to.meta.title=name
        next()
  },
  created:function(){
    var arr = ["ActivityConfig"];
    this.$root.GetInitData(arr)
    var xname=this.$route.query.name
    var dataArr=state.ActivityConfig
    for(var i=0;i<dataArr.length;i++){
      if(dataArr[i].Name==decodeURIComponent(xname)){
        this.Content=dataArr[i].Content
        this.Img=dataArr[i].Img[0]||''
        return
      }
    }
  }
}
