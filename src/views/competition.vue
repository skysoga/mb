<template>
  <div class="competition">
    <table>
      <tr class="active" :data-id="item.UserId" v-for='item in init_bonus_data' @click="jump(item.UserId)">
        <td>
          <img :src="$store.getters.PhotoPath+item.UserPhoto" alt="">
          	<p>账号昵称：<i style="color:#38f">{{item.NickName?item.NickName:item.UserName}}</i><br>昨日奖金：<span>￥{{item.Bonus}}</span></p>
        </td>
        <td><em>{{item.Ranking}}</em></td>
    	</tr>
    </table>
  </div>
</template>

<script type="text/javascript">
const interviewApp=require("../main.js");
  export default{
    data(){
      return {
        init_bonus_data:[]
      }
    },
    methods:{
      jump:function(id){
        let router=this.$router
        router.push({ path: 'playerHome',query:{ID:id}})
      }
    },
    created(){
      interviewApp.GetInitData(["RankingList"],(data)=>{
        this.init_bonus_data=data.RankingList
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/newwinners.scss';
  @import '../scss/personalinfo.scss';
</style>
