<template>
	<div class="main">
    <table>
      <tbody>
        <tr>
          <td>账号</td>
          <td colspan="2"><input v-model.lazy="UserName" class="input" tag="帐号" type="email" v-va:UserName placeholder="请输入账号" /></td>
        </tr>
        <tr>
          <td>密码</td>
          <td colspan="2"><input v-model.lazy="Password"  class="input" tag="密码" type="password" v-va:Password placeholder="请输入密码" /></td>
        </tr>
        <tr></tr>
      </tbody>
    </table>

    <router-link class='forget fr' to = "/register">没有账号? 立即注册</router-link>
    <div class="loginBtn BTN" v-va-check>
      <a>立即登录</a>
    </div>

    <ul id="usedList"></ul>
    <div class="sevice" @click = "BottomBoxShow=true">
        <a>登录遇到问题?</a>
    </div>

    <bottom-box v-show = "BottomBoxShow"
                 :list = "BottomBoxList"
                 ></bottom-box>

  </div>
</template>



<script src="../js/login.js"></script>
<style lang="scss" scoped>
  @import '../scss/login.scss';
</style>
