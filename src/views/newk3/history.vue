<template>
	<div class="history" :class="{opened}" @click.stop="">
		<div class="header fix">
			<em @click.stop="close"></em>
			<span :class="{curr:type === 2}" @click="$parent.history = 2">开奖记录</span>
			<span :class="{curr:type === 1}" @click="$parent.history = 1">投注记录</span>
		</div>
		<div class="list">
			<div class="opened" v-show="type === 2">
				<div class="title">
				</div>
				<table>
					<tr>
						<th width="30%">期号</th>
						<th width="25%">开奖号码</th>
						<th width="15%">和值</th>
						<th width="15%">大小</th>
						<th width="15%">单双</th>
					</tr>
					<tr>
						<td>85060502</td>
						<td>2 3 5</td>
						<td>20</td>
						<td>大</td>
						<td>双</td>
					</tr>
					<tr>
						<td>85060502</td>
						<td>2 3 5</td>
						<td>20</td>
						<td>大</td>
						<td>双</td>
					</tr>
					<tr>
						<td>85060502</td>
						<td>2 3 5</td>
						<td>20</td>
						<td>大</td>
						<td>双</td>
					</tr>
					<tr>
						<td>85060502</td>
						<td>2 3 5</td>
						<td>20</td>
						<td>大</td>
						<td>双</td>
					</tr>
					<tr>
						<td>85060502</td>
						<td>2 3 5</td>
						<td>20</td>
						<td>大</td>
						<td>双</td>
					</tr>
					<tr>
						<td>85060502</td>
						<td>2 3 5</td>
						<td>20</td>
						<td>大</td>
						<td>双</td>
					</tr>
					<tr>
						<td>85060502</td>
						<td>2 3 5</td>
						<td>20</td>
						<td>大</td>
						<td>双</td>
					</tr>
					<tr>
						<td>85060502</td>
						<td>2 3 5</td>
						<td>20</td>
						<td>大</td>
						<td>双</td>
					</tr>
					<tr>
						<td>85060502</td>
						<td>2 3 5</td>
						<td>20</td>
						<td>大</td>
						<td>双</td>
					</tr>
				</table>
			</div>
			<div class="beted" v-show="type === 1">
				投注记录区域
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:['type'],
		data:()=>{
			return {
				opened:0
			}
		},
		created(){
			setTimeout(()=>{
				this.opened = 1
			},10)
		},
		methods:{
			close(){
				this.opened = 0
				setTimeout(()=>{
					this.$parent.history = 0
				},200)
			},
		},
	}
</script>
<style lang="scss">
	.history{
		position: fixed;
		width:100%;
		height:100%;
		top:0;
		left: 0;
		z-index: 30;
		background: white;
		color:#999;
		transform: translateX(16rem);
		transition:.2s;
	}
	.history.opened{
		transform: translateX(0);
	}
	.header{
		position: relative;
		em{
			position: absolute;
			height: 100%;
			width: 2em;
			line-height: 2em;
			text-align:center;
			transform:translateY(.1em);
			&:before{
				content:'\e60a';
				font-family: 'iconfont';
			}
		}
		span{
			width: 50%;
			display: block;
			float: left;
			text-align: center;
			border-bottom: 2px solid white;
			font-size: .8em;
			padding:.5em 0;
			padding-top:.7em;
		}
		.curr{
			color:#ee3945;
			border-color: #ee3945;
		}
	}
	.title{
		background: url('/static/img/history-bg.png') no-repeat;
		background-size: 16rem;
		height:7.6rem;
	}
	.opened{
		table{
			table-layout: fixed;
			width: 100%;
			font-size:.7em;
			text-align: center;
			color:#000;
			tr:nth-child(1){
				border-bottom: 1px solid #d7d6d6;
			}
			tr:nth-child(1n+2){
				td:nth-child(1){
					border-right: 1px solid #d7d6d6;	
				}
			}
			th{
				font-weight: 400;
			}
			th,td{
				line-height: 1.8em;
			}
		}
	}
</style>