<template>
<div class = "sscFooter">
  <div class = "bet-money" v-if = "betCount">
    <em>当前选号</em>
    <span class = "text-ellipsis" @click = "showBetStr">{{betStr}}</span>
  </div>

  <div class = "bet-money" v-if = "betCount">
    每注金额<input type = "tel" maxlength="7" :value = "value" @input = "inputPerbet">
    <span>{{value.length ? '元': '请输入投注金额'}}</span>
  </div>

  <div class = "bet-info fix">
    <div class = "bet-info-left">
      <a class = "bet-info-clear" @click = "clearBet"><i class="iconfont"></i>清空</a>
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
  data(){
    return {
      lengthLimit: 30,
    }
  },
  computed:{
    displayBetStr(){
      var overlong = this.betStr.length > this.lengthLimit
      if(overlong){
        return this.betStr.slice(0, this.lengthLimit) + '...'
      }else{
        return this.betStr
      }
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
    },
    showBetStr(){
      layer.alert(this.betStr)
    }

  },
}
</script>
<style scoped lang = "scss">
@import '../../scss/scssConfig','../../scss/mixin';

$footer-left:0.5em;
.text-ellipsis{
  display: inline-block;
  width:15em;
  overflow:hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sscFooter{
  position:fixed;
  left:0;
  bottom:0;
  width:100%;
  font-size:.7em;
  z-index: 3;
}

.bet-money{
  width:100%;
  height:2.5em;
  line-height: 2.5em;
  padding-left:$footer-left;
  background: #fff;
  border-top:1px solid #dfdfdf;
  color:#666;
  input{
    display: inline-block;
    height: 1.7em;
    font-weight: 500;
    width:5em;
    line-height: 1em;
    margin-left:0.4em;
    border:1px solid #dfdfdf;
    border-radius:0.1em;
    padding:0.35em;
    -webkit-appearance:none;
  }
  span{
    margin-left:0.4em;
  }
  em{
    display: inline-block;
    overflow: hidden;
  }
  .text-ellipsis{
    font-weight: bold;
  }
}

.bet-info{
  width:100%;
  height:3.2em;
  background: #252525;
  color:#ddd;
  padding: .5em;
}
.bet-info-left{
  float: left;
  line-height: 2.2em;
}
.bet-info-right{
  float: right;
}
.bet-info-right{
  margin-right: .3em;
  text-align: right;
}

.bet-info-clear{
  padding-left:0;
  color:#717271;
  font-size:1.4em;
  /*i{
    &:before{
      content:'\e620';
      font-size: 1.6em;
      display: inline-block;
      transform: translateY(.12em);
      padding-right: .2em;
    }
  }*/
}

.bet-info-count{
  padding-left:0.5rem;
}

.bet-info-confirm{
  background: #dc3b40;
  border:none;
  display: block;
  text-align: center;
  height: 2.2em;
  line-height: 2.2em;
  width: 6em;
  border-radius: 0.26rem;
}
</style>