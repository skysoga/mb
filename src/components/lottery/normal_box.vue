<template>
<div class="selectNumber fix">
  <div class="title fix">
    <em><p>号码</p></em>
    <em><p>赔率</p></em>
  </div>

  <div class="numberContent fix">
    <div v-for = "(item, index) in itemArr"
         class = "bet-item-box"
         @click = "choose(item)">
      <a class = "bet-item" :class = "{curr:chosen.indexOf(item) > -1}">{{item}}</a>
      <span class = "bet-item-rate" v-if = "renderOdds && renderOdds.length">{{renderOdds[index]}}</span>
    </div>
  </div>
</div>

</template>

<script>
export default {
  props:{
    chosen:{
      type: Array,
      required:true
    },
    itemArr:{
      type: Array,
      required:true
    },
    renderOdds:{
      required:true
    },

  },
  methods:{
    choose(item){
      this.$emit('choose', item, this.itemArr)
    }
  },
}
</script>

<style scoped lang = "scss">
@import '../../scss/scssConfig','../../scss/mixin';
.selectNumber{
  padding:.3rem 0.5rem;
  padding-right: 0;
  display: table;
  position: relative;
  .title{
    height: 1.85em;
    width: 2.6rem;
    float: left;
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
  float: left;
  width: 12.9rem;
  /*号码项*/
  .bet-item-box{
    float: left;
    font-size: .8em;
    width: 2.58rem;
    margin:0.2rem 0.3rem;
    &:nth-child(4n+1){
      margin-left: 0;
    }
    .bet-item{
      display: block;
      text-align: center;
      width:100%;
      height:2.2em;
      line-height: 2.2em;
      color: #333;
      background: #faf9f6;
      font-size:1em;
      border:1px solid #bfbfbf;
      border-radius:.2rem;
    }

    .bet-item.curr{
      background: #dc3b40;
      border:1px solid #dc3b40;
      color:#ffe8cc;
    }

    .bet-item-rate{
      display: block;
      text-align: center;
      height:1.2em;
      line-height: 1.2em;
      margin-top:0.3rem;
      font-size:.6em;
      color: #666;
    }
  }

}


</style>