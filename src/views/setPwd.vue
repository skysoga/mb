<template>
  <div class="main main-security main-form">
    <table class="table-form table-security">
      <tbody>
        <tr>
          <td>登录密码</td>
          <td>
          <input class="input"
                 type="password"
                 v-va:Password
                 tag="登录密码"
                 v-model.trim="Password"
                 placeholder="请输入登录密码" /></td>
        </tr>
        <tr>
          <td>确认密码</td>
          <td>
             <input class="input"
                    type="password"
                    v-va:checkPassword.Password = "[{'equal':'Password'}]"
                    tag="确认密码"
                    v-model.trim="checkPassword"
                    placeholder="请再次输入密码" /></td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <div class="loginBtn BTN BTN-form"><a v-va-check>确定</a></div>
</div>
</template>


<script src="../js/setPwd.js"></script>