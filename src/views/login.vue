<template>
  <div class="main">
    <div class="header">
      <div class="headImg">
        <img src="http://imagess-google.com/system/common/headimg/0A472675E5E5AF50.jpg" width="100%" height="100%" alt="">
      </div>
    </div>
    <table>
      <tbody>
        <tr>
          <td class="username-icon"></td>
          <td colspan="2" class="username">
            <input v-model="UserName" class="input" tag="帐号" v-x="username" type="email" ref="UserName" v-va:UserName placeholder="请输入账号"/>
            <em v-if="x.username" class="closebtn"></em>
            <span v-if="UserList" @click="setType(true)"></span>
          </td>
        </tr>
        <tr>
          <td class="password-icon"></td>
          <td colspan="2" class="passwordICO">
            <input v-show="Eyes=='open'" v-model.lazy="Password" maxlength="16" class="input" tag="密码" type="text" ref="Password" v-va:Password placeholder="请输入密码" />
            <input v-show="Eyes=='close'" v-model.lazy="Password" maxlength="16"  class="input" tag="密码" type="password" ref="Password" v-va:Password placeholder="请输入密码" />
            <span @click="setEyes()" :class="['iconfont',Eyes]"></span>
          </td>
        </tr>
        <tr v-if="IcodeShow">
          <td>验证码</td>
          <td><input type="text" maxlength="4" v-va:ImgCode tag="验证码" v-model="ImgCode" placeholder="请输入验证码">
          </td>
          <td>
            <img class="yzm" :src="imgSrc" @click="imgUrl">
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>

    <div class="loginBtn BTN" v-va-check>
      <a>立即登录</a>
    </div>
    <div class="otherBtn">
      <router-link class='signup' to = "/register">立即注册</router-link><router-link class='forget' to = "/forgetPwd?Q=ResetPwd">忘记密码</router-link>
    </div>

    <ul id="usedList"></ul>
    <!-- 区分是否登录记录数据 -->
    <bottom-box v-show = "BottomBoxShow"
                 :list = "isLogin?UserList:BottomBoxList"
                 ></bottom-box>

  </div>
</template>
<script src="../js/login.js"></script>
<style lang="scss" scoped>
  @import '../scss/login.scss';
  /**
  * 关闭样式开始
  */
  .closebtn{
    position:absolute;
    top:0;
    right:2em;
    width:2em;
    text-align:center;
    color:#ccc;
    &:before{
      content:'\e607';
      font-family:'iconfont';
      font-size:.7em;
    }
  }
  /**
  * 关闭样式开始
  */
  table{
    table-layout: fixed;
    tr{
      td:first-child{
        width: 3em;
      }
      td:last-child{
        width: 100%;
      }
    }
  }
  .main{
    background: #fafafa;
    height: 100%;
    padding-top: 2.3em;
  }
  .headImg{
    width:4rem;
    height: 4rem;
    margin:1.2em auto;
    img{
      border-radius: 50%;
      display: block;
      border:3px solid #e2e0e0;
    }
  }
  .username-icon,.password-icon{
    &:before{
      font-family: 'iconfont';
      display: block;
      color:#c6c6c6;
      font-size:1.2em;
      line-height: 1em;
      text-align: center;
    }
  }
  .username-icon:before{
    content:'\e605';
  }
  .password-icon:before{
    content:'\e604';
  }
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
  .otherBtn{
    text-align: center;
    margin-top:.7em;
    a{
      font-size: .7em;
      color: #bbb;
      padding: 0 .6em;
      line-height: 1em;
    }
    >a{
      display: inline-block;
    }
    .signup{
      color: #dc3b40;
      border-right:1px solid #e5e5e5;
    }
  }
</style>
