const CityJson=require("./CityJson.js")
export default {
  data:()=>{
    return{
      CityJson:CityJson,
      Address_P:'',
      Address_C:'',
      RealName:'',
      BankID:'',
      SafePassword:'',
      nextUrl:'',
      BankNum:'',
      checkBankNum:'',
      Qort:'',
      Banklist:{
            1:'工商银行',
            2:'建设银行',
            3:'农业银行',
            4:'民生银行',
            5:'招商银行',
            6:'交通银行',
            7:'中国银行',
            8:'邮政储蓄',
            9:'中信银行',
            10:'兴业银行',
            11:'华夏银行',
            12:'浦发银行',
            13:'广发银行',
            14:'平安银行',
            15:'光大银行',
            17:'农商银行'
            }
    }
  },
  beforeRouteEnter(to,from,next){
    var U=localStorage.getItem('UserName')
    if(!U){
      router.replace('/login')
    }
    var Qort=to.query.Q
    var nextto=Qort=='withdraw'?'/withdraw':'/manageBankcard'
    var cid=Qort=='withdraw'?'add':(Qort||'add')
    var Trr={Action:"GetCardDetail",BankCardID:cid}
    if(cid!=='add'&&Qort!='bindCard'){
      to.meta.title="修改银行卡"
      _fetch(Trr).then(json=>{
          next(vm=>{
            var son=json.BackData
            if(json.Code==1){
              vm.Address_P=son.Address_P
              vm.BankID=vm.getBandId(son.BankName)
              vm.BankNum=son.CardNum
              vm.RealName=son.RealName
              vm.Qort=cid
              vm.$nextTick(function(){
                vm.Address_C=son.Address_C
                vm.nextUrl=nextto
              })
            }else{
              layer.url(json.StrCode,"/securityCenter")
            }
          })
      })
    }else{
      var arr = ["UserBankCardList"]
      to.meta.title="绑定银行卡"
      RootApp.AjaxGetInitData(arr,ref=>{
        next(vm=>{
          vm.getCardlist()
          vm.Qort='add'
          vm.nextUrl=nextto
        })
      })
    }
  },
  computed:{
      CityFun(){
      var vm=this
      this.Address_C=''
      var jsonObj=this.CityJson
        for(var x in jsonObj){
          if(jsonObj[x].name==vm.Address_P){
            return jsonObj[x].city
          }
        }
      }
  },
  methods:{
    $vaSubmit(){
      var vm=this
      var arr={
        Action:"SetBankCard",
        Address_P:this.Address_P,
        Address_C:this.Address_C,
        RealName:this.RealName,
        BankID:this.BankID,
        BankNum:this.BankNum,
        SafePassword:this.SafePassword,
        Qort:this.Qort
      }
      layer.msgWait("正在提交")
      _fetch(arr).then(json=>{
          if(json.Code==1){
              var Arr=["UserBankCardList","UserFirstCardInfo"]
              store.commit('ClearInitData', Arr)//更新首张银行卡和银行列表
            // RootApp.AjaxGetInitData(['UserBankCardList','UserFirstCardInfo'])
            if(vm.nextUrl=='/withdraw'){
              layer.open({
                  shadeClose: false,
                  className: "layerConfirm",
                  content: json.StrCode +"<br>是否立即去提现?",
                  title: "温馨提示",
                  btn: ["是","否"],
                  no(index){
                    router.replace("/manageBankcard")
                  },
                  yes(index){
                    router.replace(vm.nextUrl)
                  }
                })
            }else{
              layer.url(json.StrCode,'/manageBankcard')
            }
          }else{
            layer.msgWarn(json.StrCode)
          }
      })
    },
    getBandId(name){
      for(var n in this.Banklist){
        if(this.Banklist[n]==name)return n
      }
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
    getCardlist(){
        if(state.UserBankCardList){
          var CardLeng=state.UserBankCardList.length||0
          if(CardLeng>=5){
            layer.url("您已绑定5张银行卡，无法绑定更多的卡","/manageBankcard")
          }else if(this.isLock(state.UserBankCardList)){
            if(!state.UserVerify||state.UserVerify!=="BankCard,"){
              router.replace('/verifyBankcard')
            }
          }
        }
    }
  }
}
