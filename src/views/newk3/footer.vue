<template>
  <div class="footerContainer">
    <div v-if="betshow" class="info">
      <div class="selected"><span>当前选号</span><em v-for="d in chosen">{{d}}</em></div>
      <div class="money"><span>每注金额</span><input type="tel"><p>请输入要投注的金额<em>20</em>元</p></div>
    </div>
    <div class="betnow fix">
      <div class="clear" @click="clear">清空</div>
      <div class="total">共0注</div>
      <div class="betbutton">马上投注</div>
    </div>
  </div>
</template>
<script>
  export default {
    props:["betshow","chosen"],
    data:()=>{
      return{
      }
    },
    created(){
    },
    methods:{
      clear(){
        this.$parent.chosen = []
      }
    }
  }
</script>
<style lang="scss" scoped>
  .footerContainer{
    position:fixed;
    height:5.7em;
    width:100%;
    bottom:0;
    left:0;
    z-index:30;
  }
  .info{
    height:3.2em;
    background:rgba(34, 86, 63, 0.5);
    bottom:2.5em;
    > div{
      height:1.6em;
      line-height:1.6em;
      color:#caebda;
      padding:0 .4em;
      white-space:nowrap;
      text-overflow:ellipsis;
      overflow:hidden;
      span{
        font-size:.8em;
        margin-right:.4em;
      }
      em{
        font-size:.8em;
        color:#f4c829;
        margin-right:.4em;
      }
      input{
        -webkit-appearance: none;
        border:none;
        width:4em;
        margin:0;
        padding:0;
        border-radius:.14em;
        font-size:.8em;
        padding:0 .2em;
        color:#333;
      }
      p{
        display: inline;
        font-size: .65em;
        margin-left: .4em;
        em{
          font-size:1em;
          margin-right:0;
        }
      }
    }
  }
  .money{
    position:relative;
    &:before{
      content:'';
      position:absolute;
      width:100%;
      height:1px;
      background-image: -webkit-linear-gradient(90deg, #164630, #164630 50%, transparent 50%);
      left:0;
      top:0;
    }
  }
  .betnow{
    height:2.5em;
    width:100%;
    background:black;
    position:absolute;
    bottom:0;
    left:0;
    padding:0 .4em;
    > div{
      float:left;
      color:white;
      line-height:2.5em;
      // font-size:
    }
    .betbutton{
      float:right;
      background: linear-gradient(to bottom, #ffdb01 0%,#e07a06 100%);
      color:#4e0904;
      padding:0 .6em;
      border-radius:.2em;
      height:1.6em;
      line-height:1.6em;
      margin-top:.45em;
      &:active{
        background:#feab03;
      }
    }
    .clear{
      color:#ffaf36;
      margin-right:.4em;
    }
    .total{
      font-size:.8em;
      line-height:3.125em;
    }
  }
</style>