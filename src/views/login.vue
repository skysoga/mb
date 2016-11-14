<template>
	<div class="main">
    <table>
      <tbody>
        <tr>
          <td>账号</td>
          <td colspan="2"><input v-model.lazy="UserName" class="input" type="email" name="UserName" placeholder="请输入账号" /></td>
        </tr>
        <tr>
          <td>密码</td>
          <td colspan="2"><input v-model.lazy="Password"  class="input" type="password" name="Password" placeholder="请输入密码" /></td>
        </tr>
        <tr style="display:none">
          <td>验证码</td>
          <td><input class="input" type="email" name="ImgCode" placeholder="请输入验证码" autocomplete="off" value="test"></td>
          <td>
            <img class="yzm">
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <a class='forget fr' href="/register.html">没有账号? 立即注册</a>
    <div class="loginBtn BTN" v-on:click="login">
      <a>立即登录</a>
    </div>
    <ul id="usedList">
    </ul>
    <div class="sevice">
        <a>登录遇到问题?</a>
    </div>
    <div class = "_problemBox" style="display:none;">
      <div class="blackBg"></div>
      <div class="moreLayer">
        <ul>
          <!-- <li><a href="/service.html">在线客服</a></li> -->
          <li><a href="/forgetPwd.html">忘记密码</a></li>
          <li id = "goPC"><a>电脑版</a></li>
        </ul>
        <ul>
          <li><a href="javascript:;">取消</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script src="../js/login.js"></script>
<style lang="scss" scoped>
  @import '../scss/login.scss';
</style>