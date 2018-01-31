<template>
	<div class="binary">
		<div>
			<div class="gift" id="gift" :class="className"></div>
		</div>
	</div>
</template>
<script>
  export default {
    data:()=>{
			return {
				reStartT:null,
				all:['porsche','money','salute','aircraft'],
				moving:0,
				className:'',
			}
		},
		mounted(){
			this.checkGift()
		},
		methods:{
			checkGift(){
				let _giftArr0 = this.$parent.giftArr[0] || 0
				name = _giftArr0.type
				if (!name) {
					return
				}
				let isHas = 0
				for(let v of this.all){
					if(v === name){
						isHas = 1
					}
				}
				if (isHas && !this.moving) {
					this.start()
					return true
				}else{
					return false
				}
			},
			start(){
				var player = new SVGA.Player('#gift');
				var parser = new SVGA.Parser('#gift'); // 如果你需要支持 IE6+，那么必须把同样的选择器传给 Parser。
				parser.load('/static/img/gifts/'+this.$parent.giftArr[0].type+'.c', videoItem=> {
					this.className = this.$parent.giftArr[0].type
					this.moving = 1
					player.loops = 1
					player.onFinished(()=>{
						this.$parent.giftArr.splice(0,1)
            if (this.checkGift()) {
            	this.start()
            }else{
	            this.moving = 0
            }
            // this.reStartT = setTimeout(this.checkGift(),100)
					})
			    player.setVideoItem(videoItem);
			    player.startAnimation();
				})
			}
		},
		distroyed(){
			clearTimeout(this.reStartT)
		},
    watch:{
    	'$parent.giftArr'(n){
    		this.checkGift()
    	}
    },
	}
</script>
<style lang='scss' scoped>
.binary{
	position: fixed;
	z-index: 21;
	width: 16rem;
	height:150%;
	top:-25%;
	pointer-events:none;
	display: table;
	>div{
		height:100%;
		width: 100%;
		display: table-cell;
		vertical-align: middle;
	}
}
</style>
<style lang="scss">
#gift{
	canvas{
		width: 16rem !important;
    height: 28.44444rem !important;
    transform: initial !important;
	}
	&.porsche{
		canvas{
			height: 16rem !important;
		}
	}
}
</style>