const {interviewApp}=require("../main.js");
export default {
  data:()=>{
    return{
      Password:"",
      nextUrl:""
    }
  },
  created(){
    var Q=this.$route.query.Q
    if(Q){this.nextUrl=Q.substr(2)}
  },
  methods:{
    postBtn(){
      var vm=this
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
      layer.msgWait("正在提交")
      _fetch(ajax).then((res)=>{
        res.json().then((json) => {
          if(json.Code===1) {
            var url=vm.nextUrl
            url=url?'/'+url:'/setSafePwd'
            vm.$root.$router.push(url)
          }else{
            layer.msgWarn(json.StrCode);
          }
        })
      })
    }
  }
}
