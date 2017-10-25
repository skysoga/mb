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
      // var ws = new WebSocket('ws://47.52.109.168:8002')
      // ws.onmessage =e=>{
      //   try{
      //     this.BackData = JSON.parse(e.data)
      //     console.log(this.BackData)
      //   }catch(e){
      //     layer.msgWarn('服务器类型错误')
      //   }
      // }
      // ws.onerror=e=>{
      //   layer.msgWarn('ws接口获取错误')
      // }
      // fetch('http://api.caishen08.com/game/timestamp_now?token=35bd9f2ba71f4da6',{
      //   credentials:'same-origin',
      //   method: 'get',
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // })
      // .then(function (d){
      //   if(d.status === 200){
      //     d.json().then(d=>{
      //       if(d.ResultCode == 1){
      //         alert('充值成功！')
      //       }else{
      //         alert(d.ResultDesc)
      //       }
      //     })
      //     .catch(err=>{
      //       alert("数据解析失败！"+err)
      //     })
      //   }else{
      //     alert('请求异常!'+err)
      //   }
      // })
      // .catch(err=>{
      //   alert('请求失败!'+err)
      // })
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