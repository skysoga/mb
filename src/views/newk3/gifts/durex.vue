<template>
	<div class="container">
		<div class="durex">
			<div class="durex1" style="background:url('/static/img/gifts/durex.png')"></div>
			<div class="durex2" style="background:url('/static/img/gifts/durex.png')"></div>
		</div>
		<div class="small1 small" style="background:url('/static/img/gifts/durex.png')"></div>
		<div class="small2 small" style="background:url('/static/img/gifts/durex.png')"></div>
		<div class="small3 small" style="background:url('/static/img/gifts/durex.png')"></div>
	</div>
</template>
<style lang="scss" scoped>
.container{
	float: left;
	width:3em;
	height:2em;
	margin-left: .5em;
	position: relative;
}
.durex1,.durex2{
	height: 2em;
	width:1.6em;
	background-size:100% !important;
	background-position: 0 -.75em !important;
	background-repeat: no-repeat !important;
	top:.2em;
	position: absolute;
	left: .5em;
}
.durex1{
	transform:rotate(-10deg) scale(.9);
	left: 1.15em;
}
.durex2{
	transform:rotate(15deg);
	left: .3em;
}
.durex{
  animation: durex 0.8s linear infinite;
  width:2em;
  height:1.6em;
}
.small{
	width:.6em;
	height:.5em;
	background-size:220% !important;
	background-repeat: no-repeat !important;
	background-position: -.52em 0 !important;
	position: absolute;
	top:0;
}
.small1{
	top:1.3em;
	left:.3em;
  animation: durex_small1 0.8s linear infinite;
}
.small2{
	top:0.3em;
	left:1em;
  animation: durex_small2 0.8s linear infinite;
}
.small3{
	top:0.5em;
	left:2em;
  animation: durex_small3 0.8s linear infinite;
}
@keyframes durex{
	0%{
		transform: scale(1);
	}
	24%{
		transform: scale(1);
	}
	25%{
		transform: scale(1.01);
	}
	75%{
		transform: scale(1.01);
	}
	76%{
		transform: scale(1);
	}
	100%{
		transform: scale(1);
	}
}
@keyframes durex_small1{
	0%{
		transform: translate(0) rotate(-10deg);
		opacity: 1;
	}
	100%{
		transform: translate(.2em,-2em) rotate(-10deg);
		opacity: 0;
	}
}
@keyframes durex_small2{
	0%{
		transform: translate(0) rotate(-10deg);
		left: 1em;
		opacity: 1;
	}
	60%{
		left: .6em;
		transform: translate(.05em,-1em) rotate(0deg);
	}
	80%{
		opacity: 0;
	}
	100%{
		transform: translate(.1em,-2em) rotate(10deg);
		opacity: 0;
	}
}
@keyframes durex_small3{
	0%{
		transform: translate(0) rotate(10deg);
		opacity: 1;
	}
	60%{
		opacity: 0;
	}
	100%{
		transform: translate(0,-2em) rotate(20deg);
		opacity: 0;
	}
}
</style>