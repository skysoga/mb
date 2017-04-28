<template>
  <div class="main">
    <article>
      <h2>{{initData.Title}}</h2>
    </article>
    <nav-slider></nav-slider>
    <div id="HotLottery" class="lottery-list-box" v-if="s.LotteryList" :style="{height:Math.ceil(len/3)*5+'em'}">
      <ul>
        <li v-for="l in LList">
          <router-link :class="'active L_'+s.LotteryList[l].LotteryType" :to="'/lottery/'+s.LotteryList[l].LotteryType+'/'+l">
            <p>{{s.LotteryList[l].LotteryName}}</p>
            <span>{{s.LotteryList[l].LotteryIntro}}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script src="../js/lotteryHall.js"></script>
<style lang="scss" scoped>
  @import '../scss/lotteryHall.scss';
</style>
