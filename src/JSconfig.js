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
  	noData:["<div class='fullPageMsg'><div class='fullPageIcon iconfont'>&#xe63c;</div><p>','</p></div>"]
  },
  _FomatConfig: Object.freeze(_FomatConfig),
  DAY_TIME: 24 * 60 * 60 * 1000,
  HOUR_TIME: 60 * 60 * 1000,
  MINUTE_TIME: 60 * 1000,
  SECOND_TIME: 1000,
  GMT_DIF:new Date().getTimezoneOffset()*60*1000
}