const interviewApp=require("../main.js")
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
    var urlObj={
        ResetPwd : '找回密码',
        ResetSafePwd: '找回安全密码',
        ResetMobile: '找回手机',
        ResetQuestion: '找回密保问题',
        ResetMail : '找回邮箱'
      }
    to.meta.title=urlObj[to.query.Q]

    next()
  },
  created:function(){
    var getUrl=this.$route.query.Q
    console.log(this.$store)
    var vm=this
    var urlObj=this.getKey()
     var arr = ['UserSafeQuestions','UserHasSafePwd','UserMobile','UserMail'];
     vm.$root.GetInitData(arr,stage=>{
      vm.ResetSafePwd=!!stage.UserHasSafePwd
      vm.ResetMobile=!!stage.UserMobile
      vm.ResetQuestion=!!stage.UserSafeQuestions
      vm.ResetMail=!!stage.UserMail
      if(urlObj[getUrl]){
        vm.reUrl=getUrl
        if(getUrl!='ResetPwd'){
          vm[getUrl]=false
        }
      }
     })
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
