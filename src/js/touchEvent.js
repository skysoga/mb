var startX = 0,
      startY = 0;
  function touchStart(){
      try{
          var touch = event.touches[0], //获取第一个触点
                  // x = Number(touch.pageX), //页面触点X坐标
                  y = Number(touch.pageY); //页面触点Y坐标
          //记录触点初始位置
          // startX = x;
          startY = y;
      }catch(e){
          console.log(e.message)
      }
  }

  function touchMove(){
      try{
          var touch = event.touches[0], //获取第一个触点
                  // x = Number(touch.pageX), //页面触点X坐标
                  y = Number(touch.pageY); //页面触点Y坐标
          //判断滑动方向
          if (y - startY>0) {
              console.log('下滑了sssa')
          }else{
              console.log('s滑了sssa')
          }
      }catch(e){
          console.log(e.message)
      }
  }

  function touchEnd(){
      try{
          var touch = event.touches[0], //获取第一个触点
                  // x = Number(touch.pageX), //页面触点X坐标
                  y = Number(touch.pageY); //页面触点Y坐标
          //判断滑动方向
          if (y - startY>0) {
              console.log('下滑了！ss');
          }else{
              console.log('上滑了！ss');
          }
      }catch(e){
          //console.log(e.message)
      }
  }

  //绑定事件
  function bindEvent(){
      document.addEventListener('touchstart',touchStart,false);
      document.addEventListener('touchmove',touchMove,false);
      document.addEventListener('touchend',touchEnd,false);
  }

  module.exports = bindEvent;
