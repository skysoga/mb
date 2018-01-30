<template>
  <div class="con" ref="target">
    <div class="target" :class="{reset}" :style="`transform:translateX(${moveX}px)`">{{content}}</div>
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
      if (this.width > this.maxWidth) {
        this.scroll()
      }
    },
    methods:{
      scroll(){
        setTimeout(()=>{
          this.moveX = -(this.width - this.maxWidth)
        },1000)
        setInterval(()=>{
          this.reset = !this.reset
        },6000)
      }
    },
    beforeDestroy(){
      clearInterval(this.t)
    }
  }
</script>
<style lang="scss" scoped>
.con{
}
.scrollText{
  display: block;
  max-width: 10rem;
  overflow: scroll;
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