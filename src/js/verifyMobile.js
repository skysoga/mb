const {interviewApp}=require("../main.js");
export default {
  data(){
    return{
      Phone:"",
      SmsCode:"",
      reTime:'发送验证码',
      noDo:true,
      toMsg:true,
      nextUrl:""
    }
  },
  beforeRouteEnter:(to,from,next)=>{
    var F=sessionStorage.getItem('isFind')
    if(F){
      to.meta.link="/resetWay?Q=ResetPwd"
    }
    next()
  },
  created(){
    var Q=this.$route.query.Q
    if(Q){this.nextUrl=Q.substr(2)}
    var vm=this
    var arr = ["UserMobile"];
     this.$root.GetInitData(arr,state=>{
      vm.Phone=state.UserMobile
     })
  },
  methods:{
    postBtn(){
      var vm=this
      var ajax = {
        Mobile: 0,
        SmsCode:this.SmsCode
      }
      var _FomatC=this.$store.state._FomatConfig
      var err = vm.$root.format(ajax, ['SmsCode'], _FomatC);
      if (err) {
        layer.msgWarn(err[1]);
        return;
      }
      ajax.Action="VerifyMobile"
      var F=sessionStorage.getItem('isFind')
      if(F){
        ajax.Action=ajax.Action+'Forget';
      }
      ajax.Qort="Verify"
      layer.msgWait("正在提交")
      _fetch(ajax).then((json)=>{
          if(json.Code===1) {
            layer.msgWarn(json.StrCode);
            var url=vm.nextUrl
            url=url?'/'+url:'/setMobile'
            vm.$root.$router.push(url)
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
        Action:"SendMobileCode",
        Mobile:this.Phone,
      }
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
