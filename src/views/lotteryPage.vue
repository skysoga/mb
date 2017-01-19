<template>
	<div @click = "closeBox" class="lotteryOutCon">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>
<style lang='scss' scoped>
	.lotteryOutCon{
		height: 100%;
		width: 100%;
	}
</style>
<script>
	import lt_ssc from '../json/lt_ssc.json'
	import lt_k3 from '../json/lt_k3.json'
	import lt_syx5 from '../json/lt_syx5.json'
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import {bus, BaseBet, ChaseAjax, easyClone, deleteCompress, Scheme, getBasketAmount, computeIssue, getSSCRebate, getK3Rebate,getRebate,DAY_TIME, HOUR_TIME, MINUTE_TIME, SECOND_TIME, GMT_DIF, PERBET} from '../js/kit'

	export default{
		beforeRouteEnter(to, from, next){
			//校验LotteryList， 和LotteryConfig-- 要阻塞，这个地方要改
			RootApp.GetInitData(['LotteryList','LotteryConfig'], state=>{
				var ltype, lcode
			  //从url上获取彩种type和彩种code
			  ;[,ltype, lcode] = to.fullPath.slice(1).split('/')
			  //校验下这个彩种存不存在，不存在就送回购彩大厅
		 		var table = {
					'SSC': '时时彩',
					'K3': '快3',
					'SYX5': '11选5'
				}
				var lotteryTypeList
				state.LotteryConfig.map(item=>{
					if(item.LotteryClassName === table[ltype]){
						lotteryTypeList = item.LotteryList
					}
				})

				if(lotteryTypeList.indexOf(lcode) === -1){
					layer.url('您所访问的彩种不存在，即将返回购彩大厅', '/index')
					return
				}

				var Difftime = localStorage.getItem('Difftime')
				if(Difftime === null){
					RootApp.getServerTime(next)//没获取Difftime就再获取一次
				}else{
					next()										//有就直接进页面
				}
			})
		},
		created(){
		  //从url上获取彩种type和彩种code
		  ;[,this.ltype, this.lcode] = this.$route.fullPath.slice(1).split('/')

			//这里获取一次服务器时间，用以校正
			RootApp.getServerTime()
			var pageConfig = {
				'SSC': lt_ssc,
				'SYX5': lt_syx5,
				'K3': lt_k3,
			}
			var awardSetter = {
  			'SSC':getSSCRebate,
  			'K3': getK3Rebate,
  			'SYX5': getRebate
  		}

			var wait4Results = 0, wait4BetRecord = false
			const lt = {
		    state:{
		      bet: {
					  betting_number: '',		//投注号码字符串
					  betting_count: 0,			//投注注数
					  betting_money: 0,			//投注金额
					  betting_model: 1,			//单位(1,0.1,0.01)
					  graduation_count:1,		//倍数
					  compress: ''					//压缩后的字符串
		      },
		      tmp: {},        //即时的投注号码情况
		      basket:[],      //号码篮
		      isChase: false, //是否追号
		      //追号配置
		      chaseConf:{
	      		before_issueNo: -1,
	      		before_eamings_cash: -1,
	      		after_eamings_cash: -1,
	      		before_earnings_rate: -1,
	      		after_earnings_rate: -1,
	      		isstop_afterwinning: true,
	      		buy_count: 1,                 //追多少期
	      		power:1												//每期多少倍(普通追号)
	      	},
	      	scheme:[],
		      mode:{
		        name: '',     //直选复式
		        mode: '',     //H11
		        group: '',    //五星
		        subGroup: '', //直选
		        tag: '',      //五星直选复式
		      },
		      //当前彩种的详情
		      lottery:{
		        LotteryIntro: '', //全天120期
		        LotteryName: '',  //重庆时时彩
		        LotteryType: '',  //SSC
		        LotteryCode: '',   //1000
		        VerifyEndTime:'',
		        VerifyIssue:''
		      },
		      Rebate:{},        //返点,根据type而不同
		      Odds:{},					//奖金,根据type而不同
		      award:'',					//当前彩种、当前玩法以元为单位的奖金
		      box:'',           //当前弹出框
		      config:{},        //在各种彩种页面,
		      LotteryPlan:[],		//当前彩种的彩种计划
		      LotteryResults:{},//各彩种开奖结果的缓存（包含不同彩种）
		      BetRecord:[],			//投注记录
		      PlanLen:0,				//当前彩种的彩种计划长度
		      IssueNo:0,				//期号索引:从0开始，到PlanLen-1

		      //渲染用
		      Todaystr:'',
		      TimeBar:'00:00:00',      //倒计时内容
		      //counter或flag
		      displayResults: false,	//false显示等待开奖的动画， true显示开奖结果
		      perbet: PERBET

		    },
		    getters: {
		    },
		    mutations:{
		    	lt_setPerbet:(state, price)=>{state.perbet = price},
		      //变更弹出框
		      lt_changeBox:(state, boxName)=>{state.box = boxName},
		      //变更玩法
		      lt_changeMode:(state, mode)=>{
		      	var type = state.lottery.LotteryType   //彩种类型 SSC、K3
		      			,Odds = state.Odds[type] || []

		      	bus.$emit('clearNoteStr')   //清空文本框文字
		      	this.$store.commit('lt_clearBet')
		      	state.mode = mode
		      	//更改玩法时，对应玩法的奖金也跟着变
		      	state.award = awardSetter[type](mode.mode, Odds)
		      	//更换玩法，bet清空
		      },
		      //变更彩种
		      lt_changeLottery:(state, code)=>{
		        state.lottery = this.$store.state.LotteryList[code]
		        router.push(code)		//更改路由
		      },
		      //变更配置（进入各具体彩种页时，设置）
		      lt_initConfig:(state)=>{state.config = pageConfig[state.lottery.LotteryType]},
		      lt_updateDate:(state)=>{
		        var nowSerTime = new Date().getTime()-this.$store.state.Difftime;   //当前的服务器时间
		        state.Todaystr = new Date(nowSerTime).format("yyyyMMdd");     			//今天
		      },
		      //计算当前期号
		      lt_computeIssueNo:(state, LotteryPlan)=>{
	      		state.LotteryPlan = LotteryPlan
	      		state.PlanLen = LotteryPlan.length
		        var _timeE=[]     //EndTime的暂存数组
				        ,_timeS = []	//StartTime的暂存数组
				        ,EndTime			//某期EndTime
				        ,StartTime		//某期StartTime
				        , _SerTime		//除去日期的服务器时间

		        //除去日期的服务器时间
		        _SerTime = (new Date().getTime()- this.$store.state.Difftime - GMT_DIF) % DAY_TIME
		        var lastIssue_E = LotteryPlan[LotteryPlan.length - 1].EndTime.split(':')
		        		,lastIssueEnd = lastIssue_E[0]*3600000 + lastIssue_E[1]*60000 + lastIssue_E[2]*1000
		        		,firstIssue_E = LotteryPlan[0].EndTime.split(':')
		        		,firstIssueEnd = firstIssue_E[0]*3600000 + firstIssue_E[1]*60000 + firstIssue_E[2]*1000

		        if((_SerTime > lastIssueEnd)&&(lastIssueEnd > firstIssueEnd)){
		        	state.IssueNo = LotteryPlan.length
		        }else{
		        	state.IssueNo = 0
		        }

		        // console.log(_SerTime, lastIssueEnd, firstIssueEnd)

		        for (var planLen = LotteryPlan.length, i = LotteryPlan.length - 1; i >= 0; i--) {
		          _timeE = LotteryPlan[i].EndTime.split(':');
		          EndTime = _timeE[0]*3600000 + _timeE[1]*60000 + _timeE[2]*1000;			//某期结束时间
		          Vue.set(LotteryPlan[i],'End', EndTime)

		          _timeS = LotteryPlan[i].StartTime.split(':');
		          StartTime = _timeS[0]*3600000 + _timeS[1]*60000 + _timeS[2]*1000; //某期开始时间
		          Vue.set(LotteryPlan[i],'Start', StartTime)

							if ((_SerTime < EndTime) && (_SerTime >= StartTime)) {
		          	//在某期的区间中
		            state.IssueNo = i;
		          }else if(StartTime>EndTime){
		          	//某期跨天了
		          	if((_SerTime<EndTime)||(_SerTime>=StartTime)){
		          		state.IssueNo = i;
		          	}
		          }
		        }

		        this.$store.commit('lt_updateIssue')
	      	},
	      	//更新期号时
	      	lt_updateIssue:(state)=>{
	      		var code = state.lottery.LotteryCode 	//当前彩种号
  		      Vue.set(state, 'NowIssue', computeIssue(code, state.IssueNo))				//当前期 (可以下注的这一期)
			      Vue.set(state, 'OldIssue', computeIssue(code, state.IssueNo - 1)) 	//上一期
			      state.displayResults = false	//进入等待开奖动画
			      state.basket.forEach(bet=>{
			      	bet.betting_issuseNo = computeIssue(code, state.IssueNo)
			      })
	      	},
	      	lt_setLotteryResult:(state, {code, results})=>{							//设置某一彩种的开奖结果
	      		Vue.set(state.LotteryResults, code, results)
	      	},
	      	lt_stopSell:(state)=>{
	      		this.$store.commit('lt_updateTimeBar', '暂停销售')		//暂停销售
	      		// Vue.set(state, 'NowIssue', '00000000000')
	      		// Vue.set(state, 'OldIssue', '00000000000')
	      	},
	      	lt_setIssueNo:(state, IssueNo)=>{state.IssueNo = IssueNo},	//设置当前期号
	      	lt_displayResults:(state, bool)=>{													//展示开奖结果或开奖动画
	      		state.displayResults = bool
	      	},
	      	lt_updateTimeBar:(state, text)=>{state.TimeBar = text;},			//倒计时的内容
	      	lt_setBetRecord:(state, BetRecord)=>{state.BetRecord =BetRecord;},	//投注记录
	      	lt_setRebate:(state, {rebate, LotteryType})=>{
	      		var mode = state.mode.mode
	      		state.award = awardSetter[LotteryType](mode, rebate.Odds)
	      		Vue.set(state.Rebate, LotteryType, rebate.Rebate)
	      		Vue.set(state.Odds, LotteryType, rebate.Odds)
	      	},
	      	//以上为期号计算相关，以下为投注相关

	      	//即时投注号码的更改
	      	lt_updateTmp:(state, {alias, arr})=>{
	      		Vue.set(state.tmp, alias, arr)
	      	},
	      	//设置投注字符串
	      	lt_setBetStr:(state, betStr)=>{
	      		state.bet.betting_number = betStr
	      	},
	      	//设置投注数，还有计算单注金额
	      	lt_setBetCount:(state, betCount)=>{
	      		state.bet.betting_count = betCount
	      		this.$store.commit('lt_setMoney')
	      	},
	      	//设置倍数
	      	lt_setPower:(state, power)=>{
	      		state.bet.graduation_count = power
	      		this.$store.commit('lt_setMoney')
	      	},
	      	//设置元角分
	      	lt_setUnit:(state, unit)=>{
	      		state.bet.betting_model = unit
	      		this.$store.commit('lt_setMoney')
	      	},
	      	lt_setMoney:(state)=>{
						state.bet.betting_money = +(state.perbet * state.bet.betting_count * state.bet.graduation_count * state.bet.betting_model).toFixed(2)
	      	},
	      	//添加bet到plan中
	      	lt_addBet:(state)=>{
	      		var baseBet = new BaseBet(this.$store.state)
	      		this.$store.commit('lt_addToBasket', baseBet)
	      		this.$store.commit('lt_clearBet')
	      	},
	      	lt_addRandomBet:(state, randomBet)=>{
	      		this.$store.commit('lt_addToBasket', randomBet)
	      	},
	      	//将注单push到basket里
	      	lt_addToBasket:(state, bet)=>{
	      		//不清追号配置
	      		// state.chaseConf.buy_count = 1
	      		// state.chaseConf.power = 1

	      		//去掉重复的，合并加倍
	      		var equalIndex, isEqual = false
	      		state.basket.forEach((_bet, index)=>{
	      			var allPropEqual = true
	      			for(var prop in _bet){
	      				if(typeof _bet[prop] === 'string' || typeof _bet[prop] === 'number'  && prop !== 'graduation_count' && prop !== 'betting_money'){
		      				if(_bet[prop] !== bet[prop]){
		      					allPropEqual = false
		      				}
	      				}
	      			}
	      			if(allPropEqual){
	      				isEqual = true
		      			equalIndex = index
	      				return
	      			}
	      		})

	      		if(state.basket.length && isEqual){
	      			var prevPower = state.basket[equalIndex].graduation_count
	      			state.basket[equalIndex].setPower(prevPower + bet.graduation_count, this.$store.state)
	      		}else{
		      		state.basket.push(bet)
	      		}

	      	},
	      	//清空bet
	      	lt_clearBet:(state)=>{
	      		state.bet.betting_number = ''
	      		state.bet.betting_count = 0
	      		state.bet.betting_money = 0
	      		// state.bet.graduation_count = 1
	      		//这里倍数不清1，看看后面需不需要
	      		state.bet.compress = ''

      			for(var item in state.tmp){
		      		state.tmp[item] = []
		      	}
		      	bus.$emit('clearNoteStr')
		      	this.$store.dispatch('lt_ordinaryChase')
	      	},
	      	lt_clearBasket:(state)=>{
	      		state.basket = [];
	      		this.$store.commit('lt_setScheme', [])
	      	},
	      	lt_deleteBet:(state, index)=>{
	      		state.basket.splice(index,1)
	      		this.$store.dispatch('lt_ordinaryChase')
	      	},
	      	lt_setBetCompress:(state, str)=>{state.bet.compress = str},
	      	lt_isStopAfterWin:(state, bool)=>{state.chaseConf.isstop_afterwinning = bool},
	      	lt_setChaseIssue:(state, chaseIssue)=>{state.chaseConf.buy_count = chaseIssue},
	      	lt_setChasePower:(state, chasePower)=>{state.chaseConf.power = chasePower},
	      	lt_setScheme:(state, scheme)=>{state.scheme = scheme},
	      	lt_basketPowerTo1:(state)=>{
	      		state.basket.forEach(bet=>{
	      			bet.graduation_count = 1
	      			bet.betting_money = +(state.perbet * bet.betting_count * bet.graduation_count * bet.betting_model).toFixed(2)
	      		})
	      	},
	      	lt_setIsChase:(state, bool)=>{
	      		state.isChase = bool
	      		if(bool){
	      			//追号了，选号区的倍数就清了
	      			state.bet.graduation_count = 1
	      			this.$store.commit('lt_basketPowerTo1')
	      			this.$store.dispatch('lt_ordinaryChase')
	      		}
	      	}
		    },

		    actions: {
		    	//变更彩种的异步操作
		    	lt_updateLottery:({state, rootState, commit, dispatch}, code)=>{
		    		//进入每个彩种，先把开奖结果初始化，如果不存在的话
		      	if(!state.LotteryResults[code]){
			      	commit({
			      		type:'lt_setLotteryResult',
			      		code,
			      		results: []
			      	})
		      	}
		      	commit('lt_changeLottery', code)	//变更彩种
		      	dispatch('lt_getResults', code)		//获得开奖结果
		      	wait4Results = 0
		      	wait4BetRecord = false
		      	clearTimeout(this.timer1)
		      	clearTimeout(this.timer2)

		      	dispatch('lt_updatePlan', code)		//更新计划
		      },
		      //action-获取开奖计划
		      lt_updatePlan:({state, rootState, commit, dispatch}, code)=>{
		      	//获取开奖计划，这个以后如果组件内部有用，就单独拉一个action
		      	function getPlan(code){
							_fetch({Action:'GetLotteryPlan', Qort:code}).then((json)=>{
								if(json.Code === 1){
									var plan = json.Data
			            localStorage.setItem("lotteryPlan" + code, JSON.stringify(plan));
			            //如果code和当前的code不一样，说明在异步获取完后，用户已经切换页面了，就直接结束
			            if(code === state.lottery.LotteryCode){
			            	commit('lt_computeIssueNo', plan)
			            }
			          }else{
			            layer.msgWarn(json.StrCode);
			          }
	      			})
		      	}

		      	if(code === '1008' || code === '1407'){
		      		//如果是大发系列的，自己计算计划
		      		var LotteryPlan = []
		      		for (var i = 0; i < 1440; i++) {
		      			var el = {}
		      			el.IssueNo = ('000'+(i+1)).slice(-4),
		      			el.StartTime = [('0'+Math.floor((i-1)/60)).slice(-2),('0'+Math.floor((i-1)%60)).slice(-2),'59'].join(':'),
		      			el.EndTime = [('0'+Math.floor(i/60)).slice(-2),('0'+Math.floor(i%60)).slice(-2),'59'].join(':')
		      			if(i===0){
		      				//如果是第一期，那么防止其为负
		      				el.StartTime = '23:59:59'
		      			}
		      			LotteryPlan.push(el)
		      		}
		      		commit('lt_computeIssueNo', LotteryPlan)
		      	}else{
		      		//不是大发系列的
		      		var LotteryPlan = localStorage.getItem("lotteryPlan"+ code)
		      		LotteryPlan = LotteryPlan&&JSON.parse(LotteryPlan)

		      		if(LotteryPlan){
		      			//localStorage中有计划，进行计划的校验，确保是最新的
		      			var refer = rootState.LotteryList[code]
		      					,_EndTime1 = LotteryPlan[refer.VerifyIssue*1-1].EndTime
		      					,_EndTime2 = refer.VerifyEndTime.split(' ')[1]

		      			//因为LotteryList是会变化的，因此用LotteryList和LotteryPlan的比对，来确认需不需要更新
		      			if(refer && _EndTime1 !== _EndTime2){
		      				//校验没通过，就删除旧计划，重新拉一遍计划
		              localStorage.removeItem("lotteryPlan"+code);
		              getPlan(code)
		              console.log("需要矫正");
		            }else{
		            	//校验通过，就计算当前期号
		            	commit('lt_computeIssueNo', LotteryPlan)
		            }
		      		}else{
		      			//localStorage中没有计划,重新获取计划
		      			getPlan(code)
		      		}
		      	}
		      },
		      //action-获得开奖结果
		      lt_getResults:({state, rootState, commit, dispatch}, code)=>{
		      	// var Results = []
			      // 		,IssueNo = Results.length?Results[0].IssueNo:0;

		      	_fetch({
		          Action: "GetLotteryOpen",
		          LotteryCode: code,
		          IssueNo: 0,
		          // IssueNo: IssueNo,
		          DataNum: 10
		        }).then((json)=>{
		        	if(json.Code === 1) {
		        		if (10===json.BackData.length) {
		        			commit({
		        				type: 'lt_setLotteryResult',
		        				code,
		        				results: json.BackData
		        			})
		        		}

				        /*var len = json.BackData.length
				        		,bData = json.BackData

		            if(len){
		              for(var i = len - 1; i >= 0; i--) {
		              	// (bData[i].IssueNo > IssueNo)&&
		              	Results.unshift(bData[i])
		              }

		              Results.length > 10 && (Results.length = 10)

		              commit({
		              	type: 'lt_setLotteryResult',
		              	code,
		              	results: Results
		              })
		            }*/
		          }
		        })
		      },
		      //refresh
		      lt_refresh:({state, rootState, commit, dispatch})=>{
		      	function computeCountdown(issueNo, _SerTime){
		      		var _issue = state.LotteryPlan[state.IssueNo % state.PlanLen]
		      				,isCrossDay = (_issue.Start > _issue.End) && (_SerTime > _issue.Start)	//本期跨天,且当前时间大于End
		      				,isOutOfIssue = state.IssueNo === state.PlanLen     									//如果现在不在任何期内
		      				,needAddOneDay = isCrossDay || isOutOfIssue

		      		var Countdown = state.LotteryPlan[state.IssueNo % state.PlanLen].End
			                        +needAddOneDay * DAY_TIME
			                        -_SerTime;

			        // console.log(_issue.StartTime,_issue.EndTime,_SerTime,_issue.Start,_issue.End, issueNo,isCrossDay,isOutOfIssue, needAddOneDay, Countdown)
			        return Countdown
		      	}

		      	var isStop = rootState.LotteryList[this.lcode].IsStop
		      	if(isStop === '1'){
		      		commit('lt_stopSell')		//暂停销售
		      		return
		      	}

		      	var _SerTime = (new Date().getTime()- this.$store.state.Difftime - GMT_DIF) % DAY_TIME
		      			,IssueNo = state.IssueNo
		      	if(_SerTime<1000) {
			        // console.log("新的一天");
			        commit('lt_updateDate')
			        commit('lt_setIssueNo', state.IssueNo%state.PlanLen)
			      }

			      if(!state.PlanLen) return
			      var Countdown = computeCountdown(state.IssueNo, _SerTime)
		        Countdown %= DAY_TIME;
		        //如果倒计时小于0，则一直更新到最新期
		        //用循环是因为有可能长时间不相应，需要一次性校正到位
		        var crossCount = 0
		        if(Countdown<=0){
		          while(Countdown<=0){
		          	crossCount++
		          	var lastIssueEnd = state.LotteryPlan[state.PlanLen - 1].End
		          			,firstIssueStart = state.LotteryPlan[0].Start

		          	//等于： 首尾相接的期号。大于：最后一期在第二天。 余去，则不会进入out of issue
		          	if(firstIssueStart >= lastIssueEnd){
		          		commit('lt_setIssueNo', ++IssueNo%state.PlanLen)
		          	}else{
		          		commit('lt_setIssueNo', ++IssueNo)
		          	}

					      Countdown = computeCountdown(state.IssueNo, _SerTime)
		          }

		          if(crossCount > 1){
		          	commit('lt_updateDate')
				        commit('lt_setIssueNo', state.IssueNo%state.PlanLen)
		          }

		          //期号更新
		          commit('lt_updateIssue')
		          var _year = new Date(new Date().getTime()- this.$store.state.Difftime - GMT_DIF).getFullYear()	//本年
		          layer.open({
		            shadeClose: false,
		            className: "layerConfirm layerCenter",
		            content: `${state.OldIssue.replace(_year,"")}期已截止</br>当前期号<span style="color:red">${state.NowIssue.replace(_year,"")}</span></br>投注时请注意期号`,
		            title: "温馨提示",
		            btn: ["确定"]
		          });
		        }

		        Countdown = Math.floor(Countdown/1000);   //转成以秒为单位
		        // console.log(Countdown)
		        if(Countdown>600){
			        //如果Countdown大于10分钟，则进入预售
		        	commit('lt_updateTimeBar', '预售中')
		        }else{
		        	//倒计时渲染
		          var hh=Math.floor(Countdown/3600);
		          var MM=Math.floor(Countdown%3600/60);
		          var ss=Math.floor(Countdown%60);
		          hh=hh>9?hh:('0'+hh);
		          MM=MM>9?MM:('0'+MM);
		          ss=ss>9?ss:('0'+ss);
		          commit('lt_updateTimeBar', hh+':'+MM+':'+ss)
		        }
		        var Results = state.LotteryResults[state.lottery.LotteryCode]
			        	,len = Results?Results.length:0;

			      if(!wait4BetRecord){
			      	//如果在获取我的投注/我的追号,则不进入
      	      if(!len || Results[0].IssueNo*1 < state.OldIssue*1) {
      	      	//没有结果 或者 有结果且上一期还没开奖，就以一定频率轮询开奖结果
      	      	// wait4Results++
      	      	wait4Results = 60 - Countdown%60
				        var interval
				        switch(state.lottery.LotteryCode){
				          case "1407":
				          case "1008":
				            interval=5
				            break
				          default:
				            interval=30
				        }
				        if (wait4Results>5 && wait4Results%interval===0) {
				        	dispatch('lt_getResults', state.lottery.LotteryCode)		//获取开奖结果
				        }
				      }else if(Results[0].IssueNo*1 >= state.NowIssue*1){
				      	// console.log(state.OldIssue);
				      	commit('lt_stopSell')		//暂停销售
				      }else{
				      	commit('lt_displayResults', true)
				      	//开奖
				      	if(wait4Results){
					      	wait4BetRecord = true
	    	          this.timer1 = setTimeout(()=>{
	    	          	// console.log('6s')
	    	          	dispatch('lt_updateBetRecord')			//获取我的投注
	    	          }, 6000)

	    	          this.timer2 = setTimeout(()=>{
	    	          	// console.log('12s')
	    	          	dispatch('lt_updateBetRecord')			//获取我的投注
	    	          	wait4Results = 0
	    	          	wait4BetRecord = false
	    	          }, 12000)
				      	}
				      }
			      }
		      },
	      	//获取我的投注
		      lt_updateBetRecord:({state, rootState, commit, dispatch})=>{
		      	// _fetch({Action: 'GetBetting'}).then((json)=>{
		      	// 	if(json.Code === 1){
		      	// 		var betting = json.Data
		      	// 		commit('lt_setBetRecord', betting)
		      	// 	}
		      	// })
		      },
		      //获得返点
		      lt_getRebate:({state, rootState, commit, dispatch}, notUseLocal)=>{
		      	var type = state.lottery.LotteryType
		      	var _rebate = rootState['Rebate' + type]
		      	if(notUseLocal){
		      		_rebate = null
		      	}

		      	if(!_rebate){
			      	_fetch({
								Action: 'GetBetRebate',
								LotteryType: type
							}).then((json)=>{
								if(json.Code === 1){
									commit('SaveInitData', {['Rebate' + type]:json.BackData})
									commit({
				      			type:'lt_setRebate',
				      			rebate: json.BackData,
				      			LotteryType: type
				      		})
								}
							})
						}else{
							commit({
		      			type:'lt_setRebate',
		      			rebate: _rebate,
		      			LotteryType: type
		      		})
						}
		      },
		      //投注
		      lt_confirmBet:({state, rootState, commit, dispatch})=>{
		      	var _basket = deleteCompress(state.basket)
		      	layer.msgWait('正在投注')
		      	_fetch({
		      		'Action':'AddBetting',
		      		'data': {BettingData:_basket}
		      	}).then((json)=>{
		      		if(json.Code === 1){
		      			layer.msg(json.StrCode)
		      			commit('lt_clearBet')
		      			commit('lt_clearBasket')
		      			commit('lt_changeBox', '')
		      			//隔3s获取我的投注
		      			this.timer3 = setTimeout(()=>{
		      				dispatch('lt_updateBetRecord')
		      			}, 3000)

	              layer.confirm(`<span style = "color:red">投注成功</span>，您可以在我的账户查看注单详情`,['继续投注','查看注单'], ()=>{},()=>{this.$router.push('/userCenter')})
		      		}else if(json.Code === -9){
		      			//清除rebate
		      			layer.alert(json.StrCode)
				      	var type = state.lottery.LotteryType
				      	// localStorage.removeItem('Rebate' + type)
				      	this.$store.dispatch('lt_getRebate', true)
		      		}else{
		      			layer.msgWarn(json.StrCode)
		      		}
		      	})
		      },
		      //普通追号
	      	lt_ordinaryChase:({state, rootState, commit, dispatch})=>{
	      		var basketTotal = getBasketAmount()[1],
	      				scheme = [],
	      				code = state.lottery.Lotterycode,
	      				issueStr, power, money, issueNo

	      		for(var i = 0, len = state.chaseConf.buy_count; i < len;i++){
	      			issueNo = state.IssueNo + i
							issueStr = computeIssue(code, issueNo)
							power = state.chaseConf.power
							money = (basketTotal * state.chaseConf.power).toFixed(4) * 1
							scheme.push(new Scheme(issueStr, power, money))
	      		}

						commit('lt_setScheme', scheme)
	      	},
	      	lt_chase:({state, rootState, commit, dispatch})=>{
	      		layer.msgWait('正在投注')
	      		_fetch({
	      			Action: 'AddChaseBetting',
							data: new ChaseAjax(rootState)
	      		}).then((json)=>{
	      			if(json.Code === 1){

								layer.msg(json.StrCode)
								commit('lt_clearBet')						//清空bet
		      			commit('lt_clearBasket')				//清空basket
		      			commit('lt_changeBox', '')			//将所有弹出框关闭
		      			commit('lt_setScheme', [])			//清空scheme
		      			// commit('lt_setChasePower', 1)		//清空追号配置
					      // commit('lt_setChaseIssue', 1)
					      commit('lt_setIsChase', false)  //追号成功后，变成普通投注

								//隔3s获取我的投注
		      			this.timer4 = setTimeout(()=>{
		      				dispatch('lt_updateBetRecord')
		      			}, 3000)
	              layer.confirm(`<span style = "color:red">投注成功</span>，您可以在我的账户查看注单详情`,['继续投注','查看注单'], ()=>{},()=>{this.$router.push('/userCenter')})
							}else if(json.Code === -9){
		      			//清除rebate
		      			layer.alert(json.StrCode)
				      	var type = state.lottery.LotteryType
				      	this.$store.dispatch('lt_getRebate', true)
							}else{
								layer.msgWarn(json.StrCode);
							}
	      		})
	      	}
		    }
		  }

			//注册彩种模块 --lt
			this.$store.state.lt || this.$store.registerModule('lt', lt)
			//生成昨天今天明天字符串
			this.$store.commit('lt_updateDate')
			//切换彩种
			this.$store.dispatch('lt_updateLottery', this.lcode)
			//设置页面配置-SSC、K3
		  this.$store.commit('lt_initConfig')
		  //设置默认的玩法
		  this.setDefaultMode()
			//获取我的投注
			this.$store.dispatch('lt_updateBetRecord')
			//获取返点
			this.$store.dispatch('lt_getRebate')
			//每隔1s调用一次refresh
			this.baseLoop = setInterval(()=>{
				this.$store.dispatch('lt_refresh')
			},1000)
		},
		data(){
			return {
				ltype:'',  //SSC、K3、11X5
				lcode:'',  //彩种code
				timer1:null,
				timer2:null,
				timer3:null,
				timer4:null,
				baseLoop:null
			}
		},
		methods:{
			//点击页面其他部分关闭所有盒子
			closeBox(){
				store.commit('lt_changeBox', '')
			},
			setDefaultMode(){
			  var defaultMode = {
					'SSC':['五星', '直选'],
					'SYX5':['选一', '前三一码不定位']
				}

				if(this.ltype !== 'K3'){
					var _group, _subGroup
				  _group = defaultMode[this.ltype][0]			//默认的玩法群
				  _subGroup = defaultMode[this.ltype][1]		//默认的玩法组
	  			store.commit('lt_changeMode', state.lt.config[_group][_subGroup][0])
				}else{
					store.commit('lt_changeMode', state.lt.config[0])
				}
			}
		},
		watch:{
			$route(val){
			  ;[,this.ltype, this.lcode] = this.$route.fullPath.slice(1).split('/')
		    store.commit('lt_setPerbet', PERBET)
		    store.commit('lt_clearBet')
		    store.commit('lt_clearBasket')
		    store.commit('lt_setScheme', [])
		    store.commit('lt_setChasePower', 1)		//清空追号配置
				store.commit('lt_setChaseIssue', 1)
			}
		},
	  beforeRouteLeave:(to, from, next)=>{
	    //离开页面前将每注金额重设为 PERBET (2元)
	    store.commit('lt_setPower', 1)
	    store.commit('lt_setPerbet', PERBET)
	    store.commit('lt_setUnit', 1)
	    store.commit('lt_clearBet')
	    store.commit('lt_clearBasket')
	    store.commit('lt_setScheme', [])
	    store.commit('lt_setChasePower', 1)		//清空追号配置
			store.commit('lt_setChaseIssue', 1)
	    next()
	  },
		beforeDestroy(){
			clearTimeout(this.timer1)
			clearTimeout(this.timer2)
			clearTimeout(this.timer3)
			clearTimeout(this.timer4)
			clearInterval(this.baseLoop)
		},

	}
</script>