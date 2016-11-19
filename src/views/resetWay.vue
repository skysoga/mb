<template>
	  <div class="main">
    <div class="options innerWrap">
      <p class="hr1px" v-if="ResetSafePwd"></p>
      <router-link :to="'/verifySafePwd?Q='+reUrl" v-if="ResetSafePwd" class="active">
        <span>通过安全密码</span>
        <i class="fr"><span class="iconfont right"></span></i>
      </router-link>
      <p class="hr1px" v-if="ResetMobile"></p>
      <router-link :to="'/verifyMobile?Q='+reUrl" v-if="ResetMobile" class="active">
        <span>通过密保手机</span>
        <i class="fr"><span class="iconfont right"></span></i>
      </router-link>
      <p class="hr1px" v-if="ResetQuestion"></p>
      <router-link :to="'/verifyQuestion?Q='+reUrl" v-if="ResetQuestion" class="active">
        <span>通过密保问题</span>
        <i class="fr"><span class="iconfont right"></span></i>
      </router-link>
      <p class="hr1px" v-if="ResetMail"></p>
      <router-link :to="'/verifyMail?Q='+reUrl" v-if="ResetMail" class="active">
        <span>通过密保邮箱</span>
        <i class="fr"><span class="iconfont right"></span></i>
      </router-link>
      <p class="hr1px"></p>
      <router-link to="/service" class="active">
        <span>通过在线客服</span>
        <i class="fr"><span class="iconfont right"></span></i>
      </router-link>
      <p class="hr1px"></p>
    </div>
  </div>
</template>
<script src="../js/resetWay.js"></script>
<style lang="scss" scoped>
  @import '../scss/user_account_personalinfo.scss';
</style>
