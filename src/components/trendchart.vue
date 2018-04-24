<template>
  <div ref="trendchart" class="trendchart K3"><!-- K3:代表K3彩种 -->
    <div>
    <div class="tc-header">
      <div class="back-btn" @click="$parent.ShowTrendchart = 0"></div>
      <div class="title"><em>走势图</em></div>
      <div class="lottery-type"><em>大发</em></div>
    </div>
    <div class="tc-nav">
      <ul class="fix">
        <li class="curr"><em>开奖记录</em></li>
        <li><em>号码走势</em></li>
        <li><em>和值走势</em></li>
        <li><em>形态走势</em></li>
      </ul>
    </div>
    <!-- type1:代表第一个查看方式（开奖记录、号码走势、和值走势、形态走势） -->
    <div class="tc-content-container type1">
      <vuetable :height="contentHeight" :datas="datas" :titles="titles" :columns="columns"></vuetable>
    </div>
    </div>
  </div>
</template>
<script>
import vuetable from './vuetable';
export default{
  components:{
    vuetable,
  },
  data(){
    return {
      contentHeight:0,
      datas:[
        [123,12,'大','单',47,47,47,47,47,47],
        [123,12,'大','单',47,47,47,47,47,47],
        [123,12,'大','单',47,47,47,47,47,47],
        [123,12,'大','单',47,47,47,47,47,47],
        [123,12,'大','单',47,47,47,47,47,47],
        [123,12,'大','单',47,47,47,47,47,47],
        [123,12,'大','单',47,47,47,47,47,47],
        [123,12,'大','单',47,47,47,47,47,47],
        [123,12,'大','单',47,47,47,47,47,47],
        [123,12,'大','单',47,47,47,47,47,47],
        [123,12,'大','单',47,47,47,47,47,47],
        [123,12,'大','单',47,47,47,47,47,47],
        [123,12,'大','单',47,47,47,47,47,47],
        [123,12,'大','单',47,47,47,47,47,47],
        [123,12,'大','单',47,47,47,47,47,47],
        [123,12,'大','单',47,47,47,47,47,47],
        [123,12,'大','单',47,47,47,47,47,47],
        [123,12,'大','单',47,47,47,47,47,47],
        [123,12,'大','单',47,47,47,47,47,47],
        [123,12,'大','单',47,47,47,47,47,47],
      ],
      titles:['期号','开奖','和值','大小','单双','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18'],
      columns:['0676','0677','0678','0679','0680','0681','0682','0683','0684','0685','0686','0687','0688','0689','0690','0691','0692','0693','0694','0695','0696','0697','0698','0699','0700'],
    }
  },
  mounted(){
    this.contentHeight = this.$refs.trendchart.offsetHeight - (2.3+2)*em
  }
}
</script>
<style lang="scss" scoped>
.trendchart{
  height: 100%;
}
.tc-header{
  height: 2.3em;
  background: black;
  color:white;
  display: flex;
  flex-flow:row;
  padding:0 .4em;
  >div{
    height: 100%;
    line-height: 2.3em;
  }
  em{
    font-size: .8em;
  }
  .back-btn,.lottery-type{

  }
  .back-btn{
    width: 4em;
    &:before{
      content:'\e60a';
      font-family: 'iconfont';
    }
  }
  .title{
    flex:1;
    width: 0;
    text-align: center;
  }
  .lottery-type{
    width: 4em;
    text-align: right;
    em{
      &:after{
        content: '\e61e';
        font-family: 'iconfont';
        font-size: .8em;
        margin-left: .4em;
      }
    }
  }
}
.tc-content-container{
  background: #2f5542;
  color:white;
}
.tc-nav{
  height: 2em;
  line-height: 2em;
  background: #2f5542;
  color:white;
  ul{
    li{
      width: 25%;
      float: left;
      text-align: center;
      em{
        font-size: .7em;
        display: block;
      }
    }
  }
  .curr{
    color:#f2c742;
    box-shadow: 0 2px 0;
  }
}
</style>