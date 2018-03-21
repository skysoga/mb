<template>
<div class="selectNumber fix">
  <div class="numberContent">
    <a v-for = "(item,i) in itemArr"
       @click = "choose(item)"
       :class = "{curr: chosen.indexOf(item) > -1}">
       <span :class = "numFeature[i+1].color">{{item}}</span>
    </a>
  </div>
</div>
</template>

<script>
import {createStringArray} from '../../js/kit'
import {numFeature} from '../../js/page_config/lt_6hc'
export default {
  props:{
    chosen:{
      type: Array,
      required:true
    }
  },
  data(){
    return {
      itemArr:createStringArray(1,49),
      numFeature
    }
  },
  methods:{
    choose(item){
      this.$emit('choose', item, this.itemArr)

    }
  }
}
</script>

<style scoped lang = "scss">
@import '../../scss/scssConfig','../../scss/mixin';
.selectNumber{
  padding:.3rem 0.5rem;
  padding-right: 0;
  display: table;
  position: relative;
  &:before{
    content:"";
    position: absolute;
    top:0;
    left: 0;
    width: 16rem;
    height: 1px;
    @include bgImg-linear-gradient('90deg, #dfdfda, #dfdfda 50%, transparent 50%');
  }
}
.selectNumberCenter{
  .numberContent{
    text-align: center;
  }
}
.numberContent{
  padding: 0;
  width: 14.88rem;
  display: table-cell;
  a{
    width: calc(12.4rem / 5);
    width: -webkit-calc(12.32rem / 5);
    display: inline-block;
    text-align: center;
  }

  span{
    display: inline-block;
    width: 1.9em;
    height: 1.9em;
    line-height: 1.9em;
    text-align: center;
    color:#dc3b40;
    background: #faf9f6;
    border-radius: 50%;
    border: 1px solid #bfbfbf;
    font-size: .8em;
    margin:0.3em;
  }
  .red{
    color:#dc3b40;
  }
  .blue{
    color:#218ddd;
  }
  .green{
    color:#38b366;
  }

  .curr{
    span{
      color:white;
    }

    .red{
      background: #dc3b40;
      border:1px solid #dc3b40;
    }

    .blue{
      background: #218ddd;
      border:1px solid #218ddd;
    }

    .green{
      background: #38b366;
      border:1px solid #38b366;
    }
  }
}

</style>

