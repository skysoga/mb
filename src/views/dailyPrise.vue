<template>
	<div class="activityMian main">
    <div class="activiTop">
        <img width="100%">
        <div class="rewardStatus" style="display:none">
            <em class="e1">昨日投注：<i>0</i></em>
            <em class="e2">当前等级：<i>未登录</i></em>
            <em class="e3">加奖比例：<i>0</i></em>
            <em class="e4">可得加奖：<i>0</i></em>
        </div>
        <div class="BTN unClick">
            <a>不可领取</a>
        </div>
    </div>
    <h3>加奖比例</h3>
    <table>
        <tr>
            <th>等级/投注额</th>
            <th>100+</th>
            <th>10000+</th>
            <th>200000+</th>
        </tr>
        <!-- <tr>
            <td>vip1</td>
            <td>0.1%</td>
            <td>0.3%</td>
            <td>0.6%</td>
        </tr>
         -->
    </table>
    <h3>活动说明</h3>
    <div class="wrapExplain"></div>
</div>
</template>
<script src="../js/dailyPrise.js"></script>
<style lang="scss" scoped>
  @import '../scss/activity.scss';
  //@import '../scss/activity_info.scss';
</style>
