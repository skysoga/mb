import {factorial, mul, C, combNoRepeat, normalSum2, normalSum3, accumulate,
  diff2, diff3, combSum2, combSum3, countSingle, betSum,_random,_0to9, _dsds, _0to27, _1to26, _0to18, _1to17, oneRandom, oneStar} from '../kit'

var fc3dConfig = {
  "一星": {
    "定位胆": [{
      "name": "复式",
      "mode": "A11",
      "tip": "从百位、十位、个位任意位置上至少选择1个号码，选号与相同位置上的开奖号码一致，奖金",
      "group": "一星",
      "subGroup": "定位胆",
      "eg":["1**(百位)","1**"],
      "tag": "一星定位胆复式",
      "default":true
    }]
  },
  "前二": {
    "直选": [{
      "name": "直选复式",
      "mode": "C11",
      "tip": "每位至少选择一个号码，竞猜开奖号码的前二位，号码和位置都对应即中奖，奖金",
      "group": "前二",
      "subGroup": "直选",
      "tag": "前二直选复式",
      "eg":["45*","45*"],
      "default":true
    }, {
      "name": "直选单式",
      "mode": "C12",
      "tip": "每位至少选择一个号码，竞猜开奖号码的前二位，号码和位置都对应即中奖，奖金",
      "group": "前二",
      "subGroup": "直选",
      "eg":["45*","45*"],
      "tag": "前二直选单式"
    }, {
      "name": "直选和值",
      "mode": "C13",
      "tip": "至少选择一个和值，竞猜开奖号码前二位数字之和，奖金",
      "group": "前二",
      "subGroup": "直选",
      "eg":["和值1","01*,10*"],
      "tag": "前二直选和值"
    }, {
      "name": "跨度",
      "mode": "C14",
      "tip": "所选数值等于开奖号码的前二位最大与最小数字相减之差，即为中奖，奖金",
      "group": "前二",
      "subGroup": "直选",
      "eg":["跨度8","08*,19*,80*,91*"],
      "tag": "前二直选跨度"
    }],
    "组选": [{
      "name": "组选复式",
      "mode": "C21",
      "tip": "从0-9中选择2个数字组成一注，所选号码与开奖号码的前二位相同，顺序不限，奖金",
      "group": "前二",
      "subGroup": "组选",
      "eg":["5,8","58*(不限顺序)"],
      "tag": "前二组选复式"
    }, {
      "name": "组选单式",
      "mode": "C22",
      "tip": "从0-9中选择2个数字组成一注，所选号码与开奖号码的前二位相同，顺序不限，奖金",
      "group": "前二",
      "subGroup": "组选",
      "eg":["5,8","58*(不限顺序)"],
      "tag": "前二组选单式"
    }, {
      "name": "组选和值",
      "mode": "C23",
      "tip": "所选数值等于开奖号码的前二位数字相加之和（不含对子），奖金",
      "group": "前二",
      "subGroup": "组选",
      "eg":["和值1","10*,01*"],
      "tag": "前二组选和值"
    }, {
      "name": "组选包胆",
      "mode": "C24",
      "tip": "从0-9中任意选择1个号码，开奖号码的前二位中任意1位包含所选的包胆号码相同,奖金",
      "group": "前二",
      "subGroup": "组选",
      "eg":["包胆8","x8*,8*x(不含对子)"],
      "tag": "前二组选包胆"
    }]
  },
  "后二": {
    "直选": [{
      "name": "直选复式",
      "mode": "B11",
      "tip": "每位至少选择一个号码，竞猜开奖号码的后二位，号码和位置都对应即中奖，奖金",
      "group": "后二",
      "subGroup": "直选",
      "eg":["45*","45*"],
      "tag": "后二直选复式",
      "default":true
    }, {
      "name": "直选单式",
      "mode": "B12",
      "tip": "每位至少选择一个号码，竞猜开奖号码的后二位，号码和位置都对应即中奖，奖金",
      "group": "后二",
      "subGroup": "直选",
      "eg":["45*","45*"],
      "tag": "后二直选单式"
    }, {
      "name": "直选和值",
      "mode": "B13",
      "tip": "至少选择一个和值，竞猜开奖号码后二位数字之和，奖金",
      "group": "后二",
      "subGroup": "直选",
      "eg":["和值1","01*,10*"],
      "tag": "后二直选和值"
    }, {
      "name": "跨度",
      "mode": "B14",
      "tip": "所选数值等于开奖号码的后二位最大与最小数字相减之差，即为中奖，奖金",
      "group": "后二",
      "subGroup": "直选",
      "eg":["跨度8","08*,19*,80*,91*"],
      "tag": "后二直选跨度"
    }],
    "组选":[{
      "name": "组选复式",
      "mode": "B21",
      "tip": "从0-9中选择2个数字组成一注，所选号码与开奖号码的后二位相同，顺序不限，奖金",
      "group": "后二",
      "subGroup": "组选",
      "eg":["5,8","58*(不限顺序)"],
      "tag": "后二组选复式"
    }, {
      "name": "组选单式",
      "mode": "B22",
      "tip": "从0-9中选择2个数字组成一注，所选号码与开奖号码的后二位相同，顺序不限，奖金",
      "group": "后二",
      "subGroup": "组选",
      "eg":["5,8","58*(不限顺序)"],
      "tag": "后二组选单式"
    }, {
      "name": "组选和值",
      "mode": "B23",
      "tip": "所选数值等于开奖号码的后二位数字相加之和（不含对子），奖金",
      "group": "后二",
      "subGroup": "组选",
      "eg":["和值1","10*,01*"],
      "tag": "后二组选和值"
    }, {
      "name": "组选包胆",
      "mode": "B24",
      "tip": "从0-9中任意选择1个号码，开奖号码的后二位中任意1位包含所选的包胆号码相同，奖金",
      "group": "后二",
      "subGroup": "组选",
      "eg":["包胆8","x8*,8*x(不含对子)"],
      "tag": "后二组选包胆"
    }]
  },
  "三星": {
    "直选": [{
      "name": "直选复式",
      "mode": "D11",
      "tip": "每位至少选择一个号码，竞猜开奖号码，号码和位置都对应即中奖，奖金",
      "group": "三星",
      "subGroup": "直选",
      "tag": "三星直选复式",
      "eg":["456", "456"],
      "default":true
    }, {
      "name": "直选单式",
      "mode": "D12",
      "tip": "每位至少选择一个号码，竞猜开奖号码，号码和位置都对应即中奖，奖金",
      "group": "三星",
      "subGroup": "直选",
      "eg":["456", "456"],
      "tag": "三星直选单式"
    }, {
      "name": "直选和值",
      "mode": "D13",
      "tip": "至少选择一个和值，竞猜开奖号码数字之和，奖金",
      "group": "三星",
      "subGroup": "直选",
      "eg":["和值1", "001,010,100"],
      "tag": "三星直选和值"
    }, {
      "name": "跨度",
      "mode": "D14",
      "tip": "所选数值等于开奖号码的最大与最小数字相减之差，即为中奖，奖金",
      "group": "三星",
      "subGroup": "直选",
      "eg":["跨度8", "(1)数字08x(不限顺序),x≠9;(2)数字19x(不限顺序),x≠0"],
      "tag": "三星直选跨度"
    }],
    "组选": [{
      "name": "组选和值",
      "mode": "D21",
      "tip": "至少选择一个和值，竞猜开奖号码后三位数字之和(不含豹子号)，奖金",
      "group": "三星",
      "subGroup": "组选",
      "eg":["和值6","033(不限顺序)","和值6","015(不限顺序)"],
      "tag": "三星组选和值"
    }, {
      "name": "组三",
      "mode": "D22",
      "tip": "从0-9中选择2个数字组成两注，所选号码与开奖号码相同，且顺序不限，奖金",
      "group": "三星",
      "subGroup": "组选",
      "eg":["112","112(不限顺序)"],
      "tag": "三星组选组三"
    }, {
      "name": "组六",
      "mode": "D23",
      "tip": "从0-9中任意选择3个号码组成一注，所选号码与开奖号码相同，顺序不限，奖金",
      "group": "三星",
      "subGroup": "组选",
      "eg":["123","123(不限顺序)"],
      "tag": "三星组选组六"
    }, {
      "name": "混合组选",
      "mode": "D24",
      "tip": "手动输入号码，3个数字为一注，所选号码与开奖号码相同，顺序不限，即为中奖，奖金",
      "group": "三星",
      "subGroup": "组选",
      "eg":["001","001(不限顺序)","123","123(不限顺序)"],
      "tag": "三星混合组选"
    }, {
      "name": "组选包胆",
      "mode": "D25",
      "tip": "从0-9中任意选择1个包胆号码，开奖号码的后三位中任意1位与所选包胆号码相同(不含豹子号)，奖金",
      "group": "三星",
      "subGroup": "组选",
      "eg":["包胆3","3xx或者33x(不限顺序)","3xy(不限顺序)注:x≠y≠3", "包胆3", "3xy（不限顺序）注：x≠y≠3"],
      "tag": "三星组选包胆"
    }, {
      "name": "组三单式",
      "mode": "D26",
      "tip": "手动输入号码，3个数字为一注，所选号码与开奖号码相同，顺序不限，奖金",
      "group": "三星",
      "subGroup": "组选",
      "eg":["112","112(不限顺序)"],
      "tag": "三星组三单式"
    }, {
      "name": "组六单式",
      "mode": "D27",
      "tip": "手动输入号码，3个数字为一注，所选号码与开奖号码相同，顺序不限，奖金",
      "group": "三星",
      "subGroup": "组选",
      "eg":["123","123(不限顺序)"],
      "tag": "三星组六单式"
    }],
    "不定位": [{
      "name": "一码不定位",
      "mode": "D31",
      "tip": "从0-9中至少选择1个号码投注，竞猜开奖号码中包含这个号码，包含即中奖，奖金",
      "group": "三星",
      "subGroup": "不定位",
      "eg":["1","1xx(不限顺序)"],
      "tag": "三星一码不定位"
    }, {
      "name": "二码不定位",
      "mode": "D32",
      "tip": "从0-9中至少选择2个号码投注，竞猜开奖号码中包含这2个号码，包含即中奖，奖金",
      "group": "三星",
      "subGroup": "不定位",
      "eg":["12","12x(不限顺序)"],
      "tag": "三星二码不定位"
    }]
  },
  "大小单双":{
    "大小单双":[{
      "name": "前二大小单双",
      "mode": "I11",
      "tip": "从百位、十位中的“大、小、单、双”中至少各选一个组成一注，奖金",
      "group": "大小单双",
      "subGroup": "大小单双",
      "tag": "前二大小单双",
      "eg": ["小双", "百位与十位“小双”，即为中奖。"],
      "default": true
    },{
      "name": "后二大小单双",
      "mode": "I12",
      "tip": "从十位、个位中的“大、小、单、双”中至少各选一个组成一注，奖金",
      "group": "大小单双",
      "subGroup": "大小单双",
      "eg": ["小双", "十位与个位“小双”，即为中奖。"],
      "tag": "后二大小单双"
    }]
  }
}

var fc3dPlay = {
  //三星
  D11:{render:['100','10','1'],alg:(order, tmp)=>mul(3, betSum(order, tmp))},
  D12:{box:'normal', len:3},
  D13:{render:['psum27'],alg:(order,tmp)=>accumulate(tmp['psum27'], normalSum3)},
  D14:{render:['diff'],alg:(order,tmp)=>accumulate(tmp['diff'],diff3)},
  D21:{render:['csum26'],alg:(order,tmp)=>accumulate(tmp['csum26'], combSum3)},
  D22:{render:['z3'],alg:(order,tmp)=>2 * C(tmp['z3'].length, 2)},
  D23:{render:['z6'],alg:(order,tmp)=>C(tmp['z6'].length,3)},
  D24:{box:'normal', len:3, special: 'b3x2x3'},
  D25:{render:['baodan'],alg:(order,tmp)=>54},
  D26:{box:'normal', len:3, special: 'b3x2'},
  D27:{box:'normal', len:3, special: 'b3x3'},
  D31:{render:['budingwei'],alg:countSingle},
  D32:{render:['budingwei'],alg:(order,tmp)=>C(tmp['budingwei'].length,2)},
  //前二
  C11:{render:['100','10'],alg:(order,tmp)=>mul(2,betSum(order,tmp))},
  C12:{box:'normal', len:2},
  C13:{render:['psum18'],alg:(order,tmp)=>accumulate(tmp['psum18'],normalSum2)},
  C14:{render:['diff'],alg:(order,tmp)=>accumulate(tmp['diff'],diff2)},
  C21:{render:['zx'],alg:(order,tmp)=>C(tmp['zx'].length,2)},
  C22:{box:'normal', len:2, special: 'b2x2'},
  C23:{render:['csum17'],alg:(order,tmp)=>accumulate(tmp['csum17'].map(item=>item),combSum2)},
  C24:{render:['baodan'],alg:(order,tmp)=>9},
  //后二
  B11:{render:['10','1'],alg:(order,tmp)=>mul(2,betSum(order,tmp))},
  B12:{box:'normal', len:2},
  B13:{render:['psum18'],alg:(order,tmp)=>accumulate(tmp['psum18'],normalSum2)},
  B14:{render:['diff'],alg:(order,tmp)=>accumulate(tmp['diff'],diff2)},
  B21:{render:['zx'],alg:(order,tmp)=>C(tmp['zx'].length,2)},
  B22:{box:'normal', len:2, special: 'b2x2'},
  B23:{render:['csum17'],alg:(order,tmp)=>accumulate(tmp['csum17'].map(item=>item),combSum2)},
  B24:{render:['baodan'],alg:(order,tmp)=>9},
  //一星
  A11:{render:['100', '10', '1'],alg:(order, tmp)=>betSum(order, tmp).reduce(function(a,b){return a + b})},
  //大小单双
  I11:{render:['i100','i10'],alg:(order,tmp)=>mul(2,betSum(order,tmp))},
  I12:{render:['i10','i1'],alg:(order,tmp)=>mul(2,betSum(order,tmp))},
}

//复式注单随机生成函数
var fc3dRandom = {  
  D11:()=>_random([1,1,1], true, _0to9),     //直选复式
  D13:()=>_random([1], false, _0to27),        //直选和值
  D14:()=>_random([1], false, _0to9),         //跨度
  D21:()=>_random([1], false, _1to26),        //组选和值
  D22:()=>_random([2], false, _0to9),         //组三
  D23:()=>_random([3], false, _0to9),         //组六
  D25:()=>_random([1], false, _0to9),         //组选包胆
  D31:()=>_random([1], false, _0to9),         //一码不定位
  D32:()=>_random([2], false, _0to9),         //二码不定位
  //前二
  C11:()=>_random([1,1], true, _0to9),       //直选复式
  C13:()=>_random([1], false, _0to18),        //直选和值
  C14:()=>_random([1], false, _0to9),         //跨度
  C21:()=>_random([2], false, _0to9),         //组选复式
  C23:()=>_random([1], false, _1to17),        //组选和值
  C24:()=>_random([1], false, _0to9),         //组选包胆
  //后二
  B11:()=>_random([1,1], true, _0to9),       //直选复式
  B13:()=>_random([1], false, _0to18),        //直选和值
  B14:()=>_random([1], false, _0to9),         //跨度
  B21:()=>_random([2], false, _0to9),         //组选复式
  B23:()=>_random([1], false, _1to17),        //组选和值
  B24:()=>_random([1], false, _0to9),         //组选包胆
  //一星
  A11:()=>oneStar(3),                          //一星
  //大小单双
  I11:()=>_random([1,1], true, _dsds),         //前二大小单双
  I12:()=>_random([1,1], true, _dsds),         //后二大小单双
}

//单式注单随机生成函数
var fc3dRandomNote = {  
  D12:()=>[0,0,0].map(item=>oneRandom(10)),        //后三单式
  D24:()=>_random([3], false, _0to9)[0],           //后三混合组选单式
  D26:()=>z3NoteBet(),                             //后三组三单式
  D27:()=>_random([3], false, _0to9)[0],           //后三组六单式
  C12:()=>[0,0].map(item=>oneRandom(10)),          //前二直选单式
  C22:()=>_random([2], false, _0to9)[0],           //前二组选单式
  B12:()=>[0,0].map(item=>oneRandom(10)),          //后二直选单式
  B22:()=>_random([2], false, _0to9)[0],           //后二组选单式
}

//特殊的，不能够注数为1的一些玩法
var fc3dSpecialMode = {
  F13:(feed)=>normalSum3(feed[0][0]),
  F14:(feed)=>diff3(feed[0][0]),
  F21:(feed)=>combSum3(feed[0][0]),
  F22:(feed)=>2,
  F25:(feed)=>54,
  E13:(feed)=>normalSum3(feed[0][0]),
  E14:(feed)=>diff3(feed[0][0]),
  E21:(feed)=>combSum3(feed[0][0]),
  E22:(feed)=>2,
  E25:(feed)=>54,
  D13:(feed)=>normalSum3(feed[0][0]),
  D14:(feed)=>diff3(feed[0][0]),
  D21:(feed)=>combSum3(feed[0][0]),
  D22:(feed)=>2,
  D25:(feed)=>54,
  C13:(feed)=>normalSum2(feed[0][0]),
  C14:(feed)=>diff2(feed[0][0]),
  C23:(feed)=>combSum2(feed[0][0]),
  C24:(feed)=>9,
  B13:(feed)=>normalSum2(feed[0][0]),
  B14:(feed)=>diff2(feed[0][0]),
  B23:(feed)=>combSum2(feed[0][0]),
  B24:(feed)=>9,
}

export {fc3dConfig, fc3dPlay,fc3dRandom,fc3dRandomNote,fc3dSpecialMode}
