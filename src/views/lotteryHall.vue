<template>
  <div class="main">
<!--     <article>
      <h2>{{initData.Title}}</h2>
    </article> -->
    <!-- 彩种类别 -->
    <div class="nav-slider-wrapper">
      <div class="nav-top-pos">
        <div class="nav-top">
          <ul>
            <li v-for = "item in lotteryConfig"
                :class = "{on:item.LotteryClassName === nowLotteryClass}"
                @click="changeNowLotteryClass(item.LotteryClassName, item.LotteryList)">
              <a href="###">
                <p>{{item.LotteryClassName}}</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!--彩种列表  -->
    <div id="HotLottery"
         class="lottery-list-box"
         v-if="LotteryList"
         :style="{height:Math.ceil(len/3)*5+'em'}">
      <ul>
        <li v-for="l in nowDisplayList">
          <router-link :class="'active L_'+LotteryList[l].LotteryType"
                        :to="'/lottery/'+LotteryList[l].LotteryType+'/'+l">
            <p>{{LotteryList[l].LotteryName}}</p>
            <span>{{LotteryList[l].LotteryIntro}}</span>
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
