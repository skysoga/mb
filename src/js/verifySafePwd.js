const interviewApp=require("../main.js");
export default {
  data:()=>{
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
      var selfCheck = {
        Password:{
          Name: '安全密码',
          Reg: /^[\w!@#$%^&*.]{6,16}$/,
          ErrMsg:"安全密码长度6-16位！",
        },
      }
      var err = this.$root.format(ajax, ['Password'], selfCheck);
      if (err) {
        layer.msgWarn(err[1]);
        return;
      }
      ajax.Action="VerifySafePwd";
      _fetch(ajax).then((res)=>{
        res.json().then((json) => {
          if(json.Code===1) {
            //验证密码
            $root.$router.push('/setSafePwd?Q=ResetSafePwd')
          }else{
            layer.msgWarn(json.StrCode);
          }
        })
      })
    }
  }
}
