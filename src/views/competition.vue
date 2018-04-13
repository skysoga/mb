<template>
  <div class="competition">
    <div v-if="serverTime" class="winningListLoading">
        <img :src="$store.state.constant.ImgHost+'/system/common/loadding/winningList.gif'" alt="">
        <h5>排名计算中</h5>
        <p>将在00:20公布榜单，请稍候...</p>
    </div>
    <table v-else>
      <tr class="active" :data-id="item.UserId" v-for='(item,index) in init_bonus_data' @click="jump(item.UserId)">
        <td>
          <img :src="$store.getters.PhotoPath+item.UserPhoto" alt="">
            <p>账号昵称：<i style="color:#38f">{{item.NickName?item.NickName:item.UserName}}</i><br>昨日盈利：<span>￥{{item.Bonus}}</span></p>
        </td>
        <td><em>{{index+1}}</em></td>
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
          var Hours=isTime.getHours()
          var Minute=isTime.getMinutes()
          if(Hours==0&&Minute<20){
            this.serverTime=true
            store.commit('ClearInitData', ["RankingList"])
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
.competition {
  margin-top: 2.3em;
  margin-bottom: 2.5em;
  background: white;
  table {
    background: white;
    width: 100%;
    font-size: 0.7em;
    tr {
      td:first-child {
        padding-left: 0.8rem;
      }
      td {
        height: 3.6em;
        position: relative;
        span {
          color: #e80d2d;
        }
        i {
          color: #0079ff;
        }
        &:before {
          content: '';
          position: absolute;
          left: 0;
          background: #d0d0d0;
          width: 100%;
          height: 1px;
          transform: scaleY(.5);
          transform-origin: 0 0;
          top: 0;
        }
      }

      &:nth-child(1) td:nth-child(2) {
        em {
          background: #ca9293;
          color: white;
          background: -webkit-radial-gradient(circle at 25px 25px, #c12f33, #ca9293);
          background: radial-gradient(circle at 25px 25px, #c12f33, #ca9293);
        }
      }
      &:nth-child(2) td:nth-child(2) {
        em {
          background: #53b0fe;
          color: white;
          background: -webkit-radial-gradient(circle at 25px 25px, #2b82cc, #53b0fe);
          background: radial-gradient(circle at 25px 25px, #2b82cc, #53b0fe);
        }
      }
      &:nth-child(3) td:nth-child(2) {
        em {
          background: #f8a968;
          color: white;
          background: -webkit-radial-gradient(circle at 25px 25px, #c57532, #f8a968);
          background: radial-gradient(circle at 25px 25px, #c57532, #f8a968);
        }
      }
    }
    td {
      &:nth-child(2) {
        color: #333;
        text-align: center;
      }
      padding: 0.5em 0.8em;
    }
    img {
      width: 3em;
      height: 3em;
      border-radius: 50%;
      float: left;
      margin-right: 1em;
    }
    p {
      line-height: 1.5em;
      height: 2.8em;
      overflow: hidden;
    }
    em {
      display: block;
      margin: 0 auto;
      width: 1.8em;
      height: 1.8em;
      border-radius: 50%;
      line-height: 1.8em;
    }
  }
}
</style>
