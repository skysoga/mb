<template>
  <div class="main main-security main-form">
    <table class="table-form table-security">
      <tbody>
        <tr>
          <td>原安全密码</td>
          <td><input class="input" type="password" v-va:Password tag="原安全密码" v-model.trim="Password" placeholder="请输入当前所使用的密码" /></td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <router-link v-if="isLogin" class='forget fr' :to="{path:'resetWay',query:{Q:'ResetSafePwd'}}">找回安全密码?</router-link>
    <div class="loginBtn BTN BTN-form"><a v-va-check>确定</a></div>
    <div class="tips-security">
      安全密码用于提现、绑定银行卡等操作，可保障资金安全。
    </div>
</div>
</template>
<script src="../js/verifySafePwd.js"></script>
<style lang="scss" scoped>
  .forget{
    display: block;
    margin: 0 1rem;
    text-align: right;
    color: #dc2e2e;
    line-height: 1.5em;
    font-size: .7em;
    width: 10rem;
    margin-bottom: .6em;
  }
</style>
