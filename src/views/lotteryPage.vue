<template>
	<router-view></router-view>
</template>
<script>
	import lt_ssc from '../json/lt_ssc.json'
	import {interviewApp as rootApp} from '../main.js'
	export default{
		beforeRouteEnter(to, from, next){
			rootApp.GetInitData(['LotteryList','LotteryConfig'], state=>{
				next()
			})
		},
		created(){
			//留着11选5测试数据
			const lt_11x5 = {
				'选一':{
					'前三一码不定位':[
						{
							name:'复式',
							mode:'A11',
							tag:'前三一码不定位',
							group:'选一',
							subGroup:'前三一码不定位'
						}
					],
					'定位胆':[
						{
							name:'复式',
							mode:'A21',
							tag:'定位胆',
							group:'选一',
							subGroup:'定位胆'
						}
					],
					'任选一中一':[
						{
							name:'复式',
							mode:'A31',
							tag:'任选一中一复式',
							group:'选一',
							subGroup:'任选一中一'
						},
						{
							name:'单式',
							mode:'A32',
							tag:'任选一中一单式',
							group:'选一',
							subGroup:'任选一中一'
						}
					]
				},
				'选二':{
					'前二直选':[
						{
							name:'复式',
							mode:'B11',
							tag:'前二直选复式',
							group:'选二',
							subGroup:'前二直选'
						},
						{
							name:'单式',
							mode:'B12',
							tag:'前二直选单式',
							group:'选二',
							subGroup:'前二直选'
						}
					],
					'前二组选':[
						{
							name:'复式',
							mode:'B21',
							tag:'前二组选复式',
							group:'选二',
							subGroup:'前二组选'
						},
						{
							name:'单式',
							mode:'B22',
							tag:'前二组选单式',
							group:'选二',
							subGroup:'前二组选'
						},
						{
							name:'胆拖',
							mode:'B23',
							tag:'前二组选胆拖',
							group:'选二',
							subGroup:'前二组选'
						}
					],
					'任选二中二':[
						{
							name:'复式',
							mode:'B31',
							tag:'任选二中二复式',
							group:'选二',
							subGroup:'任选二中二'
						},
						{
							name:'单式',
							mode:'B32',
							tag:'任选二中二单式',
							group:'选二',
							subGroup:'任选二中二'
						},
						{
							name:'胆拖',
							mode:'B33',
							tag:'任选二中二胆拖',
							group:'选二',
							subGroup:'任选二中二'
						}
					]
				}
			}

			const lt = {
				state:{
					bet: {},				//当前投注情况
					basket:[],			//号码篮
					scheme:{},			//追号相关
					mode:{
						name: '',			//复式
						mode: '',			//H11
						group: '',		//五星
						subGroup: '', //直选
						tag: '',			//五星直选复式
					},
					lottery:{
						LotteryIntro: '',	//全天120期
						LotteryName: '',	//重庆时时彩
						LotteryType: '',	//SSC
						LotteryCode: ''		//1000
					},
					box:'',						//当前弹出框
					config:{}					//在各种彩种页面
				},
				getters: {
				},
				mutations:{
					lt_changeBox:(state, boxName)=>{state.box = boxName},
					lt_changeMode:(state, mode)=>{state.mode = mode},
					lt_changeLottery:(state, lotteryObj)=>{
						state.lottery = lotteryObj
					},
					lt_initConfig:(state, config)=>{state.config = config}
				},
				actions: {
					lt_changeLottery:({commit,rootState}, code)=>{
						commit('lt_changeLottery', rootState.LotteryList[code])
					}
				}
			}

			let store = this.$store
			store.state.lt || store.registerModule('lt', lt)
		}
	}
</script>