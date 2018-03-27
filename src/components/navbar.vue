<template>
<nav class="bottom">
  <router-link to='/index' exact><i class="iconfont"></i><p>购彩大厅</p></router-link>
  <a @click="clearPint" :class="{on:path==='/liveList'}"><em v-show="isFirstTime === 1"></em><i class="iconfont"></i><p>UU直播</p></a>
  <router-link to='/activity'><i class="iconfont"></i><p>活动</p></router-link>
  <router-link to='/center'><i class="iconfont"></i><p>发现</p></router-link>
  <router-link to='/userCenter'><i class="iconfont"></i><p>我的</p></router-link>
</nav>
</template>
<script>
  export default{
    data(){
      return {
        isFirstTime:0,
        path:'',
      }
    },
    created(){
      this.check()
    },
    methods:{
      clearPint(){
        if (state.UserName !== null) {
          localStorage.setItem('FirstTimeLive','0')
          this.isFirstTime = 0
        }
        router.push('/liveList')
      },
      check(){
        if((localStorage.getItem('FirstTimeLive') === null) && (state.UserName !== null)){
          this.isFirstTime = 1
        }else{
          this.isFirstTime = 0
        }
      },
    },
    watch:{
      '$route.path'(n){
        this.path = n
      },
      '$store.state.UserName'(n){
        this.check()
      },
    },
  }
</script>
<style lang="scss" scoped>
  .bottom{
    a{
      em{
        position: absolute;
        border-radius: 50%;
        display: inline-block;
        width: .5em;
        height: .5em;
        background: #e54042;
        margin-top: .34em;
        margin-left: .7em;
      }
    }
  }
</style>