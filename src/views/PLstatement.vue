<template>
<div class="main PLS">
    <div class="PLSinfo">
        盈利金额
        <span>{{AllProfitLoss}}</span>
    </div>
    <div class="PLSpm">
        <i class="iconfont">&#xe610;</i>
        盈亏计算公式：中奖-投注+活动+返点
    </div>
    <div class="PLSdetailCon">
    <ul class="PLSdetail fix">
        <li><span>{{Betting}}</span>投注金额</li>
        <li><span>{{BonusMoney}}</span>中奖金额</li>
        <li><span>{{Activity}}</span>活动礼金</li>
        <li><span>{{Rebate}}</span>返点金额</li>
        <li><span>{{Recharge}}</span>充值金额</li>
        <li><span>{{Withdraw}}</span>提现金额</li>
    </ul>
    </div>
</div>
</template>
<script src="../js/PLstatement.js"></script>
<style lang="scss" scoped>
@import '../scss/PLstatement.scss'
</style>
