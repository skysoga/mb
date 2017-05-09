<template>
  <div>

    <div class="main" v-if= "method === 'Bank' && !underMaintain">
      <table>
        <tr>
          <td>选择银行</td>
          <td>
            <select v-model = "BankCode" @change = "changeBankAccount">
              <option v-for = "option in Bank" :value = "option.BankCode">{{option.BankName}}</option>
            </select>
            <i class="iconfont unfold"></i>
          </td>
        </tr>

        <tr>
          <td>收款户名</td>
          <td>
            <input class="cGold" type="text" :value = "nowRender.RealName"  readonly="readonly">
            <i class="iconfont copy" v-copyBtn v-if = "isSupportCopy">复制</i>
          </td>
        </tr>
        <tr>
          <td>收款账号</td>
          <td>
            <input class="cGold" type="text" :value = "nowRender.CardNum"  readonly="readonly">
            <i class="iconfont copy" v-copyBtn v-if = "isSupportCopy">复制</i>
          </td>
        </tr>
        <tr>
          <td>开户支行</td>
          <td>
            <input class="cGold" type="text" :value = "nowRender.BankStore"  readonly="readonly">
            <i class="iconfont copy" v-copyBtn v-if = "isSupportCopy">复制</i>
          </td>
        </tr>
        <tr>
          <td>充值金额</td>
          <td><input type="tel" tag = "充值金额"  v-va:Money  v-model.trim = 'Money'  placeholder="请输入充值金额"></td>
        </tr>
        <tr>
          <td>转账户名</td>
          <td><input type="text" tag = "转账户名"  v-va:PayUser.RealName  v-model = 'PayUser'   placeholder="请输入付款人的银行卡姓名"></td>
        </tr>
      </table>
      <div class="loginBtn BTN"><a v-va-check>确定</a></div>
      <div class="tips">
        1、请转账到以上收款银行账户。<br>
        2、请正确填写转账银行卡的持卡人姓名和充值金额，以便及时核对。<br>
        3、转账1笔提交1次，请勿重复提交订单。<br>
        4、请务必转账后再提交订单,否则无法及时查到您的款项！
      </div>
    </div>

    <div class="main" v-if= "method === 'Weixin' && !underMaintain ">
      <input name="GetMoneyUser" type="hidden" value="" readonly="readonly">
      <table>
        <tr>
          <td>充值金额</td>
          <td><input  type="tel" tag = "充值金额" v-va:Money  v-model = 'Money'  placeholder="请输入充值金额"></td>
        </tr>
        <tr>
          <td>微信昵称</td>
          <td><input type="text" tag = "微信昵称" v-va:PayUser  v-model = 'PayUser'  placeholder="请输入您的微信昵称"></td>
        </tr>
        <tr>
          <td>扫码支付</td>
          <td>
            <img class="barcode" :src="nowRender.CodeImg" alt="二维码">
          </td>
        </tr>
        <tr></tr>
      </table>
      <div class="loginBtn BTN"><a v-va-check>确定</a></div>
      <div class="tips">
        1、扫一扫以上二维码进行充值。<br>
        2、请正确填写您的昵称和充值金额。<br>
        3、微信昵称并非微信账号，请注意区分。<br>
        4、可以使用其他手机扫二维码进行充值，也可以将二维码保存到相册再使用微信识别相册中的二维码进行充值，由于本二维码经常更换，充值前务必重新保存最新的二维码。<br>
        5、请务必转账后再提交订单,否则无法及时查到您的款项！
      </div>
    </div>

    <div class="main" v-if= "method === 'Alipay' && !underMaintain ">
      <table>
        <tr>
          <td>支付宝姓名</td>
          <td>
            <input class="cGold"  type="text" :value = "nowRender.RealName"  readonly="readonly">
            <i class="iconfont copy" v-copyBtn v-if = "isSupportCopy">复制</i>
          </td>
        </tr>
        <tr>
          <td>支付宝账号</td>
          <td><input class="cGold" type="text"  :value = "nowRender.AliNo" readonly="readonly">
          <i class="iconfont copy" v-copyBtn v-if = "isSupportCopy">复制</i></td>
        </tr>
        <tr>
          <td>充值金额</td>
          <td><input  type="tel" tag = "充值金额"  v-model.trim="Money" v-va:Money placeholder="请输入充值金额"></td>
        </tr>
        <tr>
          <td>支付宝姓名</td>
          <td><input type="text" tag = "支付宝姓名" v-model="PayUser" v-va:PayUser   placeholder="请输入您的支付宝姓名"></td>
        </tr>
        <tr>
          <td>扫码支付</td>
          <td>
            <img class="barcode" :src="nowRender.CodeImg" alt="">
          </td>
        </tr>
        <tr></tr>
      </table>
      <div class="loginBtn BTN" v-va-check><a>确定</a></div>
      <div class="tips">
        1、请转账到以上支付宝或扫码支付。<br>
        2、若提供的是银行账号，请使用支付宝转账到银行卡的方式进行转账。<br>
        3、请正确填写您的姓名和充值金额。<br>
        4、设置了支付宝昵称的请直接填写昵称。<br>
        5、转账1笔提交1次，请勿重复提交订单。<br>
        6、请务必转账后再提交订单,否则无法及时查到您的款项！
      </div>
    </div>

    <div class="fullPageMsg" v-if = "underMaintain">
      <div class="fullPageIcon iconfont">&#xe626;</div>
      <p>{{pageName}}维护中···<br/>请使用其他充值方式！</p>
    </div>

  </div>
</template>

<script>
export default{
  beforeRouteEnter(to, from, next){
    var title = {
      Bank: '银行转账',
      Weixin:'微信支付',
      Alipay: '支付宝'
    }
    var shouldCheck = ['Weixin', 'Alipay']
    var method = to.query.method      //'Bank', 'Weixin', 'Alipay'
    var rechargeWay = 'RechargeWay' + method
    to.meta.title = title[method]   //标题

    RootApp.AjaxGetInitData([rechargeWay], state=>{
      if(shouldCheck.indexOf(method) > -1){
        var PayType = state[rechargeWay]&&state[rechargeWay][0].PayType
        //假如充值方式为快捷充值了，就跳转至快捷充值
        if(PayType && PayType !== '一般'){
          router.replace('/quickPay?method=' + method)
        }
      }

      next(vm=>{
        //如果没数据进维护页
        if(!state[rechargeWay] || !state[rechargeWay][0]){
          vm.underMaintain = true
          return
        }
        //有快捷支付的要检验下，如果数据不对要跳到快捷充值去

        vm.underMaintain = false
        //银行转账
        if(method === 'Bank'){
          vm[method] = Object.freeze(state[rechargeWay])
          var BankCode = state[rechargeWay][0].BankCode
          vm.BankCode = BankCode;
          vm.nowRender = state[rechargeWay][0]
          // console.log(vm.nowRender)
        }else{
          vm.nowRender = state[rechargeWay][0]
          vm.ID = state[rechargeWay][0].Id
          var xurl = ''
          if(state[rechargeWay][0].CodeImg === '0' || !state[rechargeWay][0].CodeImg){
            xurl = '/../system/common/other/noQRcode.png'
          }else{
            xurl = state[rechargeWay][0].CodeImg
          }
          vm.nowRender.CodeImg =  state.constant.ImgHost + xurl
        }

      })


    })

  },
  data () {
    return {
      method: '',                //什么充值方式
      pageName: '',              //维护的名字
      underMaintain: false,      //是否维护
      Bank:[],                  //银行的比较多，先拿个数组存起来
      isSupportCopy: !!document.execCommand,      //支不支持这个属性
      //当前
      BankCode:'',
      nowRender:{},
      limit:'',
      //ajax
      PayUser: '',
      Money: '',
      ID:0,
    }
  },
  computed:{
    ID (){
      return this.nowRender.Id
    },
    pageName () {
      var _name= {
        Bank: '银行转账',
        Weixin: '微信支付',
        Alipay: '支付宝充值'
      }
      return _name[this.method]
    }
  },
  created (){
    var method = this.$route.query.method       //'Bank', 'Weixin', 'Alipay'
    this.method = method
    var limitName = {
      Bank: '银行转账',
      Weixin: '微信支付',
      Alipay: '支付宝'
    }

    //获取数据
    RootApp.AjaxGetInitData(['PayLimit'], state=>{
      //设置金额的限制
      this.vaConfig ||(this.vaConfig = {})
      this.vaConfig['Money'] || (this.vaConfig['Money'] = [])
      var limit=state.PayLimit[limitName[method]];
      this.vaConfig['Money'].push(new this.VaConfig('limit', limit, '', 'Money', limitName[method]))
    })
  },
  methods:{
    //切换充值银行
    changeBankAccount (){
      this.Bank.forEach(item=>{
        if(item.BankCode === this.BankCode){
          this.nowRender = item
        }
      })
    },
    $vaSubmit () {
      //ajax数据
      var ajax = {
        //银行转账
        Bank:{
          Action:'Recharge',
          Qort:2,
          PayUser:'',
          Money:0,
          ID:1,
          BankCode:0,
        },
        //微信支付
        Weixin:{
          Action:'Recharge',
          Qort:4,
          PayUser:'',
          Money:0,
          ID:1,
          BankCode:0
        },
        //支付宝
        Alipay:{
          Action:'Recharge',
          Qort:3,
          PayUser:'',
          Money:0,
          ID:1,
          BankCode:0
        }
      }

      var nowAjax = ajax[this.method]
      nowAjax.PayUser = this.vaVal.PayUser
      nowAjax.Money = this.vaVal.Money
      nowAjax.ID = this.nowRender.Id
      if(this.method === 'Bank'){
        nowAjax.BankCode = this.BankCode
      }
      layer.msgWait("正在提交")
      _fetch(nowAjax).then((json)=>{
        this.PayUser = ''
        this.Money = ''
        if(json.Code === 1){
          layer.msg(json.StrCode);
        }else{
          layer.msgWarn(json.StrCode);
        }
      })
    },

  }
}
</script>

<style lang = "scss" scoped>
  @import '../scss/securityCenter.scss';
</style>
