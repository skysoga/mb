const interviewApp=require("../main.js");
export default {
  data:()=>{
    return{
      Password:""
    }
  },
  methods:{
    postBtn:function(){
      var ajax = {
        Password: this.Password
      }
      var selfCheck = {
        Password:{
          Name: '密码',
          Reg: /^[\w!@#$%^&*.]{6,16}$/,
          ErrMsg:"密码长度6-16位！",
        },
      }
      var err = this.$root.format(ajax, ['Password'], selfCheck);
      if (err) {
        layer.msgWarn(err[1]);
        return;
      }
      ajax.Action="verifyPass";
      _fetch(ajax).then((res)=>{
        res.json().then((json) => {
          console.log(json)
          if(json.Code===1) {
            //验证密码
          }else{
            layer.msgWarn(json.StrCode);
          }
        })
      })
    }
  }
}
