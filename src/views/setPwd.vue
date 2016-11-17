<template>
	<div class="main">
    <table>
      <tbody>
        <tr>
          <td>登录密码</td>
          <td><input class="input" type="password" name="Password" placeholder="请输入登录密码" /></td>
        </tr>
        <tr>
          <td>确认密码</td>
          <td><input class="input" type="password" name="checkPassword" placeholder="请再次输入密码" /></td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <div class="loginBtn BTN"><a>提交</a></div>
</div>
</template>
<script src="../js/setPwd.js"></script>
<style lang="scss" scoped>
  @import '../scss/SecurityCenter.scss';
</style>
