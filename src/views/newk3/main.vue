<template>
  <div>
    <bet></bet>
  </div>
</template>
<script>
  import bet from './bet'
  export default {
    components: {
      bet
    },
    data:()=>{
      return{
        BackData:null
      }
    },
    created(){
      var ws = new WebSocket('ws://47.52.109.168:8002')
      ws.onmessage =e=>{
        try{
          this.BackData = JSON.parse(e.data)
        }catch(e){
          layer.msgWarn('服务器类型错误')
        }
      }
      ws.onerror=e=>{
        layer.msgWarn('ws接口获取错误')
      }
    },
    methods:{
      setGameStatus(){
        
      },
      newest(){
        
      },
      newGame(){

      },
      gameResult(){
        
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>