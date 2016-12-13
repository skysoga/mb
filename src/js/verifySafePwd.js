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
    if(Q){this.nextUrl=Q.substr(2)}
  },
  methods:{
    $vaSubmit(){
      var vm=this
      var ajax = {
        Password: this.Password
      }
      ajax.Action="VerifySafePwd";
      var F=sessionStorage.getItem('isFind')
      if(F){
        ajax.Action=ajax.Action+'Forget';
      }
      layer.msgWait("正在提交")
      _fetch(ajax).then((json)=>{
          if(json.Code===1) {
            var url=vm.nextUrl
            url=url?'/'+url:'/setSafePwd'
            router.push(url)
          }else{
            layer.msgWarn(json.StrCode);
          }
      })
    }
  }
}
