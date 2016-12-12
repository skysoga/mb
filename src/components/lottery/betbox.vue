<template>
   <div class="selectNumber fix">
      <div class="title fix">
        <em>{{tag}}</em>
        <!-- 全大小奇偶清 -->
        <!-- <div class="filterNumber">
          <a v-for = "item in filters"
             @click = "filter(item)"
             :class = "filterLight(item)">
             {{item}}
         </a>
        </div> -->
      </div>

      <div class="numberContent">
        <a v-for = "(item, index) in itemArr"
           @click = "choose(item)"
           :class = "chosen.indexOf(item) > -1 ? 'curr': ''">
           <span>{{item}}</span>
        </a>
   <!--      <a class="curr"><span>0</span></a>
        <a><span>1</span></a>
        <a><span>2</span></a>
        <a><span>3</span></a>
        <a><span>4</span></a>
        <a><span>5</span></a>
        <a><span>6</span></a>
        <a><span>7</span></a>
        <a><span>8</span></a>
        <a><span>9</span></a> -->
      </div>
    </div>
</template>

<script>
import {unique} from '../../js/kit'

function isArrayEqual(a, b){
  return a.every((item, index)=>b[index]===item ) && a.length === b.length
}

var _0to9 = [0,1,2,3,4,5,6,7,8,9],
    _dsds = ['大', '小', '单', '双'],
    filters = ['全', '大', '小', '奇', '偶', '清'],
    _0to27 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]

var cfg = {
  '10000': {tag: '万位', itemArr: _0to9, filters: filters},
  '1000': {tag: '千位', itemArr: _0to9, filters: filters},
  '100': {tag: '百位', itemArr: _0to9, filters: filters},
  '10': {tag: '十位', itemArr: _0to9, filters: filters},
  '1': {tag: '个位', itemArr: _0to9, filters: filters},
  'xxxx': {tag: '四重号位', itemArr: _0to9, filters: filters},
  'xxx': {tag: '三重号位', itemArr: _0to9, filters: filters},
  'xx': {tag: '二重号位', itemArr: _0to9, filters: filters},
  'x': {tag: '单号位', itemArr: _0to9, filters: filters},
  //带i的是大小单双
  'i10000': {tag: '万位', itemArr: _dsds, filters: ['清']},
  'i1000': {tag: '千位', itemArr: _dsds, filters: ['清']},
  'i100': {tag: '百位', itemArr: _dsds, filters: ['清']},
  'i10': {tag: '十位', itemArr: _dsds, filters: ['清']},
  'i1': {tag: '个位', itemArr: _dsds, filters: ['清']},
  'whole':{itemArr: _0to9, filters: ['清']},
  'psum27':{itemArr: _0to27, filters: ['清']}
}
var refer = {
  '全':[0,1,2,3,4,5,6,7,8,9],
  '大':[5,6,7,8,9],
  '小':[0,1,2,3,4],
  '奇':[1,3,5,7,9],
  '偶':[0,2,4,6,8],
  '清':[]
}

export default {
  props:['alias'],
  created(){
    this.config = cfg[this.alias]
    store.commit({
      type:'lt_updateTmp',
      alias: this.alias,
      arr: []
    })
  },
  data(){
    return {
      config:{},
    }
  },
  computed:{
    chosen(){
      return state.lt.tmp[this.alias]
    },
    tag(){
      if(cfg[this.alias].tag){
        return cfg[this.alias].tag
      }else{
        return state.lt.mode.name
      }
    },
    itemArr(){
      return cfg[this.alias].itemArr
    },
    filters(){
      return cfg[this.alias].filters
    },
  },
  methods:{
    choose(item){
      var _pos = this.chosen.indexOf(item),
          _chosen = this.chosen.slice(0)
          // console.log(_chosen,_pos)
      if(_pos > -1){
        _chosen.splice(_pos, 1)
        var tmp = _chosen
      }else{
        _chosen.push(item)
        //去重加排序
        _chosen = unique(_chosen)
        var tmp = []
        for(var i = 0;i < this.itemArr.length;i++){
          if(_chosen.indexOf(this.itemArr[i]) > -1){
            tmp.push(this.itemArr[i])
          }
        }
      }

      store.commit({
        type:'lt_updateTmp',
        alias: this.alias,
        arr: tmp
      })

      this.$emit('choose')
    },
    filter(item){
      store.commit({
        type:'lt_updateTmp',
        alias: this.alias,
        arr: refer[item].slice(0)
      })
      this.$emit('choose')
    },
    filterLight(item){
      if(item === '清'){
        return ''
      }else{
        if(isArrayEqual(this.chosen, refer[item])){
          return 'curr'
        }else{
          return ''
        }
      }
    }
  }
}
</script>

<style lang = "scss" scoped>
  @import '../../scss/newssc.scss';
</style>