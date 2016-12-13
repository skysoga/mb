<template>
  <div class="textareaNumber">
    <textarea placeholder=" 每1个号码之间请用空格( )、逗号(,)、分号(;)隔开" v-model = "betStr" @input = "whenInput"></textarea>
  </div>
</template>

<script>
import {unique} from '../../js/kit'
function getLegalStr(str){
  str = str.replace(/^\s+/g, '');
  str = str.replace(/[^\d,，;；\s]/g, '');
  str = str.replace(/，/g, ',');
  str = str.replace(/；/g, ';');
  return str;
}

export default {
  props:['len'],
  data(){
    return {
      betStr:'',
    }
  },
  methods:{
    whenInput(){
      var len = +this.len
      this.betStr = getLegalStr(this.betStr)
      var realtext = this.betStr.replace(/[;\s]/g, ',')
      var betArr = unique(realtext.split(',').filter(item=>item.length === len))

      store.commit('lt_setBetCount', betArr.length)
      store.commit('lt_setBetStr', betArr.join(','))
      store.commit({
        type:'lt_updateTmp',
        alias: 'notebet',
        arr: betArr
      })
    }
  }

}
</script>

<style lang = "scss" scoped>

.textareaNumber{
  background: white;
  margin: 0.6em;
  padding: 0.6em;
  height:9.6em;
  textarea{
    font-size: 0.7em;
    width:100%;
    height: 12em;
    margin:0;
    border:none;
    color:#666;
    &:focus{
      outline: none;
    }
  }
}
</style>