<template>
  <div class="giving">
    <div class="desktop">
      <ul class="fix">
        <li v-for="d in $parent.giftsList" @click.stop="select(d)" :class="{selected:active[0] === d[0]}" class="gift">
          <span v-show="d[3] === 1">连</span>
          <i>￥{{d[2]}}</i>
          <em>{{d[1]}}</em>
        </li>
      </ul>
    </div>
    <div class="footer fix">
      <div class="btn" @click="send">发送</div>
      <!-- <div class="manyBtn" v-show="showManyBtn" @click="addGift"> -->
      <div class="manyBtn" v-show="false" @click="addGift">
        <span>连送</span>
        <em>{{time}}</em>
      </div>
    </div>
    <div class="showNum" :class="{ani_num:showScale}" v-show="giftNum!==1">
      x{{giftNum}}
    </div>
  </div>
</template>
<script>
	export default {
		data:()=>{
			return {
				active:[],
        giftArr:'',
        showManyBtn:0,
        showScale:1,
        showScaleT:null,
        time:100,
        t1:null,
        giftNum:1,
			}
		},
    created(){
      this.giftArr = this.$parent.$parent.GiftConfig
    },
		methods:{
			select(v){
        if (this.showManyBtn) {
          return
        }
				this.active = v
        if (this.t1 !== null) {
          clearInterval(this.t1)
          this.showManyBtn = 0
          this.time = 100
        }
			},
			send(){
        //检测是否有权限发送礼物
        if(this.$parent.$parent.checkPermissionsLevel('Reward') === -1){
          return layer.msgWarn('您的等级无法发送礼物！')
        }
        if(this.$parent.$parent.GameConfig.LiveBroadcastReward.State !== 1){
          return layer.msgWarn('已关闭发送礼物！')
        }
        if (false) {
          this.showMany()
          return
        }else{
          console.log('非连击礼物')
        }
        this.sendGift()
				this.active = []
				this.$parent.activeHide = 0
			},
      sendGift(){
        if(this.active.length <= 0){
          return layer.msgWarn('请选择礼物！')
        }
        _fetch({
          Action:'SendGift',
          GameID:this.$parent.$parent.lcode,
          GiftName:this.active[0],
          GiftNum:this.giftNum,
          GiftPrice:this.active[2]
        })
        .then(d=>{
          if (d.Code === 1) {
          }else{
            layer.msgWarn(d.StrCode)
          }
        })
        this.giftNum = 1
      },
      showMany(){
        this.t1 = setInterval(()=>{
          this.time--
          if (this.time<=0) {
            this.sendGift()
            clearInterval(this.t1)
            this.showManyBtn = 0
            this.time = 100
          }
        },100)
        this.showManyBtn = 1
      },
      addGift(){
        this.giftNum++
        this.time = 100
      },
		},
    watch:{
      'giftNum'(n,o){
        var aa = ()=>{
          this.showScale = 1
          this.showScaleT = setTimeout(()=>{
            this.showScale = 0
            clearTimeout(this.showScaleT)
          },300)
        }
        if (this.showScaleT) {
          clearTimeout(this.showScaleT)
        }
        if(this.showScale === 1){
          setTimeout(()=>{
            aa()
          },10)
        }else{
          aa()
        }
      }
    }
	}
</script>
<style lang="scss" scoped>
.giving{
  background:rgba(0, 0, 0, 0.5);
  transition:.2s;
  width:100%;
  height:12em;
  .desktop{
    height: 9.6em;
    overflow: scroll;
    ul{
      li{
        color:white;
        float:left;
        width:4rem;
        height:4.8em;
        border-right:1px solid rgba(255, 255, 255, 0.1);
        padding:.3em;
        &:active{
        	background-color:none;
        }
        &:nth-child(1n+5){
          border-top:1px solid rgba(255, 255, 255, 0.1);
        }
        &:nth-child(4n+4){
          border-right:none
        }
        i{
          display: block;
          text-align: center;
          font-size: .5em;
          color:#d7da2b;
          margin-bottom: .3em;
        }
        em{
          display:block;
          text-align:center;
          font-size:.5em;
        }
      }
      .selected{
      	border:1px solid #9560a7 !important;
      }
    }
  }
  .footer{
    height:2.4em;
    line-height:2.4em;
    background: rgba(0, 0, 0, 0.32);
    position: relative;
    .btn{
      color:white;
      float:right;
      background:#9ec2da;
      height: 2em;
      line-height: 2em;
      font-size: .7em;
      padding:0 1.4em;
      border-radius:1em;
      margin-top:.76em;
      margin-right:1em;
    }
  }
}
.manyBtn{
  position: absolute;
  color:white;
  right:1em;
  top:-1.4em;
  background: #03bec3;
  height: 3em;
  width: 3em;
  border-radius: 50%;
  text-align: center;
  padding-top:.72em;
  box-shadow: 0 0 0 .1em #009395,0 0 0 .2em #00c6db,0 0 0 .4em #63eaf7,0 0 1em black;
  em,span{
    display: block;
    font-size: .6em;
    line-height: 1.4em;
  }
  &:active{
    background: #01989c;
  }
}
.gift{
  position:relative;
  span{
    opacity: .5;
    position: absolute;
    top: .4em;
    right: .4em;
    background: #999;
    width: 1.4em;
    height: 1.4em;
    font-size: 0.5em;
    line-height: 1.4em;
    text-align: center;
    border-radius: .2em;
    color:#333;
  }
}
.showNum{
  font-size: 2em;
  position: absolute;
  bottom:3em;
  width: 100%;
  text-align: center;
  color:white;
  font-style: italic;
  color: #f9bc35;
  text-shadow: 0px 3px 5px rgba(0, 0, 0, 0.64);
}
.ani_num{
  animation: number .3s linear;
  transform: scale(1);
  opacity: 1;
}
@keyframes number{
  0%{
    transform: scale(3);
    opacity: 0;
  }
  100%{
    transform: scale(1);
    opacity: 1;
  }
}
</style>