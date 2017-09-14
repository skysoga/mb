<template>
  <div class="main">
    <table>
      <tbody>
        <tr>
          <td>账号</td>
          <td colspan="2" class="username">
            <input v-model.lazy="UserName" class="input" tag="帐号" type="email" ref="UserName" v-va:UserName placeholder="请输入账号"/>
            <span v-show="UserList" @click="setType(true)"></span>
          </td>
        </tr>
        <tr>
          <td>密码</td>
          <td colspan="2"><input v-model.lazy="Password"  class="input" tag="密码" type="password" ref="Password" v-va:Password placeholder="请输入密码" /></td>
        </tr>
        <tr v-if="IcodeShow">
          <td>验证码</td>
          <td><input type="text" v-va:ImgCode tag="验证码" v-model="ImgCode" placeholder="请输入验证码">
          </td>
          <td>
            <img class="yzm" :src="imgSrc" @click="imgUrl">
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>

    <router-link class='forget fr' to = "/register">没有账号? 立即注册</router-link>
    <div class="loginBtn BTN" v-va-check>
      <a>立即登录</a>
    </div>

    <ul id="usedList"></ul>
    <div class="sevice" @click = "setType(false)">
        <a>登录遇到问题?</a>
    </div>
    <!-- 区分是否登录记录数据 -->
    <bottom-box v-show = "BottomBoxShow"
                 :list = "isLogin?UserList:BottomBoxList"
                 ></bottom-box>

  </div>
</template>



<script src="../js/login.js"></script>
<style lang="scss" scoped>
  @import '../scss/login.scss';
  .username{
    position:relative;
    span{
      position:absolute;
      right:.5em;
      top:0;
      width:2em;
      height:2em;
      line-height:2em;
      border-radius:.2em;
      margin-top:.25em;
      color:#ccc;
      &:active{
        background:#efefef;
        color:#333;
      }
      &:before{
        content:'\e64c';
        font-family:'iconfont';
        display:block;
        text-align:center;
      }
    }
  }
</style>
