export default {
  data:()=>{
    return{
      refreshClass:"refresh"
    }
  },
  beforeRouteEnter:(to, from, next) => {
    var arr = ["UserBalance","UserHasSafePwd","UserFirstCardInfo","AgentRebate","UserPhoto"];
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
    },
    setUrl(){
        var safaPwd=store.state.UserHasSafePwd,
            FistCard=store.state.UserFirstCardInfo;
        if(safaPwd){
          if(FistCard&&FistCard[0]){
            RootApp.$router.push("/withdraw")
          }else{
            layer.open({
              shadeClose: false,
              className: "layerConfirm",
              content: "您还没绑定银行卡，无法提现，</br>是否先去绑定银行卡?",
              title: "温馨提示",
              btn: ["是","否"],
              yes:function(){
                RootApp.$router.push("/setBankcard?id=withdraw")
              }
            })
          }
        }else{
          layer.open({
            shadeClose: false,
            className: "layerConfirm",
            content: "您还未设置安全密码和绑定银行卡，无法提现，是否先去设置安全密码?",
            title: "温馨提示",
            btn: ["是","否"],
            yes:function(){
              RootApp.$router.push("/setSafePwd?Q=withdraw")
            }
          })
        }
    }
  }
}
