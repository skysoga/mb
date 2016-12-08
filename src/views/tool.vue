<template>
  <div class="main">
    <button @click="clearStorage" style="margin: 30% -55px;position: absolute;left: 50%;">缓存清理</button>
  </div>
</template>
<script>
  export default{
    methods:{
      clearStorage(){
        localStorage.clear()
        sessionStorage.clear()
        layer.msgWarn("缓存清除成功!")
      }
    }
  }
</script>
