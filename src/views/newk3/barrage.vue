<template>
	<div class="barrage" ref="barrageCon">
		<ul>
			<li><span>皇帝</span><div><em>突然想起你：</em><ins>现场灯光不错，刮的是七级的最炫民族风，我字体的故事之毛笔字</ins></div></li>
			<li><span>知府</span><div><em>ju***li：</em><ins>新功能测试下效果~</ins></div></li>
			<li><span>VIP5</span><div><em>沙漠皇帝：</em><ins>直播开奖新玩法</ins></div></li>
			<li><span>VIP1</span><div><em>香烟：</em><ins>弹幕内容</ins></div></li>
			<li><span>皇帝</span><div><em>突然想起你：</em><ins>现场灯光不错，刮的是七级的最炫民族风，我字体的故事之毛笔字</ins></div></li>
			<li><span>知府</span><div><em>ju***li：</em><ins>新功能测试下效果~</ins></div></li>
			<li><span>VIP5</span><div><em>沙漠皇帝：</em><ins>直播开奖新玩法</ins></div></li>
			<li><span>VIP1</span><div><em>香烟：</em><ins>弹幕内容</ins></div></li>
			<li><span>皇帝</span><div><em>突然想起你：</em><ins>现场灯光不错，刮的是七级的最炫民族风，我字体的故事之毛笔字</ins></div></li>
			<li><span>知府</span><div><em>ju***li：</em><ins>新功能测试下效果~</ins></div></li>
			<li><span>VIP5</span><div><em>沙漠皇帝：</em><ins>直播开奖新玩法</ins></div></li>
			<li><span>VIP1</span><div><em>香烟：</em><ins>弹幕内容</ins></div></li>
			<li><span>皇帝</span><div><em>突然想起你：</em><ins>现场灯光不错，刮的是七级的最炫民族风，我字体的故事之毛笔字</ins></div></li>
			<li><span>知府</span><div><em>ju***li：</em><ins>新功能测试下效果~</ins></div></li>
			<li><span>VIP5</span><div><em>沙漠皇帝：</em><ins>直播开奖新玩法</ins></div></li>
			<li><span>VIP1</span><div><em>香烟：</em><ins>弹幕内容</ins></div></li>
		</ul>
	</div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    data:()=>{
      return{
      	scroll:null
      }
    },
    mounted(){
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.barrageCon, {})
        this.scroll.scrollTo(0,this.scroll.maxScrollY,.2)
      })
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