export default {
  data:()=>{
    return{
      refreshClass:"refresh",
      StarNum:0,
      LevelText:0,
      LastLogin:'',
      HasSafePwd:'',
      FirstCard:''
    }
  },
  beforeRouteEnter(to, from, next){

    var arr = ['UserHasSafePwd', //返回是否已经设置安全密码,1为有,0为没有设置
      'UserSafeQuestions', //返回设置的密保问题,如果没设置可以返回0或者空数组
      'UserMobile', //返回已绑定手机的模糊状态,如未绑定,返回空字符串或0
      'UserMail',
      'UserFirstCardInfo'];
    var sessLogin=JSON.parse(sessionStorage.getItem("UserLastLoginInfo"))
    if(!sessLogin){
        arr.push('UserLastLoginInfo')
    }
      console.log(arr)
      RootApp.GetInitData(arr, state=>{
        next(vm=>{
          vm.StarNum=1;
          vm.StarNum+=!!state.UserHasSafePwd?1:0
          vm.StarNum+=!!state.UserSafeQuestions?1:0
          vm.StarNum+=!!state.UserMobile?1:0
          vm.StarNum+=!!state.UserMail?1:0
          vm.HasSafePwd=!!state.UserHasSafePwd?1:0
          if(sessLogin){
            vm.LastLogin=sessLogin
          }else{
            sessionStorage.setItem("UserLastLoginInfo",JSON.stringify(state.UserLastLoginInfo[0]))
            vm.LastLogin=state.UserLastLoginInfo[0]
          }
          vm.FirstCard=!!state.UserFirstCardInfo?1:0
          vm.LevelText=vm.StarNum==5?"极高":vm.StarNum==4?"高":vm.StarNum==3?"中":vm.StarNum==2?"低":"极低"
        });
    })
  },
  methods:{
    loginOut:function(){
      var ajax = {Action:"LogOut"}
      layer.msgWait("正在退出")
      _fetch(ajax).then((json)=>{
          if (json.Code===1) {
            RootApp.Logout()
            router.push("/login")
          }else{
            layer.msgWarn(json.StrCode)
          }
      })
    },
    setNextUrl(){
      if(!this.HasSafePwd){
        router.push("/setSafePwd?Q=bindCard")
      }else if(!this.FirstCard){
        router.push("/setBankcard")
      }else{
        router.push("/manageBankcard")
      }
    }
  }
}
