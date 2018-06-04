<!--
追号详情组件说明：v-show="defaultShow"
父级传入参数： :betID="defaultID" :UID="defaultUID"
-->
<template>
<div class="layShow" ref="layShow">
  <div class="topBG">
    <a class="iconfont back" @click="close"></a>
    <div><em>追号详情</em></div>    
  </div>
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
      <!-- <li v-for="item in res_data.ChaseInfoList" @click="$router.push({path:'/betDetail',query:{ID:item.ID}})"> -->
      <li v-for="item in res_data.ChaseInfoList">
        <div @click="getShow(item.ID,0)">开奖号码：{{setNum(item.OpenNum)}}</div>
        <span>{{item.IssueNo}}</span>
        <span class="fr" v-if="Number(item.Bonus)">奖金：{{item.Bonus}}</span>
        <p class="hr1px"></p></li>
        <li></li></ul>
    </section>
  </div>
  <betDetailShow v-show="defaultShow" :betID="defaultID" :UID="defaultUID"/>
</div>
</template>

<script>
import betDetailShow from '../components/betDetailShow'
export default {
  props:['betID','UID','noShow'],
  data(){
    return {
      defaultUID:0,
      defaultID:'',
      defaultShow:false,
      res_data:{},
      lottery_icon:""
    }
  },
  watch:{
    'betID':function(n,v){
      this.$refs.layShow.scrollTop=0
      !this.noShow&&this.getList(n,this.UID)
    }
  },
  components: {
    betDetailShow
  },
  methods:{
    close(){
      this.$parent.defaultShow=false
    },
    getShow(ID,UID){//注单详情
      this.defaultShow=true
      this.defaultUID=UID
      this.defaultID=ID
    },
    WinShow(str){
      var len=str.split(',').length
      if(len<9){return}
      layer.alert(str)
    },
    setNum(str){
      //flag 标志位
        var delimiter = ','
        var MaxNum = 8

      var originArr = str.split(delimiter)
      var actualArr = originArr.slice(0, MaxNum)
      var betNum = actualArr.join(delimiter)
      var result = originArr.length>MaxNum ? betNum+'...[详情]': betNum
      return result
    },
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
    },
    getList:function(id,uid){
      if(!id)return;
      _fetch({Action:"GetChaseDetail",ID:id}).then((data)=>{
          if(data.Code===1){
            this.res_data=data.BackData
            let type=data.BackData.LotteryName&&data.BackData.LotteryName.substr(data.BackData.LotteryName.length-2)
            this.transType(type)
          }else {
            layer.msgWarn(data.StrCode)
          }
      })
    }
  }
}
</script>