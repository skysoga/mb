<template>
  <div class="lottery_sscCon">
    <div  class = "lottery_ssc">
      <div class="DontSelect sscActive">
        <!-- 头部： 玩法选择， 同类彩种选择-->
        <lt-header></lt-header>

        <time-result></time-result>

        <div class = "sscMain">
          <div class="sscTips" v-if = "!tipDisplayFlag && tipOverLong">
            <p>
              {{actualTip}}
              <span @click = "toggleDetail(true)" style = "color:#218ddd;">详细</span>
            </p>
          </div>

          <bet-tip v-else :award = "renderAward" :tip = "tip" :itemArr = "bonusText[lotteryMode]" :isOdds = "true">
            <span v-if = "tipDisplayFlag" @click = "toggleDetail(false)" style = "color:#218ddd;">收起</span>
          </bet-tip>

          <!-- 三色玩法框(01-49)(无赔率) -->
          <colorbox v-if = "renderItem.box === 'colorbox'"
                    @choose = "choose"
                    :chosen = "chosen"></colorbox>

          <!-- 号码/赔率 -->
          <normal-box v-if = "renderItem.box === 'normalbox'"
                      :itemArr = "renderItem.itemArr"
                      :renderOdds = "renderOdds"
                      @choose = "choose"
                      :chosen = "chosen"></normal-box>

          <!-- 复合型(号码/赔率/示例) -->
          <combobox v-if = "renderItem.box === 'combobox'"
                    :itemArr = "renderItem.itemArr"
                    :renderOdds = "renderOdds"
                    :egArr = "renderItem.egArr"
                    :needAward = "renderItem.needAward"
                    @choose = "choose"
                    :chosen = "chosen"></combobox>
        </div>

        <lt-footer1 :betStr = "betStr"
                    :betCount = "betCount"
                    :maxAward = "maxAward"
                    v-model = "perbet"
                    @clearBet = "clearBet"
                    @confirmBet = "confirmBet"></lt-footer1>

      </div>
    </div>


  </div>
</template>

<script>
import {mapState} from 'vuex'
import lt_header from '../components/lottery/lt_header1'
import bet_tip from '../components/lottery/bet_tip'
import colorbox from '../components/lottery/colorbox'
import normal_box from '../components/lottery/normal_box'
import combobox from '../components/lottery/combobox'
import time_result from '../components/lottery/6hc_time_result'
import lt_footer1 from '../components/lottery/lt_footer1'
import {numFeature,lmItemArr,tmbbItemArr,renderConfig, animals, getAnimal,getAnimalIndex} from '../js/page_config/lt_6hc'
import {C} from '../js/kit'
export default {
  created(){
    var annimal2Index = (arr)=>arr.map(char=>getAnimalIndex(char, this.natal)).sort((a,b)=>a-b)
    this.poultry=annimal2Index(this.poultry)
    this.wild=annimal2Index(this.wild)
    this.$store.commit({
      type:'lt_updateTmp',
      alias: '6HC',
      arr: []
    })
  },
  components:{
      'lt-header': lt_header,  //头部切换玩法，和其他彩种不太一致
      'bet-tip': bet_tip,      //玩法说明
      'colorbox': colorbox,    //三色投注框
      'normal-box': normal_box,//两面投注框
      'combobox': combobox,    //复合投注框
      'lt-footer1': lt_footer1, //投注确认框
      'time-result': time_result //倒计时及开奖结果显示
  },
  data(){
    return {
      // 彩种的显示文本
      bonusText: {
        '6HCC02':['中二','中三'],
        '6HCC04':['二中','中特'],
        '6HCE03':['含本命','不含本命'],
        '6HCE04':['含本命','不含本命'],
        '6HCE05':['含本命','不含本命'],
        '6HCF02':['含0尾', '不含0尾'],
        '6HCF03':['含0尾', '不含0尾'],
        '6HCF04':['含0尾', '不含0尾'],
      },
      perbet:'',
      poultry: ['牛','马','羊','鸡','狗','猪'],//家禽
      wild: ['鼠','虎','兔','龙','蛇','猴'], //野兽
      ellipsisWidth: 46,
    }
  },
  computed:mapState({
    // 6HC的页面信息配置
    renderConfig(){
      var animalEgMode = ['E01','E02','E03','E04','E05']
      animalEgMode.forEach(mode=>{
        renderConfig[mode].egArr = animals.map(char=>this.getAnimalEg(char, this.natal))
      })
      return renderConfig
    },
    tip:()=>state.lt.mode.tip,      //提示
    award:()=>state.lt.award,        //奖金（当前玩法）
    renderAward(){
      var award = this.award
      if(Array.isArray(award)){
        return award.map(item=>(+item).toString())
      }else{
        return  (+award).toString()
      }
    },
    tipDisplayFlag:()=>state.lt.tipDisplayFlag,
    tipOverLong(){
      return this.tip.length > this.ellipsisWidth
    },
    actualTip(){
      if(!this.tipOverLong){
        return this.tip
      }else{
        return this.tip.slice(0, this.ellipsisWidth) + '...'
      }
    },
    natal(){
      return this.$store.getters.lt_natal
    },
    // 用于渲染的赔率
    renderOdds(){
      if(!Array.isArray(this.award)){
        return null
      }
      var mode = this.mode
      var award = this.award//.map(item=>item/2)
      var odds = []

      /*var arrayHandler = {
        'A02':()=>{
          var res = []
          // 野兽家禽（哪个含本命）
          // if(this.wild.indexOf(this.natal) > -1){
          if(this.poultry.indexOf(1) === -1){
            // 如果含本命的是野兽
            var tmp = award[4]
            award[4] = award[5]
            award[5] = tmp
          }

          var refer = [4,4,4,2,1,1,1,2]
          for(var i = 0;i < award.length;i++){
            for(var j = 0;j < refer[i]; j++){
              res.push(award[i])
            }
          }
          return res
        }
      }*/

      // 两面（特码和正特）
      var liangmian = ()=>{
        var res = []
        // 野兽家禽（哪个含本命）
        console.log(this.wild);
        // if(this.wild.indexOf(this.natal) > -1){
        if(this.poultry.indexOf(1) === -1){
          // 如果含本命的是野兽
          var tmp = award[4]
          award[4] = award[5]
          award[5] = tmp
        }

        var refer = [4,4,4,2,1,1,1,2]
        for(var i = 0;i < award.length;i++){
          for(var j = 0;j < refer[i]; j++){
            res.push(award[i])
          }
        }
        return res
      }

      // 特肖
      var benming = ()=>{
        var res = []
        var natalIndex = animals.indexOf(this.natal)
        for(var i = 0;i < 12;i++){
          if(i === natalIndex){
            res.push(award[0])
          }else{
            res.push(award[1])
          }
        }
        return res
      }

      //特码头尾
      var tematouwei = ()=>{
        var res = []
        var refer = [1,4,1,9]
        for(var i = 0;i < award.length;i++){
          for(var j = 0;j < refer[i]; j++){
            res.push(award[i])
          }
        }
        return res
      }


      if(Array.isArray(award)){
        switch(mode){
          case 'A02':
          case 'B09':
          case 'B10':
          case 'B11':
          case 'B12':
          case 'B13':
          case 'B14':
            odds = liangmian()
            break;
          case 'E01':
          case 'E02':
            odds = benming()
            break;
          case 'E03':
          case 'E04':
          case 'E05':
            odds = []
            break;
          case 'F01':
            odds = tematouwei()
            break;
          default:
            odds = award
        }
      }
      return odds
    },
    mode:()=>state.lt.mode.mode,
    lottery:()=>state.lt.lottery.LotteryType,
    lotteryMode(){
      return [this.lottery, this.mode].join('')
    },
    renderItem(){
      return this.renderConfig[this.mode]
    },
    chosen(){
      return this.$store.state.lt.tmp['6HC']
    },
    // 不再使用vuex去共享--看看效果，如果比较好就用这个
    betStr(){
      return this.chosen.join(',')
    },
    betCount(){
      return Math.round(C(this.chosen.length, this.renderItem.alg))
    },
    maxAward(){
      //每注金额为1时候的最高奖金
      console.log(this.mode);
      if(this.betCount===0){
        // 注数为0的时候直接返回
        return 0;
      }
      if(['A01','B01','B03','B04','B05','B06','B07','B08'].indexOf(this.mode)!==-1){
        //号码直选玩法
        console.log('号码直选玩法');
        return this.award*1
      }else if(['A02','B09','B10','B11','B12','B13','B14','D01','F01'].indexOf(this.mode)!==-1){
        //两面玩法
        console.log('两面或半波')
        var isBB = this.mode==='D01'  //是不是半波
        var isTWS = (!isBB)&&this.mode==='F01'
        var thisAward,dx,ds,h,hdx,hds,w,wdx,c,kind,iFeature,maxAward=0
        var betStr = this.betStr.split(',')
        var renderOdds=this.renderOdds
        var itemArr=(isBB?tmbbItemArr:lmItemArr)
        function getObb(s){
          if (betStr.indexOf(s)>-1) {
            if (isTWS) {
              //头尾数处理方式
              var index=0
              if(s[1]==='尾'){
                index=5
              }
              if(s[0]!=='0'){
                index++
              }
              console.log(renderOdds[index]*1);
              return renderOdds[index]*1
            }else{
              //两面或半波处理方式
              return renderOdds[itemArr.indexOf(s)]*1
            }
          }
          return 0
        }
        for (var i = 1; i <= 49; i++) {
          iFeature=numFeature[i]
          thisAward=0
          if (isBB) {
            if (i===49) {
              thisAward=0
            }else{
              thisAward += getObb(iFeature.c+iFeature.dx)
              thisAward += getObb(iFeature.c+iFeature.ds)
              thisAward += getObb(iFeature.c+iFeature.hds)
            }
          }else if(isTWS){
            thisAward += getObb(iFeature.t+'头')
            thisAward += getObb(iFeature.w+'尾')
            console.log(thisAward);
          }else{
            if (i===49) {
              thisAward=0
            }else{
              thisAward += getObb(iFeature.dx)
              thisAward += getObb(iFeature.ds)
              thisAward += getObb(iFeature.dx+iFeature.ds)
              thisAward += getObb(iFeature.hdx)
              thisAward += getObb(iFeature.hds)
              thisAward += getObb(iFeature.wdx)
            }
            thisAward += getObb(iFeature.c+'波')
            kind = this.wild.indexOf(i%12)===-1?'家禽':'野兽'
            thisAward += getObb(kind)
          }
          console.log(thisAward);
          if (thisAward>maxAward) {
            maxAward=thisAward.toFixed(2)*1
          }
        }
        console.log(maxAward);
        return maxAward
      }else if(['E01','E02'].indexOf(this.mode)!==-1){
        console.log('特肖')
        if(this.betStr.length===1&&this.betStr===this.natal){
          return this.award[0]*1
        }else{
          return this.award[1]*1
        }
      }else if(['E03','E04','E05'].indexOf(this.mode)!==-1){
        console.log('连肖');
        var n = ['E03','E04','E05'].indexOf(this.mode)+2
        if(this.betStr.length>13){
          //超过7生肖
          return C(7,n)*this.award[1]
        }else{
          //7生肖以内,分含不含本命
          var betStr=this.betStr.split(',')
          var natal = betStr.indexOf(this.natal)===-1 ? 0:1 //本命生肖数
          betStr=betStr.length-natal  //非本命生肖数
          console.log(betStr);
          return natal*betStr*this.award[0]+C(betStr,n)*this.award[1]
        }
      }else if(['C01','C02'].indexOf(this.mode)!==-1){
        console.log('三全中|三中二');
        var award= this.mode==='C01'?this.award:this.award[1]
        var l= this.betStr.split(',').length
        if(l>6){l=6}
        return award*C(l,3)
      }else if(this.mode==='C03'){
        console.log('二全中');
        var l= this.betStr.split(',').length
        if(l>6){l=6}
        return this.award*C(l,2)
      }else if(this.mode==='C05'){
        console.log('特串');
        var l= this.betStr.split(',').length
        if(l>7){l=7}
        return this.award*(l-1)
      }else if(this.mode==='C04'){
        console.log('二中特');
        var l= this.betStr.split(',').length
        if(l>7){l=7}
        var award = this.award[1]*(l-1)
        if(l>2){
          award += C(l-1,2)*this.award[0]
        }
        return award
      }else if(this.mode.charAt(0)==='G'){
        console.log('不中');
        var n = this.mode.charAt(2)*1+4
        console.log(n);
        var l= this.betStr.split(',').length
        if(l>42){l=42}
        return C(l,n)*this.award
      }else if(this.mode.charAt(0)==='F'){
        console.log('连尾');
        var n = this.mode.charAt(2)*1
        console.log(n);
        if(this.betStr.length>20){
          //超过7选号
          return C(7,n)*this.award[1]
        }else{
          //7号以内,分含不含0
          var betStr=this.betStr.split(',')
          var natal = betStr.indexOf('0尾')===-1 ? 0:1 //0尾个数
          betStr=betStr.length-natal  //非0尾数
          console.log(betStr);
          return natal*betStr*this.award[0]+C(betStr,n)*this.award[1]
        }
      }
      return -2
    }
  }),
  methods:{
    //获取各个生肖的示例文字
    getAnimalEg(char, natal){
      if(animals.indexOf(char) === -1){
        return false
      }

      var eg = []
      var tmp = getAnimalIndex(char, natal)
      if(tmp === 0){
        tmp = 12
      }
      while(tmp <= 49){
        eg.push(tmp)
        tmp = tmp + 12
      }
      return eg.join(',')
    },
    toggleDetail(bool){
      this.$store.commit('lt_showFullTip', bool)
    },
    choose(item, order){
      var chosen = this.chosen.slice()
      if(chosen.indexOf(item) === -1){
        //添加并排序
        chosen.push(item)
        chosen.sort((a,b)=>{
          var pos1 = order.indexOf(a)
          var pos2 = order.indexOf(b)
          return pos1 - pos2
        })
      }else{
        // 已经存在就删除
        var pos = chosen.indexOf(item)
        chosen.splice(pos,1)
      }

      // 全部用vuex中的tmp['6HC']作为存储
      this.$store.commit({
        type:'lt_updateTmp',
        alias: '6HC',
        arr: chosen
      })
    },
    // 清空当前选号
    clearBet(){
      this.perbet = ''
      this.$store.commit({
        type:'lt_updateTmp',
        alias: '6HC',
        arr: []
      })
    },
    // 确认投注
    confirmBet(){
      if(!this.betCount){
        layer.alert('请至少选择一注号码投注')
        return
      }else if(!(+this.perbet)){
        layer.alert('请填写您要投注的金额')
        return
      }

      var lt = this.$store.state.lt
      var lotteryCode = lt.lottery.LotteryCode
      var nowIssue = lt.NowIssue
      var lotteryName = lt.lottery.LotteryName
      var betMoney = this.betCount * this.perbet
      var rebate = lt.Rebate[this.lottery]

      var lotteryMode = lotteryCode + this.mode
      var chosen = this.chosen


      // 关于生肖的处理
      var sxLotteryMode = ['1301E01','1301E02','1301E03','1301E04','1301E05'] //和生肖相关的玩法
      var poultryWild = ['1301A02','1301B09','1301B10','1301B11','1301B12','1301B13','1301B14']  //家禽野兽相关玩法
      var lwMode = ['1301F02','1301F03','1301F04']  //尾数
      if(sxLotteryMode.indexOf(lotteryMode) > -1){
        //对生肖进行转换
        chosen = chosen.map(char=>getAnimalIndex(char, this.natal))
      }else if(poultryWild.indexOf(lotteryMode) > -1){
         //转成数字，排序，再以空格为分隔拼起
        var poultryStr = this.poultry.join(' ')
        var wildStr = this.wild.join(' ')
        chosen = chosen.map(char=>{
          var item = char;
          if(char === '家禽'){
            item = `家禽(${poultryStr})`
          }else if(char === '野兽'){
            item = `野兽(${wildStr})`
          }
          return item
        })
      }else if(lwMode.indexOf(lotteryMode) > -1){
        chosen = chosen.map(char=>char[0])
      }

      var betStr = chosen.join(',')

      var bet = {
        lottery_code: lotteryCode,
        play_detail_code: lotteryCode + this.mode,
        betting_number: betStr,
        betting_count: this.betCount,
        betting_money: betMoney,
        betting_point: '0-' + rebate,
        betting_model: 1,
        betting_issuseNo: nowIssue,
        graduation_count:1
      }
      if (this.mode.charAt(0)==='E') {
        bet.betting_number += `@${this.natal}`
      }
      var basket = [bet]

      var msg = `${lotteryName}: ${nowIssue}期<br>
                    投注金额: <span style = "color:red">${betMoney}元</span><br>
                    投注内容: <br>${this.betStr}`
      var that = this
      layer.open({
        title:"投注确认",
        style:'width:18em;font-size:.7em',
        shadeClose: false,
        content: msg,
        btn: ['确定', '取消'],
        yes: ()=>{
          this.$store.dispatch({
            type: 'lt_confirmBet1',
            basket: basket,
            success: function(){
              //清空每注单价
              that.perbet = ''
            }
          })
          // this.$store.dispatch('lt_confirmBet1', basket)
        },
        no:()=>{}
      })
    }
  }
}
</script>

<style lang = "scss" scoped>
@import '../scss/newssc.scss';
.sscMain{
  padding-top:6.5em;
  padding-bottom:6rem;
}

.sscTips{
  margin:0 0.6em;
  color:#333;
  p{
    font-size: 0.65em;
  }
  &+.selectNumber{
    &:before{
      display:none;
    }
  }
  i{
    color:#dc3b40;
  }
  span{
    color:#ff9831;
    display: inline-block;
  }
}
</style>