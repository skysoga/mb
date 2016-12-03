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
  methods:{
    $vaSubmit(){
      var $root=this.$root
      var ajax = {
        Mobile: this.Mobile,
        SmsCode:this.SmsCode
      }
      ajax.Action="VerifyMobile"
      var F=sessionStorage.getItem('isFind')
      if(F){
        ajax.Action=ajax.Action+'Forget';
      }
      ajax.Qort="Set"
      layer.msgWait("正在提交")
      _fetch(ajax).then((json)=>{
          if(json.Code===1) {
            layer.msgWarn(json.StrCode);
            $root.AjaxGetInitData(["UserMobile"],function(){
              $root.$router.push('/securityCenter')
            })
          }else{
            layer.msgWarn(json.StrCode);
          }
      })
    },
    postMsg(){
      let vm=this
      let ajax={
        Mobile:this.Mobile,
      }
      if(!vm.toMsg){return};
      this.toMsg=false
      this.noDo=false
      ajax.Action="SendMobileCode"
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
