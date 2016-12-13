import Vue from 'vue'
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

export {factorial, mul, C, combNoRepeat, unique, normalSum2, normalSum3, accumulate,
  diff2, diff3, combSum2, combSum3, bus}
