import BottomBox from '../components/bottom-box';

export default {
  data:()=>{
    console.log(this);
    var BottomBoxList={
      'forgetPwd': '忘记密码',
      'pc': '电脑版'
    }
    var UserList={
      'user1': '123123',
      'user2': '123123'
    }
    if(_App) delete  BottomBoxList.pc
    return{
      UserName:'',
      Password:'',
      ImgCode:'',
      imgSrc:'',
      IcodeShow:false,
      BottomBoxShow: false,
      BottomBoxList,
      UserShow: false,
      UserList
    }
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
            RootApp.Login(this.UserName,function(){
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
      if(key=='forgetPwd'){
        router.replace("/forgetPwd")
      }else if(key=='pc'){
        location.href="http://"+location.host.replace('m.','')+"?CanPc";
      }
    },
    imgUrl(){
      var ArrD={Action:'GetImageCode'}
      var vm=this
      _fetchT(ArrD).then(data=>{
          vm.imgSrc="data:image/png;base64,R0lGODlhPAAWAPcAAAAAAAAAMwAAZgAAmQAAzAAA/wArAAArMwArZgArmQArzAAr/wBVAABVMwBVZgBVmQBVzABV/wCAAACAMwCAZgCAmQCAzACA/wCqAACqMwCqZgCqmQCqzACq/wDVAADVMwDVZgDVmQDVzADV/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMrADMrMzMrZjMrmTMrzDMr/zNVADNVMzNVZjNVmTNVzDNV/zOAADOAMzOAZjOAmTOAzDOA/zOqADOqMzOqZjOqmTOqzDOq/zPVADPVMzPVZjPVmTPVzDPV/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YrAGYrM2YrZmYrmWYrzGYr/2ZVAGZVM2ZVZmZVmWZVzGZV/2aAAGaAM2aAZmaAmWaAzGaA/2aqAGaqM2aqZmaqmWaqzGaq/2bVAGbVM2bVZmbVmWbVzGbV/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5krAJkrM5krZpkrmZkrzJkr/5lVAJlVM5lVZplVmZlVzJlV/5mAAJmAM5mAZpmAmZmAzJmA/5mqAJmqM5mqZpmqmZmqzJmq/5nVAJnVM5nVZpnVmZnVzJnV/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wrAMwrM8wrZswrmcwrzMwr/8xVAMxVM8xVZsxVmcxVzMxV/8yAAMyAM8yAZsyAmcyAzMyA/8yqAMyqM8yqZsyqmcyqzMyq/8zVAMzVM8zVZszVmczVzMzV/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8rAP8rM/8rZv8rmf8rzP8r//9VAP9VM/9VZv9Vmf9VzP9V//+AAP+AM/+AZv+Amf+AzP+A//+qAP+qM/+qZv+qmf+qzP+q///VAP/VM//VZv/Vmf/VzP/V////AP//M///Zv//mf//zP///wAAAAAAAAAAAAAAACH5BAEAAPwALAAAAAA8ABYAAAj" + data;
      })
    }
  },
  //子组件
  components:{
    'bottom-box': BottomBox
  }
}
