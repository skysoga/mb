<template>
	<div class="binary">
		<div class="binary-con">
			<div class="gift" id="gift" :class="className"></div>
		</div>
		<div class="info fix" v-if="$parent.giftArr[0]" :class="{tobottom:$parent.$parent.available.length>0}">
			<div class="img">
				<img height="100%" width="100%" :src="$store.getters.PhotoPath+$parent.giftArr[0].UserPhoto||$store.state.constant.DefPhoto">
			</div>
			<div class="text">
				<span>{{$parent.giftArr[0].NickName?$parent.giftArr[0].NickName:$parent.giftArr[0].UserName}}</span>
				<em>送出<i>{{$parent.giftsObj[$parent.giftArr[0].type][1]}}</i></em>
			</div>
			<div class="review" :style="'background: url(/static/img/smallgifts/'+$parent.giftArr[0].type+'.png) center'"></div>
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
  height: 2em;
  width: 9em;
  margin-left: .4em;
  left: 0;
  top: 4em;
  border: 1px solid #42b3f3;
  border-radius: 2em;
  background: #45a1f5;
  background: linear-gradient(to left, #45a1f5 2%, #5bc3f7 100%);
  background: -webkit-linear-gradient(left, #45a1f5 2%, #5bc3f7 100%);
	span{
    margin-top: .4em;
    font-size: .68em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    line-height: 1.32em;
	}
	.img{
		float: left;
		width: 1.95em;
		height: 100%;
    display: block;
	}
	img{
		border-radius: 50%;
		display: inline-block;
	}
}
.text{
  width: 3.2em;
  float: left;
  height: 100%;
  overflow: hidden;
  line-height: 1em;
  color: white;
  margin-left: .3em;
  em{
  	font-size: .55em;
  	display: block;
  	line-height: 1.32em;
  	i{
  		color:#f3e76e;
  	}
  }
}
.review{
	float: left;
  width: 2.8em;
	height: 2em;
	background-size: cover !important;
	margin-left: .4em;
	overflow: hidden;
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