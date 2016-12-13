export default {
  data(){
    return{
      Password:""
    }
  },
  created(){
    var F=sessionStorage.getItem('isFind')
    var U=localStorage.getItem('UserName')
    if(!(U||F)){
      router.push('/login')
    }
  },
  methods:{
    $vaSubmit(){
      var $root=this.$root
      var ajax = {
        Password: this.Password
      }
      ajax.Action="verifyPass";
      var F=sessionStorage.getItem('isFind')
      if(F){
        ajax.Action=ajax.Action+'Forget';
      }
      layer.msgWait("正在提交")
      _fetch(ajax).then((json)=>{
          if(json.Code===1) {
            //验证密码
            router.push('/setPwd?Q=ResetPwd')
          }else{
            layer.msgWarn(json.StrCode);
          }
      })
    }
  }
}
