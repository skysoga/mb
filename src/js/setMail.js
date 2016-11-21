const {interviewApp}=require("../main.js");
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
    postBtn(){
      var $root=this.$root
      var ajax = {
        Mail: this.Mail,
        MailCode:this.MailCode
      }
      var _FomatC=this.$store.state._FomatConfig
      var err = $root.format(ajax, ['Mail','MailCode'], _FomatC);
      if (err) {
        layer.msgWarn(err[1]);
        return;
      }
      ajax.Action="VerifyMail"
      var F=sessionStorage.getItem('isFind')
      if(F){
        ajax.Action=ajax.Action+'Forget';
      }
      ajax.Qort="Set"
      layer.msgWait("正在提交")
      _fetch(ajax).then((res)=>{
        res.json().then((json) => {
          if(json.Code===1) {
            layer.msgWarn(json.StrCode);
            $root.AjaxGetInitData(["UserMail"],function(){
              $root.$router.push('/securityCenter')
            })
          }else{
            layer.msgWarn(json.StrCode);
          }
        })
      })
    },
    postMsg(){
      let vm=this
      if(!vm.toMsg){return};
      if(!vm.Mail){
        layer.msgWarn('邮箱不能为空');
        return
      }
      let ajax={
        Mail:vm.Mail,
      }
      var selfCheck = {
        Mail:{
          Name: '邮箱',
          Reg: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
          ErrMsg:"邮箱格式不正确！"
        }
      }
      var err = vm.$root.format(ajax, ['Mail'], selfCheck);
      if (err) {
        layer.msgWarn(err[1]);
        return;
      }
      ajax.Action="SendMailCode"
      this.toMsg=false
      this.noDo=false
      layer.msgWait("正在发送")
      _fetch(ajax).then((res)=>{
        res.json().then((json) => {
          if(json.Code===1) {
            vm.reTimex()
            layer.msg("我们已向您的邮箱发送了验证码！<br/>如未收到，请检查垃圾邮箱。");
            return
          }else{
            layer.msgWarn(json.StrCode);
            return
          }
        })
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
