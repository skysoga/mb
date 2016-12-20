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
      router.push('/login')
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
            layer.msgWarn(json.StrCode);
            if(F){
              router.push('/login')
              sessionStorage.clear('isFind')
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
