import BottomBox from '../components/bottom-box';

export default {
  data:()=>{
    return{
      UserName:'',
      Password:'',
      ImgCode:'test',

      BottomBoxShow: false,
      BottomBoxList:{
        'forgetPwd': '忘记密码',
        'pc': '电脑版'
      }
    }
  },
  methods:{
    $vaSubmit:function(e){
      var vm = this
      var ajax = {
        UserName:this.UserName,
        Password:this.Password
      }
      ajax.Action="Login";
      layer.msgWait("正在登录")
      _fetch(ajax).then((json)=>{
        if (json.Code===1) {
          RootApp.Login(this.UserName,function(){
            router.push(state.login2path||"/index")
          })
        }else{
          layer.msgWarn(json.StrCode)
        }
      })
    },
    bottomBox(key,val){
      if(key=='forgetPwd'){
        router.push("/forgetPwd")
      }else if(key=='pc'){
        location.href="http://"+location.host.replace('m.','www.')+"/index.html?CanPc";
      }
    }
  },
  //子组件
  components:{
    'bottom-box': BottomBox
  }
}
