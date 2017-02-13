<template>
  <div id="app">
    <div id="shadow" v-show="$store.state.turning"></div>
    <template v-if="$route&&$route.matched[0]">
      <title-info :m="$route.matched[0].meta" :s="$store.state"></title-info>
      <navbar v-show="$route.matched[0].meta.nav"></navbar>
    </template>
    <transition name="fade"  mode="out-in">
      <router-view :s="$store.state"></router-view>
    </transition>
  </div>
</template>

<script>
  import Navbar from './components/navbar';
  import TitleInfo from './components/title-info';
  import './scss/public.scss'

  export default {
    components: {
      Navbar,
      TitleInfo
    },
    data:()=>{
      return{
      }
    },
    watch:{
      $route(to,from){
        //RootApp.beforEnter(to)
        if (this.$store.state.needVerify>5) {
          console.log("强制踩点功能");
          RootApp.AjaxGetInitData(["CloudUrl"])
        }
        if (_App) {
          localStorage.setItem('LastPath',to.fullPath)
        }
      }
    }
  }
</script>

<style lang='scss'>
@font-face {
  font-family: 'iconfont';  /* project id 107431 */
  src: url('//at.alicdn.com/t/font_p8f3pggq80aa714i.eot');
  src: url('//at.alicdn.com/t/font_p8f3pggq80aa714i.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_p8f3pggq80aa714i.woff') format('woff'),
  url('//at.alicdn.com/t/font_p8f3pggq80aa714i.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_p8f3pggq80aa714i.svg#iconfont') format('svg');
}
html{
  height: 100%;
}
body{
  min-height: 100%;
}
#app{
  height: 100%;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}
#shadow{
  position: fixed;
  top: 0;
  left:0;
  z-index: 9;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.2);
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
    max-width: 18em;
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
.layermsg .layermcont {
  padding: 10px 10px;
  line-height: 21px;
  text-align: center;
}


/* 几种常用样式定制 */
.layerConfirm.layermchild{
  width:18em;
  font-size:.7em;
  text-align: center;
}
.layermchild  h3{text-align: center}
.layermchild h3{
  padding:0;
}
.layermend{
  display:none;
}
.layermcont{
  padding:10px 30px;
  max-height: 50vh;
  overflow-y: scroll;
  overflow-x:hidden;
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
