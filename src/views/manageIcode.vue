<template>
	<div class="main creatAccount" style="padding-bottom: 0;">
    <div class="creatAccountTitle radio">
      开户类型
        <input type="radio" value="1" v-model="UserType" id="radio1">
        <label for="radio1">代理类型</label>
        <input type="radio" value="0" v-model="UserType" id="radio2">
        <label for="radio2">玩家类型</label>
    </div>
    <div class="tabLI" id="TouchScroll">
      <div class="InviteTableBox" data-key="false" v-show="UserType==0">
        <table class="col3Table manageInviteTable">
            <tbody><tr>
              <th>邀请码</th>
              <th>生成时间</th>
              <th>状态</th>
            </tr>
            <tr v-for="n in wjList">
              <td style="color:#38f">{{n.InviteCode}}</td>
              <td>{{n.AddTime}}</td>
              <td>{{n.State}}</td>
            </tr>
          </tbody>
        </table>
        <div class="msg loadingMsg">已显示全部记录</div>
        <div class="fullPageMsg" v-show="!wjList">
          <div class="fullPageIcon iconfont">&#xe63c;</div>
          <p>暂无记录</p>
        </div>
      </div>
      <div class="InviteTableBox" data-key="false" v-show="UserType==1">
        <table class="col3Table manageInviteTable">
            <tbody><tr>
              <th>邀请码</th>
              <th>生成时间</th>
              <th>状态</th>
            </tr>
            <tr v-for="n in dlList">
              <td style="color:#38f">{{n.InviteCode}}</td>
              <td>{{n.AddTime}}</td>
              <td>{{n.State}}</td>
            </tr>
          </tbody>
        </table>
        <div class="msg loadingMsg">已显示全部记录</div>
        <div class="fullPageMsg" v-show="!dlList">
          <div class="fullPageIcon iconfont">&#xe63c;</div>
          <p>暂无记录</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="../js/manageIcode.js"></script>
<style lang="scss" scoped>
  @import '../scss/personalinfo.scss';
</style>
