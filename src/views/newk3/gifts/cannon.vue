<template>
		<div class="gift" id="gift" :class="{moving}">
			<div>
				<div class="relative cannons">
					<div class="cannon4 cannon" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					<div class="ca4-boom ca-boom" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					<div class="ca4-light ca-light" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					<div class="cannon3 cannon" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					<div class="ca3-boom ca-boom" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					<div class="ca3-light ca-light" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					<div class="cannon2 cannon" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					<div class="ca2-boom ca-boom" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					<div class="ca2-light ca-light" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					<div class="cannon1 cannon" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					<div class="ca1-boom ca-boom" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					<div class="ca1-light ca-light" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
				</div>
			</div>
			<div class="fire">
				<div class="fire1 relative">
					<div class="l"></div>
					<div class="e1c">
						<div class="e1" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
					<div class="e2c">
						<div class="e2" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
					<div class="e3c">
						<div class="e3" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
					<div class="e4c">
						<div class="e4" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
				</div>
			</div>
			<div class="fire2">
				<div class="relative">
					<div class="l"></div>
					<div class="e1c">
						<div class="e1" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
					<div class="e2c">
						<div class="e2" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
					<div class="e3c">
						<div class="e3" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
					<div class="e4c">
						<div class="e4" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
				</div>
			</div>
			<div class="fire3">
				<div class="relative">
					<div class="l"></div>
					<div class="e1c">
						<div class="e1" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
					<div class="e2c">
						<div class="e2" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
					<div class="e3c">
						<div class="e3" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
					<div class="e4c">
						<div class="e4" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
				</div>
			</div>
			<div class="fire4">
				<div class="relative">
					<div class="l"></div>
					<div class="e1c">
						<div class="e1" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
					<div class="e2c">
						<div class="e2" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
					<div class="e3c">
						<div class="e3" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
					<div class="e4c">
						<div class="e4" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
				</div>
			</div>
			<div class="fire5">
				<div class="relative">
					<div class="l"></div>
					<div class="e1c">
						<div class="e1" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
					<div class="e2c">
						<div class="e2" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
					<div class="e3c">
						<div class="e3" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
					<div class="e4c">
						<div class="e4" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
				</div>
			</div>
			<div class="fire6">
				<div class="relative">
					<div class="l"></div>
					<div class="e1c">
						<div class="e1" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
					<div class="e2c">
						<div class="e2" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
					<div class="e3c">
						<div class="e3" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
					<div class="e4c">
						<div class="e4" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
				</div>
			</div>
			<div class="fire7">
				<div class="relative">
					<div class="l"></div>
					<div class="e1c">
						<div class="e1" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
					<div class="e2c">
						<div class="e2" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
					<div class="e3c">
						<div class="e3" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
					<div class="e4c">
						<div class="e4" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
				</div>
			</div>
			<div class="fire8">
				<div class="relative">
					<div class="l"></div>
					<div class="e1c">
						<div class="e1" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
					<div class="e2c">
						<div class="e2" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
					<div class="e3c">
						<div class="e3" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
					<div class="e4c">
						<div class="e4" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
					</div>
				</div>
			</div>
		</div>
</template>
<script>
  export default {
    data:()=>{
    	return {
    		moving:0,
  			url:'cannon.png',
  			time:7000,
    	}
    },
    created(){
    	this.$parent.giftcreated(this)
    },
  }
</script>
<style lang="scss" scoped>
#gift{
	height: 16rem;
	>div{
		position: absolute;
		width: 100%;
		height:100%;
	}
}
.relative{
	position: relative;
	height: 100%;
	width: 100%;
	top: 0;
	>div{
		position: absolute;
	}
}
.fire1-con{
	height: 16rem;
	width: 100%;
	top: -16rem;
}
.e1,.e2,.e3,.e4{
	width: 6rem;
	height: 6rem;
}
.e1c,.e2c,.e3c,.e4c{
	opacity: 0;
}

//烟火8
.fire8{
	margin-top:-6rem;
	margin-left: 7rem;
	.e1{
    background-size: 65rem !important;
    background-position: -17.7rem -70.1rem !important;
	}
	.e2{
    background-size: 40rem !important;
    background-position: -14.7rem -42rem !important;
	}
	.e3{
    background-size: 38rem !important;
    background-position: -19.2rem -39.6rem !important;
	}
	.e4{
    background-size: 40rem !important;
    background-position: -24.9rem -41.8rem !important;
	}
}
.moving .fire8{
	.e1c{
		animation: fire 1s linear;
		animation-delay: 2.8s;
	}
	.e2c{
		animation: fire 1s linear;
		animation-delay: 2.8s;
	}
	.e3c{
		animation: fire 1s linear;
		animation-delay: 2.9s;
	}
	.e4c{
		animation: fire 1.2s linear;
		animation-delay: 3s;
	}
}
//烟火7
.fire7{
	margin-top:-6rem;
	margin-left: 7rem;
	.e1{
    background-size: 65rem !important;
    background-position: -17.7rem -70.1rem !important;
	}
	.e2{
    background-size: 40rem !important;
    background-position: -14.7rem -42rem !important;
	}
	.e3{
    background-size: 38rem !important;
    background-position: -19.2rem -39.6rem !important;
	}
	.e4{
    background-size: 40rem !important;
    background-position: -24.9rem -41.8rem !important;
	}
}
.moving .fire7{
	.e1c{
		animation: fire 1s linear;
		animation-delay: 2.8s;
	}
	.e2c{
		animation: fire 1s linear;
		animation-delay: 2.8s;
	}
	.e3c{
		animation: fire 1s linear;
		animation-delay: 2.9s;
	}
	.e4c{
		animation: fire 1.2s linear;
		animation-delay: 3s;
	}
}
//烟火6
.fire6{
	margin-top:-5rem;
	margin-left: 10rem;
	.e1{
    background-size: 65rem !important;
    background-position: -18.2rem -60.8rem !important;
	}
	.e2{
    background-size: 40rem !important;
    background-position: -15.1rem -36.2rem !important;
	}
	.e3{
    background-size: 38rem !important;
    background-position: -20.2rem -34.2rem !important;
	}
	.e4{
    background-size: 40rem !important;
    background-position: -26rem -29.8rem !important;
	}
}
.moving .fire6{
	.e1c{
		animation: fire 1s linear;
		animation-delay: 2.8s;
	}
	.e2c{
		animation: fire 1s linear;
		animation-delay: 2.8s;
	}
	.e3c{
		animation: fire 1s linear;
		animation-delay: 2.9s;
	}
	.e4c{
		animation: fire 1.2s linear;
		animation-delay: 3s;
	}
}
//烟火5
.fire5{
	margin-top:-3rem;
	margin-left: 3rem;
	.e1{
    background-size: 65rem !important;
    background-position: -18.4rem -50.2rem !important;
	}
	.e2{
    background-size: 40rem !important;
    background-position: -15.2rem -29.9rem !important;
	}
	.e3{
    background-size: 38rem !important;
    background-position: -19.4rem -28.2rem !important;
	}
	.e4{
    background-size: 40rem !important;
    background-position: -26rem -29.8rem !important;
	}
}
.moving .fire5{
	.e1c{
		animation: fire 1s linear;
		animation-delay: 2.3s;
	}
	.e2c{
		animation: fire 1s linear;
		animation-delay: 2.3s;
	}
	.e3c{
		animation: fire 1s linear;
		animation-delay: 2.4s;
	}
	.e4c{
		animation: fire 1.2s linear;
		animation-delay: 2.5s;
	}
}
//烟火4
.fire4{
	margin-top:-3rem;
	.e1{
    background-size: 29rem !important;
    background-position: -6.7rem -15.5rem !important;
	}
	.e2{
    background-size: 29rem !important;
    background-position: -12.2rem -15.3rem !important;
	}
	.e3{
    background-size: 29rem !important;
    background-position: -18.3rem -15.3rem !important;
	}
	.e4{
    background-size: 40rem !important;
    background-position: -34.1rem -22.4rem !important;
	}
}
.moving .fire4{
	.e1c{
		animation: fire 1s linear;
		animation-delay: 2.3s;
	}
	.e2c{
		animation: fire 1s linear;
		animation-delay: 2.3s;
	}
	.e3c{
		animation: fire 1s linear;
		animation-delay: 2.4s;
	}
	.e4c{
		animation: fire 1.2s linear;
		animation-delay: 2.5s;
	}
}
//烟火3
.fire3{
	margin-left: 9rem;
	margin-top:-1rem;
	.e1{
		background-size: 29rem !important;
    background-position: -6.9rem -9rem !important;
	}
	.e2{
    background-size: 29rem !important;
    background-position: -13rem -9rem !important;
	}
	.e3{
    background-size: 29rem !important;
    background-position: -19.1rem -9rem !important;
	}
	.e4{
    background-size: 54rem !important;
    background-position: -46.9rem -19.3rem !important;
	}
}
.moving .fire3{
	.e1c{
		animation: fire 1s linear;
		animation-delay: 1.8s;
	}
	.e2c{
		animation: fire 1s linear;
		animation-delay: 1.8s;
	}
	.e3c{
		animation: fire 1s linear;
		animation-delay: 1.9s;
	}
	.e4c{
		animation: fire 1.2s linear;
		animation-delay: 2s;
	}
}
//烟火2
.fire2{
	margin-left: 5rem;
	margin-top:-2rem;
	.e1{
		background-size: 82rem !important;
    background-position: -24rem -14.1rem !important;
	}
	.e2{
    background-size: 45rem !important;
    background-position: -18.15rem -6.4rem !important;
	}
	.e3{
    background-size: 54rem !important;
    background-position: -30.8rem -8.1rem !important;
	}
	.e4{
    background-size: 54rem !important;
    background-position: -38.0rem -7.9rem !important;
	}
}
.moving .fire2{
	.e1c{
		animation: fire 1s linear;
		animation-delay: 1s;
	}
	.e2c{
		animation: fire 1s linear;
		animation-delay: 1s;
	}
	.e3c{
		animation: fire 1s linear;
		animation-delay: 1.1s;
	}
	.e4c{
		animation: fire 1.2s linear;
		animation-delay: 1.2s;
	}
}
//烟火1
.fire1{
	.e1{
		background-size: 129rem !important;
    background-position: -40rem -4.1rem !important;
	}
	.e2{
    background-size: 54rem !important;
    background-position: -21rem 0rem !important;
	}
	.e3{
    background-size: 54rem !important;
    background-position: -29rem 0rem !important;
	}
	.e4{
    background-size: 54rem !important;
    background-position: -37rem 0rem !important;
	}
}
.moving .fire1 .e1c{
	animation: fire 1.5s linear;
}
.moving .fire1 .e2c{
	animation: fire2 .6s linear;
}
.moving .fire1 .e3c{
	animation: fire .6s linear;
	animation-delay: .1s;
}
.moving .fire1 .e4c{
	animation: fire2 1s linear;
	animation-delay: .2s;
}
@keyframes fire{
	0%{
		opacity: 0;
		transform:scale(.8);
	}
	50%{
		opacity: 1;
	}
	100%{
		opacity: 0;
		transform:scale(1.5);
	}
}
@keyframes fire2{
	0%{
		opacity: 0;
		transform:scale(.4);
	}
	50%{
		opacity: 1;
	}
	100%{
		opacity: 0;
		transform:scale(1.5);
	}
}
//大炮-爆炸光效
.ca-light{
	background-size: 24rem !important;
	height: 3rem;
	width:3rem;
	right:5rem;
	bottom:6rem;
}
.ca2-light{
	right:3.6rem;
	bottom:6.1rem;
	transform:scale(.9);
}
.ca3-light{
	right:2.2rem;
	bottom:6.2rem;
	transform:scale(.8);
}
.ca4-light{
	right:0.9rem;
	bottom:6.3rem;
	transform:scale(.7);
}
//大炮-爆炸
.ca-boom{
	background-size: 24rem !important;
	width:1.6rem;
	height: 1.6rem;
	background-position: -.8rem -3.8rem !important;
	right: 5.3rem;
	bottom: 6rem;
}
.ca2-boom{
	right: 3.9rem;
	bottom: 6.1rem;
	transform:scale(.9);
}
.ca3-boom{
	right: 2.5rem;
	bottom: 6.2rem;
	transform:scale(.8);
}
.ca4-boom{
	right: 1.3rem;
	bottom: 6.3rem;
	transform:scale(.7);
}
//大炮
.cannon{
  width: 6rem;
  height: 6rem;
  background-size: 24rem !important;
  background-position: 0rem -7rem !important;
  right:0;
  bottom:1.8rem;
}
.cannon2{
	bottom:2.1rem;
	right: -1rem;
	transform:scale(.9);
}
.cannon3{
	bottom:2.4rem;
	right: -2rem;
	transform:scale(.8);
}
.cannon4{
	bottom:2.7rem;
	right: -3rem;
	transform:scale(.7);
}
</style>