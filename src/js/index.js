import { swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper'
import {mapState} from 'vuex'
export default {
  props:["s"],
  data:()=>{
    return{
      nowDisplayList:["1401","1402","1407","1406","1405","1000","1001","1008","1003","1403","1410"],
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
        if (vm.lotteryConfig[0].LotteryList.length !=0){
          vm.nowDisplayList = vm.lotteryConfig[0].LotteryList
        }
        var showlength=11
        if (vm.nowDisplayList.length >showlength)
        {
          vm.nowDisplayList.length =showlength
        }
      });
    })
  },
	computed:mapState({
		LotteryConfig:'LotteryConfig',
		LotteryList:'LotteryList'
	})
}
