<template>
  <div class="main">
    <table>
      <!-- <tr>
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
        <td>
		        <input class="cGold" 
						       type="text" 
        					 v-va:imgcode = "[{nonvoid:true}]">
        					 <i class="iconfont copy">复制</i>
				</td>
      </tr> -->
      <tr>
        <td>收款账号</td>
        <td>
        	<input class="cGold" 
				         type="text" 
				         v-va:ImgCode.ImgCode = "[{nonvoid:true}]"
                 va-tag = "收款账户">
        	<i class="iconfont copy">复制</i>
      	</td>
      </tr>
      <tr>
        <td @click = "add">开户支行</td>
        <td>
	        <input class="cGold" 
				         type="text" 
				         v-va:Password.canNull = "[{limit:[12345, 100000]},{equal:'name'}]"
                 va-tag = "开户支行">
	        <i class="iconfont copy">复制</i>
        </td>
      </tr>
     <!--  <tr>
        <td>充值金额</td>
        <td><input type="tel"  placeholder="请输入充值金额"></td>
      </tr>
      <tr>
        <td>银行账户</td>
        <td><input type="text"  placeholder="请输入您的银行账户"></td>
      </tr> -->
    </table>
    <div class="loginBtn BTN"><a @click = "baobao" v-va-check>提交</a></div>
      <!-- 单笔最低充值金额为<ins id = "minMoney"></ins>元，最高<ins id = "maxMoney"></ins>元。<br/> -->
      <!-- 已删除 脚本需要对应改 -->
  </div>
	
</template>

<script>

export default{
	data (){
		return {
			condi:'[{nonvoid:true},{reg:/\d{8}/},{max:892}]'
		}
	},
	mounted (){
    // this.$va_setErrMsg('password', 'nonvoid', '请再次输入密码')
    // console.log(this.vaConfig)
	},
	methods:{
		baobao (){

			// this.vaConfig['password'][0].msg = '输入不能为空'
			// console.log(this.vaConfig)
		},
		add (){
			// this.vaConfig['password'].push({min:12})
			// console.log(this.vaConfig['password'])
		}
	}
}
</script>

<style lang = "scss" scoped>
	@import '../scss/securityCenter.scss';
</style>