<template>
  <div class="sscTips">
    <p v-if = "this.type === 'noAward'">{{actualTip}}</p>
    <p v-if = "this.type === 'multiple'" @click="showBonus">{{actualTip}}<span>奖金详情</span></p>
    <p v-if = "this.type === 'single'" >{{tip}}{{this.isOdds ? '赔率' : '奖金'}}<i>{{award}}</i>{{this.isOdds ? '': '元'}}</p>
  </div>
</template>

<script>
export default {
  name: 'bet_tip',
  props: {
    tip:{
      type: String,
      required: true
    },
    //赔率或者奖金 字符串或者数组
    award:{
      required:false
    },
    // 多赔率的配置数组
    itemArr:{
      required: false
    },
    isOdds:{
      required:false,
      default:false
    }
  },
  data(){
    return {
      type: '',
    }
  },
  beforeUpdate(){
    this.checkProps()
  },
  created(){
    this.checkProps()
  },
  computed:{
    tipOverLong(){
      return this.tip.length > 50
    },
    actualTip(){
      if(!this.tipOverLong){
        return this.tip
      }else{
        return this.tip.slice(0,42) + '...'
      }
    }
  },
  methods:{
    checkProps(){
      var award = this.award
      var itemArr = this.itemArr
      if(typeof award === 'string'){
        this.type = 'single'
      }else if(Array.isArray(award)){
        if(this.itemArr !== undefined){
          this.type = 'multiple'
        }else{
          this.type = 'noAward'
        }
      }
    },
    showBonus(){
      var trArr=[]
      var Arr = this.itemArr
      var Bonus = this.award
      for(var i=0;i<Arr.length;i++){
        trArr.push('<tr><td>'+Arr[i]+'</td><td><span>'+(Bonus[i]||Bonus[i-1])+'<span>元</td></tr>')
      }
      var table=`
          <table>
            <tr>
              <th>猜中</th>
              <th>单注最高奖金</th>
            </tr>
            ${trArr.join('')}
          </table>
        `
      layer.open({
        title: false,
        content:table,
        className:'table',
        btn:['确定']
      })
    }
  }

}
</script>

<style scoped lang = "scss">
.sscTips{
  margin:0 0.6em;
  color:#333;
  p{
    font-size: 0.65em;
  }
  &+.selectNumber{
    &:before{
      display:none;
    }
  }
  i{
    color:#dc3b40;
  }
  span{
    color:#ff9831;
    display: inline-block;
  }
}
</style>