<template>
  <div class="main main-security main-form">
    <table class="table-form table-security">
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
        <tr>
          <td>安全密码</td>
          <td>
            <form action="" autocomplete="off">
              <input type="password" v-va:SafePassword.Password tag="安全密码" v-model="SafePassword" placeholder="请输入您的安全密码">
            </form>
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <div class="loginBtn BTN BTN-form"><a v-va-check>确定</a></div>
  </div>
</template>
<script src="../js/setMail.js"></script>