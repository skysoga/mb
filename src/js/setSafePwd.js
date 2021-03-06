export default {
  data:()=>{
    return{
      Password:"",
      checkPassword:"",
      isOrUrl:""
    }
  },
  beforeRouteEnter(to,from,next){
    var F=sessionStorage.getItem('isFind')
    var U=localStorage.getItem('UserName')
    if(!(U||F)){
      router.replace('/login')
    }
    next(vm=>{
      vm.isOrUrl=to.query.Q||''
    })
  },
   methods:{
    $vaSubmit(){
      var vm=this
      var ajax = {
        Action:"SetSafePass",
        Password: this.Password
      }
      var F=sessionStorage.getItem('isFind')
      if(F){
        ajax.Action='SetSafePassForget';
      }
      layer.msgWait("正在提交")
      _fetch(ajax).then((json)=>{
          if(json.Code===1) {
            var Arr=["UserHasSafePwd"]
            store.commit('ClearInitData', Arr)//更新安全密码
            switch(vm.isOrUrl){
              case 'bindCard':
              case 'withdraw':
                layer.open({
                  shadeClose: false,
                  className: "layerConfirm",
                  content: "安全密码已设置成功,是否立即绑定银行卡",
                  title: "温馨提示",
                  btn: ["是","否"],
                  yes:function(){
                    vm.upPwd(function(){
                      router.replace('/setBankcard?Q='+vm.isOrUrl)
                    })
                  },
                  no:function(){
                    vm.upPwd(function(){
                      router.replace('/securityCenter')
                    })
                  }
                })
              break;
              default:
                vm.upPwd(function(){
                  layer.url(json.StrCode,'/securityCenter')
                })
              break;
            }
          }else{
            layer.msgWarn(json.StrCode);
          }
      })
    },
    upPwd(fun){
      RootApp.SaveInitData({UserHasSafePwd:1})
      fun()
    }
  }
}
