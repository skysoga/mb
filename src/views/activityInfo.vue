<template>
  <div class="activityMian main main-activity">
    <div class="activiTop" id="activiTop" ><img v-show="isimg" width="100%" :src="$store.state.constant.ImgHost+Img"></div>
    <!-- <h3>活动说明</h3> -->
    <div class="wrapExplain wrapExplain-01" id="wrapExplain" v-html="Content"></div>
</div>
</template>
<script src="../js/activityInfo.js"></script>
<style lang="scss" scoped>
  .main{
    min-height: 100%;
  }
</style>
<style>
  .activityMian img{
    max-width: 100%
  }
</style>
