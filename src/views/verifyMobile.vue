<template>
   <div class="main main-security main-form">
    <table class="table-form table-security">
      <tbody>
        <tr>
          <td>已绑定手机</td>
          <td><input class="input" type="tel" name="Phone" readonly="readonly" :placeholder="Mobile"/></td>
        </tr>
        <tr>
          <td>输入验证码</td>
          <td>
            <input class="input" type="email" v-va:SmsCode v-model.trim="SmsCode" tag="验证码" placeholder="请输入验证码" />
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
<script src="../js/verifyMobile.js"></script>