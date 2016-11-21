const {interviewApp}=require("../main.js");
export default {
  data:()=>{
    return{}
  },
  created:function(){
    var arr = ["ActivityConfig","RewardData"];
     this.$root.GetInitData(arr)
  },
  mounted:function(){

  }
}
