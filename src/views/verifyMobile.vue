<template>
	 <div class="main">
    <table>
      <tbody>
        <tr>
          <td>已绑定手机</td>
          <td><input class="input" type="tel" name="Phone" readonly="readonly" :placeholder="Phone"/></td>
        </tr>
        <tr>
          <td>输入验证码</td>
          <td>
            <input class="input" type="email" v-model="SmsCode" placeholder="请输入验证码" />
            <div class="tableBTN">
              <span class="sendCode" @click="postMsg">{{reTime}}</span>
            </div>
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <div class="loginBtn BTN" :class="{unClick:noDo}"><a @click="postBtn">提交</a></div>
  </div>
</template>
<script src="../js/verifyMobile.js"></script>
<style lang="scss" scoped>
  @import '../scss/SecurityCenter.scss';
</style>
