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
        <a v-for = "item in itemArr"
           @click = "choose(item)"
           :class = "chosen.indexOf(item) > -1 ? 'curr': ''">
           <span>{{item}}</span>
        </a>
      </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {unique} from '../../js/kit'

function isArrayEqual(a, b){
  return a.every((item, index)=>b[index]===item ) && a.length === b.length
}

var _0to9 = [0,1,2,3,4,5,6,7,8,9],
    _dsds = ['大', '小', '单', '双'],
    filters = ['全', '大', '小', '奇', '偶', '清'],
    _0to27 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27],
    _1to26 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],
    _0to18 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
    _1to17 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]

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
  'psum27':{itemArr: _0to27, filters: ['清']},
  'psum18':{itemArr: _0to18, filters: ['清']},
  'csum26':{itemArr: _1to26, filters:['清']},
  'csum17':{itemArr: _1to17, filters:['清']},
  'baodan':{itemArr: _0to9, filters:['清']}
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
  },
  data(){
    return {
      config:{},
    }
  },
  computed:mapState({
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
  }),
  methods:{
    choose(item){
      var _pos = this.chosen.indexOf(item),
          _chosen = this.chosen.slice(0)

      if(this.alias === 'baodan'){
        this.$store.commit({
          type:'lt_updateTmp',
          alias: this.alias,
          arr: [item]
        })
        this.$emit('choose')
        return
      }

      //如果已经存在，就删除该项
      if(_pos > -1){
        _chosen.splice(_pos, 1)
        var tmp = _chosen
      }else{
        //不存在添加该项
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

      this.$store.commit({
        type:'lt_updateTmp',
        alias: this.alias,
        arr: tmp
      })

      this.$emit('choose')
    },
    filter(item){
      this.$store.commit({
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
    @include bgImg-linear-gradient('90deg, #d0d0d0, #d0d0d0 50%, transparent 50%');
  }
  .title{
    height: 1.85em;
    width: 2.6rem;
    display: table-cell;
    em{
      font-size: 0.65em;
      height: 1.7em;
      width:3.2em;
      display: block;
      text-align: center;
      line-height: 1.7em;
      color:#bbb39c;
      background: #f4f1e2;
      border:1px solid #ece7d9;
      border-radius: .3em;
      position: relative;
      z-index: 3;
      margin-top: .8em;
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
.filterNumber{
  float: right;
  font-size: 0.7em;
  color:#999;
  a{
    display: inline-block;
    height: 1.6em;
    width: 1.6em;
    line-height:1.6em;
    text-align: center;
    vertical-align: middle;
    margin-left: 0.2em;
    float: left;
    display: initial;
    vertical-align: initial;
    padding-top: 0.15em;
  }
  .curr,a:active{
    color:#ff8a00;
    background: #ffe8cc;
    border-radius: 50%;
    font-size: 1.1em;
    width: 1.7em;
    height: 1.7em;
    line-height: 1.7em;
    padding: 0;
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
  .curr{
    span{
      background: #dc3b40;
      color:white;
      border:1px solid #dc3b40;
    }
  }
}
</style>