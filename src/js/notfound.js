export default {
  props: ['All'],
  data:()=>{
    return{
      cfg:{
        title:"404",
        nav:0,
        link:'',
        user:false,
        agent:false
      },
      refresh:""
    }
  },
  methods:{
    refresh:function(e){
      console.log(this);
    }
  },
  beforeRouteEnter:(to, from, next) => {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
    console.log("进入"+to.path);
    next(vm=>{
      // 这将会在mouted后执行
      vm.refresh();
    });
  },
  created:function(){
    // this.$root.Before(this);
  },
  beforeRouteLeave: (to, from, next) => {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    console.log(this);
    next()
  },
  mounted:function(){
    //可以通过$el找到组件内的dom元素
    /*this.$el.querySelector('.refresh').addEventListener('click', (e)=>{
      this.refresh="refreshMove";
      console.log(e);
      setTimeout(()=>{
        this.refresh="";
      },500);
    })*/
  },
}