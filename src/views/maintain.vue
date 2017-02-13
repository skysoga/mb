<template>
  <div class="maintainCon">
    <!-- <header class="top">
      <span><img :src="$store.getters.PhotoPath+'logo/mobile_logo.png'"></span>
    </header> -->
    <div class="errorContent fix" v-if="$store.state.Maintain">
      <div class="maintain">
        <div class="left">
          <img src="http://images.dafa176.com/system/pc/error/error.png" alt="" width="130" height="87">
        </div>
        <div class="right">
          <h1>系统维护中</h1>
          <p>每一次简单的维护<br>都是为了给您带来更好的服务<br>预计于 <em>{{$store.state.Maintain.FinishTime}}</em>维护完成</p>
          <router-link class="errorService" to="/service">在线客服</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      Interval:null
    }
  },
  beforeRouteEnter:(to, from, next) => {
    if (state.Maintain) {
      to.meta.title=`<img src="${state.Maintain.ImgUrl+'/logo/mobile_logo.png'}">`
    }else{
      to.meta.title=`<img src="${state.constant.ImgHost+state.SiteConfig.MobileLogo}">`
    }
    next()
  },
  created:function(){
    var DSQ=setInterval(function(){
      _fetch({Action:"GetServerTimeMillisecond"}).then(json=>{
        if (json.Code>-1) {
          clearInterval(DSQ)
          router.push("/index")
        }
      })
    },120000)
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/maintain.scss';
</style>
