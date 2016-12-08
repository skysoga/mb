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
      RootApp.$router.push('/login')
    }
    next()
  },
  methods:{
    $vaSubmit(){
      var ajax = {Password: this.Password}
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
                RootApp.$router.push('/login')
                sessionStorage.clear('isFind')
                return
              }
            RootApp.$router.push('/securityCenter')
          }else{
            layer.msgWarn(json.StrCode);
          }
      })
    }
  }
}
