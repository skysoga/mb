<template>
  <em v-show="$parent[inputName]" class="clearInput" @click="clear" ref='em'></em>
</template>
<script>
  export default{
    data(){
      return {
        inputName:null,
        inputNode:null,
        parentNode:null,
        // show:0  //用数字累加  已达到focus和blur的共同作用可以按想要的情况进行变化
        ImgCodeWidth:0
      }
    },
    // props:['inputName'],
    mounted(){
      //元素产生后去修改父级元素的style
      this.parentNode=this.inputNode=this.$el.parentNode
      this.inputNode.style.position='relative'
      this.inputNode=this.$el.parentNode.getElementsByTagName('input')[0]
      this.inputNode.required='required'
      this.inputNode.style.position='relative'
      this.inputNode.style.zIndex=1
      this.inputNode.style.background='rgba(0,0,0,0)'

      this.inputName=this.inputNode.name
      if (this.inputName==='ImgCode') {
        //输入框右侧的宽度  目前只有验证码情况下有值
        this.ImgCodeWidth=this.parentNode.nextSibling.nextSibling.offsetWidth
      }
      /*this.inputNode.onfocus=()=>{
        this.show+=1
      }
      this.inputNode.onblur=(e)=>{
        setTimeout(()=>{
          this.show-=1
        },50)
      }*/

      /*this.inputNode.onmousedown=(e)=>{
        console.log(e.pageX)
        if (e.clientX>13*rem) {
          this.clear()
        }
      }*/
      this.inputNode.ontouchstart=(e)=>{
        if (e.touches[0].clientX>13*rem-this.ImgCodeWidth) {
          this.clear()
        }
      }
    },
    methods:{
      clear(){
        this.$parent[this.inputName]=''
        // this.inputNode.focus()
      },
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