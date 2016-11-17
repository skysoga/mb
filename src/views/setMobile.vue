<template>
	<div class="main">
    <table>
      <tbody>
        <tr>
          <td>手机号</td>
          <td><input class="input" type="tel" name="Phone" placeholder="请输入您要绑定的手机号码" value=""/></td>
        </tr>
        <tr>
          <td>输入验证码</td>
          <td>
            <input class="input" type="email" name="SmsCode" placeholder="输入验证码" />
            <div class="tableBTN">
              <span class="sendCode">发送验证码</span>
            </div>
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <div class="loginBtn BTN unClick"><a>绑定</a></div>
  </div>
</template>
<script src="../js/setMobile.js"></script>
<style lang="scss" scoped>
  @import '../scss/SecurityCenter.scss';
</style>
