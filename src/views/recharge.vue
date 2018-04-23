<template>
  <div class="main">
    <div class="fullPageMsg" v-if="underMaintain">
      <div class="fullPageIcon iconfont">&#xe626;</div>
      <p>{{pageName}}维护中···
        <br/>请使用其他充值方式！</p>
    </div>
    <template v-else>
      <!-- 不是维护中 -->
      <!-- 银行转帐Bank-->
      <!-- 支付宝Alipay-->
      <!-- 微信Weixin-->
      <!-- QQ钱包QQPay-->
      <!-- 银联扫码UnionPay-->
      <!-- 第四方支付-->
      <template v-if= "method =='Alipay'||method =='QQpay'||method =='Weixin'||method =='UnionPay'">
        <table>
          <tr v-if="Bank.length>1">
              <td>充值通道</td>
              <td>
                <select v-model = "Id" @change = "changeBank">
                  <option v-for = "(n,k) in Bank" :value = "n.Id">通道{{k+1}}</option>
                </select>
                <i class="iconfont unfold"></i>
              </td>
            </tr>
        <template v-if="PayType=='一般'">          
            <template v-if="method=='Alipay'&&nowRender.AliNo&&nowRender.RealName">
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
            </template>
            <template v-if="method=='Weixin'&&nowRender.BankName&&nowRender.CardNum&&nowRender.RealName">
              <tr>
                <td>收款银行</td>
                <td><input class="cGold" type="text"  :value = "nowRender.BankName" readonly="readonly">
                <i class="iconfont copy" v-copyBtn v-if = "isSupportCopy">复制</i></td>
              </tr>
              <tr>
                <td>银行帐户</td>
                <td>
                  <input class="cGold"  type="text" :value = "nowRender.RealName"  readonly="readonly">
                  <i class="iconfont copy" v-copyBtn v-if = "isSupportCopy">复制</i>
                </td>
              </tr>
              <tr>
                <td>银行帐号</td>
                <td><input class="cGold" type="text"  :value = "nowRender.CardNum" readonly="readonly">
                <i class="iconfont copy" v-copyBtn v-if = "isSupportCopy">复制</i></td>
              </tr>        
            </template>
            <template v-if="method!=='Weixin'&&method!=='Alipay'&&nowRender.CardNum&&nowRender.RealName">
              <tr>
                <td>{{payName[1]}}</td>
                <td>
                  <input class="cGold"  type="text" :value = "nowRender.RealName"  readonly="readonly">
                  <i class="iconfont copy" v-copyBtn v-if = "isSupportCopy">复制</i>
                </td>
              </tr>
              <tr>
                <td>{{payName[2]}}</td>
                <td><input class="cGold" type="text"  :value = "nowRender.CardNum" readonly="readonly">
                <i class="iconfont copy" v-copyBtn v-if = "isSupportCopy">复制</i></td>
              </tr>
            </template>
            <tr>
              <td>充值金额</td>
              <td><input  type="tel" tag = "充值金额" v-va:Money  v-model = 'Money'  placeholder="请输入充值金额"></td>
            </tr>
            <tr>
              <td>{{payName[0]}}</td>
              <td><input type="text" :tag = "payName[0]" v-va:PayUser  v-model = 'PayUser'  :placeholder="'请输入您的'+payName[0]"></td>
            </tr>
            <tr v-if="nowRender.CodeImg">
              <td>扫码支付</td>
              <td>
                <img class="barcode" :src="nowRender.CodeImg" alt="">
              </td>
            </tr>
        </template>
        <template v-else>
          <!-- 快捷 -->
          <tr>
            <td>充值金额</td>
            <td>
              <input type="tel" tag="充值金额" v-va:Money v-model.trim='Money' placeholder="请输入充值金额">
            </td>
          </tr>
          <tr></tr>
        </template>
        </table>
        <div class="loginBtn BTN"><a v-va-check>确定</a></div>
        <div class="tips">
          <template v-if="PayType=='一般'">
            <template v-if="method==='Weixin'">
              1.请使用微信转账到以上账户。<br>
              2.若提供的是二维码，请使用微信扫一扫进行转账。若提供的是银行账号，请使用微信转账到银行卡的方式进行转账。<br>
              3.转账时，请在留言中备注自己的游戏账号，便于及时确认充值金额。<br>
              4.请正确填写您的微信昵称和充值金额。微信昵称并非微信账号，请注意区分。<br>
              5.请务必转账后再提交订单，否则无法及时查到您的款项！转账1笔提交1次，请勿重复提交订单。<br>
              6.可以使用其他手机扫二维码进行充值，也可以将二维码保存到相册再使用微信识别相册中的二维码进行充值，由于本二维码经常更换，充值前务必重新保存最新的二维码。<br>
            </template>
            <template v-if="method==='QQpay'">
              1、扫一扫以上二维码进行充值。<br>
              2、请正确填写您的昵称和充值金额。<br>
              3、QQ昵称并非QQ账号，请注意区分。<br>
              4、可以使用其他手机扫二维码进行充值，也可以将二维码保存到相册再使用QQ识别相册中的二维码进行充值，由于本二维码经常更换，充值前务必重新保存最新的二维码。<br>
              5、请务必转账后再提交订单,否则无法及时查到您的款项！
            </template>
            <template v-if="method==='UnionPay'">
              1、扫一扫以上二维码进行充值。<br>
              2、请正确填写您的姓名和充值金额。<br>
              3、姓名并非账号，请注意区分。<br>
              4、可以使用其他手机扫二维码进行充值，也可以将二维码保存到相册再使用银联APP识别相册中的二维码进行充值，由于本二维码经常更换，充值前务必重新保存最新的二维码。<br>
              5、请务必转账后再提交订单,否则无法及时查到您的款项！
            </template>
            <template v-if="method==='Alipay'">
              1.请使用支付宝转账到以上账户。<br>
              2.若提供的是二维码，请使用支付宝扫一扫进行转账。若提供的是支付宝账号或银行账号，请使用支付宝转账到银行卡的方式进行转账。<br>
              3.请正确填写您的姓名和充值金额。设置了支付宝昵称的请直接填写昵称。<br>
              4.请务必转账后再提交订单，否则无法及时查到您的款项！转账1笔提交1次，请勿重复提交订单。<br>
              5.可以使用其他手机扫二维码进行充值，也可以将二维码保存到相册再使用支付宝识别相册中的二维码进行充值，由于本二维码经常更换，充值前务必重新保存最新的二维码。<br>
            </template>
          </template>
          <template v-else>
          1、扫一扫弹出的二维码进行充值。
          <br>2、单笔充值金额最低<ins>{{this.nowRender.MinMoney}}</ins>元，最高<ins>{{this.nowRender.MaxMoney}}</ins>元。
          <br> 3、可以使用其他手机扫二维码进行充值，也可以将二维码保存到相册再使用{{this.$route.meta.title}}识别相册中的二维码进行充值，该二维码仅当次有效，每次充值前务必重新保存最新的二维码。
          <br>
          4、{{payMsg[method]?'充值金额请输入整数。':'为了更准确核对您的金额，系统会随机为整数金额添加小数点。'}}
          </template>
        </div>
      </template>
        <!-- 银行转帐Bank-->
      <template v-if= "method =='Bank'">
        <table>
          <tr>
            <td>选择银行</td>
            <td>
              <select v-model = "Id" @change = "changeBankAccount">
                <option v-for = "option in Bank" :value = "option.Id">{{option.BankName}}</option>
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
      </template>
      <!-- 快捷二维码 -->
      <div id="iframeWrap" v-show="QrBg&&PayType!='一般'">
        <div v-show="QrSvg" class="QrBox">
          <div class="qrStyle">
            <h3>充值金额:¥{{Money}}</h3>
            <div id="qrcode" ref="qrcode" style="text-align:center"></div>
          </div>
          <!-- <div class="loginBtn BTN" @click="close"><a>关闭</a></div> -->
          <div class="tips">
            温馨提示：支付成功后，会在一分钟内为您添加额度，请刷新您的账户余额!
          </div>
        </div>
        <!-- <iframe id="ifra" :src="QrImg" frameborder="0" :style="css[(method=='Weixin'&&PayType=='众宝')?'众宝WX':(method=='Alipay'&&PayType=='智汇付')?'智汇付':PayType]" v-show="!QrSvg&&QrImg"></iframe> -->
        <iframe id="ifra" :src="QrImg" frameborder="0" :style="Styles" v-show="!QrSvg&&QrImg"></iframe>
      </div>
    </template>
  </div>
</template>
<script>
var payTitle = {
  Bank: '银行转账',
  Weixin:'微信支付',
  Alipay: '支付宝',
  QQpay: 'QQ钱包',
  UnionPay: '银联扫码'
}
var payName={
  Alipay:['支付宝姓名'],
  Weixin:['微信昵称'],
  QQpay:['QQ昵称','钱包昵称','钱包帐号'],
  UnionPay:['您的姓名','银联姓名','银联帐号']
}
// var OType=['金付卡','智汇付']//新开窗口数组
export default {
  data(){
      return{
        method:'',//页面类型
        Bank:[],
        Id:'',
        // BankCode:'',
        nowRender:{},
        PayType:null,//充值类型或一般
        underMaintain:false,
        isSupportCopy: !!document.execCommand,
        QrImg:'',
        QrBg:false,
        QrSvg:false,
        isOpenType:'',
        Styles:'',
        //AJAX
        PayUser: '',
        Money: '',
        payMsg:{
                Weixin:true,
                Alipay: true,
                QQpay: false,
                UnionPay: false
              }
      }
  },
  beforeRouteEnter(to,from,next){
    if(!payTitle[to.params.ID]){
      router.push('/notfound')
    }
    var method=to.params.ID
    to.meta.title = payTitle[method]
    var rechargeWay = 'RechargeWay' + method
    //获取数据
    RootApp.GetInitData([rechargeWay], state=>{
      var json=state[rechargeWay]
      //测试数据
      
      var PayType =json&&json[0].PayType
        // if(typeof(QRCode)==="undefined"){
        //   var warn=document.createElement('script')
        //   warn.src='/static/public/qrcode.min.js'
        //   var first=document.body.firstChild
        //   document.body.insertBefore(warn,first)
        // }
        next(vm=>{
            RootApp.setTitle(state.SiteConfig.Name,payTitle[method])
            vm.method=method
            vm.PayType=PayType
            if(!json || !json[0]){
                vm.underMaintain = true
                return
            }
            vm.nowRender = json[0]
            vm.isOpenType=json[0].OpenType||json[0].Opentype
            vm.Id = json[0].Id;
            if(method =='Bank'){
                vm[method] = Object.freeze(json)
                // vm.BankCode = json[0].BankCode;
            }else{              
              vm.nowRender.CodeImg = vm.setImgUrl(json[0].CodeImg)
            }
            vm.underMaintain = false
            vm.Bank=json
            vm.vaConfig ||(vm.vaConfig = {})
            vm.vaConfig['Money'] || (vm.vaConfig['Money'] = [])
            var Min=json[0].MinMoney,
                Max=json[0].MaxMoney
            vm.vaConfig['Money'].push(new vm.VaConfig('limit', [Min,Max], '', 'Money', payTitle[method]))

        })
    //   请求结束
    })
  },
  computed:{
    payName(){
      return payName[this.method]
    },
    pageName () {
      return payTitle[this.method]
    }
  },
  methods:{
      //切换充值银行
    changeBankAccount(){
      this.Bank.forEach(item=>{
        if(item.Id === this.Id){
          this.nowRender = item
        }
      })
    },
    setQort(n){
      return this.PayType=='一般'?n[0]:n[1]
    },
    close(){
      this.QrImg=''
      this.QrBg=false
      this.QrSvg=false
      this.$refs.qrcode.innerHTML=""
    },
    // setQrCode(url){
    //   var qrcode = new QRCode('qrcode');
    //   qrcode.makeCode(url)
    // },
    changeBank(){
      this.Bank.forEach(item=>{
        if(item.Id === this.Id){
          this.PayType = item.PayType
          this.isOpenType=item.OpenType||item.Opentype
          this.nowRender = item
          this.nowRender.CodeImg = this.setImgUrl(item.CodeImg)
          this.vaConfig = {}
          this.vaConfig['Money'] || (this.vaConfig['Money'] = [])
          var Min=this.nowRender.MinMoney,
              Max=this.nowRender.MaxMoney
          this.vaConfig['Money'].push(new this.VaConfig('limit', [Min,Max], '', 'Money', payTitle[this.method]))
        }
      })
    },
    setImgUrl(CodeImg){
      var xurl = ''
          if(CodeImg === '0'||!CodeImg){
            xurl = '/../system/common/other/noQRcode.png'
          }else{
            xurl = CodeImg
          }
      // return xurl.indexOf("http://img-google.com:8088")===-1?("http://img-google.com:8088" + xurl):xurl//本地测试
      return xurl.indexOf(state.constant.ImgHost)===-1?(state.constant.ImgHost + xurl):xurl
    },
    // 提交数据
    $vaSubmit(){
      var ajax = {
        Bank:2,//银行转账
        Weixin:this.setQort([4,5]),//微信支付
        Alipay:this.setQort([3,6]),//支付宝
        QQpay:this.setQort([7,8]),//QQ钱包
        UnionPay:this.setQort([9,10])//银联扫码
      },
      ajaxObj={
          Action:'Recharge',
          Qort:2,
          PayUser:'',
          Money:0,
          ID:1,
          BankCode:''
        },
      newTab=null
      ajaxObj.Qort=ajax[this.method]
      var nowAjax = ajaxObj
      if(this.PayType=='一般'||this.method === 'Bank'){
        nowAjax.PayUser = this.vaVal.PayUser
      }else{
        //判断是否小数
        function isDic(n){
          n=n*1
          console.log(n);
          if(Math.floor(n)===n){
            // return n+0.12
            return (Math.random()/20+0.01+n).toFixed(2)*1
          }else{
            return false
          }
        }
        var DIC=isDic(this.vaVal.Money)
        if(DIC){
          if(DIC>this.nowRender.MaxMoney){
            DIC=2*this.nowRender.MaxMoney-DIC
          }
          this.Money=DIC
          this.vaVal.Money=DIC
          var vm=this
          layer.confirm('为了更准确核对您的金额，<br>系统已将充值金额调整为:<br><span style="color:red">'+DIC+'</span>',['确定','取消'],function(){
            vm.$vaSubmit()
          })
          return
        }
        // if(this.isOpenType==4){
        //   // if(nowAjax.BankCode!=='智汇付'&&nowAjax.Qort===6){
        //   newTab=YDB?true:window.open('about:blank')
        //   console.log('新开窗口');
        //   // }
        // }
        this.QrBg=true
      }
      nowAjax.Money = this.vaVal.Money
      nowAjax.ID = this.nowRender.Id
      // if(this.PayType!='一般'){
        // nowAjax.BankCode = this.nowRender.PayType
      // }
      if(this.method === 'Bank'){
        nowAjax.ID = this.Id
      }else{
        nowAjax.BankCode = 0
      }
      layer.msgWait("正在提交")
      _fetch(nowAjax).then((json)=>{
        if(this.PayType=='一般'||this.method === 'Bank'){
          this.PayUser = ''
          this.Money = ''
          if(json.Code === 1){
            layer.msg(json.StrCode);
          }else{
            layer.msgWarn(json.StrCode);
          }
        }else{
          if(json.Code === 1){
            var OpenType=this.isOpenType
            layer.closeAll()
            switch(OpenType){
              case 1:
                this.QrImg=json.BackUrl
                this.Styles=json.Style
                this.Money = ''
              break;
              case 2:
              case 3:
              case 4:
                this.QrImg=''
                this.QrBg=false
                if (_App) {
                  RootApp.OpenWin(json.BackUrl, newTab)
                }else{
                  location.href=json.BackUrl
                }
              break;
            }                     
          }else{
            // newTab&&newTab.close()
            this.QrBg=false
            this.Money=''
            layer.msgWarn(json.StrCode)
          }
        }
      })
    }
  }
}


</script>
<style lang = "scss" scoped>
  @import '../scss/securityCenter.scss';
  #iframeWrap{
    position:absolute;
    z-index:5;
    background:#fff;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    top:0;
    left:0
  }
  iframe{
    position:relative;
    padding-top:2.5em;
    margin-left:8rem;
    width:1000px;
    height:920px
  }
  .QrBox{
    position: absolute;
    width: 100%;
    height: 100%;
    .qrStyle{
      z-index: 10;
      width:13em;
      margin:20% auto;
      h3{
        text-align: center;
        margin-bottom:.5em;
      }
    }
  }
</style>
<style>
  #qrcode img{margin:auto;}
</style>
