<template>
  <div id="app">
    <template v-if="$route&&$route.matched[0]">
      <title-info :meta="$route.matched[0].meta"></title-info>
      <navbar v-show="$route.matched[0].meta.nav"></navbar>
    </template>
    <transition name="fade"  mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script src="./js/app.js"></script>
<style lang='scss'>
@font-face {
  font-family: 'iconfont';  /* project id 107431 */
  src: url('//at.alicdn.com/t/font_qpyqtanumoomkj4i.eot');
  src: url('//at.alicdn.com/t/font_qpyqtanumoomkj4i.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_qpyqtanumoomkj4i.woff') format('woff'),
  url('//at.alicdn.com/t/font_qpyqtanumoomkj4i.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_qpyqtanumoomkj4i.svg#iconfont') format('svg');
}
html{
  height: 100%;
}
body{
  min-height: 100%;
}
#app{
  height: 100%;
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
    border-bottom: none;
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
  transform:scaleY(.5);
  transform-origin:0 0;
}
.layermbtn {
  border-top: none;
  color:#007bf4;
  position: relative;
  &:after{
    content:"";
    position: absolute;
    top:0;
    left:0px;
    right:0px;
    border-top:1px solid #d8d8d8;
    -webkit-transform:scaleY(.5);
    -webkit-transform-origin:0 0;
    transform:scaleY(.5);
    transform-origin:0 0;
  }
  span {
      width: 100%;
      font-size: 16px;
      border-radius: 0 3px 0 3px;
    &:first-child{
      background:initial;
    }
  }
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
  transform:scaleY(.5);
  transform-origin:0 0;
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
  max-height: 50vh;
  overflow: scroll;
  word-wrap:break-word;
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
.layerCenter{
  text-align: center;
}
</style>
