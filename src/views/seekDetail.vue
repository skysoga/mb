<template>
  <div class="main-detail main">
    <div class="tzHead">
      <div class="fl iconfont" :class="lottery_icon" style="font-size: 2.5em;margin: 0 .4em 0 1rem;width:1em"></div>
      <h1>{{res_data.LotteryName}}</h1>
      <p>第{{res_data.StartIssue}}期起</p>
    </div>
    <table class="table-detail">
      <tr><td>追号时间</td><td>{{res_data.AddTime}}</td></tr>
      <tr><td>追号单号</td><td>{{res_data.SerialNum}}</td></tr>
      <tr><td>追号进度</td><td>{{res_data.Schedule}}</td></tr>
      <tr><td>追号金额</td><td>¥{{res_data.ChaseMoney}}元</td></tr>
      <tr><td>投注金额</td><td>¥{{res_data.CompleteMoney}}元</td></tr>
      <tr><td>派送奖金</td><td>¥{{res_data.Bonus}}元</td></tr>
      <tr><td>中奖即停</td><td>{{res_data.Condition==='中奖即停'?'是':'否'}}</td></tr>
      <tr></tr>
    </table>
    <section class="section-detail">
    <header>已追记录</header>
    <ul><li></li>
      <li v-for="item in res_data.ChaseInfoList" @click="$router.push({path:'/betDetail',query:{ID:item.ID}})">
        <div>开奖号码：{{item.OpenNum}}</div>
        <span>{{item.IssueNo}}</span>
        <span class="fr" v-if="Number(item.Bonus)">奖金：{{item.Bonus}}</span>
        <p class="hr1px"></p></li>
        <li></li></ul>
    </section>
  </div>
</template>

<script>

export default {
  data(){
    return {
      res_data:{},
      lottery_icon:""
    }
  },
  methods:{
    transType:function(type){
      switch(type){
      case '快3':
        this.lottery_icon = 'L_K3'
        break
      case '时彩':
      case '分彩':
      case '时乐':
        this.lottery_icon = 'L_SSC'
        break
      case '选5':
        this.lottery_icon = 'L_SYX5'
        break
      case '10':
        this.lottery_icon = 'L_PK10'
        break
      case '农场':
        this.lottery_icon = 'L_XYNC'
        break
      case '乐8':
        this.lottery_icon = 'L_KL8'
        break
      case '3D':
        this.lottery_icon = 'L_FC3D'
        break
      case '/5':
        this.lottery_icon = 'L_PL35'
        break
      }
    }
  },
  beforeRouteEnter(to,from,next){
    // to.meta.link=from.fullPath
    _fetch({Action:"GetChaseDetail",ID:to.query.ID}).then((data)=>{
      next(vm=>{
        if(data.Code===1){
          vm.res_data=data.BackData
          let type=data.BackData.LotteryName.substr(data.BackData.LotteryName.length-2)
          vm.transType(type)
        }else {
          layer.msgWarn(data.StrCode)
        }
      })
    })
  }
}
</script>