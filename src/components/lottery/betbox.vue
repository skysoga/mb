<template>
   <div class="selectNumber fix">
      <div class="title fix" v-if="!(gyhlh&&mode=='H11'||gyhlh&&mode=='J11')">
        <em><p>{{tag}}</p></em>
        <!-- 全大小奇偶清 -->
        <!-- <div class="filterNumber">
          <a v-for = "item in filters"
             @click = "filter(item)"
             :class = "filterLight(item)">
             {{item}}
         </a>
        </div> -->
      </div>

      <div :class="['numberContent',gyhlh&&'yghContent',(gyhlh&&mode=='H11'||gyhlh&&mode=='J11'||gyhlh&&mode=='L11')&&'gyhAllWidth']">
        <a v-for = "(item,key) in itemArr"
           @click = "choose(item)"
           :class = "chosen.indexOf(item) > -1 ? 'curr': ''">
           <span>
             <em>{{item}}</em>
            <i v-if="gyhlh&&awardArr">{{mode!=='G11'&&awardArr[key].length<5?'赔率':'赔'}}{{setArr[key]}}</i>
           </span>
        </a>
      </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {unique, createStringArray} from '../../js/kit'

function isArrayEqual(a, b){
  return a.every((item, index)=>b[index]===item ) && a.length === b.length
}
// var BJSCres=['PK10']//北京赛车配置
// var arrMode=['G11','H11']//北京赛车，双面盘，冠亚和
var isShowBox=['PK10G11','PK10H11','SSCJ11','SSCK11','SSCL11']

var _0to9 = [0,1,2,3,4,5,6,7,8,9],
    _dsds = ['大', '小', '单', '双'],
    _0to27 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27],
    _1to26 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],
    _0to18 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
    _1to17 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
    _3to19 = ['03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19'],
    _syx5 = ['01','02','03','04','05','06','07','08','09','10','11'],
    _above = createStringArray(1,40),
    _below = createStringArray(41, 80),
    _1to10String = createStringArray(1,10),
    _gyhdsds = ['和大','和小','和单','和双'],
    _dsdslh = ['大','小','单','双','龙','虎'],
    _dsdszh = ['大','小','单','双','质','合'],
    // _zhlh = ['和大','和小','和单','和双','龙','虎','和'],
    _lhh = ['龙','虎','和']

var cfg = {
  /**时时彩**/
  '10000': {tag: '万位', itemArr: _0to9},
  '1000': {tag: '千位', itemArr: _0to9},
  '100': {tag: '百位', itemArr: _0to9},
  '10': {tag: '十位', itemArr: _0to9},
  '1': {tag: '个位', itemArr: _0to9},
  'xxxx': {tag: '四重号位', itemArr: _0to9},
  'xxx': {tag: '三重号位', itemArr: _0to9},
  'xx': {tag: '二重号位', itemArr: _0to9},
  'x': {tag: '单号位', itemArr: _0to9},
  'zx120': {tag: '组选120', itemArr: _0to9},
  'zx24': {tag: '组选24', itemArr: _0to9},
  'yffs': {tag: '一帆风顺', itemArr: _0to9},
  'hscs': {tag: '好事成双', itemArr: _0to9},
  'sxbx': {tag: '三星报喜', itemArr: _0to9},
  'sjfc': {tag: '四季发财', itemArr: _0to9},

  //带i的是大小单双
  'i10000': {tag: '万位', itemArr: _dsds},
  'i1000': {tag: '千位', itemArr: _dsds},
  'i100': {tag: '百位', itemArr: _dsds},
  'i10': {tag: '十位', itemArr: _dsds},
  'i1': {tag: '个位', itemArr: _dsds},
  'whole':{itemArr: _0to9},
  //带z大小单双质合
  'z10000': {tag: '万位', itemArr: _dsdszh},
  'z1000': {tag: '千位', itemArr: _dsdszh},
  'z100': {tag: '百位', itemArr: _dsdszh},
  'z10': {tag: '十位', itemArr: _dsdszh},
  'z1': {tag: '个位', itemArr: _dsdszh},

  'psum27':{tag:'和值', itemArr: _0to27},
  'psum18':{tag:'和值', itemArr: _0to18},
  'csum26':{tag:'和值', itemArr: _1to26},
  'csum17':{tag:'和值', itemArr: _1to17},
  'baodan':{tag:'包胆', itemArr: _0to9},
  'diff':{tag:'跨度', itemArr: _0to9},
  'budingwei':{tag:'不定位', itemArr: _0to9},
  'z3':{tag:'组三',itemArr: _0to9},
  'z6':{tag:'组六',itemArr: _0to9},
  'zx':{tag:'组选',itemArr: _0to9},
  /**十一选五**/
  'd1':{tag:'第一位', itemArr: _syx5},
  'd2':{tag:'第二位', itemArr: _syx5},
  'd3':{tag:'第三位', itemArr: _syx5},
  'd':{itemArr: _syx5},
  '_budingwei':{tag:'不定位', itemArr: _syx5},
  'dm':{tag:'胆码', itemArr: _syx5},
  'tm':{tag:'拖码', itemArr: _syx5},
  'qezx':{tag:'前二组选', itemArr: _syx5},
  'qszx':{tag:'前三组选', itemArr: _syx5},
  'x1z1':{tag:'选一中一', itemArr: _syx5},
  'x2z2':{tag:'选二中二', itemArr: _syx5},
  'x3z3':{tag:'选三中三', itemArr: _syx5},
  'x4z4':{tag:'选四中四', itemArr: _syx5},
  'x5z5':{tag:'选五中五', itemArr: _syx5},
  'x6z5':{tag:'选六中五', itemArr: _syx5},
  'x7z5':{tag:'选七中五', itemArr: _syx5},
  'x8z5':{tag:'选八中五', itemArr: _syx5},
  'dds':{itemArr:['5单0双','4单1双','3单2双','2单3双','1单4双','0单5双']},
  'czw':{tag:'猜中位', itemArr: ['03','04','05','06','07','08','09']},
  /**快乐8**/
  'above':{tag:'上盘', itemArr: _above},
  'below':{tag:'下盘', itemArr: _below},
  'szx':{itemArr: ['上', '中', '下']},
  'jho':{itemArr: ['奇', '和', '偶']},
  'isum':{itemArr: ['大单','大双','小单','小双']},
  /**PK10**/
  'first':{tag:'冠军', itemArr: _1to10String},
  'second':{tag:'亚军', itemArr: _1to10String},
  'third':{tag:'季军', itemArr: _1to10String},
  'fourth':{tag:'第四', itemArr: _1to10String},
  'fifth':{tag:'第五', itemArr: _1to10String},
  'sixth':{tag:'第六', itemArr: _1to10String},
  'seventh':{tag:'第七', itemArr: _1to10String},
  'eighth':{tag:'第八', itemArr: _1to10String},
  'ninth':{tag:'第九', itemArr: _1to10String},
  'tenth':{tag:'第十', itemArr: _1to10String},
  //双面盘大小单双龙虎
  'igyh':{tag:'冠亚和', itemArr: _gyhdsds},
  'ifirst':{tag:'冠军', itemArr: _dsdslh},
  'isecond':{tag:'亚军', itemArr: _dsdslh},
  'ithird':{tag:'季军', itemArr: _dsdslh},
  'ifourth':{tag:'第四', itemArr: _dsdslh},
  'ififth':{tag:'第五', itemArr: _dsdslh},
  'isixth':{tag:'第六', itemArr: _dsds},
  'iseventh':{tag:'第七', itemArr: _dsds},
  'ieighth':{tag:'第八', itemArr: _dsds},
  'ininth':{tag:'第九', itemArr: _dsds},
  'itenth':{tag:'第十', itemArr: _dsds},
  //冠亚军
  'gyhz':{tag:'冠亚和值', itemArr: _3to19},
  //时时彩新玩法
  'cbz':{tag:'猜豹子', itemArr: _0to9},
  //总和/龙虎
  'zhlh':{tag:'总和', itemArr: _gyhdsds},
  'wQian':{tag:'万千', itemArr: _lhh},
  'wBai':{tag:'万百', itemArr: _lhh},
  'wShi':{tag:'万十', itemArr: _lhh},
  'wGe':{tag:'万个', itemArr: _lhh},
  'qBai':{tag:'千百', itemArr: _lhh},
  'qShi':{tag:'千十', itemArr: _lhh},
  'qGe':{tag:'千个', itemArr: _lhh},
  'bShi':{tag:'百十', itemArr: _lhh},
  'bGe':{tag:'百个', itemArr: _lhh},
  'sGe':{tag:'十个', itemArr: _lhh},
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
  props:['alias','awardArr'],
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
    mode(){
      return this.$parent.mode
    },
    lottery(){
      return this.$parent.lottery
    },
    gyhlh(){
      return isShowBox.indexOf(this.lottery+this.mode)>-1
    },
    itemArr(){
      return cfg[this.alias].itemArr
    },
    filters(){
      return cfg[this.alias].filters
    },
    setArr(){
      var arr=this.awardArr
      return this.gyhlh&&this.mode==='J11'?arr.map(v=>Math.floor(v)):arr
    }
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
        this.$emit('choose',this.alias,[item])
        return
      }

      //如果已经存在，就删除该项
      if(_pos > -1){
        _chosen.splice(_pos, 1)
        var tmp = _chosen
      }else{
        var isKL8 = this.$route.params.type === 'KL8'                 //是快乐8
           ,notSelectOne = this.$store.state.lt.mode.mode !== 'A10'   //不是任选一

        if(isKL8 && notSelectOne){
          var above = this.$store.state.lt.tmp['above']
          var below = this.$store.state.lt.tmp['below']
          if((above.length + below.length) >= 8){
            layer.msgWarn('对不起，当前玩法最多只能选择8个号码')
            return
          }
        }

        var isSYX5 = this.$route.params.type === 'SYX5'
        ,mode = this.$store.state.lt.mode.mode
        var dmMax = {
          B23:2,
          B33:2,
          C23:3,
          C33:3,
          D13:4,
          E13:5,
          F13:6,
          G13:7,
          H13:8
        }

        if(isSYX5){
          if(this.alias === 'dm'){
            if(_chosen.length >= dmMax[mode] - 1){
              _chosen.splice(_chosen.length -1, 1)
            }
          }
        }
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
      this.$emit('choose',this.alias,tmp)
    },
    // filter(item){
    //   this.$store.commit({
    //     type:'lt_updateTmp',
    //     alias: this.alias,
    //     arr: refer[item].slice(0)
    //   })
    //   this.$emit('choose')
    // },
    // filterLight(item){
    //   if(item === '清'){
    //     return ''
    //   }else{
    //     if(isArrayEqual(this.chosen, refer[item])){
    //       return 'curr'
    //     }else{
    //       return ''
    //     }
    //   }
    // }
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
    border: 1px solid #dfdfdf;
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
  i{
    font-size: .5em;
  }  
}
.yghContent{
  a{
    width: calc(12.4rem / 4);
    width: -webkit-calc(12.32rem / 4);
    span{
      display: block;
      margin:0 .3em .3em 0;
      padding: .2em;
      width:auto;
      height:auto;
      background: #faf9f6;
      border-radius:.15rem;
      line-height: 100%;
      em{
        line-height: 1.44;
      }
      i{
        color:#333;
        font-size: .66em;
        display: block;
      }
    }
  }
  .curr{
    i{
      color: #fff;
    }
  }
}

.gyhAllWidth{
    width: 15.4rem;
    a{
      width:-webkit-calc(15.32rem / 4);
      width: calc(15.32rem / 4);
      i{
        display: block;
      }
    }
  }
</style>
