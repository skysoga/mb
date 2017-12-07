<template>
	<div class="binary">
		<div id="gift"></div>新型礼物
	</div>
</template>
<script>
  export default {
    data:()=>{
			return {
				data:{
					porsche:['/static/img/porsche.c',1000],
					money:['/static/img/gifts/money.c',1000],
				},
				reStartT:null,
			}
		},
		mounted(){
			this.checkGift()
		},
		methods:{
			checkGift(){
				let gift = this.$parent.giftArr[0] || 0
				if (!gift) {
					return
				}
				let name = gift.type.split('-')[1]
				let isHas = 0
				for(let [k,v] of Object.entries(this.data)){
					if(k === name){
						isHas = 1
					}
				}
				if (isHas) {
					this.start(name)
				}
			},
			start(name){
				var player = new SVGA.Player('#gift');
				var parser = new SVGA.Parser('#gift'); // 如果你需要支持 IE6+，那么必须把同样的选择器传给 Parser。
				parser.load(this.data[name][0], videoItem=> {
					player.loops = 1
					player.onFinished(()=>{
            this.$parent.giftArr.splice(0,1)
            this.reStartT = setTimeout(this.checkGift(),100)
					})
			    player.setVideoItem(videoItem);
			    player.startAnimation();
				})
			}
		},
		distroyed(){
			clearTimeout(this.reStartT)
		}
	}
</script>
<style lang='scss' scoped>
.binary{
	position: fixed;
	z-index: 25;
	width: 100%;
	height:100%;

	pointer-events:none;
	>div{
		width:100%;
		height:100%;
	}
}
</style>