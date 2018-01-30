<template>
  <div class="broadCast" v-if="available.length">
    <ul class="fix">
      <li><em></em>
        <span>
          <scrollText class="scrollText" :content="available[showRow].Content"></scrollText>
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
  import scrollText from './scrollText'
  export default {
    components: {
      scrollText,
    },
    data:()=>{
      return{
        t:null,
        available:[],
        showRow:0,
        maxRow:1,
      }
    },
    mounted(){
      this.t = setInterval(()=>{
        this.checkList()
        this.checkAvailable()
      },this.$parent.livecfg.broadCastTime*1000)
    },
    methods:{
      checkList(){
        var now = new Date().getTime()
        var _datas = this.$parent.broadCastData
        for (var i = _datas.length-1; i >= 0; i--) {
          if (_datas[i]) {
            if (now >= new Date(_datas[i].StartTime.replace(/-/g,'/')).getTime() && now <=new Date(_datas[i].EndTime.replace(/-/g,'/')).getTime()) {
              this.available.push(_datas[i])
              this.$parent.broadCastData.splice(i,1)
            }
          }
        }
      },
      checkAvailable(){
        var now = new Date().getTime()
        for (var i = this.available.length-1; i >= 0 ; i--) {
          if (now < new Date(this.available[i].StartTime).getTime() || now > new Date(this.available[i].EndTime).getTime()) {
            this.available.splice(i,1)
          }
        }
      },
    },
    watch:{
      '$parent.broadCastData'(n,o){
        this.checkList()
      },
      'available'(n,o){
        this.maxRow = n.length
      },
    },
    beforeDestroy(){
      clearInterval(this.t)
    },
  }
</script>
<style lang="scss" scoped>
.broadCast{
  position: absolute;
  top:4.06em;
  margin-left: .4em;
  z-index: 25;
  li{
    border-radius: 1em;
    padding:0 .4em;
    color:white;
    font-size: .6em;
    background: #33a2f2;
    background: linear-gradient(to left, #33a2f2 2%, #50c6f5 100%);
    background: -webkit-linear-gradient(left, #33a2f2 2%, #50c6f5 100%);
    margin-bottom:.5em;
    padding:.2em .4em;
    position: relative;
    em{
      &:before{
        position: absolute;
        left: .4em;
        content:"\e649";
        font-family: 'iconfont';
        padding-right: .3em;
        line-height: 1.4em;
      }
    }
  }
}
.scrollText{
  display: inline;
  margin-left: 1.3em;
}
</style>