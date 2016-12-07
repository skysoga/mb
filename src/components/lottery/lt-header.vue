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
										  @click = "changeGroup(groupItem)"
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
		// props:['ltype', 'lcode'],			// 'ssc','11x5'
		created(){
			[,this.ltype, this.lcode] = this.$route.fullPath.slice(1).split('/')
			this.pageConfig = {
				'ssc':{
					typeName:'时时彩',
					defaultMode:['五星', '直选']
				},
				'11x5':{
					typeName:'11选5',
					defaultMode:['选一', '前三一码不定位']
				}
			}

			var LotteryConfig = this.$store.state.LotteryConfig
			LotteryConfig.forEach(item=>{
				//这个地方“时时彩应该是个变量”
				if(item.LotteryClassName === this.pageConfig[this.ltype].typeName){
					this.LotteryList = item.LotteryList.map(code=>{
						var el = state.LotteryList[code]
						return el
					})
				}
			})

			var defaultMode = this.pageConfig[this.ltype].defaultMode
			this.mode = this.config[defaultMode[0]][defaultMode[1]][0]					//title的默认值
			this.LotteryName = this.$store.state.LotteryList[this.lcode].LotteryName	//默认值
		},
		data () {
			return {
				mode:{
					name: '',	   //如：复式
					mode: '',		 //如：H11
					group: '',	 //如：五星
					subGroup: '',//如：直选
					tag: '',		 //如：五星直选复式
				},
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
						if(modeItem.mode.indexOf('11') > -1 || modeItem.mode === 'I91'){
							this.mode = modeItem
							this.$store.commit('lt_changeMode', this.mode)
						}
					})
				}
			},
			//更改玩法
			changeMode(modeItem){
				this.mode = modeItem
				this.$store.commit('lt_changeMode', this.mode)
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
			config: state=>state.lt.config,
			ifShowModeSelect (){
				return this.$store.state.lt.box === 'modeSelect'
			},
			ifShowTypeSelect (){
				return this.$store.state.lt.box === 'typeSelect'
			},
			lotteryName(){
				var removeName = {
					'ssc':'时时彩',
					'11x5': '11选5'
				}
				return this.LotteryName.replace(removeName[this.ltype], '')
			}
		})
	}
</script>

<style lang = "scss" scoped>
	@import '../../scss/newssc.scss';
</style>