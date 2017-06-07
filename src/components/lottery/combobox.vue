<template>
<div class="selectNumber fix">
  <div class="numberContent">
    <div v-for = "(item, index) in itemArr" class = "bet-item-box">
      <a class = "bet-item">{{item}}</a>
      <span class = "bet-item-award">赔率12.236</span>
      <div class = "bet-item-eg-box">
        <span v-for = "eg in egText[index]" class = "bet-item-eg">{{eg}}</span>
      </div>

    </div>
  </div>
</div>
</template>

<script>
export default{
  props:['itemArr','egArr'],
  name:'combobox',
  data(){
    return {

    }
  },
  created(){
    console.log('combobox')
  },
  computed:{
    egText(){
      return this.egArr.map(text=>text.split(','))
    }
  }
}
</script>

<style scoped lang = "scss">
@import '../../scss/scssConfig','../../scss/mixin';
.selectNumber{
  display: table;
  position: relative;
  .title{
    height: 1.85em;
    width: 2.6rem;
    display: table-cell;
    em{
      font-size: 0.65em;
      width:3.2em;
      display: block;
      text-align: left;
      line-height: 1.3em;
      color:#948a6e;
      background: #eeebda;
      border:1px solid #e3decf;
      border-radius: .3em;
      position: relative;
      z-index: 2;
      margin-top: .8em;
      padding:.2em .5em;
      /*&:before,&:after{
        content:"";
        position: absolute;
        // display: none;
      }
      &:before{
        width: 0;
        height: 0;
        right: -.6em;
        top: 0;
        border-top: .79em solid transparent;
        border-left: .6em solid #f4f1e2;
        border-bottom: .79em solid transparent;
        z-index: 2;
      }
      &:after{
        width: 0;
        height: 0;
        right: -.64em;
        transform:scale(1.1);
        top: 0;
        border-top: .79em solid transparent;
        border-left: .6em solid #ece7d9;
        border-bottom: .79em solid transparent;
        z-index: 1;
      }*/
    }
  }
}

.numberContent{
  padding:0.3rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content:center;
  width: 100%;
  /*号码项*/
}

.bet-item-box{
  width: 28%;
  margin:0.2rem 0.3rem;
  padding-top:0.3em;
  font-size: .8em;
  border:1px solid #dfdfdf;
  border-radius:.15rem;
  background: #faf9f6;
}
.bet-item{
  display:flex;
  align-items:center;
  justify-content:center;
  width:100%;
  color: #333;
  font-size:1em;
}

.bet-item-award{
  display:flex;
  align-items:center;
  justify-content:center;
  width:100%;
  color:#dc3b40;
  padding-bottom:.3rem;
  font-size:.6em;
  border-bottom:1px solid #dfdfdf;
}

.bet-item-eg-box{
  display:flex;
  flex-wrap: wrap;
  justify-content:center;
  width:100%;
  padding-left:0.2em;
  padding:0.2em 0 0.2em 0.2em;
}

.bet-item-eg{
  display:inline-block;
  padding:0 0.2em;
  font-size:.05em;
  color:#888;
}

</style>