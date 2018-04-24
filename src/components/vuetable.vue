<template>
  <div ref="vuetable" class="vuetable">
    <div ref="titleContainer" class="title-container">
      <ul ref="titleList" class="title-list fix" :style="{width:maxWidth+'px'}">
        <li v-for="(d,i) in titles" :style="{width:widthArr[i]+'px'}"><em>{{d}}</em></li>
      </ul>
    </div>
    <div class="table-body fix" :style="{height:scrollHeight+'px'}">
      <ul ref="columns" class="columns" v-if="widthArr" :style="{width:widthArr[0]+'px'}">
        <li v-for="d in columns"><em>{{d}}</em></li>
      </ul>
      <div class="table-container" @scroll="tableScroll" :style="{width:scrollContainerWidth+'px'}">
        <div ref="fakeTable" class="fake-table" :style="{width:maxWidth+'px'}">
          <ul v-for="d in datas" class="fix">
            <li v-for="(e,i) in d" :style="{width:widthArr[i+1]+'px'}">
              <em>{{e}}</em>
            </li>
          </ul>
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
    var titleDom = this.$refs.titleList.children
    for (var i = 0; i < titleDom.length; i++) {
      this.widthArr.push(titleDom[i].offsetWidth+1)
      this.maxWidth+=titleDom[i].offsetWidth+1
    }
    this.maxWidth = this.maxWidth - 99999
    this.scrollContainerWidth = document.body.offsetWidth - this.widthArr[0]
  },
  methods:{
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
$border-color:#3a7f62;

.vuetable{
  color:#c9ebd0;
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
  li{
    float: left;
    text-align: center;
    height: 1.4em;
    border-top:1px solid $border-color;
    border-right: 1px solid $border-color;
    padding: 0 .6em;
    display: flex;
    align-items:center;
    &:last-child{
      border-right: none;
    }
    em{
      font-size: .7em;
    }
  }
}
.table-body{
  overflow: auto;
  .columns{
    text-align: center;
    float:left;
    li{
      &:nth-child(2n+1){
        background: #1c6a4c;
      }
      border-right: 1px solid $border-color;
    }
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
  ul{
    &:nth-child(2n+1){
      background: #1c6a4c;
    }
  }
  li{
    border-right: 1px solid $border-color;
    text-align: center;
    float: left;
  }
  em{
    font-size: .7em;
  }
}
</style>