export default {
  data(){
    return{
      BankNum:'',
      RealName:''
    }
  },
  beforeRouteEnter(to,from,next){
    var Arr=['UserFirstCardInfo'];
    RootApp.AjaxGetInitData(Arr,ref=>{
      next()
    })
  },
  methods:{
    $vaSubmit(){
      var arr={
        Action:"VerifyBankCard",
        BankNum:this.BankNum,
        RealName:this.RealName
      }
      layer.msgWait("正在提交")
      _fetch(arr).then(json=>{
          if(json.Code==1){
            layer.url(json.StrCode,'/setBankcard')
          }else{
            layer.msgWarn(json.StrCode)
          }
      })
    }
  }
}
