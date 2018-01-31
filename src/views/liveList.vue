<template>
  <div>
    <div class="list">
      <ul>
        <li>
          <router-link to="/live/K3/0101" class="pic" style="background: url('/static/img/livelist-k3.jpg') center">
            <span></span>
          </router-link>
          <div class="info fix">
            <em>UU快三</em>
            <p>颠覆性的美女直播投注玩法</p>
            <span>正在直播</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped lang="scss">
.list{
  margin-top:2.8em;
  li{
    // height: 8em;
    overflow: hidden;
  }
}
.pic{
  display: block;
  height: 8em;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  span{
    width: 100%;
    text-align: center;
    display: block;
    &:before{
      content:'\e646';
      display: inline-block;
      font-family: 'iconfont';
      font-size: 1em;
      color:white;
      background: rgba(0,0,0,.2);
      border-radius: 50%;
      width: 2.4em;
      height: 2.4em;
      line-height: 2.5em;
      margin-top:2.8em;
    }
  }
}
.info{
  background: white;
  padding: .3em .5rem;
  >*{
    display: block;
    float: left;
    line-height: 1.2em;
  }
  em{
    font-size: .7em;
    margin-right: .5rem;
    margin-top:.2em;
    width: 2.7rem;
  }
  p{
    font-size: .6em;
    padding-left: .5rem;
    border-left: 1px solid #ccc;
    margin-top:.3em;
    color:#666;
    width:9rem;
    text-overflow:ellipsis;
    overflow: hidden;
    white-space:nowrap;
  }
  span{
    float: right;
    font-size: .5em;
    background: -webkit-linear-gradient(left, #ff5f91 0%, #ffa070 100%);
    color: white;
    height:2em;
    line-height: 2em;
    padding:0 .8em;
    border-radius: 1.4em;
    width: 2.7rem;
    text-align:center;
  }
}
</style>