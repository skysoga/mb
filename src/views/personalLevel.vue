<template>
<div class="user-main levelTitle">
      <div class="levelTitleHeader">
          <div class="levelTitleInfo fix">
              <img :src="$store.getters.PhotoPath+$store.state.UserPhoto" alt="">
              <div class="rightInfo">
                  <h1><ins>{{$store.state.UserName}}</ins><i class="vip"></i><span v-if="Number(UserGrade)">VIP{{UserGrade}}</span><span v-else>{{UserGrade}}</span></h1>
                  <i>头衔：{{GradeName}}</i>
                  <em>成长值{{UserGradeGrow}}分</em>
              </div>
          </div>
          <p class="levelTips" >距离下一级需要{{Number(UserGrade)?upGrow:'0'}}分 每充值1元加1分</p>
          <div class="levelBar fix" v-if="UserGrade>0">
              <div class="left">VIP{{Number(UserGrade)}}</div>
              <p class="u-progress"><span class="pgbar" id="progress" :style="{'width':perVal+'%'}"></span></p>
              <div class="right">VIP{{Number(UserGrade)<9?Number(UserGrade)+1:'9'}}</div>
              <p v-if="Number(UserGrade)">{{perVal+'%'}}</p>
          </div>
          <div class="levelBar fix" v-else>
              <div class="left">测试</div>
              <p class="u-progress"><span class="pgbar" id="progress" style="width:0"></span></p>
              <div class="right">测试</div>
              <p>0%</p>
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