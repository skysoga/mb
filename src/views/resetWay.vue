<template>
    <div class="main">
    <div class="options innerWrap">
      <template v-if="ResetSafePwd">
        <p class="hr1px"></p>
        <router-link :to="{path:'verifySafePwd',query:{Q:reUrl}}" class="active">
          <span>通过安全密码</span>
          <i class="fr"><span class="iconfont right"></span></i>
        </router-link>
      </template>
      <template v-if="ResetMobile">
        <p class="hr1px"></p>
        <router-link :to="{path:'verifyMobile',query:{Q:reUrl}}"class="active">
          <span>通过密保手机</span>
          <i class="fr"><span class="iconfont right"></span></i>
        </router-link>
      </template>
      <template v-if="ResetQuestion">
        <p class="hr1px"></p>
        <router-link :to="{path:'verifyQuestion',query:{Q:reUrl}}" class="active">
          <span>通过密保问题</span>
          <i class="fr"><span class="iconfont right"></span></i>
        </router-link>
      </template>
      <template v-if="ResetMail">
        <p class="hr1px"></p>
        <router-link :to="{path:'verifyMail',query:{Q:reUrl}}" class="active">
          <span>通过密保邮箱</span>
          <i class="fr"><span class="iconfont right"></span></i>
        </router-link>
      </template>
      <template v-if="SafeNum<2&&!ResetSafePwd&&$store.state.UserHasSafePwd">
        <p class="hr1px"></p>
        <router-link :to="{path:'ArtificialAppeal',query:{Q:reUrl}}" class="active">
          <span>通过身份识别</span>
          <i class="fr"><span class="iconfont right"></span></i>
        </router-link>
      </template>
      <!-- <template v-if="$store.state.SiteConfig">
        <p class="hr1px"></p>
        <router-link :to="'service'" class="active" v-show="reUrl">
          <span>通过在线客服</span>
          <i class="fr"><span class="iconfont right"></span></i>
        </router-link>
      </template> -->
        <p class="hr1px"></p>
    </div>
  </div>
</template>
<script src="../js/resetWay.js"></script>
<style lang="scss" scoped>
  @import '../scss/user_account_personalinfo.scss';
</style>
