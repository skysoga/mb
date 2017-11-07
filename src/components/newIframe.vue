<template>
  <!-- 是否用户打包APP -->
    <div class="newIframe">
        <header class="top" @click="$store.state.URL=''"><span>点击箭头返回</span><a class="iconfont back"></a></header>
        <div class="ifrmain">
          <iframe :src="url" frameborder="0" id="selfiframe"></iframe>
        </div>
    </div>
</template>
<script>
export default {
  props:['url']
}
</script>
<style lang="scss">
.newIframe{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background: #fff;
  .ifrmain{
    width: auto;
    height: 100%;
    iframe{
      border: 0;
      margin-top:2.555em;
      width: 16rem;
      height:26rem;
    }
  }
}
</style>

