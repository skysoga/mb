<template>
  <div id="app">
    <title-info :meta="$route&&$route.meta"></title-info>
    <transition name="fade"  mode="out-in">
      <router-view></router-view>
    </transition>
    <navbar v-show="$route.meta.nav"></navbar>
  </div>
</template>

<script src="./js/app.js"></script>
<style>
  @font-face {
    font-family: 'iconfont';
    src: url('//at.alicdn.com/t/font_1475058654_096525.eot'); /* IE9*/
    src: url('//at.alicdn.com/t/font_1475058654_096525.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('//at.alicdn.com/t/font_1475058654_096525.woff') format('woff'), /* chrome、firefox */
    url('//at.alicdn.com/t/font_1475058654_096525.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
    url('//at.alicdn.com/t/font_1475058654_096525.svg#iconfont') format('svg'); /* iOS 4.1- */
  }
  .laymshade {
    background-color: rgba(0, 0, 0, .3);
  }
  .layermchild {
      background-color: #f8f8f8;
      border-radius: 4px;
  }
  .layermbox0 .layermchild {
      min-width: initial;
  }
  .layermchild h3 {
      font-weight: blod;
      height: 40px;
      line-height: 40px;
      position: relative;
  }
  .layermchild h3:after{
    content:"";
    position: absolute;
    bottom:0px;
    left:0px;
    right:0px;
    border-bottom:1px solid #d8d8d8;
    -webkit-transform:scaleY(.5);
    -webkit-transform-origin:0 0;
  }
  .layermbtn {
      border-top: none;
      color:#007bf4;
  }
  .layermbtn:before{
    content:"";
    position: absolute;
    top:0px;
    left:0px;
    right:0px;
    border-bottom:1px solid #d8d8d8;
    -webkit-transform:scaleY(.5);
    -webkit-transform-origin:0 0;
  }
  .layermbtn span {
      width: 100%;
      font-size: 16px;
      border-radius: 0 3px 0 3px;
  }
  .layermbtn span:nth-last-of-type(2) {
      width: 49%;
      height: 39px;
      border-radius: 0 0 0 3px;
      border-right:1px solid #d8d8d8;
  }
  .layermbtn span:nth-of-type(2) {
      font-weight: bold;
      width: 49%;
      height: 39px;
      border-radius: 0 3px 0 0
  }
  .layermbtn:before{
    display: none;
  }
  .layermsg .layermcont .iconfont {
      display: inline-block;
      font-size: 24px;
      margin: 0px 6px;
      transform: translateY(1px);
  }
  .layermsg .layermcont .svgLoad {
      vertical-align: middle;
      margin-top: -5px;
      width: 22px;
      height: 22px;
      fill: #000;
  }


  /* 几种常用样式定制 */
  .layerConfirm.layermchild{
    width:18em;
    font-size:.7em;
  }
  .layermchild  h3{text-align: center}
  .layermchild h3{
    padding:0;
  }
  .layermend{
    display:none;
  }
  .layermcont{
    padding:10px;
  }
  .tal .layermcont{
    /*text-indent:3em;*/
    text-align:left;
    padding-left:2em;
    padding-right:2em;
  }
  .layermchild h3{
    height:40px;
    line-height:40px;
  }
</style>
<style lang="scss">
</style>
