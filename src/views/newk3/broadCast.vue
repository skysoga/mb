<template>
  <div class="broadCast" v-if="available.length">
    <ul class="fix">
      <li v-for="v in available">{{v.Content}}</li>
    </ul>
  </div>
</template>
<script>
  export default {
    data:()=>{
      return{
        t:null,
        available:[],
      }
    },
    mounted(){
      this.t = setInterval(()=>{
        this.checkList()
        this.checkAvailable()
      },this.$parent.config.broadCastTime*1000)
    },
    methods:{
      checkList(){
        var now = new Date().getTime()
        var _datas = this.$parent.broadCastData
        for (var i = _datas.length-1; i >= 0; i--) {
          if (_datas[i]) {
            if (now >= new Date(_datas[i].StartTime).getTime() && now <=new Date(_datas[i].EndTime).getTime()) {
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
      }
    }
  }
</script>
<style lang="scss" scoped>
.broadCast{
  position: absolute;
  top:4em;
  margin-left: .4em;
  background: rgba(255, 255, 255, 0.39);
  border-radius: .15em;
  padding:0 .4em;
  border: 1px solid #f4c829;
  width: 8em;
  li{
    color:white;
    font-size: .7em;
  }
}
</style>