<template>
  <div class="main">
    <div class="innerWrap">
    <template v-for="n in PaySort">
      <div class="surperise active" v-if="n==='EbankPay'">
        <router-link class="wrap" to = "recharge/Bank/0">
          <img class="img" :src="imgServer + '/../system/common/bank/pay/card.png'">
          <div class="text">
            <strong>银行转账</strong>
            <p v-if="!bankMsg">
              单笔最低<ins>{{payLimit['bank'][0] | num}}</ins>元，
              最高<ins>{{payLimit['bank'][1] | num}}</ins>元。
            </p>
            <p v-else>
              {{bankMsg}}
            </p>
          </div>
          <i class="iconfont right fr"></i>
        </router-link>
      </div>

      <div class="surperise active" v-if="n==='Weixin'">
        <a class = "wrap" @click = "setUrl(wechatType,'Weixin',weixMsg)">
          <img class="img" :src="imgServer + '/../system/common/bank/pay/weixin.png'">
          <div class="text">
            <strong>微信支付</strong>
            <p v-if="!weixMsg">
              单笔最低<ins>{{payLimit['wechat'][0] | num}}</ins>元，
                  最高<ins>{{payLimit['wechat'][1] | num}}</ins>元。
            </p>
            <p v-else>
            {{weixMsg}}
            </p>
          </div>
          <i class="iconfont right fr"></i>
        </a>
      </div>

      <div class="surperise active" v-if="n==='Alipay'">
        <a class = "wrap" @click = "setUrl(aliType,'Alipay',aliMsg)">
          <img class="img" :src="imgServer + '/../system/common/bank/pay/alipay.png'">
          <div class="text">
            <strong>支付宝</strong>
            <p v-if="!aliMsg">
              单笔最低<ins>{{payLimit['alipay'][0] | num}}</ins>元，
              最高<ins>{{payLimit['alipay'][1] | num}}</ins>元。
            </p>
            <p v-else>
            {{aliMsg}}
            </p>
          </div>
          <i class="iconfont right fr"></i>
        </a>
      </div>

      <div class="surperise active" v-if="n==='QQpay'">
        <a class = "wrap" @click = "setUrl(qqType,'QQpay',qqMsg)">
          <img class="img" :src="imgServer + '/../system/common/bank/pay/qqpay.png'">
          <div class="text">
            <strong>QQ钱包</strong>
            <p v-if="!qqMsg">
              单笔最低<ins>{{payLimit['qqpay'][0]|num}}</ins>元，
              最高<ins>{{payLimit['qqpay'][1]|num}}</ins>元。
            </p>
            <p v-else>
            {{qqMsg}}
            </p>
          </div>
          <i class="iconfont right fr"></i>
        </a>
      </div>

      <div class="surperise active" v-if="n==='UnionPay'">
        <a class = "wrap" @click = "setUrl(unionType,'UnionPay',unionMsg)">
          <img class="img" :src="imgServer + '/../system/common/bank/pay/card.png'">
          <div class="text">
            <strong>银联支付</strong>
            <p v-if="!unionMsg">
              单笔最低<ins>{{payLimit['UnionPay'][0]|num}}</ins>元，
              最高<ins>{{payLimit['UnionPay'][1]|num}}</ins>元。
            </p>
            <p v-else>
            {{unionMsg}}
            </p>
          </div>
          <i class="iconfont right fr"></i>
        </a>
      </div>
      <!-- 第四方支付 暂定名：多功能支付-->

      <div class="surperise active" v-if="n==='FourthParty'&&FourUrl.PayUrl">
        <a class="wrap" :href="FourUrl.PayUrl" target="_blank" @click="toFourUrl($event)">
          <img class="img" :src="imgServer + '/../system/common/bank/pay/fourthpay.png'">
          <div class="text">
            <strong>{{FourUrl.PayType}}</strong>
            <p>内含支付宝微信QQ银行等渠道</p>
          </div>
          <i class="iconfont right fr"></i>
        </a>
      </div>

    </template>
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
      unionType: '一般',
      payLimit:{},
      weixMsg:'',
      aliMsg:'',
      qqMsg:'',
      unionMsg:'',
      FourUrl:{},
      PaySort:[]
    }
  },
  beforeRouteEnter(to,from,next){
    RootApp.AjaxGetInitData(['RechargeSort','RechargeWayWeixin', 'RechargeWayAlipay','RechargeWayBank','RechargeWayQQpay','RechargeWayUnionPay','RechargeFourthParty'], state=>{
      next()
    })
  },
  created () {
    var obj={}
    if(state.RechargeSort&&state.RechargeSort.length){
      let json=state.RechargeSort
      this.PaySort=json
    }
    if(state.RechargeWayBank&&state.RechargeWayBank[0]){
      let json=state.RechargeWayBank[0]
      obj.bank=this.getLimit(json)
    }else{
      this.RechargeWayBank=''
      this.bankMsg="银行转账维护中..."
    }
    if(state.RechargeWayWeixin&&state.RechargeWayWeixin[0]){
      let json=state.RechargeWayWeixin[0]
      this.weixMsg=false
      this.wechatType = json.PayType || '一般'
      obj.wechat=this.getLimit(json)
    }else{
      this.wechatType=''
      this.weixMsg="微信支付维护中..."
    }
    if(state.RechargeWayAlipay&&state.RechargeWayAlipay[0]){
      let json=state.RechargeWayAlipay[0]
      this.aliMsg=false
      this.aliType = json.PayType || '一般'
      obj.alipay=this.getLimit(json)
    }else{
      this.aliType=''
      this.aliMsg="支付宝维护中..."
    }
    if(state.RechargeWayQQpay&&state.RechargeWayQQpay[0]){
      let json=state.RechargeWayQQpay[0]
      this.qqMsg=false
      this.qqType = json.PayType || '一般'
      obj.qqpay=this.getLimit(json)
    }else{
      this.qqType=''
      this.qqMsg="QQ钱包维护中..."
    }
    if(state.RechargeWayUnionPay&&state.RechargeWayUnionPay[0]){
      let json=state.RechargeWayUnionPay[0]
      this.unionMsg=false
      this.unionType = json.PayType || '一般'
      obj.UnionPay=this.getLimit(json)
    }else{
      this.unionType=''
      this.unionMsg="银联支付维护中..."
    }
    if(state.RechargeFourthParty&&state.RechargeFourthParty[0]){
      this.FourUrl=state.RechargeFourthParty[0]
    }
    this.payLimit = obj
  },
  methods:{
    setUrl(key,name,bool){
      var Url= 'recharge/'+name+'/0'
      // var Url= key === '一般' ? 'normalPay?method='+name : 'quickPay?method='+name
      !bool&&router.push(Url)
    },
    toFourUrl(el){
      if(_App){
        el.preventDefault();
        var newtab=null//!_App&&!localStorage.getItem('isSelfApp')&&window.open('about:blank')
        RootApp.AjaxGetInitData(['RechargeFourthParty'], state=>{
          var json=state.RechargeFourthParty
          if(json&&json.length){
            this.FourUrl=json[0]
            RootApp.OpenWin(json[0].PayUrl,newtab)
          }else{
            // newtab&&newtab.close()
            layer.alert(this.FourUrl.PayType+'功能已关闭')
          }
        })
      }
      
    },
    getLimit(obj){
      let arr=[]
        arr.push(obj.MinMoney)
        arr.push(obj.MaxMoney)
      return arr
    }
  }
}
</script>
<style lang = "scss" scoped>
  @import '../scss/activity.scss';
</style>
