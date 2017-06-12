import {C, countSingle, betSum,_random} from '../kit'

var kl8Config = {
  "任选":{
    "普通玩法":[{
      "name": "任选一",
      "mode": "A10",
      "tip": "从01-80中选择1个号码组成一注，当期开奖结果的20个号码中包含所选号码，即可中奖。",
      "group": "任选",
      "subGroup": "普通玩法",
      "tag": "任选一",
      "eg":["01","01 02 03 04 05 06 07 08 21 22 71 72 73 74 75 76 77 78 79 80"],
      "default":true
    },{
      "name": "任选二",
      "mode": "A11",
      "tip": "从01-80中选择2-8个号码，当期开奖结果的20个号码中包含所选号码中的两个，即可中奖。",
      "group": "任选",
      "subGroup": "普通玩法",
      "eg":["01 02","01 02 03 04 05 06 07 08 21 22 71 72 73 74 75 76 77 78 79 80"],
      "tag": "任选二"
    },{
      "name": "任选三",
      "mode": "A12",
      "tip": "从01-80中选择3-8个号码，当期开奖结果的20个号码中包含所选号码中的三个，即可中奖。 ",
      "group": "任选",
      "subGroup": "普通玩法",
      "eg":["01 02 03","01 02 03 04 05 06 07 08 21 22 71 72 73 74 75 76 77 78 79 80"],
      "tag": "任选三"
    },{
      "name": "任选四",
      "mode": "A13",
      "tip": "从01-80中选择4-8个号码，当期开奖结果的20个号码中包含所选号码中的四个，即可中奖。 ",
      "group": "任选",
      "subGroup": "普通玩法",
      "eg":["01 02 03 04","01 02 03 04 05 06 07 08 21 22 71 72 73 74 75 76 77 78 79 80"],
      "tag": "任选四"
    },{
      "name": "任选五",
      "mode": "A14",
      "tip": "从01-80中选择5-8个号码，当期开奖结果的20个号码中包含所选号码中的五个，即可中奖。 ",
      "group": "任选",
      "subGroup": "普通玩法",
      "eg":["01 02 03 04 05","01 02 03 04 05 06 07 08 21 22 71 72 73 74 75 76 77 78 79 80"],
      "tag": "任选五"
    },{
      "name": "任选六",
      "mode": "A15",
      "tip": "从01-80中选择6-8个号码，当期开奖结果的20个号码中包含所选号码中的六个，即可中奖。 ",
      "group": "任选",
      "subGroup": "普通玩法",
      "eg":["01 02 03 04 05 06","01 02 03 04 05 06 07 08 21 22 71 72 73 74 75 76 77 78 79 80"],
      "tag": "任选六"
    },{
      "name": "任选七",
      "mode": "A16",
      "tip": "从01-80中选择7-8个号码，当期开奖结果的20个号码中包含所选号码中的七个，即可中奖。 ",
      "group": "任选",
      "subGroup": "普通玩法",
      "eg":["01 02 03 04 05 06 07","01 02 03 04 05 06 07 08 21 22 71 72 73 74 75 76 77 78 79 80"],
      "tag": "任选七"
    }]
  },
  "趣味":{
    "标准": [{
      "name": "上下盘",
      "mode": "B10",
      "tip": "选择20个开奖号码中包含“上盘(01-40)”与“下盘(41-80)”号码个数多少关系。 ",
      "group": "趣味",
      "subGroup": "标准",
      "eg":["中盘","“上盘”号码个数10，“下盘”号码个数10。上=下"],
      "tag": "趣味上下盘",
      "default":true
    },{
      "name": "奇偶盘",
      "mode": "B11",
      "tip": "选择20个开奖号码中包含“奇·偶”号码个数多少关系。 ",
      "group": "趣味",
      "subGroup": "标准",
      "eg":["和","“奇数”号码个数10，“偶数”号码个数10。奇=偶"],
      "tag": "趣味奇偶盘"
    },{
      "name": "和值大小单双",
      "mode": "B12",
      "tip": "选择20个开奖号码总和值的“大小单双”属性组合(和值<=810为小,>810为大)。",
      "group": "趣味",
      "subGroup": "标准",
      "eg":["大·双","20个开奖号码的总和值：834。属性为“大·双”"],
      "tag": "趣味和值大小单双"
    }]
  }
}

var kl8Play = {
  //任选
  A10:{render:['above','below'], alg:(order, tmp)=>betSum(order, tmp).reduce(function(a,b){return a + b})},
  A11:{render:['above','below'], alg:(order, tmp)=>C(tmp['above'].length + tmp['below'].length, 2)},
  A12:{render:['above','below'], alg:(order, tmp)=>C(tmp['above'].length + tmp['below'].length, 3)},
  A13:{render:['above','below'], alg:(order, tmp)=>C(tmp['above'].length + tmp['below'].length, 4)},
  A14:{render:['above','below'], alg:(order, tmp)=>C(tmp['above'].length + tmp['below'].length, 5)},
  A15:{render:['above','below'], alg:(order, tmp)=>C(tmp['above'].length + tmp['below'].length, 6)},
  A16:{render:['above','below'], alg:(order, tmp)=>C(tmp['above'].length + tmp['below'].length, 7)},
  //趣味
  B10:{render:['szx'], alg:countSingle},
  B11:{render:['jho'], alg:countSingle},
  B12:{render:['isum'], alg:countSingle},

}
var _kl8=Array.from({length:80}, (v,k) => (k+1)<10?'0'+(k+1):(k+1).toString())
var sxp=['上','中','下']
var jep=['奇','和','偶']
var hzdxds=['大单','大双','小单','小双']
//复式注单随机生成函数
var kl8Random = {
  // 任选
  A10:()=>_random([1], false, _kl8),
  A11:()=>_random([2], false, _kl8),
  A12:()=>_random([3], false, _kl8),
  A13:()=>_random([4], false, _kl8),
  A14:()=>_random([5], false, _kl8),
  A15:()=>_random([6], false, _kl8),
  A16:()=>_random([7], false, _kl8),
  // 趣味
  B10:()=>_random([1], false, sxp),
  B11:()=>_random([1], false, jep),
  B12:()=>_random([1], false, hzdxds)
}

//单式注单随机生成函数
var kl8RandomNote = {
}

//特殊的，不能够注数为1的一些玩法
var kl8SpecialMode = {}

export {kl8Config, kl8Play,kl8Random, kl8RandomNote, kl8SpecialMode}
