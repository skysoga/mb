export default {
  data:()=>{
    return{
      UserName:'',
      ImgCode:'',
      imgSrc:''
    }
  },
  created(){
    var user=localStorage.getItem("UserName")
    if(!!user){
      router.replace("/securityCenter")
    }else{
      sessionStorage.removeItem("isFind")
      var Sarr=["UserHasSafePwd","UserMail","UserMobile","UserSafeQuestions"]
      for(let i of Sarr){
        localStorage.removeItem(i)
      }
    }
    this.imgUrl()
  },
  methods:{
    $vaSubmit(){
      var vm=this
      var ArrData={
        UserName:this.UserName,
        ImgCode:this.ImgCode
      }
      ArrData.Action='SetSessionUser'
      layer.msgWait("正在提交")
      _fetch(ArrData).then(json=>{
          if(json.Code==1||json.Code==0){
            RootApp.SaveInitData(json.BackData)
            sessionStorage.setItem('isFind',true)
            sessionStorage.setItem('UserName',this.UserName)
           RootApp.$router.replace({path:'resetWay',query:{Q:'ResetPwd'}})
          }else{
            layer.msgWarn(json.StrCode)
          }
          vm.imgUrl()
      })
    },
    imgUrl(){
      _fetch({Action:'GetImageCode'}).then((text)=>{
        this.imgSrc = text;
      })
    }
  }
}
