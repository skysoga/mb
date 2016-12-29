export default {
  data(){
    return{
      Content:'',
      Img:'',
      isimg:true
    }
  },
  beforeRouteEnter:(to,from,next)=>{
        var name= to.params.ID
        to.meta.title=unescape(name)
        next()
  },
  created(){
    var arr = ["ActivityConfig"];
    this.$root.GetInitData(arr)
    var xname=this.$route.params.ID
    var dataArr=state.ActivityConfig
    for(var i=0;i<dataArr.length;i++){
      if(dataArr[i].Name==decodeURIComponent(xname)){
        this.Content=dataArr[i].Content
        this.Img=dataArr[i].Img
        this.isimg=this.Img||false
        return
      }
    }
  }
}
