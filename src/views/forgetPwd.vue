<template>
	  <div class="main">
    <table>
      <tbody>
        <tr>
          <td>账号</td>
          <td>
            <input type="email" v-model="UserName" placeholder="请输入账号">
          </td>
        </tr>
        <tr>
          <td>验证码</td>
          <td>
            <input type="text" v-model="ImgCode" placeholder="请输入验证码">
            <div class="tableBTN">
              <img class="yzm" :src="imgSrc" @click="imgUrl">
            </div>
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
    <div class="loginBtn BTN"><a @click="postBtn">确定</a></div>
  </div>
</template>
<script src="../js/forgetPwd.js"></script>
<style lang="scss" scoped>
  @import '../scss/SecurityCenter.scss';
</style>

