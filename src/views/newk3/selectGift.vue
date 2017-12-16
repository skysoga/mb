<template>
  <div class="giving">
    <div class="desktop">
      <ul class="fix">
        <li v-for="d in $parent.$parent.GiftConfig" @click.stop="select(d)" :class="{selected:active[0] === d[0]}" class="gift">
          <span v-show="d[2]">连</span>
          <em>{{d[1]}}</em>
        </li>
      </ul>
    </div>
    <div class="footer fix">
      <div class="btn" @click="send">发送</div>
      <div class="manyBtn" v-show="showManyBtn" @click="addGift">
        <span>连送</span>
        <em>{{time}}</em>
      </div>
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
				this.active = v
        if (this.t1 !== null) {
          clearInterval(this.t1)
          this.showManyBtn = 0
          this.time = 100
        }
			},
			send(){
        if (this.active[2]) {
          this.showMany()
          return
        }else{
          console.log('非连击礼物')
        }
				this.$parent.giftPush({gift:this.active[0],name:'杨过',img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2764371306,3467823016&fm=27&gp=0.jpg'})
				this.active = []
				this.$parent.activeHide = 0
			},
      sendManyGift(){
        console.log('连送礼物提交')
      },
      showMany(){
        this.t1 = setInterval(()=>{
          this.time--
          if (this.time<=0) {
            this.sendManyGift()
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
</style>