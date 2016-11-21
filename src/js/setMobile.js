const {interviewApp}=require("../main.js");
export default {
  data(){
    return{
      Phone:"",
      SmsCode:"",
      reTime:'发送验证码',
      noDo:true,
      toMsg:true
    }
  },
  methods:{
    postBtn(){
      var $root=this.$root
      var ajax = {
        Mobile: this.Phone,
        SmsCode:this.SmsCode
      }
      var _FomatC=this.$store.state._FomatConfig
      var err = $root.format(ajax, ['Mobile','SmsCode'], _FomatC);
      if (err) {
        layer.msgWarn(err[1]);
        return;
      }
      ajax.Action="VerifyMobile"
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
            $root.AjaxGetInitData(["UserMobile"],function(){
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
      if(!this.Phone){
        layer.msgWarn('请先输入手机号')
        this.SmsCode=""
        return;
      }
      let ajax={
        Mobile:this.Phone,
      }
      if(!vm.toMsg){return};
      var selfCheck = {
        Mobile:{
          Name: '手机号',
          Reg: /^1[3|5|8]\d{9}$/,
          ErrMsg:"手机号为11位！"
        }
      }
      var err = vm.$root.format(ajax, ['Mobile'], selfCheck);
      if (err) {
        layer.msgWarn(err[1]);
        return;
      }
      this.toMsg=false
      this.noDo=false
      ajax.Action="SendMobileCode"
      layer.msgWait("正在发送")
      _fetch(ajax).then((res)=>{
        res.json().then((json) => {
          if(json.Code===1) {
            vm.reTimex()
            layer.msgWarn(json.StrCode);
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
