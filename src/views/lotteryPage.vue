<template>
	<router-view></router-view>
</template>
<script>
	export default{
		created(){
			const lt_config = {
				'五星':{
					'直选':{
						'复式':{
							mode:'H11',
							group:'五星',
							subGroup: '直选',
							name:'复式',
							tag:'五星直选复式',
							tip:'每位至少选择一个号码，竞猜开奖号码的全部五位，号码和位置都对应即中奖，奖金{bonus}元', 
						},
						'单式':{
							mode:'H12',
							group:'五星',
							subGroup: '直选',
							name: '单式',
							tag: '五星直选单式',
							tip:'每位至少选择一个号码，竞猜开奖号码的全部五位，号码和位置都对应即中奖，奖金{bonus}元'
						}
					},
					'组选':{
						'组选120':{
							mode:'H21',
							group:'五星',
							subGroup:'直选',
							name:'组选120',
							tag:'五星组选120',
							tip:'至少选择五个号码投注，竞猜开奖号码的全部五位，号码一致顺序不限即中奖，奖金{bonus}元'
						},
						'组选60':{
							mode:'H22',
							group:'五星',
							subGroup:'直选',
							name:'组选60',
							tag:'五星组选60',
							tip:'至少选择1个二重号码和3个单号号码组成一注，竞猜开奖号码的全部五位，号码一致顺序不限即中奖，奖金{bonus}元'
						},
						'组选30':{
							mode:'H23',
							group:'五星',
							subGroup:'直选',
							name:'组选30',
							tag:'五星组选30',
							tip:'至少选择2个二重号码和1个单号号码组成一注，竞猜开奖号码的全部五位，号码一致顺序不限即中奖，奖金{bonus}元'
						},
						'组选20':{
							mode:'H24',
							group:'五星',
							subGroup:'直选',
							name:'组选20',
							tag:'五星组选20',
							tip:'至少选择1个三重号码和2个单号号码组成一注，竞猜开奖号码的全部五位，号码一致顺序不限即中奖，奖金{bonus}元'
						},
						'组选10':{
							mode:'H25',
							group:'五星',
							subGroup:'直选',
							name:'组选20',
							tag:'五星组选10',
							tip:'至少选择1个三重号码和2个单号号码组成一注，竞猜开奖号码的全部五位，号码一致顺序不限即中奖，奖金{bonus}元'
						}
					}
				}
			}

			const lt = {
				state:{
					bet: {},
					basket:[],
					scheme:{},
					page:{},
					config:lt_config
				},
				getters: {
					showName: state =>{
						return '姓名：' + state.name 
					}
				},
				mutations:{
					addA(state){
						state.name += 'B'
					}
				},
				actions: {
					add(context){
						context.commit('addA')
					}
				}
			}

			let store = this.$store
			store.state.lt || store.registerModule('lt', lt)
		}
	}
</script>