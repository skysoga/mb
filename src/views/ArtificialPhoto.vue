<template>
  <div class="main">
      <table>
        <tbody>
          <!-- 图片验证 -->
          <tr>
            <td colspan="2"><uploadimg ref="Image1" :type="'Image1'" title="银行卡正面"/></td>
          </tr>
          <tr>
            <td colspan="2"><uploadimg ref="Image2" :type="'Image2'" title="身份证正面"/></td>
          </tr>
          <!-- 验证结束 -->
          <tr></tr>
        </tbody>
      </table>
    <div class="loginBtn BTN"><a v-va-check>确定</a></div>
    <div class="tips" >
      1、如果审核通过，安全密码会设为123456，届时请及时修改；<br>
      2、我们将在10个小时内审核您的资料，并通过站内信通知审核结果；<br>
      3、请关注站内信，站内信位于我的帐户->我的消息<br>
    </div>
  </div>
</template>
<script>
  import uploadimg from '../components/uploadimg'
export default{
  data(){
    return{
      ajaxData:{
        'Image1':'',
        'Image2':''
      },
      result:false,//照片提交
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
    if(!to.query.F||!to.query.Q||nervUrl!=='/ArtificialBank'){
      router.replace('/resetWay?Q=ResetSafePwd')
    }
    next(vm=>{
      vm.nextUrl=to.query.Q.replace(/Reset/,'set')
      layer.msgWarn('您的账户存在安全隐患，需提交资料人工核实！')
    })
  },
  methods:{
    $vaSubmit(){
      var ajax={
          Action:'VerifyPhoto',
          Images:this.getArr(this.ajaxData),
        }
      if(!this.ajaxData.Image1||!this.ajaxData.Image2){
        layer.msgWarn('请上传图片')
        return
      }
      layer.msgWait("正在提交")
        // var iskey=this.isType
        _fetch(ajax).then(json=>{
          if(json.Code==1){
            layer.msgWarn(json.StrCode);
            this.result=true
            this.$refs.Image1.reset()
            this.$refs.Image2.reset()
            // layer.url(json.StrCode,'/securityCenter')
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
  },
  components:{
    uploadimg
  }
}

</script>
<style lang="scss" scoped>
  @import '../scss/SecurityCenter.scss';
</style>
