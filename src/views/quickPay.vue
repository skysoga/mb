<template>
<div>
 <div class="main" v-if= "!underMaintain ">
    <input name="GetMoneyUser" type="hidden" value="" readonly="readonly">
    <table>
      <tr>
        <td>充值金额</td>
        <td><input  type="tel" tag = "充值金额" v-va:Money v-model = 'Money'  placeholder="请输入充值金额"></td>
      </tr>
      <tr></tr>
    </table>
    <div class="loginBtn BTN"><a v-va-check>提交</a></div>
    <div class="tips">
       1、扫一扫弹出的二维码进行充值。<br>
	     2、可以使用其他手机扫二维码进行充值，也可以将二维码保存到相册再使用微信识别相册中的二维码进行充值，该二维码仅当次有效，每次充值前务必重新保存最新的二维码。<br>
    </div>
  </div>
	<div class="fullPageMsg" v-if = "underMaintain">
    <div class="fullPageIcon iconfont">&#xe626;</div>
    <p>{{pageName}}维护中···<br/>请使用其他充值方式！</p>
  </div>
  <div v-if="QrImg" style="position: absolute;overflow-x: hidden;z-index: 5; background: rgb(255, 255, 255); width: 100%; height: 100%; overflow-y: scroll; top: 0px; left: 0px;">
    <iframe :src="QrImg" frameborder="0" style="position: relative; margin-left: 160px; width: 1000px; height: 100%; margin-top: 0px; left: -500px;"></iframe>
  </div>
</div>
</template>

<script>
export default {
	beforeRouteEnter(to, from, next){
		var title = {
      Weixin:'微信支付',
      Alipay: '支付宝'
    }
    var method = to.query.method 			//'Bank', 'Weixin', 'Alipay'
    var rechargeWay = 'RechargeWay' + method

    to.meta.title = title[method]   //标题
		//获取数据
		RootApp.AjaxGetInitData([rechargeWay], state=>{
			//如果数据不对要跳到普通充值去
			var PayType = state[rechargeWay]&&state[rechargeWay][0].PayType
			if(PayType === '一般'){
				RootApp.$router.push('/normalPay?method=' + method)
			}

			next(vm=>{
				//如果没数据进维护页
				if(!state[rechargeWay] || !state[rechargeWay][0]){
					vm.underMaintain = true
					return
				}

				vm.underMaintain = false
				vm.nowRender = state[rechargeWay][0]
			})
		})
	},
	data () {
		return {
			method: '',								//什么充值方式
			pageName: '',							//维护的名字
			underMaintain: false,			//是否维护
      QrImg:'',
			//当前
			nowRender:{},
			limit:'',
			//ajax
			Money: '',
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
	created (){
		var method = this.$route.query.method 			//'Bank', 'Weixin', 'Alipay'
		this.method = method
		var rechargeWay = 'RechargeWay' + method
		var limitName = {
			Weixin: '微信快捷',
			Alipay: '支付宝快捷'
		}

		//获取数据
		RootApp.AjaxGetInitData(['PayLimit'], state=>{
			//设置金额的限制
			this.vaConfig ||(this.vaConfig = {})
			this.vaConfig['Money'] || (this.vaConfig['Money'] = [])
			var limit;
			state['PayLimit'].forEach(item=>{
				if(item.PayName === limitName[method]){
					limit = [item.MinMoney, item.MaxMoney]
				}
			})
			this.vaConfig['Money'].push(new this.VaConfig('limit', limit, '', 'Money', limitName[method]))
		})
	},
	methods:{
		$vaSubmit () {
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

			_fetch(nowAjax).then((json)=>{
    		this.Money = ''
    		if(json.Code === 1){
					layer.msgWarn(json.StrCode);
          this.QrImg=json.BackUrl
    		}else{
    			layer.msgWarn(json.StrCode);
    		}
      })
		},

	}
}
</script>

<style lang = "scss">
	@import '../scss/securityCenter.scss';
</style>
