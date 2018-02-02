<template>
  <div class="broadCast" :class="className" v-if="$parent.available.length">
    <ul class="fix">
      <li><em></em>
        <span>
          <scrollText class="scrollText" v-if="status" :content="$parent.available[showRow].Content"></scrollText>
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
        showRow:0,
        maxRow:1,
        className:"",
        status:1,
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
              this.$parent.available.push(_datas[i])
              this.$parent.broadCastData.splice(i,1)
            }
          }
        }
      },
      checkAvailable(){
        var now = new Date().getTime()
        for (var i = this.$parent.available.length-1; i >= 0 ; i--) {
          if (now > new Date(this.$parent.available[i].EndTime).getTime()) {
            this.$parent.available.splice(i,1)
          }
        }
      },
      changeRow(){
        this.className = ''
        this.status = 0
        setTimeout(()=>{
          if (this.showRow<this.maxRow-1) {
            this.showRow++
            this.status = 1
          }else{
            this.showRow = 0
            setTimeout(()=>{
              this.status = 1
            },this.$parent.livecfg.broadCastIntervalTime*1000)
          }
        },500)
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
  position: fixed;
  top:4.06em;
  margin-left: .4em;
  z-index: 25;
  transition: 1s;
  transform: translateX(16rem);
  opacity: 0;
  li{
    border-radius: 1em;
    padding:0 .4em;
    color:white;
    font-size: .6em;
    background: #ec8f36;
    background: linear-gradient(to left, #ec8f36 2%, #fad066 100%);
    background: -webkit-linear-gradient(left, #ec8f36 2%, #fad066 100%);
    margin-bottom:.5em;
    padding:0 .6em;
    height: 1.8em;
    line-height: 1.8em;
    position: relative;
    em{
      &:before{
        position: absolute;
        left: .4em;
        content:"\e649";
        font-family: 'iconfont';
        padding-right: .3em;
        line-height: 1.8em;
      }
    }
  }
  &.mounted{
    transform: translateX(0);
    opacity: 1;
  }
  &.before-destroy{
    transform: translateX(-16rem);
    opacity: 0;
  }
}
.scrollText{
  display: inline;
  margin-left: 1.3em;
}
</style>