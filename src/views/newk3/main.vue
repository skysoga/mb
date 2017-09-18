<template>
  <div class="newContainer" @touchend="touchend">
    <div class="betContainer">
      <div class="video">
        <img src="/static/img/newk3-bg.jpg" alt="" width="100%">
      </div>
      <mainheader></mainheader>
      <swiper :options="swiperOption">
      <swiper-slide v-for="(d,i,j) in cfg">
      <div class="betbox" :class="i">
        <div class="space"></div>
        <div class="topshadow"></div>
        <div ref="buttonList" class="newmain">
          <ul class="buttonList fix">
            <li v-for="e in d.itemArr" :class = "{curr:chosen.indexOf(e) > -1,bgnone:e==0}"><span v-if="!(e==0)" @click="addNum(e)" class="fix"><em><i>{{e}}</i></em></span></li>
          </ul>
        </div>
        <div class="topshadow"></div>
        <div class="bottomshadow" :style="{height:heightArr[j]+'px'}"></div>
      </div>
      </swiper-slide>
      </swiper>
      <mainfooter ref="footer" :betshow="betshow" :chosen="chosen"></mainfooter>
    </div>
  </div>
</template>
<script>
  import mainheader from './header'
  import mainfooter from './footer'
  import { swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper'
  var cfg = {
    'A10':{
      itemArr:['大','小','单','双',3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
      index:0,
      line:[['大','小','单','双'],[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]],
      alg:data=>eachLen(data).reduce((p,c)=>p+c)
    },
    'B10':{
      itemArr:['三同号通选'],
      index:1,
      line:[['三同号通选']],
      alg:data=>data[0].length
    },
    'C10':{
      itemArr:[111,222,333,444,555,666],
      index:2,
      line:[[111],[222],[333],[444],[555],[666]],
      alg:data=>eachLen(data).reduce((p,c)=>p+c)
    },
    'D10':{
      itemArr:[1,2,3,4,5,6,0,0],
      index:3,
      line:[[1,2,3,4,5,6,0,0]],
      alg:data=>C(data[0].length, 3)
    },
    'E10':{
      itemArr:['三连号通选'],
      index:4,
      line:[['三连号通选']],
      alg:data=>data[0].length
    },
    'F10':{
      itemArr:[11,22,33,44,55,66,0,0],
      index:5,
      line:[[11,22,33,44,55,66,0,0]],
      alg:data=>data[0].length
    },
    'G10':{
      itemArr:[11,22,33,44,55,66,1,2,3,4,5,6],
      index:6,
      line:[[11,22,33,44,55,66],[1,2,3,4,5,6]],
      alg:data=>mul(2,eachLen(data))
    },
    'H10':{
      itemArr:[1,2,3,4,5,6,0,0],
      index:7,
      line:[[1,2,3,4,5,6,0,0]],
      alg:data=>C(data[0].length, 2)
    },
  }
  export default {
    components: {
      mainheader,
      mainfooter,
      swiper,
      swiperSlide
    },
    data:()=>{
      return{
        chosen:[],
        betshow:0,
        mainHeight:0,
        beforeScreenHeight:0,
        clientWidth:document.documentElement.clientWidth,
        cfg:cfg,
        heightArr:[],
        swiperOption:{
          autoplay:0,
          loop:true
        }
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
        console.log('继续检测高度')
        var screenHeight = document.documentElement.clientHeight
        if (this.beforeScreenHeight == screenHeight) {
          return
        }
        this.beforeScreenHeight = screenHeight
        var footerHeight = this.$refs.footer.$el.offsetHeight
        var buttonList = document.getElementsByClassName('buttonList')
        var temp = []
        for (var i = 0; i < buttonList.length; i++) {
          var mainHeight = screenHeight - (2.3+1+1+2.5)*em - buttonList[i].offsetHeight
          temp.push(mainHeight)
        }
        this.heightArr = temp
        console.log(this.heightArr)
        console.log('继续检测高度结束')
      },
      touchend(){
        console.log('检测高度')
        this.setHeight()
      }
    },
    mounted(){
      this.setHeight()
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
    position:fixed;
    top:0;
    left:0;
    height:100%;
    width:100%;
  }
  .newContainer{
    position:relative;
    z-index:20;
    height:100%;
  }
  .betContainer{
    height:100%;
  }
  .topshadow{
    height:1em;
    background:rgba(0,0,0,.6);
    width:100%;
    position: relative;
  }
  .betbox{
    padding-bottom:2.5em;
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
    font-size:24px;
    >li{
      float:left;
      width:3em;
      height:3em;
      line-height:3em;
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
        em{
          i{
            font-size:1em;
          }
          
        }
      }
    }
    .curr{
      &:after{
        background:url('/static/img/button-bg-curr.svg') no-repeat;
      }
    }
  }
  .bottomshadow{
    width:100%;
    background:rgba(0,0,0,.6);
  }
  .betbox.B10,.betbox.E10{
    .buttonList{
      li{
        width:100%;
        &:before,&:after{
          background:rgba(0,0,0,.6);
          width:2em;
          content:'';
          height:3em;
          display:block;
        }
        &:before{
          float:right;
        }
      }
      span{
        width:100%;
        margin-left:2em;
        &:before,&:after{
          background:url('/static/img/button-text-left-bg.svg') no-repeat left;
          content:'';
          display:block;
          height:3em;
          width:1.5em;
          float:left;
        }
        &:after{
          background:url('/static/img/button-text-right-bg.svg') no-repeat left;
          clear:inherit;
        }
        em{
          float:left;
          width:5em;
          display:block;
          height:3em;
          background:url('/static/img/button-text-center-bg.svg')
        }
      }
    }
  }
  .betbox.C10{
    .buttonList{
      li{
        margin:0 .5em;
        position:relative;
        overflow:inherit;
        em{
          &:before,&:after{
            position:absolute;
            top:0;
            left:-.5em;
            content:'';
            display:block;
            height:3em;
            width:.5em;
            background:rgba(0,0,0,.6);
          }
          &:after{
            left:inherit;
            right:-.5em;
          }
        }
      }
    }
  }
  .bgnone{
    &:after{
      background:rgba(0,0,0,.6) !important;
    }
  }
</style>