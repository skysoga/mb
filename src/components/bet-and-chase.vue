<template>
  <div class="b-a-c" @click.stop="">
    <div class="b-a-c-top fix">
      <a @click="toggleBetRecord" class="back"><em class="iconfont">&#xe60a;</em></a>
      <div class="mybet curr"><em>我的投注</em></div>
      <div class="mychase"><em>我的追号</em></div>
    </div>
    <div class="betboxlist">
      <betbox v-for="d in 5"></betbox>
      <div class="msg noMore">更多记录请到"<a href="/userCenter" class="" id="account">我的账户</a>"查看</div>
    </div>
  </div>
</template>
<script>
import betbox from '../components/betbox';
export default{
  components:{
    betbox
  },
  methods:{
    toggleBetRecord(){
      this.$store.state.lt.box === 'BetRecord' ?
         this.$store.commit('lt_changeBox', '') :
           this.$store.commit('lt_changeBox', 'BetRecord')
    },
  }
}
</script>
<style lang="scss" scoped>
.b-a-c{
  width: 100%;
  height: 100%;
}
.b-a-c-top{
  height: 2.3em;
  // background: rgba(250,250,250,1);
  position: relative;
  border-bottom: 1px solid #d7d6d6;
  > div{
    height: 100%;
    width: 50%;
    float: left;
    text-align: center;
    line-height: 2.3em;
    em{
      font-size: .8em;
    }
  }
  .curr{
    color: #ee3945;
    border-bottom: 2px solid;
  }
}
.back{
  position: absolute;
  display: block;
  width: 2em;
  height: 100%;
  display: flex;
  align-items:center;
  justify-content: center;
}
.betboxlist{
  padding: 10px 0;
}
.msg {
  height: 2.5em;
  text-align: center;
  font-size: .7em;
  padding: 1.9em 0;
  color: #4c4c4c;
  a{
    display: inline;
    padding: 0;
    color: #ee3945;
  }
}
</style>