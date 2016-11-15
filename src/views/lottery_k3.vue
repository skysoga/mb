<template>
  <div class="main">
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
    <div class="MethodWrap">
      <div class="Method">
        <!-- 这里放选注主体 -->
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
<style lang="scss" scoped>
  @import '../scss/k3.scss';
</style>