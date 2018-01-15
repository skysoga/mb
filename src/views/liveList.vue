<template>
  <div>
    <div class="list">
      <ul>
        <li>
          <router-link to="/live/K3/0101" class="pic" style="background: url('http://192.168.0.103:8080/static/img/newk3-bg.jpg')">
            <span>开始</span>
          </router-link>
          <div class="info fix">
            <em>UU快三</em>
            <p>平台第一款真人直播开奖彩票</p>
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
    background: rgba(0,0,0,.2);
    color:white;
    display: inline-block;
    width: 4em;
    height: 4em;
    line-height: 4em;
    text-align: center;
    border-radius: 4em;
    font-size: .7em;
    margin-left: calc((16rem - 4em) / 2);
    margin-top:4em;
  }
}
.info{
  background: white;
  padding: .3em .5em;
  >*{
    display: block;
    float: left;
    line-height: 1em;
  }
  em{
    font-size: .7em;
    margin-right: .8em;
    margin-top:.3em;
    width: 4em;
  }
  p{
    font-size: .6em;
    padding-left: .8em;
    border-left: 1px solid #ccc;
    margin-top:.4em;
    color:#666;
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
  }
}
</style>