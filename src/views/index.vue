<template>
  <div class="main" id="index">
    <!-- <router-link v-if="!s.constant._App" v-show="s.UserUpGradeBonus&&s.UserUpGradeBonus.Grade>2" tag="div" to="/ping" class='textMore dataType'><em>线路</em></router-link> -->
    <router-link v-if="!s.constant._App" tag="div" to="/AppDownload" class='textMore dataType'><em>APP <i class="iconfont">&#xe655;</i></em></router-link>
    <div id="banner">
      <swiper>
        <swiper-slide v-for="i in s.BannerList||s.SysBanner">
          <router-link v-if="i.Url[0]==='/'" :to="i.Url.replace('.html','')"><img :src="s.constant.ImgHost+i.Image"></router-link>
          <a v-else :href="s.constant._App?'javascript:':i.Url" target="_blank"><img :src="s.constant.ImgHost+i.Image"></a>
        </swiper-slide>
      </swiper>
    </div>
    <div id="notice" v-if="!s.UserName||(s.NoticeData&&s.NoticeData.length)">
      <template v-if="s.UserName">
        <router-link v-for="i in s.NoticeData" class="active" :to="'/NoticeDetail?ID='+i.ID"><i class="iconfont gonggao fl"></i><span>{{i.Title}}</span><i class="iconfont right fr"></i></router-link>
      </template>
      <a v-else><i class="iconfont gonggao fl"></i><span>欢迎来到{{s.constant._App?'彩神争霸':s.SiteConfig.Name}}</span></a>
    </div>
    <div class="hr1px"></div>
    <div id="HotLottery" v-if="s.LotteryList" v-bind:style="{height:Math.ceil(len/3)*5+'em'}">
      <ul>
        <li v-for="l in LList">
          <router-link :class="'active L_'+s.LotteryList[l].LotteryType" :to="'/lottery/'+s.LotteryList[l].LotteryType+'/'+l">
            <p>{{s.LotteryList[l].LotteryName}}</p>
            <span>{{s.LotteryList[l].LotteryIntro}}</span>
          </router-link>
        </li>
        <!-- <li v-for="l in 3-(len%3||3)"></li> -->
        <li>
          <router-link class="active L_more" :to="'/lotteryHall'">
            <p>更多彩种</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script src="../js/index.js"></script>
<style lang="scss" scoped>
@import '../scss/index.scss';
#HotLottery ul {
  -webkit-transform-origin: 0 0;
  -webkit-transform: scale(0.33333, 0.33333);
}
</style>
