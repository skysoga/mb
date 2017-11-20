<template>
	<div class="boat gift" id="gift" :class="{moving}">
		<div class="sea sea1" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
		<div class="sea sea2" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
		<div class="shadow" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
		<div class="boatimg" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
	</div>
</template>
<script>
  export default {
    data:()=>{
    	return {
    		moving:0,
  			url:'boat.png',
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
	&.boat{
		.boatimg,.shadow{
	    animation: boatimg 10s linear;
		}
	}
	&.boat{
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
</style>