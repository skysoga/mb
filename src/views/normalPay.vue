<template>
  <div class="main">
    <table>
      <tr>
        <td>选择银行</td>
        <td>
          <select v-model = "nowItem" @change = "changeBankAccount">
          	<option v-for = "option in Bank" :value = "option.BankCode">{{option.BankName}}</option>
          </select>
          <i class="iconfont unfold"></i>
        </td>
      </tr>

      <tr>
        <td>收款户名</td>
        <td><input class="cGold" type="text" :value = "nowRender.RealName"  readonly="readonly"><i class="iconfont copy">复制</i></td>
      </tr>
      <tr>
        <td>收款账号</td>
        <td><input class="cGold" type="text" :value = "nowRender.CardNum"  readonly="readonly"><i class="iconfont copy">复制</i></td>
      </tr>
      <tr>
        <td>开户支行</td>
        <td><input class="cGold" type="text" :value = "nowRender.BankStore" readonly="readonly"><i class="iconfont copy">复制</i></td>
      </tr>
      <tr>
        <td>充值金额</td>
        <td><input type="tel" name="Money" placeholder="请输入充值金额"></td>
      </tr>
      <tr>
        <td>银行账户</td>
        <td><input type="text" name="PayUser" placeholder="请输入您的银行账户"></td>
      </tr>
    </table>
    <div class="loginBtn BTN"><a>提交</a></div>
    <div class="tips">
      1、请转账到以上银行账户。<br>
      2、请正确填写您的户名和充值金额。<br>
      3、转账1笔提交1次，请勿重复提交订单。<br>
      4、请务必转账后再提交订单,否则无法及时查到您的款项！
    </div>
      <!-- 单笔最低充值金额为<ins id = "minMoney"></ins>元，最高<ins id = "maxMoney"></ins>元。<br/> -->
      <!-- 已删除 脚本需要对应改 -->
  </div>
	
</template>

<script>
import rootApp  from "../main.js"
export default{
	beforeRouteEnter(to, from, next){
		var shouldCheck = ['Weixin', 'Alipay']
		var method = to.query.method;
		var rechargeWay = 'RechargeWay' + method
		var title = {
      '/normalPay':{
        Bank: '银行转账',
        Weixin:'微信支付',
        Alipay: '支付宝'
      },
      '/quickPay':{
        Weixin: '微信快捷',
        Alipay: '支付宝快捷'
      }
    }

    to.meta.title = title[to.path][to.query.method]   //下一页的标题
		//获取数据
		rootApp.AjaxGetInitData(['PayLimit', rechargeWay], state=>{
			if(shouldCheck.indexOf(method) > -1){
				var PayType = state[rechargeWay][0].PayType
				//假如充值方式为快捷充值了，就跳转至快捷充值
				if(PayType !== '一般'){
					rootApp.$router.push('/quickPay?method=' + method)
				}
			}

			next(vm=>{
				vm.method = method
				if(method === 'Bank'){
					vm[method] = Object.freeze(state[rechargeWay])
					var BankCode = state[rechargeWay][0].BankCode
					vm.nowItem = BankCode;
					vm.nowRender = state[rechargeWay][0]
					console.log(vm.nowRender)
				}else{
					vm[method] = Object.freeze(state[rechargeWay][0])
				}
			})
		})

	},

	data () {
		return {
			method: 'Bank',

			//页面的渲染数据
			Bank:[],
			Weixin:{},
			Alipay:{},

			//当前
			nowItem:'',
			nowRender:{},

			//ajax数据
			ajax:{
				//银行转账
				Bank:{
					Action:'Recharge',
					Qort:2,
					Money:0,
					PayUser:'',
					ID:1,
					BankCode:'',
				},
				//微信支付
				Weixin:{
					Action:'Recharge',
					Qort:4,
					Money:0,
					PayUser:'',
					ID:1,
				},
				//支付宝
				Alipay:{
					Action:'Recharge',
					Qort:3,
					Money:0,
					PayUser:'',
					ID:1,
				}
			},
		}
	},
	created () {
		

	},
	methods:{
		//切换充值银行
		changeBankAccount (){
			this.Bank.forEach(item=>{
				if(item.BankCode === this.nowItem){
					this.nowRender = item;
				}
			})
		}
	}
}
</script>

<style lang = "scss" scoped>
	@import '../scss/securityCenter.scss';
</style>