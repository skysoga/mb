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
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}
.text{
  color:white;
  display: -webkit-box; 
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
</style>