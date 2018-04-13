<template>
  <div class="maintainCon">
    <div class="errorContent fix" v-if="Maintain">
      <div class="maintain">
        <div class="left">
          <img src="http://imagess-google.com/system/pc/error/error.png" alt="" width="130" height="87">
        </div>
        <div class="right">
          <h1>系统维护中</h1>
          <p>每一次简单的维护<br>都是为了给您带来更好的服务<br>预计于 <em>{{Maintain.FinishTime}}</em>维护完成</p>
          <router-link v-if="Maintain.ServiceUrl" class="errorService" to="/service">在线客服</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      // Interval:null
    }
  },
  computed:{
    Maintain:()=>{
      return state.Maintain
    }
  },
  mounted(){
    if(this.Maintain==undefined){
      router.push('/index')
    }
  },
  beforeCreate(){
    _fetch({Action:"GetServerTimeMillisecond"}).then(json=>{
        if (json.Code>-1) {
          router.replace("/index")
        }
      })
    if (state.Maintain) {
      this.$route.meta.title=_App&&!state.UserName?'系统维护':`<img src="${state.Maintain.ImgUrl+'/logo/mobile_logo.png'}">`
    }else if(state.SiteConfig){
      this.$route.meta.title=`<img src="${state.constant.ImgHost+state.SiteConfig.MobileLogo}">`
    }else{
      router.replace('/index')
    }
  },
  created:function(){
    var DSQ=setInterval(function(){
      _fetch({Action:"GetServerTimeMillisecond"}).then(json=>{
        if (json.Code>-1) {
          clearInterval(DSQ)
          router.replace("/index")
        }
      })
    },120000)
  }
}
</script>

<style lang="scss" scoped>
em,i{
    font-style: initial;
    color: #e4393c;
    margin: 0 5px;
}
.maintain{
  display:table;
  margin:0 auto;
  img{
    /* margin-top:50px; */
    /* margin-right: 30px; */
  }
}
</style>
