export default {
  data:()=>{
    return{
      caiName:{SSC:"时时彩",XYNC:"幸运农场",PK10:"北京PK10",KL8:"北京快乐8",PL35:"排列3/5",FC3D:"福彩3D",SYX5:"11选5",K3:"快3"},
      UserType:1,
      SSC:''
    }
  },
  created:function(){
     var arr = ["AgentRebate"];
     this.$root.GetInitData(arr,state=>{
      console.log(state.AgentRebate)
     })
   },
   methods:{
   }
}
