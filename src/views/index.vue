<template>
<div class="main">
  <div id="banner">
    <swiper>
     <swiper-slide v-for="i in $store.state.BannerList">
       <router-link :to="i.Url"><img :src="$store.state.constant.ImgHost+i.Image"></router-link>
     </swiper-slide>
    </swiper>
  </div>
  <div class="hr1px" style="position:absolute;z-index:2;width:100%;"></div>
  <div id="notice">
    <router-link v-for="i in $store.state.NoticeData" class="active" :to="'/NoticeDetail/'+i.ID"><i class="iconfont gonggao fl"></i><span>{{i.Title}}</span> <i class="iconfont right fr"></i></router-link>
  </div>
  <div class="hr1px"></div>

  <div id="HotLottery" v-bind:style="{height:Math.ceil($store.state.LotteryConfig[2].LotteryList.length/3)*3+'em'}">
    <ul v-for="lo in $store.state.LotteryConfig" v-if="lo.LotteryClassID=='14'">
      <li v-for="l in lo.LotteryList">
        <router-link class="active L_K3" to="lottery_k3">
          <p>{{$store.state.LotteryList[l].LotteryName}}</p>
          <span>{{$store.state.LotteryList[l].LotteryIntro}}</span>
        </router-link>
      </li>
      <li v-for="l in 3-(lo.LotteryList.length%3||3)"></li>
    </ul>
  </div>
</div>
</template>
<script src="../js/index.js"></script>
<style lang="scss" scoped>@import '../scss/index.scss';</style>
