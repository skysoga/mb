<template>
  <div class="main">
    <div class="intro">
      <a></a>
      <h1>彩神争霸</h1>
      <p>下载APP 再也无需输入网址</p>
    </div>
    <div class="downLink">
      <a href="https://itunes.apple.com/cn/app/caishen/id1226328248" target="_blink"><i class="iconfont">&#xe64b;</i>点击下载iOS版</a>
      <a href="http://imagess-google.com/system/app/caishen170503.apk" download="cszb170120_206.apk"><i class="iconfont">&#xe653;</i>点击下载安卓版</a>
    </div>
  </div>
</template>
<script>
  export default {
    beforeCreate(){
      if (_App) {
        router.go(-1)
      }
    }
  }
</script>
<style lang='scss' scoped>
  @import "../scss/_variable";
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
      background: unquote("url(" + $imgurl + "/system/app/appIcon.png)");
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