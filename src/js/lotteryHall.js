import {mapState} from 'vuex'
export default {
props:["s"],
data() {
  return {
    initData: [],
    li_state: 0,
    LotteryClassName: '全部彩种',
    nowLotteryClass: '全部',
    nowDisplayList:[]
  }
},
beforeRouteEnter(to,from,next){
  var Arr=['LotteryConfig']
  RootApp.GetInitData(Arr,state=>{
    next()
  })
},
created(){
    if(this.$store.state.LotteryConfig){
  		this.lotteryConfig = this.$store.state.LotteryConfig.slice(1,this.$store.state.LotteryConfig.length-1)
  		var allLottery = []
      this.lotteryConfig.forEach(item=>{
          if ("热门" !== item.LotteryClassName){
             allLottery = allLottery.concat(item.LotteryList)
            console.log(item.LotteryList);
          }
    		})
  		this.whole = {
  			LotteryClassName: '全部',
  			LotteryList:allLottery
  		}
  		this.lotteryConfig.splice(0,0, this.whole)
      this.nowDisplayList = this.lotteryConfig[0].LotteryList
    }
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
