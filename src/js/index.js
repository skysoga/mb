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
        //临时变量不宜使用vm.lotteryConfig，这会使实例上出现vue-devtool无法跟踪的变量。 用var或let定义即可
        vm.lotteryConfig = vm.LotteryConfig.slice(0,1)

        /**
         * 此处须修改，问题如下：
         * 1.vm.LotteryConfig 为vue实例计算属性获得的 vuex中的全局数据。依然保持着数据的引用关系。直接修改，将连同vuex中的数据也被改变，并且难以debug。因此对vuex中的数据的处理，请使用commit或dispatch
         * 2.此处直接将vm.LotteryConfig[0].LotteryList的长度设为11。如果数组长度小于11，那么将产生稀疏数组(存在undefined)渲染将产生报错。应补上对应的判断
         */

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
