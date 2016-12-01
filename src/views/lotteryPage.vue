<template>
	<router-view></router-view>
</template>
<script>
	import lt_ssc_config from '../js/lt_ssc_config.json'
	export default{
		created(){
			const lt = {
				state:{
					bet: {},
					basket:[],
					scheme:{},
					page:{
						name: '复式',
						mode: 'H11',
						group: '五星',
						subGroup: '直选',
						tag: '五星直选复式',
					},
					box:'',
					config:lt_ssc_config
				},
				getters: {
				},
				mutations:{
					lt_changeBox(state, boxName){
						state.box = boxName
					},
					lt_changeMode(state, page){
						state.page = page
					}
				},
				actions: {
				}
			}

			let store = this.$store
			store.state.lt || store.registerModule('lt', lt)
		}
	}
</script>