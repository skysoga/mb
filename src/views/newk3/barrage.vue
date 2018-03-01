<template>
	<div class="barrage" ref="barrageCon" v-show="1" @click="clickContent">
		<ul>
      <li class="default">
        <div class="content">
          <ins>温馨提示：严禁涉政、涉黄、造谣、抹黑、广告，发现一律封号！</ins>
        </div>
      </li>
			<li v-for="d in data">
        <div class="content">
          <span :class="'vip'+d.Level">{{getLevel(d.Level)}}</span>
          <div><em>{{d.NickName}}：</em><ins>{{d.Message}}</ins></div>
        </div>
      </li>
		</ul>
	</div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    data:()=>{
      return{
      	scroll:null,
      	data:[]
      }
    },
    mounted(){
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.barrageCon, {click:true,})
        this.scroll.scrollTo(0,this.scroll.maxScrollY,.2)
      })
    },
    methods:{
    	refresh(){
    		setTimeout(()=>{
	    		this.scroll.refresh()
	        this.scroll.scrollTo(0,this.scroll.maxScrollY,.2)
    		},100)
    	},
      getLevel(v){
        if (v>0&&v<10) {
          return 'VIP'+v
        }
        else{
          switch(v){
            case 0:return '黑名单';break;
            case -1:return 'VIP1';break;
            case 10:return '站长';break;
          }
        }
      },
      clickContent(){
        if (this.$parent.activeHide === 1) {{
          console.log('关闭弹幕发送器')
        }}
      },
    },
    beforeDestroy(){
    },
    watch:{
    	'$parent.show'(n){
    		if(n === 'main'){
    			this.refresh()
    		}
    	},
    	'data'(n){
    		if (n.length >= 100) {
    			this.data = []
    			this.data.push(n[n.length-1])
    		}
  			this.refresh()
    	},
    },
  }
</script>
<style lang="scss" scoped>
.vip-1,.vip1,.vip2,.vip3{
  background: #32aaff !important;
}
.vip4,.vip5,.vip6{
  background: #09ccd1 !important;
}
.vip7,.vip8,.vip9{
  background: #f57678 !important;
}
.default{
  .content{
    text-align: justify;
  }
}
.barrage{
	height: 6.5em;
	overflow: hidden;
  z-index: 20;
	ul{
		min-height: 101%;
    width: 10.5rem;
		color:white;
		margin: 0 .65em;
		font-size:.7em;
    li{
      padding:.2em 0;
    }
		.content{
      /*margin: .25em 0;*/
      padding: .15em .4em;
			display: table;
      background: rgba(0,0,0,.15);
      border-radius: .2em;
			span,>div{
				display: table-cell;
			}
			em,ins{
				text-shadow: 0 0 1px rgba(0, 0, 0, 0.19);
				vertical-align: middle;
			}
			span{
				font-size:.75em;
				vertical-align: middle;
				background: #00aafb;
				display: inline-block;
				border-radius: .2em;
				width:3em;
				text-align: center;
				margin-right: .4em;
				padding: .07em 0;
			}
			em{
				color:#e04649;
			}
		}
	}
}
</style>