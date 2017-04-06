import {countSingle, betSum, _random, _pk10} from '../kit'

var pk10Config = {
  "定位胆":{
    "标准":[{
      "name": "定位胆",
      "mode": "F11",
      "tip": "从冠、亚、季、四、五、六、七、八、九、十任意位置上任意选择一个或一个以上号码，奖金",
      "group": "定位胆",
      "subGroup": "标准",
      "tag": "定位胆",
      "eg":["冠选择01",'01 *'],
      "default":true
    }]
  },
  "猜前五":{
    "直选": [{
      "name": "复式",
      "mode": "E11",
      "tip": "从各名次中各选择1个不重复的号码组成一注，奖金",
      "group": "猜前五",
      "subGroup": "直选",
      "eg":["1 2 3 4 5",'1 2 3 4 5 *'],
      "tag": "前五直选复式",
      "default":true
    },{
      "name": "单式",
      "mode": "E12",
      "tip": "从各名次中各选择1个不重复的号码组成一注，奖金",
      "group": "猜前五",
      "subGroup": "直选",
      "eg":["1 2 3 4 5",'1 2 3 4 5 *'],
      "tag": "前五直选单式"
    }]
  },
  "猜前四":{
    "直选": [{
      "name": "复式",
      "mode": "D11",
      "tip": "从各名次中各选择1个不重复的号码组成一注，奖金",
      "group": "猜前四",
      "subGroup": "直选",
      "eg":["1 2 3 4",'1 2 3 4 *'],
      "tag": "前四直选复式",
      "default":true
    },{
      "name": "单式",
      "mode": "D12",
      "tip": "从各名次中各选择1个不重复的号码组成一注，奖金",
      "group": "猜前四",
      "subGroup": "直选",
      "eg":["1 2 3 4",'1 2 3 4 *'],
      "tag": "前四直选单式"
    }]
  },
  "猜前三":{
    "直选": [{
      "name": "复式",
      "mode": "C11",
      "tip": "从各名次中各选择1个不重复的号码组成一注，奖金",
      "group": "猜前三",
      "subGroup": "直选",
      "eg":["1 2 3",'1 2 3 *'],
      "tag": "前三直选复式",
      "default":true
    },{
      "name": "单式",
      "mode": "C12",
      "tip": "从各名次中各选择1个不重复的号码组成一注，奖金",
      "group": "猜前三",
      "subGroup": "直选",
      "eg":["1 2 3",'1 2 3 *'],
      "tag": "前三直选单式"
    }]
  },
  "猜前二":{
    "直选": [{
      "name": "复式",
      "mode": "B11",
      "tip": "从各名次中各选择1个不重复的号码组成一注，奖金",
      "group": "猜前二",
      "subGroup": "直选",
      "eg":["1 2",'1 2 *'],
      "tag": "前二直选复式",
      "default":true
    },{
      "name": "单式",
      "mode": "B12",
      "tip": "从各名次中各选择1个不重复的号码组成一注，奖金",
      "group": "猜前二",
      "subGroup": "直选",
      "eg":["1 2",'1 2 *'],
      "tag": "前二直选单式"
    }]
  },
  "猜冠军":{
    "直选": [{
      "name": "复式",
      "mode": "A11",
      "tip": "选择1个号码组成一注，奖金",
      "group": "猜冠军",
      "subGroup": "直选",
      "eg":["2",'2 *'],
      "tag": "前一直选复式",
      "default":true
    }]
  }
}

function mulNoRepeat2(d1, d2){
  var result = []
  for(var i = 0;i < d1.length;i++){
    for(var j = 0;j < d2.length;j++){
      if(d1[i] !== d2[j]){
        result.push([d1[i], d2[j]])
      }
    }
  }

  return result.length
}

function mulNoRepeat3(d1, d2, d3){
  var result = []
  for(var i = 0;i < d1.length;i++){
    for(var j = 0;j < d2.length;j++){
      for(var k = 0;k < d3.length;k++){
        var comb = [d1[i], d2[j], d3[k]]
        if(comb.filter((item, index, arr)=>arr.indexOf(item)===index).length === comb.length){
          result.push(comb)
        }
      }
    }
  }

  return result.length
}

function mulNoRepeat4(d1, d2, d3, d4){
  var result = []
  for(var i = 0;i < d1.length;i++){
    for(var j = 0;j < d2.length;j++){
      for(var k = 0;k < d3.length;k++){
        for(var l = 0;l < d4.length;l++){
          var comb = [d1[i], d2[j], d3[k], d4[l]]
          if(comb.filter((item, index, arr)=>arr.indexOf(item)===index).length === comb.length){
            result.push(comb)
          }
        }
      }
    }
  }

  return result.length
}

function mulNoRepeat5(d1, d2, d3, d4, d5){
  var result = []
  for(var i = 0;i < d1.length;i++){
    for(var j = 0;j < d2.length;j++){
      for(var k = 0;k < d3.length;k++){
        for(var l = 0;l < d4.length;l++){
          for(var m = 0;m < d5.length;m++){
            var comb = [d1[i], d2[j], d3[k], d4[l], d5[m]]
            if(comb.filter((item, index, arr)=>arr.indexOf(item)===index).length === comb.length){
              result.push(comb)
            }
          }
        }
      }
    }
  }

  return result.length
}

var pk10Play = {
  //定位胆
  F11:{render:['first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth'], alg:(order, tmp)=>betSum(order, tmp).reduce(function(a,b){return a + b})},
  //前五
  E11:{render:['first','second','third','fourth','fifth'], alg:(order, tmp)=>mulNoRepeat5(tmp['first'],tmp['second'],tmp['third'],tmp['fourth'],tmp['fifth'])},
  E12:{box:'syx5', len:5},
  //前四
  D11:{render:['first','second','third','fourth'], alg:(order, tmp)=>mulNoRepeat4(tmp['first'],tmp['second'],tmp['third'],tmp['fourth'])},
  D12:{box:'syx5', len:4},
  //前三
  C11:{render:['first','second','third'], alg:(order, tmp)=>mulNoRepeat3(tmp['first'],tmp['second'],tmp['third'])},
  C12:{box:'syx5', len:3},
  //前二
  B11:{render:['first','second'], alg:(order, tmp)=>mulNoRepeat2(tmp['first'],tmp['second'])},
  B12:{box:'syx5', len:2},
  //前一
  A11:{render:['first'], alg:countSingle},
}

function syx5OneStar(){
  var line =  Math.floor(Math.random() * 10)
  var res = []
  for(var i = 0;i < 10;i++){
    var lineRes = []
    if(line === i){
      var feed = Math.floor(Math.random() * 10)
      lineRes.push(_pk10[feed])
    }
    res.push(lineRes)
  }
  return res
}

function getSYX5NoteRandom(num, baseArr, noNeedOrder){
  var source = baseArr.slice()
  console.log(source)
  var res = []
  for(var i = 0;i < num;i++){
    var feed = Math.floor(Math.random() * source.length)  //随机索引
    res.push(source[feed]) //添加到每一行的结果数组中
    source.splice(feed, 1)     //从源数组中剔掉一个，保证单行不会出现重复
  }

  if(noNeedOrder === true){
    res = res.sort((a,b)=>a-b)
  }
  console.log(res)
  return res
}

//复式注单随机生成函数
var pk10Random = {
  F11:()=>syx5OneStar(),//定位胆
  E11:()=>_random([1,1,1,1,1], false, _pk10),//前五
  D11:()=>_random([1,1,1,1], false, _pk10),//前四
  C11:()=>_random([1,1,1], false, _pk10),//前三
  B11:()=>_random([1,1], false, _pk10),//前二
  A11:()=>_random([1], false, _pk10)//前一
}

//单式注单随机生成函数
var pk10RandomNote = {
  E12:()=>getSYX5NoteRandom(5, _pk10),//前五单式
  D12:()=>getSYX5NoteRandom(4, _pk10),//前四单式
  C12:()=>getSYX5NoteRandom(3, _pk10),//前三单式
  B12:()=>getSYX5NoteRandom(2, _pk10)//前二单式
}

//特殊的，不能够注数为1的一些玩法
var pk10SpecialMode = {}

export {pk10Config, pk10Play,pk10Random, pk10RandomNote, pk10SpecialMode}
