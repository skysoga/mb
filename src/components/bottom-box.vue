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
 -->

<template>
  <div class = "_problemBox">

    <div class="blackBg"></div>
    <div class="moreLayer">

      <ul>
        <li v-for = "(value,key) in list" @click = "$parent[key](value)">
          <a>{{value}}</a>
        </li>
      </ul>

      <ul>
        <li><a @click = "$parent.BottomBoxShow = false">取消</a></li>
      </ul>

    </div>
  </div>
</template>

<script>
export default{
  props:['list'],
}
</script>
