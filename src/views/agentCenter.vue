<template>
  <div class="main">
    <div class="topSlide">
      <img src="http://imagess-google.com/system/mobile/other/proxySlide.png" alt="" width="100%">
    </div>
    <div class="options">
            <router-link to="agentIntro" class="active" style="">
              <span>代理说明</span>
              <i class="fr"><span class="iconfont right"></span></i>
            </router-link>
            <p class="hr1px"></p>
            <router-link to="agentReport" class="active" style="">
              <span>代理报表</span>
              <i class="fr"><span class="iconfont right"></span></i>
            </router-link>
            <p class="hr1px"></p>
            <router-link to="lowerReport" class="active">
              <span>下级报表</span>
              <i class="fr"><span class="iconfont right"></span></i>
            </router-link>
            <p class="hr1px"></p>
            <router-link to="manageInvite" class="active" style="">
              <span>下级开户</span>
              <i class="fr"><span class="iconfont right"></span></i>
            </router-link>
            <p class="hr1px"></p>
            <router-link to="agentMember" class="active">
              <span>会员管理</span>
              <i class="fr"><span class="iconfont right"></span></i>
            </router-link>
            <p class="hr1px"></p>
            <router-link to="agentBetRecord" class="active">
              <span>投注明细</span>
              <i class="fr"><span class="iconfont right"></span></i>
            </router-link>
            <p class="hr1px"></p>
            <router-link to="agentBillRecord" class="active">
              <span>交易明细</span>
              <i class="fr"><span class="iconfont right"></span></i>
            </router-link>
        </div>
  </div>
</template>
<script>
  export default{
    beforeRouteEnter(to,from,next){
      var U=localStorage.getItem('UserName')
      if(!U){
        router.replace('/login')
      }
      next()
    }
  }
</script>
<style lang="scss" scoped>
  @import '../scss/personalinfo.scss';
</style>
