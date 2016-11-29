<template>
	<div class="main">
    <table>
      <tbody>
        <tr>
          <td>银行卡号</td>
          <td class = "_bankcardNum"></td>
        </tr>
        <tr>
          <td>银行账户</td>
          <td class = "_realname"></td>
        </tr>
        <tr>
          <td>确认卡号</td>
          <td>
            <input type="tel" name="BankNum" value=""  placeholder="请输入完整卡号">
          </td>
        </tr>
        <tr>
          <td>确认户名</td>
          <td>
            <input type="RealName" name="RealName"  placeholder="请输入完整户名">
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <div class="loginBtn BTN"><a>提交</a></div>
    <div class="tips">
      为确定是本人操作，再次添加银行卡时需要验证首张银行卡信息。
    </div>
  </div>
</template>
<script src="../js/verifyBankcard.js"></script>
<style lang="scss" scoped>
  @import '../scss/SecurityCenter.scss';
</style>
