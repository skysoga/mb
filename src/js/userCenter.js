export default {
  data:()=>{
    return{
      refreshClass:"refresh",
      UserBalance:""
    }
  },
  beforeRouteEnter:(to, from, next) => {
    RootApp.AjaxGetInitData(['UserBalance'])
    var arr = ["UserBalance","AgentRebate","UserPhoto"];
    RootApp.GetInitData(arr, state=>{
      next()
    })
  },
  created(){
    this.UserBalance=this.$store.state.UserBalance
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
