<template>
	<div class="gifts" :class="{moving,[active+'-con']:active}" v-if="active !== ''">
		<!-- ===== 船 boat ===== -->
		<div class="boat" v-if="active === 'boat'">
			<div class="sea sea1" :style="'background: url('+imgbaseUrl+boat.url+')'"></div>
			<div class="sea sea2" :style="'background: url('+imgbaseUrl+boat.url+')'"></div>
			<div class="shadow" :style="'background: url('+imgbaseUrl+boat.url+')'"></div>
			<div class="boatimg" :style="'background: url('+imgbaseUrl+boat.url+')'"></div>
		</div>
		<!-- ===== 船 boat ===== -->

		<!-- ===== 法拉利 ferrari ===== -->
		<div class="ferrari" v-if="active === 'ferrari'">
			<div class="car-con">
				<div class="relative">
					<div class="car" :style="'background: url('+imgbaseUrl+ferrari.url+')'"></div>
					<div class="wheel-con">
						<div class="wheel" :style="'background: url('+imgbaseUrl+ferrari.url+')'"></div>
					</div>
					<div class="light" :style="'background: url('+imgbaseUrl+ferrari.url+')'"></div>
				</div>
			</div>
		</div>
		<!-- ===== 法拉利 ferrari ===== -->
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
    		ferrari:{
    			url:'Ferrari.png',
    			time:5000,
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
	pointer-events:none;
}
//========== 法拉利 ==========
.ferrari-con{
	height: 16rem;
}
.car-con{
  animation: ferrari-car 5s linear;
	.relative{
		position:relative;
	}
}
.ferrari{
	position:relative;
	>div{
		position:absolute;
	}
	.car,.wheel,.light{
		background-size:22rem !important;
	}
	.car{
    width: 16rem;
    height: 5.2rem;
	}
	.wheel-con{
    top: 2.03rem;
    left: 8.7rem;
		transform: rotateY(35deg) rotateX(-15deg);
		position:absolute;
	}
	.wheel{
    background-position: 4.75rem 12.82rem !important;
    width: 3.1rem;
    height: 3.1rem;
    animation: ferrari-wheel .8s infinite linear;
	}
	.light{
		position:absolute;
    width: 16rem;
    background-position: 0 -8.2rem !important;
    height: 5rem;
    left: 0;
    top: 2rem;
	}
}
@keyframes ferrari-wheel{
	0%{
		transform: rotate(360deg) scale(0.56);
	}
	100%{
		transform: rotate(0deg) scale(0.56);
	}
}
@keyframes ferrari-car{
	0%{
		transform:translate(16rem,0rem);
	}
	20%{
		transform:translate(1rem,2rem);
	}
	80%{
		transform:translate(-3rem,3rem);
	}
	100%{
		transform:translate(-16rem,8rem);
	}
}
//========== 法拉利 end ======

//========== 船 ==========
.boat-con{
	height:16rem;
}
.boat{
	position:relative;
	> div{
		position:absolute;
		background-size: 70rem !important;
		background-repeat:no-repeat !important;
		transform: translate(0,0);
    transition:10s linear;
	}
	.sea{
    width: 41.2rem;
    height: 14rem;
		background-repeat-x:repeat !important;
	}
	.sea1{
		right:0;
	}
	.sea2{
		left:0;
		top:.5rem;
	}
	.boatimg,.shadow{
		left:-16rem;
		top:-5rem;
	}
	.boatimg{
		width:16rem;
		height:9rem;
    background-position: -41.4rem 0 !important;
	}
	.shadow{
		width:11.5rem;
		height:4.5rem;
		background-position:-58.1rem 0 !important;
    top: 2rem;
    left: -13.5rem;
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
			transform:translate(22rem,0);
		}
		.sea2{
			transform:translate(-22rem,0);
		}
	}
}
@keyframes boatimg{
	0%{
		transform: translate(0,0);
	}
	30%{
		transform: translate(13rem, 6.5rem);
	}
	70%{
		transform: translate(17rem, 8.5rem);
	}
	100%{
		transform: translate(32rem, 14.5rem);
	}
}
//========== 船 end ======
</style>