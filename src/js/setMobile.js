export default {
  data(){
    return{
      Mobile:"",
      SmsCode:"",
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
    next(vm=>{
      layer.url('暂停使用手机绑定','/securityCenter')
    })
  },
  methods:{
    $vaSubmit(){
      var ajax = {
        Action:"VerifyMobile",
        Mobile: this.Mobile,
        SmsCode:this.SmsCode
      }
      var F=sessionStorage.getItem('isFind')
      if(F){
        ajax.Action='VerifyMobileForget';
      }
      ajax.Qort="Set"
      layer.msgWait("正在提交")
      _fetch(ajax).then((json)=>{
          if(json.Code===1) {
            var Mob=this.Mobile
            RootApp.SaveInitData({UserMobile:Mob.substr(0,2)+"******"+Mob.substr(-2,2)})
            layer.url(json.StrCode,'/securityCenter')
          }else{
            layer.msgWarn(json.StrCode)
          }
      })
    },
    postMsg(){
      let vm=this
      let ajax={
        Action:"SendMobileCode",
        Mobile:this.Mobile,
      }
      if(!vm.toMsg){return};
      this.toMsg=false
      this.noDo=false
      layer.msgWait("正在发送")
      _fetch(ajax).then((json)=>{
          if(json.Code===1) {
            vm.reTimex()
            layer.msgWarn(json.StrCode);
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
