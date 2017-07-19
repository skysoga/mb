<template>
<div class="selectNumber fix">
  <div class="title fix">
    <em><p>号码</p></em>
  </div>

  <div class="numberContent">
    <a v-for = "(item,i) in itemArr"
       @click = "choose(item)"
       :class = "{curr: chosen.indexOf(item) > -1}">

       <span :class = "numColor[i+1]">{{item}}</span>
    </a>
  </div>
</div>
</template>

<script>
import {createStringArray} from '../../js/kit'
import {numColor} from '../../js/page_config/lt_6hc'
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
      numColor
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
      color:#bbb39c;
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
.selectNumberCenter{
  .numberContent{
    text-align: center;
  }
}
.numberContent{
  padding: 0;
  width: 12.4rem;
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

