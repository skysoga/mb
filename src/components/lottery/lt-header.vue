<template>
	<header class="sscHeader fix">
    <a href="/" class="iconfont"></a>
    <div class="playSort">
      <p>玩
        <br>法</p>
        <span >
	        <em  @click = "toggleSelectBox">{{page.tag}}</em>
	        <i @click = "toggleSelectBox" class="iconfont">&#xe61e;</i>

	        <div v-if = "ifShowBox">
	          <div class="playSortMore">
	            <div class="playSortMoreCon">
								
								<ul class="betFilter fix">
									<li v-for = "(groupItem,group) in config" 
										  @click = "changeGroup(groupItem)"
										  :class = "group === page.group ? 'curr': ''">
										{{group}}
									</li>
								</ul>
								
								<ul class="betFilterAnd">
									<li v-for = "(subGroup, subGroupName) in config[page.group]">
										<span>{{subGroupName}}</span>
										<div class="fix">
											<a v-for = "mode in subGroup" 
													:class = "mode.mode === page.mode? 'curr': ''"
													@click = "changeMode(mode)">
												{{mode.name}}
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
	    <em>江苏</em><i class="iconfont">&#xe61e;</i>
      <div class="lotteryList fix">
	      <a>重庆时时彩</a>
	      <a>新疆时时彩</a>
	      <a>天津时时彩</a>
	      <a>大发时时彩</a>
      </div>
    </div>
  </header>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data () {
			return {
				page:{
					name: '复式',
					mode: 'H11',
					group: '五星',
					subGroup: '直选',
					tag: '五星直选复式',
				},
			}
		},
		methods:{
			changeGroup(groupItem){
				for(var subGroup in groupItem){
					var subGroupItem = groupItem[subGroup]
					subGroupItem.forEach(modeItem=>{
						if(modeItem.mode.indexOf('11') > -1 || modeItem.mode === 'I91'){
							this.page = modeItem
							this.$store.commit('lt_changeMode', this.page)
						}
					})
				}
			},
			changeMode(mode){ 
				this.page = mode
				this.$store.commit('lt_changeMode', this.page)
			},
			toggleSelectBox(){
				if(this.$store.state.lt.box === 'selectMode'){
					this.$store.commit('lt_changeBox', '')
				}else{
					this.$store.commit('lt_changeBox', 'selectMode')
				}
			}
		},
		computed: mapState({
			config: state=>state.lt.config,
			ifShowBox (){
				return this.$store.state.lt.box === 'selectMode'
			}
		})
	}
</script>

<style lang = "scss" scoped>
	@import '../../scss/newssc.scss';
</style>