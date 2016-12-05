export default {
  data:()=>{
    return{
      Mail:"",
      MailCode:"",
      reTime:'发送验证码',
      noDo:true,
      toMsg:true
    }
  },
  methods:{
    $vaSubmit(){
      var $root=this.$root
      var ajax = {
        Mail: this.Mail,
        MailCode:this.MailCode
      }
      ajax.Action="VerifyMail"
      var F=sessionStorage.getItem('isFind')
      if(F){
        ajax.Action=ajax.Action+'Forget';
      }
      ajax.Qort="Set"
      layer.msgWait("正在提交")
      _fetch(ajax).then((json)=>{
          if(json.Code===1) {
            layer.msgWarn(json.StrCode);
            $root.AjaxGetInitData(["UserMail"],function(){
              $root.$router.push('/securityCenter')
            })
          }else{
            layer.msgWarn(json.StrCode);
          }
      })
    },
    postMsg(){
      let vm=this
      if(!vm.toMsg){return};
      let ajax={
        Mail:vm.Mail,
      }
      ajax.Action="SendMailCode"
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
