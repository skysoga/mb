<template>
  <div class="header">
    <div class="info fix">
      <div class="back"></div>
      <div class="title">和值</div>
      <div class="help"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .header{
    height:2.3em;
    position:fixed;
    z-index:50;
    top:0;
    left:0;
    width:100%;
  }
  .info{
    background: rgba(0, 0, 0, 0.6);
    height:2.3em;
    line-height:2.3em;
    width:100%;
    > div{
      float:left;
      height:2.3em;
    }
    .back,.help{
      width:15%;
    }
    .title{
      color:white;
      width:70%;
      text-align:center;
    }
  }
</style>