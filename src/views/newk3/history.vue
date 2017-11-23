<template>
	<div class="history" :class="{opened}" @click.stop="">
		此页显示投注记录与开奖记录，<em @click.stop="close">点此关闭页面</em>
	</div>
</template>
<script>
	export default{
		data:()=>{
			return {
				opened:0
			}
		},
		created(){
			setTimeout(()=>{
				this.opened = 1
			},10)
		},
		methods:{
			close(){
				this.opened = 0
				setTimeout(()=>{
					this.$parent.history = 0
				},200)
			},
		},
	}
</script>
<style lang="scss">
	.history{
		position: fixed;
		width:100%;
		height:100%;
		top:0;
		left: 0;
		z-index: 30;
		background: white;
		color:#999;
		transform: translateX(16rem);
		transition:.2s;
	}
	.history.opened{
		transform: translateX(0);
	}
</style>