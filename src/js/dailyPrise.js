const interviewApp=require("../main.js");
export default {
  data:()=>{
    return{}
  },
  // beforeRouteEnter:(to, from, next) => {
  //   // 在渲染该组件的对应路由被 confirm 前调用
  //   // 不！能！获取组件实例 `this`
  //   // 因为当钩子执行前，组件实例还没被创建
  //   var arr = ["UserBalance"];
  //   interviewApp.AjaxGetInitData(arr,next)
  //   /*next(vm=>{
  //     vm.getBalance()
  //   })*/
  // },
  // methods:{
  //   refresh:function(e){
  //     var t = this,c=this.refreshClass
  //     this.refreshClass+=" refreshMove"
  //     this.getBalance()
  //     setTimeout(()=>{
  //       this.refreshClass="refresh"
  //     },500)
  //   },
  //   getBalance:function(){
  //     this.$root.AjaxGetInitData(['UserBalance'])
  //   }
  // }
}
