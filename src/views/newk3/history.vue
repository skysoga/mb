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
					<div class="issueNo">{{results[0].IssueNo}}期</div>
					<div class="sum">和值 {{results[0].sum}}</div>
					<div class="open">号码 {{results[0].LotteryOpen[0]}} {{results[0].LotteryOpen[1]}} {{results[0].LotteryOpen[2]}}</div>
					<div class="other">{{results[0].bigOrSmall}}，{{results[0].singleOrDouble}}</div>
					<div class="imgResult">
						<span :class="'dice'+results[0].LotteryOpen[0]" style="background: url('/static/img/history-dice.png')"></span>
						<span :class="'dice'+results[0].LotteryOpen[1]" style="background: url('/static/img/history-dice.png')"></span>
						<span :class="'dice'+results[0].LotteryOpen[2]" style="background: url('/static/img/history-dice.png')"></span>
					</div>
				</div>
				<table>
					<tr>
						<th width="30%">期号</th>
						<th width="25%">开奖号码</th>
						<th width="15%">和值</th>
						<th width="15%">大小</th>
						<th width="15%">单双</th>
					</tr>
					<tr v-for="d in results">
						<td>{{d.IssueNo}}</td>
						<td>{{d.LotteryOpen[0] + ' ' + d.LotteryOpen[1] + ' ' + d.LotteryOpen[2]}}</td>
						<td>{{d.sum}}</td>
						<td>{{d.bigOrSmall}}</td>
						<td>{{d.singleOrDouble}}</td>
					</tr>
				</table>
			</div>
			<div class="beted" v-show="type === 1">
				<div class="touchScroll">
					<div class="nodata" v-if="betData === null">正在加载...</div>
					<div class="nodata" v-if="betData !== null && betData.length<=0">暂无数据</div>
			    <div v-for="d in betData">
			        <a class="active">
			            <div>
			            	<p>{{d.lotteryName}}<span>￥{{d.normal_money}}</span></p><span>{{d.issueNo}} 期</span>
			            </div>
                  <div class="fr" v-if="Number(d.openState)">
                  	<strong class="InMoney fr">+{{d.openState}}</strong>
                  	<span class="InMoney fr">已中奖</span>
                  </div>
                  <strong class="" v-else>{{d.openState}}</strong>
              </a>
			        <div class="hr1px"></div>
			    </div>
			    <div class="msg noMore">更多投注记录请到 我的账户>投注记录 查看</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
  import {mapState} from 'vuex'
	export default{
		props:['type'],
    computed:mapState({
	    results(){
	      var pastOpen = state.lt.LotteryResults[this.$parent.lcode].map(item=>{
	        var el = {}
	        el.IssueNo = item.IssueNo.length < 7 ? item.IssueNo :item.IssueNo.slice(2)        //把年份砍掉
	        var results = item.LotteryOpen.split(',')
	        el.LotteryOpen = results
	        el.sum = results.reduce((a,b)=>(+a)+(+b))
	        el.bigOrSmall = el.sum > 10 ? '大' : '小'
	        el.singleOrDouble = el.sum % 2 === 1 ? '单' : '双'
	        return el
	      })
	      return pastOpen
	    },
    }),
		data:()=>{
			return {
				opened:0,
				betData:null,
				loaedBetting:0,
			}
		},
		created(){
			setTimeout(()=>{
				this.opened = 1
			},10)
			if (this.type === 1) {
				this.getBet()
			}else{
				if(this.results.length < 10){
					this.$parent.getResults()
					console.log('开奖结果数量不够，需要从接口获取')
				}
			}
		},
		methods:{
			close(){
				this.opened = 0
				setTimeout(()=>{
					this.$parent.history = 0
				},200)
			},
			getBet(){
				_fetch({
					Action:'GetBetting',
					SourceName:'PC'
				})
				.then(d=>{
					if (d.Code === 1) {
						this.betData = d.Data
						this.loaedBetting = 1
					}else{
						layer.msgWarn(d.StrCode)
					}
				})
			}
		},
		watch:{
			'$parent.history'(n){
				if (n === 1 && !this.loaedBetting) {
					this.getBet()
				}
			},
			'results'(n,o){
				if (o.length === 0) {
					return
				}
				try{
					if (n[0].IssueNo -1 !== o[0].IssueNo*1) {
						this.$parent.getResults()
						console.log('校验错误需要重新获取开奖列表')
					}
				}catch(e){

				}
			}
		},
	}
</script>
<style lang="scss" scoped>
@import '../../scss/detailList.scss';
.nodata{
	text-align: center;
	font-size:.7em;
	margin:3em 0;
}
.beted{
	border-top:1px solid #d7d6d6;
}
.touchScroll{
	position: inherit;
	height: inherit !important;
}
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
		color:white;
		font-size:.6em;
		position: relative;
		>div{
			position: absolute;
		}
		.issueNo{
			top:1.6rem;
			left:.9rem;
		}
		.sum{
			top:3.3rem;
			left:.94rem;
		}
		.open{
			top:1.6rem;
			right:1rem;
		}
		.other{
			top:3.3rem;
			right:1rem;
		}
	}
	.imgResult{
		position: relative;
		width:3.6rem;
		height: 6rem;
		margin-left: 6.2rem;
		span{
			display: block;
			height: 1.6rem;
			width: 1.6rem;
			background-size: 9.6rem !important;
			background-repeat: no-repeat !important;
			position:absolute;
		}
		span:nth-child(1){
			left:1rem;
			top:1.6rem;
		}
		span:nth-child(2){
			top:3rem;
		}
		span:nth-child(3){
			top:3rem;
			left:2rem;
		}
	}
	.dice2{
		background-position: -1.6rem 0 !important;
	}
	.dice3{
		background-position: -3.2rem 0 !important;
	}
	.dice4{
		background-position: -4.8rem 0 !important;
	}
	.dice5{
		background-position: -6.4rem 0 !important;
	}
	.dice6{
		background-position: -8rem 0 !important;
	}
	.opened{
		table{
			table-layout: fixed;
			width: 100%;
			font-size:.7em;
			text-align: center;
			color:#000;
			tr:nth-child(1n+2){
				td:nth-child(1){
					position: relative;
					&:before,&:after{
						position: absolute;
						content:'';
					}
					&:after{
						right:0;
						top:0;
						width:1px;
						height:100%;
				    background-image: -webkit-linear-gradient(0deg, #d0d0d0, #d0d0d0 50%, transparent 50%);
					}
					&:before{
						right:-.33em;
						top:.8em;
						width: .7em;
						height:1px;
						background-image: -webkit-linear-gradient(90deg, #d0d0d0, #d0d0d0 50%, transparent 50%);
					}
				}
			}
			th{
				font-weight: 400;
				position: relative;
				&:after{
					content:'';
					display: block;
					height:1px;
					width:100%;
			    background-image: -webkit-linear-gradient(90deg, #d0d0d0, #d0d0d0 50%, transparent 50%);
				}
			}
			th,td{
				line-height: 1.8em;
			}
		}
	}
</style>