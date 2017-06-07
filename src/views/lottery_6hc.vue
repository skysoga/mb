<template>
  <div class="lottery_sscCon">
    <div :class="{'lottery_ssc':true,'KL8':this.$parent.ltype=='KL8','PK10':this.$parent.ltype=='PK10'}">
      <div class="DontSelect sscActive">
        <!-- 头部： 玩法选择， 同类彩种选择-->
        <lt-header></lt-header>

        <!-- 开奖号码 以及 投注截止时间  -->
        <div class="isLotteryCon" >
          <!-- 开奖结果和历史开奖结果 -->
          <lt-result></lt-result>
          <!-- 倒计时和我的投注 -->
          <lt-timebar></lt-timebar>
        </div>

        <div class = "sscMain">
          <bet-tip :award = "award" :tip = "tip" :itemArr = "bonusText[lotteryMode]"></bet-tip>
          <!-- 三色玩法框(01-49) -->
          <colorbox v-if = "renderItem.box === 'colorbox'"
                    @choose = "choose"
                    :chosen = "chosen"></colorbox>

          <!-- 号码/赔率 -->
          <normal-box v-if = "renderItem.box === 'normalbox'"
                      :itemArr = "renderItem.itemArr"
                      @choose = "choose"
                      :chosen = "chosen"></normal-box>

          <!-- 复合型 -->
          <combobox v-if = "renderItem.box === 'combobox'"
                    :itemArr = "renderItem.itemArr"
                    :egArr = "renderItem.egArr"
                    :needAward = "renderItem.needAward"
                    @choose = "choose"
                    :chosen = "chosen"></combobox>
        </div>



        <!-- 倍和单位， 确认投注， 号码篮 -->
        <lt-footer v-if = "false"></lt-footer>
      </div>
    </div>


  </div>
</template>

<script>
import {mapState} from 'vuex'
import lt_header from '../components/lottery/lt_header'
import lt_result from '../components/lottery/lt_result'
import lt_timebar from '../components/lottery/lt_timebar'
import lt_footer from '../components/lottery/lt_footer'
import lt_PKKL from '../components/lottery/lt_PKKL'
import bet_tip from '../components/lottery/bet_tip'
import colorbox from '../components/lottery/colorbox'
import normal_box from '../components/lottery/normal_box'
import combobox from '../components/lottery/combobox'

// 两面的按钮组
const lmItemArr = ['大','小','单','双','大单','大双','小单','小双','合大','合小','合单','合双','尾大','尾小','家禽','野兽','红波','绿波','蓝波']
// 特码半波
const tmbbItemArr = ['红大','红小','红单','红双','红合单','红合双','绿大','绿小','绿单','绿双','绿合单','绿合双','蓝大','蓝小','蓝单','蓝双','蓝合单','蓝合双']
const tmbbEgArr = [
    //红
    '29,30,34,35,40,45,46',
    '01,02,07,08,12,13,18,19,23,24',
    '01,07,13,19,23,29,35,45',
    '02,08,12,18,24,30,34,40,46',
    '01,07,12,18,23,29,30,34,45',
    '02,08,13,19,24,35,40,46',
    // 绿
    '27,28,32,33,38,39,43,44',
    '05,06,11,16,17,21,22',
    '05,11,17,21,27,33,39,43',
    '06,16,22,28,32,38,44',
    '05,16,21,27,32,38,43',
    '06,11,17,22,28,33,39,44',
    // 蓝
    '25,26,31,36,37,41,42,47,48',
    '03,04,09,10,14,15,20',
    '03,09,15,25,31,37,41,47',
    '04,10,14,20,26,36,42,48',
    '03,09,10,14,25,36,41,47',
    '04,15,20,26,31,37,42,48'
]
//生肖
const sxItemArr = ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪']
//生肖的示例
const sxEgArr = [
  '10,22,34,46', '09,21,33,45', '08,20,32,44', '07,19,31,43','06,18,30,42', '05,17,29,41',
  '04,16,28,40', '03,15,27,39', '02,14,26,38', '01,13,25,37,49', '12,24,36,48', '11,23,35,47'
]

// 特码头尾
const tmtwItemArr = ['0头','1头','2头','3头','4头','0尾','1尾','2尾','3尾','4尾','5尾','6尾','7尾','8尾','9尾']
// 尾数
const wsItemArr = ['0尾','1尾','2尾','3尾','4尾','5尾','6尾','7尾','8尾','9尾']

export default {
  components:{
      'lt-header': lt_header,
      'lt-result': lt_result,
      'lt-timebar': lt_timebar,
      'lt-footer': lt_footer,
      'bet-tip': bet_tip,
      'colorbox': colorbox,
      'normal-box': normal_box,
      'combobox': combobox,
      // 'playArea': playArea,
  },
  data(){
    return {
      bonusText: {},
      // renderConfig搞好了，也放到配置文件lt_6HC里去
      renderConfig:{
        'A1':{box:'colorbox'},
        'A2':{box:'normalbox', itemArr:lmItemArr},
        'B1':{box:'colorbox'},
        'B2':{box:'normalbox', itemArr:['总和单','总和双','总和大','总和小','总尾大','总尾小']},
        'B3':{box:'colorbox'},
        'B4':{box:'colorbox'},
        'B5':{box:'colorbox'},
        'B6':{box:'colorbox'},
        'B7':{box:'colorbox'},
        'B8':{box:'colorbox'},
        'B9':{box:'normalbox', itemArr:lmItemArr},
        'B10':{box:'normalbox', itemArr:lmItemArr},
        'B11':{box:'normalbox', itemArr:lmItemArr},
        'B12':{box:'normalbox', itemArr:lmItemArr},
        'B13':{box:'normalbox', itemArr:lmItemArr},
        'B14':{box:'normalbox', itemArr:lmItemArr},
        'C1':{box:'colorbox'},
        'C2':{box:'colorbox'},
        'C3':{box:'colorbox'},
        'C4':{box:'colorbox'},
        'C5':{box:'colorbox'},
        'D1':{box:'combobox',itemArr:tmbbItemArr, egArr:tmbbEgArr, needAward:true},
        'E1':{box:'combobox',itemArr:sxItemArr, egArr:sxEgArr, needAward:true},
        'E2':{box:'combobox',itemArr:sxItemArr, egArr:sxEgArr, needAward:true},
        'E3':{box:'combobox',itemArr:sxItemArr, egArr: [], needAward:false},
        'E4':{box:'combobox',itemArr:sxItemArr, egArr: [], needAward:false},
        'E5':{box:'combobox',itemArr:sxItemArr, egArr: [], needAward:false},
        'F1':{box:'combobox',itemArr:tmtwItemArr, egArr: [], needAward:true},
        'F2':{box:'combobox',itemArr:wsItemArr, egArr: [], needAward:false},
        'F3':{box:'combobox',itemArr:wsItemArr, egArr: [], needAward:false},
        'F4':{box:'combobox',itemArr:wsItemArr, egArr: [], needAward:false},
        'G1':{box:'colorbox'},
        'G2':{box:'colorbox'},
        'G3':{box:'colorbox'},
        'G4':{box:'colorbox'},
        'G5':{box:'colorbox'},
        'G6':{box:'colorbox'}
      },
      chosen:[]
    }
  },
  computed:mapState({
    tip:()=>state.lt.mode.tip,      //提示
    award:()=>state.lt.award,        //奖金
    mode:()=>state.lt.mode.mode,
    lottery:()=>state.lt.lottery.LotteryType,
    lotteryMode(){
      return [this.lottery, this.mode].join('')
    },
    renderItem(){
      return this.renderConfig[this.mode]
    },
    // chosen(){
    //   return this.$store.state.lt.tmp['6HC']
    // }
  }),
  methods:{
    choose(item, order){
      if(this.chosen.indexOf(item) === -1){
        //添加并排序
        this.chosen.push(item)
        this.chosen.sort((a,b)=>{
          var pos1 = order.indexOf(a)
          var pos2 = order.indexOf(b)
          return pos1 - pos2
        })
      }else{
        // 已经存在就删除
        var pos = this.chosen.indexOf(item)
        this.chosen.splice(pos,1)
      }
    }
  }
}
</script>

<style lang = "scss" scoped>
@import '../scss/newssc.scss';
</style>