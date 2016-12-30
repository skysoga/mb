<template>
	<div class="activityMian main">
    <div class="activiTop">
    <img alt="" v-show="Img" width="100%" :src="$store.state.constant.ImgHost+Img">
      <div class="rewardStatus" v-if="$store.state.UserUpGradeBonus"><em class="e1">当前等级：<i>VIP{{$store.state.UserUpGradeBonus.Grade}}</i></em>
        <em class="e2">晋级奖励：<i>{{$store.state.UserUpGradeBonus.GradeBonus}}</i></em></div>
      <div class="rewardStatus" v-else><em class="e1">当前等级：<i>未登录</i></em>
        <em class="e2">晋级奖励：<i>0</i></em></div>
      <div class="BTN" v-if="$store.state.UserUpGradeBonus" :class="$store.state.UserUpGradeBonus.State&&'unClick'"><a @click="getBtn">{{$store.state.UserUpGradeBonus.State==0?'立即领取':$store.state.UserUpGradeBonus.State==1?'已领取':'不可领取'}}</a></div>
      <div class="BTN unClick" v-else>不可领取</div>
    </div>
    <h3>晋级机制</h3>
    <table>
        <tr>
            <th>等级</th>
            <th>成长积分</th>
            <th>晋级奖励</th>
            <th>跳级奖励</th>
        </tr>
        <tr v-for="n in $store.state.GradeList">
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
