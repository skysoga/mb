<template>
	<div class="gifts" :class="{moving,[active+'-con']:active}">
		<boat v-if="activegift === 'boat'"></boat>
		<ferrari v-if="activegift === 'ferrari'"></ferrari>
	</div>
</template>
<script>
  import boat 			from './gifts/boat'
  import ferrari  	from './gifts/ferrari'
  export default {
    components: {
      boat,
      ferrari,
    },
  	props:['activegift'],
    data:()=>{
    	return {
	  		imgbaseUrl:'/static/img/gifts/',
	  		imgDom:null,
    	}
    },
    methods:{
    	giftcreated(that){
	  		this.loadImg(that.url)
	  		.then(()=>{
	  			this.start(that)
	  		},()=>{
	  			layer.msgWarn('图片加载失败！')
	  		})
    	},
    	loadImg(url){
    		return new Promise((resolve,reject)=>{
    			this.imgDom = document.createElement('img')
    			this.imgDom.src = this.imgbaseUrl+url
    			this.imgDom.onload = function(){
    				resolve(this.imgDom)
    			}
    			this.imgDom.onerror = function(err){
    				reject(err)
    			}
    		})
    	},
    	start(that){
    		that.moving = 1
  			setTimeout(()=>{
	  			that.moving = 0
	  			this.$parent.activegift = ''
  			},that.time)
    	}
    }
  }
</script>
<style lang="scss" scoped>
.gifts{
	.gift{
		position: fixed;
		z-index: 25;
		width: 100%;
		height: 100%;
		bottom:0;
		pointer-events:none;
	}
}
</style>