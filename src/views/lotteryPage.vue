<template>
	<div @click = "closeBox">
		<keep-alive>
			<router-view ></router-view>
		</keep-alive>
	</div>
</template>
<script>
	import lt_ssc from '../json/lt_ssc.json'
	import Vue from 'vue'
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import {DAY_TIME, HOUR_TIME, MINUTE_TIME, SECOND_TIME, GMT_DIF, PERBET} from '../JSconfig'

	export default{
		beforeRouteEnter(to, from, next){
			//校验LotteryList， 和LotteryConfig-- 不阻塞，仅发起
			RootApp.GetInitData(['LotteryList','LotteryConfig'], state=>{})
			var Difftime = localStorage.getItem('Difftime')
			if(Difftime === null){
				RootApp.getServerTime(next)//没获取Difftime就再获取一次
			}else{
				next()										//有就直接进页面
			}
		},
		created(){
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
				'11X5': lt_11x5
			}
			var awardSetter = {
  			'SSC':getSSCRebate
  		}

			var timer1, timer2
					,wait4Results = 0
					,wait4BetRecord = false


			const lt = {
		    state:{
		      bet: {
					  betting_number: '',		//投注号码字符串
					  betting_count: 0,			//投注注数
					  betting_money: 0,			//投注金额
					  betting_model: 1,			//单位(1,0.1,0.01)
					  graduation_count:1,		//倍数
		      },
		      tmp: {
		      	'10000':[],
		      	'1000':[],
		      	'100':[],
		      	'10':[],
		      	'1':[],
		      	'xxxx':[],
		      	'xxx':[],
		      	'xx':[],
		      	'x':[],
		      	'i10000':[],
		      	'i1000':[],
		      	'i100':[],
		      	'i10':[],
		      	'i1':[],
		      	'psum27':[],
		      	'csum26':[],
		      	'psum18':[],
		      	'csum17':[],
		      	'baodan':[],
		      	'whole':[],
		      	'notebet':[]
		      },        //即时的投注号码情况
		      basket:[],      //号码篮
		      scheme:{},      //追号相关
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

		    },
		    getters: {

		    },
		    mutations:{
		      //变更弹出框
		      lt_changeBox:(state, boxName)=>{state.box = boxName},
		      //变更玩法
		      lt_changeMode:(state, mode)=>{
		      	var type = state.lottery.LotteryType   //彩种类型 SSC、K3
		      			,Odds = state.Odds[type] || []

		      	state.mode = mode
		      	for(var item in state.tmp){
		      		state.tmp[item] = []
		      	}
		      	//更改玩法时，对应玩法的奖金也跟着变
		      	state.award = awardSetter[type](mode.mode, Odds)
		      	//更换玩法，bet清空
		      	state.bet.betting_number = ''
		      	state.bet.betting_count = 0
		      	state.bet.betting_money = 0
		      },
		      //变更彩种
		      lt_changeLottery:(state, code)=>{
		        state.lottery = store.state.LotteryList[code]
		        RootApp.$router.push(code)		//更改路由
		      	/**
		      	 * 此处应有清除方案的代码
		      	 */
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
	      		//根据传入的code,和彩种index来返回 期号字符串
	      		function computeIssue(code, index){
	      			var days 		//和当前期差几天
	      					,_index  //那一天的第几期
	      					,dateStr		//日期字符串

	      			days = Math.floor(index/state.PlanLen)
	      			_index = index - days * state.PlanLen;
	      			//这里挂各特殊彩种的处理函数
	      			var handler = {
	      				'1001':function(){
	      					(_index > 84) && days--
	      				},
	      			}

	      			var handleResult
	      			handler[code] && (handleResult = handler[code]())		//特殊彩种的特殊处理

	      			if(handleResult){
	      				return handleResult
	      			}else{
	      				if(days){
		      				var todayTime = new Date(state.Todaystr.replace(/(\d{4})(\d{2})(\d{2})/,"$1/$2/$3")).getTime();
						      dateStr = new Date(todayTime + days * DAY_TIME).format('yyyyMMdd');
	      				}else{
									dateStr = state.Todaystr;
	      				}
	      				return dateStr + state.LotteryPlan[_index].IssueNo
	      			}
	      		}

	      		var code = state.lottery.Lotterycode 	//当前彩种号
  		      Vue.set(state, 'NowIssue', computeIssue(code, state.IssueNo))				//当前期 (可以下注的这一期)
			      Vue.set(state, 'OldIssue', computeIssue(code, state.IssueNo - 1)) 	//上一期
			      state.displayResults = false	//进入等待开奖动画
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
	      		state.bet.betting_money = PERBET * state.bet.betting_count * state.bet.graduation_count * state.bet.betting_model
	      	},
	      	//设置倍数
	      	lt_setPower:(state, power)=>{
	      		state.bet.graduation_count = power
	      		state.bet.betting_money = PERBET * state.bet.betting_count * state.bet.graduation_count * state.bet.betting_model
	      	},
	      	//设置元角分
	      	lt_setUnit:(state, unit)=>{
	      		state.bet.betting_model = unit
	      		state.bet.betting_money = PERBET * state.bet.betting_count * state.bet.graduation_count * state.bet.betting_model
	      	},
	      	//添加bet到plan中
	      	lt_addBet:(state)=>{
	      		console.log(new BaseBet())
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

		      	/**
		      	 * 清除方案的代码在mutation中写
		      	 */
		      	dispatch('lt_getResults', code)		//获得开奖结果
		      	wait4Results = 0
		      	wait4BetRecord = false
		      	clearTimeout(timer1)
		      	clearTimeout(timer2)

		      	dispatch('lt_updatePlan', code)		//更新计划
		      },
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
		            className: "layerConfirm",
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
      	      	//没有计划 或者 有计划且上一期还没开奖，就以一定频率轮询开奖结果
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
				        	// console.log('获取开奖结果')
				        	dispatch('lt_getResults', state.lottery.LotteryCode)		//获取开奖结果
				        }
				      }else if(Results[0].IssueNo*1 > state.OldIssue*1){
				      	commit('lt_updateTimeBar', '暂停销售')		//暂停销售
				      }else{
				      	//开奖
				      	// console.log('开奖')
				      	commit('lt_displayResults', true)
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
		      lt_getRebate:({state, rootState, commit, dispatch})=>{
		      	var type = state.lottery.LotteryType
		      	var _rebate = sessionStorage.getItem('Rebate' + type)
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
									console.log(json)
									sessionStorage.setItem('Rebate' + type, JSON.stringify(json.BackData))
									commit({
				      			type:'lt_setRebate',
				      			rebate: json.BackData,
				      			LotteryType: type
				      		})

								}
							})

						}
		      }
		    }
		  }


		  var ltype, lcode, _mode, _group, _subGroup
		  //各彩种默认玩法
		  var defaultMode = {
				'SSC':['五星', '直选'],
				'11X5':['选一', '前三一码不定位']
			};
		  ;[,ltype, lcode] = this.$route.fullPath.slice(1).split('/')
		  _group = defaultMode[ltype][0]			//默认的玩法群
		  _subGroup = defaultMode[ltype][1]		//默认的玩法组

			//注册彩种模块 --lt
			state.lt || store.registerModule('lt', lt)
			//生成昨天今天明天字符串
			store.commit('lt_updateDate')
			//切换彩种
			store.dispatch('lt_updateLottery', lcode)
			//设置页面配置-SSC、K3
		  store.commit('lt_initConfig')
		  //设置默认的玩法
			store.commit('lt_changeMode', state.lt.config[_group][_subGroup][0])
			//获取我的投注
			store.dispatch('lt_updateBetRecord')
			//获取返点
			store.dispatch('lt_getRebate')
			//每隔1s调用一次refresh
			this.baseLoop = setInterval(()=>{
				store.dispatch('lt_refresh')
			},1000)

		},
		methods:{
			//点击页面其他部分关闭所有盒子
			closeBox(){
				store.commit('lt_changeBox', '')
			}
		},
		beforeDestroy(){
			clearTimeout(this.timer1)
			clearTimeout(this.timer2)
			clearInterval(this.baseLoop)
		}

	}

	function BaseBet(){
		var lt = state.lt,
				bet = state.lt.bet

		this.lottery_code = lt.lottery.LotteryCode,											//彩种
		this.play_detail_code = lt.lottery.LotteryCode + lt.mode.mode,	//玩法code
		this.betting_number = bet.betting_number,   										//投注号码
		this.betting_count = bet.betting_count,													//这个方案多少注
		this.betting_money = PERBET * bet.betting_count * bet.betting_model * bet.graduation_count,						//一注单价 * 投注数量 * 单位 * 倍数

		this.betting_point = lt.award + '-' + lt[lt.mode.mode]  ,					//赔率
		this.betting_model = bet.betting_model,										//元角分
		this.betting_issuseNo = lt.NowIssue,									//当前期号
		this.graduation_count = bet.graduation_count								//当前倍率
	}

	function getSSCRebate(mode, Odds){
    //前三中三后三一样，前二后二一样
    switch(mode[0]){
      case 'E':
      case 'D':
        mode = 'F' + mode.slice(1);
        break;
      case 'B':
        mode = 'C' + mode.slice(1);
        break;
      case 'I':
        if(mode === 'I92')mode = 'I91';
        if(mode === 'I94' || mode === 'I95')mode = 'I93';
        break;
    }
    var rebateSSC = Odds
    for(var i = 0;i < rebateSSC.length;i++){
      if(rebateSSC[i].PlayCode === mode){
        return rebateSSC[i].Bonus;
      }
    }
  }
</script>