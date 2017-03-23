export default{
  data(){
    return{
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
      },
      UserBankList:[],
      UserAvail:'',
      PayLimit:'',
      MinMoney:'',
      MaxMoney:'',
      ReGetTime:'',
      isShow:false,
      ArrData:{
        Action:'Withdraw',
        SafePassword:'',
        BankCardID:'',
        Money:''
      }
    }
  },
  beforeRouteEnter(to,from,next){
    var bArr=["UserHasSafePwd","UserFirstCardInfo"]
    RootApp.GetInitData(bArr,ref=>{
      var safaPwd=state.UserHasSafePwd*1,
        FistCard=state.UserFirstCardInfo;
        if(safaPwd){
          if(FistCard&&FistCard[0]){
            var arr=['UserBalance', 'UserWithdrawAvail','UserBankCardList','WithdrawRemainTimes','PayLimit']
            RootApp.GetInitData(arr,state=>{
              next(vm=>{
                vm.UserBankList=state.UserBankCardList
                vm.UserBalance=state.UserBalance
                vm.UserAvail=state.UserWithdrawAvail
                vm.PayLimit=state.PayLimit
                vm.ArrData.BankCardID=vm.UserBankList[0].BankCardID
                vm.getMoney()
                vm.ReGetTime=state.WithdrawRemainTimes
              })
            })
          }else{
            layer.open({
              shadeClose: false,
              className: "layerConfirm",
              content: "您还没绑定银行卡，无法提现，</br>是否先去绑定银行卡?",
              title: "温馨提示",
              btn: ["是","否"],
              yes:function(){
                router.push("/setBankcard?Q=withdraw")
              },
              no(){
                state.turning=false
              }
            })
          }
        }else{
          layer.open({
            shadeClose: false,
            className: "layerConfirm",
            content: "您还未设置安全密码和绑定银行卡，无法提现，是否先去设置安全密码?",
            title: "温馨提示",
            btn: ["是","否"],
            yes:function(){
              router.push("/setSafePwd?Q=withdraw")
            },
            no(){
              state.turning=false
            }
          })
        }
    })
  },
  methods:{
    $vaSubmit(){
      var vm=this
      layer.msgWait("正在提交")
      _fetch(this.ArrData).then(json=>{
        if(json.Code==1){
          layer.open({
            className: "layerConfirm",
            title:"温馨提示",
            content:"提现申请提交成功，请在3-5分钟后查询是否到账。",
            btn:["返回我的账户","留在本页"],
            yes:function(){
              vm.upTime()
              router.push("/userCenter")
            },
            no:function(){
              vm.upTime()
              layer.closeAll()
              vm.ArrData.Money=""
              vm.ArrData.SafePassword=""
            }
          })
        }else{
          layer.msgWarn(json.StrCode)
        }
      })
    },
    getMoney(){
      var Arr=this.PayLimit['提现金额']
      this.MinMoney=Arr[0]
      this.MaxMoney=Arr[1]
      this.vaConfig ||(this.vaConfig = {})
      this.vaConfig['Money'] || (this.vaConfig['Money'] = [])
      this.vaConfig['Money'].push(new this.VaConfig('limit', Arr, '', 'Money', '提现金额'))
    },
    toggle(){
      if(this.UserBankList.length>1){
        this.isShow=!this.isShow
      }else{
        layer.msg("您只绑定了一张银行卡，无法切换。")
      }
    },
    setCard(key,id){
        var Arr=this.UserBankList
        for(var i=0;i<Arr.length;i++){
          if(Arr[i]==key){
            Arr.splice(i,1)
            break
          }
        }
        Arr.unshift(key)
        this.ArrData.BankCardID=id
        this.UserBankList=Arr
    },
    upTime(){
      var vm=this
      var arr=['UserBalance', 'UserWithdrawAvail','WithdrawRemainTimes']
      RootApp.AjaxGetInitData(arr,ref=>{
        vm.ReGetTime=ref.WithdrawRemainTimes
        vm.UserBalance=ref.UserBalance
        vm.UserAvail=ref.UserWithdrawAvail
      })
    }
  }
}
