import { swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper'
export default {
  props:["s"],
  data:()=>{
    return{
      LList:["1401","1402","1407","1406","1405","1000","1001","1008","1003","1403","1410","1408","1411","1409"],
      len:0
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  beforeRouteEnter:(to, from, next) => {
    var search=location.search
    if(location.pathname==="/"&&search&&(search.search(/^\?id=\d{8}/)===0)){
      //必须是从根路径来的且带着id=邀请码
      //如果是注册
      next(vm=>{
        router.push("/register"+search)
      })
    }
    var NologApp = _App&&!state.UserName
    if (NologApp) {
      to.meta.title='未登录'
    }
    var arr = [!NologApp?"BannerList":"SysBanner","LotteryConfig","LotteryList"],
      ar=["SiteConfig"];
    state.UserName&&arr.push("NoticeData")
    arr = (!_App||state.UserName)?arr.concat(ar):arr
    RootApp.GetInitData(arr, state=>{
      next(vm=>{
       /* var K3,SSC
        for (var i = state.LotteryConfig.length - 1; i >= 0; i--) {
          switch(state.LotteryConfig[i].LotteryClassID){
            case "14":
              K3 = state.LotteryConfig[i].LotteryList
            break
            case "10":
              SSC = state.LotteryConfig[i].LotteryList
            break
          }
        }
        vm.LList = K3.concat(SSC)*/
        vm.len = vm.LList.length
      });
    })
  }
}
