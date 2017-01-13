export default {
  data:()=>{
    return{}
  },
  created:function(){
    var arr = ["SiteConfig"];
    RootApp.GetInitData(arr);
  },
  mounted:function(){
    this.$el.querySelector("iframe").style.height=document.body.clientHeight+'px';
  }
}