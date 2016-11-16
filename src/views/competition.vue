<template>
  <div class="competition">
    <table>
      <tr class="active" data-id="37625">
        <td>
          <img src="http://images.dafa176.com/system/common/headimg/A9734CC321C8B363.jpg" alt="">
          	<p>账号昵称：<i style="color:#38f">wu***4</i><br>昨日奖金：<span>￥292320</span></p>
        </td>
        <td><em>1</em></td>
    	</tr>
    </table>
  </div>
</template>

<script type="text/javascript">
  export default{
    data(){
      return {
        init_bonus_data:[]
      }
    },
    created(){
      _fetch().then((res)=>{
        if(res.ok){
          res.json().then((data)=>{
            
          })
        }else{
          console.log("request error");
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/newwinners.scss';
  @import '../scss/personalinfo.scss';
</style>
