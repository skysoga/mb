var spring = [
  [2017,1,28],
  [2018,2,16],
  [2019,2,5],
  [2020,1,25],
  [2021,2,12],
  [2022,2,1],
  [2023,1,22],
  [2024,2,10],
  [2025,1,29],
  [2026,2,17],
  [2027,2,6],
  [2028,1,26],
  [2029,2,13],
  [2030,2,3],
  [2031,1,23],
  [2032,2,11],
  [2033,1,31],
  [2034,2,19],
  [2035,2,8],
  [2036,1,28],
  [2037,2,15],
  [2038,2,4],
  [2039,1,24],
  [2040,2,12],
  [2041,2,1],
  [2042,1,22],
  [2043,2,10],
  [2044,1,30],
  [2045,2,17],
  [2046,2,6],
  [2047,1,26],
  [2048,2,14],
  [2049,2,2],
  [2050,1,23],
]

var animal = '猴鸡狗猪鼠牛虎兔龙蛇马羊'.split('')

function getTimeFromYMD(ymd){
  var [yy, mm, dd] = ymd
  return new Date(yy, mm -1, dd).getTime()
}

// 返回生肖
function getNatal(timeObj){
  var time = timeObj.getTime()
  for(var i =0;i < spring.length;i++){
    if(time < getTimeFromYMD(spring[i])){
      return animal[i % 12]
    }
  }
}

export default getNatal