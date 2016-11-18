const interviewApp=require("../main.js");
export default {
  data:()=>{
    return{
      Phone:"",
      SmsCode:"",
      reTime:'发送验证码',
      noDo:true,
      toMsg:true
    }
  },
  created(){
    var arr = ["UserMobile"];
     this.$root.GetInitData(arr)
  },
  methods:{
    postBtn(){
      var $root=this.$root
      var ajax = {
        Phone: 0,
        SmsCode:this.SmsCode
      }
      var selfCheck = {
        SmsCode:{
          Name: '验证码',
          Reg: /^\d{4}$/,
          ErrMsg:"验证码不正确！"
        }
      }
      var err = $root.format(ajax, ['SmsCode'], selfCheck);
      if (err) {
        layer.msgWarn(err[1]);
        return;
      }
      delete ajax.checkPassword;
      ajax.Action="VerifyMobile"
      ajax.Qort="Verify"
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
