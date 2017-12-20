<template>
	<div class="barrage" ref="barrageCon" v-show="data.length > 0">
		<ul>
			<li v-for="d in data"><span>{{getLevel(d.Level)}}</span><div><em>{{d.NickName}}：</em><ins>{{d.Message}}</ins></div></li>
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
        this.scroll = new BScroll(this.$refs.barrageCon, {})
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
            case -1:return '测试组';break;
            case 10:return '站长';break;
          }
        }
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
.barrage{
	height: 6em;
	overflow: hidden;
	ul{
		min-height: 101%;
		color:white;
		margin: 0 .65em;
		font-size:.7em;
		li{
			padding: .4em 0;
			display: table;
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