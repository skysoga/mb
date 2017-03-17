<template>
  <div class="textareaNumber">
    <textarea placeholder=" 每1个号码之间请用空格( )、逗号(,)、分号(;)隔开" v-model = "betStr" @input = "whenInput"></textarea>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {bus, compress, throttle, createStringArray} from '../../js/kit'
function getLegalStr(str){
  str = str.replace(/^\s+/g, '');
  str = str.replace(/[^\d,，;；\s]/g, '');
  str = str.replace(/，/g, ',');
  str = str.replace(/；/g, ';');
  return str;
}

function unique(origin){
  return origin.filter((item, index, arr)=>arr.indexOf(item)===index)
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
        /** 一、滤除杂字符串 **/
        this.betStr = getLegalStr(this.betStr)

        /** 二、格式化字符串 **/
        var realtext = this.betStr.replace(/[;\n]/g, ',')

        /** 三、字符串变成数组 **/
        var originArr = realtext.split(',')

        /** 四、对每注进行预处理 **/
        //去掉空格、允许多个空格作为行间分隔符、将字符串转成索引
        var formatArr = originArr.map(bet=>{
          return bet.trim().split(' ').filter(item=>item.length !== 0).map(num=>+num)
        })

        /** 五、对每注进行合理性判断  **/
        var betArr = []
        var ltype = this.$route.params.type
        var baseNum =  {
          'SYX5': 11,
          'PK10': 10
        }
        var numberStore = createStringArray(0, baseNum[ltype]) //留下个0，因为后续是通过索引获取的，从1开始
        for(var i = 0;i < formatArr.length;i++){
          var formatBet = formatArr[i]
          var isIllegal = formatBet.some(num=>!numberStore[num] || !num)     //不合法的
          var isRepeat = formatBet.length !== len

          if(this.special === 'needOrder'){
            formatBet = formatBet.sort((a,b)=>a-b)
          }
          formatBet = formatBet.map(num=>numberStore[num]).join(' ')
          if(!isIllegal && !isRepeat){
            betArr.push(formatBet)
          }
        }

        /** 六、去掉重复的注 **/
        betArr = unique(betArr)

        this.$store.commit('lt_setBetCount', betArr.length)
        this.$store.commit('lt_setBetStr', betArr.join(','))
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