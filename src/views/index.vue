<template>
  <div class="main">
    <router-link v-if="!$store.state.constant._App" v-show="$store.state.UserUpGradeBonus&&$store.state.UserUpGradeBonus.Grade>2" tag="div" to="/ping" class='textMore dataType'><em>线路</em></router-link>
    <div id="banner">
      <swiper>
        <swiper-slide v-for="i in $store.state.BannerList||$store.state.SysBanner">
          <router-link :to="i.Url.replace('.html','')"><img :src="$store.state.constant.ImgHost+i.Image"></router-link>
        </swiper-slide>
      </swiper>
    </div>
    <div id="notice">
      <template v-if="$store.state.UserName">
        <router-link v-for="i in $store.state.NoticeData" class="active" :to="'/NoticeDetail?ID='+i.ID"><i class="iconfont gonggao fl"></i><span>{{i.Title}}</span><i class="iconfont right fr"></i></router-link>
      </template>
      <a v-else><i class="iconfont gonggao fl"></i><span>欢迎来到{{$store.state.SiteConfig?$store.state.SiteConfig.Name:'彩神争霸'}}</span></a>
    </div>
    <div class="hr1px"></div>
    <div id="HotLottery" v-if="$store.state.LotteryList" v-bind:style="{height:Math.ceil(len/3)*5+'em'}">
      <ul>
        <li v-for="l in LList">
          <router-link :class="'active L_'+$store.state.LotteryList[l].LotteryType" :to="'/lottery/'+$store.state.LotteryList[l].LotteryType+'/'+l">
            <p>{{$store.state.LotteryList[l].LotteryName}}</p>
            <span>{{$store.state.LotteryList[l].LotteryIntro}}</span>
          </router-link>
        </li>
        <li v-for="l in 3-(len%3||3)"></li>
      </ul>
    </div>
  </div>
</template>
<script src="../js/index.js"></script>
<style lang="scss" scoped>
@import '../scss/index.scss';
#HotLottery ul{
  -webkit-transform-origin: 0 0;
  -webkit-transform: scale(0.33333, 0.33333);
}
</style>
