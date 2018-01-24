<!--
注单详情组件说明：v-show="defaultShow"
父级传入参数： :betID="defaultID" :UID="defaultUID"
-->
<template>
<div class="layShow">
  <div class="topBG">
    <a class="iconfont back" @click="close"></a>
    <div><em>注单详情</em></div>    
    <div style="float:right;width:20%">
      <div class="textMore dataType" v-if="(res_data.State==='等待开奖')&&(UID==0)" @click='CancelBet(betID)'><em>撤单</em></div>
    </div>
  </div>
  <div class="main">
    <div class="tzHead">
      <div class="fl iconfont" :class="lottery_icon"></div>
      <h1>{{res_data.LotteryName}}</h1><span :style="state_color[res_data.State]">{{res_data.State}}</span><p>第{{res_data.IssueNo}}期</p>
    </div>
    <table>
      <tr><td>投注时间</td><td>{{res_data.AddTime}}</td></tr>
      <tr><td>投注单号</td><td>{{res_data.SerialNum}}</td></tr><tr><td>投注金额</td><td>¥{{res_data.BetMoney}}元</td></tr>
      <tr><td>派送奖金</td><td>¥{{res_data.Bonus}}元</td></tr>
      <tr v-if="res_data.State==='已中奖'||res_data.State==='未中奖'"><td>开奖号码</td><td id="lotteryopen" @click="WinShow(res_data.OpenNum)">{{setNum(res_data.OpenNum)}}</td></tr>
      <tr></tr>
    </table>
    <section>
    <header>我的投注</header>
    <ul>
      <li></li>
      <li v-for="item in res_data.BetInfoList">
        <div @click="WinShow(item.BetNum,true)">{{setNum(item.BetNum,true)}}</div>
        <span>{{item.PlayName}}</span>
        <span class="fr" v-if="Number(item.Bonus)">奖金：{{item.Bonus}}</span>
        <p class="hr1px"></p>
      </li>
      <li></li>
    </ul>
    </section>
  </div>
</div>
</template>

<script>
import {getAnimal} from '../js/page_config/lt_6hc'
import getNatal from '../js/page_config/natal'

export default {
  props:['betID','UID'],
  data(){
    return {
      res_data:{},
      lottery_icon:"",
      state_color:{
        "等待开奖":"color:green",
        "未中奖":"color:#000",
        "已中奖":"color:red",
        "已撤单":"color:#bababa"
      }      
    }
  },
  watch:{
    'betID':function(n,v){
      this.getList(n,this.UID)
    }
  },
  methods:{
    close(){
      this.$parent.defaultShow=false
    },
    WinShow(str,e){
      var len=e&&this.res_data.LotteryName.indexOf('六合彩')==-1?str.split(' ').length:str.split(',').length
      if(len<(e?11:9)){return}
      str=e?str:str.split('+')[0].split(',').slice(0,20).join(',')
      layer.alert(str)
    },
    setNum(str,flag){
      //flag 标志位
        var delimiter = flag&&this.res_data.LotteryName.indexOf('六合彩')==-1 ? ' ' : ','
        var MaxNum = flag ? 10 : 8

      var originArr = str.split(delimiter)
      var actualArr = originArr.slice(0, MaxNum)
      var betNum = actualArr.join(delimiter)
      var result = originArr.length>MaxNum ? betNum+'[详情]': betNum
      return result
    },
    CancelBet:function(id){
      var vm=this
      layer.open({
        shadeClose: false,
        content: '撤单不可恢复，是否确认撤单？',
        title: "温馨提示",
        className: "layerConfirm",
        btn: ["确定", "取消"],
        yes: function() {
          _fetch({Action:"CancelBet",ID:id}).then((data)=>{
            if(data.Code===1){
              layer.msg(data.StrCode)
              vm.res_data.State='已撤单'
            }else {
              layer.msgWarn(data.StrCode)
            }
          })
        }
      })
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
      case '合彩':
        this.lottery_icon = 'L_6HC'
        break
      }
    },
    getList:function(id,uid){
        _fetch({Action:"GetBetDetail",UserId:uid,ID:id}).then((data)=>{
            if(data.Code===1){
            var res_data = data.BackData
            var {LotteryName} = res_data
            if(LotteryName.indexOf('六合彩')>-1){
                // 使用 AddTime来生成时间
                try{
                var AddTime = new Date(res_data.AddTime)
                }catch(error){
                var AddTime = new Date()
                }
                var natal = getNatal(AddTime);

                res_data.BetInfoList = res_data.BetInfoList.map(dataItem=>{
                var sx=dataItem.BetNum.split('@')[1]
                var str=dataItem.BetNum.split('@')[0]
                dataItem.BetNum=str//所有六合彩注单不包含@后数据
                // 把生肖复原
                if(dataItem.PlayName.indexOf('生肖') > -1){
                    dataItem.BetNum = str.split(',').map(char=>getAnimal(char, sx||natal)).join(',')
                }

                // 把两面相关的 家禽野兽复原
                if(dataItem.PlayName.indexOf('两面') > -1){
                    dataItem.BetNum = str.split(',').map(char=>{
                    if(char.indexOf('家禽') > -1){
                        return '家禽'
                    }else if(char.indexOf('野兽') > -1){
                        return '野兽'
                    }else{
                        return char
                    }
                    }).join(',')
                }
                return dataItem
                })
            }
          this.res_data=data.BackData
          let type=data.BackData.LotteryName.substr(data.BackData.LotteryName.length-2)
          this.transType(type)
          }else {
          layer.msgWarn(data.StrCode)
          }
      })
    }
  }  
}
</script>
<style lang="scss" scoped>
  @import '../scss/tzDetail.scss';
  .layShow{
    position: fixed;
    left: 0;
    top:0;
    width: 100%;
    height: 100%;
    z-index: 1222;
    background: #000;
    overflow-x: hidden;
    overflow-y: scroll;    
  }
  .topBG{
    position: fixed;
    top: 0;
    width: 100%;
    height: 2.55556em;
    line-height: 2.55556em;
    font-size: .9em;
    text-align: center;
    color: #fff;
    z-index: 999;
    background: #dc3b40;
    background: linear-gradient(to bottom, #dc3b40 2%,#dc3b40 50%, #db3b40 51%, #d7363b 100%);
    background: -webkit-linear-gradient(bottom, #dc3b40 2%,#dc3b40 50%, #db3b40 51%, #d7363b 100%);
    .iconfont{
      position: absolute;
      top: 0;
      left: 0;
      width: 2.5em;
      height: 100%;
      fill: #fff;     
    }
  }  
</style>
