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
    var arr = ["UserBankCardList"];
    //为了防止已锁定的银行卡更新不及时,这边用ajax方式
    RootApp.AjaxGetInitData(arr,state=>{
      if(!state.UserBankCardList){
        router.go(-1)
      }
      next(vm=>{
        vm.CardList=state.UserBankCardList
        vm.setTip()
      })
    })
  },
  methods:{
    setCard(){
      var Xurl=this.oneCarLok?'/verifyBankcard':'/setBankcard'
      router.push(Xurl)
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
        this.oneCarLok=List[0].isLock?true:false
        this.FiveUnlok=false
        if(List[0].isLock){
          Tips='<p>您的银行卡已经锁定，不能进行银行卡信息的增加和删除</p><route-link class="alink" to="/service">联系客服</route-link>'
        }
      }
      this.tipHtml=Tips
    },
    setImg(name){
      return this.bankArr[name]+'.png'
    }
  }
}
