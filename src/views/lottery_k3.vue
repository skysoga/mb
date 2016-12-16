<template>
 <div class="k3">
<header class="top">
    <div>
      <p>玩法</p>
      <span id="MethodStr" @click.stop = "toggleModeSelect">
        和值<i class="iconfont xiala"></i>
      </span>
    </div>

    <div class="fr" id="lotteryChoice">
      <label @click.stop= "toggleTypeSelect">{{LotteryName}}</label>
      <i @click.stop= "toggleTypeSelect" class="iconfont xiala"></i>
      <!-- 快三彩种切换 -->
      <div class="fix" style ="display:block" v-show = "ifShowTypeSelect">
        <a v-for = "lottery in LotteryList"
           @click = "changeLottery(lottery.LotteryCode)">
          {{lottery.LotteryName}}
        </a>

      </div>
    </div>
    <a class="iconfont" @click = "back2index"></a>

  <ul class="betTopDetail" v-show = "ifShowModeSelect">
    <li v-for = "mode in config">
      <p class="p0">{{mode.name}}</p>
      <p class="p1">{{renderRebate(mode.mode)}}</p>
      <p class="p2">
        <span class="Dice" :class = "`Dice${mode.eg[0]}`"></span>
        <span class="Dice" :class = "`Dice${mode.eg[1]}`"></span>
        <span class="Dice" :class = "`Dice${mode.eg[2]}`"></span>
      </p>
    </li>
    <li></li>

<!--       <li class="checked">
        <p class="p0">和值</p>
        <p class="p1">1.946-188.56倍</p>
        <p class="p2">
          <span class="Dice Dice1"></span>
          <span class="Dice Dice2"></span>
          <span class="Dice Dice3"></span>
        </p>
      </li><li>
        <p class="p0">三同号通选</p>
        <p class="p1">赔率31.42倍</p>
        <p class="p2">
          <span class="Dice Dice1"></span>
          <span class="Dice Dice1"></span>
          <span class="Dice Dice1"></span>
        </p>
      </li><li>
        <p class="p0">三同号单选</p>
        <p class="p1">赔率188.56倍</p>
        <p class="p2">
          <span class="Dice Dice1"></span>
          <span class="Dice Dice1"></span>
          <span class="Dice Dice1"></span>
        </p>
      </li><li>
        <p class="p0">三不同号</p>
        <p class="p1">赔率31.42倍</p>
        <p class="p2">
          <span class="Dice Dice2"></span>
          <span class="Dice Dice3"></span>
          <span class="Dice Dice5"></span>
        </p>
      </li><li>
        <p class="p0">三连号通选</p>
        <p class="p1">赔率7.85倍</p>
        <p class="p2">
          <span class="Dice Dice1"></span>
          <span class="Dice Dice2"></span>
          <span class="Dice Dice3"></span>
        </p>
      </li><li>
        <p class="p0">二同号复选</p>
        <p class="p1">赔率12.57倍</p>
        <p class="p2">
          <span class="Dice Dice1"></span>
          <span class="Dice Dice1"></span>
          <span class="Dice Dice3"></span>
        </p>
      </li><li>
        <p class="p0">二同号单选</p>
        <p class="p1">赔率62.85倍</p>
        <p class="p2">
          <span class="Dice Dice1"></span>
          <span class="Dice Dice1"></span>
          <span class="Dice Dice3"></span>
        </p>
      </li><li>
        <p class="p0">二不同号</p>
        <p class="p1">赔率6.28倍</p>
        <p class="p2">
          <span class="Dice Dice1"></span>
          <span class="Dice Dice4"></span>
          <span class="Dice Dice4"></span>
        </p>
      </li>
      <li></li> -->
    </ul>
  </header>

<section class="State">
    <div>
      <p id="openIssuse">1216036期开奖号码</p>
      <div id="openResult" style="display: block;">
        <div class="Dice Dice1"></div>
        <div class="Dice Dice3"></div>
        <div class="Dice Dice4"></div>
        <i class="iconfont xiala"></i>
      </div>
    </div>
    <div>
      <p id="thisIssuse">1216037期投注截止</p>
      <div id="time">05:42</div>
    </div>
    <table style="display: none;"><tr> <td>期号</td> <td>开奖号码</td> <td>和值</td> <td>大小</td> <td>单双</td> </tr><tr>
          <td>&nbsp;&nbsp;&nbsp;1216036<i>—</i></td>
          <td>
            <div class="Dice Dice1"></div>
            <div class="Dice Dice3"></div>
            <div class="Dice Dice4"></div>
          </td>
          <td>8</td>
          <td><span class="light small">小</span></td>
          <td><span class="light double">双</span></td>
        </tr><tr>
          <td>&nbsp;&nbsp;&nbsp;1216035<i>—</i></td>
          <td>
            <div class="Dice Dice2"></div>
            <div class="Dice Dice5"></div>
            <div class="Dice Dice6"></div>
          </td>
          <td>13</td>
          <td><span class="light big">大</span></td>
          <td><span class="light single">单</span></td>
        </tr><tr>
          <td>&nbsp;&nbsp;&nbsp;1216034<i>—</i></td>
          <td>
            <div class="Dice Dice2"></div>
            <div class="Dice Dice3"></div>
            <div class="Dice Dice6"></div>
          </td>
          <td>11</td>
          <td><span class="light big">大</span></td>
          <td><span class="light single">单</span></td>
        </tr><tr>
          <td>&nbsp;&nbsp;&nbsp;1216033<i>—</i></td>
          <td>
            <div class="Dice Dice1"></div>
            <div class="Dice Dice2"></div>
            <div class="Dice Dice3"></div>
          </td>
          <td>6</td>
          <td><span class="light small">小</span></td>
          <td><span class="light double">双</span></td>
        </tr><tr>
          <td>&nbsp;&nbsp;&nbsp;1216032<i>—</i></td>
          <td>
            <div class="Dice Dice3"></div>
            <div class="Dice Dice5"></div>
            <div class="Dice Dice6"></div>
          </td>
          <td>14</td>
          <td><span class="light big">大</span></td>
          <td><span class="light double">双</span></td>
        </tr><tr>
          <td>&nbsp;&nbsp;&nbsp;1216031<i>—</i></td>
          <td>
            <div class="Dice Dice4"></div>
            <div class="Dice Dice4"></div>
            <div class="Dice Dice5"></div>
          </td>
          <td>13</td>
          <td><span class="light big">大</span></td>
          <td><span class="light single">单</span></td>
        </tr><tr>
          <td>&nbsp;&nbsp;&nbsp;1216030<i>—</i></td>
          <td>
            <div class="Dice Dice3"></div>
            <div class="Dice Dice4"></div>
            <div class="Dice Dice4"></div>
          </td>
          <td>11</td>
          <td><span class="light big">大</span></td>
          <td><span class="light single">单</span></td>
        </tr><tr>
          <td>&nbsp;&nbsp;&nbsp;1216029<i>—</i></td>
          <td>
            <div class="Dice Dice1"></div>
            <div class="Dice Dice4"></div>
            <div class="Dice Dice6"></div>
          </td>
          <td>11</td>
          <td><span class="light big">大</span></td>
          <td><span class="light single">单</span></td>
        </tr><tr>
          <td>&nbsp;&nbsp;&nbsp;1216028<i>—</i></td>
          <td>
            <div class="Dice Dice2"></div>
            <div class="Dice Dice3"></div>
            <div class="Dice Dice3"></div>
          </td>
          <td>8</td>
          <td><span class="light small">小</span></td>
          <td><span class="light double">双</span></td>
        </tr><tr>
          <td>&nbsp;&nbsp;&nbsp;1216027<i>—</i></td>
          <td>
            <div class="Dice Dice1"></div>
            <div class="Dice Dice5"></div>
            <div class="Dice Dice6"></div>
          </td>
          <td>12</td>
          <td><span class="light big">大</span></td>
          <td><span class="light double">双</span></td>
        </tr></table>
  </section>
<div class="main">
    <div class="MethodWrap">
      <div class="Method Method0"><p class="MethodMsg">猜3个开奖号相加的和，3-10为小，11-18为大。</p><ul><li>大<p>赔率1.946</p></li><li>小<p>赔率1.946</p></li><li>单<p>赔率1.946</p></li><li>双<p>赔率1.946</p></li><li>3<p>赔188.56</p></li><li>4<p>赔62.85</p></li><li>5<p>赔31.42</p></li><li>6<p>赔18.85</p></li><li>7<p>赔12.57</p></li><li>8<p>赔8.97</p></li><li>9<p>赔7.54</p></li><li>10<p>赔6.98</p></li><li>11<p>赔6.98</p></li><li>12<p>赔7.54</p></li><li>13<p>赔8.97</p></li><li>14<p>赔12.57</p></li><li>15<p>赔18.85</p></li><li>16<p>赔31.42</p></li><li>17<p>赔62.85</p></li><li>18<p>赔188.56</p></li></ul></div>
    </div>
  </div>

  <footer class="bottom">
    <table>
      <tbody>
        <tr>
          <td>当前选号</td>
          <td><span id="choice"></span></td>
        </tr>
        <tr>
          <td>每注金额</td>
          <td>
            <input type="tel" name="unit" maxlength="7" />
            <div id="maxReturn"></div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="ft0">
      <div class="fl" id="clear">清空</div>
      <p class="fl" id="total"></p>
      <div class="fr" id="bet">马上投注</div>
    </div>
  </footer>
 </div>
</template>

<script>
export default {
  created (){
    [,this.ltype, this.lcode] = this.$route.fullPath.slice(1).split('/')

    //处理得各彩种的List
    var LotteryConfig = this.$store.state.LotteryConfig
    LotteryConfig.forEach(item=>{
      if(item.LotteryClassID.indexOf(this.lcode.slice(0,2)) > -1){
        this.LotteryList = item.LotteryList.map(code=>{
          var el = state.LotteryList[code]
          return el
        })
      }
    })
  },
  data(){
    return {
      LotteryList: [],//彩种list
      ltype: '',      //彩种类型
      lcode: ''       //彩种code
    }
  },
  computed:{
    ifShowTypeSelect (){
      return state.lt.box === 'typeSelect'
    },
    ifShowModeSelect (){
      return this.$store.state.lt.box === 'modeSelect'
    },
    LotteryName: ()=>state.lt.lottery.LotteryName,
    config:()=>state.lt.config,
    award:()=>state.lt.award,
    odds:()=>state.lt.Odds['K3']
  },
  methods:{
    back2index(){
      store.commit('lt_leaveLottery')
      this.$router.push('/index')
    },
    //彩种选择框，切换
    toggleTypeSelect(){
      this.$store.state.lt.box === 'typeSelect' ?
         this.$store.commit('lt_changeBox', '') :
           this.$store.commit('lt_changeBox', 'typeSelect')
    },
    //玩法选择框，切换
    toggleModeSelect(){
      this.$store.state.lt.box === 'modeSelect' ?
         this.$store.commit('lt_changeBox', '') :
           this.$store.commit('lt_changeBox', 'modeSelect')
    },
    //更改彩种
    changeLottery(code){
      this.$store.dispatch('lt_updateLottery', code)
    },
    renderRebate(mode){
      var rebate
      this.odds.forEach(item=>{
        if(mode === item.PlayCode){
          rebate = item.Bonus
        }
      })

      if(rebate.indexOf(',') > -1){
        var rebateArr = rebate.split(',')
        return `${rebateArr[rebateArr.length -1]}-${rebateArr[0]}倍`
      }else{
        return `赔率${rebate}倍`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/k3.scss';
</style>