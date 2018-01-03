<template>
	<div class="container">
		<div class="block">
			<div v-show="show" class="target1" style="background:url('/static/img/gifts/injections.png')"></div>
			<div v-show="!show" class="target2" style="background:url('/static/img/gifts/injections.png')"></div>
			<div class="water1" style="background:url('/static/img/gifts/injections.png')"></div>
			<div class="water2" style="background:url('/static/img/gifts/injections.png')"></div>
		</div>
	</div>
</template>
<script>
  export default {
    data:()=>{
    	return {
    		t:null,
    		show:true,
    	}
    },
    created(){
    	var a = 1
    	this.t = setInterval(()=>{
    		if (a<8){
	    		this.show = !this.show
    		}
    		if (a>12) {
    			a=1
    		}
    		a++
    	},150)
    },
  }
</script>
<style lang="scss" scoped>	
.container{
	float: left;
	width:3em;
	height:2em;
	margin-left: 1.3em;
}
.block{
	position: relative;
}
.target1,.target2{
	height: 1em;
	width: 2.5em;
	position: absolute;
	background-size: 3em !important;
	background-repeat: no-repeat !important;
	top:.4em;
	transform:rotate(-45deg);
}
.target2{
	background-position: 0 -1.005em !important;
}
.water1{
	position: absolute;
	width: 1em;
	height: 1.2em;
	background-repeat:no-repeat !important;
	background-position: -4.25em -0.75em !important;
	background-size: 5em !important;
	left: 1.8em;
	top:-.45em;
	transform:scale(.5) translate(0,0);
  animation: injections 1.8s linear infinite;
	animation-delay: .5s;
	opacity: 0;
}
.water2{
	position: absolute;
	width: 1em;
	height: .6em;
	background-repeat:no-repeat !important;
	background-position: -4.25em 0 !important;
	background-size: 5em !important;
	left: 1.5em;
	top:-.2em;
	transform:scale(.5) translate(0,0);
  animation: injections 1.8s linear infinite;
	animation-delay: .7s;
	opacity: 0;
}
@keyframes injections{
	0%{
		transform:scale(0.1) translate(0,0);
		opacity: 0;
	}
	5%{
		transform:scale(.5) translate(0,0);
		opacity: 1;
	}
	15%{
		transform:scale(.6) translate(0em,.5em);
	}
	30%{
		transform:scale(.6) translate(0,2em);
		opacity: 1;
	}
	31%{
		opacity: 0;
	}
}
</style>