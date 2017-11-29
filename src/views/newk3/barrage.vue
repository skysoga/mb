<template>
	<div class="barrage" ref="barrageCon">
		<ul>
			<li v-for="d in data"><span>{{d.call}}</span><div><em>{{d.name}}：</em><ins>{{d.text}}</ins></div></li>
		</ul>
	</div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    data:()=>{
      return{
      	scroll:null,
      	data:[
		      {
						call:'皇帝',
						name:'突然想起你',
						text:'现场灯光不错，刮的是七级的最炫民族风，我字体的故事之毛笔字',
					},
					{
						call:'知府',
						name:'ju***',
						text:'新功能测试下效果',
					},
					{
						call:'VIP5',
						name:'沙漠皇帝',
						text:'直播开奖新玩法',
					},
					{
						call:'VIP1',
						name:'香烟',
						text:'弹幕内容',
					},
					{
						call:'皇帝',
						name:'突然想起你',
						text:'现场灯光不错，刮的是七级的最炫民族风，我字体的故事之毛笔字',
					},
					{
						call:'知府',
						name:'ju***',
						text:'新功能测试下效果',
					},
					{
						call:'VIP5',
						name:'沙漠皇帝',
						text:'直播开奖新玩法',
					},
					{
						call:'VIP1',
						name:'香烟',
						text:'弹幕内容',
					},
					{
						call:'皇帝',
						name:'突然想起你',
						text:'现场灯光不错，刮的是七级的最炫民族风，我字体的故事之毛笔字',
					},
					{
						call:'知府',
						name:'ju***',
						text:'新功能测试下效果',
					},
					{
						call:'VIP5',
						name:'沙漠皇帝',
						text:'直播开奖新玩法',
					},
					{
						call:'VIP1',
						name:'香烟',
						text:'弹幕内容',
					},
					{
						call:'皇帝',
						name:'突然想起你',
						text:'现场灯光不错，刮的是七级的最炫民族风，我字体的故事之毛笔字',
					},
					{
						call:'知府',
						name:'ju***',
						text:'新功能测试下效果',
					},
					{
						call:'VIP5',
						name:'沙漠皇帝',
						text:'直播开奖新玩法',
					},
					{
						call:'VIP1',
						name:'香烟',
						text:'弹幕内容',
					},
      	]
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
    },
    beforeDestroy(){
    },
    watch:{
    	'$parent.show'(n){
    		if(n === 'main'){
    			this.refresh()
    		}
    	}
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
				width:2.8em;
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