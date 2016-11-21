const {interviewApp}=require("../main.js");
export default {
  data:()=>{
    return{}
  },
  created:function(){
     var arr = ["ActivityConfig"];
     interviewApp.GetInitData(arr)
   },
   methods:{
     getHtml:name=>{
     	let url;
     	switch(name){
     		case "每日加奖":
     		url="/dailyPrise"
     		break;
     		case "晋级奖励":
     		url="/upgrade"
     		break;
     		default:
     		url="/activityInfo?name="+encodeURIComponent(name)
     		break;
     	}
     	return url;
     }
   }
}
