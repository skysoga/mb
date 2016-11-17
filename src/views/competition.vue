<template>
  <div class="competition">
    <table>
      <tr class="active" :data-id="item.UserId" v-for='item in init_bonus_data'>
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
    created(){
      interviewApp.GetInitData(["RankingList"],function(data){
        console.log(data.RankingList);
      });
      _fetch({Action:"GetInitData",Requirement:["RankingList"]}).then((res)=>{
        if(res.ok){
          res.json().then((data)=>{
            console.log(data);
          })
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/newwinners.scss';
  @import '../scss/personalinfo.scss';
</style>
