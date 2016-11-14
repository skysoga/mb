<template>
	<div class="main">
    <div class="safeTop">
      <h5><span></span><em id="Slevel"><!-- 您的账号安全级别为低 --></em><span></span></h5>
      <div class="star">
        <i class="iconfont curr">&#xe63d;</i>
        <i class="iconfont">&#xe63d;</i>
        <i class="iconfont">&#xe63d;</i>
        <i class="iconfont">&#xe63d;</i>
        <i class="iconfont">&#xe63d;</i>
      </div>
      <p id="LoginInfo"><!-- 上次登录：2016-09-13 14:18:35<br>
      国内未能识别的地区 | 不是我登录? --></p>
    </div>
      <div class="options">
          <router-link to="/verifyPwd" class="active">
            <span>修改登录密码</span>
            <i class="fr">修改<span class="iconfont right"></span></i>
          </router-link>

          <p class="hr1px"></p>

          <a  href="verifySafePwd.html" class="active">
            <span>已设置安全密码</span>
            <i class="fr">修改<span class="iconfont right"></span></i>
          </a>

          <a href="setSafePwd.html" class="active">
            <span>设置安全密码</span>
            <i class="fr">设置<span class="iconfont right"></span></i>
          </a>

          <p class="hr1px"></p>

          <a href="verifyMobile.html" class="active">
            <span>已设置密保手机</span>
            <i class="fr">修改<span class="iconfont right"></span></i>
          </a>
          <a href="setMobile.html" class="active">
            <span>设置密保手机</span>
            <i class="fr">设置<span class="iconfont right"></span></i>
          </a>

          <p class="hr1px"></p>

          <a href="verifyQuestion.html" class="active">
            <span>已设置密保问题</span>
            <i class="fr">修改<span class="iconfont right"></span></i>
          </a>
          <a href="setQuestion.html" class="active">
            <span>设置密保问题</span>
            <i class="fr">设置<span class="iconfont right"></span></i>
          </a>

          <p class="hr1px"></p>

          <a href="verifyMail.html" class="active">
            <span>已设置密保邮箱</span>
            <i class="fr">修改<span class="iconfont right"></span></i>
          </a>

          <a href="setMail.html" class="active">
            <span>设置密保邮箱</span>
            <i class="fr">设置<span class="iconfont right"></span></i>
          </a>
          <p class="hr1px"></p>
          <a href="manageBankcard.html" class="active">
            <span>银行卡管理</span>
            <i class="fr">设置<span class="iconfont right"></span></i>
          </a>
      </div>

      <div class="options">
          <a id="loginOut" class="active">
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