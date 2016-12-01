<template>
	<div class="activityMian main">
    <div class="activiTop">
    <img alt="" v-show="noimg" width="100%" :src="$store.state.constant.ImgHost+Img">
      <div class="rewardStatus" v-if="isBouns"><em class="e1">当前等级：<i>{{isBouns.Grade}}</i></em>
        <em class="e2">晋级奖励：<i>{{isBouns.GradeBonus}}</i></em></div>
      <div class="BTN" v-if="Login" :class="{unClick:UnClick}"><a @click="getBtn">{{ClickMsg}}</a></div>
    </div>
    <h3>晋级机制</h3>
    <table>
        <tr>
            <th>等级</th>
            <th>成长积分</th>
            <th>晋级奖励</th>
            <th>跳级奖励</th>
        </tr>
        <tr v-for="n in GradeList">
            <td>VIP{{n.Grade}}</td>
            <td>{{n.GradeGrow}}</td>
            <td>{{n.Bonus}}</td>
            <td>{{n.JumpBonus}}</td>
        </tr>
    </table>
    <h3>活动说明</h3>
    <div class="wrapExplain" v-html="Content"></div>
</div>
</template>
<script src="../js/upgrade.js"></script>
<style lang="scss" scoped>
  @import '../scss/activity.scss';
  @import '../scss/activity_info.scss';
</style>
