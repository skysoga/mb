<!-- 邀请码列表组件 -->
<template>
<div class="_div">
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
<script src="../js/ICode.js"></script>
<style lang="scss" scoped>
  @import '../scss/personalinfo.scss';
</style>
