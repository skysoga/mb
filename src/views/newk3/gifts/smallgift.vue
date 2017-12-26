<template>
	<div class="smallgift fix">
		<div v-for="(d,i) in 2" v-if="twoGift['gift'+d]">
      <img :src="$store.getters.PhotoPath+twoGift['gift'+d].Avatar||$store.state.constant.DefPhoto">
      <div class="text">
        <span>{{twoGift['gift'+d].NickName}}</span>
        <em>送出{{giftName[hasGift.indexOf(twoGift['gift'+d].GiftID)]}}</em>
      </div>
      <cuke v-if="twoGift['gift'+d].GiftID === 'cuke'"></cuke>
      <injections v-if="twoGift['gift'+d].GiftID === 'injections'"></injections>
      <kiss v-if="twoGift['gift'+d].GiftID === 'kiss'"></kiss>
      <durex v-if="twoGift['gift'+d].GiftID === 'durex'"></durex>
    </div>
	</div>
</template>
<script>
  import cuke  from './cuke'
  import injections  from './injections'
  import kiss  from './kiss'
  import durex  from './durex'
  export default {
    components: {
      cuke,
      injections,
      kiss,
      durex,
    },
    data:()=>{
    	return {
	  		imgbaseUrl:'/static/img/gifts/',
	  		imgDom:null,
	  		giftArr:[],
	  		hasGift: ['cuke','injections','kiss','durex'],
        giftName:['小黄瓜','打针','么么哒','杜蕾斯'],
        twoGift:{
          gift1:null,
          gift2:null,
          gift1T:null,
          gift2T:null,
        },
    	}
    },
    mounted(){
    	let _giftArr = this.$parent.giftArr
    	this.checkGift(_giftArr)
    },
    methods:{
    	checkGift(_giftArr){
	    	if (_giftArr.length>0) {
	    		for (var i = _giftArr.length-1; i > -1; i--) {
		    		if (this.hasGift.indexOf(_giftArr[i].type) > -1) {
		    			this.giftArr.push(_giftArr[i])
		    			this.$parent.giftArr.splice(i,1)
		    		}
	    		}
          this.checkTwoGift()
	    	}
    	},
      checkTwoGift(){
        if (this.twoGift.gift1 === null && this.giftArr.length > 0) {
          this.twoGift.gift1 = this.giftArr[0]
          this.giftArr.splice(0,1)
          this.twoGift.gift1T = setTimeout(()=>{
            this.twoGift.gift1 = null
          },50000000)
        }
        if (this.twoGift.gift2 === null && this.giftArr.length > 0) {
          this.twoGift.gift2 = this.giftArr[0]
          this.giftArr.splice(0,1)
          this.twoGift.gift2T = setTimeout(()=>{
            this.twoGift.gift2 = null
          },50000000)
        }
      },
      // getName(id){
      //   let num = this.
      // },
    },
    watch:{
    	'$parent.giftArr'(n){
    		this.checkGift(n)
    	},
    },
  }
</script>
<style lang="scss" scoped>
.smallgift{
  position: fixed;
  z-index: 20;
  bottom: 10em;
  left: .4em;
  height:4.5em;
  >div{
    background: rgba(0, 0, 0, 0.15);
    height:2em;
    border-radius: 2em;
    width:9em;
    img{
      height:100%;
      border-radius: 50%;
      display: block;
      float: left;
    }
    &:nth-child(2){
      margin-top: .5em;
    }
  }
}
.text{
  float:left;
  margin-left: .3em;
  span,em{
    display:block;
    color:white;
    font-size:.68em;
    line-height: 1.32em;
  }
  span{
    margin-top: .4em;
  }
  em{
    font-size: .55em;
  }
}
</style>