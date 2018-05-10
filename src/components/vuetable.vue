<template>
  <div ref="vuetable" class="vuetable">
    <div class="title-container">
      <div ref="titleContainer" class="title-container-position">
        <ul ref="titleList" class="title-list fix" :style="{width:(maxWidth+widthArr[0])+'px'}">
          <li v-for="(d,i) in titles" :style="{width:(widthArr[i]>1)?(widthArr[i]+'px'):'auto'}"><em>{{d}}</em></li>
        </ul>
      </div>
      <div v-if="widthArr.length>0" class="vuetable-corner" :style="{width:(widthArr[0]>1)?(widthArr[0]+'px'):'0',position: 'absolute',left:0, top:0}"><em>期号</em></div>
    </div>
    <div class="table-body fix" @scroll="getDataNext" >
      <ul ref="columns" class="columns" :style="{width:(widthArr[0]>1)?(widthArr[0]+'px'):'auto'}">
        <li v-for="d in columns"><em>{{d.IssueNo}}</em></li>
      </ul>
      <div class="table-container" @scroll="tableScroll" :style="{width:scrollContainerWidth+'px'}">
        <div ref="fakeTable" id="fakeTable" class="fake-table" :style="{width:maxWidth+'px'}">          
          <slot name="datas"></slot>
        </div>
        <div class="ChartCanvas" ref="ChartCanvas" id="ChartCanvas" v-if="Trend"></div>
      </div>
      <div class="table-msg" v-if="datas&&columns">已显示最近{{columns.length}}期走势</div>
    </div>
  </div>
</template>
<script>
export default{
  props:['datas','titles','columns','height','Trend'],
  data () {
    return {
      scrollHeight: 0,
      scrollContainerWidth:0,
      widthArr:[],
      maxWidth:99999,
    }
  },
  mounted(){
    this.init()
  },
  computed:{
    lCode:()=>state.lt.lottery.LotteryCode,
    lottery:()=>state.lt.lottery.LotteryType
  },
  methods:{
    init(){
      var titleDom = this.$refs.titleList.children
      var _widthArr = []
      var _maxWidth = 0
      var width = 0
      var bodyWidth = document.body.offsetWidth
      for (var i = 0; i < titleDom.length; i++) {
        _widthArr.push(titleDom[i].offsetWidth+1)
        _maxWidth+=titleDom[i].offsetWidth+1
      }
      if (_maxWidth < bodyWidth) {
        width = bodyWidth/titleDom.length
        for (var i = 0; i < _widthArr.length; i++) {
          _widthArr[i] = width
        }
        _maxWidth = bodyWidth - width
      }else{
        _maxWidth -= _widthArr[0]
      }
      this.widthArr = _widthArr
      this.maxWidth = _maxWidth
      this.scrollContainerWidth = bodyWidth - this.widthArr[0]
    },
    changing(){
      // for (var i = 0; i < this.widthArr.length; i++) {
      //   this.widthArr[i] = 0
      // }
      this.widthArr = []
      this.maxWidth = 99999
      this.$nextTick(function () {
        this.init()
      })
    },
    tableScroll(e){
      this.$refs.titleContainer.scrollLeft = e.target.scrollLeft
    },    
    getDataNext(e){
      var el=e.target
      var height=el.scrollHeight-el.scrollTop
      var sHeight=el.offsetHeight
      var OpenLength=this.$parent.OpenNum.length
      if(height===sHeight&&OpenLength<20){
        console.log('到底了')
        var OpenNum=this.$parent.OpenNum
            OpenNum=OpenNum&&OpenNum.length?OpenNum[OpenNum.length-1].IssueNo:0
        this.$parent.getBackData(this.$parent.lCode,OpenNum,20,()=>{
          this.$parent.setListAll()      
          this.changing()
          this.$parent.setChartLine()
        })
      }
    }
  },
  watch:{
    'height'(n,o){
      this.scrollHeight = n - 1.4 * em
    }
  }
}
</script>
<style lang="scss" scoped>
.vuetable{
  height: 100%;
  position: relative;
}
.title-container{
  width: 100%;
  position: fixed;
  top: 4.3em;
  z-index: 2;
}
.title-container-position{
  overflow: auto;
  pointer-events: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
.title-list{
  min-width: 100% !important;
  li{
    float: left;
    text-align: center;
    height: 1.4em;
    padding: 0 .6em;
    display: flex;
    align-items:center;
    &:last-child{
      border-right: none;
    }
    em{
      font-size: .7em;
      display: block;
      width: 100%;
      white-space: nowrap;
    }
  }
}

.vuetable-corner{
  height: 1.4em;
  padding: 0 .6em;
  display: flex;
  align-items:center;
  text-align: center;
  z-index: 2;
  em{
    font-size: .7em;
    display: block;
    width: 100%;
  }
}
.table-body{
  overflow: hidden;
  .columns{
    text-align: center;
    float:left;
    li{
      height: 1.4em;
    }
    em{
      font-size: .7em;
    }
  }
  .table-container{
    position: relative;
    float:left;
    overflow-y: hidden;
    overflow-x: auto;
    width: 100px;
    li{
      height: 1.4em;
    }
  }
}
.fake-table{
  li{
    text-align: center;
    float: left;
    overflow: hidden;
    // position: relative;
    display: flex;
    justify-content:center;
    align-items: center;
  }
  em{
    position: relative;
    font-size: .7em;
    border-radius: 50%;
    width: 100%;
  }
}
.ChartCanvas{
  position: absolute;
  display:block;
  width:auto;
  height:auto;
  z-index: 1;
  left: 0;
  top:0;
}
</style>