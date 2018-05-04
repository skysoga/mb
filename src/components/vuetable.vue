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
        <div ref="fakeTable" class="fake-table" :style="{width:maxWidth+'px'}">
          <slot name="datas"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  props:['datas','titles','columns','height'],
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
    float:left;
    overflow: auto;
    width: 100px;
  }
}
.fake-table{
  li{
    text-align: center;
    float: left;
    position: relative;
  }
  em{
    font-size: .7em;
    display: inline-block;
    width: 1.4em;
    height: 1.4em;
    transform:translateY(-.1em);
    border-radius: 50%;
  }
}
</style>