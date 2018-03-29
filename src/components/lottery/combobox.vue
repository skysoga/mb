<template>
<div class="selectNumber fix" :class="$store.state.lt.mode.mode">
  <div class="numberContent" :class="(needAward && renderOdds && renderOdds.length)?'':'noaward'">
    <div v-for = "(item, index) in itemArr" class="bet-item-box-Con">
      <div class = "bet-item-box"  @click = "choose(item)" :class = "{curr: chosen.indexOf(item)>-1}">
        <a class = "bet-item">{{item}}</a>
        <span class = "bet-item-award" v-if="needAward && renderOdds && renderOdds.length">赔率{{renderOdds[index]}}</span>
        <div class = "bet-item-eg-box fix" v-if = "egArr.length">
          <span v-for = "eg in egText[index]" class = "bet-item-eg">{{eg>9?eg:('0'+eg)}}</span>
        </div>
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
  width: 95%;
  &.noaward{
    .bet-item{
      line-height: 2.6em;
    }
  }
}
.D01,.E01,.E02,.E03,.E04,.E05{
  .bet-item-box-Con{
    width: 33.3333333%;
    font-size: .8em;
    padding: .48em;
    float: left;
  }
  .bet-item-box{
    border:1px solid #dfdfdf;
    border-radius:.15rem;
    background: #faf9f6;
    a,span{
      display: block;
      text-align: center;
      line-height: 1.44;
    }
  }
  .bet-item-eg-box{
    width:100%;
    border-top:1px solid #dfdfdf;
    text-align: center;
    line-height: 0;
    padding: .1em;
    span{
      display: inline-block;
      width: .8rem;
      line-height: 1.2em;
    }
  }
}
.bet-item-box-Con{
  width: 25%;
  font-size: .8em;
  padding: .24em;
  float: left;
}
.bet-item-box{
  border:1px solid #dfdfdf;
  border-radius:.15rem;
  background: #faf9f6;
  a,span{
    display: block;
    text-align: center;
    line-height: 1.44;
  }
}

.bet-item{
  width:100%;
  padding-top:0.2em;
  color:#dc3b40;
  font-size:1em;
}

.bet-item-award{
  width:100%;
  color: #333;
  padding-top:.16em;
  padding-bottom:.5em;
  font-size:.66em;
}

.bet-item-eg{
  /*display:block;*/
  /*float: left;*/
  /*width: 18%;*/
  font-size:.6em;
  color:#888;
  text-align: center;
  padding: 0 .04em
}

.curr{
  background: #dc3b40 !important;
  border:1px solid #dc3b40 !important;
  .bet-item, .bet-item-award, .bet-item-eg{
    color: #faf9f6;
  }

  .bet-item-eg-box{
    border-top:1px solid #e05257;
  }
}

</style>
