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
    login:function(e){
      var vm = this,
        $root = this.$root;

      var ajax = {
        UserName:this.UserName,
        Password:this.Password
      };
      var err = this.$root.format(ajax, ['Password', 'UserName']);
      if (err) {
        layer.msgWarn(err[1])
        return;
      }
      ajax.Action="Login";
      layer.msgWait("正在登录")
      _fetch(ajax).then((json)=>{
        if (json.Code===1) {
          this.$root.Login(this.UserName,function(){
            $root.$router.push("/index")
          })
        }else{
          layer.msgWarn(json.StrCode)
        }
      })
    },
    bottomBox(key,val){
      if(key=='forgetPwd'){
        RootApp.$router.push("/forgetPwd")
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
