import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { mapState } from 'vuex'
import App from './App'
Vue.use(VueRouter)
Vue.use(Vuex)


const _AJAXUrl = '/tools/ssc_ajax.ashx'
const routes = require('./routes.js')
const router = new VueRouter({
	routes,
	mode:'history',
	linkActiveClass:"on",
	// exact: true
});


var UserArr=[
	'UserName',
	'UserHasSafePwd', //返回是否已经设置安全密码,1为有,0为没有设置
	'UserSafeQuestions', //返回设置的密保问题,如果没设置可以返回0或者空数组
	'UserMobile', //返回已绑定手机的模糊状态,如未绑定,返回空字符串或0
	'UserMail', //返回已绑定手机的模糊状态,如未绑定,返回空字符串或0
	'UserName', //返回对应的账号,未登录用户返回空字符串
	'UserPhoto', //返回用户头像的图片地址
	'UserNickName',
	'UserFirstCardInfo', //返回绑定的第一张银行卡的模糊信息
	'AgentRebate',//获取代理人返点情况
	'UserUpGradeBonus'
]
var SiteArr=[ //需要校验更新版本的列表
  'LotteryConfig', //所有彩种列表
  'LotteryList', //所有彩种信息
  'ActivityConfig', //活动种类及数据
  'GradeList',//等级体系
  'RewardData',//每日加奖设置
  'BannerList',
  'DefaultPhotoList',
  'PayLimit',
  'SiteConfig',
  'NoticeData',
]
var CacheArr = SiteArr.concat(UserArr)
var state = require('./JSconfig.js')
;(function(){
	function getLocalDate(s){
		s = localStorage.getItem(CacheArr[i]);
		try{
			s = JSON.parse(s);
		}catch(e){}
		return s;
	}
  for (var i = CacheArr.length - 1; i >= 0; i--) {
  	state[CacheArr[i]]=getLocalDate(CacheArr[i])
  }
})()
const store = new Vuex.Store({
  state,
  getters:{
  	PhotoPath:state=>state.constant.ImgHost+state.constant.PhotoPath,
  	WithdrwHtml:state=>{
  		//判断提现去处的逻辑写在这里
  		return "login"
  	}
  },
  mutations: {
  	SaveInitData: (state,Data) => {
  		for(var k in Data){
				state[k] = Data[k]
  			if(CacheArr.indexOf(k)+1){
  				if (Data[k]===null) {
				    Data[k]=''
  				}else if (typeof(Data[k])=='object') {
				    Data[k]=JSON.stringify(Data[k]);
  				}
			    localStorage.setItem(k,Data[k]);
  			}
  		}
  	}
  }
})

var _FomatConfig = {
	ImgCode: {
		Name: "验证码",
		Reg: /^[0-9a-zA-Z]{4}$/,
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

const interviewApp = new Vue({
	el: '#app',
	store,
	router,
	watch: {
		$route(to,from){
			console.log("监听路由已经变化");
			// console.log(this.$route);
		}
	},
	methods:{
		Login:function(UserName,fun){
			this.GetInitData(UserArr,fun)
		},
		LostUser:function(){
			localStorage.removeItem(UserArr[i])
			for (var i = UserArr.length - 1; i >= 0; i--) {
				localStorage.removeItem(UserArr[i])
			}
		},
		SetFilter:function(data){
		  var LotteryList = data.LotteryList;
		  if(LotteryList&&LotteryList.length){
		    data.LotteryList={};
		    for (var i = LotteryList.length - 1; i >= 0; i--) {
		      data.LotteryList[LotteryList[i].LotteryCode]={
		        LotteryType:LotteryList[i].LotteryType,
		        LotteryName:LotteryList[i].LotteryName,
		        LotteryIntro:LotteryList[i].LotteryIntro
		      }
		    }
		  }
		  if (data.LotteryConfig&&data.LotteryConfig.length) {
		    let LotteryConfig = data.LotteryConfig;
		    delete data.LotteryConfig;
		    for (let i = LotteryConfig.length - 1; i >= 0; i--) {
		      if (LotteryConfig[i].LotteryClassID==="14") {
		        data.LotteryConfig=LotteryConfig[i].LotteryList;
		        // getLotterysPlan(data.LotteryConfig);
		        break;
		      }
		    }
		  }

		  if (data.NoticeData&&data.NoticeData.length) {
		    if (data.NoticeData.length>2) {
		      data.NoticeData.length=2;
		    }
		  }
		  if (data.GradeList&&data.GradeList.length) {
		      for (var i = data.GradeList.length - 1; i >= 0; i--) {
		          data.GradeList[i].Grade=Number(data.GradeList[i].Grade);
		          data.GradeList[i].GradeGrow=Number(data.GradeList[i].GradeGrow);
		          data.GradeList[i].Bonus=Number(data.GradeList[i].Bonus);
		          data.GradeList[i].JumpBonus=Number(data.GradeList[i].JumpBonus);
		      }
		  }
		  if(data.ActivityConfig){
		    for (var i = data.ActivityConfig.length - 1; i >= 0; i--) {
		      if (typeof(data.ActivityConfig.Img)=="obj") {
		        data.ActivityConfig.Img=data.ActivityConfig.Img[0];
		      }
		    }
		  }
		  return data;
		},
		SaveInitData(d){
			store.commit('SaveInitData', d)
		},
		AjaxGetInitData(arr,fun){
			var ajax = {
				Action:"GetInitData"
			}
			ajax.Requirement=arr;
			_fetch(ajax).then((res)=>{
			  res.json().then((json) => {
			    if (json.Code===1||json.Code===0) {
			    	if (json.Code===0) {
			    		console.log("您的登录信息已失效");
			    		this.LostUser()
			    	}
			    	var Data = this.SetFilter(json.BackData);
			      this.SaveInitData(Data)
			      fun&&fun()
			    }else{
			      alert(json.StrCode);
			    }
			  })
			})
		},
		GetInitData(arr,fun){
			var newArr=[];
			for (var i = arr.length - 1; i >= 0; i--) {
				if(state[arr[i]]==null){
					newArr.push(arr[i])
				}
			}
			if (!newArr.length) {
				console.log("全部都有");
				fun&&fun()
				return;
			}
			this.AjaxGetInitData(newArr,fun)
		},
		fetchData(){
			console.log("gaibian");
		},
		format:function(obj){
			var f,v;
			for(var k in obj){
				f=_FomatConfig[k];
				if (f) {
					v = obj[k];
					if (!f.Reg.test(v)) {
						console.log(v);
						return [k,v?f.ErrMsg:(f.Name+"不能为空")];
					}
				}
			}
			return false;
		},
		obj2Formdata:function(obj){
			var str=[],k;
			for(var i in obj){
				k=obj[i];
				if (typeof(k)==="object") {
					k=JSON.stringify(k);
				}
				str.push(i+'='+k);
			}
			return str.join('&');
		}
	},
	render: h => h(App)
});

/*router.beforeEach((to, from, next) => {
	console.log("全局钩子");
	next();
});

/*router.afterEach((to, from) => {
  //没有next
});*/

module.exports = interviewApp;