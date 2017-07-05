<template>
  <div class="main">
    <div class="fullPageMsg" v-if="underMaintain">
      <div class="fullPageIcon iconfont">&#xe626;</div>
      <p>{{pageName}}维护中···
        <br/>请使用其他充值方式！</p>
    </div>
    <template v-else>
      <table>
        <tr>
          <td>充值金额</td>
          <td>
            <input type="tel" tag="充值金额" v-va:Money v-model.trim='Money' placeholder="请输入充值金额">
          </td>
        </tr>
        <tr></tr>
      </table>
      <div class="loginBtn BTN"><a v-va-check>确定</a></div>
      <div class="tips">
        1、扫一扫弹出的二维码进行充值。
        <br> 2、可以使用其他手机扫二维码进行充值，也可以将二维码保存到相册再使用{{this.$route.meta.title}}识别相册中的二维码进行充值，该二维码仅当次有效，每次充值前务必重新保存最新的二维码。
        <br>
      </div>
    </template>
    <div id="iframeWrap" v-show="QrBg">
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
      <iframe id="ifra" :src="QrImg" frameborder="0" :style="css[(method=='Weixin'&&PayType=='众宝')?'众宝WX':PayType]" v-show="!QrSvg"></iframe>
    </div>
  </div>
</template>
<script>
var OType=['金付卡']//新开窗口数组
export default {
  beforeRouteEnter(to, from, next){
    var title = {
      Weixin:'微信支付',
      Alipay: '支付宝'
    }
    var method = to.query.method       //'Bank', 'Weixin', 'Alipay'
    var rechargeWay = 'RechargeWay' + method

    to.meta.title = title[method]   //标题
    var rechargeWay = 'RechargeWay' + method
    var limitName = {
      Weixin: '微信快捷',
      Alipay: '支付宝快捷'
    }

    //获取数据
    RootApp.GetInitData([rechargeWay,'PayLimit'], state=>{
      //如果数据不对要跳到普通充值去
      var PayType =state[rechargeWay]&&state[rechargeWay][0].PayType

      if(PayType && PayType === '一般'){
        router.replace('/normalPay?method=' + method)
      }else{

        if(typeof(QRCode)==="undefined"){
          var warn=document.createElement('script')
          warn.src='/static/public/qrcode.min.js'
          var first=document.body.firstChild
          document.body.insertBefore(warn,first)
        }
        next(vm=>{
          //如果没数据进维护页
          vm.method = method
          vm.PayType=PayType
          if(!state[rechargeWay] || !state[rechargeWay][0]){
            vm.underMaintain = true
            return
          }
          vm.underMaintain = false
          vm.nowRender = state[rechargeWay][0]
          vm.vaConfig ||(vm.vaConfig = {})
          vm.vaConfig['Money'] || (vm.vaConfig['Money'] = [])
          var limit=state['PayLimit'][limitName[method]]
          vm.vaConfig['Money'].push(new vm.VaConfig('limit', limit, '', 'Money', limitName[method]))
        })
      }
    })
  },
  data () {
    return {
      method: '',                //什么充值方式
      PayType:null,
      pageName: '',              //维护的名字
      underMaintain: false,      //是否维护
      QrImg:'',
      QrBg:false,
      QrSvg:false,
      //当前
      nowRender:{},
      limit:'',
      //ajax
      Money: '',
      css:{
        '通汇卡':{
          'margin-top':2.5*em-100+'px',
          'left':'-500px'
        },
        '银宝':{
          'margin-top':2.5*em-235+'px',
          'left':'-499px'
        },
        '闪付':{
          'margin-top':2.5*em-40+'px',
          'left':'-500px',
          '-webkit-transform':'scale(.4)',
          '-ms-transform':'scale(.4)',
          '-moz-transform':'scale(.4)',
          'transform':'scale(.4)',
          '-webkit-transform-origin':'center 100px',
          '-moz-transform-origin':'center 100px',
          '-ms-transform-origin':'center 100px',
          'transform-origin':'center 100px'
        },
        '乐盈':{
          'margin-top':2.5*em+'px',
          'left':'-574px'
        },
        '摩宝':{
          'margin-top':2.5*em-100+'px',
          'left':'-500px'
        },
        '易卡':{
          'margin-top':2.5*em-140+'px',
          'left':'-500px'
        },
        '久付':{
          'margin-top':2.5*em-140+'px',
          'left':'-500px'
        },
        '仁信':{
          'margin-top':2.5*em-140+'px',
          'left':'-300px'
        },
        'AUSTPAY':{
          'margin-top':2.5*em+'px',
          'left':'-156px'
        },
        '闪讯付':{
          'margin-top':2.5*em-290+'px',
          'left':'-500px',
          '-webkit-transform':'scale(.5)',
          '-ms-transform':'scale(.5)',
          '-moz-transform':'scale(.5)',
          'transform':'scale(.5)',
        },
        '快支付':{
          'margin-top':2.5*em-290+'px',
          'left':'-500px',
          '-webkit-transform':'scale(.5)',
          '-ms-transform':'scale(.5)',
          '-moz-transform':'scale(.5)',
          'transform':'scale(.5)',
        },
        '新摩宝':{
          'margin-top':2.5*em-100+'px',
          'left':'-500px'
        },
        '立刻付':{
          'margin-top':2.5*em-290+'px',
          'left':'-500px',
          '-webkit-transform':'scale(.7)',
          '-ms-transform':'scale(.7)',
          '-moz-transform':'scale(.7)',
          'transform':'scale(.7)',
        },
        '众宝':{
          'margin-top':2.5*em-225+'px',
          'left':'-200px',
          '-webkit-transform':'scale(1.1)',
          '-ms-transform':'scale(1.1)',
          '-moz-transform':'scale(1.1)',
          'transform':'scale(1.1)',
        },
        '众宝WX':{
          'margin-top':2.5*em-250+'px',
          'left':'-226px',
          '-webkit-transform':'scale(1)',
          '-ms-transform':'scale(1)',
          '-moz-transform':'scale(1)',
          'transform':'scale(1)',
        },
        '云安付':{
          'margin-top':2.5*em-100+'px',
          'left':'-500px',
        },
        '元宝':{
          'margin-top':2.5*em-80+'px',
          'left':'-500px',
        },
        '高通':{
          'margin-top':2.5*em-235+'px',
          'left':'-490px',
        }
      }
    }
  },
  computed:{
    pageName () {
      var _name= {
        Weixin: '微信支付',
        Alipay: '支付宝充值'
      }
      return _name[this.method]
    }
  },
  methods:{
    $vaSubmit () {
      this.QrBg=true
      var vm=this
      //ajax数据
      var ajax = {
        //微信支付
        Weixin:{
          Action:'Recharge',
          Qort:5,
          PayUser:'',
          Money:0,
          ID:1,
          BankCode:0
        },
        //支付宝
        Alipay:{
          Action:'Recharge',
          Qort:6,
          PayUser:'',
          Money:0,
          ID:1,
          BankCode:0
        }
      }
      var nowAjax = ajax[this.method]
      nowAjax.Money = this.vaVal.Money
      nowAjax.ID = this.nowRender.Id
      nowAjax.BankCode =this.nowRender.PayType

      if(OType.indexOf(nowAjax.BankCode)!==-1&&!YDB){
        var newTab=window.open('about:blank')
      }

      layer.msgWait("正在提交")
      _fetch(nowAjax).then((json)=>{
        if(json.Code === 1){
          var OpenType=json.OpenType
          this.QrImg=json.BackUrl
          layer.closeAll()
          if(OType.indexOf(nowAjax.BankCode)>-1){
            OpenType=4
          }
          if(OpenType===1){
            this.Money = ''
          }else if(OpenType===4){
            this.QrBg=false
            RootApp.OpenWin(json.BackUrl, newTab)
            this.Money = ''
          }else{
            this.QrSvg=true
            if(OpenType===3){
              var qrcode=document.getElementById("qrcode")
              var img=document.createElement("img")
              img.src=this.QrImg
              img.width='260'
              qrcode.appendChild(img)
            }else if(OpenType===2){
              this.setQrCode(json.BackUrl)
            }
          }
        }else{
          this.QrBg=false
          this.Money=''
          layer.msgWarn(json.StrCode)
        }
      })
    },
    close(){
      this.QrImg=''
      this.QrBg=false
      this.QrSvg=false
      this.$refs.qrcode.innerHTML=""
    },
    setQrCode(url){
      var qrcode = new QRCode('qrcode');
      qrcode.makeCode(url)
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
