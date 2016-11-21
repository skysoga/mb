<template>
	<div class="main" style="padding-bottom: 0;">
    <div class='textMore dataType' @click="BottomBoxShow=true"><em>{{dataName}}</em> <i class='iconfont'>&#xe601;</i></div>
    <div class="searchBtn">
      <div class="searchCon">
        <input class="proxySearch" type="text" placeholder="下级报表查询" value="">
      </div>
      <a id="submitBtn"><div class="submitTouch"><i class="iconfont">&#xe60e;</i></div></a></div>
    <div class="proxy3colCon" id="proxy3colCon">
      <ul class="PLSdetail fix">
          <li><span>¥0.00</span>投注金额</li>
          <li><span>¥0.00</span>中奖金额</li>
          <li><span>¥0.00</span>活动礼金</li>
          <li><span>¥0.00</span>团队返点</li>
          <li><span>¥0.00</span>团队盈利</li>
          <li><span>¥0.00</span>充值金额</li>
          <li><span>¥0.00</span>提现金额</li>
          <li><span>¥0.00</span>首充人数</li>
          <li><span>¥0.00</span>注册人数</li>
          <li><span>¥0.00</span>投注人数</li>
          <li><span>¥0.00</span>团队人数</li>
          <li><span>¥0.00</span>团队余额</li>
          <li><span>¥0.00</span>代理返点</li>
          <li><span>¥0.00</span>代理工资</li>
          <li><span>¥0.00</span>代理分红</li>
      </ul>
    </div>
    <bottom-box v-show = "BottomBoxShow"
                 :list = "BottomBoxList"
                 ></bottom-box>
  </div>
</template>
<script src="../js/agentReport.js"></script>
<style lang="scss" scoped>
  @import '../scss/personalinfo.scss';
</style>
