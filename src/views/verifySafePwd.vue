<template>
	<div class="main">
    <table>
      <tbody>
        <tr>
          <td>原安全密码</td>
          <td><input class="input" type="password" v-model="Password" placeholder="请输入当前所使用的密码" /></td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <a class='forget fr' href="/resetWay?Q=ResetSafePwd">找回安全密码?</a>
    <div class="loginBtn BTN"><a @click="postBtn">确认修改</a></div>
    <div class="tips">
      安全密码用于提现、绑定银行卡等操作，可保障资金安全。
    </div>
</div>
</template>
<script src="../js/verifySafePwd.js"></script>
<style lang="scss" scoped>
  @import '../scss/SecurityCenter.scss';
</style>
