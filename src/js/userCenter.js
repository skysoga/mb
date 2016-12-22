export default {
  data:()=>{
    return{
      refreshClass:"refresh"
    }
  },
  beforeRouteEnter:(to, from, next) => {
    var arr = ["UserBalance","AgentRebate","UserPhoto"];
    RootApp.GetInitData(arr, state=>{
      next()
    })
  },
  methods:{
    refresh:function(e){
      var t = this,c=this.refreshClass
      this.refreshClass+=" refreshMove"
      this.getBalance()
      setTimeout(()=>{
        this.refreshClass="refresh"
      },500)
    },
    getBalance:function(){
      RootApp.AjaxGetInitData(['UserBalance'])
    }
  }
}
