<template>
  <div class="con" ref="target">
    <div class="target">{{content}}</div>
  </div>
</template>
<script>
  export default {
    props:['content'],
    data:()=>{
      return{
        width:0,
        t:null,
        position:0,
      }
    },
    mounted(){
      this.width = this.$refs.target.scrollWidth
      // this.t = setInterval(()=>{
      //   this.$refs.target.scrollTo(this.position+=1,0)
      // },50)
    },
    beforeDestroy(){
      clearInterval(this.t)
    }
  }
</script>
<style lang="scss" scoped>
.scrollText{
  display: block;
  max-width: 10rem;
  overflow: scroll;
}
.target{
  white-space: nowrap;
}
</style>