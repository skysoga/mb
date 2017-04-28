<template>
  <div class="main">
    <article>
      <h2>{{initData.Title}}</h2>
    </article>
    <nav-slider></nav-slider>
    <div id="HotLottery" v-bind:style="{height:Math.ceil(len/3)*5+'em'}">

    </div>
  </div>
</template>
<script src="../js/lotteryHall.js"></script>
<style lang="scss" scoped>
  @import '../scss/lotteryHall.scss';
</style>
