<template>
		<div class="gift" id="gift" :class="{moving}">
			<div></div>
		</div>
</template>
<script>
  export default {
    data:()=>{
    	return {
    		moving:0,
  			url:'cannon.png',
  			time:5000000,
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
}
.car-con{
	transform:translate(16rem,0rem);
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
		transform: rotate(360deg) scale(0.56);
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
.moving.gift{
	.car-con{
	  animation: ferrari-car 5s linear;
	}
	.wheel{
    animation: ferrari-wheel .8s infinite linear;
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
</style>