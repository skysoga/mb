export default {
  data:()=>{
    return{
      refreshClass:"refresh",
      balShow:false,
      UserBalance:""
    }
  },
  beforeRouteEnter:(to, from, next) => {
    // RootApp.AjaxGetInitData(['UserBalance'])
    var arr = ["AgentRebate","UserPhoto"];
    RootApp.GetInitData(arr, state=>{
      next()
    })
  },
  created(){
    this.UserBalance=store.state.UserBalance
  },
  methods:{
    // refresh:function(e){
    //   var t = this,c=this.refreshClass
    //   this.refreshClass+=" refreshMove"
    //   this.getBalance()
    //   setTimeout(()=>{
    //     this.refreshClass="refresh"
    //   },500)
    // },
    getBalance:function(){
      RootApp.GetInitData(['UserBalance'],ref=>{
        this.refreshClass+=" refreshMove"
        this.balShow=true
        this.UserBalance=""
        setTimeout(()=>{
          this.refreshClass="refresh"
          this.UserBalance=store.state.UserBalance
        },500)
      })
    }
  }
}
