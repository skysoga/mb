<template>
  <div class="userinfo" :class="{opened}" @click="$parent.userinfoShow = 0">
    <div class="content" @click.stop="">
      <div class="loading" v-show="loading">正在加载...</div>
      <div class="info" v-show="!loading" v-if="$parent.userinfoBy === 'user'">
        <div class="head" :style="{background:'url('+UserPhoto+')'}">
        </div>
        <div class="name">
          <template v-if="$store.state.UserNickName">{{$store.state.UserNickName}}</template>
          <template v-else>未设置昵称</template>
          <em>{{getLevel($store.state.UserUpGradeBonus.Grade)}}</em>
        </div>
        <table>
          <tr>
            <td colspan="2" v-if="balShow">余额：{{UserBalance}} <ins @click="getBalance">刷新</ins></td>
            <td colspan="2" v-else>余额：已隐藏 <ins @click="getBalance">显示</ins></td>
          </tr>
          <tr>
            <td>账号：{{$store.state.UserName}}</td>
            <td style="text-align: right"><router-link class="userCenter" to="/userCenter">我的账户</router-link></td>
          </tr>
        </table>
      </div>
      <div class="info" v-show="!loading" v-if="$parent.userinfoBy === 'Anchor'">
        <div class="head" :style="{background:'url('+$parent.$parent.Anchor.Photo+')'}">
          <span :style="'background: url('+$store.state.constant.ImgHost+'/live/crown-anchor2x.png)'"></span>
        </div>
        <div class="name">
          {{$parent.$parent.Anchor.Name}}
          <span class="sex" :class="{girl:!$parent.$parent.Sex}"></span>
          <span class="age">{{$parent.$parent.Anchor.Age}}岁</span>
        </div>
        <div class="bouns">本月打赏：{{$parent.$parent.Anchor.Bouns}}元</div>
        <table>
          <tr>
            <td>地区：{{$parent.$parent.Anchor.City}}</td>
            <td>体重：{{$parent.$parent.Anchor.Weight}}kg</td>
          </tr>
          <tr>
            <td>身高：{{$parent.$parent.Anchor.Height}}cm</td>
            <td>三围：{{$parent.$parent.Anchor.BWH}}</td>
          </tr>
        </table>
      </div>
      <div class="info" v-show="!loading" v-if="$parent.userinfoBy === 'help'">
        <div class="help-con">
          <h3>直播说明</h3>
          <p>1.避免争议，骰子靠壁倾斜需重摇；</p>
<p>2.点击屏幕可进行投注和取消投注；</p>
<p>3.投注界面左右滑动可以切换玩法；</p>
<p>4.点击4G按钮可以切换到4G模式；</p>
<p>5.点击WiFi按钮可切回视频模式；</p>
<p>6.点击×号按钮可以退出直播间。</p>
        </div>
      </div>
      <div class="close" @click="$parent.userinfoShow = 0"></div>
    </div>
  </div>
</template>
<script>
  export default {
    data:()=>{
      return {
        loading:1,
        balShow:false,
        UserBalance:"",
        opened:0,
        UserPhoto:null,
      }
    },
    created(){
      setTimeout(()=>{
        this.opened = 1
      },10)
      var type = this.$parent.userinfoBy
      if (type === 'user') {
        this.UserBalance=store.state.UserBalance
        var arr=['UserName','UserNickName','UserPhoto']
        RootApp.GetInitData(arr,state=>{
          this.loading = 0
          this.UserPhoto = this.$store.getters.PhotoPath+state.UserPhoto||state.constant.DefPhoto
        })
      }else{
        this.loading = 0
      }
    },
    methods:{
      getLevel(v){
        if (v>0&&v<10) {
          return 'VIP'+v
        }
        else{
          switch(v){
            case 0:return '黑名单';break;
            case -1:return '测试组';break;
            case 10:return '站长';break;
          }
        }
      },
      getBalance:function(){
        RootApp.GetInitData(['UserBalance'],ref=>{
          this.refreshClass+=" refreshMove"
          this.balShow=true
          this.UserBalance=""
          setTimeout(()=>{
            this.refreshClass="refresh"
            this.UserBalance=store.state.UserBalance
          },500)
        })
      }
    },
  }
</script>
<style lang="scss" scoped>
.help-con{
  h3{
    text-align: center;
    margin-bottom: .4em;
    color:#e72d3c;
    &:before{
      display: inline;
      content: '\e647 ';
      font-family: 'iconfont';
    }
  }
  p{
    margin-top:.5em;
  }
  color:#333;
  padding:1.2em .8em;
  padding-bottom: 0;
  font-size: .7em;
  line-height: 1.4em;
}
.age,.girl:before{
  font-size: .6em;
  display: inline-block;
  vertical-align: middle;
  color:white;
  padding:0 .2em;
  line-height: 1.5em;
  border-radius: .2em;
  height: 1.4em;
}
.age{
  background: #f08f69;
}
.girl{
  &:before{
    content:"\e642";
    font-family: 'iconfont';
    background:#e55f9c;
  }
}
.bouns{
  text-align: center;
  font-size: .5em;
  transform:translateY(-1.1em);
  height: .5em;
  color:#e55f9c;
}
.close{
  &:before{
    content:'\E607';
    font-family: 'iconfont';
    position: absolute;
    top:0;
    right:0;
    font-size: .6em;
    color:#ccc;
    height: 2.6em;
    width: 2.6em;
    text-align: center;
    line-height: 2.6em;
  }
}
ins{
  color:rgb(220, 59, 64);
}
.userCenter:before{
  position: absolute;
  margin-top: .5em;
  content:'';
  display: block;
  width: 1px;
  height: 1em;
  background: #ccc;
}
.userCenter:after{
  content: '\e60e';
  position: absolute;
  font-family: 'iconfont';
  transform:scale(.75);
  color:#a3a3a3;
}
table{
  font-size: .65em;
  margin:0 auto;
  width: 15em;
  color:#666;
  td{
    height: 2em;
    line-height: 2em;
  }
}
.name{
  text-align:center;
  font-size: .7em;
  color:#333;
  margin:1.2em 0;
  em{
    color:white;
    background: #55a9f8;
    font-size: .7em;
    padding:0 .3em;
    border-radius: .2em;
  }
}
.head{
  height: 3.5em;
  width: 3.5em;
  margin:0 auto;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  border-radius: 50%;
  margin-top: 1.7em;
  border:3px solid #e2e0e0;
  span{
    height: 5em;
    width: 5em;
    display: block;
    background-repeat: no-repeat !important;
    background-size: 4.4em !important;
    position: absolute;
    margin-left: -.56em;
    margin-top:-.8em;
  }
}
.userinfo{
  top: 0;
  width:100%;
  height:100%;
  position: fixed;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  z-index: 100;
  transform: translateY(30em);
  transition: .3s;
}
.opened{
  transform: translateY(0);
}
.content{
  position: relative;
  display: -webkit-box; 
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  width: 13.4em;
  border-radius: .22em;
  background: white;
  .loading{
    width: 100%;
    min-height: 10em;
    line-height: 10em;
    text-align: center;
    font-size: .8em;
    color:#666;
  }
  .info{
    height: 100%;
    width: 100%;
    padding-bottom: 1em;
  }
}
</style>