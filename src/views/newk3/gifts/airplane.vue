<template>
	<div class="con gift" id="gift" :class="{moving}">
		<div class="light" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
		<div class="airplane sea1" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
		<div class="star1" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
		<div class="star2" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
	</div>
</template>
<script>
  export default {
    data:()=>{
    	return {
    		moving:0,
  			url:'airplane.png',
  			time:8000,
    	}
    },
    created(){
    	this.$parent.giftcreated(this)
    },
  }
</script>
<style lang="scss" scoped>
.star1,.star2{
	top:1rem;
  width: 16rem;
  height: 8rem;
  background-size: 30rem !important;
  background-repeat: no-repeat !important;
  background-position: -15rem 3.3rem !important;
  transform: rotate(2deg);
  opacity: 0;
}
.star2{
	left: 1rem;
  top: 0.5rem;
}
#gift{
	height: 13rem;
	>div{
		position:absolute;
	}
}
.airplane{
  width: 9.6rem;
  height: 3.9rem;
  background-size: 18rem !important;
  background-repeat: no-repeat !important;
	transform: translate(17rem,8rem);
}
.light{
  width: 17rem;
  height: 5rem;
  background-position: 17rem 13rem !important;
  background-size: 40rem !important;
  transform-origin: 100% 50%;
  transform: translate(0,0) scale(0) rotate(12deg);
}
.moving.gift{
	.airplane{
		animation: airplane 8s linear;
	}
	.light{
		animation: light 8s linear;
    top:6.5rem;
    left:2rem;
	}
	.star1,.star2{
		animation: star 8s linear;
	}
	.star2{
		animation-delay:.2s;
	}
}
@keyframes star{
	0%{
		opacity: 0;
	}
	31%{
		opacity: 0;
	}
	32%{
		opacity: 1;
	}
	34%{
		opacity: 1;
	}
	34%{
		opacity: 0;
	}
	37%{
		opacity: 0;
	}
	38%{
		opacity: 1;
	}
	39%{
		opacity: 1;
	}
	40%{
		opacity: 0;
	}
}
@keyframes light{
	0%{
    transform: translate(0,-1.8rem) scale(0) rotate(10deg);
    opacity: 1;
	}
	40%{
		opacity: 1;
	}
	50%{
    transform: translate(0,-.5rem) scale(1.3) rotate(10deg);
    opacity: 0;
	}
	50.001%{
		transform: translate(-24rem,-19.8rem) scale(0) rotate(16deg);
		opacity: 1;
	}
	90%{
		opacity: 1;
	}
	100%{
		transform: translate(-19.5rem,-19.6rem) scale(-1) rotate(16deg);
		opacity: 0;
	}
}
@keyframes airplane{
	0%{
		transform: translate(17rem,6rem) scale(.8) rotate(-4deg);
	}
	50%{
		transform: translate(-11rem,1rem) scale(1.5) rotate(-4deg);
	}
	51%{
		transform: translate(-12rem,-13rem) scaleX(-.8) rotate(-33deg);
	}
	100%{
		transform: translate(16rem,-6rem) scaleX(-1.5) rotate(-33deg);
	}
}
</style>