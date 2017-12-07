<template>
  <div>
    <smallgift></smallgift>
  	<div class="gifts" v-if="giftArr.length > 0">
  		<boat 		v-if="giftArr[0].type === 'boat'"			></boat>
  		<ferrari  v-if="giftArr[0].type === 'ferrari'"	></ferrari>
  		<airplane v-if="giftArr[0].type === 'airplane'"	></airplane>
      <cannon   v-if="giftArr[0].type === 'cannon'"   ></cannon>
      <binary></binary>
  	</div>
  </div>
</template>
<script>
  import smallgift  from './gifts/smallgift'
  import boat       from './gifts/boat'
  import ferrari  	from './gifts/ferrari'
  import airplane   from './gifts/airplane'
  import cannon     from './gifts/cannon'
  import binary     from './gifts/binary'
  export default {
    components: {
      smallgift,
      boat,
      ferrari,
      airplane,
      cannon,
      binary,
    },
  	props:['activegift'],
    data:()=>{
    	return {
	  		imgbaseUrl:'/static/img/gifts/',
	  		imgDom:null,
	  		giftArr:[],
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
          this.giftArr[0].type = 0
          setTimeout(()=>{
            this.giftArr.splice(0,1)
          },100)
  			},that.time)
    	},
    },
    watch:{
    	'activegift'(n){
    		if (n === '') {
    			return
    		}
    		this.giftArr.push(n)
        this.$parent.activegift = ''
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