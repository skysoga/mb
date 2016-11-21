const interviewApp=require("../main.js");
export default {
  data(){
    return{
      Password:""
    }
  },
  methods:{
    postBtn(){
      var $root=this.$root
      var ajax = {
        Password: this.Password
      }
      var _FomatC=this.$store.state._FomatConfig
      var err = this.$root.format(ajax, ['Password'], _FomatC);
      if (err) {
        layer.msgWarn(err[1]);
        return;
      }
      ajax.Action="verifyPass";
      var F=sessionStorage.getItem('isFind')
      if(F){
        ajax.Action=ajax.Action+'Forget';
      }
      layer.msgWait("正在提交")
      _fetch(ajax).then((res)=>{
        res.json().then((json) => {
          if(json.Code===1) {
            //验证密码
            $root.$router.push('/setPwd?Q=ResetPwd')
          }else{
            layer.msgWarn(json.StrCode);
          }
        })
      })
    }
  }
}
