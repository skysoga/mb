export default {
  data(){
    return{}
  },
  beforeRouteEnter(to,from,next){
     var arr = ["SysActivity","ActivityConfig"];
     RootApp.GetInitData(arr,state=>{
      console.log(state.SysActivity,state.ActivityConfig)
      next()
     })
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
     	}
     	return url;
     },

   }
}
