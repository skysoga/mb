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
      RootApp.$router.push('/login')
    }
    next(vm=>{
      vm.isOrUrl=RootApp.$route.query.Q||''
    })
  },
   methods:{
    $vaSubmit(){
      var vm=this
      var ajax = {
        Password: this.Password
      }
      ajax.Action="SetSafePass"
      var F=sessionStorage.getItem('isFind')
      if(F){
        ajax.Action=ajax.Action+'Forget';
      }
      layer.msgWait("正在提交")
      _fetch(ajax).then((json)=>{
          if(json.Code===1) {
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
                      RootApp.$router.push('/setBankcard?Q='+vm.isOrUrl)
                    })
                  },
                  no:function(){
                    vm.upPwd(function(){
                      RootApp.$router.push('/securityCenter')
                    })
                  }
                })
              break;
              default:
                vm.upPwd(function(){
                  RootApp.$router.push('/securityCenter')
                })
              break;
            }
          }else{
            layer.msgWarn(json.StrCode);
          }
      })
    },
    upPwd(fun){
      this.$root.AjaxGetInitData(["UserHasSafePwd"],fun())
    }
  }
}
