<template>
	<div class="main">
    <table>
      <tbody>
        <tr>
          <td>原密码</td>
          <td><input class="input" type="password" v-model.trim="Password" placeholder="请输入当前所使用的密码" /></td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <router-link class='forget fr' :to="{path:'resetWay',query:{Q:'ResetPwd'}}">找回密码?</router-link>
    <div class="loginBtn BTN"><a @click="postBtn">提交</a></div>
</div>
</template>
<script src="../js/verifyPwd.js"></script>
<style lang="scss" scoped>
  @import '../scss/SecurityCenter.scss';
</style>
