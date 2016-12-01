<template>
	<div class="main creatAccount" style="padding-bottom: 0;">
    <div class="creatAccountTitle radio">
      开户类型
        <input type="radio" value="1" v-model="UserType" id="radio1">
        <label for="radio1">代理类型</label>
        <input type="radio" value="0" v-model="UserType" id="radio2">
        <label for="radio2">玩家类型</label>
    </div>
    <div class="tabLI" id="TouchScroll" ref="TouchScroll" @touchend="scroll">
      <div class="InviteTableBox" data-key="false">
        <template v-if="data_count===0">
          <div class="fullPageMsg"><div class="fullPageIcon iconfont">&#xe63c;</div><p>暂无记录</p></div>
        </template>
        <template v-else>
        <table class="col3Table manageInviteTable">
            <tbody><tr>
              <th>邀请码</th>
              <th>生成时间</th>
              <th>状态</th>
            </tr>
            <tr v-for="n in ArrList">
              <td style="color:#38f">{{n.InviteCode}}</td>
              <td>{{n.AddTime}}</td>
              <td>{{n.State}}</td>
            </tr>
            <tr><td colspan="3" class="msg loadingMsg" v-html="msg[cant_scroll]"></td></tr>
          </tbody>
        </table>
        </template>
      </div>
     <!--  <div class="InviteTableBox" data-key="false" v-show="UserType==1">
        <template v-if="data_count===0">
          <div class="fullPageMsg"><div class="fullPageIcon iconfont">&#xe63c;</div><p>暂无记录</p></div>
        </template>
        <template v-else>
        <table class="col3Table manageInviteTable">
            <tbody><tr>
              <th>邀请码</th>
              <th>生成时间</th>
              <th>状态</th>
            </tr>
            <tr v-for="n in ArrList">
              <td style="color:#38f">{{n.InviteCode}}</td>
              <td>{{n.AddTime}}</td>
              <td>{{n.State}}</td>
            </tr>
            <tr><td colspan="3" class="msg loadingMsg" v-html="msg[cant_scroll]"></td></tr>
          </tbody>
        </table>
        </template>
      </div> -->
    </div>
  </div>
</template>
<script src="../js/manageIcode.js"></script>
<style lang="scss" scoped>
  @import '../scss/personalinfo.scss';
</style>
