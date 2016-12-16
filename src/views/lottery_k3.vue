<template>
 <div>
    <header class="top">
    <div>
      <p>玩法</p>
      <span id="MethodStr">
        和值
        <i class="iconfont xiala"></i>
      </span>
    </div>
    <div class="fr" id="lotteryChoice">甘肃<i class="iconfont xiala"></i></div>

    <a class="iconfont" @click = "back2index">&#xe60a;</a>
  </header>

  <section class="State">
    <div>
      <p id="openIssuse"><!-- 201607011234期开奖中 --></p>
      <div id="openResult">
        <div class="Dice"></div>
        <div class="Dice"></div>
        <div class="Dice"></div>
        <i class="iconfont xiala"></i>
      </div>
    </div>
    <div>
      <p id="thisIssuse"><!-- 距201607011234期截止 --></p>
      <div id="time"></div>
    </div>
    <table>
      <!-- 这里放开奖结果 -->
    </table>
  </section>
  <div class="main">
    <div class="MethodWrap">
      <div class="Method">
        <!-- 这里放选注主体 -->
      </div>
    </div>
  </div>

  <footer class="bottom">
    <table>
      <tbody>
        <tr>
          <td>当前选号</td>
          <td><span id="choice"></span></td>
        </tr>
        <tr>
          <td>每注金额</td>
          <td>
            <input type="tel" name="unit" maxlength="7" />
            <div id="maxReturn"></div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="ft0">
      <div class="fl" id="clear">清空</div>
      <p class="fl" id="total"></p>
      <div class="fr" id="bet">马上投注</div>
    </div>
  </footer>
 </div>
</template>

<script>
export default {
  created (){
    console.log(this.$route)
  },
  methods:{
    back2index(){
      store.commit('lt_leaveLottery')
      this.$router.push('/index')
    },
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/k3.scss';
</style>