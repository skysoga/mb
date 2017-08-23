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
        <a class = "wrap" @click = "setUrl(wechatType,'Weixin',weixMsg)">
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
        </a>
      </div>

      <div class="surperise active">
        <a class = "wrap" @click = "setUrl(aliType,'Alipay',aliMsg)">
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
        </a>
      </div>

      <div class="surperise active">
        <a class = "wrap" @click = "setUrl(qqType,'QQpay',qqMsg)">
          <img class="img" :src="imgServer + '/../system/common/bank/pay/qqpay.png'">
          <div class="text">
            <strong>QQ钱包</strong>
            <p v-if="!qqMsg">
              单笔最低<ins>{{qqType === '一般' ? payLimit['QQ钱包'][0]: payLimit['QQ快捷'][0] | num}}</ins>元，
              最高<ins>{{qqType === '一般' ? payLimit['QQ钱包'][1]: payLimit['QQ快捷'][1] | num}}</ins>元。
            </p>
            <p v-else>
            {{qqMsg}}
            </p>
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
      imgServer: state.constant.ImgHost,
      wechatType: '一般',
      aliType: '一般',
      qqType: '一般',
      payLimit:{},
      weixMsg:'',
      aliMsg:'',
      qqMsg:''
    }
  },
  beforeRouteEnter(to,from,next){
    RootApp.AjaxGetInitData(['PayLimit','RechargeWayWeixin', 'RechargeWayAlipay','RechargeWayBank','RechargeWayQQpay'], state=>{
      next()
    })
  },
  created () {
    if(state.RechargeWayWeixin){
      this.weixMsg=false
      this.wechatType = state.RechargeWayWeixin[0].PayType || '一般'
    }else{
      this.wechatType=''
      this.weixMsg="微信支付维护中..."
    }
    if(state.RechargeWayAlipay){
      this.aliMsg=false
      this.aliType = state.RechargeWayAlipay[0].PayType || '一般'
    }else{
      this.wechatType=''
      this.aliMsg="支付宝支付维护中..."
      this.wechatType=''
    }
    if(state.RechargeWayQQpay){
      this.qqMsg=false
      this.qqType = state.RechargeWayQQpay[0].PayType || '一般'
    }else{
      this.qqType=''
      this.qqMsg="QQ钱包维护中..."
      this.qqType=''
    }
    this.payLimit = state.PayLimit
  },
  methods:{
    setUrl(key,name,bool){
      var Url= key === '一般' ? 'normalPay?method='+name : 'quickPay?method='+name
      !bool&&router.push(Url)
    }
  }
}
</script>
<style lang = "scss" scoped>
  @import '../scss/activity.scss';
</style>
