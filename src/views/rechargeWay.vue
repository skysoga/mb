<template>
  <div class="main">
    <div class="innerWrap">

      <div class="surperise active">
        <router-link class="wrap" to = "normalPay?method=Bank">
          <img class="img" :src="imgServer + '/../system/common/bank/pay/card.png'">
          <div class="text">
            <strong>银行转账</strong>
            <p>单笔最低<ins>{{payLimit['银行转账'][0] | num}}</ins>元，最高<ins>{{payLimit['银行转账'][1] | num}}</ins>元。</p>
          </div>
          <i class="iconfont right fr"></i>
        </router-link>
      </div>

      <div class="surperise active">
        <router-link class = "wrap" :to = "wechatType === '一般' ? 'normalPay?method=Weixin' : 'quickPay?method=Weixin'">
          <img class="img" :src="imgServer + '/../system/common/bank/pay/weixin.png'">
          <div class="text">
            <strong>微信支付</strong>
            <p v-if="!weixMsg">
              单笔最低<ins>{{wechatType === '一般' ? payLimit['微信支付'][0]: payLimit['微信快捷'][0] | num}}</ins>元，
                  最高<ins>{{wechatType === '一般' ? payLimit['微信支付'][1]: payLimit['微信快捷'][1] | num}}</ins>元。
            </p>
            <p v-else>
            {{weixMsg}}
            </p>
          </div>
          <i class="iconfont right fr"></i>
        </router-link>
      </div>

      <div class="surperise active">
        <router-link class = "wrap" :to = "aliType === '一般' ? 'normalPay?method=Alipay' : 'quickPay?method=Alipay'">
          <img class="img" :src="imgServer + '/../system/common/bank/pay/alipay.png'">
          <div class="text">
            <strong>支付宝支付</strong>
            <p v-if="!aliMsg">
              单笔最低<ins>{{aliType === '一般' ? payLimit['支付宝'][0]: payLimit['支付宝快捷'][0] | num}}</ins>元，
              最高<ins>{{aliType === '一般' ? payLimit['支付宝'][1]: payLimit['支付宝快捷'][1] | num}}</ins>元。
            </p>
            <p v-else>
            {{aliMsg}}
            </p>
          </div>
          <i class="iconfont right fr"></i>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgServer: this.$store.state.constant.ImgHost,
      wechatType: '一般',
      aliType: '一般',
      payLimit:{},
      weixMsg:'',
      aliMsg:''
    }
  },
  beforeRouteEnter(to,from,next){
    RootApp.AjaxGetInitData(['PayLimit','RechargeWayWeixin', 'RechargeWayAlipay','RechargeWayBank'], state=>{
      next()
    })
  },
  created () {
    let state = this.$store.state
    if(state.RechargeWayWeixin){
      this.weixMsg=false
      this.wechatType = state.RechargeWayWeixin[0].PayType || '一般'
    }else{
      this.weixMsg="微信支付维护中..."
    }
    if(state.RechargeWayAlipay){
      this.aliMsg=false
      this.aliType = state.RechargeWayAlipay[0].PayType || '一般'
    }else{
      this.aliMsg="支付宝支付维护中..."
    }
    this.payLimit = state.PayLimit
  },
}
</script>
<style lang = "scss" scoped>
  @import '../scss/activity.scss';
</style>
