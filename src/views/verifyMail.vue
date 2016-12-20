<template>
	<div class="main">
    <table>
      <tbody>
        <tr>
          <td>已绑定邮箱</td>
          <td><input class="input" type="email" name="Mail" readonly="readonly" :placeholder="Mail"/></td>
        </tr>
        <tr>
          <td>输入验证码</td>
          <td>
            <input class="input" type="email" v-va:MailCode tag="验证码" v-model.trim="MailCode" placeholder="请输入验证码" />
            <div class="tableBTN">
              <span class="sendCode" @click="postMsg">{{reTime}}</span>
            </div>
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <div class="loginBtn BTN"><a v-va-check>确定</a></div>
  </div>
</template>
<script src="../js/verifyMail.js"></script>
<style lang="scss" scoped>
  @import '../scss/SecurityCenter.scss';
</style>
