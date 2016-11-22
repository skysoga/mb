<template>
  <div>
    <div class='textMore dataType' @click="BottomBoxShow=true"><em>{{BottomBoxList[this.$parent.BetweenType]}}</em>
    <i class='iconfont'>&#xe601;</i></div>
    <bottom-box v-show = "BottomBoxShow"
                 :list = "BottomBoxList"
                 ></bottom-box>
  </div>
</template>
<script>
  import BottomBox from '../components/bottom-box';
  export default {
    data:()=>{
      return{
        BottomBoxShow: false,
        BottomBoxList:['今天','昨天','本月','上月']
      }
    },
    methods:{
      bottomBox(k,v){
        this.BottomBoxShow=false
        this.$parent.BetweenType=k
        this.$parent.DateName=v
        this.$parent.DateType=k
        this.$parent.doSearch()
      }
    },
    //子组件
    components:{
      'bottom-box': BottomBox
    }
  }
</script>
