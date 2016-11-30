<template>
	<header class="sscHeader fix">
    <a href="/" class="iconfont"></a>
    <div class="playSort">
      <p>玩
        <br>法</p><span><em>五星直选</em><i class="iconfont">&#xe61e;</i>
          <div class="playSortMore">
            <div class="playSortMoreCon">
							
							<ul class="betFilter fix">
								<li v-for = "(value,group) in config" @click = "changeGroup(group)">
									{{group}}
								</li>
							</ul>
<!-- 
              <ul class="betFilter fix"><li class="curr">五星</li><li>四星</li><li>前三</li><li>中三</li><li>后三</li><li>前二</li><li>后二</li><li>一星</li><li>大小单双</li></ul> -->
							
							<ul class="betFilterAnd">
								<li v-for = "(subGroup, subGroupName) in config[group]">
									<span>{{subGroupName}}</span>
									<div class="fix">
										<a class="curr" v-for = "(mode, modeName)  in subGroup">
											{{modeName}}
										</a>
                  </div>
                </li>
							</ul>

       <!--        <ul class="betFilterAnd">
                <li><span>直选</span><div class="fix"><a class="curr">复式</a><a>单式</a>
                  </div>
                </li>
                <li><span>组选</span><div class="fix groupSelect"><a>组选120</a><a>组选60</a><a>组选30</a><a>组选20</a><a>组选10</a><a>组选5</a>
                  </div>
                </li>
                <li><span>不定位</span><div class="fix"><a>一码不定位</a><a>二码不定位</a><a>三码不定位</a>
                  </div>
                </li>
                <li><span>趣味</span><div class="fix"><a>一帆风顺</a><a>好事成双</a><a>三星报喜</a><a>四季发财</a>
                  </div>
                </li>
              </ul> -->
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
	export default {
		data () {
			return {
				config:this.$store.state.lt.config,
				group: Object.keys(this.$store.state.lt.config)[0]
			}
		},
		methods:{
			changeGroup(group){
				this.group = group
			}
		}
	}
</script>

<style lang = "scss" scoped>
	@import '../../scss/newssc.scss';
</style>