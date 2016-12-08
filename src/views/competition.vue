<template>
  <div class="competition">
    <div v-if="serverTime" class="winningListLoading">
        <img :src="$store.state.constant.ImgHost+'/system/common/loadding/winningList.gif'" alt="">
        <h5>排名计算中</h5>
        <p>将在00:20公布榜单，请稍候...</p>
    </div>
    <table v-else>
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
//import {GMT_DIF} from '../JSconfig'//-GMT_DIF 用于时差修正
  export default{
    data(){
      return {
        init_bonus_data:[],
        serverTime:false
      }
    },
    beforeRouteEnter(to,from,next){
      next(ref=>{
        ref.getServerTime()
      })
    },
    methods:{
      jump:function(id){
        let router=this.$router
        router.push({ path: '/playerHome',query:{ID:id}})
      },
      getServerTime(){
          var isTime=new Date(new Date().getTime()- store.state.Difftime)
          console.log(isTime)
          var Hours=isTime.getHours()
          var Minute=isTime.getMinutes()
          if(Hours==0&&Minute<20){
            this.serverTime=true
          }else{
            this.serverTime=false
          }
      }
    },
    created(){
      RootApp.GetInitData(["RankingList"],(data)=>{
        this.init_bonus_data=data.RankingList
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/newwinners.scss';
  @import '../scss/personalinfo.scss';
</style>
