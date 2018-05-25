<template>
  <div class="main" id="index">
    <!-- <router-link v-if="!s.constant._App" v-show="s.UserUpGradeBonus&&s.UserUpGradeBonus.Grade>2" tag="div" to="/ping" class='textMore dataType'><em>线路</em></router-link> -->
    <router-link v-if="notApp" tag="div" to="/AppDownload" class='textMore dataType'><em>APP <i class="iconfont">&#xe655;</i></em></router-link>
    <div id="banner">
      <!--<swiper ref="swiper">-->
        <!--<slide v-for="(i, index) in s.BannerList || s.SysBanner" :key="index">-->
          <!--<a v-if="i.Url==null||i.Url=='null'"><img :src="s.constant.ImgHost+i.Image" alt=""></a>-->
          <!--<template v-else>-->
            <!--<router-link v-if="i.Url && i.Url[0]==='/'" :to="setUrl(i.Url,true)"><img :src="s.constant.ImgHost+i.Image" alt=""></router-link>-->
            <!--<a v-else @click="setUrl(i.Url)"><img :src="s.constant.ImgHost+i.Image" alt=""></a>-->
          <!--</template>-->
        <!--</slide>-->
      <!--</swiper>-->
      <wc-swiper>
        <wc-slide v-for="(i, index) in s.BannerList || s.SysBanner" :key="index">
          <a v-if="i.Url==null||i.Url=='null'"><img :src="s.constant.ImgHost+i.Image" alt=""></a>
          <template v-else>
            <router-link v-if="i.Url && i.Url[0]==='/'" :to="setUrl(i.Url,true)"><img :src="s.constant.ImgHost+i.Image" alt=""></router-link>
            <a v-else @click="setUrl(i.Url)"><img :src="s.constant.ImgHost+i.Image" alt=""></a>
          </template>
        </wc-slide>
      </wc-swiper>
    </div>
    <div id="notice" v-if="!s.UserName||(s.NoticeData&&s.NoticeData.length)">
      <template v-if="s.UserName">
        <router-link v-for="(i, index) in s.NoticeData" class="active" :to="'/NoticeDetail?ID='+i.ID" :key="index"><i class="iconfont gonggao fl"></i><span>{{i.Title}}</span><i class="iconfont right fr"></i></router-link>
      </template>
      <a v-else><i class="iconfont gonggao fl"></i><span>欢迎来到{{s.constant._App?'彩神争霸':s.SiteConfig.Name}}</span></a>
    </div>
    <div class="hr1px"></div>

    <div id="HotLottery" v-if="s.LotteryList"
                         v-bind:style="{height:Math.ceil((nowDisplayList.length+1)/3)*5+'em'}">
      <ul>
        <li v-for="l in nowDisplayList">
          <router-link :class="'active L_'+s.LotteryList[l].LotteryType"
                       :to="'/lottery/'+s.LotteryList[l].LotteryType+'/'+l">
            <p>{{s.LotteryList[l].LotteryName}}</p>
            <span>{{s.LotteryList[l].LotteryIntro}}</span>
          </router-link>
        </li>
        <li>
          <router-link class="active L_more"
                      :to="'/lotteryHall'">
            <p>更多彩种</p>
          </router-link>

        </li>
        <li v-for="l in 3-((nowDisplayList.length+1)%3||3)"></li>
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
.swiper-wrapper{
  overflow:auto;
  height:130px !important;
}
</style>
