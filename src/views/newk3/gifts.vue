<template>
  <div @click="$parent.changeShow" v-if="isOpen">
    <smallgift></smallgift>
    <binary></binary>
  	<!-- <div class="gifts" v-if="giftArr.length > 0">
  	</div> -->
  </div>
</template>
<script>
  import smallgift  from './gifts/smallgift'
  import binary     from './gifts/binary'
  export default {
    components: {
      smallgift,
      binary,
    },
  	props:['activegift'],
    data:()=>{
    	return {
	  		imgbaseUrl:'/static/img/gifts/',
	  		imgDom:null,
	  		giftArr:[],
        t1:null,
        t2:null,
        isOpen:0,
        giftsObj:{},
    	}
    },
    created(){
      var giftsList = this.$parent.giftsList
      for (var i = 0; i < giftsList.length; i++) {
        this.giftsObj[giftsList[i][0]] = giftsList[i]
      }
    },
    mounted(){
      document.addEventListener("visibilitychange", this.clearGift)
      setTimeout(()=>{
        this.isOpen = this.$parent.$parent.GameConfig.LiveBroadcastReward.State
      },1)
    },
    methods:{
      clearGift(){
        this.giftArr = []
        console.log('礼物清空')
      },
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
  			this.t1 = setTimeout(()=>{
	  			that.moving = 0
          this.giftArr[0].type = 0
          this.t2 = setTimeout(()=>{
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
    },
    beforeDestroy(){
      document.removeEventListener("visibilitychange", this.clearGift)
      clearTimeout(this.t1)
      clearTimeout(this.t2)
    },
  }
</script>
<style lang="scss" scoped>
// .gifts{
// 	.gift{
// 		position: fixed;
// 		z-index: 21;
// 		width: 100%;
// 		height: 100%;
// 		bottom:0;
// 		pointer-events:none;
// 	}
// }
// </style>