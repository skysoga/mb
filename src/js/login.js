export default {
  data:()=>{
    return{
      UserName:'',
      Password:'',
      ImgCode:'test',
    }
  },
  beforeRouteEnter:(to, from, next) => {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
    console.log("进入"+to.path);
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // console.log(this);
    next()
  },
  mounted:function(){
    var $data = this.$parent.$data;
    // var {items,title,Storage} = $data;
    // console.log(this.$data);
    // console.log(this.$el);
    // console.log(this.$options);
    console.log(this.$root.methods);
    // console.log(items);
    // console.log(title);
    // console.log(Storage);
    // console.log(this.$router);
  },
  methods:{
    login:function(e){
      var vm = this,
        $root = this.$root;
      var ajax = {
        UserName:this.UserName,
        Password:this.Password
      };
      var err = this.$root.format(ajax);
      if (err) {
        alert(err[1]);
        return;
      }
      ajax.Action="Login";
      _fetch(ajax).then((res)=>{
        res.json().then((json) => {
          if (json.Code===1) {
            this.$root.Login(this.UserName,function(){
              $root.$router.push("/index");
            })
          }else{
            alert(json.StrCode);
          }
        })
      })
    },
  }
}