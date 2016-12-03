export default {
  data:()=>{
    return{
      Password:"",
      checkPassword:"",
      isOrUrl:""
    }
  },
  created(){
    this.isOrUrl=this.$route.query.Q
  },
   methods:{
    postBtn(){
      var vm=this
      var ajax = {
        Password: this.Password,
        checkPassword:this.checkPassword
      }
      var _FomatC=this.$store.state._FomatConfig
      var err = vm.$root.format(ajax, ['Password','checkPassword'], _FomatC);
      if (err) {
        layer.msgWarn(err[1]);
        return;
      }
      delete ajax.checkPassword;
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
                      vm.$root.$router.push('/setBankcard?Q='+vm.isOrUrl)
                    })
                  },
                  no:function(){
                    vm.upPwd(function(){
                      vm.$root.$router.push('/securityCenter')
                    })
                  }
                })
              break;
              default:
                vm.upPwd(function(){
                  vm.$root.$router.push('/securityCenter')
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
