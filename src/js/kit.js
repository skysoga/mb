import Vue from 'vue'
var bus = new Vue()     //空vue用来做事件管理
var DAY_TIME = 24 * 60 * 60 * 1000
var HOUR_TIME = 60 * 60 * 1000
var MINUTE_TIME = 60 * 1000
var SECOND_TIME = 1000
var GMT_DIF =new Date().getTimezoneOffset()*60*1000
var PERBET = 2    //每注2元
var Max_Rate =10000   //最大倍数
var Max_Chase_Issue = 50  //追号最大期数
var Max_Expect_Rate = 20000 //追号最大预期盈利率限制
var BASE_ISSUE_1406 = 52596+1 //北京快三基准期

//阶乘
var factorial = (function(){
  var cache = {};
  return function(n){
    if(cache[n]){
      return cache[n];
    }else{
      if(n < 0)return false;
      if(n === 0) return  1;
      if(n === 1){
        return 1;
      }else{
        cache[n] = n * factorial(n-1);
        return cache[n];
      }
    }
  }
})()

//分步计数
var mul = (function(){
  var cache = {};
  return function(len, arr){
    if(arr.length < len) return 0;
    var s = 1;
    var index = arr.join(' ');
    if(cache[index]){
      return cache[index];
    }else{
      if(arr.length){
        for(var i = 0;i < arr.length;i++){
          s *= arr[i];
        }
      }
      cache[index] = s;
      return cache[index];
    }
  }
})()

//组合
var C = (function(factorial){
  var cache = {};
  return function(m,n){
    if(m < n){return 0};
    if(m === n){return 1};
    var index = [m,n].join(' ');
    if(cache[index]){
      return cache[index]
    }else{
      cache[index] = factorial(m)/(factorial(n) * factorial(m - n))
      return cache[index];
    }
  }
})(factorial)

//有去重要求的
function combNoRepeat(singleArr, combArr, n){
  var common = [], notcommon = [];

  for(var i = 0,len = singleArr.length;i < len;i++){
    var item = singleArr[i];
    if(combArr.indexOf(singleArr[i]) === -1){
      notcommon.push(item);
    }else{
      common.push(item)
    }
  }

  var a = common.length,
      b = notcommon.length,
      m = combArr.length;

  return a * C(m-1, n) + b * C(m, n);
}

function unique(arr){
  var hashTable = {}, newArr = [];
  for(var i = 0;i < arr.length;i++){
    if(!hashTable[arr[i]]){
      hashTable[arr[i]] = true;
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

function loop3(arr,fn){
  var l = arr.length;
  for(var i = 0;i < l;i++){
    for(var j = 0;j < l;j++){
      for(var k = 0;k < l;k++){
        fn([i,j,k])
      }
    }
  }
}

function loop2(arr,fn){
  var l = arr.length;
  for(var i = 0;i < l;i++){
    for(var j = 0;j < l;j++){
      fn([i,j])
    }
  }
}

var normalSum3 = (function(){
  var base = [0,1,2,3,4,5,6,7,8,9];
  var cache = {};
  return function(n){
    if(cache[n]){
      console.log('有缓存啦')
      return cache[n]
    }

    //三重循环
    loop3(base, function(arr){
      var s = 0;
      for(var i = 0;i < arr.length;i++){
        s += base[arr[i]]
      }
      var str = arr.join('')

      if(cache[s]){
        cache[s].push(str);
      }else{
        cache[s] = [str];
      }
    })

    for(var item in cache){
      cache[item] = cache[item].length;
    }

    return cache[n];
  }
})()

//直选和值2
var normalSum2 = (function(){
  var base = [0,1,2,3,4,5,6,7,8,9];
  var cache = {};
  return function(n){
    if(cache[n]){
      console.log('有缓存啦')
      return cache[n]
    }

    //三重循环
    loop2(base, function(arr){
      var s = 0;
      for(var i = 0;i < arr.length;i++){
        s += base[arr[i]]
      }
      var str = arr.join('')

      if(cache[s]){
        cache[s].push(str);
      }else{
        cache[s] = [str];
      }
    })

    for(var item in cache){
      cache[item] = cache[item].length;
    }

    return cache[n];
  }
})()

//跨度3
var diff3 = (function(){
  var base = [0,1,2,3,4,5,6,7,8,9];
  var cache = {};
  return function(n){
    if(cache[n]){
      console.log('有缓存啦')
      return cache[n]
    }

    loop3(base, function(arr){
      var max = Math.max.apply({}, arr);
      var min = Math.min.apply({}, arr);
      var diff = max - min;
      var str = arr.join('');
      if(cache[diff]){
        cache[diff].push(str)
      }else{
        cache[diff] = [str]
      }
    });

    for(var item in cache){
      cache[item] = cache[item].length;
    }

    return cache[n];
  }
})()

//跨度2
var diff2 = (function(){
  var base = [0,1,2,3,4,5,6,7,8,9];
  var cache = {};
  return function(n){
    if(cache[n]){
      console.log('有缓存啦')
      return cache[n]
    }

    loop2(base, function(arr){
      var max = Math.max.apply({}, arr);
      var min = Math.min.apply({}, arr);
      var diff = max - min;
      var str = arr.join('');
      if(cache[diff]){
        cache[diff].push(str)
      }else{
        cache[diff] = [str]
      }
    });

    for(var item in cache){
      cache[item] = cache[item].length;
    }

    return cache[n];
  }
})()

var combSum3 = (function(){
  var base = [0,1,2,3,4,5,6,7,8,9];
  var cache = {};
  return function(n){
    if(cache[n]){
      console.log('有缓存啦')
      return cache[n]
    }

    //三重循环
    loop3(base, function(arr){
      if(arr.some(function(item){return item !== arr[0]})){     //只要数组不全等
        var s = 0;
        for(var i = 0;i < arr.length;i++){
          s += base[arr[i]]
        }
        var tmpArr = arr.sort(function(a, b){return a-b});
        var str = tmpArr.join('');

        if(cache[s]){
          if(cache[s].indexOf(str) === -1){
            cache[s].push(str)
          }
        }else{
          cache[s] = [str]
        }

      }
    })

    for(var item in cache){
      cache[item] = cache[item].length;
    }

    return cache[n];
  }
})()

//组选和值2
var combSum2 = (function(){
  var base = [0,1,2,3,4,5,6,7,8,9];
  var cache = {};
  return function(n){
    if(cache[n]){
      console.log('有缓存啦')
      return cache[n]
    }

    //二重循环
    loop2(base, function(arr){
      if(arr.some(function(item){return item !== arr[0]})){     //只要数组不全等
        var s = 0;
        for(var i = 0;i < arr.length;i++){
          s += base[arr[i]]
        }
        var tmpArr = arr.sort(function(a, b){return a-b});
        var str = tmpArr.join('');

        if(cache[s]){
          // console.log(cache[s])
          if(cache[s].indexOf(str) === -1){
            cache[s].push(str)
          }
        }else{
          cache[s] = [str]
        }

      }
    })

    for(var item in cache){
      cache[item] = cache[item].length;
    }

    return cache[n];
  }
})()

function accumulate(arr, fn){
  var s = 0;
  for(var i = 0;i < arr.length;i++){
    s += fn(arr[i]);
  }
  return s;
}

//复制对象，仅复制字符串
function easyClone(obj){
  var newObj = {};
  for(var item in obj){
    if(typeof item === 'string'){
      newObj[item] = obj[item];
    }
  }

  return newObj;
}

function BaseBet(state,count, betStr){
  var lt = state.lt,
      bet = state.lt.bet,
      _count = count || bet.betting_count,
      _betStr = betStr || bet.betting_number

  this.lottery_code = lt.lottery.LotteryCode                     //彩种
  this.play_detail_code = lt.lottery.LotteryCode + lt.mode.mode  //玩法code
  this.betting_number = _betStr                       //投注号码

  this.betting_count = _count                         //这个方案多少注
  if(lt.lottery.LotteryCode.indexOf('14') > -1 && lt.mode.mode === 'A10'){
    this.betting_money = +(lt.perbet * bet.betting_model * bet.graduation_count).toFixed(2)
  }else{
    this.betting_money = +(lt.perbet * _count * bet.betting_model * bet.graduation_count).toFixed(2)
  }

  this.betting_point = lt.award + '-' + lt.Rebate[lt.lottery.LotteryType]            //赔率
  this.betting_model = bet.betting_model                   //元角分
  this.betting_issuseNo = lt.NowIssue                  //当前期号
  this.graduation_count = bet.graduation_count                //当前倍率
  this.compress = bet.compress                            //压缩字符串
}

BaseBet.prototype.power2one = function(state){
  this.graduation_count = 1
  this.betting_money = +(state.lt.perbet * this.betting_count * this.betting_model * this.graduation_count).toFixed(2)
}

BaseBet.prototype.setRebate = function(rebate, state){
  var lt = state.lt
  this.betting_point = rebate + '-' + lt.Rebate[lt.lottery.LotteryType]
}

BaseBet.prototype.setPower = function(power, state){
  this.graduation_count = power
  this.betting_money = +(state.lt.perbet * this.betting_count * this.betting_model * this.graduation_count).toFixed(2)
}

//生成追号的ajax
function ChaseAjax(state){
  var conf = state.lt.chaseConf,
      lt = state.lt

  this.before_issueNo = conf.before_issueNo;
  this.before_eamings_cash = conf.before_eamings_cash;
  this.after_eamings_cash = conf.after_eamings_cash;
  this.before_earnings_rate = conf.before_earnings_rate;
  this.after_earnings_rate = conf.after_earnings_rate;
  this.isstop_afterwinning = +conf.isstop_afterwinning;

  this.start_issueNo = lt.NowIssue;       //开始的期号
  this.lottery_code = lt.lottery.LotteryCode;           //玩法类型

  this.chase_money = statistics()[1] * 1;     //总共多少钱
  this.buy_count = conf.buy_count;            //追多少期

  this.betting = deleteCompress(lt.basket, true)    //有压缩
  this.shceme = lt.scheme;
}

function Scheme(issueStr, power, money){
  this.issueNo = issueStr
  this.graduation_count = power
  this.money = money
}

//获得方案列表中的总注数
function getBasketAmount(){
  var totalNum = 0, totalMoney = 0, basket = state.lt.basket
  for(var i = 0, len = basket.length; i < len;i++){
    var el = basket[i]
    totalNum += el.betting_count
    totalMoney += el.betting_money
  }
  return [totalNum, totalMoney];
}

//统计总的注数和金额--根据当前的scheme去计算
function statistics(){
  var lt = state.lt,
      basket = lt.basket,
      scheme = lt.scheme,
      len = scheme.length

  var totalBet = len *  getBasketAmount(basket)[0];  //总的注数 = 期数 *  每期注数
  var totalMoney = 0;     //总的金额  = 每期金额累加
  for(var i = 0; i < len; i++){
    totalMoney += scheme[i].money;
  }

  totalMoney = totalMoney.toFixed(2);
  return [totalBet, totalMoney];
}


function deleteCompress(basket, ifChase){
  return basket.map(function(item){
              var cloneItem = easyClone(item);
              if(cloneItem.compress){
                cloneItem.betting_number = cloneItem.compress;
              }

              if(ifChase){
                delete cloneItem.betting_issuseNo
                delete cloneItem.graduation_count
              }


              delete cloneItem.compress;
              return cloneItem;
          })
}

function compress(source){
  source = unique(source.map(function(item){return +item})).sort(function(a,b){return a-b})
  //如果只有一注，直接返回
  if(source.length < 2){
    return source.toString();
  }
  var baseNum = source[0]
  var diff = [];
  for(var i = 1;i < source.length;i++){
    diff.push(source[i] - source[i-1]);
  }
  var diffC = diffConti(diff);
  diffC.unshift(baseNum);
  return diffC.join(',');

  function diffConti(arr){
    var res = []
    var start
    var count = 0
    var last = arr.length - 1
    for(var i = 0;i < arr.length;i++){
      if(!start){
        if(arr[i] !== 1){
          start = arr[i]
          if(count){
            var item = 'K' + count
            res.push(item)
            count = 0
          }

          if(i === last){
            res.push(arr[i] + '')
          }
        }else{
          count++
          if(i ===  last){
            var item = 'K' + count
            res.push(item)
          }
        }
      }else{
        if(arr[i] !==1){
          var item = count ? (start + 'K' + count) : start + '' ;
          res.push(item);
          if(i === last){
            res.push(arr[i] + '')
          }
          start = arr[i];
          count = 0;
        }else{
          count++;
          if(i === last){
            var item = start ? (start + 'K' + count) : 'K' + count;
            res.push(item)
          }
        }
      }
    }
    return res;
  }
}

var throttle = function(delay){
  var timer = null;
  var count = 0;
  return function(fn){
    if(!timer){
      timer = setTimeout(function(){
        fn();
        count++;
        clearTimeout(timer);
        timer = null;
      }, delay);
    }
  }
}(400)

//根据传入的code,和彩种index来返回 期号字符串
function computeIssue(code, index){
  var days    //和当前期差几天
      ,_index  //那一天的第几期
      ,dateStr    //日期字符串

  if(!state.lt.PlanLen)return
  days = Math.floor(index/state.lt.PlanLen)
  _index = index - days * state.lt.PlanLen;
  //这里挂各特殊彩种的处理函数--有返回的直接出返回结果。不参与下一步
  var handler = {
    '1001':function(){
      // (_index > 84) && days--
    },
    //北京快三，以某一期作为基准
    '1406':()=>{
      var data = state.lt.Todaystr.replace(/^(\d{4})(\d{2})(\d{2})$/,'$1/$2/$3');
      return '0'+(Math.floor((Date.parse(data)-Date.parse("2016/8/1"))/DAY_TIME)*89+ BASE_ISSUE_1406 + index);
    }
  }

  //计算期号字符串
  var handleResult
  handler[code] && (handleResult = handler[code]())   //特殊彩种的特殊处理

  if(handleResult){
    return handleResult
  }else{
    if(days){
      var todayTime = new Date(state.lt.Todaystr.replace(/(\d{4})(\d{2})(\d{2})/,"$1/$2/$3")).getTime();
      dateStr = new Date(todayTime + days * DAY_TIME).format('yyyyMMdd');
    }else{
      dateStr = state.lt.Todaystr;
    }
    return dateStr + state.lt.LotteryPlan[_index].IssueNo
  }
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

function getK3Rebate(mode, Odds){
  for(var i = 0;i < Odds.length;i++){
    if(Odds[i].PlayCode === mode){
      if(Odds[i].Bonus.indexOf(',') > -1){
        return Odds[i].Bonus.split(',')
      }else{
        return Odds[i].Bonus
      }
    }
  }
}
function getRebate(mode, Odds){
  for(var i = 0;i < Odds.length;i++){
    if(Odds[i].PlayCode === mode){
      return Odds[i].Bonus
    }
  }
}


export {factorial, mul, C, combNoRepeat, unique, normalSum2,
  normalSum3, accumulate,diff2, diff3, combSum2, combSum3,
   bus, BaseBet, compress, throttle, easyClone, ChaseAjax,
    deleteCompress, Scheme, getBasketAmount,computeIssue,
    getSSCRebate,getK3Rebate,getRebate, DAY_TIME, HOUR_TIME, MINUTE_TIME, SECOND_TIME,
  GMT_DIF, PERBET,Max_Rate, Max_Chase_Issue, Max_Expect_Rate, BASE_ISSUE_1406}
