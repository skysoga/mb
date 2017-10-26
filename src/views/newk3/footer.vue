<template>
  <div class="footerContainer">
    <div v-if="betshow" class="info">
      <div class="selected"><span>当前选号</span><em v-for="d in chosen">{{d}}</em></div>
      <div class="money"><span>每注金额</span><input maxlength="7" v-model="showPrice" @input="changeShowPrice" type="tel"><p>请输入要投注的金额<em>20</em>元</p></div>
    </div>
    <div class="betnow fix">
      <div class="clear" @click="clear">清空</div>
      <div class="total">共0注</div>
      <div class="betbutton" @click="confirmBet">马上投注</div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    props:["betshow","chosen"],
    data:()=>{
      return{
        showPrice:'',                                     //每注投多少，展示
      }
    },
    created(){
    },
    computed:mapState({
      LotteryName: ()=>state.lt.lottery.LotteryName,
      bet:()=>state.lt.bet,
      nowIssue(){
        return state.lt.NowIssue
      },
    }),
    methods:{
      clear(){
        this.$parent.chosen = []
      },
      confirmBet(){
        if(!this.bet.betting_count){
          layer.alert('请至少选择一注号码投注')
        }else if(!(+this.showPrice)){
          layer.alert('请填写您要投注的金额')
        }else{

          var msg = `${this.LotteryName}: ${this.nowIssue}期<br>
                      投注金额: <span style = "color:red">${this.bet.betting_money}元</span><br>
                      投注内容:${this.chosen.join(' ')}`

          layer.open({
            title:"投注确认",
            style:'width:18em;font-size:.7em',
            shadeClose: false,
            content: msg,
            btn: ['确定', '取消'],
            yes: ()=>{
              var basebet = new BaseBet(this.$store.state)
              if(this.mode === 'A10'){
                basebet.setRebate('180', this.$store.state)
              }
              var basket = deleteCompress([basebet])
              layer.msgWait('正在投注')
              _fetch({
                'Action':'AddBetting',
                'data': {BettingData:basket}
              }).then((json)=>{
                if(json.Code === 1){
                  this.showPrice = ''
                  // layer.msg(json.StrCode)
                  this.$store.commit('lt_clearBet')
                  this.$store.commit('lt_changeBox', '')

                  //开奖后自己添记录到“我的投注里”
                  var totalMoney = basket.map(bet=>bet.betting_money).reduce((a,b)=>a+b)  //本注总金额
                  var issueNo = basket[0].betting_issuseNo                                  //期号
                  var _betRecord = this.$store.state.lt.BetRecord.slice(0)
                  var record = {issueNo: issueNo, normal_money:totalMoney.toFixed(2), openState: '等待开奖'}
                  _betRecord.unshift(record)
                  if(_betRecord.length > 5){
                    _betRecord.length = 5
                  }

                  this.$store.commit('lt_setBetRecord', _betRecord)

                  // //隔3s获取我的投注
                  // this.timer3 = setTimeout(()=>{
                  //   this.$store.dispatch('lt_updateBetRecord')
                  // }, 3000)

                  layer.confirm(`<span style = "color:red">投注成功</span>，您可以在我的账户查看注单详情`
                    ,['继续投注','查看注单']
                    ,()=>{}
                    ,()=>{this.$router.push('/userCenter')})

                }else if(json.Code === -9){
                  //清除rebate
                  layer.alert(json.StrCode)
                  this.$store.dispatch('lt_getRebate', true)
                }else{
                  layer.msgWarn(json.StrCode)
                }
              })
            },
            no:()=>{}
          })
        }
      },
      changeShowPrice(){
        if(!/^\d+$/.test(this.showPrice)|| !(+this.showPrice)){
          this.showPrice = ''
        }

        if(this.showPrice){
          this.$store.commit('lt_setPerbet', +this.showPrice)
          this.$store.commit('lt_setMoney')
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
  .footerContainer{
    position:fixed;
    height:5.7em;
    width:100%;
    bottom:0;
    left:0;
    z-index:30;
  }
  .info{
    height:3.2em;
    background:rgba(34, 86, 63, 0.5);
    bottom:4.1em;
    > div{
      height:1.6em;
      line-height:1.6em;
      color:#caebda;
      padding:0 .4em;
      white-space:nowrap;
      text-overflow:ellipsis;
      overflow:hidden;
      span{
        font-size:.8em;
        margin-right:.4em;
      }
      em{
        font-size:.8em;
        color:#f4c829;
        margin-right:.4em;
      }
      input{
        -webkit-appearance: none;
        border:none;
        width:4em;
        margin:0;
        padding:0;
        border-radius:.14em;
        font-size:.8em;
        padding:0 .2em;
        color:#333;
      }
      p{
        display: inline;
        font-size: .65em;
        margin-left: .4em;
        em{
          font-size:1em;
          margin-right:0;
        }
      }
    }
  }
  .money{
    position:relative;
    &:before{
      content:'';
      position:absolute;
      width:100%;
      height:1px;
      background-image: -webkit-linear-gradient(90deg, #164630, #164630 50%, transparent 50%);
      left:0;
      top:0;
    }
  }
  .betnow{
    height:2.5em;
    width:100%;
    background:black;
    position:absolute;
    bottom:0;
    left:0;
    padding:0 .4em;
    > div{
      float:left;
      color:white;
      line-height:2.5em;
      // font-size:
    }
    .betbutton{
      float:right;
      background: linear-gradient(to bottom, #ffdb01 0%,#e07a06 100%);
      color:#4e0904;
      padding:0 .6em;
      border-radius:.2em;
      height:1.6em;
      line-height:1.6em;
      margin-top:.45em;
      &:active{
        background:#feab03;
      }
    }
    .clear{
      color:#ffaf36;
      margin-right:.4em;
    }
    .total{
      font-size:.8em;
      line-height:3.125em;
    }
  }
</style>