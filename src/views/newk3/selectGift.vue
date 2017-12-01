<template>
  <div class="giving">
    <div class="desktop">
      <ul class="fix">
        <li @click.stop="select('boat')" :class="{selected:active === 'boat'}">
          <em>皇家邮轮</em>
        </li>
        <li @click.stop="select('ferrari')" :class="{selected:active === 'ferrari'}">
          <em>法拉利</em>
        </li>
        <li @click.stop="select('airplane')" :class="{selected:active === 'airplane'}">
          <em>飞机</em>
        </li>
        <li @click.stop="select('cannon')" :class="{selected:active === 'cannon'}">
          <em>皇家礼炮</em>
        </li>
        <li @click.stop="select('cuke')" :class="{selected:active === 'cuke'}">
          <em>黄瓜</em>
        </li>
        <li @click.stop="select('binary-porsche')" :class="{selected:active === 'binary-porsche'}">
          <em>保时捷</em>
        </li>
        <li @click.stop="">
          <em>未启用</em>
        </li>
        <li @click.stop="">
          <em>未启用</em>
        </li>
      </ul>
    </div>
    <div class="footer fix">
      <div class="btn" @click="send">发送</div>
    </div>
  </div>
</template>
<script>
	export default {
		data:()=>{
			return {
				active:null
			}
		},
		methods:{
			select(v){
				this.active = v
			},
			send(){
				this.$parent.giftPush(this.active)
				this.active = null
				this.$parent.activeHide = 0
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
</style>