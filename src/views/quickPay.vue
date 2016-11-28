<template>
<div>
 <div class="main" v-if= "!underMaintain ">
    <input name="GetMoneyUser" type="hidden" value="" readonly="readonly">
    <table>
      <tr>
        <td>充值金额</td>
        <td><input  type="tel" tag = "充值金额" v-va:Money  v-model = 'Money'  placeholder="请输入充值金额"></td>
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
</div>
</template>

<script>
import {interviewApp}  from "../main.js"
export default {
	beforeRouteEnter(to, from, next){
		var title = {
      Weixin:'微信支付',
      Alipay: '支付宝'
    }

    to.meta.title = title[to.query.method]   //标题
    next()
	},
	data () {
		return {
			method: '',								//什么充值方式
			pageName: '',							//维护的名字
			underMaintain: false,			//是否维护

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
		interviewApp.AjaxGetInitData(['PayLimit', rechargeWay], state=>{
			//如果没数据进维护页
			if(!state[rechargeWay] || !state[rechargeWay][0]){
				this.underMaintain = true
				return
			}

			//如果数据不对要跳到普通充值去
			var PayType = state[rechargeWay][0].PayType
			if(PayType === '一般'){
				interviewApp.$router.push('/normalPay?method=' + method)
			}
			
			this.underMaintain = false
			this.nowRender = state[rechargeWay][0]

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
			nowAjax.BankCode = this.nowRender.PayType

			_fetch(nowAjax).then((res)=>{
      	res.json().then((json) => {
      		this.Money = ''
      		if(json.Code === 1){
						layer.msgWarn(json.StrCode);      			
      		}else{
      			layer.msgWarn(json.StrCode);
      		}
      	})
      })
		},

	}
}
</script>

<style lang = "scss">
	@import '../scss/securityCenter.scss';
</style>