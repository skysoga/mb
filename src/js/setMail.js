export default {
  data:()=>{
    return{
      Mail:"",
      MailCode:"",
      SafePassword:"",
      reTime:'发送验证码',
      noDo:true,
      toMsg:true
    }
  },
  beforeRouteEnter(to,from,next){
    var F=sessionStorage.getItem('isFind')
    var U=localStorage.getItem('UserName')
    if(!(U||F)){
      router.replace('/login')
    }
    // RootApp.GetInitData(['UserMail'],state=>{
    //   if(state.UserMail){
    //     next()
    //   }else{
    //     layer.alert('暂停使用邮箱绑定',function(){
    //       router.push('/securityCenter')
    //       state.turning=false
    //     })
    //   }
    // })
    next()
  },
  methods:{
    $vaSubmit(){
      var ajax = {
        Action:"VerifyMail",
        Mail: this.Mail,
        MailCode:this.MailCode,
        SafePassword:this.SafePassword
      }
      var F=sessionStorage.getItem('isFind')
      if(F){
        ajax.Action='VerifyMailForget';
      }
      ajax.Qort="Set"
      layer.msgWait("正在提交")
      _fetch(ajax).then((json)=>{
          if(json.Code===1) {
            var Mail=(this.Mail).split("@")
            var Mat=Mail[0]
            var Str=Mat.substr(0,2)+"******"+Mat.substr(-4,4)
            RootApp.SaveInitData({UserMail:Str+"@"+Mail[1]})
            layer.url(json.StrCode,'/securityCenter')
          }else{
            layer.msgWarn(json.StrCode)
          }
      })
    },
    postMsg(){
      let vm=this
      if(!vm.toMsg){return};
      let ajax={
        Action:"SendMailCode",
        Mail:vm.Mail,
      }
      this.toMsg=false
      this.noDo=false
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
