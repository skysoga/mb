export default {
  data(){
    return{
      BankNum:'',
      RealName:''
    }
  },
  methods:{
    $vaSubmit(){
      var arr={
        Action:"FirstCardVerify",
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
