<template>
  <div class="con" ref="target">
    <div class="target" :class="{reset}" :style="{transform:`translateX(${moveX}px)`,transition:`${$parent.$parent.livecfg.broadCastShowTime}s`}">{{content}}</div>
  </div>
</template>
<script>
  export default {
    props:['content'],
    data:()=>{
      return{
        width:0,
        maxWidth:0,
        t:null,
        position:0,
        moveX:0,
        reset:0,
      }
    },
    mounted(){
      this.width = this.$refs.target.scrollWidth
      this.maxWidth = this.$refs.target.offsetWidth
      setTimeout(()=>{
        this.$parent.className="mounted"
      },10)
      if (this.width > this.maxWidth) {
        this.scroll()
      }else{
        setTimeout(()=>{
          this.$parent.className="before-destroy"
          setTimeout(()=>{
            //关闭自身
            this.closeSelf()
          },1000)
        },this.$parent.$parent.livecfg.broadCastShowTime*1000)
      }
    },
    methods:{
      scroll(){
        setTimeout(()=>{
          this.moveX = -(this.width - this.maxWidth)
        },2000)
        setTimeout(()=>{
          //自身消失动画
          this.$parent.className="before-destroy"
          setTimeout(()=>{
            //关闭自身
            this.closeSelf()
          },1000)
        },this.$parent.$parent.livecfg.broadCastShowTime*1000+2000)
      },
      closeSelf(){
        this.$parent.changeRow()
      }
    },
    beforeDestroy(){
      clearInterval(this.t)
    }
  }
</script>
<style lang="scss" scoped>
.con{
  pointer-events: none;
}
.scrollText{
  display: block !important;
  max-width: 10rem;
  overflow: scroll;
  transform: translateY(.05em);
}
.scrollText::-webkit-scrollbar {
  display:none
}
.target{
  white-space: nowrap;
  transition: 5s;
  transition-timing-function: cubic-bezier(0.5, 0.5, 1, 1);
}
.reset{
  transform:translateX(0) !important;
}
</style>
