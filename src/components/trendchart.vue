<template>
  <div ref="trendchart" class="trendchart K3"><!-- K3:代表K3彩种 -->
    <div>
    <div class="tc-header">
      <div class="back-btn" @click="$store.state.ShowTrendchart = 0"></div>
      <div class="title"><em>走势图</em></div>
      <div class="lottery-type"><em>大发</em></div>
    </div>
    <div class="tc-nav">
      <ul class="fix">
        <li :class="{curr:showType===1}" @click="changeShowType(1)"><em>开奖记录</em></li>
        <li :class="{curr:showType===2}" @click="changeShowType(2)"><em>号码走势</em></li>
        <li :class="{curr:showType===3}" @click="changeShowType(3)"><em>和值走势</em></li>
        <li :class="{curr:showType===4}" @click="changeShowType(4)"><em>形态走势</em></li>
      </ul>
    </div>
    <!-- type1:代表第一个查看方式（开奖记录、号码走势、和值走势、形态走势） -->
    <div class="tc-content-container" :class="'type'+showType">
      <vuetable ref="vuetable" :height="contentHeight" :datas="getData" :titles="gettitles" :columns="getcolumns"></vuetable>
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
  computed:{
    getData(){
      if (this.showType === 1) {
        return this.datas1
      }
      if (this.showType === 2) {
        return this.datas2
      }
      if (this.showType === 3) {
        return this.datas3
      }
      if (this.showType === 4) {
        return this.datas4
      }
    },
    gettitles(){
      if (this.showType === 1) {
        return this.titles1
      }
      if (this.showType === 2) {
        return this.titles2
      }
      if (this.showType === 3) {
        return this.titles3
      }
      if (this.showType === 4) {
        return this.titles4
      }
    },
    getcolumns(){
      if (this.showType === 1) {
        return this.columns1
      }
      if (this.showType === 2) {
        return this.columns2
      }
      if (this.showType === 3) {
        return this.columns3
      }
      if (this.showType === 4) {
        return this.columns4
      }
    },
  },
  data(){
    return {
      contentHeight:0,
      showType:1,
      datas1:[
        [123,12,'大','单'],
        [123,12,'大','单'],
        [123,12,'大','单'],
        [123,12,'大','单'],
        [123,12,'大','单'],
        [123,12,'大','单'],
        [123,12,'大','单'],
        [123,12,'大','单'],
        [123,12,'大','单'],
        [123,12,'大','单'],
        [123,12,'大','单'],
        [123,12,'大','单'],
        [123,12,'大','单'],
        [123,12,'大','单'],
        [123,12,'大','单'],
        [123,12,'大','单'],
        [123,12,'大','单'],
        [123,12,'大','单'],
        [123,12,'大','单'],
        [123,12,'大','单'],
        [123,12,'大','单'],
        [123,12,'大','单'],
        [123,12,'大','单'],
        [123,12,'大','单'],
        [123,12,'大','单'],
      ],
      titles1:['期号','开奖','和值','大小','单双'],
      columns1:['0676','0677','0678','0679','0680','0681','0682','0683','0684','0685','0686','0687','0688','0689','0690','0691','0692','0693','0694','0695','0696','0697','0698','0699','0700'],
      datas2:[
        [123,12,10,1,1,1,1,1,1],
        [123,12,10,1,1,1,1,1,1],
        [123,12,10,1,1,1,1,1,1],
        [123,12,10,1,1,1,1,1,1],
        [123,12,10,1,1,1,1,1,1],
        [123,12,10,1,1,1,1,1,1],
        [123,12,10,1,1,1,1,1,1],
        [123,12,10,1,1,1,1,1,1],
        [123,12,10,1,1,1,1,1,1],
        [123,12,10,1,1,1,1,1,1],
        [123,12,10,1,1,1,1,1,1],
        [123,12,10,1,1,1,1,1,1],
        [123,12,10,1,1,1,1,1,1],
        [123,12,10,1,1,1,1,1,1],
        [123,12,10,1,1,1,1,1,1],
        [123,12,10,1,1,1,1,1,1],
        [123,12,10,1,1,1,1,1,1],
        [123,12,10,1,1,1,1,1,1],
        [123,12,10,1,1,1,1,1,1],
        [123,12,10,1,1,1,1,1,1],
        [123,12,10,1,1,1,1,1,1],
        [123,12,10,1,1,1,1,1,1],
        [123,12,10,1,1,1,1,1,1],
        [123,12,10,1,1,1,1,1,1],
        [123,12,10,1,1,1,1,1,1],
      ],
      titles2:['期号','开奖','和值','跨度','1','2','3','4','5','6'],
      columns2:['0676','0677','0678','0679','0680','0681','0682','0683','0684','0685','0686','0687','0688','0689','0690','0691','0692','0693','0694','0695','0696','0697','0698','0699','0700'],
    }
  },
  mounted(){
    this.contentHeight = this.$refs.trendchart.offsetHeight - (2.3+2)*em
  },
  methods:{
    changeShowType(v){
      this.showType = v
      this.$refs.vuetable.changing()
    }
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
  color:white;
}
.tc-nav{
  height: 2em;
  line-height: 2em;
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