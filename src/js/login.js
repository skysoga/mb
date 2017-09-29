import BottomBox from '../components/bottom-box';

export default {
  data:()=>{
    var BottomBoxList={
      'forgetPwd': '忘记密码',
      'pc': '电脑版'
    }
    if(_App) delete  BottomBoxList.pc

    return{
      UserName:'',
      Password:'',
      ImgCode:'',
      isLogin:false,
      imgSrc:'',
      IcodeShow:false,
      BottomBoxShow: false,
      BottomBoxList,
      UserList:''
    }
  },
  created(){
    // 判断是否有缓存帐号记录
    var obj=this.getLocalStorage();
    this.UserList=(obj&&obj.length)?this.ArrToObj(obj):''
  },
  beforeRouteEnter:(to,from,next)=>{
    next(v=>{
      var IVK=getCookie('IVK')
      if(!IVK){
        // let arr={Action:"GetInitData"}//修正IVK获取问题
        // _fetch(arr).then()
        RootApp.getServerTime()
      }
    })
  },
  methods:{
    $vaSubmit:function(e){
      //浏览器记住密码修正
      this.UserName=this.$refs.UserName.value
      this.Password=this.$refs.Password.value
        var ajax = {
          Action:"Login",
          UserName:this.UserName,
          Password:this.Password
        }
        if(this.IcodeShow){
          ajax['ImgCode']=this.ImgCode
        }
        layer.msgWait("正在登录")
        _fetch(ajax).then((json)=>{
          if (json.Code===1) {
            RootApp.Logout()
            RootApp.Login(this.UserName,()=>{
              this.addLogin(this.UserName.toLowerCase(),md5(this.UserName+md5(this.Password)))
              router.replace(state.login2path||"/index")
            })
          }else if(json.Code===2){
            this.IcodeShow=true
            this.imgUrl()
            layer.msgWarn(json.StrCode)
          }else{
            layer.msgWarn(json.StrCode)
          }
        })
    },
    bottomBox(key,val){
      // 判断是否APP
      if(this.isLogin){
        this.BottomBoxShow=false
        this.autoLogin(key,val)
      }else{
        if(key=='forgetPwd'){
          router.replace("/forgetPwd")
        }else if(key=='pc'){
          location.href="http://"+location.host.replace('m.','')+"?CanPc";
        }
      }
    },
    imgUrl(){
      var ArrD={Action:'GetImageCode'}
      var vm=this
      _fetchT(ArrD).then(data=>{
          vm.imgSrc="data:image/png;base64,R0lGODlhPAAWAPcAAAAAAAAAMwAAZgAAmQAAzAAA/wArAAArMwArZgArmQArzAAr/wBVAABVMwBVZgBVmQBVzABV/wCAAACAMwCAZgCAmQCAzACA/wCqAACqMwCqZgCqmQCqzACq/wDVAADVMwDVZgDVmQDVzADV/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMrADMrMzMrZjMrmTMrzDMr/zNVADNVMzNVZjNVmTNVzDNV/zOAADOAMzOAZjOAmTOAzDOA/zOqADOqMzOqZjOqmTOqzDOq/zPVADPVMzPVZjPVmTPVzDPV/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YrAGYrM2YrZmYrmWYrzGYr/2ZVAGZVM2ZVZmZVmWZVzGZV/2aAAGaAM2aAZmaAmWaAzGaA/2aqAGaqM2aqZmaqmWaqzGaq/2bVAGbVM2bVZmbVmWbVzGbV/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5krAJkrM5krZpkrmZkrzJkr/5lVAJlVM5lVZplVmZlVzJlV/5mAAJmAM5mAZpmAmZmAzJmA/5mqAJmqM5mqZpmqmZmqzJmq/5nVAJnVM5nVZpnVmZnVzJnV/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wrAMwrM8wrZswrmcwrzMwr/8xVAMxVM8xVZsxVmcxVzMxV/8yAAMyAM8yAZsyAmcyAzMyA/8yqAMyqM8yqZsyqmcyqzMyq/8zVAMzVM8zVZszVmczVzMzV/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8rAP8rM/8rZv8rmf8rzP8r//9VAP9VM/9VZv9Vmf9VzP9V//+AAP+AM/+AZv+Amf+AzP+A//+qAP+qM/+qZv+qmf+qzP+q///VAP/VM//VZv/Vmf/VzP/V////AP//M///Zv//mf//zP///wAAAAAAAAAAAAAAACH5BAEAAPwALAAAAAA8ABYAAAj" + data;
      })
    },
    setType(val){
      // 切换组件类型
      this.isLogin=val
      this.BottomBoxShow=true
    },
    getLoginedIndex(key,Arr){
      Arr=Arr||this.getLocalStorage()
      var m
      Arr.some(function(i,n){
        if(i.split('&')[0]===key){
          m=n;
          return true;
        }
      })
      /*Arr.forEach((i,n)=>{
        var obj=i.split('&')[0]
        if(obj==key){
          m=n;
          break;
          // Arr.splice(n,1)
        }
      })*/
      return m
    },
    addLogin(key,val){
      // 添加登录记录
      var getArr=this.getLocalStorage() || []
      if(getArr.length){
        var Arr=getArr
        var n=getLoginedIndex(key,Arr)
        this.removeLogin(n)
        Arr.unshift(key+'&'+val)
        // console.log(Arr)
        // Arr=this.setArrUN(Arr)
        // console.log(Arr)
        // if(Arr.length>5){
        //   Arr.length=5
        // }
        this.setLocalStorage(Arr)
      }else{
        // var setVal=[]
        getArr.push(key+'&'+val)
        this.setLocalStorage(getArr)
        // this.setLocalStorage(this.setArrUN(setVal))
      }
    },
    delLogin(n){
      // 删除登录记录
      layer.confirm('是否删除登录记录',()=>{
        this.removeLogin(n)
        layer.alert('记录删除成功')
      })
    },
    getLocalStorage(){
      // 获取缓存帐号
      var Logined=localStorage.getItem('Logined')
      try{
        Logined=JSON.parse(Logined)
      }catch(e){
        Logined=null
      }
      return Logined
    },
    /*setArrUN(val){
      return Array.from(new Set(val))
    },*/
    setLocalStorage(val){
      localStorage.setItem('Logined',JSON.stringify(val))
    },
    removeLogin(key){
      var obj=this.getLocalStorage()
      obj.splice(key,1)
      this.setLocalStorage(obj)
      this.UserList=obj.length?this.ArrToObj(obj):''
      this.BottomBoxShow=false
    },
    isNull(val){
      return val&&val.length
    },
    ArrToObj(Arr){
      let Obj={}
      for(var i=0;i<Arr.length;i++){
        var val=Arr[i].split("&")
        Obj[val[0]]=val[1]
      }
      return Obj
    },
    autoLogin(user,pwd){
      // 从记录自动登录
      var ajax = {
        Action:"Login",
        UserName:user,
        Password:pwd
      }
      layer.msgWait("正在登录")
      _fetch(ajax).then((json)=>{
        if (json.Code===1) {
          RootApp.Logout()
          RootApp.Login(user,()=>{
            router.replace(state.login2path||"/index")
          })
        }else{
          layer.msgWarn(json.StrCode)
          if (json.StrCode.search('密码错误')!==1) {
            //密码错误要删除记录
            var n=this.getLoginedIndex(user)
            this.removeLogin(n)
          }
        }
      })
    }
  },
  //子组件
  components:{
    'bottom-box': BottomBox
  }
}

