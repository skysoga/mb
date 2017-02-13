<template>
  <div class="main">
    <div class="innerWrap">
        <div v-for="(vlue,index) in $store.state.SysActivity" class="surperise active ">
            <router-link class="wrap line" :to="getHtml(vlue.Name)">
                <div class="number"><i>{{index+1}}</i></div>
                <div class="text">
                    <strong>{{vlue.Name}}</strong>
                    <p>{{vlue.Intro}}</p>
                </div>
                <i class="iconfont right fr"></i>
            </router-link>
        </div>
        <div v-for="(n,index) in $store.state.ActivityConfig" class="surperise active ">
            <router-link class="wrap line" :to="{name:'activityInfo',params:{ID:encodeURIComponent(n.Name)}}">
                <div class="number"><i>{{Num+index+1}}</i></div>
                <div class="text">
                    <strong>{{n.Name}}</strong>
                    <p>{{n.Intro}}</p>
                </div>
                <i class="iconfont right fr"></i>
            </router-link>
        </div>
    </div>
  </div>
</template>
<script src="../js/activity.js"></script>
<style lang="scss" scoped>
  @import '../scss/activity.scss';
  .active .number{
        width: 2em;
        height: 2em;
        border-radius: 50%;
        background: #fe8580;
        float: left;
        margin-left: .8rem;
        margin-right: .5rem;
        text-align: center;
    }
    .active .number i{
        font-style: inherit;
        color: white;
        text-align: center;
        display: inline-block;
        line-height: 1.3em;
        width: 1.5em;
        height: 1.5em;
        border: 1px solid;
        border-radius: 50%;
        font-size: 0.8em;
        margin-top: 0.5em;
        padding: 0.1em;
    }
    .innerWrap .surperise:nth-child(6n+3) .number{
        background: #2ed57b;
    }


//活动中心的隔行序号背景变色
.main{
  .surperise:nth-child(8n+1) .number{
    background:#fe8580;
  }
  .surperise:nth-child(8n+2) .number{
    background:#2ed57b;
  }
  .surperise:nth-child(8n+3) .number{
    background:#2ec3d5 !important;
  }
  .surperise:nth-child(8n+4) .number{
    background:#2e85d5 !important;
  }
  .surperise:nth-child(8n+5) .number{
    background:#d52ebe !important;
  }
  .surperise:nth-child(8n+6) .number{
    background:#d52e88 !important;
  }
  .surperise:nth-child(8n+7) .number{
    background:#d52e4a !important;
  }
  .surperise:nth-child(8n+8) .number{
    background:#64d52e !important;
  }
}
</style>
