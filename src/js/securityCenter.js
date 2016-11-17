const interviewApp=require("../main.js");
export default {
  data:()=>{
    return{
      refreshClass:"refresh"
    }
  },
  beforeRouteEnter:(to, from, next) => {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
    var arr = ['UserHasSafePwd', //返回是否已经设置安全密码,1为有,0为没有设置
      'UserSafeQuestions', //返回设置的密保问题,如果没设置可以返回0或者空数组
      'UserMobile', //返回已绑定手机的模糊状态,如未绑定,返回空字符串或0
      'UserMail',
      'UserFirstCardInfo',];
    interviewApp.AjaxGetInitData(arr,next)
    /*next(vm=>{
      vm.getBalance()
    })*/
  },
  methods:{
    refresh:function(e){
      var t = this,c=this.refreshClass
      this.refreshClass+=" refreshMove"
      this.getBalance()
      setTimeout(()=>{
        this.refreshClass="refresh"
      },500)
    },
    getBalance:function(){
      this.$root.AjaxGetInitData(['UserBalance'])
    },
    loginOut:function(){
      var vm = this,
        $root = this.$root;
      var ajax = {Action:"LogOut"}
      _fetch(ajax).then((res)=>{
        res.json().then((json) => {
          if (json.Code===1) {
            this.$root.Logout()
          }else{
            layer.msgWarn(json.StrCode)
          }
        })
      })
    }
  }
}
