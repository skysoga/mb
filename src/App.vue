<template>
  <div id="app">
    <title-info></title-info>
    <transition name="fade"  mode="out-in">
      <router-view :All = "this"></router-view>
    </transition>
    <navbar v-show="$route.meta.nav"></navbar>
  </div>
</template>

<script src="./js/app.js"></script>

<style lang="scss">
  @font-face {
    font-family: 'iconfont';
    src: url('//at.alicdn.com/t/font_1475058654_096525.eot'); /* IE9*/
    src: url('//at.alicdn.com/t/font_1475058654_096525.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('//at.alicdn.com/t/font_1475058654_096525.woff') format('woff'), /* chrome、firefox */
    url('//at.alicdn.com/t/font_1475058654_096525.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
    url('//at.alicdn.com/t/font_1475058654_096525.svg#iconfont') format('svg'); /* iOS 4.1- */
  }
  @import './scss/public.scss';
</style>
