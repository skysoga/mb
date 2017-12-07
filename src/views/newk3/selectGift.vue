<template>
  <div class="giving">
    <div class="desktop">
      <ul class="fix">
        <li v-for="d in $parent.$parent.GiftConfig" @click.stop="select(d[0])" :class="{selected:active === d[0]}">
          <em>{{d[1]}}</em>
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
				active:null,
        giftArr:'',
			}
		},
    created(){
      this.giftArr = this.$parent.$parent.GiftConfig
    },
		methods:{
			select(v){
				this.active = v
			},
			send(){
				this.$parent.giftPush({gift:this.active,username:'杨过',img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2764371306,3467823016&fm=27&gp=0.jpg'})
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