<template>
	<div class="main">
    <div class="innerWrap">

      <div class="surperise active">
        <router-link class="wrap" to = "normalPay">
          <img class="img" :src="imgServer + '/../system/common/bank/pay/card.png'">
          <div class="text">
            <strong>银行转账</strong>
            <p>单笔最低<ins>{{payLimit['银行转账'][0] | num}}</ins>元，最高<ins>{{payLimit['银行转账'][1] | num}}</ins>元。</p>
          </div>
          <i class="iconfont right fr"></i>
        </router-link>
      </div>

      <div class="surperise active">
        <router-link class = "wrap" :to = "wechatType === '一般' ? 'normalPay?method=wechat' : 'quickPay?method=wechat'">
          <img class="img" :src="imgServer + '/../system/common/bank/pay/weixin.png'">
          <div class="text">
            <strong>微信支付</strong>
            <p>
              单笔最低<ins>{{wechatType === '一般' ? payLimit['微信支付'][0]: payLimit['微信快捷'][0] | num}}</ins>元，
                  最高<ins>{{wechatType === '一般' ? payLimit['微信支付'][1]: payLimit['微信快捷'][1] | num}}</ins>元。
            </p>
          </div>
          <i class="iconfont right fr"></i>
        </router-link>
      </div>

      <div class="surperise active">
        <router-link class = "wrap" :to = "aliType === '一般' ? 'normalPay?method=ali' : 'quickPay?method=ali'">
          <img class="img" :src="imgServer + '/../system/common/bank/pay/alipay.png'">
          <div class="text">
            <strong>支付宝</strong>
            <p>
              单笔最低<ins>{{aliType === '一般' ? payLimit['支付宝'][0]: payLimit['支付宝快捷'][0] | num}}</ins>元，
              最高<ins>{{aliType === '一般' ? payLimit['支付宝'][1]: payLimit['支付宝快捷'][1] | num}}</ins>元。
            </p>
          </div>
          <i class="iconfont right fr"></i>
        </router-link>
      </div>
      
    </div>
  </div>
</template>

<script>
import interviewApp  from "../main.js"
export default {
	data () {
		return {
			imgServer: this.$store.state.constant.ImgHost,
			wechatType: '一般',
			aliType: '一般',
			payLimit:{}
		}
	},
	beforeRouteEnter(to,from,next){
		interviewApp.AjaxGetInitData(['PayLimit','RechargeWayWeixin', 'RechargeWayAlipay','RechargeWayBank'], state=>{
      next()
    })
	},
  created () {
    let state = this.$store.state
    this.wechatType = state.RechargeWayWeixin[0].PayType || '一般' 
    this.aliType = state.RechargeWayAlipay[0].PayType || '一般'
    this.payLimit = Object.freeze(this.$store.getters.PayLimit)
    // console.log(this.payLimit)
    // console.log(this.wechatType, this.aliType)
  },
}
</script>
<style lang = "scss" scoped>
	@import '../scss/activity.scss';
</style>