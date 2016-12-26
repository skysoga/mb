export default {
  data:()=>{
    return{
      Mail:"",
      MailCode:"",
      reTime:'发送验证码',
      noDo:true,
      toMsg:true,
      nextUrl:""
    }
  },
  beforeRouteEnter:(to,from,next)=>{
    var F=sessionStorage.getItem('isFind')
    var U=localStorage.getItem('UserName')
    next(vm=>{
      if(!(U||F)){
        router.push('/login')
      }
      if(F){
        to.meta.link="/resetWay?Q=ResetPwd"
      }
    })
  },
  created(){
    var Q=this.$route.query.Q
    if(Q){this.nextUrl=Q.substr(2)}
    var vm=this
    var arr = ["UserMail"];
     RootApp.GetInitData(arr,state=>{
      vm.Mail=state.UserMail
     })
  },
  methods:{
    $vaSubmit(){
      var vm=this
      var ajax = {
        Action:"VerifyMail",
        Mail: 0,
        MailCode:this.MailCode
      }
      var F=sessionStorage.getItem('isFind')
      if(F){
        ajax.Action='VerifyMailForget';
      }
      ajax.Qort="Verify"
      layer.msgWait("正在提交")
      _fetch(ajax).then((json)=>{
          if(json.Code===1) {
            layer.msgWarn(json.StrCode);
            var x=vm.nextUrl
            var xurl=x?('/'+x):'/setMail'
            layer.url(json.StrCode,xurl)
          }else{
            layer.msgWarn(json.StrCode);
          }
      })
    },
    postMsg(){
      let vm=this
      if(!vm.toMsg){return};
      this.toMsg=false
      this.noDo=false
      let ajax={
        Action:"SendMailCode",
        Mail:0,
      }
      layer.msgWait("正在发送")
      _fetch(ajax).then((json)=>{
          if(json.Code===1) {
            vm.reTimex()
            layer.msg("我们已向您的邮箱发送了验证码！<br/>如未收到，请检查垃圾邮箱。");
            return
          }else{
            layer.msgWarn(json.StrCode);
            return
          }
      })
    },
    reTimex(){
      let vm=this
      let num=60
      let timeD
      function run(){
        num--
        if(num<=0){
          vm.reTime='发送验证码'
          clearTimeout(timeD)
          vm.toMsg=true
          return;
        }
        vm.reTime='重新发送('+num+'s)'
        timeD=setTimeout(run,1000)
      }
      run();
    }
  }
}
