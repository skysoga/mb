export default {
  data(){
    return{
      Password:"",
      checkPassword:""
    }
  },
  beforeRouteEnter(to,from,next){
    var F=sessionStorage.getItem('isFind')
    var U=localStorage.getItem('UserName')
    if(!(U||F)){
      router.replace('/login')
    }
    next()
  },
  methods:{
    $vaSubmit(){
      var ajax = {Action:"SetPwd",Password: this.Password}
      var F=sessionStorage.getItem('isFind')
      if(F){
        ajax.Action='SetPassForget';
      }
      layer.msgWait("正在提交")
      _fetch(ajax).then((json)=>{
          if(json.Code===1) {
            //验证密码
            if(F){
              sessionStorage.removeItem("isFind")
              layer.url(json.StrCode,'/login')
              return
            }
            layer.url(json.StrCode,'/securityCenter')
          }else{
            layer.msgWarn(json.StrCode);
          }
      })
    }
  }
}
