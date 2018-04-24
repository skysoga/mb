<template>
  <div>
    <div class="tc-header">
      <div class="back-btn" @click="$parent.ShowTrendchart = 0"></div>
      <div class="title"><em>走势图</em></div>
      <div class="lottery-type"><em>大发</em></div>
    </div>
    
  </div>
</template>
<style lang="scss" scoped>
.tc-header{
  height: 2.3em;
  background: black;
  color:white;
  display: flex;
  flex-flow:row;
  padding:0 .4em;
  >div{
    height: 100%;
    line-height: 2.3em;
  }
  em{
    font-size: .8em;
  }
  .back-btn,.lottery-type{

  }
  .back-btn{
    width: 4em;
    &:before{
      content:'\e60a';
      font-family: 'iconfont';
    }
  }
  .title{
    flex:1;
    width: 0;
    text-align: center;
  }
  .lottery-type{
    width: 4em;
    text-align: right;
    em{
      &:after{
        content: '\e61e';
        font-family: 'iconfont';
        font-size: .8em;
        margin-left: .4em;
      }
    }
  }
}
</style>