<template>
  <em v-show="$parent[inputName]" class="clearInput" @click="$parent[inputName]=''" ref='em'></em>
</template>
<script>
  export default{
    props:['inputName'],
    mounted(){
      //元素产生后去修改父级元素的style
      this.$el.parentNode.style.position='relative'
    }
  }
</script>
<style scoped>
  .clearInput{
    opacity:0;
    position:absolute;
    top:0;
    right:.5em;
    width:2em;
    text-align:center;
    //color:#ccc;
    color:#dc3b40;
  }
  .clearInput:before{
      content:'\e607';
      font-family:'iconfont';
      font-size:.7em;
    }
  input:focus~.clearInput{
    opacity:1;
  }
  input+span+.clearInput{
    right:2em;
  }
</style>