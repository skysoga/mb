<template>
	<div class="gifts" :class="{moving,[active+'-con']:active}" v-if="active !== ''">
		<div class="boat" v-if="active === 'boat'">
			<div class="sea sea1" :style="'background: url('+imgbaseUrl+boat.url+')'"></div>
			<div class="sea sea2" :style="'background: url('+imgbaseUrl+boat.url+')'"></div>
			<div class="shadow" :style="'background: url('+imgbaseUrl+boat.url+')'"></div>
			<div class="boatimg" :style="'background: url('+imgbaseUrl+boat.url+')'"></div>
		</div>
	</div>
</template>
<script>
  export default {
  	props:['activegift'],
    data:()=>{
    	return {
    		imgbaseUrl:'/static/img/gifts/',
    		active:'',
    		moving:0,
    		imgDom:null,
    		boat:{
    			url:'boat.png',
    			time:10000,
    		},
    	}
    },
    methods:{
    	loadImg(){
    		return new Promise((resolve,reject)=>{
    			this.imgDom = document.createElement('img')
    			this.imgDom.src = this.imgbaseUrl+this[this.activegift].url
    			this.imgDom.onload = function(){
    				resolve(this.imgDom)
    			}
    			this.imgDom.onerror = function(){
    				reject(err)
    			}
    		})
    	},
    	start(n){
  			this.active = n
  			setTimeout(()=>{
	  			this.moving = 1
  			},100)
  			setTimeout(()=>{
	  			this.active = ''
	  			this.moving = 0
	  			this.$parent.activegift = ''
  			},this[this.activegift].time)
    	}
    },
    watch:{
    	'activegift'(n){
    		if (n === '') {
    			return
    		}
    		this.loadImg()
    		.then(()=>{
    			this.start(n)
    		},()=>{
    			layer.msgWarn('图片加载失败！')
    		})
    	}
    },
  }
</script>
<style lang="scss" scoped>
.gifts{
	position: fixed;
	z-index: 25;
	width: 100%;
	height: 100%;
	bottom:0;
}
//********** 船 **********
.boat-con{
	height:16rem;
}
.boat{
	position:relative;
	> div{
		position:absolute;
		background-size: 70em !important;
		background-repeat:no-repeat !important;
		transform: translate(0,0);
    transition:10s linear;
	}
	.sea{
    width: 41.2em;
    height: 14em;
		background-repeat-x:repeat !important;
	}
	.sea1{
		right:0;
	}
	.sea2{
		left:0;
		top:.5em;
	}
	.boatimg,.shadow{
		left:-16em;
		top:-5em;
	}
	.boatimg{
		width:16em;
		height:9em;
    background-position: -41.4em 0 !important;
	}
	.shadow{
		width:11.5em;
		height:4.5em;
		background-position:-58.1em 0 !important;
    top: 2em;
    left: -13.5em;
	}
}
.moving{
	.boat{
		.boatimg,.shadow{
	    animation: boatimg 10s linear;
		}
	}
	.boat{
		.sea1{
			transform:translate(22em,0);
		}
		.sea2{
			transform:translate(-22em,0);
		}
	}
}
@keyframes boatimg{
	0%{
		transform: translate(0,0);
	}
	30%{
		transform: translate(13em, 6.5em);
	}
	70%{
		transform: translate(17em, 8.5em);
	}
	100%{
		transform: translate(32em, 14.5em);
	}
}
//********** 船 end*******
</style>