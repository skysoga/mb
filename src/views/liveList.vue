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
    height: 1.8em;
    line-height: 1.8em;
    text-align: center;
    border-radius: .9em;
    font-size: .7em;
    margin-left: calc((16rem - 4em) / 2);
    margin-top:4em;
  }
}
.info{
  background: white;
  padding: .5em .5em;
  >*{
    display: block;
    float: left;
    line-height: 1em;
  }
  em{
    font-size: .7em;
    margin-right: .8em;
    margin-top:.1em;
    width: 4em;
  }
  p{
    font-size: .6em;
    padding-left: .8em;
    border-left: 1px solid #ccc;
    margin-top:.2em;
    color:#666;
  }
  span{
    float: right;
    font-size: .5em;
    background: #ff688d;
    color: white;
    height:1.6em;
    line-height: 1.6em;
    padding:0 .5em;
    border-radius: 1.4em;
  }
}
</style>