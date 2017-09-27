<template>
  <div class="main">
    <div class="header">
      <div class="headImg">
        <img :src="'http://imagess-google.com/system/common/headimg/'+(lastLoginImage||'defaultHead.png')" width="100%" height="100%" alt="">
        <!-- <img v-else src="/static/img/face.png" width="100%" height="100%" alt=""> -->
      </div>
    </div>
    <table>
      <tbody>
        <tr>
          <td class="username-icon"></td>
          <td colspan="2" class="username">
            <input v-model="UserName" class="input" tag="帐号" type="email" ref="UserName" v-va:UserName.clear placeholder="请输入账号"/>
            <em v-show="UserName&&vas.UserName" class="closebtn" v-va-clear:UserName></em>
            <span class="downico" v-if="UserList" @click="setType(true)"></span>
          </td>
        </tr>
        <tr>
          <td class="password-icon"></td>
          <td colspan="2" class="username passwordICO">
          <form autocomplete="off">
            <input v-if="Eyes=='open'" v-model="Password" maxlength="16" class="input" autocomplete="off" tag="密码" type="text" ref="Password" v-va:Password.clear placeholder="请输入密码" />
            <input v-if="Eyes=='close'" v-model="Password" maxlength="16"  class="input" autocomplete="off" tag="密码" type="password" ref="Password" v-va:Password.clear placeholder="请输入密码" />
            <em v-show="Password&&vas.Password" class="closebtn" v-va-clear:Password></em>
            <span @click="setEyes()" :class="['iconfont',Eyes]"></span>
          </form>
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
