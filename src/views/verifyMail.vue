<template>
  <div class="main main-security main-form">
    <table class="table-form table-security">
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
    <div class="loginBtn BTN BTN-form"><a v-va-check>确定</a></div>
  </div>
</template>
<script src="../js/verifyMail.js"></script>