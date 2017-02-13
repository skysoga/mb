<template>
  <div class="notFoundCon">
    <div class="notFound">
      <img src="http://images.dafa176.com/system/pc/error/404.png" alt="" width="280" height="188">
      <h1>抱歉，无法访问此页面！</h1>
      <router-link class="errorService" to="/">返回首页</router-link>
    </div>
    <router-link class="errorLogo" to="/index"><img id="Logo1" src="" alt=""></router-link>
  </div>
</template>
<script src="../js/notfound.js"></script>
<style lang="scss" scoped>
  @import '../scss/maintain.scss';
</style>
