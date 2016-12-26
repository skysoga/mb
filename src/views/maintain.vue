<template>
  <div class="maintainCon">
    <header class="top">
      <span><img :src="$store.getters.PhotoPath+'logo/mobile_logo.png'"></span>
    </header>
    <div class="errorContent fix">
      <div class="maintain">
        <div class="left">
          <img src="http://images.dafa176.com/system/pc/error/error.png" alt="" width="130" height="87">
        </div>
        <div class="right">
          <h1>系统维护中</h1>
          <p>每一次简单的维护<br>都是为了给您带来更好的服务<br>预计于 <em>{{FinishTime}}</em>维护完成</p>
          <router-link class="errorService" to="/service">在线客服</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var html = document.querySelector('html');
  const rem = html.clientWidth/16;
  const em = Math.sqrt((rem-20)*.9)+20;
  document.write("<style>html{font-size:"+rem+"px;}body{font-size:"+em+"px;}</style>");
export default {
  data(){
    return{
      FinishTime:"2016/12/24 19:36:29"
    }
  }
}
</script>

<style lang="scss" scoped>
	@import '../scss/maintain.scss';
</style>
