export default {
  data(){
    return{
      Num:''
    }
  },
  beforeRouteEnter(to,from,next){
     var arr = ["SysActivity","ActivityConfig"];
     RootApp.GetInitData(arr,state=>{
      next()
     })
   },
   created(){
    this.Num=(state.SysActivity&&state.SysActivity.length)||0
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
