<!--
组件名称：返点详情
使用说明：
引入方式：import showCodeDetail from '../components/showCodeDetail'
组件显示与关闭:DetailShow=true|false
列表：dlist
关闭事件:@click="close"
父组件绑定：
<Detail-box v-show = "DetailShow"
                :dlist = "DetailList"
                ></Detail-box>
-->
<template>
<div class="_problemBox">
  <div class="showCodeDetail">
    <div class="blackBg"></div>
    <div class="creatAccountDetail">
    <h3 class="line"><em>返点详情</em><a @click="close"><i class="iconfont"></i></a></h3>
    <ul class="infoshow">
        <li v-for="n in dlist"><span>时时彩 </span><input type="number" value="7" disabled></li>
    </ul>
    </div>
  </div>
</div>
</template>
<script>
  export default{
    props:['dlist'],
    methods:{
      close(){
        this.$parent.DetailShow=false
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../scss/personalinfo.scss';
</style>
