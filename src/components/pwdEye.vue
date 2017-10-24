<template>
  <span @click="closeOrOpen" class="iconfont eye" :class="{'open':!type}"></span>
</template>
<script>
  export default{
    data(){
      return {
        inputNode:null,
        type:false
      }
    },
    mounted(){
      //元素产生后去修改父级元素的style
      this.inputNode=this.$el.parentNode.parentNode.getElementsByTagName('input')[0]
      this.type=this.inputNode.type==='password'
    },
    methods:{
      closeOrOpen(){
        // this.$parent.Eyes=!this.$parent.Eyes
        this.type=!this.type
        this.inputNode.type=this.type?'password':'url'
        this.inputNode.focus()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .eye{
    position: absolute;
    z-index: 5;
    padding:.1em 1em 0 .5em;
    top:0;
    right: 0;
    color: #c3c3c3;
    //color: #ff2c55;
  }
  .eye:after{
    content:"\e602"
  }
  .eye.open:after{
    content:"\e603"
  }
</style>