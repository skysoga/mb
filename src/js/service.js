export default {
  data:()=>{
    return{}
  },
  created:function(){
    var arr = ["SiteConfig"];
    this.$root.GetInitData(arr);
  },
  mounted:function(){
    this.$el.querySelector("iframe").style.height=(window.screen.height-40)+'px';
  }
}