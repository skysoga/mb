export default {
  data:()=>{
    return{
      reUrl:'',
      ResetSafePwd:'',
      ResetMobile:'',
      ResetQuestion:'',
      ResetMail:'',
      SafeNum:0
    }
  },
  beforeRouteEnter:(to, from, next) => {
    var arr = ['UserSafeQuestions','UserHasSafePwd','UserMobile','UserMail']
     RootApp.GetInitData(arr)
    var urlObj={
        ResetPwd : '找回密码',
        ResetSafePwd: '找回安全密码',
        ResetMobile: '找回手机',
        ResetQuestion: '找回密保问题',
        ResetMail : '找回邮箱'
      }
    to.meta.title=urlObj[to.query.Q]
    var F=sessionStorage.getItem('isFind')
    var U=localStorage.getItem('UserName')
    next(vm=>{
      if(!(U||F)){
        router.replace('/login')
      }
      if(F){
        to.meta.link='/forgetPwd'
      }else{
        to.meta.link='/securityCenter'
      }
    })
  },
  created:function(){
    var getUrl=this.$route.query.Q
    var urlObj=this.getKey()
    var safePwd=!!(store.state.UserHasSafePwd*1)
    this.ResetSafePwd=safePwd
    this.ResetMobile=!!store.state.UserMobile
    this.ResetQuestion=!!store.state.UserSafeQuestions
    this.ResetMail=!!store.state.UserMail
    if(urlObj[getUrl]){
      this.reUrl=getUrl
      if(getUrl!='ResetPwd'){
        if(!safePwd){
          router.replace('/securityCenter')
        }
        this[getUrl]=false
        var num=0
        state.UserMobile&&(num+=1)
        state.UserSafeQuestions&&(num+=1)
        state.UserMail&&(num+=1)
        this.SafeNum=num
      }
    }
   },
   methods:{
    getKey(){
      var urlObj={
        ResetPwd : '找回密码',
        ResetSafePwd: '找回安全密码',
        ResetMobile: '找回手机',
        ResetQuestion: '找回密保问题',
        ResetMail : '找回邮箱'
      }
      return urlObj
    }
   }
}
