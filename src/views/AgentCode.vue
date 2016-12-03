<template>
  <div class="main creatAccount" ref="main" style="padding-bottom: 0;">
    <div class="creatAccountTitle radio">
      开户类型
        <router-link to="/manageIcode/AgentCode"><input type="radio" value="1" v-model="codetype" id="radio1">
        <label for="radio1">代理类型</label></router-link>
        <router-link to="/manageIcode/memberCode">
        <input type="radio" value="0" id="radio2">
        <label for="radio2">玩家类型</label>
        </router-link>
    </div>
    <Icode-box :UserType="codetype"></Icode-box>
  </div>
</template>
<script>
import IcodexBox from './ICode';
export default{
  data(){
    return{
      codetype:1
    }
  },
  components:{
      'Icode-box':IcodexBox
    }
  }
</script>
<style lang="scss" scoped>
  @import '../scss/personalinfo.scss';
</style>
