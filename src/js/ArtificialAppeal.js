import uploadimg from '../components/uploadimg'
export default{
  data(){
    return{
      ajaxData:{
        'Image1':'',
        'Image2':''
      },
      BankNum:'',
      RealName:'',
      Password:'',
      CardList:'',
      isType:'Login',//Login,Bank,Photo
      isLockCard:false,
      nextUrl:''
    }
  },
  beforeRouteEnter(to,from,next){
    var Arr=['UserFirstCardInfo','UserBankCardList'],
    Questions=localStorage.getItem('UserSafeQuestions')
    if(Questions||!to.query.F||!to.query.Q){
      router.replace('/resetWay?Q=ResetSafePwd')
    }
    RootApp.AjaxGetInitData(Arr,ref=>{
      next(vm=>{
        vm.CardList=state.UserFirstCardInfo
        vm.isLockCard=vm.getLockCard(state.UserBankCardList)
        vm.nextUrl=to.query.Q.replace(/Reset/,'set')
      })
    })
  },
  methods:{
    $vaSubmit(){
      var ajax={
        'Login':{
          Action:'VerifyPwd',
          Password:this.Password,
          Type:'Hash'
        },
        'Bank':{
          Action:'VerifyBankCard',
          BankNum:this.BankNum,
          RealName:this.RealName,
        },
        'Photo':{
          Action:'VerifyPhoto',
          Images:this.getArr(this.ajaxData),
        }
      }
      if(this.isType=='Photo'&&(!this.ajaxData.Image1||!this.ajaxData.Image2)){
        layer.msgWarn('请上传图片')
        return
      }

      layer.msgWait("正在提交")
      var iskey=this.isType
      _fetch(ajax[this.isType]).then(json=>{
        if(json.Code==1){
          layer.msgWarn(json.StrCode);
          switch(iskey){
            case 'Login':
              let obj=json.BackData
              if(obj&&obj.State){
                if(this.isLockCard){
                  this.isType='Bank'
                }else{
                  layer.url(json.StrCode,'/'+this.nextUrl+'?Q=ResetSafePwd&F=Appeal')
                }
              }else{
                layer.url(json.StrCode,'/'+this.nextUrl+'?Q=ResetSafePwd&F=Appeal')
              }
            break;
            case 'Bank':
            this.isType='Photo'
            break;
            case 'Photo':
            layer.url(json.StrCode,'/securityCenter')
            break;
          }
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
