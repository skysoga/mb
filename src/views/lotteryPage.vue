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
	}
</style>
<script>
	import lt_ssc from '../json/lt_ssc.json'
	import lt_k3 from '../json/lt_k3.json'
	import Vue from 'vue'
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import {DAY_TIME, HOUR_TIME, MINUTE_TIME, SECOND_TIME, GMT_DIF, PERBET} from '../JSconfig'
	import {bus, BaseBet, ChaseAjax, easyClone, deleteCompress, Scheme, getBasketAmount, computeIssue, getSSCRebate, getK3Rebate} from '../js/kit'

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
					'K3': '快3'
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
			//留着11选5测试数据
			const lt_11x5 = {
				'选一':{
					'前三一码不定位':[
						{
							name:'复式',
							mode:'A11',
							tag:'前三一码不定位',
							group:'选一',
							subGroup:'前三一码不定位'
						}
					],
					'定位胆':[
						{
							name:'复式',
							mode:'A21',
							tag:'定位胆',
							group:'选一',
							subGroup:'定位胆'
						}
					],
					'任选一中一':[
						{
							name:'复式',
							mode:'A31',
							tag:'任选一中一复式',
							group:'选一',
							subGroup:'任选一中一'
						},
						{
							name:'单式',
							mode:'A32',
							tag:'任选一中一单式',
							group:'选一',
							subGroup:'任选一中一'
						}
					]
				},
				'选二':{
					'前二直选':[
						{
							name:'复式',
							mode:'B11',
							tag:'前二直选复式',
							group:'选二',
							subGroup:'前二直选'
						},
						{
							name:'单式',
							mode:'B12',
							tag:'前二直选单式',
							group:'选二',
							subGroup:'前二直选'
						}
					],
					'前二组选':[
						{
							name:'复式',
							mode:'B21',
							tag:'前二组选复式',
							group:'选二',
							subGroup:'前二组选'
						},
						{
							name:'单式',
							mode:'B22',
							tag:'前二组选单式',
							group:'选二',
							subGroup:'前二组选'
						},
						{
							name:'胆拖',
							mode:'B23',
							tag:'前二组选胆拖',
							group:'选二',
							subGroup:'前二组选'
						}
					],
					'任选二中二':[
						{
							name:'复式',
							mode:'B31',
							tag:'任选二中二复式',
							group:'选二',
							subGroup:'任选二中二'
						},
						{
							name:'单式',
							mode:'B32',
							tag:'任选二中二单式',
							group:'选二',
							subGroup:'任选二中二'
						},
						{
							name:'胆拖',
							mode:'B33',
							tag:'任选二中二胆拖',
							group:'选二',
							subGroup:'任选二中二'
						}
					]
				}
			}

			var pageConfig = {
				'SSC': lt_ssc,
				'11X5': lt_11x5,
				'K3': lt_k3,
			}
			var awardSetter = {
  			'SSC':getSSCRebate,
  			'K3': getK3Rebate
  		}

			var wait4Results = 0
					,wait4BetRecord = false


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
		      Tomorrowstr:'',
		      Yestodaystr:'',
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
		      	store.commit('lt_clearBet')
		      	state.mode = mode
		      	// console.log(mode)
		      	//更改玩法时，对应玩法的奖金也跟着变
		      	state.award = awardSetter[type](mode.mode, Odds)
		      	//更换玩法，bet清空
		      },
		      //变更彩种
		      lt_changeLottery:(state, code)=>{
		        state.lottery = store.state.LotteryList[code]
		        RootApp.$router.push(code)		//更改路由
		      },
		      //变更配置（进入各具体彩种页时，设置）
		      lt_initConfig:(state, config)=>{state.config = pageConfig[state.lottery.LotteryType]},
		      lt_updateDate:function(state){
		        var nowSerTime = new Date().getTime()-store.state.Difftime;   //当前的服务器时间
		        state.Todaystr = new Date(nowSerTime).format("yyyyMMdd");     //今天
		        state.Tomorrowstr = new Date(nowSerTime+DAY_TIME).format("yyyyMMdd"); //明天
		        state.Yestodaystr = new Date(nowSerTime-DAY_TIME).format("yyyyMMdd"); //昨天
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
		        _SerTime = (new Date().getTime()- store.state.Difftime - GMT_DIF) % DAY_TIME
		        for (var planLen = LotteryPlan.length, i = LotteryPlan.length - 1; i >= 0; i--) {
		          _timeE = LotteryPlan[i].EndTime.split(':');
		          EndTime = _timeE[0]*3600000 + _timeE[1]*60000 + _timeE[2]*1000;			//某期结束时间
		          Vue.set(LotteryPlan[i],'End', EndTime)
		          _timeS = LotteryPlan[i].StartTime.split(':');
		          StartTime = _timeS[0]*3600000 + _timeS[1]*60000 + _timeS[2]*1000; //某期开始时间
		          Vue.set(LotteryPlan[i],'Start', StartTime)

		          if(i === planLen-1 && _SerTime >= EndTime){
		          	//i 等于最后一期， 而且服务器时间大于最后一期的EndTime
		            state.IssueNo = planLen;
		          }else if (_SerTime <= EndTime && _SerTime >= StartTime) {
		          	//在某期的区间中
		            state.IssueNo = i;
		          }else if (i===0 && _SerTime < EndTime) {
		          	//小于0 而且 服务器时间小于第一期的EndTime
		            state.IssueNo = 0;
		          }
		        }

		        store.commit('lt_updateIssue')
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
	      		store.commit('lt_setMoney')
	      	},
	      	//设置倍数
	      	lt_setPower:(state, power)=>{
	      		state.bet.graduation_count = power
	      		store.commit('lt_setMoney')
	      	},
	      	//设置元角分
	      	lt_setUnit:(state, unit)=>{
	      		state.bet.betting_model = unit
	      		store.commit('lt_setMoney')
	      	},
	      	lt_setMoney:(state)=>{
						state.bet.betting_money = +(state.perbet * state.bet.betting_count * state.bet.graduation_count * state.bet.betting_model).toFixed(2)
	      	},
	      	//添加bet到plan中
	      	lt_addBet:(state)=>{
	      		var baseBet = new BaseBet()
	      		var {power,buy_count} = state.chaseConf
	      		if(power > 1 || buy_count > 1){
	      			baseBet.power2one()
	      		}
	      		store.commit('lt_addToBasket', baseBet)
	      		store.commit('lt_clearBet')
	      		store.dispatch('lt_ordinaryChase')
	      	},
	      	lt_addRandomBet:(state, randomBet)=>{
	      		var {power,buy_count} = state.chaseConf
	      		if(power > 1 || buy_count > 1){
	      			randomBet.power2one()
	      		}
	      		store.commit('lt_addToBasket', randomBet)
	      		store.dispatch('lt_ordinaryChase')
	      	},
	      	//将注单push到basket里
	      	lt_addToBasket:(state, bet)=>{
	      		//去掉重复的，合并加倍
	      		var equalIndex, isEqual = false
	      		state.basket.forEach((_bet, index)=>{
	      			var allPropEqual = true
	      			for(var prop in _bet){
	      				if(typeof _bet[prop] === 'string' || typeof _bet[prop] === 'number'){
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
	      			state.basket[equalIndex].setPower(prevPower * 2)
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
		      	store.dispatch('lt_ordinaryChase')
	      	},
	      	lt_clearBasket:(state)=>{
	      		state.basket = [];
	      		store.commit('lt_setScheme', [])
	      	},
	      	lt_deleteBet:(state, index)=>{
	      		state.basket.splice(index,1)
	      		store.dispatch('lt_ordinaryChase')
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
								if(json.Code === 1) {
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
		      			if (refer && _EndTime1 !== _EndTime2) {
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
		      	var Results = state.LotteryResults[code] ||[]
			      		,IssueNo = Results.length?Results[0].IssueNo:0;

		      	_fetch({
		          Action: "GetLotteryOpen",
		          LotteryCode: code,
		          IssueNo: IssueNo,
		          DataNum: 10
		        }).then((json)=>{
		        	if(json.Code === 1) {
				        var len = json.BackData.length
				        		,bData = json.BackData

		            if(len){
		              for(var i = len - 1; i >= 0; i--) {
		              	bData[i].IssueNo > IssueNo && Results.unshift(bData[i])
		              }

		              Results.length > 10 && (Results.length = 10)

		              commit({
		              	type: 'lt_setLotteryResult',
		              	code,
		              	results: Results
		              })
		            }
		          }
		        })
		      },
		      //refresh
		      lt_refresh:({state, rootState, commit, dispatch})=>{
		      	var _SerTime = (new Date().getTime()- store.state.Difftime - GMT_DIF) % DAY_TIME
		      			,IssueNo = state.IssueNo
		      	if (_SerTime<1000) {
			        console.log("新的一天");
			        commit('lt_updateDate')
			        commit('lt_setIssueNo', 0)
			        return;
			      }

			      if(!state.LotteryPlan.length) return
		        var Countdown = state.LotteryPlan[state.IssueNo % state.PlanLen].End
			                        +(state.IssueNo>=state.PlanLen) * DAY_TIME
			                        -_SerTime;

		        Countdown %= DAY_TIME;
		        //如果倒计时小于0，则一直更新到最新期
		        //用循环是因为有可能长时间不相应，需要一次性校正到位
		        if(Countdown<=0){
		          while(Countdown<=0){
		          	commit('lt_setIssueNo', ++IssueNo)
		            Countdown = state.LotteryPlan[state.IssueNo % state.PlanLen].End
					       							 +(state.IssueNo>=state.PlanLen) * DAY_TIME
					       							 -_SerTime;
		          }

		          //期号更新
		          commit('lt_updateIssue')
		          var _year = new Date(new Date().getTime()- store.state.Difftime - GMT_DIF).getFullYear()	//本年
		          layer.open({
		            shadeClose: false,
		            className: "layerConfirm layerCenter",
		            content: `${state.OldIssue.replace(_year,"")}期已截止</br>当前期号<span style="color:red">${state.NowIssue.replace(_year,"")}</span></br>投注时请注意期号`,
		            title: "温馨提示",
		            btn: ["确定"]
		          });
		        }

		        Countdown = Math.floor(Countdown/1000);   //转成以秒为单位
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
      	      	wait4Results++

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
				      }else if(Results[0].IssueNo*1 > state.OldIssue*1){
				      	commit('lt_updateTimeBar', '暂停销售')		//暂停销售
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
		      	_fetch({Action: 'GetBetSideBar'}).then((json)=>{
		      		if(json.Code === 1){
		      			var betting = json.Data.BettingOrders
		      			commit('lt_setBetRecord', betting)
		      		}
		      	})
		      },
		      //获得返点
		      lt_getRebate:({state, rootState, commit, dispatch})=>{
		      	var type = state.lottery.LotteryType
		      	var _rebate = rootState['Rebate' + type]
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


		      	/*var _rebate = sessionStorage.getItem('Rebate' + type)
		      	if(_rebate){
		      		commit({
		      			type:'lt_setRebate',
		      			rebate: JSON.parse(_rebate),
		      			LotteryType: type
		      		})
						}else{
			      	_fetch({
								Action: 'GetBetRebate',
								LotteryType: type
							}).then((json)=>{
								if(json.Code === 1){
									sessionStorage.setItem('Rebate' + type, JSON.stringify(json.BackData))
									commit({
				      			type:'lt_setRebate',
				      			rebate: json.BackData,
				      			LotteryType: type
				      		})
								}
							})
						}*/
		      },
		      //投注
		      lt_confirmBet:({state, rootState, commit, dispatch})=>{
		      	var _basket = deleteCompress(state.basket)

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

	              layer.confirm(`投注成功，您可以在我的账户查看注单详情`,['继续投注','查看注单'], ()=>{},()=>{this.$router.push('/userCenter')})
		      		}else if(json.Code === -9){
		      			//清除rebate
		      			layer.alert(json.StrCode)
				      	var type = state.lottery.LotteryType
				      	// localStorage.removeItem('Rebate' + type)
				      	store.dispatch('lt_getRebate')
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
	      		_fetch({
	      			Action: 'AddChaseBetting',
							data: new ChaseAjax()
	      		}).then((json)=>{
	      			if(json.Code === 1){
								layer.msg(json.StrCode)
								commit('lt_clearBet')						//清空bet
		      			commit('lt_clearBasket')				//清空basket
		      			commit('lt_changeBox', '')			//将所有弹出框关闭
		      			commit('lt_setScheme', [])			//清空scheme
		      			commit('lt_setChasePower', 1)		//清空追号配置
					      commit('lt_setChaseIssue', 1)

								//隔3s获取我的投注
		      			this.timer4 = setTimeout(()=>{
		      				dispatch('lt_updateBetRecord')
		      			}, 3000)
	              layer.confirm(`投注成功，您可以在我的账户查看注单详情`,['继续投注','查看注单'], ()=>{},()=>{this.$router.push('/userCenter')})
							}else if(json.Code === -9){
		      			//清除rebate
		      			layer.alert(json.StrCode)
				      	var type = state.lottery.LotteryType
				      	// localStorage.removeItem('Rebate' + type)
				      	store.dispatch('lt_getRebate')
							}else{
								layer.msgWarn(json.StrCode);
							}
	      		})
	      	}
		    }
		  }


			//注册彩种模块 --lt
			state.lt || store.registerModule('lt', lt)
			//生成昨天今天明天字符串
			store.commit('lt_updateDate')
			//切换彩种
			store.dispatch('lt_updateLottery', this.lcode)
			//设置页面配置-SSC、K3
		  store.commit('lt_initConfig')
		  //设置默认的玩法
		  this.setDefaultMode()
			//获取我的投注
			store.dispatch('lt_updateBetRecord')
			//获取返点
			store.dispatch('lt_getRebate')
			//每隔1s调用一次refresh
			this.baseLoop = setInterval(()=>{
				store.dispatch('lt_refresh')
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
					'11X5':['选一', '前三一码不定位']
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
		beforeDestroy(){
			clearTimeout(this.timer1)
			clearTimeout(this.timer2)
			clearTimeout(this.timer3)
			clearTimeout(this.timer4)
			clearInterval(this.baseLoop)
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

	}
</script>