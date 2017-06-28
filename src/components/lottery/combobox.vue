<template>
<div class="selectNumber fix">
  <div class="numberContent">
    <div v-for = "(item, index) in itemArr" class = "bet-item-box"  @click = "choose(item)" :class = "{curr: chosen.indexOf(item)>-1}">
      <a class = "bet-item">{{item}}</a>
      <span class = "bet-item-award" v-if = "needAward && renderOdds && renderOdds.length">赔率{{renderOdds[index]}}</span>
      <div class = "bet-item-eg-box" v-if = "egArr.length">
        <span v-for = "eg in egText[index]" class = "bet-item-eg">{{eg}}</span>
      </div>

    </div>
  </div>
</div>
</template>

<script>
export default{
  props:{
    itemArr:{
      type: Array,
      required:true
    },
    egArr:{
      default:function(){
        return []
      }
    },
    renderOdds:{
      required:true,
    },
    needAward:{
      type:Boolean,
      required:true
    },
    chosen:{
      type:Array,
      required:true
    }
  },
  name:'combobox',
  data(){
    return {

    }
  },
  methods:{
    choose(item){
      this.$emit('choose', item, this.itemArr)
    }
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

.numberContent{
  margin:0 auto;
  display: flex;
  flex-wrap: wrap;
  width: 95%;
}

.bet-item-box{
  width: 30%;
  margin:0.3rem;
  margin-right:0;
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
  padding:0.2rem 0;
  color: #333;
  font-size:1em;
}

.bet-item-award{
  display:flex;
  align-items:center;
  justify-content:center;
  width:100%;
  color:#dc3b40;
  padding-bottom:.35rem;
  font-size:.6em;
}

.bet-item-eg-box{
  display:flex;
  flex-wrap: wrap;
  justify-content:center;
  width:100%;
  padding-left:0.2em;
  padding:0.2em 0 0.2em 0.2em;
  border-top:1px solid #dfdfdf;
}

.bet-item-eg{
  display:inline-block;
  padding:0 0.1em;
  font-size:.05em;
  color:#888;
}

.curr{
  background: #dc3b40;
  border:1px solid #dc3b40;
  .bet-item, .bet-item-award, .bet-item-eg{
    color: #faf9f6;
  }

  .bet-item-eg-box{
    border-top:1px solid #e05257;
  }
}

</style>