<template>
	<div class="container">
		<div class="kiss" :style="'background:url('+$store.state.constant.ImgHost+'/live/gifts/kiss.png)'"></div>
		<div class="small" :style="'background:url('+$store.state.constant.ImgHost+'/live/gifts/kiss.png)'"></div>
	</div>
</template>
<style lang="scss" scoped>
.container{
	float: right;
	width:3em;
	height:2em;
	position: relative;
}
.kiss{
	width: 2.2em;
	height: 1.4em;
	background-size: 100% !important;
	background-repeat: no-repeat !important;
	position: absolute;
	top:.3em;
	left: .4em;
  animation: kiss_kiss 1.8s linear infinite;
}
.small{
	width: .8em;
	height: .6em;
	background-size: 100% !important;
	background-repeat: no-repeat !important;
	position: absolute;
	top:.3em;
	left: .4em;
	transform:rotate(20deg);
  animation: kiss_small 1.8s linear infinite;
}
@keyframes kiss_kiss{
	0%{
		transform: scale(1);
	}
	25%{
		transform: scale(1);
	}
	30%{
		transform: scale(1.2);
	}
	38%{
		transform: scale(1);
	}
	100%{
		transform: scale(1);
	}
}
@keyframes kiss_small{
	0%{
		transform:rotate(20deg) translate(0) scale(1);
		opacity: 0;
	}
	30%{
		transform:rotate(20deg) translate(0) scale(1);
		opacity: 0;
	}
	31%{
		transform:rotate(20deg) translate(0,0) scale(1);
		opacity: 1;
	}
	60%{
		transform:rotate(20deg) translate(-1em,-1em) scale(.5);
		opacity: 0;
	}
	100%{
		opacity: 0;
	}
}
</style>