<template>
<div class = "isLotteryCon">
  <div class = "result">
    <span class = "text-small">
      2017056期开奖号码 <i class = "iconfont">&#xe601;</i>
    </span>
    <div class = "openNumber">
      <div class = "number-box"><em class = "red">07</em><span class = "number-box-text">兔</span></div>
      <div class = "number-box"><em class = "blue">05</em><span class = "number-box-text">蛇</span></div>
      <div class = "number-box"><em class = "green">15</em><span class = "number-box-text">羊</span></div>
      <div class = "number-box"><em class = "red">10</em><span class = "number-box-text">鼠</span></div>
      <div class = "number-box"><em class = "red">01</em><span class = "number-box-text">鸡</span></div>
      <div class = "number-box"><em class = "red">09</em><span class = "number-box-text">牛</span></div>
      <div class = "number-box"><span class = "symbol">+</span></div>
      <div class = "number-box"><em class = "red">03</em><span class = "number-box-text">羊</span></div>
    </div>
  </div>

  <div class = "timebar">

  </div>

</div>
</template>

<script>
export default {
  created(){
    console.log('time-result')
  }
}
</script>

<style lang = "scss" scoped>
@mixin bg-linear-gradient($v){
  background: -ms-linear-gradient(unquote($v));
  background: -moz-linear-gradient(unquote($v));
  background: linear-gradient(unquote('to '+$v));
  background: -webkit-linear-gradient(unquote($v));
}

.isLotteryCon{
  display: flex;
  position: fixed;
  top:2.3em;
  left: 0;
  width: 100%;
  background: #e1d9ba;
  z-index: 5;
  height: 4.2rem;
}

.result{
  flex:2;
  margin-top:.2rem;
}

.timebar{
  flex:1;
  border-left:1px solid #bdb48b;
}

.symbol{
  font-size:1.2em;
  padding:0.1rem;
}

.openNumber{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width:100%;
  height:2.8rem;
  padding:0 .6rem;
  font-size:.7em;
}

.number-box{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height:2.2rem;
  /*border: 1px solid #aaa;*/
  em{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.8em;
    height: 1.8em;
    /*background: #dc3b40;*/
    @include bg-linear-gradient('top, #f86469 0%,#bf1f24 75%')
    box-shadow: 0px 3px 1px #bbb59c;
    border-radius: 50%;
    color:white;
    font-size: 0.8em;
  }

  em.red{
    background: #dc3b40;
  }

  em.blue{
    background: #218ddd;
  }

  em.green{
    background: #38b366;
  }
}

.number-box-text{margin-top:.2rem;}


/*.openNumber{
  em{
    display: inline-block;
    vertical-align: top;
    background: #dc3b40;
    @include bg-linear-gradient('top, #f86469 0%,#bf1f24 75%')
    box-shadow: 0px 3px 1px #bbb59c;
    color:white;
    width: 1.4em;
    height: 1.4em;
    line-height: 1.5em;
    border-radius: 50%;
    text-align: center;
    margin: 0 0.2em;
    font-size: 0.8em;
  }
}
*/
.text-small{
  font-size:.6em;
  margin-left:1rem;
}
</style>