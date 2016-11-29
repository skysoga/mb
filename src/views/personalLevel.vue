<template>
<div class="main levelTitle">
      <div class="levelTitleHeader">
          <h5><ins>vip</ins><span>头衔：</span></h5>
          <div class="levelTitleInfo fix">
              <img :src="$store.getters.PhotoPath+$store.state.UserPhoto" alt="">
              <div class="rightInfo">
                  <h1><ins>{{$store.state.UserName}}</ins><i class="vip"></i><span>VIP{{$store.state.UserGrade}}</span></h1>
                  <i>头衔：</i>
                  <em>成长值：{{$store.state.UserGradeGrow}}分</em>
              </div>
          </div>
          <p class="levelTips">距离下一级需要{{upGrow}}分 每充值1元加1分</p>
          <div class="levelBar fix">
              <div class="left">VIP{{$store.state.UserGrade}}</div>
              <p class="u-progress"><span class="pgbar" id="progress" :style="{'width':perVal}"></span></p>
              <div class="right">VIP{{$store.state.UserGrade<9?Number($store.state.UserGrade)+1:'9'}}</div>
              <p>{{perVal}}</p>
          </div>
      </div>
      <div class="levelRule">
          <i class="iconfont">&#xe625;</i>
          等级机制
      </div>
      <table id="GradeList" width="100%"><tr>
              <th>等级</th>
              <th>头衔</th>
              <th>成长积分</th>
          </tr>
          <tr v-for="n in $store.state.GradeList">
              <td>VIP{{n.Grade}}</td>
              <td>{{n.GradeName}}</td>
              <td>{{n.GradeGrow}}</td>
          </tr></table>
  </div>
</template>
<script src="../js/personalLevel.js"></script>
<style lang="scss" scoped>
@import '../scss/personalinfo.scss'
</style>
