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
    //是APP且未登录
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
        //不上线的彩种code列表， 用slice避免对源数组产生引用
        var offLineLottery = []
        vm.LotteryConfig.forEach(item=>{
          if(item.LotteryClassID === '12'){
            offLineLottery = item.LotteryList.slice()
          }
        })

        // 获取热门彩种code列表
        var hotLottery = []
        vm.LotteryConfig.forEach(item=>{
          if(item.LotteryClassID === '0'){
            hotLottery = item.LotteryList.slice()
          }
        })

        // 剔除不上线的彩种
        hotLottery = hotLottery.filter(code=>offLineLottery.indexOf(code) === -1)
        // 如果热门超过11，就截断
        var showlength = 11
        if(hotLottery.length > showlength){
          hotLottery.length = showlength
        }
        if (hotLottery.length !=0 ){
              vm.nowDisplayList = hotLottery
        }
      });
    })
  },
	computed:mapState({
		LotteryConfig:'LotteryConfig',
		LotteryList:'LotteryList'
	})
}
