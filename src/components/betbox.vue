<template>
  <div class="betbox">
    <a class="active">
      <div>
        <p>北京快乐8<span>￥210.00</span></p><span>887109 期</span></div>
        <div class="fr">
          <strong class="InMoney fr">+14.950</strong>
          <span class="InMoney fr">已中奖</span>
        </div>
    </a>
    <div class="hr1px hr1px-list"></div>
  </div>
</template>
<style lang="scss">
.betbox{
  a{
    display: block;
    width: 100%;
    padding: 4px 5%;
    color: #000;
    >div{
      line-height: 1.25em;
      display: inline-block;
      p{
        font-size: .7em;
        span{
          font-size: .8em;
          margin-left: .4em;
        }
      }
      span{
        font-size: .7em;
        clear: both;
        color: #989898;
      }
    }
    >strong {
      line-height: 3.8em;
    }
    strong{
      font-weight: 400;
      font-size: .7em;
      float: right;
    }
  }
}
</style>