<template>
	<div class="binary">
		<div class="binary-con">
			<div class="gift" id="gift" :class="className"></div>
		</div>
		<div class="info" v-if="$parent.giftArr[0]" :class="{tobottom:$parent.$parent.available.length>0}"><span>~{{$parent.giftArr[0].NickName?$parent.giftArr[0].NickName:$parent.giftArr[0].UserName}}送出 {{$parent.giftsObj[$parent.giftArr[0].type][1]}}~~</span></div>
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
				if (!this.$parent.giftArr[0].type) {
					return
				}
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
.tobottom{
	transform:translateY(1.42em);
}
.info{
	position: fixed;
	top: 3.75em;
  margin-left: .4em;
  left: 0;
	span{
		border-radius: 1em;
    padding: 0 .4em;
    color: white;
    font-size: .6em;
    background: #33a2f2;
    background: linear-gradient(to left, #33a2f2 2%, #50c6f5 100%);
    background: -webkit-linear-gradient(left, #33a2f2 2%, #50c6f5 100%);
    margin-bottom: .5em;
    padding: 0 .6em;
    position: relative;
    height: 1.8em;
    line-height: 1.8em;
    display: inline-block;
	}
}
.binary{
	position: fixed;
	z-index: 21;
	width: 16rem;
	height:150%;
	top:-25%;
	pointer-events:none;
	display: table;
}
.binary-con{
	height:100%;
	width: 100%;
	display: table-cell;
	vertical-align: middle;
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