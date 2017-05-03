import {mapState} from 'vuex'
export default {
// props:["s"],
data() {
  return {
    // initData: [],
    // li_state: 0,
    nowLotteryClass: '全部彩种',
    nowDisplayList:[],
  }
},
beforeRouteEnter(to,from,next){
  var Arr=['LotteryConfig','LotteryList']
  RootApp.GetInitData(Arr,state=>{
    next(vm => {
  		vm.lotteryConfig = vm.LotteryConfig.slice(1,vm.LotteryConfig.length-1)
  		var allLottery = []
      vm.lotteryConfig.forEach(item=>{
          if ("热门" !== item.LotteryClassName){
             allLottery = allLottery.concat(item.LotteryList)
            console.log(item.LotteryList);
          }
    		})
  		vm.whole = {
  			LotteryClassName: '全部彩种',
  			LotteryList:allLottery
  		}
  		vm.lotteryConfig.splice(0,0, vm.whole)
      vm.nowDisplayList = vm.lotteryConfig[0].LotteryList
    })
  })
},
  methods: {
    changeNowLotteryClass: function(lotteryClass, lotteryList) {
      this.nowLotteryClass = lotteryClass
      this.nowDisplayList=lotteryList
    }
  },
	computed:mapState({
		LotteryConfig:'LotteryConfig',
		LotteryList:'LotteryList'
	})
}
