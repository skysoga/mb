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
      router.replace('/login')
    }
  },
  methods:{
    $vaSubmit(){
      var ajax = {
        Action:"VerifyPwd",
        Password: this.Password
      }
      var F=sessionStorage.getItem('isFind')
      if(F){
        ajax.Action='verifyPassForget';
      }
      layer.msgWait("正在提交")
      _fetch(ajax).then((json)=>{
          if(json.Code===1) {
            //验证密码
            layer.url(json.StrCode,'/setPwd?Q=ResetPwd')
          }else{
            layer.msgWarn(json.StrCode);
          }
      })
    }
  }
}
