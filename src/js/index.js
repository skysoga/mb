import WcSwiper from 'wc-swiper'
import 'wc-swiper/style.css'
import Vue from 'vue'
Vue.use(WcSwiper)
// import 'swiper/dist/css/swiper.css' //幻灯片显示有问题时，需引入此依赖
import {mapState} from 'vuex'
var hotDefault = ["1407","1406","1402","1008","1000","1001","1300","1301","1303","1302","1100","1201"]
export default {
  name:'index',
  props:["s"],
  data:()=>{
    return{
      notApp:!window._App&&!localStorage.getItem('isSelfApp'),
      hotLottery:[],
      NologApp:''
    }
  },
  components: {
  },
  beforeRouteEnter:(to, from, next) => {
    var search=location.search
    if(location.pathname==="/"&&search&&(search.search(/^\?id=\d{8}/)===0)){
      localStorage.setItem("InvitationCode",search.split("=")[1])
      next();
    }
    //是APP且未登录
    var NologApp = _App&&!state.UserName
    var arr = [!NologApp?"BannerList":"SysBanner","LotteryConfig","LotteryHot","LotteryList"],
      ar=["SiteConfig"];
    state.UserName&&arr.push("NoticeData")
    arr = (!_App||state.UserName)?arr.concat(ar):arr


    RootApp.GetInitData(arr, state=>{
      if (NologApp) {
        to.meta.title='未登录'
      }else{
        to.meta.title=`<img src="${state.constant.ImgHost}${state.SiteConfig.MobileLogo}" />`
      }
      next();
    })
  },
  methods:{
    setUrl(url,filterHtml){
      if(filterHtml){
        return url.replace('.html','').replace(/\s/g, '')
      }else{
        RootApp.OpenWin(url.replace(/\s/g, ''))
      }
    },
    setDataHot(){
      var state = this.$store.state
      var NologApp = _App&&!state.UserName
      var offLineLottery = ['1202']
      // state.LotteryConfig.forEach(item=>{
      //   // 不上线：排列3，福彩3D  LotteryClassID === '12'
      //   if(item.LotteryClassID === '12'){
      //     offLineLottery = item.LotteryList.slice()
      //   }
      // })

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
    },
  },
	computed:mapState({
		LotteryConfig:'LotteryConfig',
    LotteryHot:'LotteryHot',
		LotteryList:'LotteryList',
    nowDisplayList(){
      var hotLottery = this.setDataHot()
      // 如果后台数据错误就返回默认的数组，如果热门超过11个，那么返回前11个
      if(Array.isArray(hotLottery) && hotLottery.length){
        if(hotLottery.length > 12){
          return hotLottery.slice(0,12)  //截取前11个
        }else{
          return hotLottery
        }
      }else{
        return hotDefault
      }
    }
	})
}
