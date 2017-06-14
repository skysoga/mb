<template>
<div class = "sscFooter">
  <div class = "bet-money" v-if = "betCount">
    当前选号
    <span class = "text-ellipsis" >{{betStr}}</span>
  </div>

  <div class = "bet-money" v-if = "betCount">
    每注金额<input type = "text" :value = "value" @input = "inputPerbet"> <span v-show = "!value.length">请输入投注金额</span>
  </div>

  <div class = "bet-info">
    <div class = "bet-info-left">
      <a class = "bet-info-clear" @click = "clearBet">清空</a>
      <span class = "bet-info-count">共{{betCount}}注</span>
    </div>
    <div class = "bet-info-right">
      <button class = "bet-info-confirm" @click = "confirmBet">马上投注</button>
    </div>
  </div>
</div>
</template>

<script>
export default{
  props:{
    betStr:{
      type:String,
      required:true
    },
    betCount:{
      type:Number,
      required:true
    },
    value:{
      type:String,
      requied:true
    }
  },
  methods:{
    clearBet(){
      this.$emit('clearBet')
    },
    confirmBet(){
      this.$emit('confirmBet')
    },
    inputPerbet($event){
      var value = $event.target.value
      var reg = /^\d*$/  //正整数
      if(!reg.test(value)){
        value = ''
        $event.target.value = value
      }
      this.$emit('input', value)
    }
  },
}
</script>
<style scoped lang = "scss">
@import '../../scss/scssConfig','../../scss/mixin';

$footer-left:0.5rem;
.text-ellipsis{
  display: block;
  width:16em;
  overflow:hidden;
  text-overflow: ellipsis;
}

.sscFooter{
  position:fixed;
  left:0;
  bottom:0;
  width:100%;
  font-size:.7em;
}

.bet-money{
  display: flex;
  align-items: center;
  width:100%;
  height:1.8rem;
  padding-left:$footer-left;
  background: #fff;
  border-top:1px solid #dfdfdf;
  color:#666;
  font-size:.65rem;
  input{
    width:4rem;
    margin-left:0.4rem;
    border:1px solid #dfdfdf;
    border-radius:0.1rem;
    padding-left:0.2em;
  }
  span{
    margin-left:0.4rem;
  }
}

.bet-info{
  display: flex;
  align-items:center;
  width:100%;
  height:2.3rem;
  background: #000;
  color:#ddd;
  border:3px solid #000;
}

.bet-info-left{
  flex:1;
}

.bet-info-right{
  flex:1;
  padding-right:0.5rem;
  text-align: right;
}

.bet-info-clear{
  padding-left:$footer-left;
  color:#aaa;
}

.bet-info-count{
  padding-left:0.5rem;
}

.bet-info-confirm{
  background: #dc3b40;
  border:none;
  padding:0.3rem 0.55rem;
  border-radius: 0.3rem;
}
</style>