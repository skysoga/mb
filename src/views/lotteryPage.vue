<template>
  <div @click = "closeBox" class="lotteryOutCon">
    <!-- 普通彩种 -->
    <LotteryCommon v-if = "ptype !== 'live' && $route.params.type !== 'K3' && $route.params.type !== '6HC'"></LotteryCommon>
    <!-- 快三彩种 -->
    <LotteryK3 v-if = "ptype !== 'live' && $route.params.type === 'K3'"></LotteryK3>

    <Lottery6HC v-if = "$route.params.type === '6HC'"></Lottery6HC>
    <NewK3 ref="newk3" v-if = "ptype === 'live' && !isSleep" :lcode="lcode"></NewK3>
    <sleeping v-if = "ptype === 'live' && isSleep"></sleeping>
  </div>
</template>
<style lang='scss' scoped>
  .lotteryOutCon{
    height: 100%;
    width: 100%;
  }
</style>
<script>
  import LotteryCommon from './lottery_common'
  import LotteryK3 from './lottery_k3'
  import Lottery6HC from './lottery_6hc'
  import NewK3 from './newk3/main'
  import sleeping from './newk3/sleeping'

  import {sscConfig} from '../js/page_config/lt_ssc'
  import {k3Config} from '../js/page_config/lt_k3'
  import {syx5Config} from '../js/page_config/lt_syx5'
  import {pk10Config} from '../js/page_config/lt_pk10'
  import {kl8Config} from '../js/page_config/lt_kl8'
  import {hcConfig} from '../js/page_config/lt_6hc'
  import getNatal from '../js/page_config/natal'

  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import {bus, BaseBet, ChaseAjax, easyClone, deleteCompress, Scheme, getBasketAmount,
          computeIssue, getSSCRebate, getMultipleRebate,
          DAY_TIME, HOUR_TIME, MINUTE_TIME, SECOND_TIME, GMT_DIF, PERBET} from '../js/kit'

  var randomFeed = Math.floor(Math.random()*4)  //获取开奖时间的随机数，用于错开请求
  var haveGotTime = true		                    //标志位-进页面时是否获取到服务器时间

  function scrollTop(){document.body.scrollTop = 0}  //滚动置顶

  export default{
    components:{
      LotteryCommon,
      LotteryK3,
      Lottery6HC,
      NewK3,
      sleeping
    },
    beforeRouteEnter(to, from, next){
      // 将滚动置顶
      scrollTop()
      //从url上获取彩种type和彩种code
      var [ptype,ltype, lcode] = to.fullPath.slice(1).split('/')
      //获取返点
      var getRebate = new Promise(function(resolve, reject){
        var storageName = `Rebate${ltype}`
        var rebate = localStorage.getItem(storageName)
        rebate = JSON.parse(rebate)
        if(rebate){
          resolve(rebate)
        }else{
          _fetch({
            Action: 'GetBetRebate',
            LotteryType: ltype,
          }).then((json)=>{
            if(json.Code === 1){
              localStorage.setItem(storageName ,JSON.stringify(json.BackData))
              resolve(json.BackData)
            }else{
              var err = new Error('无法获得返点，请重试')
              reject(err)
            }
          })
        }
      })

      //获取彩种配置和列表
      var getLotteryList = new Promise(function(resolve, reject){
        RootApp.GetInitData(['LotteryList','LotteryConfig'], resolve)
      })

      //获取服务器时间
      var getServerTime = new Promise(function(resolve, reject){
        var Difftime = localStorage.getItem('Difftime')
        if(Difftime === 'NaN' || !Difftime){
          haveGotTime = false       //进页面时没获取到服务器时间
          RootApp.getServerTime(resolve)//没获取Difftime就再获取一次
        }else{
          resolve()                    //有就直接进页面
        }
      })

      //设置请求的数组
      if (ptype === 'live') {
        var getGameConfig = new Promise(function(resolve, reject){
          let GameConfig = {
            GameWS:'ws://47.52.166.234:8002',
            OnlineWS:'ws://47.52.166.234:8003',
          }
          resolve(GameConfig)
        })
        var getGiftConfig = new Promise(function(resolve, reject){
          let GiftConfig = [['airplane','飞机'],['boat','皇家游轮'],['cannon','皇家大炮'],['ferrari','法拉利'],['cuke','大黄瓜'],['porsche','保时捷'],['money','钱钱钱']]
          resolve(GiftConfig)
        })
        var reqArr = [getRebate, getLotteryList, getServerTime,getGameConfig,getGiftConfig]
      }else{
        var reqArr = [getRebate, getLotteryList, getServerTime]
      }

      // 进入彩种页必须先获取到  赔率/彩种配置/服务器时间
      Promise.all(reqArr).then((values)=>{
        //校验下这个彩种存不存在，不存在就送回购彩大厅
        var lotteryItem = state.LotteryList[lcode]
        var offLineLottery = ['FC3D', 'PL35']
        if(lotteryItem === undefined || offLineLottery.indexOf(lotteryItem.LotteryType) > -1){
          layer.url('您所访问的彩种不存在，即将返回购彩大厅', '/lotteryHall')
          return
        }else{
          var LotteryType = lotteryItem.LotteryType
          if(lotteryItem.LotteryType !== ltype){
            RootApp.$router.replace(`./lottery/${LotteryType}/${lcode}`)
          }
        }
        next(vm=>{
          if (values[3]) {
            vm.GameConfig = values[3]
            vm.GiftConfig = values[4]
            vm.createWS()
          }
        })
      }).catch((err)=>{
        //报错并返回

         //关掉loading动画
        store.commit('toggleLoading', false)
        layer.msgWarn(err.message)
        //返回首页
        RootApp.$router.replace('/index')
      })
		},
		created(){
		  //从url上获取彩种type和彩种code
		  ;[this.ptype,this.ltype, this.lcode] = this.$route.fullPath.slice(1).split('/')
      //如果有本地缓存的时间，则再更新一次
      if(haveGotTime){
	      RootApp.getServerTime()
      }

      //页面配置信息
      var pageConfig = {
        'SSC': sscConfig,
        'K3': k3Config,
        'SYX5': syx5Config,
        'PK10': pk10Config,
        'KL8': kl8Config,
        '6HC': hcConfig
      }

      //处理返点---除了时时彩其余彩种都用同一个处理函数
      var awardSetter = {
        'SSC':getSSCRebate,
        'K3': getMultipleRebate,
        'SYX5': getMultipleRebate,
        'PK10': getMultipleRebate,
        'KL8': getMultipleRebate,
        '6HC': getMultipleRebate,
      }

      var wait4Results = 0, wait4BetRecord = false
      const lt = {
        state:{
          bet: {
            betting_number: '',    //投注号码字符串
            betting_count: 0,      //投注注数
            betting_money: 0,      //投注金额
            betting_model: 1,      //单位(1,0.1,0.01)
            graduation_count:1,    //倍数
            compress: ''           //压缩后的字符串
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
            power:1                        //每期多少倍(普通追号)
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
          Odds:{},          //奖金,根据type而不同
          award:'',          //当前彩种、当前玩法以元为单位的奖金
          box:'',           //当前弹出框
          config:{},        //在各种彩种页面,
          LotteryPlan:[],    //当前彩种的彩种计划
          LotteryResults:{},//各彩种开奖结果的缓存（包含不同彩种）
          BetRecord:[],      //投注记录
          PlanLen:0,        //当前彩种的彩种计划长度
          IssueNo:0,        //期号索引:从0开始，到PlanLen-1
          //新增的变量
          StopTime:0,       //结束投注时间
          WS:{
            openNum:-1,
          },
          ptype:'',

          //渲染用
          Todaystr:'',
          TimeBar:'00:00:00',      //倒计时内容
          NowIssue: '',            //当前期
          OldIssue: '',            //上一期

          //counter或flag
          displayResults: false,  //false显示等待开奖的动画， true显示开奖结果
          tipDisplayFlag: false,  //是否省略玩法
          natal:getNatal(new Date()),
          perbet: PERBET
        },
        getters: {
          // 本命
          lt_natal(state, getters, rootState){
            //这个方法错误,要按开奖日计算
            /*var Difftime = rootState.Difftime || 0
            var serverTime = new Date().getTime() - Difftime
            var natal = getNatal(new Date(serverTime));  //本命 9-鸡
            return natal*/
            return state.natal
          }
        },
        mutations:{
                          /** 期号 **/
          //设置Todaystr
          lt_updateDate:(state)=>{
            var nowSerTime = new Date().getTime()- this.$store.state.Difftime;   //当前的服务器时间
            nowSerTime=nowSerTime+new Date().getTimezoneOffset()*60*1000-GMT_DIF
            console.log(new Date(nowSerTime).format("yyyyMMddhhmmss"));
            state.Todaystr = new Date(nowSerTime).format("yyyyMMdd");           //今天
          },
          // 设置LotteryPlan
          lt_setPlan:(state, plan)=>{
            state.LotteryPlan = plan
          },
          //计算当前期号
          lt_computeIssueNo:(state, LotteryPlan)=>{
            var code = state.lottery.LotteryCode
            if(code === '1301'){
              return
            }

            state.LotteryPlan = LotteryPlan
            state.PlanLen = LotteryPlan.length
            var _timeE=[]     //EndTime的暂存数组
                ,_timeS = []  //StartTime的暂存数组
                ,EndTime      //某期EndTime
                ,StartTime    //某期StartTime
                , _SerTime    //除去日期的服务器时间

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
              EndTime = _timeE[0]*3600000 + _timeE[1]*60000 + _timeE[2]*1000;      //某期结束时间
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
          lt_updateIssue:(state,source)=>{
            var ptype = state.ptype
            if (ptype === 'live') {
              // if (state.LotteryResults['0101'][0] !== undefined) {
              //   Vue.set(state, 'OldIssue', state.LotteryResults['0101'][0].IssueNo)
              // }
            }else{
              var code = state.lottery.LotteryCode   //当前彩种号
              Vue.set(state, 'NowIssue', computeIssue(code, state.IssueNo))        //当前期 (可以下注的这一期)
              Vue.set(state, 'OldIssue', computeIssue(code, state.IssueNo - 1))   //上一期
              this.$store.commit('lt_displayResults', false)
              state.basket.forEach(bet=>{
                bet.betting_issuseNo = computeIssue(code, state.IssueNo)
              })
              this.$store.dispatch('lt_ordinaryChase')
            }
          },
          lt_setLotteryResult:(state, {code, results})=>{              //设置某一彩种的开奖结果
            Vue.set(state.LotteryResults, code, results)
          },
          lt_setOnceLotteryResult:(state, {code, results})=>{          //设置一条开奖结果
            if (state.LotteryResults[code].length > 0) {
              if (results.IssueNo === state.LotteryResults[code][0].IssueNo) {
                return
              }
            }
            let _lresult = JSON.parse(JSON.stringify(state.LotteryResults[code]))
            if(_lresult.length >= 10){
              _lresult.pop()
            }
            _lresult.unshift(results)
            Vue.set(state.LotteryResults, code, _lresult)
            this.$store.commit('lt_updateIssue')
          },
          lt_stopSell:(state, type)=>{
            this.$store.commit('lt_updateTimeBar', ['期号有误','暂停销售','当期封单','等待开局','等待开奖'][type])    //暂停销售
            return
          },
          lt_setIssueNo:(state, IssueNo)=>{state.IssueNo = IssueNo},  //设置当前期号
          lt_displayResults:(state, bool)=>{                          //展示开奖结果或开奖动画
            state.displayResults = bool
          },
          lt_showFullTip:(state, bool)=>{
            state.tipDisplayFlag = bool
          },
          lt_updateTimeBar:(state, text)=>{state.TimeBar = text;},      //倒计时的内容
          lt_setBetRecord:(state, BetRecord)=>{state.BetRecord =BetRecord;},  //投注记录

                          /** 通用 **/
          //变更弹出框
          lt_changeBox:(state, boxName, shouldScrollTop)=>{
            state.box = boxName
          },
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
            //
            //隐藏过长的玩法说明
            state.tipDisplayFlag = false
          },
          //变更彩种
          lt_changeLottery:(state, code)=>{
            state.lottery = this.$store.state.LotteryList[code]
            router.push(code)    //更改路由
          },
          //变更配置（进入各具体彩种页时，设置）
          lt_initConfig:(state)=>{state.config = pageConfig[state.lottery.LotteryType]},
          //设置返点
          lt_setRebate:(state, {rebate, LotteryType})=>{
            var mode = state.mode.mode
            state.award = awardSetter[LotteryType](mode, rebate.Odds)
            Vue.set(state.Rebate, LotteryType, rebate.Rebate)
            Vue.set(state.Odds, LotteryType, rebate.Odds)
          },

                          /** 投注-注单 **/

          //设置每注单价
          lt_setPerbet:(state, price)=>{state.perbet = price},
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
          lt_setBetCompress:(state, str)=>{state.bet.compress = str},

                          /** 投注-号码篮 **/

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
          lt_clearBasket:(state)=>{
            state.basket = [];
            this.$store.commit('lt_setScheme', [])
          },
          // 从号码篮中删除一注
          lt_deleteBet:(state, index)=>{
            state.basket.splice(index,1)
            this.$store.dispatch('lt_ordinaryChase')
          },

                          /** 投注-追号 **/

          lt_isStopAfterWin:(state, bool)=>{state.chaseConf.isstop_afterwinning = bool},
          lt_setChaseIssue:(state, chaseIssue)=>{state.chaseConf.buy_count = chaseIssue},
          lt_setChasePower:(state, chasePower)=>{state.chaseConf.power = chasePower},
          lt_setScheme:(state, scheme)=>{state.scheme = scheme},
          // 将号码篮中的倍数清为1
          lt_basketPowerTo1:(state)=>{
            state.basket.forEach(bet=>{
              bet.graduation_count = 1
              bet.betting_money = +(state.perbet * bet.betting_count * bet.graduation_count * bet.betting_model).toFixed(2)
            })
          },
          // 设置是否是追号
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
            scrollTop()
            //进入每个彩种，先把开奖结果初始化，如果不存在的话
            if(!state.LotteryResults[code]){
              commit({
                type:'lt_setLotteryResult',
                code,
                results: []
              })
            }
            commit('lt_changeLottery', code)  //变更彩种
            if (state.ptype !== 'live') {
              dispatch('lt_getResults', code)    //获得开奖结果
              wait4Results = 0
              wait4BetRecord = false
              clearTimeout(this.timer1)
              clearTimeout(this.timer2)
              dispatch('lt_updatePlan', code)    //更新计划
            }
          },
          lt_get6HCPlan:({state, rootState, commit, dispatch}, code)=>{
            var LotteryPlan = localStorage.getItem("lotteryPlan"+ code)
            LotteryPlan = LotteryPlan&&JSON.parse(LotteryPlan)
            if(LotteryPlan&&LotteryPlan.NextFirst>0){
              console.log('使用缓存')
              var month = new Date(new Date().getTime()- rootState.Difftime).getMonth() + 1
              // var _12to1 = (month === 1) &&  LotteryPlan.Month === 12
              // var outOfDate = month > LotteryPlan.Month  || _12to1
              if(month !== LotteryPlan.Month){
                //此处判断的盲区为   跨年同月
                console.log('彩种计划变更，需要更新')
                // console.log('彩种计划过期了，需要更新')
                fetch6HCPlan()
              }else{
                use6HCPlan(LotteryPlan)
              }
            }else{
              console.log('都没有')
              fetch6HCPlan()
            }

            function fetch6HCPlan(){
              _fetch({Action:'GetLotteryPlan', Qort:'1301'}).then((json)=>{
                if(json.Code === 1){
                  var monthPlan = json.Data
                  localStorage.setItem("lotteryPlan" + code, JSON.stringify(monthPlan));
                  //如果code和当前的code不一样，说明在异步获取完后，用户已经切换页面了，就直接结束
                  console.log(json)
                  use6HCPlan(monthPlan)
                }else{
                  layer.msgWarn(json.StrCode);
                }
              })
            }

            //对6HC的计划进行一些变换并报错到vuex中
            function use6HCPlan(monthPlan){
              //2017-10-15 通知本月15日不开奖
              if (monthPlan.Month==10) {
                monthPlan.Schedule=monthPlan.Schedule.replace('15,','')
              }
              if (monthPlan.Month==11) {
                monthPlan.BeforeIssue=127
              }
              //保证转为数字类型
              monthPlan.BeforeIssue *= 1
              monthPlan.NextFirst *= 1
              monthPlan.Month *=1
              var year = state.Todaystr.slice(0,4)
              var Month = monthPlan.Month
              var Schedule = monthPlan.Schedule.split(',')
              monthPlan.Schedule = monthPlan.Schedule.split(',').map(str=>+str)
              // 将对应的当月期号表变成毫秒值
              monthPlan.ScheduleStamp = monthPlan.Schedule.map(num=>{
                return new Date(year,Month-1,num,21,30,0).getTime()
              })
              monthPlan.ScheduleStamp.push((function(){
                return new Date(year,Month,monthPlan.NextFirst,21,30,0).getTime()
              })())
              commit('lt_setPlan', monthPlan)
              dispatch('lt_refresh')
            }
          },
          //action-获取开奖计划
          lt_updatePlan:({state, rootState, commit, dispatch}, code)=>{
            if(code === '1301'){
              dispatch('lt_get6HCPlan', code)
            }else if(['1407','1008','1300','1304'].indexOf(code)!==-1){
              createDFPlan()        //大发系列的，自行计算计划
            }else{
              //不是大发系列的
              var LotteryPlan = localStorage.getItem("lotteryPlan"+ code)
              LotteryPlan = LotteryPlan&&JSON.parse(LotteryPlan)

              if(LotteryPlan){
                checkPlan(code)                   //校验计划
              }else{
                // dispatch('lt_fetchPlan', code)    //获取计划
                getPlan(code)
              }
            }

            //获取开奖计划
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

            // 生成大发的计划
            function createDFPlan(){
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
            }

            // 校验计划
            function checkPlan(code){
              var refer = rootState.LotteryList[code]
                  ,_EndTime1 = LotteryPlan[refer.VerifyIssue*1-1].EndTime
                  ,_EndTime2 = refer.VerifyEndTime
              if(refer && -1 === _EndTime2.search(_EndTime1)){
                //校验没通过，就删除旧计划，重新拉一遍计划
                localStorage.removeItem("lotteryPlan"+code);
                getPlan(code)
                console.log("需要矫正");
              }else{
                //校验通过，就计算当前期号
                commit('lt_computeIssueNo', LotteryPlan)
              }
            }
          },
          //action-获得开奖结果
          lt_getResults:({state, rootState, commit, dispatch}, code)=>{
            // var Results = []
            //     ,IssueNo = Results.length?Results[0].IssueNo:0;

            _fetch({
              Action: "GetLotteryOpen",
              LotteryCode: code,
              IssueNo: 0,
              // IssueNo: IssueNo,
              DataNum: 10
            }).then((json)=>{
              if(json.Code === 1) {
                // if (10===json.BackData.length) {
                //   commit({
                //     type: 'lt_setLotteryResult',
                //     code,
                //     results: json.BackData
                //   })
                // }

               commit({
                  type: 'lt_setLotteryResult',
                  code,
                  results: json.BackData
                })


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
            var code = state.lottery.LotteryCode
            var ptype = state.ptype
            var isStop = rootState.LotteryList[code].IsStop
            // var isStop = rootState.LotteryList[this.lcode].IsStop
            if(isStop === '1'){
              commit('lt_stopSell', 1)    //暂停销售
              return
            }

            var _SerTime = (new Date().getTime()- rootState.Difftime - GMT_DIF) % DAY_TIME //折合成当日的时间
                ,IssueNo = state.IssueNo
            if(_SerTime<1000) {
              // console.log("新的一天");
              commit('lt_updateDate')
              commit('lt_setIssueNo', state.IssueNo%state.PlanLen)
            }

            function get6HCCountdown(){
              var serverTimeStamp = new Date().getTime() - rootState.Difftime
              var {BeforeIssue, Month, NextFirst, Schedule, ScheduleStamp} = state.LotteryPlan
              var Countdown
              if(!BeforeIssue || !Month || !NextFirst || !Schedule || !ScheduleStamp){
                console.log('方案尚未加载到')
                return
              }
              var cursor = new Date(serverTimeStamp)

              // 每月将缓存清楚掉重新拉取---月头
              // var _12to1 = (cursor.getMonth() + 1 === 1) &&  Month === 12 //防止过年出问题
              // var outOfDate = cursor.getMonth() + 1 > Month  && _12to1  //过期了
              var outOfDate = (cursor.getMonth() + 1) != Month
              if(outOfDate){
                var hour = cursor.getHours()
                var minute = cursor.getMinutes()
                var second = cursor.getSeconds()
                var ms = cursor.getMilliseconds()
                console.log('运行时发现计划过期',hour, minute, second, ms)
                if([hour, minute, second].every(num=>num===0)){
                  console.log('运行时，删除原缓存，并拉取新的计划')
                  localStorage.removeItem('lotteryPlan' + code)
                  dispatch('lt_get6HCPlan', code)
                }
              }
              var _issue = 1
              var NowIssue=state.NowIssue&&state.NowIssue.slice(4)*1
              if(NowIssue){
                NowIssue=NowIssue-BeforeIssue-1
                //括号不能删除
                Countdown = (ScheduleStamp[NowIssue]||0) - serverTimeStamp
                if (Countdown>0&&Countdown<72*3600000){
                  //当前期,更新倒计时即可
                  // console.log(Countdown)
                  return Countdown
                }else{
                  //避免从别的彩种过来时候受到Issue影响,所以要清零
                  NowIssue=0
                }
              }
              for(var i = NowIssue||0;i < ScheduleStamp.length;i++){
                if(ScheduleStamp[i] > serverTimeStamp){
                  _issue += i
                  break
                }
              }

              var nextIssueTime
              // 如果有值说明还在期号表内
              if(ScheduleStamp[i] !== undefined){
                nextIssueTime = ScheduleStamp[i]
              }else{
                //超过plan
                layer.msgWarn('期号错误...')
                return
                //月尾
                // console.log('一个月的结束，先用nextFirst')
                // cursor.setMonth(Month)
                // cursor.setDate(NextFirst)
                // cursor.setHours(21,30,0)  //开奖日21:15封盘
                // cursor.setMilliseconds(0)
                // _issue = Schedule.length + 1
                // nextIssueTime = cursor.getTime()
              }
              // Vue.set(window.state, 'natal', getNatal(new Date(nextIssueTime)))
              //按照下一期的时间来计算本命
              state.natal=getNatal(new Date(nextIssueTime))
              console.log(state.natal)
              Countdown = nextIssueTime - serverTimeStamp
              // console.log(Countdown)
              var issue = BeforeIssue + _issue
              // console.log(issue,state.NowIssue)
              // 设置期号
              commit('lt_setIssueNo', issue)
              var code = state.lottery.LotteryCode   //当前彩种号
              Vue.set(state, 'NowIssue', computeIssue(code, state.IssueNo))        //当前期 (可以下注的这一期)
              Vue.set(state, 'OldIssue', computeIssue(code, state.IssueNo - 1))   //上一期

              return Countdown
            }
            var that = state.that
            if (ptype === 'live') {
              //获取服务器的时间
              var serverTime = new Date().getTime() - rootState.Difftime
              var _status = that.WS.Status


              //是否有维护计划
              if (that.readySleep !== '' && that.isSleep === 0) {
                if(serverTime*1 + 1000 >= that.readySleep){
                  that.isSleep = 1
                  that.readySleep = ''
                }
              }

              //是否有开播计划
              if (that.readyRun !== '' && that.isSleep === 1) {
                if(serverTime*1 + 1000 >= that.readyRun *1 - 60 * 5 * 1000){
                  that.isSleep = 0
                  that.readyRun = ''
                }
              }


              if (_status === 'NewGame' || _status === 'Newest'){
                //正常倒计时
                var NewGame = that.WS[_status]
                if (that.WS.TimeLeft === '') {
                  // console.log(serverTime)
                  // console.log(NewGame.start)
                  if (serverTime >= NewGame.start && NewGame.end >= serverTime) {
                    that.WS.TimeLeft = NewGame.end*1 - serverTime*1
                  }else{
                    store.commit('lt_stopSell', 3)
                    return
                  }
                }else if(that.WS.TimeLeft <= 1000){
                  //状态改为等待开奖
                  that.WS.Status = 'WaitResult'
                  store.commit('lt_stopSell', 4)
                  commit('lt_displayResults', false)
                  that.WS.TimeLeft = ''
                  return
                }else{
                  that.WS.TimeLeft=that.WS.TimeLeft*1-1000
                }
                // console.log('TimeLeft:'+that.WS.TimeLeft)
                var Countdown = that.WS.TimeLeft

              }else{
                return
              }
            }else{
              if(code !== '1301'){
                if(!state.PlanLen)return
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
                    console.log('更新到最新期')
                    commit('lt_updateDate')
                    commit('lt_setIssueNo', state.IssueNo%state.PlanLen)
                  }

                  //期号更新
                  commit('lt_updateIssue')
                  var _year = new Date(new Date().getTime()- this.$store.state.Difftime - GMT_DIF).getFullYear()  //本年
                  layer.open({
                    shadeClose: false,
                    className: "layerConfirm layerCenter",
                    content: `${state.OldIssue.replace(_year,"")}期已截止</br>当前期号<span style="color:red">${state.NowIssue.replace(_year,"")}</span></br>投注时请注意期号`,
                    title: "温馨提示",
                    btn: ["确定"]
                  });
                }

              }else{
                // 获得6HC的倒计时
                var Countdown = get6HCCountdown()
                if(Countdown < 0){
                  // nextFirst的时间都到了。依然没有获取到开奖计划
                  commit('lt_stopSell', 0)    //暂停销售
                  console.log('本月计划未更新')
                  return
                }else if(Countdown < 1000){
                  console.log('下一期了')
                  // var _year = new Date(new Date().getTime()- this.$store.state.Difftime - GMT_DIF).getFullYear()  //本年
                  var currIssue = computeIssue(code, state.IssueNo)
                  var nextIssue= computeIssue(code, state.IssueNo + 1)
                  layer.open({
                    shadeClose: false,
                    className: "layerConfirm layerCenter",
                    content: `${currIssue}期已截止</br>当前期号<span style="color:red">${nextIssue}</span></br>投注时请注意期号`,
                    title: "温馨提示",
                    btn: ["确定"]
                  });
                }
              }
            }

            Countdown = Math.floor(Countdown/1000);   //转成以秒为单位
            updateTimeBar(Countdown, code)                  //更新倒计时文字

            var Results = state.LotteryResults[state.lottery.LotteryCode]
                ,len = Results?Results.length:0;
            if (ptype !== 'live') {
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
                  if (wait4Results>(5+randomFeed) && wait4Results%interval===randomFeed) {
                    dispatch('lt_getResults', state.lottery.LotteryCode)    //获取开奖结果
                  }
                }else if(Results[0].IssueNo*1 >= state.NowIssue*1){
                  commit('lt_stopSell', 0)    //暂停购买
                }else{
                  commit('lt_displayResults', true)
                  //开奖
                  if(wait4Results){
                    wait4BetRecord = true
                    // this.timer1 = setTimeout(()=>{
                    //   // console.log('6s')
                    //   dispatch('lt_updateBetRecord')      //获取我的投注
                    // }, 6000)

                    this.timer2 = setTimeout(()=>{
                      dispatch('lt_updateBetRecord')      //获取我的投注
                      wait4Results = 0
                      wait4BetRecord = false
                    }, (11 + randomFeed) * 1000)
                  }
                }
              } 
            }

            // 计算倒计时
            function computeCountdown(issueNo, _SerTime){
              var _issue = state.LotteryPlan[state.IssueNo % state.PlanLen]
                  ,isCrossDay = (_issue.Start > _issue.End) && (_SerTime > _issue.Start)  //本期跨天,且当前时间大于End
                  ,isOutOfIssue = state.IssueNo === state.PlanLen                       //如果现在不在任何期内
                  ,needAddOneDay = isCrossDay || isOutOfIssue

              var Countdown = state.LotteryPlan[state.IssueNo % state.PlanLen].End
                              +needAddOneDay * DAY_TIME
                              -_SerTime;

              return Countdown
            }

            // 更新倒计时文字
            function updateTimeBar(Countdown, code){
              if (code==1301) {
                Countdown-=300 //封单时长5分钟
                if (Countdown<0) {
                  commit('lt_stopSell', 2)   //当期封单
                  return
                }
              }
              if(Countdown>600 && code !== '1301'){
                commit('lt_updateTimeBar', '预售中')//如果Countdown大于10分钟，则进入预售
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
            }
          },
          //获取我的投注
          lt_updateBetRecord:({state, rootState, commit, dispatch})=>{
            // _fetch({Action: 'GetBetting'}).then((json)=>{
            //   if(json.Code === 1){
            //     var betting = json.Data
            //     commit('lt_setBetRecord', betting)
            //   }
            // })
          },
          //获得返点
          lt_getRebate:({state, rootState, commit, dispatch}, notUseLocal)=>{
            var type = state.lottery.LotteryType
            var _rebate = localStorage.getItem(`Rebate${type}`)
            _rebate = JSON.parse(_rebate)
            // var _rebate = rootState['Rebate' + type]

            // 不使用本地返点
            if(notUseLocal){
              _rebate = null
            }

            // 没有返点就重新拉取返点数据
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

                  // 更新号码篮里的返点信息
                  state.basket.forEach(bet=>{
                    bet.setRebate(json.BackData.Rebate, rootState)
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
            if(this.IsStop){
              return
            }
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
                scrollTop()  //滚动复原

                //投注后自己添记录到“我的投注里”
                var totalMoney = _basket.map(bet=>bet.betting_money).reduce((a,b)=>a+b)  //本注总金额
                var issueNo = _basket[0].betting_issuseNo                                  //期号
                var _betRecord = state.BetRecord.slice(0)
                var record = {issueNo: issueNo, normal_money:totalMoney.toFixed(2), openState: '等待开奖'}
                _betRecord.unshift(record)
                if(_betRecord.length > 5){
                  _betRecord.length = 5
                }

                commit('lt_setBetRecord', _betRecord)

                // //隔3s获取我的投注
                // this.timer3 = setTimeout(()=>{
                //   dispatch('lt_updateBetRecord')
                // }, 3000)

                layer.confirm(`<span style = "color:red">投注成功</span>，您可以在我的账户查看注单详情`,['继续投注','查看注单'], ()=>{},()=>{this.$router.push('/userCenter')})
              }else if(json.Code === -9){
                //清除rebate
                layer.alert(json.StrCode)
                this.$store.dispatch('lt_getRebate', true)
              }else{
                layer.msgWarn(json.StrCode)
              }
            })
          },
          // 新彩种的投注接口
          lt_confirmBet1:({state, rootState, commit, dispatch}, {basket, success})=>{
            if(this.IsStop){
              return
            }
            layer.msgWait('正在投注')
            _fetch({
              'Action':'AddBetting',
              'data': {BettingData:basket}
            }).then((json)=>{
              if(json.Code === 1){
                layer.msg(json.StrCode)
                commit('lt_clearBet')
                commit('lt_clearBasket')
                commit('lt_changeBox', '')
                scrollTop()  //滚动复原

                //投注后自己添记录到“我的投注里”
                var totalMoney = basket.map(bet=>bet.betting_money).reduce((a,b)=>a+b)  //本注总金额
                var issueNo = basket[0].betting_issuseNo                                  //期号
                var _betRecord = state.BetRecord.slice(0)
                var record = {issueNo: issueNo, normal_money:totalMoney.toFixed(2), openState: '等待开奖'}
                _betRecord.unshift(record)
                if(_betRecord.length > 5){
                  _betRecord.length = 5
                }

                commit('lt_setBetRecord', _betRecord)

                success()

                // //隔3s获取我的投注
                // this.timer3 = setTimeout(()=>{
                //   dispatch('lt_updateBetRecord')
                // }, 3000)

                layer.confirm(`<span style = "color:red">投注成功</span>，您可以在我的账户查看注单详情`,['继续投注','查看注单'], ()=>{},()=>{this.$router.push('/userCenter')})
              }else if(json.Code === -9){
                //清除rebate
                layer.alert(json.StrCode)
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
                code = state.lottery.LotteryCode,
                issueStr, power, money, issueNo

            for(var i = 0, len = state.chaseConf.buy_count; i < len;i++){
              issueNo = state.IssueNo + i
              issueStr = computeIssue(code, issueNo, true)
              power = state.chaseConf.power
              money = (basketTotal * state.chaseConf.power).toFixed(4) * 1
              scheme.push(new Scheme(issueStr, power, money))
            }

            commit('lt_setScheme', scheme)
          },
          // 追号投注
          lt_chase:({state, rootState, commit, dispatch})=>{
            if(this.IsStop){
              return
            }
            layer.msgWait('正在投注')
            _fetch({
              Action: 'AddChaseBetting',
              data: new ChaseAjax(rootState)
            }).then((json)=>{
              if(json.Code === 1){
                layer.msg(json.StrCode)
                commit('lt_clearBet')            //清空bet
                commit('lt_clearBasket')        //清空basket
                commit('lt_changeBox', '')      //将所有弹出框关闭
                scrollTop()
                commit('lt_setScheme', [])      //清空scheme
                // commit('lt_setChasePower', 1)    //清空追号配置
                // commit('lt_setChaseIssue', 1)
                commit('lt_setIsChase', false)  //追号成功后，变成普通投注

                // //隔3s获取我的投注
                // this.timer4 = setTimeout(()=>{
                //   dispatch('lt_updateBetRecord')
                // }, 3000)

                layer.confirm(`<span style = "color:red">投注成功</span>，您可以在我的账户查看注单详情`,['继续投注','查看注单'], ()=>{},()=>{this.$router.push('/userCenter')})
              }else if(json.Code === -9){
                //清除rebate
                layer.alert(json.StrCode)
                this.$store.dispatch('lt_getRebate', true)
              }else{
                layer.msgWarn(json.StrCode);
              }
            })
          }
        }
      }


      /**
       * 彩种模块执行入口
       */

      //注册彩种模块 --lt
      this.$store.state.lt || this.$store.registerModule('lt', lt)
      Vue.set(store.state.lt,'ptype',this.ptype)
      Vue.set(store.state.lt,'that',this)
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

      var type = this.ltype
      var rebate = localStorage.getItem(`Rebate${type}`)
      if(rebate){
        rebate = JSON.parse(rebate)
        this.$store.commit({
          type:'lt_setRebate',
          rebate: rebate,
          LotteryType: type
        })
      }else{
        console.log('返点不存在')
      }

      //获取返点
      // this.$store.dispatch('lt_getRebate')
      //每隔1s调用一次refresh
      this.baseLoop = setInterval(()=>{
        this.$store.dispatch('lt_refresh')
      },1000)
    },
    data(){
      return {
        ptype:'',  //live
        ltype:'',  //SSC、K3、11X5
        lcode:'',  //彩种code
        timer1:null,
        timer2:null,
        timer3:null,
        timer4:null,
        baseLoop:null,
        WS:{
          GameStatus:null,
          Newest:null,
          NewGame:null,
          GameResult:null,
          TimeLeft:'',
          Status:''
        },
        GameConfig:null,
        GiftConfig:null,
        GameWS:null,
        OnlineWS:null,
        isSleep:0,
        readySleep:'',
        readyRun:''
      }
    },
    computed:{
      IsStop(){
        console.log('============== 判断 ===============',state.lt.TimeBar[0])
        //判断是否不可提交订单,并弹出警告
        return ('0123456789预等'.search(state.lt.TimeBar[0])===-1)&&layer.msgWarn(state.lt.TimeBar)
      },
    },
    methods:{
      //点击页面其他部分关闭所有盒子
      closeBox(){
        store.commit('lt_changeBox', '')
      },
      setDefaultMode(){
        var defaultMode = {
          'SSC':['一星','定位胆'],
          'SYX5':['三码', '三码'],
          'FC3D':['三星', '直选'],
          'PL35':['三星', '直选'],
          'KL8':['任选', '普通玩法'],
          'PK10':['定位胆', '标准'],
          '6HC': ['特码', '特码']
        }

				if(this.ltype !== 'K3'){
					var _group, _subGroup
				  _group = defaultMode[this.ltype][0]			//默认的玩法群
				  _subGroup = defaultMode[this.ltype][1]		//默认的玩法组
	  			store.commit('lt_changeMode', state.lt.config[_group][_subGroup][0])
				}else{
					store.commit('lt_changeMode', state.lt.config[0])
				}
			},
      createWS(){
        //创建livews
        this.GameWS = new WebSocket(this.GameConfig.GameWS)
        this.GameWS.onmessage = e =>{
          let json
          try{
            json = JSON.parse(e.data)
          }catch(e){
            layer.msgWarn('服务器类型错误')
          }
          this.WSrefresh(json)
        }
        this.GameWS.onerror = err =>{
          layer.msgWarn(err)
        }
        //创建OnlineWS
        this.OnlineWS = new WebSocket(this.GameConfig.OnlineWS)
        this.OnlineWS.onmessage = e =>{
          console.log(e.data)
        }
        this.OnlineWS.onerror = err =>{
          layer.msgWarn(err)
        }
        //自动提交礼物和弹幕
        this.autoTest()
      },
      autoTest(){

        var barrages = [
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
            text:'弹幕内容1',
          },
          {
            call:'VIP2',
            name:'邓紫棋',
            text:'买定离手',
          },
          {
            call:'VIP3',
            name:'周杰伦',
            text:'稳住，我们能赢',
          },
          {
            call:'VIP4',
            name:'杰森斯坦森',
            text:'登顶盈利榜',
          },
          {
            call:'VIP5',
            name:'金三胖',
            text:'这把一定中',
          },
          {
            call:'VIP6',
            name:'特朗普',
            text:'中中中',
          },
          {
            call:'VIP7',
            name:'奥巴马',
            text:'豹子 豹子',
          },
        ]
        var getRedom = ()=>{
          let num = 0
          while(1){
            num = Math.random()*10
            if (num>=2 && num < 4) {
              num = Math.floor(num*10)
              return num
              break
            }
          }
        }
        var num = getRedom()*1000
        var barrageNum = Math.floor(Math.random()*10)
        setTimeout(()=>{
          
          // var fetchUrl = (url,data)=>{
          //   var str=[],k
          //   for(var i in data){
          //     k=data[i];
          //     if (typeof(k)==="object") {
          //       k= encodeURIComponent(JSON.stringify(k));
          //     }
          //     str.push(i+'='+k)
          //   }
          //   str=str.join('&')
          //   return new Promise(function(resolve, reject){
          //     fetch(url,{
          //       credentials:'same-origin',
          //       method: 'POST',
          //       headers: {
          //         "Content-Type": "application/x-www-form-urlencoded"
          //       },
          //       body: str
          //     })
          //     .then(function (d){
          //       if(d.status === 200){
          //         console.log(d)
          //         d.json().then(d=>{
          //           if(d){
          //             resolve(d)
          //           }else{
          //             resolve('数据获取失败！')
          //           }
          //         })
          //         .catch(err=>{
          //           alert("数据解析失败！"+err)
          //         })
          //       }else{
          //         tool.catchFetch(d)
          //       }
          //     })
          //     .catch(err=>{
          //       alert('请求失败!'+err)
          //     })
          //   })
          // }
          // fetchUrl('http://47.52.166.234:38889/interactive/469D5742F4F09F35DA7E692D41BE11E3',{
          //   content:{
          //     "Target":"dafa-test",
          //     "GameID":"0101",
          //     "Data":{
          //       "Type":"xxx",
          //       "LV":-1,
          //       "Interval":30
          //     }
          //   }
          // })
          //生成礼物
          let gifts = ['airplane','boat','cannon','ferrari','cuke','porsche','money']
          let who = null
          while(1){
            who = Math.random()*10
            who = Math.floor(who)
            if (who < 7) {
              break
            }
          }

          console.log('送出的礼物是：',gifts[who])
          this.OnlineRefresh({type:'Gift',gift:gifts[who],username:'杨过',img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2764371306,3467823016&fm=27&gp=0.jpg'})
          this.OnlineRefresh(Object.assign({type:'Barrage'},barrages[barrageNum]))
          this.autoTest()
        },num)
      },
      OnlineRefresh(json){
        console.log(json)
        switch(json.type){
          case 'Gift':this.$refs.newk3.giftPush(json);break;
          case 'Barrage':this.$refs.newk3.barragePush(json);break;
        }
      },
      WSrefresh(json){
        this.WS[json.type] = json.result
        this.WS.Status = json.type
        console.log(json.type)
        switch(json.type){
          case 'Newest':this.statusNewest(json.result);break;
          case 'GameStatus':this.statusGameStatus(json.result);break;
          case 'NewGame':this.statusNewest(json.result);break;
          case 'GameResult':this.statusGameResult(json.result);break;
          case 'Previous':this.statusPrevious(json.result);break;
        }
      },
      statusNewest(n){
        if ((new Date().getTime() - state.Difftime) > n.end) {
          store.commit('lt_stopSell', 3)
          if (n.record_result) {
            store.commit({
              type:'lt_setOnceLotteryResult',
              code:this.lcode,
              results: {
                IssueNo:n.record_code,
                LotteryOpen:this.formatResult(n.record_result),
                OpenTime:''
              }
            }) 
          }
        }else{
          console.log('正在投注')
          Vue.set(state.lt, 'NowIssue', n.record_code)
          this.$store.dispatch('lt_refresh')
        }
        Vue.set(state.lt, 'StopTime', n.end)
      },
      statusGameStatus(n){
        store.commit('lt_stopSell', 3)
        var _status = n.status
        switch(_status){
          case 'readySleep':this.readySleep = n.ready_time;break;
          case 'sleeping':this.isSleep = 1;break;
          case 'readyRun':this.readyRun = n.ready_time;break;
          case 'running':this.isSleep = 0;break;
        }
      },
      statusGameResult(n){
        Vue.set(state.lt.WS, 'openNum', n.record_result)
        store.commit({
          type:'lt_setOnceLotteryResult',
          code:this.lcode,
          results: {
            IssueNo:n.record_code,
            LotteryOpen:this.formatResult(n.record_result),
            OpenTime:''
          }
        })
        store.commit('lt_displayResults', false)
        store.commit('lt_stopSell', 3)
        console.log('watch:已开奖')
      },
      statusPrevious(n){
        console.log('once前一期的开奖记录',n)
        store.commit({
          type:'lt_setOnceLotteryResult',
          code:this.lcode,
          results: {
            IssueNo:n.record_code,
            LotteryOpen:this.formatResult(n.record_result),
            OpenTime:''
          }
        })
      },
      formatResult(n){
        let newresult = ''
        for (var i = 0; i < n.length; i++) {
          newresult +=n[i]+','
        }
        return newresult = newresult.substring(0,newresult.length-1)
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
	  beforeRouteLeave(to, from, next){
	    //离开页面前将每注金额重设为 PERBET (2元)
	    if(store.state.lt){
		    store.commit('lt_setPower', 1)
		    store.commit('lt_setPerbet', PERBET)
		    store.commit('lt_setUnit', 1)
		    store.commit('lt_clearBet')
		    store.commit('lt_clearBasket')
		    store.commit('lt_setScheme', [])
		    store.commit('lt_setChasePower', 1)		//清空追号配置
				store.commit('lt_setChaseIssue', 1)
	    }
      if (this.GameWS !== null) {
        this.GameWS.close()
      }
      if (this.OnlineWS !== null) {
        this.OnlineWS.close()
      }
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
