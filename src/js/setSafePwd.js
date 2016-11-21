const {interviewApp}=require("../main.js");
export default {
  data:()=>{
    return{
      Password:"",
      checkPassword:""
    }
  },
   methods:{
    postBtn(){
      var $root=this.$root
      var ajax = {
        Password: this.Password,
        checkPassword:this.checkPassword
      }
      var selfCheck = {
        Password:{
          Name: '安全密码',
          Reg: /^[\w!@#$%^&*.]{6,16}$/,
          ErrMsg:"安全密码长度6-16位！",
        },
        checkPassword:{
          Name: '验证安全密码',
          Reg: /^[\w!@#$%^&*.]{6,16}$/,
          ErrMsg:"安全密码长度6-16位！",
        }
      }
      var err = $root.format(ajax, ['Password','checkPassword'], selfCheck);
      if (err) {
        layer.msgWarn(err[1]);
        return;
      }
      delete ajax.checkPassword;
      ajax.action="SetSafePass"
      layer.msgWait("正在提交")
      _fetch(ajax).then((res)=>{
        res.json().then((json) => {
          if(json.Code===1) {
            //验证密码
            layer.msgWarn(json.StrCode);
            this.$router.push('/securityCenter')
          }else{
            layer.msgWarn(json.StrCode);
          }
        })
      })
    }
  }
}
