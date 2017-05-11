import { swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper'
import {mapState} from 'vuex'
var hotDefault = ["1401","1402","1407","1406","1405","1000","1001","1008","1003","1403","1410"]
export default {
  props:["s"],
  data:()=>{
    return{
      hotLottery:[],
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
          // 不上线：排列3，福彩3D  LotteryClassID === '12'
          if(item.LotteryClassID === '12'){
            offLineLottery = item.LotteryList.slice()
          }
        })

        // 获取热门彩种code列表, LotteryClassID === '0'
        var hotLottery = []
        if(NologApp){
          hotLottery = hotDefault
        }else{
          vm.LotteryConfig.forEach(item=>{
            if(item.LotteryClassID === '0'){
              hotLottery = item.LotteryList.slice()
            }
          })

          hotLottery = hotLottery.filter(code=>offLineLottery.indexOf(code) === -1)
        }

        // 剔除不上线的彩种
        vm.hotLottery = hotLottery
      });
    })
  },
	computed:mapState({
		LotteryConfig:'LotteryConfig',
		LotteryList:'LotteryList',
    nowDisplayList(){
      var hotLottery = this.hotLottery
      // 如果后台数据错误就返回默认的数组，如果热门超过11个，那么返回前11个
      if(Array.isArray(hotLottery)){
        if(hotLottery.length > 11){
          return hotLottery.slice(0,11)  //截取前11个
        }else{
          return hotLottery
        }
      }else{
        return hotDefault
      }
    }
	})
}
