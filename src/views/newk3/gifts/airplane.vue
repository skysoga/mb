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
	width: 10.6rem;
  height: 4.3rem;
  background-size: 18rem !important;
  background-repeat: no-repeat !important;
}
.light{
  width: 34rem;
  height: 8rem;
  background-position: 35rem 24rem !important;
  left: 7rem;
  top: -1.9rem;
  background-size: 80rem !important;
}
.moving.gift{
	.airplane{
		animation: airplane 10s linear;
	}
	.light{
		animation: light 10s linear;
	}
}
@keyframes light{
	0%{
		transform: translate(17rem,8rem);
		opacity: 1;
	}
	25%{
		opacity: 1;
	}
	50%{
		transform: translate(-10rem,-1rem);
		opacity: 0;
	}
	50.001%{
		transform: translate(-42rem,-21rem) scaleX(-1) rotate(-33deg);
		opacity: 1;
	}
	75%{
		opacity: 1;
	}
	100%{
		transform: translate(-24rem,-17rem) scaleX(-1) rotate(-33deg);
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
	100%{
		transform: translate(16rem,-6rem) scaleX(-1) rotate(-33deg);
	}
}
</style>