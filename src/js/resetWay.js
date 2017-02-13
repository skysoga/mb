export default {
  data:()=>{
    return{
      reUrl:'',
      ResetSafePwd:'',
      ResetMobile:'',
      ResetQuestion:'',
      ResetMail:''
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
        router.push('/login')
      }
      if(F){
        to.meta.link='/forgetPwd'
      }
    })
  },
  created:function(){
    var getUrl=this.$route.query.Q
    var vm=this
    var urlObj=this.getKey()
      vm.ResetSafePwd=!!(store.state.UserHasSafePwd*1)
      vm.ResetMobile=!!store.state.UserMobile
      vm.ResetQuestion=!!store.state.UserSafeQuestions
      vm.ResetMail=!!store.state.UserMail
      if(urlObj[getUrl]){
        vm.reUrl=getUrl
        if(getUrl!='ResetPwd'){
          vm[getUrl]=false
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
