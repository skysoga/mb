<template>
  <div class="betbox">
    <template v-for="n in Arr">
      <a class="active" v-if="Type===1" @click.stop="$parent.getShow(n.ID,0)">
        <div>
          <p>{{n.lotteryName}}<span>￥{{n.normal_money}}</span></p><span>{{n.issueNo}} 期</span>
        </div>
        <strong v-if="!getBool(n.openState)" :class="[n.openState==='等待开奖'&&'OutMoney']">{{n.openState}}</strong>
        <div v-else class="fr">
          <strong :class="['InMoney','fr']">{{'+'+n.openState}}</strong>
          <span class="InMoney fr">已中奖</span>
        </div>
      </a>
      <a class="active" @click.stop="$parent.getShow(n.url.split('/')[1],0)" v-else>
        <div>
          <p>{{n.LotteryName}}<span>￥{{n.chase_money}}</span></p><span>{{n.AddTime}}</span>
        </div>
        <strong :class="[n.state==='未开始'&&'OutMoney']" v-if="n.state==='未开始'||!n.Bonus">{{n.state==='未开始'?'未开始':(!n.Bonus&&'未中奖')}}</strong>
        <div v-else class="fr">
          <strong :class="['InMoney','fr']">{{'+'+n.Bonus}}</strong>
          <span class="fr">{{n.state}}({{n.complete_count}})</span>
        </div>
      </a>
      <div class="hr1px hr1px-list"></div>
    </template>    
  </div>
</template>
<script>
export default {
  props:['Arr','Type'],
  methods:{
    getBool(key){
      return key!=='等待开奖'&&key!=='未中奖'
    }
  }
}
</script>

<style lang="scss">
.betbox{
  a{
    display: block;
    width: 100%;
    padding: 4px 5%;
    color: #000;
    >div{
      line-height: 1.25em;
      display: inline-block;
      p{
        font-size: .7em;
        span{
          font-size: .8em;
          margin-left: .4em;
        }
      }
      span{
        font-size: .7em;
        clear: both;
        color: #989898;
      }
    }
    >strong {
      line-height: 3.8em;
    }
    strong{
      font-weight: 400;
      font-size: .7em;
      float: right;
    }
  }
}
</style>