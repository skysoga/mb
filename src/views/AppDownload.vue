<template>
  <div>
    <div class="container" :class="curr=='main'?'active':''">
      <div class="main">
        <div class="intro">
          <a :style="`background-image:url(${$store.state.constant.ImgHost}${data.AppImg});border-radius: 1em;`"></a>
          <h1>{{data.AppName}}</h1>
          <p>下载APP 再也无需输入网址</p>
        </div>
        <div class="downLink">
          <a :href="AppleIsPlist?'javascript:;':data.AppleUrl" target="_blink" @click="showDetail"><i class="iconfont">&#xe64b;</i>点击下载iOS版</a>
          <a id="android" :href="data.AndroidUrl" target="_blink"><i class="iconfont">&#xe653;</i>点击下载安卓版</a>
        </div>
      </div>
    </div>
    <div v-if="AppleIsPlist" class="appledetail" :class="curr=='detail'?'active':''">
      <img :src="$store.state.constant.ImgHost
      +'/system/app/appleapp/apple-down-head.png'" alt="" width="100%">
      <span class="logo" :style="`background-image:url(${$store.state.constant.ImgHost}${data.AppImg});border-radius: 1em;`"></span>
      <a @click="download" class="detail-downbtn" :class="{nochange:text=='请到桌面查看进度'}" :href="data.AppleUrl">
        <img v-if="text!='点击安装'" class="loading" src="/static/img/rolling.svg" alt="">{{text}}</a>

			<p class="installText">安装后请打开手机设置<br />
			通用-设备管理-选择-信任 才能使用<br />
			可参照以下图文步骤进行操作</p>

			<hr class="line" />

			<p class="tip">部分浏览器可能无法安装，建议使用Safari浏览器操作</p>


			<img :src="$store.state.constant.ImgHost
			+'/system/app/appleapp/down-1.png'" alt="" width="100%">

			<br /><br />

			<img :src="$store.state.constant.ImgHost
			+'/system/app/appleapp/down-2.png'" alt="" width="100%">

			<br /><br />

			<img :src="$store.state.constant.ImgHost
			+'/system/app/appleapp/down-3.png'" alt="" width="100%">

			<br /><br />

			<img :src="$store.state.constant.ImgHost
			+'/system/app/appleapp/down-4.png'" alt="" width="100%">
			<p class="end"><span>已经到底啦</span></p>
    </div>
  </div>
</template>
<script>
  export default {
    data:()=>{
      return{
        data:{},
        AndroidIsFile:false,
        AppleIsFile:false,
        AppleIsPlist:false,
        curr:'main',
        text:'点击安装'
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
      if (_App) {
        router.go(-1)
      }
    },
    methods:{
      showDetail(e){
        this.curr = "detail"
      },
      download(){
        this.text="请到桌面查看进度"
        setTimeout(()=>{
          this.data.AppleUrl = "javascript:;"
        },100)
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
  @import "../scss/scssConfig";
  .installText {
  	text-align: center;
  	font-size: .7em;
  	color: #333;
  	padding: 2em 0;
  }
  .line {
		border: none;
		height: 1px;
		background-image: -webkit-linear-gradient(90deg, #d0d0d0, #d0d0d0 50%, transparent 50%);
		margin: 0;
	}
.tip {
	font-size: .65em;
	color: #666;
	text-align: center;
	margin: .7em 0;
}
.end {
	text-align: center;
	position: relative;
	height: 1em;
	padding: 1em 0;
	&:before{
		position: absolute;
		top: 50%;
		width: 100%;
		content: '';
		display: block;
		height: 1px;
		background-image: -webkit-linear-gradient(90deg, #d0d0d0, #d0d0d0 50%, transparent 50%);
	}
	span{
		background: white;
		display: inline-block;
		position: absolute;
		font-size: .7em;
		padding: 0 1em;
		margin-left: -3.45em;
		margin-top: -.7em;
		color: #999;
	}
}

.logo{
    position: absolute;
    display: block;
    width: 5em;
    height: 5em;
    background-size: cover;
    margin-top: -6.3em;
    margin-left: calc((100% - 5em)/2);
  }
  .loading{
    width: 1em;
    margin-right: .3em;
    display: inline-block;
    transform: translateY(-2px);
  }
  .detail-downbtn{
    color:#eb0002;
    background:white;
    display:block;
    width:11em;
    text-align:center;
    border:1px solid;
    border-radius:.35em;
    padding:.6em 0;
    font-size:.75em;
    margin:.4em auto;
    &:active{
      background:#eb0002;
      color:white;
    }
  }
  .active{
    display:block !important;
  }
  .container{
    height:100%;
    position:fixed;
    width:100%;
    top:0;
    left:0;
    display:none;
    >div{
      width:100%;
      height:100%;
    }
  }
  .apple{
    background:black;
  }
  .appledetail{
    background:white;
    display:none;
    margin-top:2.3em;
    position:relative;
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
  .nochange{
    &:active{
      background:white;
      color:#eb0002;
    }
  }
</style>
