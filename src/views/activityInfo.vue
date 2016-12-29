<template>
	<div class="activityMian main">
    <div class="activiTop" id="activiTop" ><img v-show="isimg" width="100%" :src="$store.state.constant.ImgHost+Img"></div>
    <!-- <h3>活动说明</h3> -->
    <div class="wrapExplain" id="wrapExplain" v-html="Content"></div>
</div>
</template>
<script src="../js/activityInfo.js"></script>
<style lang="scss" scoped>
  @import '../scss/activity.scss';
  @import '../scss/activity_info.scss';
  .main{
    min-height: 100%;
  }
</style>
