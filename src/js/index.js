import { swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper'
export default {
  data:()=>{
    return{
      LList:null,
      len:0
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  beforeRouteEnter:(to, from, next) => {
    var arr = ["BannerList","NoticeData","LotteryConfig","LotteryList","SiteConfig"];
    RootApp.GetInitData(arr, state=>{
      next(vm=>{
        var K3,SSC
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
        vm.LList = K3.concat(SSC)
        vm.len = vm.LList.length
      });
    })
  }
}
