export default {
  data:()=>{
    return{
      Password:"",
      nextUrl:""
    }
  },
  beforeRouteEnter:(to,from,next)=>{
    var F=sessionStorage.getItem('isFind')
    var U=localStorage.getItem('UserName')
    if(!(U||F)){
      router.push('/login')
    }
    if(F){
      to.meta.link="/resetWay?Q=ResetPwd"
    }
    next()
  },
  created(){
    var Q=this.$route.query.Q
    if(Q){this.nextUrl=Q.substr(2)+'?Q='+Q}
  },
  methods:{
    $vaSubmit(){
      var vm=this
      var ajax = {
        Action:"VerifySafePwd",
        Password: this.Password
      }
      var F=sessionStorage.getItem('isFind')
      if(F){
        ajax.Action='VerifySafePwdForget'
      }
      layer.msgWait("正在提交")
      _fetch(ajax).then((json)=>{
          if(json.Code===1) {
            var x=vm.nextUrl
            var xurl=x?('/'+x):'/setSafePwd'
            layer.url(json.StrCode,xurl)
          }else{
            layer.msgWarn(json.StrCode)
          }
      })
    }
  }
}
