import cl from './chinese-lunar'
var str49 = '从1-49中任选1个或多个号码，每个号码为一注，所选号码在开奖号码前六位中存在，即为中奖。'
var getZTStr = (numStr)=>`从1-49中任选1个或多个号码，每个号码为一注，所选号码与开奖号码第${numStr}位相同，即为中奖。`
var getBZStr = (numStr)=>`至少选择${numStr}个号码，每${numStr}个号码为一注，所有号码均未在开奖号码中出现，即为中奖。`
var getZMLMStr = (numStr)=>`开奖号码第${numStr}位，大于或等于25为大，小于或等于24为小；奇数为单，偶数为双；和单和双为两个数相加后得数的单双；尾大尾小即看个位数值，小于等于4为小，大于4为大；为49时为和，不算任何大小单双，但算波色。（每个按钮单独显示赔率）`

// var lunar = cl.solarToLunar(new Date(), 'A');
// console.log(lunar)
var natal = cl.solarToLunar(new Date(), 'A');  //本命 9-鸡
var animals = ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪']

console.log(natal)
function getAnimal(numStr, Natal){
  console.log(Natal, '实际')
  var natal = Natal || natal
  var natalIndex = animals.indexOf(natal)
  var num = (+numStr)%12
  var index = ((natalIndex + 13) - num)%12
  return animals[index]
}

function getAnimalIndex(char){
  var natalIndex = animals.indexOf(natal)
  var charIndex = animals.indexOf(char)
  var result = 1 + (natalIndex - charIndex)
  result = result < 0 ? (result + 12) : result
  return result
}


var hcConfig = {
  "特码":{
    "特码":[{
      "name": "直选",
      "mode": "A01",
      "tip": str49,
      "group": "特码",
      "subGroup": "特码",
      "tag": "直选",
      "eg":[],
      "default":true
    },{
      "name": "两面",
      "mode": "A02",
      "tip": "开奖号码最后一位为特码。大于或等于25为特码大，小于或等于24为特码小；奇数为单，偶数为双；特码两个数相加后得数，奇数为合单，偶数为合双，小于等于6为合小，大于6为合大；尾大尾小即看特码个位数值，小于等于4为小，大于4为大；特码为49时为和，不算任何大小单双，但算波色。（每个按钮单独显示赔率）",
      "group": "特码",
      "subGroup": "特码",
      "eg":["01 02","01 02 03 04 05 06 07 08 21 22 71 72 73 74 75 76 77 78 79 80"],
      "tag": "两面"
    }]
  },
  "正码":{
    "正码":[{
      "name": "任选",
      "mode": "B01",
      "tip": str49,
      "group": "正码",
      "subGroup": "正码",
      "tag": "任选",
      "eg":[],
      "default":true
    },
    // {
    //   "name": "正码合",
    //   "mode": "B02",
    //   "tip": "计算开奖号码前六位求和的值，小于150为总和小，大于等于150为总和大，是奇数为总和单，偶数为总和双，和值的个位数小于5为总尾小，大于等于5为总尾大。（每个按钮单独显示赔率）",
    //   "group": "正码",
    //   "subGroup": "正码",
    //   "tag": "正码合",
    //   "eg":[],
    // },
    {
      "name": "正一特",
      "mode": "B03",
      "tip": getZTStr('一'),
      "group": "正码",
      "subGroup": "正码",
      "tag": "正一特",
      "eg":[],
    },
    {
      "name": "正二特",
      "mode": "B04",
      "tip": getZTStr('二'),
      "group": "正码",
      "subGroup": "正码",
      "tag": "正二特",
      "eg":[],
    },
    {
      "name": "正三特",
      "mode": "B05",
      "tip": getZTStr('三'),
      "group": "正码",
      "subGroup": "正码",
      "tag": "正三特",
      "eg":[],
    },
    {
      "name": "正四特",
      "mode": "B06",
      "tip": getZTStr('四'),
      "group": "正码",
      "subGroup": "正码",
      "tag": "正四特",
      "eg":[],
    },
    {
      "name": "正五特",
      "mode": "B07",
      "tip": getZTStr('五'),
      "group": "正码",
      "subGroup": "正码",
      "tag": "正五特",
      "eg":[],
    },
    {
      "name": "正六特",
      "mode": "B08",
      "tip": getZTStr('六'),
      "group": "正码",
      "subGroup": "正码",
      "tag": "正六特",
      "eg":[],
    },
    {
      "name": "正一两面",
      "mode": "B09",
      "tip": getZMLMStr('一'),
      "group": "正码",
      "subGroup": "正码",
      "tag": "正一两面",
      "eg":[],
    },
    {
      "name": "正二两面",
      "mode": "B10",
      "tip": getZMLMStr('二'),
      "group": "正码",
      "subGroup": "正码",
      "tag": "正二两面",
      "eg":[],
    },
    {
      "name": "正三两面",
      "mode": "B11",
      "tip": getZMLMStr('三'),
      "group": "正码",
      "subGroup": "正码",
      "tag": "正三两面",
      "eg":[],
    },
    {
      "name": "正四两面",
      "mode": "B12",
      "tip": getZMLMStr('四'),
      "group": "正码",
      "subGroup": "正码",
      "tag": "正四两面",
      "eg":[],
    },
    {
      "name": "正五两面",
      "mode": "B13",
      "tip": getZMLMStr('五'),
      "group": "正码",
      "subGroup": "正码",
      "tag": "正五两面",
      "eg":[],
    },
    {
      "name": "正六两面",
      "mode": "B14",
      "tip": getZMLMStr('六'),
      "group": "正码",
      "subGroup": "正码",
      "tag": "正六两面",
      "eg":[],
    },
  ]},
  "连码":{
    "连码":[
      {
        "name": "三全中",
        "mode": "C01",
        "tip": '至少选择三个号码，每三个号码为一组合，若三个号码都是开奖号码之正码，即为中奖。',
        "group": "连码",
        "subGroup": "连码",
        "tag": "三全中",
        "eg":[],
        "default":true
      },
      {
        "name": "三中二",
        "mode": "C02",
        "tip": '至少选择三个号码，每三个号码为一组合，若其中至少有两个是开奖号码中的正码，即为中奖。若中两码，叫三中二之中二;若三码全中，叫三中二之中三。',
        "group": "连码",
        "subGroup": "连码",
        "tag": "三中二",
        "eg":[],
      },
      {
        "name": "二全中",
        "mode": "C03",
        "tip": '至少选择两个号码，每二个码号为一组合，二个号码都是开奖码号之正码（不含特码），即为中奖。',
        "group": "连码",
        "subGroup": "连码",
        "tag": "二全中",
        "eg":[],
      },
      {
        "name": "二中特",
        "mode": "C04",
        "tip": '至少选择两个号码，每二个号码为一组合，二个号码都是开奖号码（含特码），即为中奖。若两个都是正码，叫二中特之二中。若选号中包含特码，叫二中特之中特。',
        "group": "连码",
        "subGroup": "连码",
        "tag": "二中特",
        "eg":[],
      },
      {
        "name": "特串",
        "mode": "C05",
        "tip": '至少选择两个号码，每二个号码为一组合，其中一个是正码，一个是特别号码，即为中奖。',
        "group": "连码",
        "subGroup": "连码",
        "tag": "特串",
        "eg":[],
      },
    ]
  },
  "半波":{
    "半波":[
      {
        "name": "特码半波",
        "mode": "D01",
        "tip": "根据特码对应的特性来区分。分为红蓝绿三个波色，以及号码大于或等于25为大，小于或等于24为小；奇数为单，偶数为双；合单合双为开奖号的十位与个位相加后得数的单双。下注内容与号码特性完全吻合即为中奖。（每个按钮单独显示赔率）",
        "group": "半波",
        "subGroup": "半波",
        "tag": "特码半波",
        "eg":[],
        "default":true
      }
    ]
  },
  "生肖":{
    "生肖":[
      {
        "name": "特肖",
        "mode": "E01",
        "tip": "从十二生肖中任选1个或多个，每个生肖为一注，所选生肖与特码对应的生肖相同，即为中奖",
        "group": "生肖",
        "subGroup": "生肖",
        "tag": "特肖",
        "eg":[],
        "default":true
      },
      {
        "name": "一肖",
        "mode": "E02",
        "tip": "从十二生肖中任选1个或多个，每个生肖为一注，开奖号码（含特码）中含有投注所属生肖，即为中奖",
        "group": "生肖",
        "subGroup": "生肖",
        "tag": "一肖",
        "eg":[],
      },
      {
        "name": "二肖连",
        "mode": "E03",
        "tip": "至少选择两个生肖，每二个生肖为一组合，开奖号码（含特码）中含有投注所属全部生肖，即为中奖",
        "group": "生肖",
        "subGroup": "生肖",
        "tag": "二肖连",
        "eg":[],
      },
      {
        "name": "三肖连",
        "mode": "E04",
        "tip": "至少选择三个生肖，每三个生肖为一组合，开奖号码（含特码）中含有投注所属全部生肖，即为中奖",
        "group": "生肖",
        "subGroup": "生肖",
        "tag": "三肖连",
        "eg":[],
      },
      {
        "name": "四肖连",
        "mode": "E05",
        "tip": "至少选择四个生肖，每四个生肖为一组合，开奖号码（含特码）中含有投注所属全部生肖，即为中奖",
        "group": "生肖",
        "subGroup": "生肖",
        "tag": "四肖连",
        "eg":[],
      },
    ]
  },
  "尾数":{
    "尾数":[
      {
        "name": "特码头尾",
        "mode": "F01",
        "tip": '任意选择头尾，开奖号码（含特码）中含有投注对应头尾，即为中奖。',
        "group": "尾数",
        "subGroup": "尾数",
        "tag": "特码头尾",
        "eg":[],
        "default":true
      },
      {
        "name": "二尾连",
        "mode": "F02",
        "tip": "至少选择两个尾数，每两个尾数为一组合，开奖号码（含特码）中含有投注对应全部尾数，即为中奖。",
        "group": "尾数",
        "subGroup": "尾数",
        "tag": "二尾连",
        "eg":[],
      },
      {
        "name": "三尾连",
        "mode": "F03",
        "tip": "至少选择三个尾数，每三个尾数为一组合，开奖号码（含特码）中含有投注对应全部尾数，即为中奖。",
        "group": "尾数",
        "subGroup": "尾数",
        "tag": "三尾连",
        "eg":[],
      },
      {
        "name": "四尾连",
        "mode": "F04",
        "tip": "至少选择四个尾数，每四个尾数为一组合，开奖号码（含特码）中含有投注对应全部尾数，即为中奖。",
        "group": "尾数",
        "subGroup": "尾数",
        "tag": "四尾连",
        "eg":[],
      },
    ]
  },
  "不中":{
    "不中":[
      {
        "name": "五不中",
        "mode": "G01",
        "tip": getBZStr('五'),
        "group": "不中",
        "subGroup": "不中",
        "tag": "五不中",
        "eg":[],
        "default":true
      },
      {
        "name": "六不中",
        "mode": "G02",
        "tip": getBZStr('六'),
        "group": "不中",
        "subGroup": "不中",
        "tag": "六不中",
        "eg":[],
      },
      {
        "name": "七不中",
        "mode": "G03",
        "tip": getBZStr('七'),
        "group": "不中",
        "subGroup": "不中",
        "tag": "七不中",
        "eg":[],
      },
      {
        "name": "八不中",
        "mode": "G04",
        "tip": getBZStr('八'),
        "group": "不中",
        "subGroup": "不中",
        "tag": "八不中",
        "eg":[],
      },
      {
        "name": "九不中",
        "mode": "G05",
        "tip": getBZStr('九'),
        "group": "不中",
        "subGroup": "不中",
        "tag": "九不中",
        "eg":[],
      },
      {
        "name": "十不中",
        "mode": "G06",
        "tip": getBZStr('十'),
        "group": "不中",
        "subGroup": "不中",
        "tag": "十不中",
        "eg":[],
      },

    ]
  }
};

// 两面的按钮组
const lmItemArr = ['大','小','单','双','大单','大双','小单','小双','合大','合小','合单','合双','尾大','尾小','家禽','野兽','红波','绿波','蓝波']
// 特码半波
const tmbbItemArr = ['红大','红小','红单','红双','红合单','红合双','绿大','绿小','绿单','绿双','绿合单','绿合双','蓝大','蓝小','蓝单','蓝双','蓝合单','蓝合双']
const tmbbEgArr = [
    //红
    '29,30,34,35,40,45,46',
    '01,02,07,08,12,13,18,19,23,24',
    '01,07,13,19,23,29,35,45',
    '02,08,12,18,24,30,34,40,46',
    '01,07,12,18,23,29,30,34,45',
    '02,08,13,19,24,35,40,46',
    // 绿
    '27,28,32,33,38,39,43,44',
    '05,06,11,16,17,21,22',
    '05,11,17,21,27,33,39,43',
    '06,16,22,28,32,38,44',
    '05,16,21,27,32,38,43',
    '06,11,17,22,28,33,39,44',
    // 蓝
    '25,26,31,36,37,41,42,47,48',
    '03,04,09,10,14,15,20',
    '03,09,15,25,31,37,41,47',
    '04,10,14,20,26,36,42,48',
    '03,09,10,14,25,36,41,47',
    '04,15,20,26,31,37,42,48'
]
//生肖
const sxItemArr = animals
//获取各个生肖的示例文字
function getAnimalEg(char){
  if(animals.indexOf(char) === -1){
    return false
  }

  var eg = []
  var tmp = getAnimalIndex(char)
  if(tmp === 0){
    tmp = 12
  }
  while(tmp <= 49){
    eg.push(tmp)
    tmp = tmp + 12
  }
  return eg.join(',')
}


// //生肖的示例
// const sxEgArr = [
//   '10,22,34,46', '09,21,33,45', '08,20,32,44', '07,19,31,43','06,18,30,42', '05,17,29,41',
//   '04,16,28,40', '03,15,27,39', '02,14,26,38', '01,13,25,37,49', '12,24,36,48', '11,23,35,47'
// ]

var sxEgArr = animals.map(char=>getAnimalEg(char))

// 特码头尾
const tmtwItemArr = ['0头','1头','2头','3头','4头','0尾','1尾','2尾','3尾','4尾','5尾','6尾','7尾','8尾','9尾']
// 尾数
const wsItemArr = ['0尾','1尾','2尾','3尾','4尾','5尾','6尾','7尾','8尾','9尾']


var renderConfig = {
  'A01':{box:'colorbox', alg:1},
  'A02':{box:'normalbox', itemArr:lmItemArr, alg:1},
  'B01':{box:'colorbox', alg:1},
  // 'B02':{box:'normalbox', itemArr:['总和单','总和双','总和大','总和小','总尾大','总尾小'], alg:1},
  'B03':{box:'colorbox', alg:1},
  'B04':{box:'colorbox', alg:1},
  'B05':{box:'colorbox', alg:1},
  'B06':{box:'colorbox', alg:1},
  'B07':{box:'colorbox', alg:1},
  'B08':{box:'colorbox', alg:1},
  'B09':{box:'normalbox', itemArr:lmItemArr, alg:1},
  'B10':{box:'normalbox', itemArr:lmItemArr, alg:1},
  'B11':{box:'normalbox', itemArr:lmItemArr, alg:1},
  'B12':{box:'normalbox', itemArr:lmItemArr, alg:1},
  'B13':{box:'normalbox', itemArr:lmItemArr, alg:1},
  'B14':{box:'normalbox', itemArr:lmItemArr, alg:1},
  'C01':{box:'colorbox', alg:3},
  'C02':{box:'colorbox', alg:3},
  'C03':{box:'colorbox', alg:2},
  'C04':{box:'colorbox', alg:2},
  'C05':{box:'colorbox', alg:2},
  'D01':{box:'combobox',itemArr:tmbbItemArr, egArr:tmbbEgArr, needAward:true, alg:1},
  'E01':{box:'combobox',itemArr:sxItemArr, egArr:sxEgArr, needAward:true, alg:1},
  'E02':{box:'combobox',itemArr:sxItemArr, egArr:sxEgArr, needAward:true, alg:1},
  'E03':{box:'combobox',itemArr:sxItemArr, egArr: [], needAward:false, alg:2},
  'E04':{box:'combobox',itemArr:sxItemArr, egArr: [], needAward:false, alg:3},
  'E05':{box:'combobox',itemArr:sxItemArr, egArr: [], needAward:false, alg:4},
  'F01':{box:'combobox',itemArr:tmtwItemArr, egArr: [], needAward:true, alg:1},
  'F02':{box:'combobox',itemArr:wsItemArr, egArr: [], needAward:false, alg:2},
  'F03':{box:'combobox',itemArr:wsItemArr, egArr: [], needAward:false, alg:3},
  'F04':{box:'combobox',itemArr:wsItemArr, egArr: [], needAward:false, alg:4},
  'G01':{box:'colorbox', alg:5},
  'G02':{box:'colorbox', alg:6},
  'G03':{box:'colorbox', alg:7},
  'G04':{box:'colorbox', alg:8},
  'G05':{box:'colorbox', alg:9},
  'G06':{box:'colorbox', alg:10}
}

export {hcConfig, renderConfig, natal, animals, getAnimal, getAnimalIndex}