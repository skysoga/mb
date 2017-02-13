<template>
  <div class="main">
    <table>
      <tbody>
        <tr>
          <td>邮箱</td>
          <td><input class="input" type="email" v-va:Mail tag="邮箱" v-model.trim="Mail" placeholder="请输入您要绑定的邮箱地址" value=""/></td>
        </tr>
        <tr>
          <td>输入验证码</td>
          <td>
            <input class="input" type="email" v-va:MailCode tag="验证码" v-model.trim="MailCode" placeholder="输入验证码" />
            <div class="tableBTN">
              <span class="sendCode" v-va-test:Mail.postMsg>{{reTime}}</span>
            </div>
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <div class="loginBtn BTN "><a v-va-check>确定</a></div>
  </div>
</template>
<script src="../js/setMail.js"></script>
<style lang="scss" scoped>
  @import '../scss/SecurityCenter.scss';
</style>
