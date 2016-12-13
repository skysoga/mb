<template>
  <div class="textareaNumber">
    <textarea placeholder=" 每1个号码之间请用空格( )、逗号(,)、分号(;)隔开" v-model = "betStr" @input = "whenInput"></textarea>
  </div>
</template>

<script>
import {unique, bus} from '../../js/kit'
function getLegalStr(str){
  str = str.replace(/^\s+/g, '');
  str = str.replace(/[^\d,，;；\s]/g, '');
  str = str.replace(/，/g, ',');
  str = str.replace(/；/g, ';');
  return str;
}

/**
 * [combNote 组合单式]
 * x 混合单式传[2,3] 组三单式传2 组六单式传3 组选单式传2
 * @return {[arr]}   [滤除后的新数组]
 */
function combNote(x, arr){
  var noRepeatArr = cunique(arr); //数字不重复的数组
  return howManyNum(noRepeatArr, x);
}

//组选注单的去重  123 和 321 视为一注，仅留一个
function cunique(arr){
  for(var i = 0;i < arr.length;i++){
    arr[i] = arr[i].split('').sort(function(a,b){
      return (+a) - (+b);
    }).join('');
  }
  return unique(arr);
}

/**
 * [howManyNum description]
 * @param  {[type]} arr [传入包含注单（string）的数组]
 * @param  {[type]} n   [每个注单期望拥有的数字,如123为三个,112为二个，111为一个]
 * @return {[arr]}     [返回期望的数字的注单的数组]
 */
function howManyNum(arr, n){
  var newArr = [];
  for(var i = 0;i < arr.length;i++){
    var len = unique(arr[i].split('')).length;  //该注单拥有的数字数，112为两个
    if(typeof n == 'number'){
      if(len === n){
        newArr.push(arr[i]);
      }
    }else{
      if(n.some(function(item){ return len === item})){
        newArr.push(arr[i]);
      }
    }

  }
  return newArr;
}

export default {
  props:['len'],
  created(){
    bus.$off('clearNoteStr')
    bus.$on('clearNoteStr', ()=>{
      this.betStr = ''
    })
  },
  data(){
    return {
      betStr:'',
    }
  },
  computed:{
    mode:()=>state.lt.mode.mode
  },
  methods:{
    whenInput(){
      var len = +this.len
      this.betStr = getLegalStr(this.betStr)
      var realtext = this.betStr.replace(/[;\s]/g, ',')
      var betArr = unique(realtext.split(',').filter(item=>item.length === len))

      switch(this.mode){
        case 'F24':
        case 'D24':
        case 'E24':
          betArr = combNote([2,3], betArr); //混合组选
          break
        case 'F26':
        case 'E26':
        case 'D26':
          betArr = combNote(2, betArr);     //组三单式
          break
        case 'F27':
        case 'E27':
        case 'D27':
          betArr = combNote(3, betArr);     //组六单式
          break
        case 'C22':
        case 'B22':
          betArr = combNote(2, betArr);     //组选单式
          break
      }

      store.commit('lt_setBetCount', betArr.length)
      store.commit('lt_setBetStr', betArr.join(','))
      store.commit({
        type:'lt_updateTmp',
        alias: 'notebet',
        arr: betArr
      })
    }
  },

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