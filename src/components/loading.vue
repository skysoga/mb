<template>
  <div class="fullLoading" id="PageLoading" v-show="isDataNot">
    <div class="loadingCell">
      <div class="iconLoadingCon">
        <img class="loadingImg" src="http://imagess-google.com/system/mobile/lottery/loadingMobile.gif" alt="">
      </div>
    </div>
  </div>
</template>
<style lang='scss' scoped>
  .loadingImg{
    height: 3em;
  }
  .iconLoadingCon{
    text-align: center;
  }
</style>