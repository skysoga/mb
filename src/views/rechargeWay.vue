<template>
	<div class="main">
    <div class="innerWrap">
      <div class="surperise active">
        <a class="wrap" href="/ebankPay.html">
        <img class="img" :src="imgServer + '/../system/common/bank/pay/card.png'">
          <div class="text">
            <strong>银行转账</strong>
            <p>单笔最低<ins id = "minMoneyBank">&nbsp;&nbsp;</ins>元，最高<ins id = "maxMoneyBank">&nbsp;&nbsp;</ins>元。</p>
          </div>
          <i class="iconfont right fr"></i>
        </a>
      </div>
      <div class="surperise active">
        <a class="wrap" href="/wechatPay.html">
        <img class="img" :src="imgServer + '/../system/common/bank/pay/weixin.png'">
          <div class="text">
            <strong>微信支付</strong>
            <p>单笔最低<ins id = "minMoneyWechat">&nbsp;&nbsp;</ins>元，最高<ins id = "maxMoneyWechat">&nbsp;&nbsp;</ins>元。</p>
          </div>
          <i class="iconfont right fr"></i>
        </a>
      </div>
      <div class="surperise active">
        <a class="wrap" href="/alipay.html">
        <img class="img" :src="imgServer + '/../system/common/bank/pay/alipay.png'">
          <div class="text">
            <strong>支付宝</strong>
            <p>单笔最低<ins id = "minMoneyAlipay">&nbsp;&nbsp;</ins>元，最高<ins id = "maxMoneyAlipay">&nbsp;&nbsp;</ins>元。</p>
          </div>
          <i class="iconfont right fr"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	data () {
		return {
			imgServer: this.$store.state.constant.ImgHost
		}
	},
	beforeRouteEnter(to,from,next){
		next(vm=>{
			vm.$root.AjaxGetInitData(['PayLimit'])
		})
	},
}
</script>
<style lang = "scss" scoped>
	@import '../scss/activity.scss';
</style>