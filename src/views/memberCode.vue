<template>
  <div class="main creatAccount" ref="main" style="padding-bottom: 0;">
    <div class="creatAccountTitle radio">
      开户类型
        <router-link to="/manageIcode/AgentCode"><input type="radio" value="1" id="radio1">
        <label for="radio1">代理类型</label></router-link>
        <router-link to="/manageIcode/memberCode">
        <input type="radio" value="0" id="radio2" v-model="arr.UserType">
        <label for="radio2">玩家类型</label>
        </router-link>
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
            <tr v-for="(n,index) in ArrList" @click="getList(index,n.InviteCode)">
              <td style="color:#38f">{{n.InviteCode}}</td>
              <td>{{n.AddTime}}</td>
              <td>{{n.State}}</td>
            </tr>
            <tr><td colspan="3" class="msg loadingMsg" v-html="msg[cant_scroll]"></td></tr>
          </tbody>
        </table>
        </template>
      </div>
    </div>
    <!-- 弹窗 -->
    <bottom-box v-show = "BottomBoxShow"
                 :list = "BottomBoxList"
                 ></bottom-box>
    <Detail-box v-show = "DetailShow"
                :dlist = "DetailList"
                ></Detail-box>
    <!-- 弹窗End -->
  </div>
</template>
<script src="../js/memberCode.js"></script>
<style lang="scss" scoped>
  @import '../scss/personalinfo.scss';
</style>
