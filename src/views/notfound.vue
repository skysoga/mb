<template>
  <div class="notFoundCon">
    <div class="notFound">
      <img :src="$store.state.constant.ImgHost+'/system/pc/error/404.png'" alt="" width="280" height="188">
      <h1>抱歉，无法访问此页面！</h1>
      <router-link class="errorService" to="/">返回首页</router-link>
    </div>
    <router-link class="errorLogo" to="/index"><img id="Logo1" src="" alt=""></router-link>
  </div>
</template>
<style lang="scss" scoped>
  .notFound{
    height: 455px;
    text-align: center;
    h1{
        color:#59adf2;
        font-weight: 400;
        margin: 40px 0;
        margin-bottom: 20px;
        font-size:22px;
    }
    p{
      line-height: 1.8;
      color:#666;
      text-align: left;
      display: table;
      margin: 0 auto;
    }
    a{
      font-size: 1em;
    }
  }
  .errorLogo{
    position: absolute;
    right: 20px;
    bottom: 20px;
    img{
      height:50px;
    }
  }
</style>
