<template>
	<div class="container">
		<div class="block">
			<div class="cuke1" style="background:url('/static/img/gifts/cuke.png')"></div>
			<div class="cuke2" style="background:url('/static/img/gifts/cuke.png')"></div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.container{
	float: left;
	width:3em;
	height:2em;
	margin-left: .5em;
}
.block{
	position: relative;
  animation: moving .2s linear infinite;
}
.cuke1,.cuke2{
	position: absolute;
	right:0;
	height: 2em;
	width:2.5em;
	background-repeat: no-repeat !important;
	background-size: 100% !important;
}
.cuke1{
	transform:rotate(-40deg);
	top:.5em;
}
.cuke2{
	transform:rotate(-10deg);
	top:.9em;
}
@keyframes moving{
	0%{
		transform:translate(0em,0);
		filter: blur(0);
	}
	45%{
		filter: blur(0);
	}
	50%{
		transform:translate(.03em,.03em);
		filter: blur(.06em);
	}
	95%{
		filter: blur(0);
	}
	100%{
		transform:translate(0em,0);
		filter: blur(0);
	}
}
</style>