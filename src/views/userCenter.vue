<template>
  <div class="user-main userCenter">
      <div class="user-topInfo">
          <router-link to="/personalInfo"><img v-bind:src="$store.getters.PhotoPath+$store.state.UserPhoto||$store.state.constant.DefPhoto"></router-link>
          <p>账&nbsp;号：<ins id="UserName">{{$store.state.UserName}}</ins></p>
          <span v-if="balShow">余&nbsp;额：<ins id="UserBalance" v-text="UserBalance"></ins>元 </span>
          <span v-else>余&nbsp;额：<i>已隐藏 <ins :style="{color:$store.state.color.red}"  @click="getBalance">显示</ins></i></span>
          <div v-show="balShow" :class="refreshClass"  @click="getBalance"><i class="iconfont">&#xe62f;</i></div>
      </div>

      <div class="user-topMoney">
          <router-link class="active" to="/rechargeWay">
              <i class="iconfont m0">&#xe633;</i>
              <span>我要充值</span>
          </router-link>

          <router-link class="active" data-pwd="True" data-card="True" to="/withdraw">
              <i class="iconfont m1">&#xe631;</i>
              <span>我要提现</span>
          </router-link>
          <router-link class="active" to="billRecord">
              <i class="iconfont m2">&#xe630;</i>
              <span>交易记录</span>
          </router-link>

          <router-link class="active" to="betCenter">
              <i class="iconfont m3">&#xe632;</i>
              <span>投注记录</span>
          </router-link>
      </div>
      <div class="user-options">
          <router-link class="active" to="personalInfo">
              <i class="iconfont o1">&#xe622;</i>
              <span>个人信息</span>
              <i class="iconfont right fr"></i>
          </router-link>
          <p class="hr1px"></p>
          <router-link class="active" to="securityCenter">
              <i class="iconfont o2">&#xe621;</i>
              <span>安全中心</span>
              <i class="iconfont right fr"></i>
          </router-link>
          <p class="hr1px"></p>
          <template v-if="$store.state.AgentRebate">
            <router-link class="active" to="agentCenter">
                <i class="iconfont o4">&#xe63e;</i>
                <span>代理中心</span>
                <i class="iconfont right fr"></i>
            </router-link>
            <p class="hr1px"></p>
          </template>
          <router-link class="active" to="PLstatement">
              <i class="iconfont o3">&#xe623;</i>
              <span>今日盈亏</span>
              <i class="iconfont right fr"></i>
          </router-link>
          <p class="hr1px"></p>
          <router-link class="active" to="Notice">
              <i class="iconfont o4">&#xe61c;</i>
              <span>我的消息</span>
              <i class="iconfont right fr"></i>
          </router-link>
      </div>
  </div>
</template>
<script src="../js/userCenter.js"></script>
