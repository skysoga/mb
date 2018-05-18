<template>
  <div class="main main-security main-form">
    <table class="table-form table-security">
      <tbody>
        <!-- 验证登录密码 -->
          <tr>
          <td>验证密码</td>
          <td><input class="input" type="password" tag="登录密码" v-va:Password  v-model.trim="Password" placeholder="请输入当前所使用的登录密码" /></td>
          </tr>
        <!-- 验证银行卡 -->
        <tr></tr>
      </tbody>
    </table>
    <div class="loginBtn BTN BTN-form"><a v-va-check>确定</a></div>
    <!-- <div class="tips-security" >
     未设置密保，可通过身份核实找回安全密码！<br>
    </div> -->
  </div>
</template>
<script>
export default{
  data(){
    return{
      ajaxData:{
        'Image1':'',
        'Image2':''
      },
      BankNum:'',
      RealName:'',
      Password:'',
      CardList:'',
      // isType:'Login',//Login,Bank,Photo
      isLockCard:false,
      nextUrl:''
    }
  },
  beforeRouteEnter(to,from,next){
    var nervUrl=from.path||''
    var Arr=['UserFirstCardInfo','UserBankCardList']
    if(!to.query.F||!to.query.Q||nervUrl!=='/resetWay'){
      router.replace('/resetWay?Q=ResetSafePwd')
    }
    RootApp.AjaxGetInitData(Arr,ref=>{
      next(vm=>{
        vm.CardList=state.UserFirstCardInfo
        vm.isLockCard=vm.getLockCard(state.UserBankCardList)
        vm.nextUrl=to.query.Q.replace(/Reset/,'set')
      })
    })
  },
  methods:{
    $vaSubmit(){
      var ajax={
          Action:'VerifyPwd',
          Password:this.Password,
          Type:'Hash'
        }
      layer.msgWait("正在提交")
      // var iskey=this.isType
      _fetch(ajax).then(json=>{
        if(json.Code==1){
          // layer.msgWarn(json.StrCode);
          if(this.isLockCard){
            // ='银行卡验证'
            let obj=json.BackData
            router.replace('/ArtificialBank?Q=ResetSafePwd&F=Appeal')
            sessionStorage.setItem('NeedPhoto',obj&&obj.State)
          }else{
            layer.url(json.StrCode,'/'+this.nextUrl+'?Q=ResetSafePwd&F=Appeal')
          }
        }else{
          layer.msgWarn(json.StrCode)
        }
      })
    },
    getArr(obj){
      var arr=[]
      for(var i in obj){
        arr.push(obj[i])
      }
      return arr
    },
    getLockCard(arr){
      if(!arr||!arr.length)return false;
      return arr.some((v,i,a)=>{
        return v.isLock==true
      })
    }
  }
}
</script>