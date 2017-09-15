<template>
  <div class="newContainer" @touchend="touchend">
    <div class="betContainer">
      <div class="video"></div>
      <mainheader></mainheader>
      <div class="betbox">
        <div class="space"></div>
        <div class="topshadow"></div>
        <div ref="buttonList" class="newmain">
          <ul class="buttonList fix">
            <li :class = "{curr:chosen.indexOf('大') > -1}"><span @click="addNum('大')">大</span></li>
            <li :class = "{curr:chosen.indexOf('小') > -1}"><span @click="addNum('小')">小</span></li>
            <li :class = "{curr:chosen.indexOf('单') > -1}"><span @click="addNum('单')">单</span></li>
            <li :class = "{curr:chosen.indexOf('双') > -1}"><span @click="addNum('双')">双</span></li>
            <li :class = "{curr:chosen.indexOf('3') > -1}"><span @click="addNum('3')">3</span></li>
            <li :class = "{curr:chosen.indexOf('4') > -1}"><span @click="addNum('4')">4</span></li>
            <li :class = "{curr:chosen.indexOf('5') > -1}"><span @click="addNum('5')">5</span></li>
            <li :class = "{curr:chosen.indexOf('6') > -1}"><span @click="addNum('6')">6</span></li>
            <li :class = "{curr:chosen.indexOf('7') > -1}"><span @click="addNum('7')">7</span></li>
            <li :class = "{curr:chosen.indexOf('8') > -1}"><span @click="addNum('8')">8</span></li>
            <li :class = "{curr:chosen.indexOf('9') > -1}"><span @click="addNum('9')">9</span></li>
            <li :class = "{curr:chosen.indexOf('10') > -1}"><span @click="addNum('10')">10</span></li>
            <li :class = "{curr:chosen.indexOf('11') > -1}"><span @click="addNum('11')">11</span></li>
            <li :class = "{curr:chosen.indexOf('12') > -1}"><span @click="addNum('12')">12</span></li>
            <li :class = "{curr:chosen.indexOf('13') > -1}"><span @click="addNum('13')">13</span></li>
            <li :class = "{curr:chosen.indexOf('14') > -1}"><span @click="addNum('14')">14</span></li>
            <li :class = "{curr:chosen.indexOf('15') > -1}"><span @click="addNum('15')">15</span></li>
            <li :class = "{curr:chosen.indexOf('16') > -1}"><span @click="addNum('16')">16</span></li>
            <li :class = "{curr:chosen.indexOf('17') > -1}"><span @click="addNum('17')">17</span></li>
            <li :class = "{curr:chosen.indexOf('18') > -1}"><span @click="addNum('18')">18</span></li>
          </ul>
        </div>
        <div class="bottomshadow" :style="{height:mainHeight+'px'}"></div>
        <div class="space2"></div>
      </div>
      <mainfooter ref="footer" :betshow="betshow" :chosen="chosen"></mainfooter>
    </div>
  </div>
</template>
<script>
  import mainheader from './header'
  import mainfooter from './footer'
  export default {
    data:()=>{
      return{
        chosen:[],
        betshow:0,
        mainHeight:0,
        beforeScreenHeight:0,
      }
    },
    created(){
    },
    methods:{
      addNum(num){
        // alert(document.body.offsetWidth+'+'+document.body.offsetHeight)
        var where = this.chosen.indexOf(num)
        if(where > -1){
          delete this.chosen[where]
          this.chosen.splice(where,1)
        }else{
          this.chosen.push(num)
        }
        if (this.chosen.length > 0) {
          this.betshow = 1
        }else{
          this.betshow = 0
        }
      },
      setHeight(){
        var screenHeight = document.documentElement.clientHeight
        if (this.beforeScreenHeight == screenHeight) {
          return
        }
        this.beforeScreenHeight = screenHeight
        var footerHeight = this.$refs.footer.$el.offsetHeight
        var buttonList = this.$refs.buttonList.offsetHeight
        this.mainHeight = screenHeight - footerHeight - (2.3+1)*em - buttonList + 1.6*em
        console.log('screenHeight:'+screenHeight)
        console.log('footerHeight:'+footerHeight)
        console.log(this.mainHeight)
      },
      touchend(e){
        setTimeout(()=>{
          this.setHeight()
        },100)
      }
    },
    mounted(){
      this.setHeight()
    },
    components: {
      mainheader,
      mainfooter
    }
  }
</script>
<style lang="scss" scoped>
  .space{
    height:2.3em;
    width:100%;
  }
  .space2{
    height:2.15em;
    width:100%;
  }
  .video{
    background:url('/static/img/newk3-bg.jpg') no-repeat;
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-size: 100%;
  }
  .newContainer{
    position:relative;
    z-index:20;
  }
  .topshadow{
    height:1em;
    background:rgba(0,0,0,.6);
    width:100%;
    position: relative;
  }
  .betbox{
    padding-bottom:3em;
    width:100%;
  }
  .newmain{
    position:relative;
    &:before,&:after{
      content:'';
      position:absolute;
      top:0;
      left:0;
      width:calc((100vw - 288px)/2);
      height:100%;
      background:rgba(0,0,0,.6);
    }
    &:after{
      left:initial;
      right:0;
    }
  }
  .buttonList{
    width:288px;
    margin:0 auto;
    font-size:18px;
    >li{
      float:left;
      width:4em;
      height:4em;
      line-height:4em;
      text-align:center;
      color:white;
      position:relative;
      overflow: hidden;
      &:after,span{
        position:absolute;
        width:100%;
        height:100%;
        left:0;
        top:0;
      }
      &:after{
        content:'';
        background:url('/static/img/button-bg.svg') no-repeat;
        background-size:100%;
      }
      span{
        position:absolute;
        z-index:20;
        font-size:1.4em;
      }
    }
    .curr{
      &:after{
        background:url('/static/img/button-bg-curr.svg') no-repeat;
      }
    }
  }
  .bottomshadow{
    position:absolute;
    width:100%;
    min-height:2.6em;
    background:rgba(0,0,0,.6);
  }
</style>