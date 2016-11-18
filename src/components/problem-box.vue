<!-- 
名称：底部弹框
用途：实现底部的弹框和遮罩
调用方法： 
  1.在某个页面组件(父组件)的js引入该组件，并在vue实例中注册该组件(标签名建议为：bottom-box)
  2.在父组件的.vue 中插入该组件

         <bottom-box v-show = "BottomBoxShow"
                 v-on:BoxDiappear = "BottomBoxShow = false"
                 v-on:BoxClick = "BottomBoxClick"
                 :list = "BottomBoxList"
                 ></bottom-box>

    **其中 *BottomBoxShow 控制 bottom-box的显隐，
           *BottomBoxClick 为 点击触发的回调，写在父组件的methods里，该回调函数会接受一个key字段，这个字段为BottomBoxList 循环渲染上的。

              格式为：
                  BottomBoxClick (key) {
                    var fns = {
                      forgetPwd: function() {
                        //此为执行函数
                      },
                      pc:() => {
                        //此为执行函数
                      }
                    }
                    fns[key]()
                  }

           *BottomBoxList 为渲染列表的值 ，写在父组件的data里。

             格式为:
                      BottomBoxList:{
                        'forgetPwd': '忘记密码',
                        'pc': '电脑版'
                      }
 -->

<template>
  <div class = "_problemBox">

    <div class="blackBg"></div>
    <div class="moreLayer">
      
      <ul>
        <li v-for = "(value,key) in list" @click = "go(key)">
          <a>{{value}}</a>
        </li>
      </ul>

      <ul>
        <li><a @click = "disappear">取消</a></li>
      </ul>

    </div>
  </div>
</template>

<script>
export default{
  props:['list'],
  data () {
    return {
    }
  },
  methods:{
    go (key){
      this.$emit('BoxClick', key)
    },
    disappear (){
      this.$emit('BoxDiappear')
    }
  }
}
</script>
