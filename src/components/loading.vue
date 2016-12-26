<template>
  <div class="fullLoading" id="PageLoading">
    <div class="loadingCell">
      <div class="iconLoadingCon">
        <img class="loadingImg" :src="$store.state.constant.ImgHost+'/system/mobile/lottery/loadingMobile.gif'" alt="">
      </div>
    </div>
  </div>
</template>
<style lang='scss' scoped>
  .loadingImg{
    height: 5em;
  }
  .iconLoadingCon{
    text-align: center;
  }
</style>
