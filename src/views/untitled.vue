<template>
  <div>
  <div class="container" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" :style="{ transform: 'translate3d(0px, '+movey+'px, 0px)',transition:transition}">
    <div class="main">
      <div class="intro">
        <a :style="`background-image:url(${$store.state.constant.ImgHost}${data.AppImg});`"></a>
        <h1>{{data.AppName}}</h1>
        <p>下载APP 再也无需输入网址</p>
      </div>
      <div class="downLink">
        <a :href="data.AppleUrl?data.AppleUrl:'javascript:;'" target="_blink" @click="isScroll"><i class="iconfont">&#xe64b;</i>点击下载iOS版</a>
        <a id="android" :href="data.AndroidUrl" target="_blink"><i class="iconfont">&#xe653;</i>点击下载安卓版</a>
      </div>
    </div>
  </div>
  <div v-if="AppleIsPlist" class="appledetail">
    <img src="/static/img/apple-down.png" alt="" width="100%">
  </div>
  <div class="totop" @click="toTop">返回顶部</div>
  </div>
</template>
<script>
  export default {
    data:()=>{
      return{
        data:{},
        AndroidIsFile:false,
        AppleIsFile:false,
        tempy:0,
        movey:0,
        card:0,
        top:'top',
        clientHeight:document.documentElement.clientHeight,
        transition:'0',
        maxCard:2,
        AppleIsPlist:false
      }
    },
    beforeRouteEnter:(to, from, next) => {
      _fetch({Action:'GetAPPInfo'})
      .then(d=>{
        if (d.Code==1) {
          next(vm=>{
            vm.data = d.BackData
            var android = d.BackData.AndroidUrl.match(/.apk$/) || false
            var apple = d.BackData.AppleUrl.match(/.ipa$/) || false
            if (android) {
              vm.AndroidIsFile = true
            }
            if (apple) {
              vm.AppleIsFile = true
            }else{
              var result = d.BackData.AppleUrl.match(/.plist$/) || false
              if(result){
                //这个文件是plist形
                vm.AppleIsPlist = true
              }
            }
          })
        }else{
          layer.msgWarn(d.StrCode)
        }
      })
    },
    beforeCreate(){
      // if (_App) {
      //   router.go(-1)
      // }
    },
    methods:{
      touchstart(e){
        if (this.AppleIsPlist) {
          this.tempy = e.touches[0].clientY 
        }
      },
      touchmove(e){
        if (this.AppleIsPlist && this.card !==1) {
          if (this.card === 0 && e.touches[0].clientY-this.tempy > this.movey) {
            return
          }
          this.movey = e.touches[0].clientY-this.tempy-this.card*this.clientHeight
        }
      },
      touchend(e){
        if (this.AppleIsPlist) {
          this.tempy = 0
          if(this.movey > -this.clientHeight * this.card + 40 && this.card > 0){
            this.transition = '.3s'
            this.movey = -this.clientHeight * (this.card-1)
            this.card -=1
            setTimeout(()=>{
              this.transition = '0'
            },500)
          }else if(this.movey < -this.clientHeight * this.card - 40 && this.card < this.maxCard-1){
            this.transition = '.3s'
            this.movey = -this.clientHeight * (this.card+1)
            this.card +=1
            setTimeout(()=>{
              this.transition = '0'
            },500)
          }else{
            this.transition = '.3s'
            this.movey = -this.clientHeight * this.card
            setTimeout(()=>{
              this.transition = '0'
            },200)
          }
        }
      },
      isScroll(){
        if (this.AppleIsPlist) {
          this.transition = '.3s'
          this.movey = -this.clientHeight
          this.card = 1
          setTimeout(()=>{
            this.transition = '0'
          },500)
        }
      },
      toTop(){
        if (this.card == 1) {
          this.transition = '.3s'
          this.movey = 0
          this.card = 0
          setTimeout(()=>{
            this.transition = '0'
          },500)
        }
      }
    },
    watch:{
      AndroidIsFile:function(n,o){
        if (n) {
          document.getElementById('android').setAttribute('download',this.data.AppName+'.apk')
        }
      }
    }
  }
</script>
<style lang='scss' scoped>
  @import "../scss/_variable";
  .totop{
    position:fixed;
    right:.4em;
    bottom:0;
    z-index:20;
    width: 4em !important;
    height: 2em !important;
    color:#ccc;
    font-size:.7em;
  }
  .container{
    height:100%;
    position:fixed;
    width:100%;
    top:0;
    left:0;
    >div{
      width:100%;
      height:100%;
    }
  }
  .card2{
    top:-100%;
  }
  .apple{
    background:black;
  }
  .appledetail{
  }
  .downLink{
    margin-top: 3em;
    width: 100%;
    a{
      display: block;
      margin:0 auto;
      width: 14em;
      text-align: center;
      color: white;
      border:1px solid white;
      border-radius: .45em;
      font-size: .85em;
      height: 2.6em;
      line-height: 2.6em;
      margin-bottom: 1.2em;
      padding-left: 2em;
      position: relative;
      &:active{
        background:white;
        color:#dc3b40;
      }
      i{
        position: absolute;
        left: 1.5em;
        font-size: 1.6em;
      }
    }
  }
  .main{
    height: 100%;
    overflow: hidden;
    background: unquote("url(" + $imgurl + "/system/app/appBg.jpg)");
    background-size: 100%;
  }
  .intro{
    a{
      display: block;
      background-size: 100%;
      width: 5em;
      height: 5em;
      margin:0 auto;
      margin-top:2em;
    }
    h1,p{
      color: #fff;
    }
    h1{
      text-align: center;
      font-size: 1.26em;
      margin-top:.4em;
    }
    p{
      text-align: center;
      font-size: .6em;
      line-height: 2em;
    }
  }
</style>