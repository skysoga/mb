<template>
	<keep-alive>
		<router-view></router-view>
	</keep-alive>
</template>
<script>
	import lt_ssc from '../json/lt_ssc.json'
	import Vue from 'vue'
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import {DAY_TIME, HOUR_TIME, MINUTE_TIME, SECOND_TIME, GMT_DIF} from '../JSconfig'

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

			var timer1, timer2
					,wait4Results = 0
					,wait4BetRecord = false


			const lt = {
		    state:{
		      bet: {},        //当前投注情况
		      basket:[],      //号码篮
		      scheme:{},      //追号相关
		      mode:{
		        name: '',     //复式
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
		      box:'',           //当前弹出框
		      config:{},        //在各种彩种页面,
		      LotteryPlan:[],		//当前彩种的彩种计划
		      LotteryResults:{},//各彩种开奖结果的缓存（包含不同彩种）
		      PlanLen:0,				//当前彩种的彩种计划长度
		      IssueNo:0,				//期号索引:从0开始，到PlanLen-1
		      resultNums:[],		//本彩种开奖结果的号码数组

		      //渲染用
		      Todaystr:'',
		      Tomorrowstr:'',
		      Yestodaystr:'',
		      //counter或flag
		      displayResults: false,	//false显示等待开奖的动画， true显示开奖结果

		    },
		    getters: {
		    },
		    mutations:{
		      //变更弹出框
		      lt_changeBox:(state, boxName)=>{state.box = boxName},
		      //变更玩法
		      lt_changeMode:(state, mode)=>{state.mode = mode},
		      //变更彩种
		      lt_changeLottery:(state, code)=>{
		        state.lottery = store.state.LotteryList[code]
		        RootApp.$router.push(code)		//更改路由
		      	/**
		      	 * 此处应有清除方案的代码
		      	 */
		      },
		      //变更配置（进入各具体彩种页时，设置）
		      lt_initConfig:(state, config)=>{state.config = config},
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
	      	lt_setLotteryResult:(state, {code, results})=>{
	      		state.LotteryResults[code] = results
	      		state.resultNums = results[0].LotteryOpen.split(',')
	      	},
	      	lt_setIssueNo:(state, IssueNo)=>{state.IssueNo = IssueNo},
	      	lt_displayResults:(state, bool)=>{
	      		state.displayResults = bool
	      	},
		    },



		    actions: {
		    	//变更彩种的异步操作
		    	lt_updateLottery:({state, rootState, commit, dispatch}, code)=>{
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
			      		console.log(code)
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
		        console.log(Countdown)
		        if(Countdown>600){
			        //如果Countdown大于10分钟，则进入预售
		         	//预售中
		        }else{
		        	//倒计时渲染
		          // var hh=Math.floor(Countdown/3600);
		          // var MM=Math.floor(Countdown%3600/60);
		          // var ss=Math.floor(Countdown%60);
		          // hh=hh>9?hh:('0'+hh);
		          // MM=MM>9?MM:('0'+MM);
		          // ss=ss>9?ss:('0'+ss);
		          // baseData.DomJson.TimeBar.innerText = hh+':'+MM+':'+ss;
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
				        	dispatch('lt_getResults', state.lottery.LotteryCode)		//获取开奖结果
				        }
				      }else if(Results[0].IssueNo*1 > state.OldIssue*1){
				      	//暂停销售
				      	console.log('暂停销售')
				      }else{
				      	//开奖
				      	console.log('开奖')
				      	commit('lt_displayResults', true)
				      	wait4BetRecord = true
    	          timer1 = setTimeout(()=>{
    	          	//获取我的投注
    	          }, 6000)

    	          timer2 = setTimeout(()=>{
    	          	//获取我的投注
    	          	wait4Results = 0
    	          	wait4BetRecord = false
    	          }, 12000)

				      }

			      }

		      },

		    }
		  }

			//注册彩种模块 --lt
			state.lt || store.registerModule('lt', lt)
			store.commit('lt_updateDate')
			store.dispatch('lt_updateLottery', this.$route.params.code)

			var count = 0;
			setInterval(()=>{
				store.dispatch('lt_refresh')
			},1000)

		},

	}
</script>