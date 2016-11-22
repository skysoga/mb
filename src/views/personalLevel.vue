<template>
<div class="main levelTitle">
      <div class="levelTitleHeader">
          <h5><ins>vip</ins><span>头衔：</span></h5>
          <div class="levelTitleInfo fix">
              <img src="<%imageserver%>/../system/common/headimg/defaultHeadImg.png" alt="">
              <div class="rightInfo">
                  <h1><ins></ins><i class="vip"></i><span>VIP</span></h1>
                  <i>头衔：</i>
                  <em>成长值：0分</em>
              </div>
          </div>
          <p class="levelTips">距离下一级需要0分 每充值1元加1分</p>
          <div class="levelBar fix">
              <div class="left">VIP0</div>
              <p class="u-progress"><span class="pgbar" id="progress" style="width: 20%;"><span class="pging"><em class="point"><ins id="UserGradeGrow">0分</ins><i></i></em></span></span></p>
              <div class="right">VIP0</div>
          </div>
      </div>
      <div class="levelRule">
          <i class="iconfont">&#xe625;</i>
          等级机制
      </div>
      <table id="GradeList" width="100%">
      </table>
  </div>
</template>
<script src="../js/personalLevel.js"></script>
<style lang="scss" scoped>
@import '../scss/personalinfo.scss'
</style>
