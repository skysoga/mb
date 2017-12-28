<template>
	<div class="boat gift" id="gift" :class="{moving}">
		<div class="sea sea1" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
		<div class="sea sea2" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
		<div class="shadow" :style="'background: url('+$parent.imgbaseUrl+url+')'"></div>
		<div class="boatimg" :style="'background: url('+$parent.imgbaseUrl+url+')'">
			<div class="name">{{$parent.giftArr[0].NickName}}</div>
			<img class="head" :src="$store.getters.PhotoPath+$parent.giftArr[0].UserPhoto||$store.state.constant.DefPhoto">
		</div>
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
    .name{
    	color:white;
    	margin-left: 2rem;
    	font-size: .8em;
    	transform:rotate(12deg);
    	width: 12rem;
	    text-align: center;
    }
    .head{
			border-radius: 50%;
	    margin-top: 1rem;
	    height: 2.2rem;
	    width: 2.2rem;
	    transform: rotateY(40deg) rotateX(-5deg);
	    margin-left: 8.5rem;
	    box-shadow: 0 0 6px 5px #ccc909;
    }
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