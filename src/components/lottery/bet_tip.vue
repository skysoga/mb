<template>
  <div class="sscTips">
    <p v-if="isMultiple" @click="showBonus">{{tip}}<span>奖金详情</span></p>
    <p v-else>{{tip}}<i>{{award}}</i>元</p>
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
    award:{
      type: String,
      required: true
    },
    itemArr:{
      required: false
    },
  },
  computed:{
    isMultiple(){
      return Array.isArray(this.itemArr)
    }
  },
  methods:{
    showBonus(){
      var trArr=[]
      var Arr = this.itemArr
      var Bonus = this.award.split(',')
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
  padding-top:5.7em;
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