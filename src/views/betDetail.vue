<template>
  <div class="main">
    <div class="tzHead">
      <div class="fl iconfont" :class="lottery_icon" style="font-size: 2.5em;margin: 0 .4em 0 1rem;width:1em"></div>
      <h1>{{res_data.LotteryName}}</h1><span style="color:#000">{{res_data.State}}</span><p>第{{res_data.IssueNo}}期</p>
    </div>
    <table>
      <tr><td>投注时间</td><td>{{res_data.AddTime}}</td></tr>
      <tr><td>投注单号</td><td>{{res_data.SerialNum}}</td></tr><tr><td>投注金额</td><td>¥{{res_data.BetMoney}}元</td></tr>
      <tr><td>派送奖金</td><td>¥{{res_data.Bonus}}元</td></tr><tr v-if="res_data.State!='等待开奖'"><td>开奖号码</td><td id="lotteryopen">{{res_data.OpenNum}}</td></tr>
      <tr></tr>
    </table>
    <section>
    <header>我的投注</header>
    <ul><li></li>
      <li v-for="item in res_data.BetInfoList">
        <div>{{item.BetNum}}</div>
        <span>{{item.PlayName}}</span>
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
            this.lottery_icon = 'L_K3';
            break;
        case '时彩':
        case '分彩':
        case '时乐':
            this.lottery_icon = 'L_SSC';
            break;
        case '选5':
            this.lottery_icon = 'L_SYX5';
            break;
        case '10':
            this.lottery_icon = 'L_PK10';
            break;
        case '农场':
            this.lottery_icon = 'L_XYNC';
            break;
        case '乐8':
            this.lottery_icon = 'L_KL8';
            break;
        case '3D':
            this.lottery_icon = 'L_FC3D';
            break;
        case '/5':
            this.lottery_icon = 'L_PL35';
            break;
        }
    }
  },
  mounted(){
    _fetch({Action:"GetBetDetail",UserId:0,ID:this.$route.query.ID}).then((res)=>{
      if(res.ok){
        res.json().then((json)=>{
          if(json.Code===1){
            this.res_data=json.BackData
            let type=json.BackData.LotteryName.substr(json.BackData.LotteryName.length-2)
            this.transType(type)
            // if (json.BackData.State==="等待开奖") {
            // }
          }else {
            layer.msgWarn(json.StrCode)
          }
        })
      }else {
        layer.msgWarn("request error")
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/tzDetail.scss';
</style>
