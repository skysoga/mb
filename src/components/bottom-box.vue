<!--
名称：底部弹框
用途：实现底部的弹框和遮罩
调用方法：
  1.在某个页面组件(父组件)的js引入该组件，并在vue实例中注册该组件(标签名建议为：bottom-box)
  2.在父组件的.vue 中插入该组件

         <bottom-box v-show = "BottomBoxShow"
                 :list = "BottomBoxList"
                 ></bottom-box>

    **其中 *BottomBoxShow 控制 bottom-box的显隐，
           *BottomBoxList 为渲染列表的值 ，写在父组件的data里。

             格式为:
                      BottomBoxList:{
                        'forgetPwd': '忘记密码',
                        'pc': '电脑版'
                      }

  3.在父组件写各个 li 的回调函数 ，写在父组件的methods 里，

     如：
        forgetPwd:function(){
          this.$root.$router.push("/forgetPwd");
        },
        pc:function(){
          location.href="http://"+location.host.replace('m.','www.')+"/index.html?CanPc";
        },
  4.增加父组件 delLogin方法和 isLogin 标志位来判断是否登录相关，且单独处理
 -->

<template>
  <div class = "_problemBox">

    <div class="blackBg" @click = "close"></div>
    <div class="moreLayer">
      <ul>
        <li v-show="$parent.isLogin">
          <a>选择登录帐号</a>
        </li>
        <li v-for="(value,key,index) in list">
          <a v-html="$parent.isLogin?key:value" :class="addUserLogo(key)" @click = "$parent.bottomBox(key,value)"></a>
          <span v-show="$parent.isLogin" @click="$parent.delLogin(index)"></span>
        </li>
      </ul>
      <ul>
        <li><a @click = "close">取消</a></li>
      </ul>

    </div>
  </div>
</template>

<script>
export default{
  props:['list'],
  methods:{
    close:function () {
      this.$parent.BottomBoxShow = false
    },
    addUserLogo:function(key){
      if(key==="11"){
        return 'noActive currentUser'
      }
    }
  }
}
</script>
<style lang='scss' scoped>
  .moreLayer{
    li{
      position:relative;
      span{
        position:absolute;
        right:0;
        top:0;
        /*margin:.5em;
        margin-right:.8em;*/
        height: 2em;
        width: 2.5em;
        z-index: 5;
        color:#ccc;
        &:active{
          color:#333;
        }
        &:after{
          content:'\e61d';
          font-family:'iconfont';
          display:block;
          margin-top:.5em;
          margin-left:.6em;
        }
      }
    }
  }
</style>
