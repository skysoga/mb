<template id="">
  <div class="main playerHome">
    <div class="playerHomeHead">
      <div class="playerHeadImg"><img :src="$store.getters.PhotoPath+UserPhoto" alt=""></div>
    </div>
    <div class="playerInfo">
        <h1>{{checkUserName(initData.UserName,initData.NickName)}}</h1>
        <h2>账号:{{initData.UserName}}</h2>
        <span>性别:{{checkSex(initData.Sex)}}</span>
        <p>头衔：<em>{{initData.Rank}}</em>累计中奖：<i>{{Math.floor(initData.Award)}}</i></p>
        <ins>{{initData.GroupTitle}}</ins>
    </div>
    <div class="cardIcon">
        <p>Ta喜欢的彩票</p>
        <ul class="cardIconList fix">
            <li v-for="x in lottery_type"><a href="javascript:;"><i class="iconfont" :class="'text'+x.name+' '+x.state"></i></a></li>
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
          {name:"K3",state:"noActive"},
          {name:"XYNC",state:"noActive"},
          {name:"PK10",state:"noActive"},
          {name:"KL8",state:"noActive"},
          {name:"PL35",state:"noActive"},
          {name:"FC3D",state:"noActive"},
          {name:"SSC",state:"noActive"},
          {name:"SYX5",state:"noActive"}
        ],
        UserPhoto:"defaultHeadImg.png"
      }
    },
    methods:{
      checkUserName:function(UserName,NickName){
        if(NickName===UserName||NickName===null||NickName===""){
            return  "昵称未设置"
        }else{
            return NickName
        }
      },
      checkSex:function(sex){
        if(sex==='0'){
           return "男"
         }else if(sex==='1'){
           return "女"
         }else{
           return "保密"
         }
      },
      checkPhoto:function(photo){
        if(photo){
			      this.UserPhoto=photo
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
    created(){
      _fetch({Action:"GetCard",UserId:this.$route.query.ID}).then((res)=>{
        if(res.ok){
          res.json().then((data)=>{
            if(data.Code===1){
              this.initData=data.BackData
              if (data.BackData.LotteryType) {
                let typeArr=data.BackData.LotteryType.split(",")
                this.sort_lotteryType(typeArr)
              }
              this.checkPhoto(data.BackData.UserPhoto)
            }else {
              layer.msgWarn(data.StrCode)
            }
          })
        }else {
          layer.msgWarn("request error")
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/playerHome.scss';
</style>
