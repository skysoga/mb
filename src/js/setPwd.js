export default {
  data(){
    return{
      Password:"",
      checkPassword:""
    }
  },
  methods:{
    postBtn(){
      var $root=this.$root
      var ajax = {
        Password: this.Password,
        checkPassword:this.checkPassword
      }
      var _FomatC=this.$store.state._FomatConfig
      var err = $root.format(ajax, ['Password','checkPassword'], _FomatC);
      if (err) {
        layer.msgWarn(err[1]);
        return;
      }
      delete ajax.checkPassword;
      ajax.Action="SetPass"
      var F=sessionStorage.getItem('isFind')
      if(F){
        ajax.Action=ajax.Action+'Forget';
      }
      layer.msgWait("正在提交")
      _fetch(ajax).then((json)=>{
          if(json.Code===1) {
            //验证密码
            layer.msgWarn(json.StrCode);
            if(F){
                $root.$router.push('/login')
                sessionStorage.clear('isFind')
                return
              }
            $root.$router.push('/securityCenter')
          }else{
            layer.msgWarn(json.StrCode);
          }
      })
    }
  }
}
