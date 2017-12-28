<template>
	<div class="smallgift fix">
		<div v-for="(d,i) in 2" v-if="twoGift['gift'+d]" :class="'block'+d">
      <div class="fix">
        <div class="block" :class="{block_ani:twoGift['block_ani'+d]}">
          <img :src="$store.getters.PhotoPath+twoGift['gift'+d].UserPhoto||$store.state.constant.DefPhoto">
          <div class="text">
            <span>{{twoGift['gift'+d].NickName}}</span>
            <em>送出{{giftName[hasGift.indexOf(twoGift['gift'+d].GiftID)]}}</em>
          </div>
          <cuke v-if="twoGift['gift'+d].GiftID === 'cuke'"></cuke>
          <injections v-if="twoGift['gift'+d].GiftID === 'injections'"></injections>
          <kiss v-if="twoGift['gift'+d].GiftID === 'kiss'"></kiss>
          <durex v-if="twoGift['gift'+d].GiftID === 'durex'"></durex>
        </div>
        <div class="number number_ani">x{{twoGift['gift'+d].GiftNum}}</div>
      </div>
  	</div>
  </div>
</template>
<script>
  import cuke         from './cuke'
  import injections   from './injections'
  import kiss         from './kiss'
  import durex        from './durex'
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
	  		hasGift: null,
        giftName:null,
        twoGift:{
          gift1:null,
          gift2:null,
          gift1T:null,
          gift2T:null,
          show1:true,
          show2:true,
          beforeGiftID1:null,
          beforeNickName1:null,
          beforeGiftID2:null,
          beforeNickName2:null,
          block_ani1:true,
          block_ani2:true,
        },
    	}
    },
    created(){
      let _giftsList = this.$parent.$parent.giftsList
      let _hasGift = []
      let _giftName = []
      for(let d of _giftsList){
        if (d[3]) {
          _hasGift.push(d[0])
          _giftName.push(d[1])
        }
      }
      this.hasGift = _hasGift
      this.giftName = _giftName
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
            this.twoGift.block_ani1 = false
            if (this.giftArr.length > 0) {
              setTimeout(()=>{
                this.checkTwoGift()
              },50)
            }
          },5000)
        }
        if (this.twoGift.gift2 === null && this.giftArr.length > 0) {
          this.twoGift.gift2 = this.giftArr[0]
          this.giftArr.splice(0,1)
          this.twoGift.gift2T = setTimeout(()=>{
            this.twoGift.gift2 = null
            this.twoGift.block_ani2 = false
            if (this.giftArr.length > 0) {
              setTimeout(()=>{
                this.checkTwoGift()
              },50)
            }
          },5000)
        }
      },
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
  .block1,.block2{
    position: absolute;
  }
  .block1{
    top:0;
  }
  .block2{
    top:2.4em;
  }
  .fix{
    height:2em;
    width:12em;
    position: relative;
    img{
      height:2em;
      width:2em;
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
.number{
  text-align: left;
  width: 2em;
  height: 2em;
  line-height: 2em;
  font-style: italic;
  font-size: 1.1em;
  color: #f9bc35;
  text-shadow: 0px 3px 5px rgba(0, 0, 0, 0.64);
  float: left;
  padding-left: .2em;
}
.number_ani{
  animation: smallgift_number 5s linear;
}
.block{
  transform: translateX(0);
  animation: showgift 5s linear;
  border-radius: 2em;
  background: rgba(0, 0, 0, 0.15);
  width:9em;
  height:100%;
  float:left;
}

@keyframes showgift{
  0%{
    transform: translateX(-9em);
  }
  6%{
    transform: translateX(0);
  }
  94%{
    transform: translateX(0);
  }
  100%{
    transform: translateX(-9em);
  }
}
@keyframes smallgift_number{
  0%{
    opacity: 0;
  }
  6%{
    transform: scale(3);
    opacity: 0;
  }
  12%{
    transform: scale(1);
    opacity: 1;
  }
  94%{
    transform: scale(1);
    opacity: 1;
  }
  100%{
    transform: scale(1);
    opacity: 0;
  }
}
</style>