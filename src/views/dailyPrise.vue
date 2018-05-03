<template>
  <div class="activityMian main main-activity">
    <div class="activiTop">
        <img width="100%" v-show="Img" :src="$store.state.constant.ImgHost+Img">
        <div class="rewardStatus">
            <em class="e1">昨日投注：<i v-if="StateData.YesterdayBet">{{StateData.YesterdayBet}}</i><i v-else>0</i></em>
            <em class="e2">当前等级：<i v-if="StateData.UserGrade">VIP{{StateData.UserGrade}}</i><i v-else>未登录</i></em>
            <em class="e3">加奖比例：<i v-if="StateData.BonusRate">{{+StateData.BonusRate}}%</i><i v-else>0</i></em>
            <em class="e4">可得加奖：<i v-if="StateData.Bonus">{{StateData.Bonus}}</i><i v-else>0</i></em>
        </div>
        <div class="BTN BTN-activity" :class="{unClick:UnClick}"><a @click="getBtn">{{ClickMsg}}</a></div>
    </div>
    <h3>加奖比例</h3>
    <table>
        <tr>
            <th>等级/投注额</th>
            <th v-for="v in $store.state.RewardData[0].Title">{{v}}</th>
        </tr>
        <tr v-for="n in $store.state.RewardData">
            <td>{{n.Grade}}</td>
            <td>{{n.Rewards[0]}}</td>
            <td>{{n.Rewards[1]}}</td>
            <td>{{n.Rewards[2]}}</td>
        </tr>

    </table>
    <h3>活动说明</h3>
    <div class="wrapExplain wrapExplain-01" v-html="Content"></div>
</div>
</template>
<script src="../js/dailyPrise.js"></script>