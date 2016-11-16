<template>
<div class="main">
  <table>
    <tbody>
      <tr>
        <td>邀请码</td>
        <td colspan="2"><input class="input fl mL15" type="url" name="InvitationCode" placeholder="请输入邀请码" /></td>
      </tr>

      <tr>
        <td>账号</td>
        <td  colspan="2"><input class="input fl mL15" type="url" name="UserName" placeholder="请输入账号" /></td>
      </tr>

      <tr>
        <td>设置密码</td>
        <td colspan="2"><input class="input fl mL15" type="password" name="Password" placeholder="请输入密码" /></td>
      </tr>

      <tr>
        <td>确认密码</td>
        <td colspan="2"><input class="input fl mL15" type="password" name="checkPassword" placeholder="请再次输入密码" /></td>
      </tr>

      <tr>
        <td>验证码</td>
        <td ><input class="input" type="email" name="ImgCode" placeholder="请输入验证码" autocomplete="off"></td>
        <td>
          <img class="yzm" src="">
        </td>
      </tr>



      <tr>
      </tr>
    </tbody>
  </table>
  <router-link class='forget fr' to = "/login">已有账号? 立即登录</router-link>
  <div class="loginBtn BTN mt30" data="{config.webpath}aspx/SSC/register.aspx?action=register_user">
    <a>立即注册</a>
  </div>
</div>
</template>

<script>
export default {

	data () {
		return {
			test: 'jk'
		}
	},


}
</script>


<style  scoped>
  @import '../css/login.css';
</style>