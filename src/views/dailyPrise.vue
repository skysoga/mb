<template>
	<div class="activityMian main">
    <div class="activiTop">
        <img width="100%" :src="Img">
        <div class="rewardStatus" v-if="StateData">
            <em class="e1">昨日投注：<i>{{StateData.YesterdayBet}}</i></em>
            <em class="e2">当前等级：<i>VIP{{StateData.UserGrade}}</i></em>
            <em class="e3">加奖比例：<i>{{StateData.BonusRate}}</i></em>
            <em class="e4">可得加奖：<i>{{StateData.Bonus}}</i></em>
        </div>
        <div class="BTN" v-if="Login" :class="{unClick:UnClick}"><a @click="getBtn">{{ClickMsg}}</a></div>
    </div>
    <h3>加奖比例</h3>
    <table>
        <tr>
            <th>等级/投注额</th>
            <th v-for="v in RewardData[0].Title">{{v}}</th>
        </tr>
        <tr v-for="n in RewardData">
            <td>{{n.Grade}}</td>
            <td>{{n.Rewards[0]}}</td>
            <td>{{n.Rewards[1]}}</td>
            <td>{{n.Rewards[2]}}</td>
        </tr>

    </table>
    <h3>活动说明</h3>
    <div class="wrapExplain" v-html="Content"></div>
</div>
</template>
<script src="../js/dailyPrise.js"></script>
<style lang="scss" scoped>
  @import '../scss/activity.scss';
  @import '../scss/activity_info.scss';
</style>
