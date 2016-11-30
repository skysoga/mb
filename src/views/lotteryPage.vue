<template>
	<router-view></router-view>
</template>
<script>
	export default{
		created(){
			const lt_config = {
				'五星': {
					'直选': {
						'复式':{
							name:'复式', 
							mode:'H11',
							tip:'每位至少选择一个号码，竞猜开奖号码的全部五位，号码和位置都对应即中奖，奖金<ins class = "_tipBonus"></ins>元', 
							eg:['12345','12345']}
					}
				}
			}

			const lt = {
				state:{
					bet: {},
					basket:[],
					scheme:{},
					page:{},

					name: 'rouwan'


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