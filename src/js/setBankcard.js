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
      RootApp.$router.push('/login')
    }
    var Qort=to.query.id
    var nextto=Qort=='withdraw'?'/withdraw':'/manageBankcard'
    var cid=Qort=='withdraw'?'add':(Qort||'add')
    console.log(cid)
    var Trr={Action:"GetCardDetail",BankCardID:cid}
    if(cid!=='add'){
      to.meta.title="修改银行卡"
      to.meta.link='/manageBankcard'
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
              layer.open({
                shadeClose: false,
                className: "layerConfirm",
                content: json.StrCode,
                title: "温馨提示",
                btn: ["返回安全中心"],
                yes(index){
                  RootApp.$router.push("/securityCenter")
                }
              })
            }
          })
      })
    }else{
      to.meta.title="绑定银行卡"
      to.meta.link='/securityCenter'
      next(vm=>{
        vm.getCardlist()
        vm.Qort='add'
        vm.nextUrl=nextto
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
      var arr={Action:"SetBankCard"}
      arr.Address_P=this.Address_P
      arr.Address_C=this.Address_C
      arr.RealName=this.RealName
      arr.BankID=this.BankID
      arr.BankNum=this.BankNum
      arr.SafePassword=this.SafePassword
      arr.Qort=this.Qort
      _fetch(arr).then(json=>{
          if(json.Code==1){
            RootApp.AjaxGetInitData(['UserBankCardList','UserFirstCardInfo'],state=>{
              layer.url(json.StrCode,vm.nextUrl)
            })
          }else{
            layer.open({
                shadeClose: false,
                className: "layerConfirm",
                content: json.StrCode,
                title: "温馨提示",
                btn: ["留在本页","返回安全中心"],
                no(index){
                  RootApp.$router.push("/securityCenter")
                },
                yes(index){
                  layer.close(index)
                }
              })
          }
      })
    },
    getBandId(name){
      for(var n in this.Banklist){
        if(this.Banklist[n]==name)return n
    }
    },
    getCardlist(){
      var arr=['UserBankCardList']
      RootApp.GetInitData(arr,state=>{
        if(state.UserBankCardList){
          var CardLeng=state.UserBankCardList.length||0
          if(CardLeng>=5){
            RootApp.$router.push("/manageBankcard")
          }
        }
      })
    }
  }
}
