export default {
  data:()=>{
    return{
      ServiceUrl:null
    }
  },
  beforeRouteEnter(to,from,next){
    var ServiceUrl
    if (state.SiteConfig) {
      ServiceUrl=state.SiteConfig.Service.Url
    }else if(state.Maintain){
      ServiceUrl=state.Maintain.ServiceUrl
    }else{
      router.go(-1)
      return
    }
    next(vm=>{
      vm.ServiceUrl=ServiceUrl.replace('http:','')
      vm.$el.querySelector("iframe").style.height=document.body.clientHeight+'px'
    })
  }
}