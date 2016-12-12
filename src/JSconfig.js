var _FomatConfig = {
	ImgCode: {
		Name: "验证码",
		Reg: /^[0-9a-zA-Z]{4}$/,
		ErrMsg:"验证码为4位字母数字的组合!",
	},
	SmsCode: {
		Name: "短信验证码",
		Reg: /^\d{4}$/
	},
	MailCode:{
		Name: "邮箱验证码",
		Reg: /^\d{4}$/
	},
	UserName: {
		Name: "账号",
		ErrMsg:"账号应为4-15个字符，可使用字母、数字，禁止以0开头",
		Reg: /^[\w|\d]{4,16}$/
	},
	Password: {
		Name: "密码",
		ErrMsg:"密码应为6-16位字符",
		Reg: /^[\w!@#$%^&*.]{6,16}$/
	},
	Mobile: {
		Name: "手机号",
		ErrMsg:"请输入13|15|18开头的11位手机号码",
		Reg: /^1[3|5|8]\d{9}$/,
	},
	RealName: {
		Name: "姓名",
		Reg: /^[\u4e00-\u9fa5 ]{2,10}$/,
	},
	BankNum: {
		Name: "银行卡号",
		Reg: /^\d{10,19}$/
	},
	Money: {
		Name: "金额",
		Reg: /^\d{1,}(\.\d{1,2})?$/,
		Between: [100, 500000] //100~50w之间
	},
	Mail:{
		Name:"邮箱",
		Reg:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
	}
}

module.exports = {
  constant:{
    ImgHost: '//images.dafa176.com',
    PhotoPath: '/system/common/headimg/',
    DefPhoto: 'defaultHeadImg.png'
  },
  color:{
    blue:'#38f',
    red:'red'
  },
  tpl:{
  	noData:["<div class='fullPageMsg'><div class='fullPageIcon iconfont'>&#xe63c;</div><p>','</p></div>"],
  	load:'<svg class="svgLoad" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-default"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(0 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(30 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.08333333333333333s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(60 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.16666666666666666s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(90 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.25s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(120 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.3333333333333333s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(150 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.4166666666666667s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(180 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(210 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5833333333333334s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(240 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.6666666666666666s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(270 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.75s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(300 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.8333333333333334s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(330 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.9166666666666666s" repeatCount="indefinite"/></rect></svg>'
  },
  turning:false,//是否在路由切换中
  _FomatConfig: Object.freeze(_FomatConfig),
  DAY_TIME: 24 * 60 * 60 * 1000,
  HOUR_TIME: 60 * 60 * 1000,
  MINUTE_TIME: 60 * 1000,
  SECOND_TIME: 1000,
  GMT_DIF:new Date().getTimezoneOffset()*60*1000,
  Difftime: localStorage.getItem('Difftime') || null,
  PERBET: 2,    //每注2元
  Max_Rate:10000,   //最大倍数
  Max_Chase_Issue: 50 , //追号最大期数
  Max_Expect_Rate: 20000, //追号最大预期盈利率限制
}