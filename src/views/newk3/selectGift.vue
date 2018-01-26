<template>
  <div class="giving">
    <div class="desktop">
      <ul class="fix">
        <li v-for="d in $parent.giftsList" @click.stop="select(d)" :class="{selected:active[0] === d[0]}" class="gift">
          <span v-show="d[3] === 1">连</span>
          <div :class="'review view-'+d[0]" :style="'background: url(/static/img/smallgifts/'+d[0]+'.png)'"></div>
          <i>￥{{d[2]}}</i>
          <em>{{d[1]}}</em>
        </li>
        <li v-for="d in $parent.giftsList.length % 4"></li>
      </ul>
    </div>
    <div class="footer fix">
      <div class="balance">
        
            <template v-if="balShow">余额：{{UserBalance}} <ins @click="getBalance">刷新</ins></template>
            <template v-else>余额：已隐藏 <ins @click="getBalance">显示</ins></template>
      </div>
      <div class="btn" :class="{curr:active.length>0}">
        <a @click="send" href="javascript:;" v-show="!showManyBtn">{{active[3]===1?'连发':'发送'}}</a>
        <a @click="addGift" href="javascript:;" v-show="showManyBtn">连发：{{time}}</a>
      </div>
      <div class="manyBtn" v-show="0">
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
        combo:null,
        balShow:false,
        UserBalance:"",
			}
		},
    created(){
      this.giftArr = this.$parent.$parent.GiftConfig
      this.UserBalance=store.state.UserBalance
    },
		methods:{
			select(v){
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
          return layer.msgWarn('您当前的等级无法进行打赏！')
        }
        if(this.$parent.$parent.GameConfig.LiveBroadcastReward.State !== 1){
          return layer.msgWarn('已关闭发送礼物！')
        }
        this.sendGift()
        if (this.active[3] === 1) {
          this.showMany()
          return
        }else{
          console.log('非连击礼物')
        }
				this.active = []
				this.$parent.activeHide = 0
			},
      sendGift(){
        var ajaxData = {
          Action:'SendGift',
          GameID:this.$parent.$parent.lcode,
          GiftName:this.active[0],
          GiftNum:this.giftNum,
          GiftPrice:this.active[2],
          AnchorName:this.$parent.$parent.Anchor.Name,
          AnchorID:this.$parent.$parent.Anchor.ID
        }
        console.log()
        if(this.active.length <= 0){
          return layer.msgWarn('请选择礼物！')
        }
        if (this.combo) {
          ajaxData['ComboID'] = this.combo
        }
        _fetch(ajaxData)
        .then(d=>{
          if (d.Code === 1) {
            this.combo = d.BackData.ComboID
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
            clearInterval(this.t1)
            this.showManyBtn = 0
            this.time = 100
            this.combo = null
          }
        },100)
        this.showManyBtn = 1
      },
      addGift(){
        this.sendGift()
        this.time = 100
      },
      getBalance:function(){
        RootApp.GetInitData(['UserBalance'],ref=>{
          this.refreshClass+=" refreshMove"
          this.balShow=true
          this.UserBalance=""
          setTimeout(()=>{
            this.refreshClass="refresh"
            this.UserBalance=store.state.UserBalance
          },500)
        })
      },
		},
    watch:{
      'giftNum'(n,o){
        //数字动画
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
      },
      '$parent.activeHide'(){
        this.balShow = false
      },
    }
	}
</script>
<style lang="scss" scoped>
.review{
  width: 100%;
  height: 2.9em;
  background-position: center -.1em !important;
  background-size: 2.9em !important;
  background-repeat: no-repeat !important;
}
.balance{
  float: left;
  color:#fcc948;
  font-size: .65em;
  padding-left: .6em;
}
.giving{
  background:rgba(4, 0, 12, 0.88);
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
        // border-right:1px solid rgba(255, 255, 255, 0.1);
        padding:.3em;
        position: relative;
        &:active{
        	background-color:none;
        }
        &:nth-child(1n+5){
          // border-top:1px solid rgba(255, 255, 255, 0.1);
        }
        &:nth-child(4n+4){
          border-right:none
        }
        &:nth-child(1n+5):before,&:nth-child(1n+2):after{
          position: absolute;
          top:0;
          left: 0;
          content:'';
          display: block;
        }
        &:nth-child(1n+5):before{
          height: 1px;
          width: 100%;
          background-image: -webkit-linear-gradient(90deg,#464853,#464853 50%,transparent 0);
        }
        &:nth-child(1n+2):after{
          width: 1px;
          height: 100%;
          background-image: -webkit-linear-gradient(0deg,#464853,#464853 50%,transparent 0);
        }
        i{
          display: block;
          text-align: center;
          font-size: .5em;
          color:#d7da2b;
          // margin-bottom: .3em;
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
    &:before{
      content:'';
      position: absolute;
      display: block;
      width: 100%;
      height: 1px;
      background-image: -webkit-linear-gradient(90deg,#464853,#464853 50%,transparent 0);
    }
    .btn{
      color:white;
      float:right;
      background:#d9dfe2;
      height: 2em;
      width: 5.4em;
      line-height: 2em;
      font-size: .7em;
      text-align: center;
      border-radius:1em;
      margin-top:.76em;
      margin-right:1em;
      a{
        display: inline-block;
        width: 100%;
      }
      &.curr{
        background: #ee3945;
      }
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