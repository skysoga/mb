import Vue from 'vue'
var bus = new Vue()     //空vue用来做事件管理
var DAY_TIME = 24 * 60 * 60 * 1000
var HOUR_TIME = 60 * 60 * 1000
var MINUTE_TIME = 60 * 1000
var SECOND_TIME = 1000
// var GMT_DIF =new Date().getTimezoneOffset()*60*1000
var GMT_DIF = -8 * 60 *60*1000
var PERBET = 2    //每注2元
var Max_Rate =10000   //最大倍数
var Max_Chase_Issue = 50  //追号最大期数
var Max_Expect_Rate = 20000 //追号最大预期盈利率限制
var BASE_ISSUE_1406 = 52586+1-7*89 //北京快三基准期

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

  this.betting_point = lt.lottery.LotteryType!=='K3'?(lt.award.split(',')[0] + '-' + lt.Rebate[lt.lottery.LotteryType]):(lt.award + '-' + lt.Rebate[lt.lottery.LotteryType])           //赔率

  this.betting_model = bet.betting_model                   //元角分
  this.betting_issuseNo = lt.NowIssue                      //当前期号
  this.graduation_count = bet.graduation_count             //当前倍率
  this.compress = bet.compress                             //压缩字符串
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

BaseBet.prototype.clearCompress = function(){
  this.compress = ''
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
function computeIssue(code, index, isChase){
  var days    //和当前期差几天
      ,_index  //那一天的第几期
      ,dateStr    //日期字符串
      ,_SerTime = (new Date().getTime()- state.Difftime - GMT_DIF) % DAY_TIME

  if(code !== '1301'){
    if(!state.lt.PlanLen)return
    days = Math.floor(index/state.lt.PlanLen)
    _index = index - days * state.lt.PlanLen;

    //跨期的处理
    var firstIssue = state.lt.LotteryPlan[0]
    if((firstIssue.End < firstIssue.Start) && (firstIssue.Start < _SerTime)){
      days++
    }
  }

  //一天一期，20点开
  function oneDayOneIssue(baseIssue, dateStr){
    return function(){
      var data = state.lt.Todaystr.replace(/^(\d{4})(\d{2})(\d{2})$/,'$1/$2/$3');
      var dayDiff = Math.floor((Date.parse(data)-Date.parse(dateStr))/DAY_TIME) //相差天数
      var needAddOne = +(_SerTime > 72000000)  //八点开
      // console.log(needAddOne, _SerTime, _SerTime-72000000)
      var issueStr = ('00' + (dayDiff + baseIssue + needAddOne + index)).slice(-3)
      return data.slice(0,4) + issueStr
    }
  }

  //基于固定期
  function basedOnFixedIssue(baseIssue, dateStr, planLen, zeroCount){
    if(!zeroCount)zeroCount = 0
    return function(){
      var data = state.lt.Todaystr.replace(/^(\d{4})(\d{2})(\d{2})$/,'$1/$2/$3');
      //补零
      var zero = ''
      for(var i = 0;i < zeroCount;i++){
        zero += '0'
      }
      return zero + (Math.floor((Date.parse(data) - Date.parse(dateStr)) / DAY_TIME) * planLen + baseIssue + index);
    }
  }

  //这里挂各特殊彩种的处理函数--有返回的直接出返回结果。不参与下一步----每年过年前更新一次
  var handler = {
    '1001':function(){
      if(isChase && days){
        days--
      }else if(_index >= 83 && _SerTime <= state.lt.LotteryPlan[state.lt.PlanLen - 1].End){
        days--
      }
      // //新疆时时彩跨天的处理
      // if(_index >= 83 && _SerTime <= state.lt.LotteryPlan[state.lt.PlanLen - 1].End){
      //   days--
      // }
    },
    //北京快三，以某一期作为基准
    '1406':basedOnFixedIssue(68606+1, "2017/2/4", 89, 1),
    //北京快乐8,以某一期作为基准
    '1302':basedOnFixedIssue(807929-19, "2017/2/18", 179),
    //PK10,以某一期作为基准
    '1303':basedOnFixedIssue(602501-20, "2017/2/18", 179),

    //福彩3D：每天一期
    '1201':oneDayOneIssue(33, "2017/2/9"),
    //排列3：每天一期
    '1202':oneDayOneIssue(33, "2017/2/9"),
    '1301':function(){
      var dateStr = new Date().getFullYear().toString()
      var issueNo = ('0' + index).slice(0,3)
      return dateStr + issueNo
    }
  }

  //计算期号字符串
  var handleResult
  handler[code] && (handleResult = handler[code]())   //特殊彩种的特殊处理

  //有返回结果，则输出返回结果。没返回结果则正常计算
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

  // 一个彩种中有两个赔率的
  var specialMode = ['F21','F24','F25','E21','E24','E25','D21','D24','D25']

  var rebateSSC = Odds
  for(var i = 0;i < rebateSSC.length;i++){
    if(rebateSSC[i].PlayCode === mode){
      var bonus = rebateSSC[i].Bonus

      if(specialMode.indexOf(mode) > -1){
        var half = ((+bonus)/2).toFixed(2)
        return bonus + ',' + half
      }else{
        return bonus
      }
    }
  }
}

// function getK3Rebate(mode, Odds){
//   for(var i = 0;i < Odds.length;i++){
//     if(Odds[i].PlayCode === mode){
//       if(Odds[i].Bonus.indexOf(',') > -1){
//         return Odds[i].Bonus.split(',')
//       }else{
//         return Odds[i].Bonus
//       }
//     }
//   }
// }

function getMultipleRebate(mode, Odds){
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


// function getRebate(mode, Odds){
//   for(var i = 0;i < Odds.length;i++){
//     if(Odds[i].PlayCode === mode){
//       return Odds[i].Bonus
//     }
//   }
// }


function syx5_zx2(line1, line2){
  var count = 0
  for(var i = 0;i < line1.length;i++){
    for(var j = 0;j < line2.length;j++){
      if(line1[i] !== line2[j]){
        count++
      }
    }
  }
  return count
}


var countSingle = (order,tmp)=>betSum(order,tmp)[0]  //单行计数
//获得每个框的号码的数目
function betSum(order, tmp){
  var arr = [];
  for(var i = 0;i < order.length;i++){
    arr.push(tmp[order[i]].length)
  }
  return arr;
}

function createStringArray(start, end){
  var result = []
  for(var i = start;i <= end;i++){
    var item = ('0' + i).slice(-2)
    result.push(item)
  }
  return result
}

/**
 * [_random 获得机选数组]
 * @param  {[type]} cfgArr    [配置数组]
 * @param  {[type]} canRepeat [是否允许跨行重复，单行肯定不能重复的]
 * @param  {[type]} baseArr   [基础数组]
 * @return {[type]}           [返回一个层级数组]
 */
function _random(cfgArr, canRepeat, baseArr){
  var len = cfgArr.length,  //有几行
      res = [],             //结果数组
      feeds = baseArr.slice(0) //基础数组的拷贝

  for(var i = 0;i < len;i++){
    var lineLen = cfgArr[i],    //每行要获取的随机数个数
        lineRes = [],           //每行的结果数组
        _feeds = canRepeat ? feeds.slice(0) : feeds  //每行的数据源

    for(var j = 0;j < lineLen;j++){
      var feed = Math.floor(Math.random() * _feeds.length)  //随机索引
      lineRes.push(_feeds[feed]) //添加到每一行的结果数组中
      _feeds.splice(feed, 1)     //从源数组中剔掉一个，保证单行不会出现重复
    }

    lineRes = lineRes.sort((a,b)=>a-b)   //对每一行的结果数组进行排序
    res.push(lineRes)
  }
  return res
}

var _0to9 = [0,1,2,3,4,5,6,7,8,9],
    _dsds = ['大', '小', '单', '双'],
    // filters = ['全', '大', '小', '奇', '偶', '清'],
    _0to27 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27],
    _1to26 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],
    _0to18 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
    _1to17 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
    _syx5 = ['01','02','03','04','05','06','07','08','09','10','11'],
    _pk10 = ['01','02','03','04','05','06','07','08','09','10']

// 给出0-(n-1)的随机数
var oneRandom = (n)=>Math.floor(Math.random() * n)

// 一星
function oneStar(){
   var line =  Math.floor(Math.random() * 5)
   var res = []
   for(var i = 0;i < 5;i++){
    var lineRes = []
    if(line === i){
      lineRes.push(Math.floor(Math.random() * 10))
    }
    res.push(lineRes)
   }
   return res
}


export {factorial, mul, C, combNoRepeat, unique, normalSum2,
  normalSum3, accumulate,diff2, diff3, combSum2, combSum3,
   bus, BaseBet, compress, throttle, easyClone, ChaseAjax,
    deleteCompress, Scheme, getBasketAmount,computeIssue,
    getSSCRebate,getMultipleRebate, DAY_TIME, HOUR_TIME, MINUTE_TIME, SECOND_TIME,
  GMT_DIF, PERBET,Max_Rate, Max_Chase_Issue, Max_Expect_Rate, BASE_ISSUE_1406, syx5_zx2,
  countSingle, betSum, createStringArray, _random, _0to9, _dsds, _0to27, _1to26, _0to18, _1to17, _syx5, _pk10, oneRandom, oneStar}
