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
    var Qort=Number(to.query.id)
    Qort=Qort||'add'
    if(Qort){
      var Trr={Action:"GetCardDetail",BankCardID:Qort}
      _fetch(Trr).then(json=>{
          next(vm=>{
            var son=json.BackData
            if(json.Code==1){
              vm.Address_P=son.Address_P
              vm.BankID=vm.getBandId(son.BankName)
              vm.BankNum=son.CardNum
              vm.RealName=son.RealName
              vm.Qort=Qort
              vm.$nextTick(function(){
                vm.Address_C=son.Address_C
              })
            }else{
              vm.$router.push('/manageBankcard')
            }
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
            layer.msgWarn(json.StrCode)
            vm.$root.AjaxGetInitData(['UserBankCardList'],function(){
              vm.$router.push('/manageBankcard')
            })
          }else{
            layer.msgWarn(json.StrCode)
          }
      })
    },
    getBandId(name){
      for(var n in this.Banklist){
        if(this.Banklist[n]==name)return n
    }
    }
  }
}
