<template id="">
  <div class="main playerHome">
    <div class="playerHomeHead">
      <div class="playerHeadImg">
        <img v-if="initData.UserPhoto" :src="$store.getters.PhotoPath+initData.UserPhoto" alt="">
        <img v-else :src="$store.getters.PhotoPath+'defaultHeadImg.png'" alt="">
      </div>
    </div>
    <div class="playerInfo">
        <h1 v-if="initData.NickName">{{initData.NickName}}</h1>
        <h1 v-else>昵称未设置</h1>
        <h2>账号:{{initData.UserName}}</h2>
        <span v-if="initData.Sex!='2'">性别:{{initData.Sex==='0'?'男':'女'}}</span><span v-else>性别:保密</span>
        <p>头衔：<em>{{initData.Rank}}</em>累计中奖：<i>{{Math.floor(initData.Award)}}</i></p>
        <ins>{{initData.GroupTitle}}</ins>
    </div>
    <div class="cardIcon">
        <p>Ta喜欢的彩票</p>
        <ul class="cardIconList fix">
            <li v-for="x in lottery_type"><a @click="clickLottery(x)"><i class="iconfont" :class="'L_'+x.name+' '+x.state"></i></a></li>
        </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default{
    data(){
      return {
        initData:{},
        lottery_type:[
          {name:"K3",state:"noActive",code:1407},
          {name:"SSC",state:"noActive",code:1008},
          {name:"SYX5",state:"noActive",code:1100},
          {name:"6HC",state:"noActive",code:1301},
          {name:"PK10",state:"noActive",code:1303},
          {name:"KL8",state:"noActive",code:1302},
          {name:"PL35",state:"noActive"},
          {name:"FC3D",state:"noActive"},
        ]
      }
    },
    methods:{
      clickLottery:function(x){
        if (state.UserName&&x.code) {
          //登录且有code的情况下跳转对应彩种页面
          router.push('/lottery/'+x.name+'/'+x.code)
        }
      },
      sort_lotteryType:function(arr){
        for (var i = 0; i < this.lottery_type.length; i++) {
          for (var j = 0; j < arr.length; j++) {
            if(this.lottery_type[i].name===arr[j]){
              this.lottery_type[i].state=""
              let temp=this.lottery_type[i]
              this.lottery_type.splice(i,1)
              this.lottery_type.unshift(temp)
            }
          }
        }
      }
    },
    beforeRouteEnter(to,from,next){
      // to.meta.link=from.path
      console.log(to);
      _fetch({Action:"GetCard",UserId:to.query.ID}).then((data)=>{
        next(vm=>{
          if(data.Code===1||data.Code===0){
            vm.initData=data.BackData
            if (data.BackData.LotteryType) {
              let typeArr=data.BackData.LotteryType.split(",")
              vm.sort_lotteryType(typeArr)
            }
          }else {
            layer.url(data.StrCode,from.path)
          }
        })
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/playerHome.scss';
</style>
