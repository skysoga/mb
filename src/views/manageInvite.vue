<template>
	<div class="main creatAccount" style="padding-bottom: 0;">
    <div class="creatAccountTitle radio">
      开户类型
        <input type="radio" value="1" v-model="UserType" id="radio1">
        <label for="radio1">代理类型</label>
        <input type="radio" value="0" v-model="UserType" id="radio2">
        <label for="radio2">玩家类型</label>
        <p>请先为下级设置返点，<router-link style="color:#dc3b40" to="/rebateDes">点击查看返点赔率表</router-link></p>
    </div>
    <div class="tabLI">
      <ul class="creatAccountDetail Backli">
        <li v-for="n in caiList">
          <span>{{caiName[n.LotteryType]}}</span><input
                 v-va:EXTEND
                 type="number"
                 :name="n.LotteryType"
                 :tag="caiName[n.LotteryType]"
                 :placeholder="'自身返点'+n.Point+'，可设置返点'+n.MinPoint+'-'+n.Point"
                 :min="n.MinPoint"
                 value=""
                 :max="n.Point"></li>
      </ul>
      <a class="BTN submitBtn" v-va-check>生成邀请码</a>
    </div>
  </div>
</template>
<script src="../js/manageInvite.js"></script>
<style lang="scss" scoped>
  @import '../scss/personalinfo.scss';
</style>
