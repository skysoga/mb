<template>
  <div class="sicbo">
    <div class="bg" :style="'background: url('+$store.state.constant.ImgHost+'/live/SicBo.png) no-repeat;'"></div>
    <div class="dice-con">
      <div id="dice" v-show="showDice"></div>
      <div class="result" v-if="results instanceof Array" v-show="showResult">
        <em :class="'d d1 dice'+results[0]" :style="'background: url('+$store.state.constant.ImgHost+'/live/history-dice.png)'"></em>
        <em :class="'d d2 dice'+results[1]" :style="'background: url('+$store.state.constant.ImgHost+'/live/history-dice.png)'"></em>
        <em :class="'d d3 dice'+results[2]" :style="'background: url('+$store.state.constant.ImgHost+'/live/history-dice.png)'"></em>
      </div>
    </div>
    <div class="transparent" :style="'background: url('+$store.state.constant.ImgHost+'/live/SicBo.png) no-repeat;'"></div>
  </div>
</template>
<script>
  import {mapState}    from 'vuex'
  export default {
    props:['lcode'],
    computed:mapState({
      TimeBar:()=>{
        let time = state.lt.TimeBar
        time = time.substring(time.length-2,time.length)
        if (isNaN(time)) {
          return state.lt.TimeBar
        }
        if (time === '') {
          return ''
        }
        return time+'S'
      },
      results(){
        if(state.lt.LotteryResults[this.lcode].length<1){
          return ''
        }
        if (state.lt.TimeBar === '等待开奖') {
          this.$store.commit('lt_displayResults', false)
          return this.wait4Results
        }
        this.$store.commit('lt_displayResults', true)
        return state.lt.LotteryResults[this.lcode][0].LotteryOpen.split(',')
      },
    }),
    data:()=>{
      return{
        showDice:0,
        player:null,
        showResult:1,
      }
    },
    mounted(){
      this.player = new SVGA.Player('#dice');
      var parser = new SVGA.Parser('#dice'); // 如果你需要支持 IE6+，那么必须把同样的选择器传给 Parser。
      parser.load(state.constant.ImgHost+'/live/4g-dice.gif', videoItem=> {
        this.player.loops = 0
        this.player.setVideoItem(videoItem);
        this.player.startAnimation();
        this.player.onFinished(()=>{
          this.showResult = 1
        })
      })
    },
    watch:{
      'TimeBar'(n,o){
        if (n==='等待开奖') {
          this.showDice = 1
          this.showResult = 0
          this.player.loops = 0
          this.player.startAnimation();
        }
        if (n==='等待开局') {
          this.player.loops = 1
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
.dice-con{
  position: absolute;
  width: 6em;
  height: 6em;
  bottom:1em;
  right:.4em;
  >div{
    width: 100%;
    height:100%;
  }
}
.sicbo{
  position: fixed;
  bottom:2em;
  right:1em;
  z-index: 3;
}
.bg{
  width: 6.6em;
  height: 6.7em;
  background-size: 12em !important;
  background-position: 0 -1em !important;
}
.transparent{
  position: absolute;
  bottom:1em;
  right:-.58em;
  width: 6.6em;
  height: 7.2em;
  background-size: 12em !important;
  background-position: -6.6em 0 !important;
}
.result{
  position: absolute;
  font-size:.8em;
  top:0;
  left:0;
  .d1{
    right:4.1em;
    bottom:1.2em;
  }
  .d2{
    right:2.9em;
    bottom:2.4em;
  }
  .d3{
    right:1.7em;
    bottom:1.2em;
  }
}
.d{
  display: block;
  width: 1.58em;
  height:1.58em;
  background-size: 9.6em !important;
  position: absolute;
}
.dice2{
  background-position: -1.6em 0 !important;
}
.dice3{
  background-position: -3.2em 0 !important;
}
.dice4{
  background-position: -4.8em 0 !important;
}
.dice5{
  background-position: -6.4em 0 !important;
}
.dice6{
  background-position: -8em 0 !important;
}
</style>