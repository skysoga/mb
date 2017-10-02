<template>
  <span @click="$parent.Eyes=!$parent.Eyes" class="iconfont eye" :class="{'open':$parent.Eyes}"></span>
</template>
<style lang="scss" scoped>
  .eye{
    position: absolute;
    z-index: 5;
    padding:.1em 1em 0 .5em;
    top:0;
    right: 0;
  }
  .eye:after{
    color:#c6c6c6;
    content:"\e602"
  }
  .eye.open:after{
    color: #ff2c55;
    content:"\e603"
  }
</style>