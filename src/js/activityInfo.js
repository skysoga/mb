const {interviewApp,state}=require("../main.js");
export default {
  data:()=>{
    return{
      Content:'',
      Img:''
    }
  },
  created:function(){
    var arr = ["ActivityConfig"];
     this.$root.GetInitData(arr)
  },
  mounted:function(){
    var vm=this;
    var xname=location.search.split('=')[1]
    var dataArr=state.ActivityConfig
    for(var i=0;i<dataArr.length;i++){
      if(dataArr[i].Name==decodeURIComponent(xname)){
        this.Content=dataArr[i].Content
        this.Img=state.constant.ImgHost+state.constant.PhotoPath+dataArr[i].Img[0]
        return
      }
    }
  }
}
