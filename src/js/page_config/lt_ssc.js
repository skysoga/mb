import {factorial, mul, C, combNoRepeat, normalSum2, normalSum3, accumulate,
  diff2, diff3, combSum2, combSum3, countSingle, betSum, _random, _0to9, _dsds, _0to27, _1to26, _0to18, _1to17, oneRandom, oneStar} from '../kit'


var sscConfig = {
  "一星": {
    "定位胆": [{
      "name": "复式",
      "mode": "A11",
      "tip": "从万位、千位、百位、十位、个位任意位置上至少选择1个号码，选号与相同位置上的开奖号码一致。",
      "group": "一星",
      "subGroup": "定位胆",
      "tag": "一星复式",
      "default": true,
      "eg": ["1****", "1****"]
    }]
  },
  "前二": {
    "直选": [{
      "name": "直选复式",
      "mode": "C11",
      "tip": "每位至少选择一个号码，竞猜开奖号码的前二位，号码和位置都对应即中奖。",
      "group": "前二",
      "subGroup": "直选",
      "tag": "前二直选复式",
      "default": true,
      "eg": ["45***", "45***"]
    }, {
      "name": "直选单式",
      "mode": "C12",
      "tip": "每位至少选择一个号码，竞猜开奖号码的前二位，号码和位置都对应即中奖。",
      "group": "前二",
      "subGroup": "直选",
      "tag": "前二直选单式",
      "eg": ["45***", "45***"]
    }, {
      "name": "直选和值",
      "mode": "C13",
      "tip": "至少选择一个和值，竞猜开奖号码前二位数字之和。",
      "group": "前二",
      "subGroup": "直选",
      "tag": "前二直选和值",
      "eg": ["和值1", "01***,10***"]
    }, {
      "name": "跨度",
      "mode": "C14",
      "tip": "所选数值等于开奖号码的前二位最大与最小数字相减之差，即为中奖。",
      "group": "前二",
      "subGroup": "直选",
      "tag": "前二直选跨度",
      "eg": ["跨度8", "08***,19***,80***,91***"]
    }],
    "组选": [{
      "name": "组选复式",
      "mode": "C21",
      "tip": "从0-9中选择2个数字组成一注，所选号码与开奖号码的前二位相同，顺序不限（不含对子）。",
      "group": "前二",
      "subGroup": "组选",
      "tag": "前二组选复式",
      "eg": ["5,8", "58***（不限顺序）"]
    }, {
      "name": "组选单式",
      "mode": "C22",
      "tip": "从0-9中选择2个数字组成一注，所选号码与开奖号码的前二位相同，顺序不限（不含对子）。",
      "group": "前二",
      "subGroup": "组选",
      "tag": "前二组选单式",
      "eg": ["5,8", "58***（不限顺序）"]
    }, {
      "name": "组选和值",
      "mode": "C23",
      "tip": "所选数值等于开奖号码的前二位数字相加之和（不含对子）。",
      "group": "前二",
      "subGroup": "组选",
      "tag": "前二组选和值",
      "eg": ["和值1", "10***（不限顺序）"]
    }, {
      "name": "组选包胆",
      "mode": "C24",
      "tip": "从0-9中任意选择1个号码，开奖号码的前二位中任意1位包含所选的包胆号码相同（不含对子）。",
      "group": "前二",
      "subGroup": "组选",
      "tag": "前二组选包胆",
      "eg": ["包胆8", "x8***（不限顺序，x≠8）"]
    }]
  },
  "后二": {
    "直选": [{
      "name": "直选复式",
      "mode": "B11",
      "tip": "每位至少选择一个号码，竞猜开奖号码的后二位，号码和位置都对应即中奖。",
      "group": "后二",
      "subGroup": "直选",
      "tag": "后二直选复式",
      "default": true,
      "eg": ["***45", "***45"]
    }, {
      "name": "直选单式",
      "mode": "B12",
      "tip": "每位至少选择一个号码，竞猜开奖号码的后二位，号码和位置都对应即中奖。",
      "group": "后二",
      "subGroup": "直选",
      "tag": "后二直选单式",
      "eg": ["***45", "***45"]
    }, {
      "name": "直选和值",
      "mode": "B13",
      "tip": "至少选择一个和值，竞猜开奖号码后二位数字之和。",
      "group": "后二",
      "subGroup": "直选",
      "tag": "后二直选和值",
      "eg": ["和值1", "***01,***10"]
    }, {
      "name": "跨度",
      "mode": "B14",
      "tip": "所选数值等于开奖号码的后二位最大与最小数字相减之差，即为中奖。",
      "group": "后二",
      "subGroup": "直选",
      "tag": "后二直选跨度",
      "eg": ["跨度8", "***08,***19,***80,***91"]
    }],
    "组选": [{
      "name": "组选复式",
      "mode": "B21",
      "tip": "从0-9中选择2个数字组成一注，所选号码与开奖号码的后二位相同，顺序不限（不含对子）。",
      "group": "后二",
      "subGroup": "组选",
      "tag": "后二组选复式",
      "eg": ["5,8", "***58（不限顺序）"]
    }, {
      "name": "组选单式",
      "mode": "B22",
      "tip": "从0-9中选择2个数字组成一注，所选号码与开奖号码的后二位相同，顺序不限（不含对子）。",
      "group": "后二",
      "subGroup": "组选",
      "tag": "后二组选单式",
      "eg": ["5,8", "***58（不限顺序）"]
    }, {
      "name": "组选和值",
      "mode": "B23",
      "tip": "所选数值等于开奖号码的后二位数字相加之和（不含对子）。",
      "group": "后二",
      "subGroup": "组选",
      "tag": "后二组选和值",
      "eg": ["和值1", "***10（不限顺序）"]
    }, {
      "name": "组选包胆",
      "mode": "B24",
      "tip": "从0-9中任意选择1个号码，开奖号码的后二位中任意1位包含所选的包胆号码相同（不含对子）。",
      "group": "后二",
      "subGroup": "组选",
      "tag": "后二组选包胆",
      "eg": ["包胆8", "***x8（不限顺序,x≠8）"]
    }]
  },
  "前三": {
    "直选": [{
      "name": "复式",
      "mode": "F11",
      "tip": "每位至少选择一个号码，竞猜开奖号码的前三位，号码和位置都对应即中奖。",
      "group": "前三",
      "subGroup": "直选",
      "tag": "前三直选复式",
      "eg": ["456**", "456**"],
      "default": true
    }, {
      "name": "单式",
      "mode": "F12",
      "tip": "每位至少选择一个号码，竞猜开奖号码的前三位，号码和位置都对应即中奖。",
      "group": "前三",
      "subGroup": "直选",
      "tag": "前三直选单式",
      "eg": ["456**", "456**"]
    }, {
      "name": "直选和值",
      "mode": "F13",
      "tip": "至少选择一个和值，竞猜开奖号码前三位数字之和。",
      "group": "前三",
      "subGroup": "直选",
      "tag": "前三直选和值",
      "eg": ["和值1", "001**,010**,100**"]
    }, {
      "name": "跨度",
      "mode": "F14",
      "tip": "所选数值等于开奖号码的前3位最大与最小数字相减之差，即为中奖。",
      "group": "前三",
      "subGroup": "直选",
      "tag": "前三直选跨度",
      "eg": ["跨度8", "(1)前三数字08x（不限顺序）,x≠9;(2)前三数字19x（不限顺序）,x≠0"]
    }],
    "组选": [{
      "name": "组选和值",
      "mode": "F21",
      "tip": "至少选择一个和值，竞猜开奖号码前三位数字之和(不含豹子号)。",
      "group": "前三",
      "subGroup": "组选",
      "tag": "前三组选和值",
      "eg": ["和值6", "033**（不限顺序）", "和值6", "015**（不限顺序）"]
    }, {
      "name": "组三",
      "mode": "F22",
        "tip": "从0-9中选择2个数字组成两注，所选号码与开奖号码的前三位相同（必须含对子），顺序不限。",
      "group": "前三",
      "subGroup": "组选",
      "tag": "前三组选组三",
      "eg": ["112**", "112**（不限顺序）"]
    }, {
      "name": "组六",
      "mode": "F23",
        "tip": "从0-9中任意选择3个号码组成一注，所选号码与开奖号码的前三位相同（不含对子），顺序不限。",
      "group": "前三",
      "subGroup": "组选",
      "tag": "前三组选组六",
      "eg": ["123**", "123**（不限顺序）"]
    }, {
      "name": "混合组选",
      "mode": "F24",
      "tip": "手动输入号码，3个数字为一注，所选号码与开奖号码的前三位相同，顺序不限，即为中奖。",
      "group": "前三",
      "subGroup": "组选",
      "tag": "前三混合组选",
      "eg": ["001", "001**（不限顺序）", "123", "123**（不限顺序）"]
    }, {
      "name": "组选包胆",
      "mode": "F25",
      "tip": "从0-9中任意选择1个包胆号码，开奖号码的前三位中任意1位与所选包胆号码相同(不含豹子号)，即为中奖。",
      "group": "前三",
      "subGroup": "组选",
      "eg": ["包胆3", "3xx**或者33x**（不限顺序）", "包胆3", "3xy**（不限顺序）注：x≠y≠3"],
      "tag": "前三组选包胆"
    }, {
      "name": "组三单式",
      "mode": "F26",
      "tip": "手动输入号码，3个数字为一注，所选号码与开奖号码的前三位相同，顺序不限。",
      "group": "前三",
      "subGroup": "组选",
      "tag": "前三组三单式",
      "eg": ["112**", "112**（不限顺序）"]
    }, {
      "name": "组六单式",
      "mode": "F27",
      "tip": "手动输入号码，3个数字为一注，所选号码与开奖号码的前三位相同，顺序不限。",
      "group": "前三",
      "subGroup": "组选",
      "tag": "前三组六单式",
      "eg": ["123**", "123**（不限顺序）"]
    }],
    "不定位": [{
      "name": "一码不定位",
      "mode": "F31",
      "tip": "从0-9中至少选择1个号码投注，竞猜开奖号码前三位中包含这个号码，包含即中奖。",
      "group": "前三",
      "subGroup": "不定位",
      "tag": "前三一码不定位",
      "eg": ["1", "1xx**（不限顺序）"]
    }, {
      "name": "二码不定位",
      "mode": "F32",
      "tip": "从0-9中至少选择2个号码投注，竞猜开奖号码前三位中包含这2个号码，包含即中奖。",
      "group": "前三",
      "subGroup": "不定位",
      "tag": "前三二码不定位",
      "eg": ["1,2", "12x**（不限顺序）"]
    }]
  },
  "中三": {
    "直选": [{
      "name": "复式",
      "mode": "E11",
      "tip": "每位至少选择一个号码，竞猜开奖号码的中三位，号码和位置都对应即中奖。",
      "group": "中三",
      "subGroup": "直选",
      "tag": "中三直选复式",
      "default": true,
      "eg": ["*456*", "*456*"]
    }, {
      "name": "单式",
      "mode": "E12",
      "tip": "每位至少选择一个号码，竞猜开奖号码的中三位，号码和位置都对应即中奖。",
      "group": "中三",
      "subGroup": "直选",
      "tag": "中三直选单式",
      "eg": ["*456*", "*456*"]
    }, {
      "name": "直选和值",
      "mode": "E13",
      "tip": "至少选择一个和值，竞猜开奖号码中三位数字之和。",
      "group": "中三",
      "subGroup": "直选",
      "tag": "中三直选和值",
      "eg": ["和值1", "*001*，*010*，*100*"]
    }, {
      "name": "跨度",
      "mode": "E14",
      "tip": "所选数值等于开奖号码的中3位最大与最小数字相减之差，即是中奖。",
      "group": "中三",
      "subGroup": "直选",
      "tag": "中三直选跨度",
      "eg": ["跨度8", "(1)中三数组08x（不限顺序），x≠9(2)中三数字19x（不限顺序），x≠0"]
    }],
    "组选": [{
      "name": "组选和值",
      "mode": "E21",
      "tip": "至少选择一个和值，竞猜开奖号码中三位数字之和(不含豹子号)。",
      "group": "中三",
      "subGroup": "组选",
      "tag": "中三组选和值",
      "eg": ["和值6", "*033*（不限顺序）", "和值6", "*015*（不限顺序）"]
    }, {
      "name": "组三",
      "mode": "E22",
        "tip": "从0-9中选择2个数字组成两注，所选号码与开奖号码的中三位相同（必须含对子），且顺序不限，即中奖。",
      "group": "中三",
      "subGroup": "组选",
      "tag": "中三组选组三",
      "eg": ["*112*（1为二重号，2为单号）", "*112*（不限顺序）"]
    }, {
      "name": "组六",
      "mode": "E23",
        "tip": "从0-9中任意选择3个号码组成一注，所选号码与开奖号码的中三位相同（不含对子），顺序不限。",
      "group": "中三",
      "subGroup": "组选",
      "tag": "中三组选组六",
      "eg": ["*123*", "*123*（不限顺序）"]
    }, {
      "name": "混合组选",
      "mode": "E24",
      "tip": "手动输入号码，3个数字为一注，所选号码与开奖号码的中三位相同，顺序不限。",
      "group": "中三",
      "subGroup": "组选",
      "tag": "中三混合组选",
      "eg": ["001", "*001*（不限顺序）", "123", "*123*（不限顺序）"]
    }, {
      "name": "组选包胆",
      "mode": "E25",

      "tip": "从0-9中任意选择1个包胆号码，开奖号码的中三位中任意1位与所选包胆号码相同(不含豹子号)，即为中奖。",
      "group": "中三",
      "subGroup": "组选",
      "tag": "中三组选包胆",
      "eg": ["包胆3", "*3xx*或者*33x*（不限顺序）", "包胆3", "*3xy*（不限顺序）注：x≠y≠3"]
    }, {
      "name": "组三单式",
      "mode": "E26",

      "tip": "手动输入号码，至少输入 1 个三位数号码。(三个数字当中有二个数字相同),顺序不限。",
      "group": "中三",
      "subGroup": "组选",
      "tag": "中三组三单式",
      "eg": ["*112*", "*112*（不限顺序）"]
    }, {
      "name": "组六单式",
      "mode": "E27",

      "tip": "手动输入号码，3个数字为一注，所选号码与开奖号码的中三位相同，顺序不限。",
      "group": "中三",
      "subGroup": "组选",
      "tag": "中三组六单式",
      "eg": ["*123*", "*123*（不限顺序）"]
    }],
    "不定位": [{
      "name": "一码不定位",
      "mode": "E31",
      "tip": "从0-9中至少选择1个号码投注，竞猜开奖号码中三位中包含这个号码，包含即中奖。",
      "group": "中三",
      "subGroup": "不定位",
      "tag": "中三一码不定位",
      "eg": ["1", "*1xx*（不限顺序）"]
    }, {
      "name": "二码不定位",
      "mode": "E32",
      "tip": "从0-9中至少选择2个号码投注，竞猜开奖号码中三位中包含这2个号码。",
      "group": "中三",
      "subGroup": "不定位",
      "tag": "中三二码不定位",
      "eg": ["1,2", "*12x*（不限顺序）"]
    }]
  },
  "后三": {
    "直选": [{
      "name": "复式",
      "mode": "D11",
      "tip": "每位至少选择一个号码，竞猜开奖号码的后三位，号码和位置都对应即中奖。",
      "group": "后三",
      "subGroup": "直选",
      "tag": "后三直选复式",
      "default": true,
      "eg": ["**456", "**456"]
    }, {
      "name": "单式",
      "mode": "D12",
      "tip": "每位至少选择一个号码，竞猜开奖号码的后三位，号码和位置都对应即中奖。",
      "group": "后三",
      "subGroup": "直选",
      "tag": "后三直选单式",
      "eg": ["**456", "**456"]
    }, {
      "name": "直选和值",
      "mode": "D13",
      "tip": "至少选择一个和值，竞猜开奖号码后三位数字之和。",
      "group": "后三",
      "subGroup": "直选",
      "tag": "后三直选和值",
      "eg": ["和值1", "**001,**010,**100"]
    }, {
      "name": "跨度",
      "mode": "D14",
      "tip": "所选数值等于开奖号码的后3位最大与最小数字相减之差，即为中奖，最高奖金",
      "group": "后三",
      "subGroup": "直选",
      "tag": "后三直选跨度",
      "eg": ["跨度8", "(1)后三数字08x（不限顺序），x≠9;(2)后三数字19x（不限顺序）,x≠0"]
    }],
    "组选": [{
      "name": "组选和值",
      "mode": "D21",
      "tip": "至少选择一个和值，竞猜开奖号码后三位数字之和(不含豹子号)。",
      "group": "后三",
      "subGroup": "组选",
      "tag": "后三组选和值",
      "eg": ["和值6", "**033（不限顺序）", "和值6", "**015（不限顺序）"]
    }, {
      "name": "组三",
      "mode": "D22",
        "tip": "从0-9中选择2个数字组成两注，所选号码与开奖号码的后三位相同（必须含对子），且顺序不限。",
      "group": "后三",
      "subGroup": "组选",
      "tag": "后三组选组三",
      "eg": ["**112（1为二重号，2为单号）", "**112（不限顺序）"]
    }, {
      "name": "组六",
      "mode": "D23",
        "tip": "从0-9中任意选择3个号码组成一注，所选号码与开奖号码的后三位相同（不含对子），顺序不限。",
      "group": "后三",
      "subGroup": "组选",
      "tag": "后三组选组六",
      "eg": ["**123", "**123（不限顺序）"]
    }, {
      "name": "混合组选",
      "mode": "D24",

      "tip": "手动输入号码，3个数字为一注，所选号码与开奖号码的后三位相同，顺序不限，即为中奖。",
      "group": "后三",
      "subGroup": "组选",
      "tag": "后三混合组选",
      "eg": ["001", "**001（不限顺序）", "123", "**123（不限顺序）"]
    }, {
      "name": "组选包胆",
      "mode": "D25",
      "tip": "从0-9中任意选择1个包胆号码，开奖号码的后三位中任意1位与所选包胆号码相同(不含豹子号)，即为中奖。",
      "group": "后三",
      "subGroup": "组选",
      "tag": "后三组选包胆",
      "eg": ["包胆3", "**3xx或者**33x（不限顺序）", "包胆3", "**3xy（不限顺序）注：x≠y≠3"]
    }, {
      "name": "组三单式",
      "mode": "D26",
      "tip": "手动输入号码，3个数字为一注，所选号码与开奖号码的后三位相同，顺序不限。",
      "group": "后三",
      "subGroup": "组选",
      "tag": "后三组三单式",
      "eg": ["**112", "**112（不限顺序）"]
    }, {
      "name": "组六单式",
      "mode": "D27",
      "tip": "手动输入号码，3个数字为一注，所选号码与开奖号码的后三位相同，顺序不限。",
      "group": "后三",
      "subGroup": "组选",
      "tag": "后三组六单式",
      "eg": ["**123", "**123（不限顺序）"]
    }],
    "不定位": [{
      "name": "一码不定位",
      "mode": "D31",
      "tip": "从0-9中至少选择1个号码投注，竞猜开奖号码后三位中包含这个号码，包含即中奖。",
      "group": "后三",
      "subGroup": "不定位",
      "tag": "后三一码不定位",
      "eg": ["1", "**1xx（不限顺序）"]
    }, {
      "name": "二码不定位",
      "mode": "D32",
      "tip": "从0-9中至少选择2个号码投注，竞猜开奖号码后三位中包含这2个号码，包含即中奖。",
      "group": "后三",
      "subGroup": "不定位",
      "tag": "后三二码不定位",
      "eg": ["1,2", "**12x（不限顺序）"]
    }]
  },
  "四星": {
    "直选": [{
      "name": "复式",
      "mode": "G11",
      "tip": "每位至少选择一个号码，竞猜开奖号码的后四位，号码和位置都对应即中奖。",
      "group": "四星",
      "subGroup": "直选",
      "tag": "四星直选复式",
      "default": true,
      "eg": ["*3456", "*3456"]
    }, {
      "name": "单式",
      "mode": "G12",
      "tip": "每位至少选择一个号码，竞猜开奖号码的后四位，号码和位置都对应即中奖。",
      "group": "四星",
      "subGroup": "直选",
      "tag": "四星直选单式",
      "eg": ["*3456", "*3456"]
    }],
    "组选": [{
      "name": "组选24",
      "mode": "G21",
      "tip": "至少选择4个号码投注，竞猜开奖号码的后4位，号码一致顺序不限即中奖。",
      "group": "四星",
      "subGroup": "组选",
      "tag": "四星组选24",
      "eg": ["*2568", "*2568（不限顺序）"]
    }, {
      "name": "组选12",
      "mode": "G22",
      "tip": "至少选择1个二重号码和2个单号号码，竞猜开奖号码的后四位，号码一致顺序不限即中奖。",
      "group": "四星",
      "subGroup": "组选",
      "tag": "四星组选12",
      "eg": ["*2588（8为二重号，2、5为单号）", "*2588（不限顺序）"]
    }, {
      "name": "组选6",
      "mode": "G23",
      "tip": "至少选择2个二重号码，竞猜开奖号码的后四位，号码一致顺序不限即中奖。",
      "group": "四星",
      "subGroup": "组选",
      "tag": "四星组选6",
      "eg": ["*0088（0,8为二重号）", "*0088（不限顺序）"]
    }, {
      "name": "组选4",
      "mode": "G24",
      "tip": "至少选择1个三重号码和1个单号号码，竞猜开奖号码的后四位，号码一致顺序不限即中奖。",
      "group": "四星",
      "subGroup": "组选",
      "tag": "四星组选4",
      "eg": ["*2888（8为三重号，2为单号）", "*2888（不限顺序）"]
    }],
    "不定位": [{
      "name": "一码不定位",
      "mode": "G31",
      "tip": "从0-9中至少选择1个号码投注，竞猜开奖号码后四位中包含这个号码，包含即中奖。",
      "group": "四星",
      "subGroup": "不定位",
      "tag": "四星一码不定位",
      "eg": ["1", "*1xxx（不限顺序）"]
    }, {
      "name": "二码不定位",
      "mode": "G32",
      "tip": "从0-9中至少选择2个号码投注，竞猜开奖号码后四位中包含这2个号码，包含即中奖。",
      "group": "四星",
      "subGroup": "不定位",
      "tag": "四星二码不定位",
      "eg": ["1,2", "*12xx（不限顺序）"]
    }]
  },
  "五星": {
    "直选": [{
      "name": "复式",
      "mode": "H11",
      "tip": "每位至少选择一个号码，竞猜开奖号码的全部五位，号码和位置都对应即中奖。",
      "group": "五星",
      "subGroup": "直选",
      "tag": "五星直选复式",
      "eg": ["12345", "12345"],
      "default": true
    }, {
      "name": "单式",
      "mode": "H12",
      "tip": "每位至少选择一个号码，竞猜开奖号码的全部五位，号码和位置都对应即中奖。",
      "group": "五星",
      "subGroup": "直选",
      "eg": ["23456", "23456"],
      "tag": "五星直选单式"
    }],
    "组选": [{
      "name": "组选120",
      "mode": "H21",
      "tip": "至少选择五个号码投注，竞猜开奖号码的全部五位，号码一致顺序不限即中奖。",
      "group": "五星",
      "subGroup": "组选",
      "tag": "五星组选120",
      "eg": ["02568", "02568（不限顺序）"]
    }, {
      "name": "组选60",
      "mode": "H22",
      "tip": "至少选择1个二重号码和3个单号号码组成一注，竞猜开奖号码的全部五位，号码一致顺序不限即中奖。",
      "group": "五星",
      "subGroup": "组选",
      "tag": "五星组选60",
      "eg": ["02588（8为二重号，0、2、5为单号）", "02588（不限顺序）"]
    }, {
      "name": "组选30",
      "mode": "H23",
      "tip": "至少选择2个二重号码和1个单号号码组成一注，竞猜开奖号码的全部五位，号码一致顺序不限即中奖。",
      "group": "五星",
      "subGroup": "组选",
      "tag": "五星组选30",
      "eg": ["00588（0、8为二重号，5为单号）", "00588（不限顺序）"]
    }, {
      "name": "组选20",
      "mode": "H24",
      "tip": "至少选择1个三重号码和2个单号号码组成一注，竞猜开奖号码的全部五位，号码一致顺序不限即中奖。",
      "group": "五星",
      "subGroup": "组选",
      "tag": "五星组选20",
      "eg": ["02888（8为三重号，0、2为单号）", "02888（不限顺序）"]
    }, {
      "name": "组选10",
      "mode": "H25",
      "tip": "至少选择1个三重号码和1个二重号码组成一注，竞猜开奖号码的全部五位，号码一致顺序不限即中奖。",
      "group": "五星",
      "subGroup": "组选",
      "tag": "五星组选10",
      "eg": ["22888（2为二重号，8为三重号）", "22888（不限顺序）"]
    }, {
      "name": "组选5",
      "mode": "H26",
      "tip": "至少选择1个四重号码和1个单号号码组成一注，竞猜开奖号码的全部五位，号码一致顺序不限即中奖。",
      "group": "五星",
      "subGroup": "组选",
      "tag": "五星组选5",
      "eg": ["08888（8为四重号，0为单号）", "08888（不限顺序）"]
    }],
    "不定位": [{
      "name": "一码不定位",
      "mode": "H31",
      "tip": "从0-9中至少选择1个号码投注，竞猜开奖号码中包含这个号码，包含即中奖。",
      "group": "五星",
      "subGroup": "不定位",
      "tag": "五星一码不定位",
      "eg": ["1", "xx1xx（不限顺序）"]
    }, {
      "name": "二码不定位",
      "mode": "H32",
      "tip": "从0-9中至少选择2个号码投注，竞猜开奖号码中包含这2个号码，包含即中奖。",
      "group": "五星",
      "subGroup": "不定位",
      "tag": "五星二码不定位",
      "eg": ["1,2", "1x2xx（不限顺序）"]
    }, {
      "name": "三码不定位",
      "mode": "H33",
      "tip": "从0-9中至少选择3个号码投注，竞猜开奖号码中包含这3个号码，包含即中奖。",
      "group": "五星",
      "subGroup": "不定位",
      "tag": "五星三码不定位",
      "eg": ["1,2,3", "1x2x3（不限顺序）"]
    }],
    "趣味": [{
      "name": "一帆风顺",
      "mode": "H41",
      "tip": "从0-9中至少选择1个号码投注，竞猜开奖号码中包含这个号码，包含即中奖。",
      "group": "五星",
      "subGroup": "趣味",
      "tag": "五星一帆风顺",
      "eg": ["1", "xx1xx（不限顺序）"]
    }, {
      "name": "好事成双",
      "mode": "H42",
      "tip": "从0-9中至少选择1个号码投注，竞猜开奖号码中包含这个号码且正好出现2次，即中奖。",
      "group": "五星",
      "subGroup": "趣味",
      "tag": "五星好事成双",
      "eg": ["8", "xxx88（不限顺序）"]
    }, {
      "name": "三星报喜",
      "mode": "H43",
      "tip": "从0-9中至少选择1个号码投注，竞猜开奖号码中包含这个号码且正好出现3次，即中奖。",
      "group": "五星",
      "subGroup": "趣味",
      "tag": "五星三星报喜",
      "eg": ["8", "xx888（不限顺序）"]
    }, {
      "name": "四季发财",
      "mode": "H44",
      "tip": "从0-9中至少选择1个号码投注，竞猜开奖号码中包含这个号码且正好出现4次，即中奖。",
      "group": "五星",
      "subGroup": "趣味",
      "tag": "五星四季发财",
      "eg": ["8", "x8888（不限顺序）"]
    }]
  },    
  "大小单双": {
    "大小单双": [{
      "name": "前二",
      "mode": "I91",
      "tip": "从万位、千位中的“大、小、单、双”中至少各选一个组成一注。",
      "group": "大小单双",
      "subGroup": "大小单双",
      "tag": "前二大小单双",
      "default": true,
      "eg": ["小双", "万位与千位“小双”，即为中奖。"]
    }, {
      "name": "后二",
      "mode": "I92",
      "tip": "从十位、个位中的“大、小、单、双”中至少各选一个组成一注。",
      "group": "大小单双",
      "subGroup": "大小单双",
      "tag": "后二大小单双",
      "eg": ["大单", "十位与个位“大单”，即为中奖。"]
    }, {
      "name": "前三",
      "mode": "I93",
      "tip": "从万位、千位、百位中的“大、小、单、双”中至少各选一个组成一注。",
      "group": "大小单双",
      "subGroup": "大小单双",
      "tag": "前三大小单双",
      "eg": ["小双小", "万位、千位、百位“小双小”，即为中奖"]
    }, {
      "name": "后三",
      "mode": "I95",
      "tip": "从百位、十位、个位中的“大、小、单、双”中至少各选一个组成一注。",
      "group": "大小单双",
      "subGroup": "大小单双",
      "tag": "后三大小单双",
      "eg": ["大单大", "百位、十位、个位“大单大”，即为中奖"]
    }]
  },
  "猜豹子":{
    "1元模式":[{
      "name": "猜豹子",
      "mode": "J11",
      "tip": "从0-9中任选一位组成一注。",
      "group": "猜豹子",
      "subGroup": "1元模式",
      "tag": "猜豹子",
      "default": true,
      "eg": ["3", "开出号码“33333”，即为中奖。"]
    }]
  },
  "大小单双龙虎":{
    "1元模式":[{
      "name": "大小单双龙虎",
      "mode": "K11",
      "tip": "从总和/龙虎，万位，千位，百位，十位，个位中，任选一个属性组成一注。",
      "group": "大小单双龙虎",
      "subGroup": "1元模式",
      "tag": "大小单双龙虎",
      "default": true,
      "eg": ["龙,*", "万位大于个位“龙”，即为中奖。"]
    }]
  },
  "龙虎斗":{
    "1元模式":[{
      "name": "龙虎斗",
      "mode": "L11",
      "tip": "由万千，万百，万十，万个，千百，千十，千个，百十，百个，十个等分别有龙虎和属性组成,任选一个属性组成一注。",
      "group": "龙虎斗",
      "subGroup": "1元模式",
      "tag": "龙虎斗",
      "default": true,
      "eg": ["龙，*", "万位大于千位为“龙”，即为中奖。"]
    }]
  },
}

var sscPlay = {
  /**五星**/
  H11:{render:['10000', '1000', '100', '10', '1'], alg:(order, tmp)=>mul(5, betSum(order, tmp))},
  H12:{box:'normal', len:5},
  H21:{render:['zx120'], alg:(order,tmp)=>C(tmp['zx120'].length, 5)},
  H22:{render:['xx', 'x'],alg:(order,tmp)=>combNoRepeat(tmp['xx'],tmp['x'],3)},
  H23:{render:['xx', 'x'],alg:(order,tmp)=>combNoRepeat(tmp['x'],tmp['xx'],2)},
  H24:{render:['xxx', 'x'],alg:(order,tmp)=>combNoRepeat(tmp['xxx'],tmp['x'],2)},
  H25:{render:['xxx', 'xx'],alg:(order,tmp)=>combNoRepeat(tmp['xxx'],tmp['xx'],1)},
  H26:{render:['xxxx', 'x'],alg:(order,tmp)=>combNoRepeat(tmp['xxxx'],tmp['x'],1)},
  H31:{render:['budingwei'],alg:countSingle},
  H32:{render:['budingwei'],alg:(order,tmp)=>C(betSum(order,tmp)[0], 2)},
  H33:{render:['budingwei'],alg:(order,tmp)=>C(betSum(order,tmp)[0],3)},
  H41:{render:['yffs'],alg:countSingle},
  H42:{render:['hscs'],alg:countSingle},
  H43:{render:['sxbx'],alg:countSingle},
  H44:{render:['sjfc'],alg:countSingle},
  /**四星**/
  G11:{render:['1000','100','10','1'],alg:(order, tmp)=>mul(4, betSum(order, tmp))},
  G12:{box:'normal', len:4},
  G21:{render:['zx24'],alg:(order,tmp)=>C(tmp['zx24'].length, 4)},
  G22:{render:['xx','x'],alg:(order,tmp)=>combNoRepeat(tmp['xx'],tmp['x'],2)},
  G23:{render:['xx'],alg:(order,tmp)=>C(tmp['xx'].length, 2)},
  G24:{render:['xxx','x'],alg:(order,tmp)=>combNoRepeat(tmp['xxx'],tmp['x'],1)},
  G31:{render:['budingwei'],alg:countSingle},
  G32:{render:['budingwei'],alg:(order,tmp)=>C(tmp['budingwei'].length, 2)},
  /**前三**/
  F11:{render:['10000','1000','100'],alg:(order, tmp)=>mul(3, betSum(order, tmp))},
  F12:{box:'normal', len:3},
  F13:{render:['psum27'],alg:(order,tmp)=>accumulate(tmp['psum27'], normalSum3)},
  F14:{render:['diff'],alg:(order,tmp)=>accumulate(tmp['diff'],diff3)},
  F21:{render:['csum26'],alg:(order,tmp)=>accumulate(tmp['csum26'], combSum3)},
  F22:{render:['z3'],alg:(order,tmp)=>2 * C(tmp['z3'].length, 2)},
  F23:{render:['z6'],alg:(order,tmp)=>C(tmp['z6'].length,3)},
  F24:{box:'normal', len:3, special: 'b3x2x3'},
  F25:{render:['baodan'],alg:(order,tmp)=>54},
  F26:{box:'normal', len:3, special: 'b3x2'},
  F27:{box:'normal', len:3, special: 'b3x3'},
  F31:{render:['budingwei'],alg:countSingle},
  F32:{render:['budingwei'],alg:(order,tmp)=>C(tmp['budingwei'].length,2)},
  /**中三**/
  E11:{render:['1000','100','10'],alg:(order, tmp)=>mul(3, betSum(order, tmp))},
  E12:{box:'normal', len:3},
  E13:{render:['psum27'],alg:(order,tmp)=>accumulate(tmp['psum27'], normalSum3)},
  E14:{render:['diff'],alg:(order,tmp)=>accumulate(tmp['diff'],diff3)},
  E21:{render:['csum26'],alg:(order,tmp)=>accumulate(tmp['csum26'], combSum3)},
  E22:{render:['z3'],alg:(order,tmp)=>2 * C(tmp['z3'].length, 2)},
  E23:{render:['z6'],alg:(order,tmp)=>C(tmp['z6'].length,3)},
  E24:{box:'normal', len:3, special: 'b3x2x3'},
  E25:{render:['baodan'],alg:(order,tmp)=>54},
  E26:{box:'normal', len:3, special: 'b3x2'},
  E27:{box:'normal', len:3, special: 'b3x3'},
  E31:{render:['budingwei'],alg:countSingle},
  E32:{render:['budingwei'],alg:(order,tmp)=>C(tmp['budingwei'].length,2)},
  /**后三**/
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
  /**前二**/
  C11:{render:['10000','1000'],alg:(order,tmp)=>mul(2,betSum(order,tmp))},
  C12:{box:'normal', len:2},
  C13:{render:['psum18'],alg:(order,tmp)=>accumulate(tmp['psum18'],normalSum2)},
  C14:{render:['diff'],alg:(order,tmp)=>accumulate(tmp['diff'],diff2)},
  C21:{render:['zx'],alg:(order,tmp)=>C(tmp['zx'].length,2)},
  C22:{box:'normal', len:2, special: 'b2x2'},
  C23:{render:['csum17'],alg:(order,tmp)=>accumulate(tmp['csum17'].map(item=>item),combSum2)},
  C24:{render:['baodan'],alg:(order,tmp)=>9},
  /**后二**/
  B11:{render:['10','1'],alg:(order,tmp)=>mul(2,betSum(order,tmp))},
  B12:{box:'normal', len:2},
  B13:{render:['psum18'],alg:(order,tmp)=>accumulate(tmp['psum18'],normalSum2)},
  B14:{render:['diff'],alg:(order,tmp)=>accumulate(tmp['diff'],diff2)},
  B21:{render:['zx'],alg:(order,tmp)=>C(tmp['zx'].length,2)},
  B22:{box:'normal', len:2, special: 'b2x2'},
  B23:{render:['csum17'],alg:(order,tmp)=>accumulate(tmp['csum17'].map(item=>item),combSum2)},
  B24:{render:['baodan'],alg:(order,tmp)=>9},
  /**一星**/
  A11:{render:['10000', '1000', '100', '10', '1'],alg:(order, tmp)=>betSum(order, tmp).reduce(function(a,b){return a + b})},
  /**大小单双**/
  I91:{render:['i10000','i1000'],alg:(order,tmp)=>mul(2,betSum(order,tmp))},
  I92:{render:['i10','i1'],alg:(order,tmp)=>mul(2,betSum(order,tmp))},
  I93:{render:['i10000','i1000','i100'],alg:(order,tmp)=>mul(3,betSum(order,tmp))},
  I94:{render:['i1000','i100','i10'],alg:(order,tmp)=>mul(3,betSum(order,tmp))},
  I95:{render:['i100','i10','i1'],alg:(order,tmp)=>mul(3,betSum(order,tmp))},
  // 新玩法
  J11:{render:['cbz'],alg:(order, tmp)=>betSum(order, tmp).reduce(function(a,b){return a + b})},
  K11:{render:['zhlh','z10000','z1000','z100','z10','z1'],alg:(order, tmp)=>betSum(order, tmp).reduce(function(a,b){return a + b})},
  L11:{render:['wQian','wBai','wGe','qBai','qShi','qGe','bShi','bGe','sGe'],alg:(order, tmp)=>betSum(order, tmp).reduce(function(a,b){return a + b})},
}

var sscRandom = {
  //五星
  H11:()=>_random([1,1,1,1,1], true, _0to9),  //五星复式
  H21:()=>_random([5], false, _0to9),         //组选120
  H22:()=>_random([1,3], false, _0to9),       //组选60
  H23:()=>_random([2,1], false, _0to9),       //组选30
  H24:()=>_random([1,2], false, _0to9),       //组选20
  H25:()=>_random([1,1], false, _0to9),       //组选10
  H26:()=>_random([1,1], false, _0to9),       //组选5
  H31:()=>_random([1], false, _0to9),         //一码不定位
  H32:()=>_random([2], false, _0to9),         //二码不定位
  H33:()=>_random([3], false, _0to9),         //三码不定位
  H41:()=>_random([1], false, _0to9),         //一帆风顺
  H42:()=>_random([1], false, _0to9),         //好事成双
  H43:()=>_random([1], false, _0to9),         //三星报喜
  H44:()=>_random([1], false, _0to9),         //四季发财
  //四星
  G11:()=>_random([1,1,1,1], true, _0to9),    //四星复式
  G21:()=>_random([4], false, _0to9),         //四星组选24
  G22:()=>_random([1,2], false, _0to9),       //四星组选12
  G23:()=>_random([2], false, _0to9),         //四星组选6
  G24:()=>_random([1,1], false, _0to9),       //四星组选4
  G31:()=>_random([1], false, _0to9),         //一码不定位
  G32:()=>_random([2], false, _0to9),         //二码不定位
  //前三
  F11:()=>_random([1,1,1], true, _0to9),     //直选复式
  F13:()=>_random([1], false, _0to27),        //直选和值
  F14:()=>_random([1], false, _0to9),         //跨度
  F21:()=>_random([1], false, _1to26),        //组选和值
  F22:()=>_random([2], false, _0to9),         //组三
  F23:()=>_random([3], false, _0to9),         //组六
  F25:()=>_random([1], false, _0to9),         //组选包胆
  F31:()=>_random([1], false, _0to9),         //一码不定位
  F32:()=>_random([2], false, _0to9),         //二码不定位
  //中三
  E11:()=>_random([1,1,1], true, _0to9),     //直选复式
  E13:()=>_random([1], false, _0to27),        //直选和值
  E14:()=>_random([1], false, _0to9),         //跨度
  E21:()=>_random([1], false, _1to26),        //组选和值
  E22:()=>_random([2], false, _0to9),         //组三
  E23:()=>_random([3], false, _0to9),         //组六
  E25:()=>_random([1], false, _0to9),         //组选包胆
  E31:()=>_random([1], false, _0to9),         //一码不定位
  E32:()=>_random([2], false, _0to9),         //二码不定位
  //后三
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
  A11:()=>oneStar(),                          //一星
  //大小单双
  I91:()=>_random([1,1], true, _dsds),         //前二大小单双
  I92:()=>_random([1,1], true, _dsds),         //后二大小单双
  I93:()=>_random([1,1,1], true, _dsds),         //前三大小单双
  I95:()=>_random([1,1,1], true, _dsds),         //后三大小单双
}

var sscRandomNote = {
  H12:()=>[0,0,0,0,0].map(item=>oneRandom(10)),    //五星单式
  G12:()=>[0,0,0,0].map(item=>oneRandom(10)),      //四星单式
  F12:()=>[0,0,0].map(item=>oneRandom(10)),        //前三单式
  F24:()=>_random([3], false, _0to9)[0],           //前三混合组选单式
  F26:()=>z3NoteBet(),                             //前三组三单式
  F27:()=>_random([3], false, _0to9)[0],           //前三组六单式
  E12:()=>[0,0,0].map(item=>oneRandom(10)),        //中三单式
  E24:()=>_random([3], false, _0to9)[0],           //中三混合组选单式
  E26:()=>z3NoteBet(),                             //中三组三单式
  E27:()=>_random([3], false, _0to9)[0],           //中三组六单式
  D12:()=>[0,0,0].map(item=>oneRandom(10)),        //后三单式
  D24:()=>_random([3], false, _0to9)[0],           //后三混合组选单式
  D26:()=>z3NoteBet(),                             //后三组三单式
  D27:()=>_random([3], false, _0to9)[0],           //后三组六单式
  C12:()=>[0,0].map(item=>oneRandom(10)),          //前二直选单式
  C22:()=>_random([2], false, _0to9)[0],           //前二组选单式
  B12:()=>[0,0].map(item=>oneRandom(10)),          //后二直选单式
  B22:()=>_random([2], false, _0to9)[0],           //后二组选单式
}

var sscSpecialMode = {
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

export {sscConfig, sscPlay, sscRandom, sscRandomNote, sscSpecialMode}