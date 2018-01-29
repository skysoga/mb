<template>
  <div class="direction">
    <div class="text">为了良好的体验请用竖屏浏览！</div>
  </div>
</template>
<style lang="scss" scoped>
.direction{
  position: fixed;
  z-index: 9999999;
  background: rgba(0,0,0,.8);
  width: 100%;
  height: 100%;
  top:0;
  left: 0;
}
.text{
  color:white;
}
</style>