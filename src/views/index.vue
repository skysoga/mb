<template>
  <div class="main">
    <div id="banner">
      <div class="hd">
        <ul>

        </ul>
      </div>
      <div class="bd">
        <ul v-for="i in $store.state.BannerList">
          <li><router-link :to="i.Url"><img :src="$store.state.constant.ImgHost+i.Image"></router-link></li>
        </ul>
      </div>
      <div class="tempWrap" style="overflow:hidden; position:relative;"><div class="bd" style="width: 1280px; position: relative; overflow: hidden; padding: 0px; margin: 0px; transition-duration: 200ms; transform: translate(-960px, 0px) translateZ(0px);"><ul style="display: table-cell; vertical-align: top; width: 320px;"><li><a href="/activity.html"><img src="http://images.dafa176.com/test/pc/banner/banner1.png"></a></li></ul><ul style="display: table-cell; vertical-align: top; width: 320px;"><li><a href="/activity.html"><img src="http://images.dafa176.com/test/pc/banner/banner2.png"></a></li></ul><ul style="display: table-cell; vertical-align: top; width: 320px;"><li><a href="/activity.html"><img src="http://images.dafa176.com/test/pc/banner/banner3.png"></a></li></ul><ul style="display: table-cell; vertical-align: top; width: 320px;"><li><a href="/lottery.html"><img src="http://images.dafa176.com/test/pc/banner/banner4.png"></a></li></ul></div></div>
    </div>
    <div class="hr1px" style="position:absolute;z-index:2;width:100%;"></div>
    <div id="notice">
      <router-link v-for="i in $store.state.NoticeData" class="active" :to="'/NoticeDetail/'+i.ID"><i class="iconfont gonggao fl"></i><span>{{i.Title}}</span> <i class="iconfont right fr"></i></router-link>
    </div>
    <div class="hr1px"></div>

    <div id="HotLottery" v-bind:style="{height:Math.ceil($store.state.LotteryConfig.length/3)*3+'em'}">
      <ul>
      <li v-for="l in $store.state.LotteryConfig">
        <a class="active L_K3" href="lottery_k3.html?lottery=1401">
          <p>{{$store.state.LotteryList[l].LotteryName}}</p>
          <span>{{$store.state.LotteryList[l].LotteryIntro}}</span>
        </a>
      </li>
      <li v-for="l in 3-($store.state.LotteryConfig.length%3||3)"></li>
      </ul>
    </div>
  </div>
</template>
<script src="../js/index.js"></script>
<style lang="scss" scoped>
  @import '../scss/index.scss';
</style>