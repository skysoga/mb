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
    <newIframe :url="$store.state.URL" v-if="$store.state.URL"></newIframe>
  </div>
</template>

<script>
  import Navbar from './components/navbar';
  import TitleInfo from './components/title-info';
  import newIframe from './components/newIframe';
  export default {
    components: {
      Navbar,
      TitleInfo,
      newIframe,
    },
    data:()=>{
      return{
      }
    },
    // created(){
    //   var mql = window.matchMedia('(orientation: portrait)')
    //   console.log(mql);
    //   var handleOrientationChange = (mql)=>{
    //     if(document.activeElement.tagName === 'INPUT'){
    //       return
    //     }
    //     if(mql.matches) {
    //       this.directions = 'portrait'
    //     }else {
    //       this.directions = 'landscape'
    //     }
    //   }
    //   mql.addListener(handleOrientationChange)
    //   handleOrientationChange(mql)
    // },
    /*watch:{
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
    }*/
  }
</script>

<style lang='scss'>
@import './scss/public.scss';
@font-face {
  font-family: 'iconfont';  /* project id 380333 */
  src: url('//at.alicdn.com/t/font_380333_4deepb102pj5rk9.eot');
  src: url('//at.alicdn.com/t/font_380333_4deepb102pj5rk9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_380333_4deepb102pj5rk9.woff') format('woff'),
  url('//at.alicdn.com/t/font_380333_4deepb102pj5rk9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_380333_4deepb102pj5rk9.svg#iconfont') format('svg');
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
/* ==================*/
.KL8{
  .sscMain{
    .sscTips{
      padding-top: 6.8em;
    }
  }
  .betFilterAnd{
    padding: .2rem !important;
    div{
      width: 100% !important;
    }
    li{
      span{
        display: none;
      }
    }
  }
  .past,.current{
    height: 6.14em !important;
  }
  .StateStyle2{
    span{
      height: 1.6em !important;
      line-height: 1.6em !important;
    }
  }
}

.PK10{
  .betFilterAnd{
    padding: .2rem !important;
    li{
      span{
        display: none;
      }
    }
  }
  .sscMain{
    padding-bottom: 5.8em !important;
    .sscTips{
      padding-top: 5.6em;
    }
  }
}
.quWei{
  .numberContent{
    a{
      width: calc(12.4rem / 3) !important;
      span{
        border-radius: .2em;
        width: 4.4em;
      }
    }
  }
}

/* ==================*/
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
.table{
  .layermcont{
    padding: 0;
  }
  table{
    tr{
      position:relative;
      height: 2.6em;
      th,td{
        text-align: center;
        color:#666;
        width: 8em;
        font-size:1.1em;
        font-weight: 400;
        span{
          color:red;
          span{
            color:#666;
            margin-left: .2em;
          }
        }
      }
      &:nth-child(1):before{
        background: none;
      }
      &:before{
        content:'';
        display: block;
        height: 1px;
        width: 100%;
        position: absolute;
        background-image: -webkit-linear-gradient(90deg, #d8d8d8, #d8d8d8 50%, transparent 50%);
      }
      &:after{
        content:'';
        display: block;
        height: 2.6em;
        width: 1px;
        position: absolute;
        background-image: -webkit-linear-gradient(0deg, #d8d8d8, #d8d8d8 50%, transparent 50%);
        left:8em;
      }
    }
  }
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
