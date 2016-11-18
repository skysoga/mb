<template>
  <div class="main" >
    <table>
      <tr>
        <td>选择银行</td>
        <td>
          <select name="GetMoneyBank"></select>
          <i class="iconfont unfold"></i>
        </td>
      </tr>
      <tr>
        <td>收款户名</td>
        <td><input class="cGold" type="text" name="RealName" readonly="readonly"><i class="iconfont copy">复制</i></td>
      </tr>
      <tr>
        <td>收款账号</td>
        <td><input class="cGold" type="text" name="CardNum" readonly="readonly"><i class="iconfont copy">复制</i></td>
      </tr>
      <tr>
        <td>开户支行</td>
        <td><input class="cGold" type="text" name="BankStore" readonly="readonly"><i class="iconfont copy">复制</i></td>
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
import interviewApp  from "../main.js"
export default{
	data () {
		return {
			a: 1
		}
	},
	created () {
		

	}
}
</script>

<style lang = "scss" scoped>
	@import '../scss/securityCenter.scss';
</style>