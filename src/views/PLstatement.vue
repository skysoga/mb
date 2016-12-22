<template>
<div class="main PLS">
    <div class="PLSinfo">
        盈利金额
        <span>{{ArrObj.AllProfitLoss}}</span>
    </div>
    <div class="PLSpm">
        <i class="iconfont">&#xe610;</i>
        盈亏计算公式：中奖-投注+活动+返点
    </div>
    <div class="PLSdetailCon">
    <ul class="PLSdetail fix">
        <li><span>{{ArrObj.Betting|filNum}}</span>投注金额</li>
        <li><span>{{ArrObj.BonusMoney|filNum}}</span>中奖金额</li>
        <li><span>{{ArrObj.Activity|filNum}}</span>活动礼金</li>
        <li><span>{{ArrObj.Rebate|filNum}}</span>返点金额</li>
        <li><span>{{ArrObj.Recharge|filNum}}</span>充值金额</li>
        <li><span>{{ArrObj.Withdraw|filNum}}</span>提现金额</li>
    </ul>
    </div>
</div>
</template>
<script src="../js/PLstatement.js"></script>
<style lang="scss" scoped>
@import '../scss/PLstatement.scss'
</style>
