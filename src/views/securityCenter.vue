<template>
	<div class="main">
    <div class="safeTop">
      <h5><span></span><em id="Slevel">您的账号安全级别为{{LevelText}}</em><span></span></h5>
      <div class="star">
        <i class="iconfont" v-for="n in 5" :class="{curr:n<=StarNum}">&#xe63d;</i>
      </div>
      <p id="LoginInfo">上次登录：{{LastLogin.LoginTime}}<br>{{LastLogin.LoginAddr}} | <router-link to="/verifyPwd">不是我登录?</router-link></p>
    </div>
    <div class="options">
        <router-link to="verifyPwd" class="active">
          <span>修改登录密码</span>
          <i class="fr">修改<span class="iconfont right"></span></i>
        </router-link>

        <p class="hr1px"></p>

        <router-link  to="verifySafePwd" class="active" v-if="HasSafePwd">
          <span>已设置安全密码</span>
          <i class="fr">修改<span class="iconfont right"></span></i>
        </router-link>

        <router-link to="setSafePwd" class="active" v-else>
          <span>设置安全密码</span>
          <i class="fr">设置<span class="iconfont right"></span></i>
        </router-link>

        <p class="hr1px"></p>

        <router-link to="verifyMobile" class="active" v-if="!!$store.state.UserMobile">
          <span>已设置密保手机</span>
          <i class="fr">修改<span class="iconfont right"></span></i>
        </router-link>
        <router-link to="setMobile" class="active" v-else>
          <span>设置密保手机</span>
          <i class="fr">设置<span class="iconfont right"></span></i>
        </router-link>

        <p class="hr1px"></p>

        <router-link to="verifyQuestion" class="active" v-if="!!$store.state.UserSafeQuestions">
          <span>已设置密保问题</span>
          <i class="fr">修改<span class="iconfont right"></span></i>
        </router-link>
        <router-link to="setQuestion" class="active" v-else>
          <span>设置密保问题</span>
          <i class="fr">设置<span class="iconfont right"></span></i>
        </router-link>

        <p class="hr1px"></p>

        <router-link to="verifyMail" class="active" v-if="!!$store.state.UserMail">
          <span>已设置密保邮箱</span>
          <i class="fr">修改<span class="iconfont right"></span></i>
        </router-link>

        <router-link to="setMail" class="active" v-else>
          <span>设置密保邮箱</span>
          <i class="fr">设置<span class="iconfont right"></span></i>
        </router-link>
        <p class="hr1px"></p>
        <a class="active" @click="setNextUrl">
          <span>银行卡管理</span>
          <i class="fr">设置<span class="iconfont right"></span></i>
        </a>
    </div>
    <div class="options">
        <a id="loginOut" class="active" @click="loginOut">
          <span>退出登录</span>
          <i class="fr"><span class="iconfont right"></span></i>
        </a>
    </div>
  </div>
</template>
<script src="../js/securityCenter.js"></script>
<style lang="scss" scoped>
  @import '../scss/personalinfo.scss';
</style>
