<template>
  <div class="main main-security">
    <table class="table-security">
      <tbody>
        <tr>
          <td>安全密码</td>
          <td><input class="input" type="password" v-va:Password v-model="Password" tag="安全密码" placeholder="请输入安全密码" /></td>
        </tr>
        <tr>
          <td>确认密码</td>
          <td><input class="input" type="password" v-va:checkPassword.Password="[{'equal':'Password'}]" tag="确认密码" v-model="checkPassword" placeholder="请再次输入安全密码" /></td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <div class="loginBtn BTN"><a v-va-check>确定</a></div>
    <div class="tips-security">
      安全密码用于提现、绑定银行卡等操作，可保障资金安全。
    </div>
</div>
</template>
<script src="../js/setSafePwd.js"></script>
<style lang="scss" scoped>
  @import '../scss/FromTable.scss';
</style>
