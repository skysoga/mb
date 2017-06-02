import { swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper'
import {mapState} from 'vuex'
var hotDefault = ["1406","1402","1407","1000","1001","1008","1303","1302","1100","1101","1103"]
export default {
  name:'index',
  props:["s"],
  data:()=>{
    return{
      hotLottery:[],
      NologApp:''
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

    var arr = [!NologApp?"BannerList":"SysBanner","LotteryConfig","LotteryHot","LotteryList"],
      ar=["SiteConfig"];
    state.UserName&&arr.push("NoticeData")
    arr = (!_App||state.UserName)?arr.concat(ar):arr


    RootApp.GetInitData(arr, state=>{
      next();
    })
  },
  methods:{
    setUrl(link){
      RootApp.OpenWin(link)
    },
    setDataHot(){
      var state = this.$store.state
      var NologApp = _App&&!state.UserName
      var offLineLottery = []
      state.LotteryConfig.forEach(item=>{
        // 不上线：排列3，福彩3D  LotteryClassID === '12'
        if(item.LotteryClassID === '12'){
          offLineLottery = item.LotteryList.slice()
        }
      })

      var hotLottery = []
      if(NologApp){
        hotLottery = hotDefault
      }else{
        if(this.$store.state.LotteryHot.LotteryList){
          console.log('热门彩票新接口')
          hotLottery=state.LotteryHot.LotteryList.slice()
        }else{

          console.log('热门彩票旧接口')
          this.LotteryConfig.forEach(item=>{
            if(item.LotteryClassID === '0'){
              hotLottery = item.LotteryList.slice()
            }
          })
        }

        hotLottery = hotLottery.filter(code=>offLineLottery.indexOf(code) === -1)
      }
      return hotLottery;
    }
  },
	computed:mapState({
		LotteryConfig:'LotteryConfig',
    LotteryHot:'LotteryHot',
		LotteryList:'LotteryList',
    nowDisplayList(){
        var hotLottery = this.setDataHot()
      // 如果后台数据错误就返回默认的数组，如果热门超过11个，那么返回前11个
      if(Array.isArray(hotLottery) && hotLottery.length){
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
