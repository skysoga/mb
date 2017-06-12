import {factorial, mul, C, combNoRepeat, normalSum2, normalSum3, accumulate,
  diff2, diff3, combSum2, combSum3, countSingle, betSum,oneRandom, _random, _syx5} from '../kit'

var syx5Config = {
  "三码":{
    "三码":[{
      "name": "前三直选复式",
      "mode": "C11",
      "tag": "前三直选复式",
      "group": "三码",
      "subGroup": "三码",
      "tip": "从01-11共11个号码中选择3个不重复的号码组成一注，所选号码与当期顺序摇出的5个号码中 的前3个号码相同，且顺序一致，即为中奖。",
      "eg":["01,02,03","01,02,03,*,*"],
      "default":true
    },{
      "name": "前三直选单式",
      "mode": "C12",
      "tag": "前三直选单式",
      "group": "三码",
      "subGroup": "三码",
      "tip": "手动输入3个号码组成一注，所输入的号码与当期顺序摇出的5个号码中 的前3个号码相同，且顺序一致，即为中奖。",
      "eg":["01,02,03","01,02,03,*,*"],
    },{
      "name": "前三组选复式",
      "mode": "C21",
      "tag": "前三组选复式",
      "group": "三码",
      "subGroup": "三码",
      "eg":["01,02,03","01,02,03,*,*(不限顺序)"],
      "tip": "从01-11共11个号码中选择3个不重复的号码组成一注，所选号码与当期顺序摇出的5个号码中 的前3个号码相同，且顺序不限，即为中奖。",
    },{
      "name": "前三组选单式",
      "mode": "C22",
      "tag": "前三组选单式",
      "group": "三码",
      "subGroup": "三码",
      "eg":["01,02,03","01,02,03,*,*(不限顺序)"],
      "tip": "手动输入3个号码组成一注，所输入的号码与当期顺序摇出的5个号码中 的前3个号码相同，且顺序不限，即为中奖。"
    },{
      "name": "前三组选胆拖",
      "mode": "C23",
      "tag": "前三组选胆拖",
      "group": "三码",
      "subGroup": "三码",
      "eg":["01,02,03","01,02,03,*,*(不限顺序)"],
      "tip": "从01-11共11个号码中至少选择3个以上号码进行投注，每注需至少包括1个胆码及2个拖码。只要当期的前三位开奖号码中有3个包含所选号码（每注包含3个号码），即为中奖。"
    }]
  },
  "二码":{
    "二码":[{
      "name": "前二直选复式",
      "mode": "B11",
      "tag": "前二直选复式",
      "group": "二码",
      "subGroup": "二码",
      "eg":["01,02","01,02,*,*,*"],
      "tip": "从01-11共11个号码中选择2个不重复的号码组成一注，所选号码与当期顺序摇出的5个号码中 的前2个号码相同，且顺序一致，即为中奖。",
      "default":true
    },{
      "name": "前二直选单式",
      "mode": "B12",
      "tag": "前二直选单式",
      "group": "二码",
      "subGroup": "二码",
      "eg":["01,02","01,02,*,*,*"],
      "tip": "手动输入2个号码组成一注，所输入的号码与当期顺序摇出的5个号码中 的前2个号码相同，且顺序一致，即为中奖。"
    },{
      "name": "前二组选复式",
      "mode": "B21",
      "tag": "前二组选复式",
      "group": "二码",
      "subGroup": "二码",
      "eg":["01,02","01,02,*,*,*(不限顺序)"],
      "tip": "从01-11共11个号码中选择2个不重复的号码组成一注，所选号码与当期顺序摇出的5个号码中 的前2个号码相同，且顺序不限，即为中奖。"
    },{
      "name": "前二组选单式",
      "mode": "B22",
      "tag": "前二组选单式",
      "group": "二码",
      "subGroup": "二码",
      "eg":["01,02","01,02,*,*,*(不限顺序)"],
      "tip": "手动输入2个号码组成一注，所输入的号码与当期顺序摇出的5个号码中 的前2个号码相同，且顺序不限，即为中奖。"
    },{
      "name": "前二组选胆拖",
      "mode": "B23",
      "tag": "前二组选胆拖",
      "group": "二码",
      "subGroup": "二码",
      "eg":["01,02","01,02,*,*,*(不限顺序)"],
      "tip": "从01-11共11个号码中至少选择2个以上号码进行投注，每注需至少包括1个胆码及1个拖码。只要当期的前二位开奖号码中有2个包含所选号码（每注包含2个号码），即为中奖。"
    }]
  },
  "不定位":{
    "不定位":[{
      "name": "前三一码不定位",
      "mode": "A11",
      "tag": "前三一码不定位",
      "group": "不定位",
      "subGroup": "不定位",
      "eg":["01","01,X,Y,*,*(不限顺序)"],
      "tip": "从01-11共11个号码中选择1个号码，每注由1个号码组成，只要当期顺序摇出的第一位、第二位、第三位开奖号码中包含所选号码。",
      "default":true
    }]
  },
  "定位胆":{
    "定位胆":[{
      "name": "复式",
      "mode": "A21",
      "tag": "定位胆",
      "group": "定位胆",
      "subGroup": "定位胆",
      "eg":["01(第一位)","01,*,*,*,*"],
      "tip": "从第一位、第二位、第三位任意1个位置或多个位置上选择1个号码，所选号码与相同位置上的开奖号码一致。",
      "default":true
    }]
  },
  "趣味型":{
    "趣味型":[{
      "name": "定单双",
      "mode": "I11",
      "tag": "趣味定单双",
      "group": "趣味型",
      "subGroup": "趣味型",
      "tip": "从6种单双个数组合中选择1种组合，当开奖号码的单双个数与所选单双组合一致，即为中奖。",
      "eg":["0单5双","出现0个单号5个双号(不限顺序)"],
      "default":true
    }, {
      "name": "猜中位",
      "mode": "I12",
      "tag": "趣味猜中位",
      "group": "趣味型",
      "subGroup": "趣味型",
      "eg":["中位数为03","出现03，小于以及大于03的各有2个号码(不限顺序)"],
      "tip": "从3-9中选择1个号码进行购买，所选号码与5个开奖号码按照大小顺序排列后的第3个号码相同，即为中奖。"
    }]
  },
  "任选复式":{
    "任选复式":[{
      "name": "一中一",
      "mode": "A31",
      "tag": "任选一中一复式",
      "group": "任选复式",
      "subGroup": "任选复式",
      "eg":["01","01,W,X,Y,Z(不限顺序)"],
      "tip": "从01-11共11个号码中选择1个号码进行购买，当期的5个开奖号码中包含所选号码。",
      "default":true
    },{
      "name": "二中二",
      "mode": "B31",
      "tag": "任选二中二复式",
      "group": "任选复式",
      "subGroup": "任选复式",
      "eg":["01,02","01,02,X,Y,Z(不限顺序)"],
      "tip": "从01-11共11个号码中选择2个号码进行购买，只要当期的5个开奖号码中包含所选号。"
    },{
      "name": "三中三",
      "mode": "C31",
      "tag": "任选三中三复式",
      "group": "任选复式",
      "subGroup": "任选复式",
      "eg":["01,02,03","01,02,03,Y,Z(不限顺序)"],
      "tip": "从01-11共11个号码中选择3个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖。"
    },{
      "name": "四中四",
      "mode": "D11",
      "tag": "任选四中四复式",
      "group": "任选复式",
      "subGroup": "任选复式",
      "eg":["01,02,03,04","01,02,03,04,Z(不限顺序)"],
      "tip": "从01-11共11个号码中选择4个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖。"
    },{
      "name": "五中五",
      "mode": "E11",
      "tag": "任选五中五复式",
      "group": "任选复式",
      "subGroup": "任选复式",
      "eg":["01,02,03,04,05","01,02,03,04,05(不限顺序)"],
      "tip": "从01-11共11个号码中选择5个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖。"
    },{
      "name": "六中五",
      "mode": "F11",
      "tag": "任选六中五复式",
      "group": "任选复式",
      "subGroup": "任选复式",
      "eg":["01,02,03,04,05,06","01,02,03,04,05(不限顺序)"],
      "tip": "从01-11共11个号码中选择6个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖。"
    },{
      "name": "七中五",
      "mode": "G11",
      "tag": "任选七中五复式",
      "group": "任选复式",
      "subGroup": "任选复式",
      "eg":["01,02,03,04,05,06,07","01,02,03,04,05(不限顺序)"],
      "tip": "从01-11共11个号码中选择7个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖。"
    },{
      "name": "八中五",
      "mode": "H11",
      "tag": "任选八中五复式",
      "group": "任选复式",
      "subGroup": "任选复式",
      "eg":["01,02,03,04,05,06,07,08","01,02,03,04,05(不限顺序)"],
      "tip": "从01-11共11个号码中选择8个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖。"
    }]
  },
  "任选单式":{
    "任选单式":[{
      "name": "一中一",
      "mode": "A32",
      "tag": "任选一中一单式",
      "group": "任选单式",
      "subGroup": "任选单式",
      "eg":["01","01,W,X,Y,Z(不限顺序)"],
      "tip": "从01-11中手动输入1个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖。",
      "default":true
    },{
      "name": "二中二",
      "mode": "B32",
      "tag": "任选二中二单式",
      "group": "任选单式",
      "subGroup": "任选单式",
      "eg":["01,02","01,02,X,Y,Z(不限顺序)"],
      "tip": "从01-11中手动输入2个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖。"
    },{
      "name": "三中三",
      "mode": "C32",
      "tag": "任选三中三单式",
      "group": "任选单式",
      "subGroup": "任选单式",
      "eg":["01,02,03","01,02,03,Y,Z(不限顺序)"],
      "tip": "从01-11中手动输入3个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖。"
    },{
      "name": "四中四",
      "mode": "D12",
      "tag": "任选四中四单式",
      "group": "任选单式",
      "subGroup": "任选单式",
      "eg":["01,02,03,04","01,02,03,04,Z(不限顺序)"],
      "tip": "从01-11中手动输入4个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖。"
    },{
      "name": "五中五",
      "mode": "E12",
      "tag": "任选五中五单式",
      "group": "任选单式",
      "subGroup": "任选单式",
      "eg":["01,02,03,04,05","01,02,03,04,05(不限顺序)"],
      "tip": "从01-11中手动输入5个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖。"
    },{
      "name": "六中五",
      "mode": "F12",
      "tag": "任选六中五单式",
      "group": "任选单式",
      "subGroup": "任选单式",
      "eg":["01,02,03,04,05,06","01,02,03,04,05(不限顺序)"],
      "tip": "从01-11中手动输入6个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖。"
    },{
      "name": "七中五",
      "mode": "G12",
      "tag": "任选七中五单式",
      "group": "任选单式",
      "subGroup": "任选单式",
      "eg":["01,02,03,04,05,06,07","01,02,03,04,05(不限顺序)"],
      "tip": "从01-11中手动输入7个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖。"
    },{
      "name": "八中五",
      "mode": "H12",
      "tag": "任选八中五单式",
      "group": "任选单式",
      "subGroup": "任选单式",
      "eg":["01,02,03,04,05,06,07,08","01,02,03,04,05(不限顺序)"],
      "tip": "从01-11中手动输入8个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖。"
    }]
  },
  "任选胆拖":{
    "任选胆拖":[{
      "name": "二中二",
      "mode": "B33",
      "tag": "任选二中二胆拖",
      "group": "任选胆拖",
      "subGroup": "任选胆拖",
      "eg":["01,02","01,02,X,Y,Z(不限顺序)"],
      "tip": "从01-11共11个号码中至少选择2个以上号码进行投注，每注需至少包括1个胆码及1个拖码。只要当期的5个开奖号码中有2个包含所选号码（每注包含2个号码），即为中奖。",
      "default":true
    },{
      "name": "三中三",
      "mode": "C33",
      "tag": "任选三中三胆拖",
      "group": "任选胆拖",
      "subGroup": "任选胆拖",
      "eg":["01,02,03","01,02,03,Y,Z(不限顺序)"],
      "tip": "从01-11共11个号码中至少选择3个以上号码进行投注，每注需至少包括1个胆码及2个拖码。只要当期的5个开奖号码中有3个包含所选号码（每注包含3个号码），即为中奖。"
    },{
      "name": "四中四",
      "mode": "D13",
      "tag": "任选四中四胆拖",
      "group": "任选胆拖",
      "subGroup": "任选胆拖",
      "eg":["01,02,03,04","01,02,03,04,Z(不限顺序)"],
      "tip": "从01-11共11个号码中至少选择4个以上号码进行投注，每注需至少包括1个胆码及3个拖码。只要当期的5个开奖号码中有4个包含所选号码（每注包含4个号码），即为中奖。"
    },{
      "name": "五中五",
      "mode": "E13",
      "tag": "任选五中五胆拖",
      "group": "任选胆拖",
      "subGroup": "任选胆拖",
      "eg":["01,02,03,04,05","01,02,03,04,05(不限顺序)"],
      "tip": "从01-11共11个号码中至少选择5个以上号码进行投注，每注需至少包括1个胆码及4个拖码。只要所选的每注5个号码和当期的5个开奖号码全部相同，即为中奖。"
    },{
      "name": "六中五",
      "mode": "F13",
      "tag": "任选六中五胆拖",
      "group": "任选胆拖",
      "subGroup": "任选胆拖",
      "eg":["01,02,03,04,05,06","01,02,03,04,05(不限顺序)"],
      "tip": "从01-11共11个号码中至少选择6个以上号码进行投注，每注需至少包括1个胆码及5个拖码。只要所选的每注6个号码当中，有5个和当期的5个开奖号码全部相同，即为中奖。"
    },{
      "name": "七中五",
      "mode": "G13",
      "tag": "任选七中五胆拖",
      "group": "任选胆拖",
      "subGroup": "任选胆拖",
      "eg":["01,02,03,04,05,06,07","01,02,03,04,05(不限顺序)"],
      "tip": "从01-11共11个号码中至少选择7个以上号码进行投注，每注需至少包括1个胆码及6个拖码。只要所选的每注7个号码当中，有5个和当期的5个开奖号码全部相同，即为中奖。"
    },{
      "name": "八中五",
      "mode": "H13",
      "tag": "任选八中五胆拖",
      "group": "任选胆拖",
      "subGroup": "任选胆拖",
      "eg":["01,02,03,04,05,06,07,08","01,02,03,04,05(不限顺序)"],
      "tip": "从01-11共11个号码中至少选择8个以上号码进行投注，每注需至少包括1个胆码及7个拖码。只要所选的每注8个号码当中，有5个和当期的5个开奖号码全部相同，即为中奖。"
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

function countDmTm(dm, tm, baseNum){
  if(dm.length === 0){
    return 0
  }else{
    return C(tm.length, baseNum - dm.length)
  }
}

var syx5Play = {
  //选一
  A11:{render:['_budingwei'], alg:countSingle},
  A21:{render:['d1', 'd2', 'd3'], alg:(order, tmp)=>betSum(order, tmp).reduce(function(a,b){return a + b})},
  A31:{render:['x1z1'], alg:countSingle},
  A32:{box:'syx5', len:1,special:'noOrder'},
  //选二
  B11:{render:['d1', 'd2'], alg:(order, tmp)=>mulNoRepeat2(tmp['d1'], tmp['d2'])},
  B12:{box:'syx5', len:2},
  B21:{render:['qezx'], alg:(order, tmp)=>C(tmp['qezx'].length, 2)},
  B22:{box:'syx5', len:2,special:'noOrder'},
  B23:{render:['dm', 'tm'], alg:(order, tmp)=>countDmTm(tmp['dm'], tmp['tm'], 2)},
  B31:{render:['x2z2'], alg:(order, tmp)=>C(tmp['x2z2'].length, 2)},
  B32:{box:'syx5', len:2,special:'noOrder'},
  B33:{render:['dm', 'tm'], alg:(order, tmp)=>countDmTm(tmp['dm'], tmp['tm'], 2)},
  //选三
  C11:{render:['d1', 'd2', 'd3'], alg:(order, tmp)=>mulNoRepeat3(tmp['d1'], tmp['d2'], tmp['d3'])},
  C12:{box:'syx5', len:3},
  C21:{render:['qszx'], alg:(order, tmp)=>C(tmp['qszx'].length, 3)},
  C22:{box:'syx5', len:3,special:'noOrder'},
  C23:{render:['dm', 'tm'], alg:(order, tmp)=>countDmTm(tmp['dm'], tmp['tm'], 3)},
  C31:{render:['x3z3'], alg:(order, tmp)=>C(tmp['x3z3'].length, 3)},
  C32:{box:'syx5', len:3,special:'noOrder'},
  C33:{render:['dm', 'tm'], alg:(order, tmp)=>countDmTm(tmp['dm'], tmp['tm'], 3)},
  //选四
  D11:{render:['x4z4'], alg:(order, tmp)=>C(tmp['x4z4'].length, 4)},
  D12:{box:'syx5', len:4,special:'noOrder'},
  D13:{render:['dm', 'tm'], alg:(order, tmp)=>countDmTm(tmp['dm'], tmp['tm'], 4)},
  //选五
  E11:{render:['x5z5'], alg:(order, tmp)=>C(tmp['x5z5'].length, 5)},
  E12:{box:'syx5', len:5,special:'noOrder'},
  E13:{render:['dm', 'tm'], alg:(order, tmp)=>countDmTm(tmp['dm'], tmp['tm'], 5)},
  //选六
  F11:{render:['x6z5'], alg:(order, tmp)=>C(tmp['x6z5'].length, 6)},
  F12:{box:'syx5', len:6,special:'noOrder'},
  F13:{render:['dm', 'tm'], alg:(order, tmp)=>countDmTm(tmp['dm'], tmp['tm'], 6)},
  //选七
  G11:{render:['x7z5'], alg:(order, tmp)=>C(tmp['x7z5'].length, 7)},
  G12:{box:'syx5', len:7,special:'noOrder'},
  G13:{render:['dm', 'tm'], alg:(order, tmp)=>countDmTm(tmp['dm'], tmp['tm'], 7)},
  //选八
  H11:{render:['x8z5'], alg:(order, tmp)=>C(tmp['x8z5'].length, 8)},
  H12:{box:'syx5', len:8,special:'noOrder'},
  H13:{render:['dm', 'tm'], alg:(order, tmp)=>countDmTm(tmp['dm'], tmp['tm'], 8)},
  //趣味
  I11:{render:['dds'], alg:countSingle}, //定单双
  I12:{render:['czw'], alg:countSingle}, //猜中位
}

function syx5OneStar(){
  var line =  Math.floor(Math.random() * 3)
  var res = []
  for(var i = 0;i < 3;i++){
    var lineRes = []
    if(line === i){
      var feed = Math.floor(Math.random() * 11)
      lineRes.push(_syx5[feed])
    }
    res.push(lineRes)
  }
  return res
}

// 给出一注十一选五单式的注单
function getSYX5NoteRandom(num, baseArr, noNeedOrder){
  var source = baseArr.slice()
  var res = []
  for(var i = 0;i < num;i++){
    var feed = Math.floor(Math.random() * source.length)  //随机索引
    res.push(source[feed]) //添加到每一行的结果数组中
    source.splice(feed, 1)     //从源数组中剔掉一个，保证单行不会出现重复
  }

  if(noNeedOrder === true){
    res = res.sort((a,b)=>a-b)
  }
  return res
}

function getDTRandom(num){
  var feed = Math.floor(Math.random() * 2)
  return feed === 0 ? _random([1, num -1], false, _syx5) : _random([num -1, 1], false, _syx5)
}


var dds = ['5单0双','4单1双','3单2双','2单3双','1单4双','0单5双']
var czw = ['03','04','05','06','07','08','09']
var syx5Random = {
  //选一
  A11:()=>_random([1], false, _syx5),         //前三一码不定位
  A21:()=>syx5OneStar(),                      //定位胆
  A31:()=>_random([1], false, _syx5),         //任选复式一中一
  //选二
  B11:()=>_random([1,1], false, _syx5),       //前二直选复式
  B21:()=>_random([2], false, _syx5),         //前二组选复式
  B23:()=>getDTRandom(2),                     //前二组选胆拖
  B31:()=>_random([2], false, _syx5),         //任选二中二
  B33:()=>getDTRandom(2),                     //任选二中二胆拖
  //选三
  C11:()=>_random([1,1,1], false, _syx5),     //前三直选复式
  C21:()=>_random([3], false, _syx5),         //前三组选复式
  C23:()=>getDTRandom(3),                     //前三组选胆拖
  C31:()=>_random([3], false, _syx5),         //任选三中三复式
  C33:()=>getDTRandom(3),                     //任选三中三胆拖
  D11:()=>_random([4], false, _syx5),         //任选四中四复式
  D13:()=>getDTRandom(4),                     //任选四中四胆拖
  E11:()=>_random([5], false, _syx5),         //任选五中五复式
  E13:()=>getDTRandom(5),                     //任选五中五胆拖
  F11:()=>_random([6], false, _syx5),         //任选六中五复式
  F13:()=>getDTRandom(6),                     //任选六中五胆拖
  G11:()=>_random([7], false, _syx5),         //任选七中五复式
  G13:()=>getDTRandom(7),                     //任选七中五胆拖
  H11:()=>_random([8], false, _syx5),         //任选八中五复式
  H13:()=>getDTRandom(8),                     //任选八中五胆拖
  I11:()=>_random([1], false, dds),         //趣味定单双
  I12:()=>_random([1], false, czw),         //趣味猜中位
}

var syx5RandomNote = {
  A32:()=>[0].map(item=>_syx5[oneRandom(11)]),  //任选单式一中一
  B12:()=>getSYX5NoteRandom(2, _syx5),          //前二直选单式
  B22:()=>getSYX5NoteRandom(2, _syx5, true),    //前二组选单式
  B32:()=>getSYX5NoteRandom(2, _syx5, true),    //任选二中二单式
  C12:()=>getSYX5NoteRandom(3, _syx5),          //前三直选单式
  C22:()=>getSYX5NoteRandom(3, _syx5, true),    //前三组选单式
  C32:()=>getSYX5NoteRandom(3, _syx5, true),    //任选三中三单式
  D12:()=>getSYX5NoteRandom(4, _syx5, true),    //任选四中四单式
  E12:()=>getSYX5NoteRandom(5, _syx5, true),    //任选五中五单式
  F12:()=>getSYX5NoteRandom(6, _syx5, true),    //任选六中五单式
  G12:()=>getSYX5NoteRandom(7, _syx5, true),    //任选七中五单式
  H12:()=>getSYX5NoteRandom(8, _syx5, true),    //任选八中五单式

}

var syx5SpecialMode = {}

export {syx5Config, syx5Play, syx5Random, syx5RandomNote, syx5SpecialMode}
