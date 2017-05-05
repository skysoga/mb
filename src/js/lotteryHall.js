import {mapState} from 'vuex'
var StyleId={'All':'A_ALL','10':'A_SSC','14':'A_K3','11':'A_SYX5','13':'A_OTHER'}
export default {
data() {
  return {
    nowLotteryClass: '全部彩种',
    nowDisplayList:[],
    display:[] //用于显示的数据
  }
},
beforeRouteEnter(to,from,next){
  var Arr=['LotteryConfig','LotteryList']
  RootApp.GetInitData(Arr,state=>{
    next(vm => {
      var display = []

      var offLineLottery = ['12','0']  //不显示在列表栏的彩种ClassID， 统一用ClassID来定位
      display = vm.LotteryConfig.filter(item=>offLineLottery.indexOf(item.LotteryClassID) === -1)

      var allLottery = []

      // 把除了热门之外的彩种拼接成全部彩种的数组
      display.forEach(item=>{
          if ("0" !== item.LotteryClassID){
             allLottery = allLottery.concat(item.LotteryList)
          }
        })

      var whole = {
        LotteryClassName: '全部彩种',
        LotteryClassID:'All',
        LotteryList:allLottery
      }

      display.splice(0,0, whole)
      vm.nowDisplayList = display[0].LotteryList
      vm.display = display
    })
  })
},
  methods: {
    changeNowLotteryClass: function(lotteryClass, lotteryList) {
      this.nowLotteryClass = lotteryClass
      this.nowDisplayList=lotteryList
    },
    setStyle(id){
      if(StyleId[id]){
        return StyleId[id]
      }
    }
  },
  computed:mapState({
    LotteryConfig:'LotteryConfig',
    LotteryList:'LotteryList',
  })
}
