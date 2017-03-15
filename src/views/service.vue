<template>
  <div class="main">
    <iframe :src="ServiceUrl" width="100%" id="kefu"></iframe>
  </div>
</template>
<script src="../js/service.js"></script>
<style lang="scss" scoped>
  .main{
    padding-bottom: 0;
  }
  iframe{
    margin-top: -2.3em;
    width: 100%;
    height: 100%;
  }
</style>
