<template>
  <div class="main main-security main-form">
    <table class="table-form table-security">
      <tbody>
        <tr>
          <td>原密码</td>
          <td><input class="input" type="password" tag="原密码" v-va:Password  v-model.trim="Password" placeholder="请输入当前所使用的密码" /></td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <div class="loginBtn BTN BTN-form"><a v-va-check>确定</a></div>
</div>
</template>
<script src="../js/verifyPwd.js"></script>