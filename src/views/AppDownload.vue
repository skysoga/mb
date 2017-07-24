<template>
  <div class="main">
    <div class="intro">
      <a :style="`background:url(${$store.state.constant.ImgHost}${data.AppImg});background-size:100%;`"></a>
      <h1>{{data.AppName}}</h1>
      <p>下载APP 再也无需输入网址</p>
    </div>
    <div class="downLink">
      <a :href="data.AppleUrl" target="_blink"><i class="iconfont">&#xe64b;</i>点击下载iOS版</a>
      <a id="android" :href="data.AndroidUrl" target="_blink"><i class="iconfont">&#xe653;</i>点击下载安卓版</a>
    </div>
  </div>
</template>
<script>
  export default {
    data:()=>{
      return{
        data:{},
        AndroidIsFile:false,
        AppleIsFile:false
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
            }
          })
        }else{
          layer.msgWarn(d.StrCode)
        }
      })
    },
    beforeCreate(){
      if (_App) {
        router.go(-1)
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