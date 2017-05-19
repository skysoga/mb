export default {
  data(){
    return{
      Mobile:"",
      SmsCode:"",
      reTime:'发送验证码',
      noDo:true,
      toMsg:true,
      nextUrl:""
    }
  },
  beforeRouteEnter:(to,from,next)=>{
    var F=sessionStorage.getItem('isFind')
    var U=localStorage.getItem('UserName')
    if(!(U||F)){
      router.replace('/login')
    }
    var Q=to.query.Q||''
    if(Q){
      to.meta.link="/resetWay?Q="+Q
    }else{
      to.meta.link="/securityCenter"
    }
    layer.alert('暂停使用手机绑定',()=>{
      router.push('/securityCenter')
      state.turning=false
    })
    // next()
  },
  created(){
    var Q=this.$route.query.Q
    if(Q){this.nextUrl=Q.substr(2)+'?Q='+Q}
    var vm=this
    var arr = ["UserMobile"];
     RootApp.GetInitData(arr,state=>{
      vm.Mobile=state.UserMobile
     })
  },
  methods:{
    $vaSubmit(){
      var vm=this
      var ajax = {
        Action:"VerifyMobile",
        Mobile: 0,
        SmsCode:this.SmsCode
      }
      var F=sessionStorage.getItem('isFind')
      if(F){
        ajax.Action='VerifyMobileForget';
      }
      ajax.Qort="Verify"
      layer.msgWait("正在提交")
      _fetch(ajax).then((json)=>{
          if(json.Code===1) {
            var x=vm.nextUrl
            var xurl=x?('/'+x):'/setMobile'
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
        Action:"SendMobileCode",
        Mobile:0,
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
