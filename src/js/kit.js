import Vue from 'vue'
import {PERBET} from '../JSconfig'
var bus = new Vue()     //空vue用来做事件管理

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

function BaseBet(count, betStr){
  var lt = state.lt,
      bet = state.lt.bet,
      _count = count || bet.betting_count,
      _betStr = betStr || bet.betting_number

  this.lottery_code = lt.lottery.LotteryCode,                     //彩种
  this.play_detail_code = lt.lottery.LotteryCode + lt.mode.mode,  //玩法code
  this.betting_number = _betStr,                       //投注号码

  this.betting_count = _count,                         //这个方案多少注
  this.betting_money = +(PERBET * _count * bet.betting_model * bet.graduation_count).toFixed(2),  //一注单价 * 投注数量 * 单位 * 倍数

  this.betting_point = lt.award + '-' + lt.Rebate[lt.lottery.LotteryType]  ,          //赔率
  this.betting_model = bet.betting_model,                   //元角分
  this.betting_issuseNo = lt.NowIssue,                  //当前期号
  this.graduation_count = bet.graduation_count                //当前倍率
  this.compress = bet.compress                            //压缩字符串
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


export {factorial, mul, C, combNoRepeat, unique, normalSum2, normalSum3, accumulate,
  diff2, diff3, combSum2, combSum3, bus, BaseBet, compress, throttle, easyClone}
