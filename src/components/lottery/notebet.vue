<template>
  <div class="textareaNumber">
    <textarea placeholder=" 每1个号码之间请用空格( )、逗号(,)、分号(;)隔开" v-model = "betStr" @input = "whenInput"></textarea>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {unique, bus, compress, throttle} from '../../js/kit'
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
  props:['len', 'special'],
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
  computed:mapState({
    mode:()=>state.lt.mode.mode
  }),
  methods:{
    whenInput(){
      throttle(()=>{
        var len = +this.len
        this.betStr = getLegalStr(this.betStr)
        var realtext = this.betStr.replace(/[;\s]/g, ',')
        var betArr = unique(realtext.split(',').filter(item=>item.length === len))

        if(this.special){
          //'b3x2'即选三个，有两个不相同的数字
          var specialFilter = {
            'b3x2x3':combNote([2,3],betArr),
            'b3x2':combNote(2,betArr),
            'b3x3':combNote(3,betArr),
            'b2x2':combNote(2,betArr)
          }
          betArr = specialFilter[this.special]
        }

        var compressMode = ['H12', 'G12']
        var comp = compressMode.indexOf(this.mode) > -1 ? compress(betArr) : ''
        this.$store.commit('lt_setBetCount', betArr.length)
        this.$store.commit('lt_setBetStr', betArr.join(','))
        this.$store.commit('lt_setBetCompress', comp)
        this.$store.commit({
          type:'lt_updateTmp',
          alias: 'notebet',
          arr: betArr
        })
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
  textarea{
    font-size: 0.7em;
    width:100%;
    height: 12em;
    margin:0;
    border:none;
    color:#666;
    display: block;
    &:focus{
      outline: none;
    }
  }
}
</style>