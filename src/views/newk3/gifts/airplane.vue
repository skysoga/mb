<template>
	<div class="con gift" id="gift" :class="{moving}">
		<div class="light" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
		<div class="airplane sea1" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
	</div>
</template>
<script>
  export default {
    data:()=>{
    	return {
    		moving:0,
  			url:'airplane.png',
  			time:10000,
    	}
    },
    created(){
    	this.$parent.giftcreated(this)
    },
  }
</script>
<style lang="scss" scoped>
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
}
.light{
  width: 17rem;
  height: 5rem;
  background-position: 17rem 13rem !important;
  background-size: 40rem !important;
}
.moving.gift{
	.airplane{
		animation: airplane 10s linear;
	}
	.light{
		animation: light 10s linear;
    transform-origin: 100% 50%;
    transform: scale(0) translateY(9.1rem);
    top:6.5rem;
    left:2rem;
	}
}
@keyframes light{
	0%{
    transform: scale(0) rotate(16deg);
		opacity: 1;
	}
	25%{
		opacity: 1;
	}
	50%{
    transform: scale(1.3) rotate(16deg);
		opacity: 0;
	}
	50.001%{
		transform: translate(-24rem,-19.8rem) scale(0) rotate(16deg);
		opacity: 1;
	}
	75%{
		opacity: 1;
	}
	100%{
		transform: translate(-19.5rem,-19.6rem) scale(-1) rotate(16deg);
		opacity: 0;
	}
}
@keyframes airplane{
	0%{
		transform: translate(17rem,8rem);
	}
	50%{
		transform: translate(-11rem,-1rem);
	}
	51%{
		transform: translate(-12rem,-13rem) scaleX(-1) rotate(-33deg);
	}
	75{
		transform: translate(2rem,-2.5rem) scaleX(-1) rotate(-33deg);
	}
	100%{
		transform: translate(16rem,-6rem) scaleX(-1) rotate(-33deg);
	}
}
</style>