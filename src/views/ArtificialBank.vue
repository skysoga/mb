<template>
  <div class="main">
    <table>
      <tbody>
        <!-- 验证登录密码 -->
        <!-- 验证银行卡 -->
        <tr>
          <td>银行卡号</td>
          <td class = "_bankcardNum">{{$store.state.UserFirstCardInfo[0].CardNum}}</td>
        </tr>
        <tr>
          <td>银行账户</td>
          <td class = "_realname">{{$store.state.UserFirstCardInfo[0].RealName}}</td>
        </tr>
        <tr>
          <td>确认卡号</td>
          <td>
            <input type="tel" v-va:BankNum tag="确认卡号" value="" v-model.trim="BankNum" placeholder="请输入完整卡号">
          </td>
        </tr>
        <tr>
          <td>确认户名</td>
          <td>
            <input type="RealName" v-va:RealName tag="确认户名" v-model.trim="RealName" placeholder="请输入完整户名">
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <div class="loginBtn BTN"><a v-va-check>确定</a></div>
    <div class="tips" >
     未设置密保，可通过身份核实找回安全密码！<br>
    </div>
  </div>
</template>
<script>
export default{
  data(){
    return{
      BankNum:'',
      RealName:'',
      Password:'',
      CardList:'',
      isType:'Login',//Login,Bank,Photo
      isLockCard:false,
      nextUrl:''
    }
  },
  beforeRouteEnter(to,from,next){
    var nervUrl=from.path||''
    var Questions=localStorage.getItem('UserSafeQuestions')
    if(Questions||!to.query.F||!to.query.Q||nervUrl!=='/ArtificialAppeal'){
      router.replace('/resetWay?Q=ResetSafePwd')
    }
    next(vm=>{
      vm.CardList=state.UserFirstCardInfo
      vm.nextUrl=to.query.Q.replace(/Reset/,'set')
    })
  },
  methods:{
    $vaSubmit(){
      var ajax={
          Action:'VerifyBankCard',
          BankNum:this.BankNum,
          RealName:this.RealName,
        }
      layer.msgWait("正在提交")
      var iskey=this.isType
      _fetch(ajax).then(json=>{
        if(json.Code==1){
          layer.msgWarn(json.StrCode);
          router.replace('/ArtificialPhoto?Q=ResetSafePwd&F=Appeal')
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
<style lang="scss" scoped>
  @import '../scss/SecurityCenter.scss';
</style>
