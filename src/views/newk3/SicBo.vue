<template>
  <div class="sicbo">
    <div class="bg" style="background: url('/static/img/SicBo.png') no-repeat;"></div>
    <div class="dice">
      <div id="dice" v-show="showDice"></div>
      <div class="result" v-show="showResult">{{results}}</div>
    </div>
    <div class="transparent" style="background: url('/static/img/SicBo.png') no-repeat;"></div>
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
      parser.load('/static/img/4g-dice.c', videoItem=> {
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
.dice{
  position: absolute;
  width: 6em;
  height: 6em;
  bottom:2em;
  right:.5em;
  >div{
    width: 100%;
    height:100%;
  }
}
.sicbo{
  position: fixed;
  bottom:2em;
  right:2em;
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
</style>