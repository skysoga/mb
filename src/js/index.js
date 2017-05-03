import { swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper'
  import {mapState} from 'vuex'
export default {
  props:["s"],
  data:()=>{
    return{
      nowDisplayList:[],
      len:11
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
        router.replace("/register"+search)
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
        vm.lotteryConfig = vm.LotteryConfig.slice(0,1)
        vm.LotteryConfig[0].LotteryList.length =11
        vm.nowDisplayList = vm.lotteryConfig[0].LotteryList
        vm.len = vm.lotteryConfig[0].LotteryList.length
      });
    })
  },
	computed:mapState({
		LotteryConfig:'LotteryConfig',
		LotteryList:'LotteryList'
	})
}
