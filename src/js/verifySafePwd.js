const {interviewApp}=require("../main.js");
export default {
  data:()=>{
    return{
      Password:"",
      nextUrl:""
    }
  },
  beforeRouteEnter:(to,from,next)=>{
    var F=sessionStorage.getItem('isFind')
    if(F){
      to.meta.link="/resetWay?Q=ResetPwd"
    }
    console.log(to)
    next()
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
      var _FomatC=this.$store.state._FomatConfig
      var err = this.$root.format(ajax, ['Password'], _FomatC);
      if (err) {
        layer.msgWarn(err[1]);
        return;
      }
      ajax.Action="VerifySafePwd";
      var F=sessionStorage.getItem('isFind')
      if(F){
        ajax.Action=ajax.Action+'Forget';
      }
      layer.msgWait("正在提交")
      _fetch(ajax).then((json)=>{
          if(json.Code===1) {
            var url=vm.nextUrl
            url=url?'/'+url:'/setSafePwd'
            vm.$root.$router.push(url)
          }else{
            layer.msgWarn(json.StrCode);
          }
      })
    }
  }
}
