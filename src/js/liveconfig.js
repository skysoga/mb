//接收礼物时验证正确性
var gifts = {
  airplane:{
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
  ['airplane',  '飞机',   888, 0],
  ['boat',      '皇家游轮',998, 0],
  ['cannon',    '皇家大炮',666, 0],
  ['ferrari',   '法拉利',  1111,0],
  ['cuke',      '小黄瓜',  18, -1],
  ['injections','打针',    88, -1],
  ['kiss',      '么么哒',  1,  1],
  ['durex',     '杜蕾斯',  58, -1],
  ['porsche',   '保时捷',  1234,0],
  ['money',     '发财树',  1888,0],
  ['cupidgirl', '爱神之箭',520, 0]
]
module.exports = {gifts,giftsList}
