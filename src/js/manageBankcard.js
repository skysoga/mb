var isSPwd = false
export default {
  data:()=>{
    return{
      CardList:'',
      tipHtml:'',
      FiveUnlok:true,
      oneCarLok:'',
      bankArr:{
        '农业银行':'ABC',
        '交通银行':'BCM',
        '中国银行':'BOC',
        '建设银行':'CCB',
        '光大银行':'CEB',
        '兴业银行':'CIB',
        '中信银行':'CITIC',
        '招商银行':'CMB',
        '民生银行':'CMBC',
        '广发银行':'GDB',
        '华夏银行':'HXBANK',
        '工商银行':'ICBC',
        '邮政储蓄':'PSBC',
        '平安银行':'SPABANK',
        '浦发银行':'SPDB',
        '农商银行':'CRCC'
      }
    }
  },
  beforeRouteEnter(to,from,next){
    var arr = ["UserBankCardList","UserHasSafePwd"];
    RootApp.GetInitData(arr,state=>{
      isSPwd=state.UserHasSafePwd
      next(vm=>{
        vm.CardList=state.UserBankCardList
        vm.setTip()
      })
    })
  },
  methods:{
    setCard(){
      if(!isSPwd || isSPwd == 0){
        layer.open({
          shadeClose: false,
          className: "layerConfirm",
          content: "您还未设置安全密码，是否先去设置安全密码?",
          title: "温馨提示",
          btn: ["是","否"],
          yes:function(index){
            layer.close(index)
            router.replace("/setSafePwd")
          },
          no(){}
        })
        return
      }
      var Xurl=this.oneCarLok?'/verifyBankcard':'/setBankcard'
      router.replace(Xurl)
    },
    setTip(){
      var List=this.CardList
      var Tips=''
      if(!List.length){
        Tips='您尚未绑定银行卡，一共可以绑定5张银行卡。'
        this.FiveUnlok=false
      }else if(List.length>=5){
        Tips='您已绑定' +List.length+ '张银行卡，无法绑定更多的卡。成功提现的银行卡会自动锁定，无法删除和修改。'
        this.FiveUnlok=true
      }else{
        Tips='您已绑定' +List.length+ '张银行卡，一共可以绑定5张银行卡。为了您的资金安全，成功提现的银行卡会自动锁定，无法删除和修改。'
        this.oneCarLok=this.isLock(List)?true:false
        this.FiveUnlok=false
      }
      this.tipHtml=Tips
    },
    isLock(Arr){
      var isUn=false
      for(var n of Arr){
        if(n.isLock){
          return isUn=true
        }
      }
      return isUn
    },
    setImg(name){
      return this.bankArr[name]+'.png'
    }
  }
}
