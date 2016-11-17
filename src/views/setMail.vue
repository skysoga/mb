<template>
	<div class="main">
    <table>
      <tbody>
        <tr>
          <td>邮箱</td>
          <td><input class="input" type="email" name="Mail" placeholder="请输入您要绑定的邮箱地址" value=""/></td>
        </tr>
        <tr>
          <td>输入验证码</td>
          <td>
            <input class="input" type="email" name="MailCode" placeholder="输入验证码" />
            <div class="tableBTN">
              <span class="sendCode">发送验证码</span>
            </div>
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <div class="loginBtn BTN "><a>绑定</a></div>
  </div>
</template>
<script src="../js/setMail.js"></script>
<style lang="scss" scoped>
  @import '../scss/SecurityCenter.scss';
</style>
