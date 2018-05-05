<template>
  <div ref="vuetable" class="vuetable">
    <div ref="titleContainer" class="title-container">
      <ul ref="titleList" class="title-list fix" :style="{width:(maxWidth+widthArr[0])+'px'}">
        <li v-for="(d,i) in titles" :style="{width:(widthArr[i]>1)?(widthArr[i]+'px'):'auto'}"><em>{{d}}</em></li>
      </ul>
    </div>
    <div class="table-body fix" :style="{height:scrollHeight+'px'}">
      <ul ref="columns" class="columns" :style="{width:(widthArr[0]>1)?(widthArr[0]+'px'):'auto'}">
        <li v-for="d in columns"><em>{{d.IssueNo}}</em></li>
      </ul>
      <div class="table-container" @scroll="tableScroll" :style="{width:scrollContainerWidth+'px'}">
        <div ref="fakeTable" id="fakeTable" class="fake-table" :style="{width:maxWidth+'px'}">          
          <slot name="datas"></slot>
        </div>
        <div class="ChartCanvas" ref="ChartCanvas" id="ChartCanvas" v-if="Trend"></div>
      </div>
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
      for (var i = 0; i < this.widthArr.length; i++) {
        this.widthArr[i] = 0
      }
      this.maxWidth = 99999
      this.$nextTick(function () {
        this.init()
      })
    },
    tableScroll(e){
      this.$refs.titleContainer.scrollLeft = e.target.scrollLeft
    },
    getListNum(){
      var Objdiv=document.getElementById('fakeTable')
      var chart_canvas=document.getElementById('ChartCanvas')      
      this.clearChart()
      var Nums=Objdiv.querySelectorAll('ul').length
      if(!Nums)return;
      var tdleng=Objdiv.querySelectorAll('ul')[0].querySelectorAll('.OpenNo').length
      for(var i=0;i<tdleng;i++){
        for(var x=0;x<Nums-1;x++){
          var start=Objdiv.querySelectorAll('ul')[x].querySelectorAll('.OpenNo')[i]
          var end=Objdiv.querySelectorAll('ul')[x+1].querySelectorAll('.OpenNo')[i]          
          this.setChartLine(start,end,chart_canvas)
        }
      }
    },
    clearChart(){
      document.getElementById('ChartCanvas').innerHTML&&(document.getElementById('ChartCanvas').innerHTML='')
    },
    setChartLine(start_pos,end_pos,Canvas_cont){
      //获取画布的大小
      var _cavans_w = Math.abs(start_pos.offsetLeft - end_pos.offsetLeft)
      console.log(start_pos.offsetLeft,end_pos.offsetLeft,_cavans_w)
      if (_cavans_w == 0) {
        _cavans_w = 2
      }
      var _cavans_h = Math.abs(start_pos.offsetTop - end_pos.offsetTop)
      var _cavans_id = "canvas_" + parseInt(Math.random() * 1000) + "_" + parseInt(Math.random() * 1500)
      var _canvasObj = document.createElement('canvas')
      _canvasObj.id=_cavans_id
      _canvasObj.width=_cavans_w
      _canvasObj.height=_cavans_h
      console.log(_cavans_h)
      _canvasObj.style.position = "absolute"
        Canvas_cont.appendChild(_canvasObj)
      //计算位置
      var theLeft = start_pos.offsetLeft < end_pos.offsetLeft ? start_pos.offsetLeft : end_pos.offsetLeft
      var theTop = start_pos.offsetTop < end_pos.offsetTop ? start_pos.offsetTop : end_pos.offsetTop
      var _thePointW = end_pos.clientWidth / 2-2
      var drawline_canvas=document.getElementById(_cavans_id)
      drawline_canvas.style.left=(theLeft + _thePointW - 1) + "px"
      drawline_canvas.style.top=(theTop + _thePointW - 2) + "px"
      var drawline_obj = drawline_canvas.getContext("2d")
      var saveNum=''
      if (start_pos.offsetLeft > end_pos.offsetLeft) {
        saveNum = this.mathNum(_cavans_w, 0, 0, _cavans_h, 7.5)
      } else {
        saveNum = this.mathNum(0, 0, _cavans_w, _cavans_h, 7.5)
      }
      drawline_obj.beginPath()
      console.log(saveNum)
      drawline_obj.moveTo(saveNum[0], saveNum[1])
      drawline_obj.lineTo(saveNum[2], saveNum[3])
      drawline_obj.lineWidth = 1.5
      drawline_obj.strokeStyle = "#5a7d36"
      drawline_obj.fill()
      drawline_obj.stroke()
      drawline_obj.closePath()
    },
    mathNum(x1, y1, x2, y2, r) {
      var a = x1 - x2,
      b = y1 - y2,
      c = Math.round(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))),
      _a = Math.round((a * r) / c),
      _b = Math.round((b * r) / c);
      return [x2 + _a, y2 + _b, x1 - _a, y1 - _b]
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
}
.title-container{
  width: 100%;
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
    }
  }
}
.table-body{
  overflow: auto;
  .columns{
    text-align: center;
    float:left;
    em{
      font-size: .7em;
    }
  }
  .table-container{
    position: relative;
    float:left;
    overflow: auto;
    width: 100px;
  }
}
.fake-table{
  li{
    text-align: center;
    float: left;
    // position: relative;
  }
  em{
    position: relative;
    font-size: .7em;
    display: inline-block;
    width: 1.4em;
    height: 1.4em;
    transform:translateY(-.1em);
    border-radius: 50%;
  }
}
.ChartCanvas{
  position: absolute;
  display:block;
  width:auto;
  height:auto;
  z-index: 99;
  left: 0;
  top:0;
}
</style>