//接收礼物时验证正确性
var imgHost = "http://114.215.19.179:8002/"
var gifts = {
  // airplane:{
  // 	price:888
  // },
  aircraft:{
    price:888
  },
  boat:{
  	price:998
  },
  cannon:{
  	price:666
  },
  ferrari:{
  	price:1111
  },
  cuke:{
  	price:18
  },
  injections:{
  	price:88
  },
  kiss:{
  	price:1
  },
  durex:{
  	price:58
  },
  porsche:{
  	price:1234
  },
  money:{
  	price:1888
  },
  cupidgirl:{
  	price:520
  },
}
//礼物列表
let giftsList = [
  /*--礼物代号----礼物名称--价格-备注1----
   * 
   * 备注1：0：大礼物，1：连击礼物（属于小礼物），-1：非连击礼物（属于小礼物）
   */
  // ['airplane',  '飞机',   888, 0],
  ['aircraft',  '飞机',   888, 0],
  ['boat',      '皇家游轮',998, 0],
  ['cannon',    '皇家大炮',666, 0],
  ['cuke',      '小黄瓜',  18, -1],
  ['injections','兴奋剂',    88, -1],
  ['kiss',      '么么哒',  1,  1],
  ['durex',     '杜蕾斯',  58, -1],
  ['porsche',   '保时捷',  1234,0],
  ['money',     '发财树',  1888,0],
  ['cupidgirl', '爱神之箭',520, 0]
]
//表情列表

let faceData = {
  1:'😀',
  3:'😁',
  5:'😂',
  6:'😄',
  7:'😅',
  8:'😆',
  9:'😇',
  10:'😉',
  11:'😊',
  12:'😋',
  13:'😌',
  14:'😍',
  15:'😘',
  16:'😙',
  17:'😜',
  18:'😝',
  19:'😎',
  20:'😏',
  21:'😶',
  22:'😑',
  23:'😒',
  24:'😳',
  25:'😞',
  26:'😟',
  27:'😠',
  28:'😡',
  29:'😔',
  30:'😕',
  31:'😣',
  32:'😖',
  33:'😫',
  34:'😤',
  35:'😮',
  36:'😱',
  37:'😨',
  38:'😰',
}
module.exports = {gifts,giftsList,faceData,imgHost}