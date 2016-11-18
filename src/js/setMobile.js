const interviewApp=require("../main.js");
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
        Phone: this.Phone,
        SmsCode:this.SmsCode
      }
      var selfCheck = {
        Phone:{
          Name: '手机号',
          Reg: /^1[3|5|8]\d{9}$/,
          ErrMsg:"手机号为11位！"
        },
        SmsCode:{
          Name: '验证码',
          Reg: /^\d{4}$/,
          ErrMsg:"验证码不正确！"
        }
      }
      var err = $root.format(ajax, ['Phone','SmsCode'], selfCheck);
      if (err) {
        layer.msgWarn(err[1]);
        return;
      }
      delete ajax.checkPassword;
      ajax.action="VerifyMobile"
      ajax.Qort="Set"
      _fetch(ajax).then((res)=>{
        res.json().then((json) => {
          if(json.Code===1) {
            layer.msgWarn(json.StrCode);
            $root.$router.push('/securityCenter')
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
      if(!vm.toMsg){return};
      this.toMsg=false
      this.noDo=false
      let ajax={
        Action:"SendMobileCode",
        Mobile:this.Phone,
      }
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
