<template>
	<div class="main">
    <table>
      <tbody>
        <tr>
          <td>已绑定邮箱</td>
          <td><input class="input" type="email" name="Mail" readonly="readonly"/></td>
        </tr>
        <tr>
          <td>输入验证码</td>
          <td>
            <input class="input" type="email" name="MailCode" placeholder="请输入验证码" />
            <div class="tableBTN">
              <span class="sendCode">发送验证码</span>
            </div>
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <div class="loginBtn BTN"><a>提交</a></div>
  </div>
</template>
<script src="../js/verifyMail.js"></script>
<style lang="scss" scoped>
  @import '../scss/SecurityCenter.scss';
</style>
