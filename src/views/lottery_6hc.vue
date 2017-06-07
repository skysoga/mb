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
          <template v-if = "false">

          <colorbox v-if = "renderItem.box === 'colorbox'"
                    @choose = "choose"
                    :chosen = "chosen"></colorbox>

          <normal-box v-if = "renderItem.box === 'normalbox'"
                      :itemArr = "renderItem.itemArr"
                      @choose = "choose"
                      :chosen = "chosen"></normal-box>
          </template>

          <combobox :itemArr = "renderConfig['D1'].itemArr" :egArr = "renderConfig['D1'].egArr"></combobox>
        </div>


        <div class = "sscMain" v-if = "false">
          <div class="sscTips">
            <p v-if="isBonus" @click="showBonus">{{tip}}<span>奖金详情</span></p>
            <p v-else>{{tip}}<i>{{award}}</i>元</p>
            <!-- <p>每位至少选1个号码，按位猜对号码即中196000元 </p> -->
          </div>

          <!-- 普通 -->
          <betbox v-if = "!ltCfg[mode].box"
                  v-for = "alias in ltCfg[mode].render"
                  :alias = "alias"
                  v-on:choose = "whenChoose">
                  </betbox>

        </div>


        <!-- 新彩种自己开一个playArea -->

        <!-- 投注区，各彩种不同 -->
        <!-- <playArea></playArea > -->

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
var lmItemArr = ['大','小','单','双','大单','大双','小单','小双','合大','合小','合单','合双','尾大','尾小','家禽','野兽','红波','绿波','蓝波']
var tmbbItemArr = ['红大','红小','红单','红双','红合单','红合双','绿大','绿小','绿单','绿双','绿合单','绿合双','蓝大','蓝小','蓝单','蓝双','蓝合单','蓝合双']
var tmbbEgArr = [
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
        'D1':{box:'combobox',itemArr:tmbbItemArr, egArr:tmbbEgArr},

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
    }
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