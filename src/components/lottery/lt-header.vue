<template>
	<header class="sscHeader fix">
    <router-link to="/index" class="iconfont back"></router-link>
    <div class="playSort">
      <p>玩
        <br>法</p>

        <span>
        	<div @click.stop = "toggleModeSelect">
		        <em>{{mode.tag}}</em>
		        <i class="iconfont">&#xe61e;</i>
					</div>
	        <div v-if = "ifShowModeSelect">
	          <div class="playSortMore">
	            <div class="playSortMoreCon">

								<ul class="betFilter fix">
									<li v-for = "(groupItem,group) in config"
										  @click.stop = "changeGroup(groupItem)"
										  :class = "group === mode.group ? 'curr': ''">
										{{group}}
									</li>
								</ul>

								<ul class="betFilterAnd">
									<li v-for = "(subGroup, subGroupName) in config[mode.group]">
										<span>{{subGroupName}}</span>
										<div class="fix">
											<a v-for = "modeItem in subGroup"
													:class = "modeItem.mode === mode.mode? 'curr': ''"
													@click = "changeMode(modeItem)">
												{{modeItem.name}}
											</a>
	                  </div>
	                </li>
								</ul>

	            </div>
	          </div>
	      	</div>

	      </span>
	  </div>

    <div class="lotterySort">
	    <div @click.stop = "toggleTypeSelect">
		    <em>{{lotteryName}}</em><i class="iconfont">&#xe61e;</i>
	    </div>

      <div class="lotteryList fix" v-if = "ifShowTypeSelect">
      	<a v-for = "item in LotteryList"
      		 @click = "changeLottery(item.LotteryCode)">
	      	  {{item.LotteryName}}
    	  </a>
      </div>
    </div>
  </header>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		created(){
			[,this.ltype, this.lcode] = this.$route.fullPath.slice(1).split('/')

			//处理得各彩种的List
			var LotteryConfig = this.$store.state.LotteryConfig
			LotteryConfig.forEach(item=>{
				if(item.LotteryClassID.indexOf(this.lcode.slice(0,2)) > -1){
					this.LotteryList = item.LotteryList.map(code=>{
						var el = state.LotteryList[code]
						return el
					})
				}
			})
		},
		data () {
			return {
				LotteryList: [],
				LotteryName: '',
				ltype: '',			//彩种类型
				lcode: ''				//彩种code
			}
		},
		methods:{
			//更改玩法群
			changeGroup(groupItem){
				for(var subGroup in groupItem){
					var subGroupItem = groupItem[subGroup]
					subGroupItem.forEach(modeItem=>{
						//切换Group时，subGroup第一个为默认选项
						if(modeItem.mode.indexOf('11') > -1 || modeItem.mode === 'I91'){
							this.$store.commit('lt_changeMode', modeItem)
						}
					})
				}
			},
			//更改玩法
			changeMode(modeItem){
				this.$store.commit('lt_changeMode', modeItem)
			},
			//更改彩种
			changeLottery(code){
				this.LotteryList.forEach(item=>{
					if(item.LotteryCode === code){
						this.LotteryName = item.LotteryName
					}
				})
				this.$store.dispatch('lt_updateLottery', code)
			},
			//玩法选择框，切换
			toggleModeSelect(){
				this.$store.state.lt.box === 'modeSelect' ?
					 this.$store.commit('lt_changeBox', '') :
						 this.$store.commit('lt_changeBox', 'modeSelect')
			},
			//彩种选择框，切换
			toggleTypeSelect(){
				this.$store.state.lt.box === 'typeSelect' ?
					 this.$store.commit('lt_changeBox', '') :
						 this.$store.commit('lt_changeBox', 'typeSelect')
			}
		},
		computed: mapState({
			mode:state=>state.lt.mode,
			config: state=>state.lt.config,
			LotteryName: state=>state.lt.lottery.LotteryName,
			ifShowModeSelect (){
				return this.$store.state.lt.box === 'modeSelect'
			},
			ifShowTypeSelect (){
				return this.$store.state.lt.box === 'typeSelect'
			},
			lotteryName(){
				var removeName = {
					'SSC':'时时彩',
					'11X5': '11选5'
				}
				return this.LotteryName.replace(removeName[this.ltype], '')
			}
		})
	}
</script>

<style lang = "scss" scoped>
	@import '../../scss/newssc.scss';
</style>