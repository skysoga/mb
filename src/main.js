;(function(){
  try {
    sessionStorage.setItem('TextLocalStorage', 'hello world');
    sessionStorage.getItem('TextLocalStorage');
    sessionStorage.removeItem('TextLocalStorage');
  } catch(e) {
    alert('您的浏览器太旧或者开启了无痕浏览模式，无法浏览网页，请更换浏览器或退出无痕模式，给您带来的不便，表示抱歉！');
    localStorage={setItem:function(d){},getItem:function(d){}};
    sessionStorage={setItem:function(d){},getItem:function(d){}};
  }
})()

if(!localStorage.getItem("console")){
  console.log=function(){return}
}
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App'
import routes from './routes/routes'
import Va from './plugins/va'
window.Vue=Vue
Vue.use(Va)
Vue.use(VueRouter)
Vue.use(Vuex)
//全局过滤器
Vue.filter('num', v=>+v) // 转成数字类型
Vue.filter('filNum',v=>String(Math.floor(v)).length>7?Math.floor(v):v)//数字整数长度大于7位去掉小数点部分
/**
 * [format 为Date对象追加format方法]
 * @param  {[string]} format [设置要输出的目标格式 如"yyyy-MM-dd hh:mm:ss" ]
 * @return {[string]}        [按格式输出的时间字符串]
 * 示例console.log(new Date().format("yyyyMd hh:mm:ss")) 输出2016816 14:12:17;
 */
Date.prototype.format = function(format) {
  var date = {
  "M+": this.getMonth() + 1,
  "d+": this.getDate(),
  "h+": this.getHours(),
  "m+": this.getMinutes(),
  "s+": this.getSeconds(),
  "q+": Math.floor((this.getMonth() + 3) / 3),
  "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
  format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}

document.body.oncontextmenu=function(){ return false;}//防止右键
document.addEventListener('touchstart',function(e){},false);//让css的:active生效
// document.cookie = "Site="+location.hostname.replace('.com','')
window.rem = document.body.clientWidth/16
window.em = Math.sqrt((rem-20)*.9)+20
document.querySelector("html").style.fontSize=rem+'px'
document.body.style.fontSize=em+'px'

function FetchCatch(msg,resolve){
  console.log("FetchCatch");
  if (state.turning) {
    layer.msgWarn(msg)
    state.turning=false
  }else{
    resolve({Code:-1,StrCode:msg})
  }
}
window._fetch = function (data){
  data.SourceName=_App?"APP":"MB"
  var str=[],k;
  for(var i in data){
    k=data[i];
    if (typeof(k)==="object") {
      k= encodeURIComponent(JSON.stringify(k));
    }
    str.push(i+'='+k);
  }
  return new Promise(function(resolve, reject){
    var st = state.turning&&setTimeout(function(){
      console.log("请求超时");
      FetchCatch('网络请求超时，请检查网络状态',resolve)
      reject()
    },10000)
    fetch('/tools/ssc_ajax.ashx', {
      credentials:'same-origin',
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: str.join('&')
    }).then((res)=>{
      if (res.status!==200) {
        FetchCatch("网络错误"+res.status,resolve)
        return
      }
      res.json().then(json=>{
        state.turning&&clearTimeout(st)
        console.log(json);
        var notRes
        if (data.Action==="GetInitData") {
          if (json.Code===1||json.Code===0) {
            var Data = RootApp.SetFilter(json.BackData);
            RootApp.SaveInitData(Data)
            if(JSON.stringify(json.CacheData) !== "{}"){
              localStorage.setItem('CacheData',JSON.stringify(Object.assign(CacheData,json.CacheData)))
            }
          }
        }
        ;(function(){
          switch(json.Code){
            case 0://未登录
              if(state.UserName){
                layer.alert("由于您长时间未操作，已自动退出，需要重新登录",function(){
                  RootApp.Logout()
                  router.push("/login")
                })
                notRes=true
              }
            break;
            case -6://IP黑名单
            break;
            case -7://系统维护
              store.commit('SetMaintain', json.BackData)
              router.push("/maintain")
            break;
            case -8://账号冻结
              layer.alert("您的账号已被冻结，详情请咨询客服。",function(){
                RootApp.Logout()
                var meta = RootApp._route.matched[0]
                meta = meta&&meta.meta
                router.push("/login")
              })
              notRes=true
            break;
          }
          if (data.Action.search('Verify')===0&&json.Code>-1) {
            state.UserVerify=data.Action.replace('Verify','')+','
          }
        })()
        notRes||resolve(json)
      }).catch(r=>{
        console.log(r.message)
        FetchCatch("网络数据错误",resolve)
      })
    }).catch((r)=>{
      console.log(r.message);
      if ("Failed to fetch"===r.message) {
        FetchCatch("您的设备失去了网络连接",resolve)
      }else{
        FetchCatch("网络错误，请检查网络状态",resolve)
      }
    })
  })
}

// 获取图形码接口专用
window._fetchT=function _fetchT(data){
  var str=[],k;
  for(var i in data){
    k=data[i];
    if (typeof(k)==="object") {
      k=JSON.stringify(k);
    }
    str.push(i+'='+k);
  }
  data = str.join('&');
  return new Promise(function(resolve, reject){
    fetch('/tools/ssc_ajax.ashx', {
      credentials:'same-origin',
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data
    }).then((res)=>{
      res.text().then(text=>{
        resolve(text)
      })
    })
  })
}
window._App=location.host.search("csz8.net")>-1//是否APP
;(function(){
  var a = localStorage.getItem("isApp")
  if (a) {_App=a?true:false}
  var versions = function() {
    var u = navigator.userAgent,
      app = navigator.appVersion;
    return {
      // trident: u.indexOf('Trident') > -1, //IE内核
      // presto: u.indexOf('Presto') > -1, //opera内核
      // webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      // gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      // mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
      // iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      // iPad: u.indexOf('iPad') > -1, //是否iPad
      // webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      // weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
      // qq: u.match(/\sQQ/i) == " qq" //是否QQ
    };
  }()
  if (_App&&versions.ios) {
    //iosApp专用代码
    var img=document.createElement("img")
    img.src="http://static.ydbimg.com/API/YdbOnline.js"
    img.onerror=function(){
      var script = document.createElement("script");
      script.src=img.src
      document.body.appendChild(script);
      var inter=setInterval(function(){
        console.log(1);
        if(YDBOBJ){
          (new YDBOBJ()).SetHeadBar(0)
          clearInterval(inter)
        }
      },100)
    }
  }
})()

if (_App) {document.title="彩神争霸"}

window.router = new VueRouter({
  routes,
  mode:'history',
  linkActiveClass:"on",
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
  // exact: true
});

function SetIndexTitle(s){
  routes[1].meta.title=`<img src="${state.constant.ImgHost+s.MobileLogo}">`
  if (!_App) {
    document.title=s.Name
    // routes[2].meta.title=routes[1].meta.title
  }
}

var UserArr = [
  'UserHasSafePwd', //返回是否已经设置安全密码,1为有,0为没有设置
  'UserSafeQuestions', //返回设置的密保问题,如果没设置可以返回0或者空数组
  'UserMobile', //返回已绑定手机的模糊状态,如未绑定,返回空字符串或0
  'UserMail', //返回已绑定手机的模糊状态,如未绑定,返回空字符串或0
  'UserName', //返回对应的账号,未登录用户返回空字符串
  'UserPhoto', //返回用户头像的图片地址
  'UserNickName',
  'UserFirstCardInfo', //返回绑定的第一张银行卡的模糊信息
  'AgentRebate', //获取代理人返点情况
  'UserUpGradeBonus',
  'UserGrade',
  'UserQQ',
  'UserMobile',
  'UserMail',
  'UserBirthDay',
  'UserGradeGrow',
  'UserSex',
  'UserHasSafePwd',
  // 'UserBalance',
  'UserFirstCardInfo',
  'UserBankCardList',
  'UserLastLoginInfo',
  'RebateK3',
  'RebateSSC',
  'NoticeData',
  'RebateSYX5'
]
var SiteArr=[ //需要校验更新版本的列表
  'SysActivity',
  'SysBanner',
  'LotteryConfig', //所有彩种列表
  'LotteryList', //所有彩种信息
  'GradeList',//等级体系
  'RewardData',//每日加奖设置
  'DefaultPhotoList',
]
var AppArr=[
  'ActivityConfig', //活动种类及数据
  'BannerList',
  'PayLimit',
  'SiteConfig',
]
// if (_App) {
//   UserArr=UserArr.concat(AppArr)
// }else{
  SiteArr=SiteArr.concat(AppArr)
// }
var CacheArr = SiteArr.concat(UserArr).concat(['Difftime'])
window.state = require('./JSconfig.js')
state.constant._App=_App
function setState(key){
  function getLocalDate(str){
    var s = localStorage.getItem(str);
    try{
      s = JSON.parse(s);
    }catch(e){}
    if (str=="SiteConfig"&&s) {
      SetIndexTitle(s)
    }
    return s;
  }
  for (var i = key.length - 1; i >= 0; i--) {
    state[key[i]]=getLocalDate(key[i])
  }
};
setState(CacheArr)
window.CacheData=localStorage.getItem("CacheData")
CacheData = CacheData?JSON.parse(CacheData):{}

window.store = new Vuex.Store({
  state,
  getters:{
    PhotoPath:state=>state.constant.ImgHost+state.constant.PhotoPath,
    WithdrwHtml:state=>{
      return "login"
    },
    PayLimit: state => {
      var el = {};
      state.PayLimit.forEach(item=>{
        el[item.PayName] = [item.MinMoney, item.MaxMoney];
      })
      return el;
    },
    NoDataDom:msg => state.tpl.noData.join("msg"),

  },
  mutations: {
    SaveInitData: (state,Data) => {
      for(var k in Data){
        state[k] = Data[k]
        if(CacheArr.indexOf(k)+1){
          if (Data[k]===null) {
            state[k]=Data[k]=''
          }else if (typeof(Data[k])=='object') {
            Data[k]=JSON.stringify(Data[k]);
          }
          localStorage.setItem(k,Data[k]);
        }
      }
    },
    ClearInitData:(state,arr)=>{
      for (var i = arr.length - 1; i >= 0; i--) {
        localStorage.removeItem(arr[i])
        state[arr[i]]=null
        delete CacheData[arr[i]]
      }
      localStorage.setItem('CacheData',JSON.stringify(CacheData))
    },
    setDifftime:(state, timeItemList)=>{
      console.log(timeItemList)
      if(!timeItemList || !timeItemList.length){
        layer.msgWarn("因无法同步服务器时间,您将无法投注,请检查网络情况")
        return
      }
      var _shortest = timeItemList[0].interval,
          _index = 0
      timeItemList.forEach((item, index)=>{
        if(item.interval < _shortest){
          _shortest = item.interval
          _index = index
        }
      })

      var timeObj = timeItemList[_index],
          timeBegin = timeObj.timeBegin,
          timeEnd = timeObj.timeEnd,
          SerTime = timeObj.SerTime
      var Difftime = timeBegin + Math.floor((timeEnd - timeBegin)/2) - SerTime

      console.log(timeObj, Difftime)
      // Difftime = new Date().getTime()- SerTime
      state.Difftime = Difftime
      localStorage.setItem('Difftime',Difftime)
      console.log('获取了时间：'  + Difftime, SerTime)
    },
    SetMaintain:(state,d)=>{
      state.Maintain=d
    }
  },
})

;(function(){
  var warn = '<span class="iconfont">&#xe606;</span>',
    tip='<span class="iconfont">&#xe610;</span>'
  layer.icon={}
  layer.icon.load=state.tpl.load
  layer.load=function(){layer.open({type: 2})}
  layer.msg=function(msg, time) {
    return this.open({ content: msg, time: time?time-1:3,style: 'fill:#ececec',className:'layermsg'});
  }
  layer.msgWarn=function(msg, time) {
    return this.msg(warn+msg,time);
  },
  layer.msgTip=function(msg, time) {
    return this.msg(tip+msg,time);
  },
  layer.msgWait=function(msg,time) {
    return this.open({time:  time?time-1:0,content: layer.icon.load+msg+"，请稍候...", shadeClose:0 ,className:'layermsg'});
  },
  layer.url=function(msg,s) {
    return layer.open({
      className: "layerConfirm",
      title:'温馨提示',
      content: msg,
      btn: ["确定"],
      end:function(){
        if (typeof(s)=='string') {
          router.push(s)
        }else{
          router.go(s)
        }
      }
    })
  },
  layer.alert=function(msg,fun){
    return layer.open({
      className: "layerConfirm",
      title:'温馨提示',
      shadeClose: false,
      content: msg,
      btn: ["确定"],
      end:fun
    })
  },
  layer.confirm=function(msg,btn,fun1,fun2,fun3){
    if (!btn.length) {
      fun3=fun2
      fun2=fun1
      fun1=btn
      btn=["确定","取消"]
    }
    return layer.open({
      className: "layerConfirm",
      title:"温馨提示",
      shadeClose: false,
      content: msg,
      btn: btn,
      yes: function(index) {
        fun1()
        layer.close(index)
      },
      no:fun2,
      end:fun3
    })
  }
})()

function TimeItem(interval, timeBegin, timeEnd, SerTime){
  this.interval = interval
  this.timeBegin = timeBegin
  this.timeEnd = timeEnd
  this.SerTime = SerTime
}

window.RootApp={
  Logout:function(){
    store.commit('ClearInitData', UserArr)
    sessionStorage.clear()
  },
  Login:function(UserName,fun){
    // this.GetInitData(UserArr,fun)
    this.SaveInitData({UserName:UserName})
    fun()
  },
  SetFilter:function(data){
    ;(function(Bonus){
      if (!Bonus||Bonus.State) {return}
      setTimeout(function(){
        layer.open({
          shadeClose: false,
          title: "恭喜",
          content: '恭喜您成功晋级，当前等级为VIP'+Bonus.Grade+'，赶紧到活动中心领取奖励吧。',
          className: "layerConfirm",
          btn: ["领取奖励", "留在本页"],
          yes: function(Lindex) {
            layer.close(Lindex);
            router.push("/upgrade")
          }
        })
      },100)
    })(data.UserUpGradeBonus)
    ;(function(s){
      if (s) {
        SetIndexTitle(s)
      }
    })(data.SiteConfig)
    ;(function(LotteryList){
      if(LotteryList&&LotteryList.length){
        data.LotteryList={};
        var c
        for (var i = LotteryList.length - 1; i >= 0; i--) {
          c = LotteryList[i].LotteryCode
          data.LotteryList[c]= LotteryList[i]
          // delete data.LotteryList[c].LotteryCode
        }
      }
    })(data.LotteryList)


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

    ;(function(a){
      if (!a) {return}
      for (var i = a.length - 1; i >= 0; i--) {
        if (typeof(a[i].Img)=="object") {
          a[i].Img=a[i].Img&&a[i].Img[0];
        }
      }
    })(data.ActivityConfig)
    return data;
  },
  SaveInitData(d){
    store.commit('SaveInitData', d)
  },
  AjaxGetInitData(arr,fun){
    state.needVerify=0
    sessionStorage.setItem("needVerify",state.needVerify)
    var ajax = {
      Action:"GetInitData",
      Requirement:arr
    }
    if (_App&&!state.UserName) {
      //app未登录的时候将部分项目移出版本校验
      ajax.CacheData=Object.assign(CacheData)
      for (var i = AppArr.length - 1; i >= 0; i--) {
        delete ajax.CacheData[AppArr[i]]
      }
      delete ajax.CacheData.LotteryConfig
      delete ajax.CacheData.LotteryList
    }else{
      ajax.CacheData=CacheData
    }
    _fetch(ajax).then((json)=>{
      if (json.Code===1||json.Code===0) {
        fun&&fun(state)
      }else{
        layer.msgWarn(json.StrCode);
      }
    })
  },
  GetInitData(arr,fun){
    state.UserName&&arr.push("UserUpGradeBonus")
    console.log(arr);
    var newArr=[];
    for (var i = arr.length - 1; i >= 0; i--) {
      switch(arr[i]){
        case "UserBalance":
        case "UserWithdrawAvail":
        case "PayLimit":
        case "WithdrawRemainTimes":
          newArr.push(arr[i])
        break
        default:
          if(state[arr[i]]==null){
            newArr.push(arr[i])
          }
      }
    }
    if (!newArr.length) {
      // console.log("全部都有");
      fun&&fun(state)
      return;
    }
    this.AjaxGetInitData(newArr,fun)
  },
  //保证校验时按顺序来
  format:function(obj, order, cfg){
    cfg = cfg || {}
    var f,v

    for(var i = 0;i < order.length;i++){
      var k = order[i];
      v = obj[k]
      f=cfg[k]||store.state._FomatConfig[k]

      // 如果是校验重复的
      if(k.indexOf('check') > -1){
        var target = k.slice(5), target_f = cfg[target] || store.state._FomatConfig[target]
        if(obj[k] !== obj[target]){
          console.log(obj[k], obj[target])
          return [k, `两次${target_f.Name} 不相同`]
        }
      }

      if (f) {
        if (!f.Reg.test(v)) {
          return [k,v?f.ErrMsg:(f.Name+"不能为空")];
        }
      }
    }

    return false;
  },
  getServerTime: (function(){
    var cantGetTime = 0,
        timeItemList = []
    return function(fun){
      var timeBegin = new Date().getTime()
      _fetch({Action: "GetServerTimeMillisecond"}).then((json)=>{
        var timeEnd = new Date().getTime()
        var interval = timeEnd - timeBegin
        if(json.Code > -1){
          timeItemList.push(new TimeItem(interval, timeEnd, timeBegin, json.Data))
        }

        if(cantGetTime > 4){
          // layer.msgWarn("因无法同步服务器时间,您将无法投注,请检查网络情况")
          store.commit('setDifftime', timeItemList)
          fun && fun()
          cantGetTime = 0
          timeItemList = []
        }else{
          if(interval > 1000){
            cantGetTime++
            this.getServerTime(fun)
          }else{
            if(json.Code === 1) {
              // var SerTime = json.Data
              // store.commit('setDifftime', SerTime)
              store.commit('setDifftime', timeItemList)
              fun && fun()
              cantGetTime = 0
              timeItemList = []
            }else{
              cantGetTime++;
              this.getServerTime(fun);
            }
          }
        }
      })
    }
  })(),
  beforEnter:function(to){
    var meta = to.matched[0].meta
    if(meta.user){
      if (!state.UserName) {
        state.login2path = to.path
        router.push("/login")
      }else if(state.agent){
        state.AgentRebate||router.push("/notfount")
      }
    }
    if (meta.verify) {
      var fy = meta.verify===1?1:state[meta.verify]
      if (to.path==="/setSafePwd") {fy*=1}
      if (fy&&(!state.UserVerify||meta.from.search(state.UserVerify)==-1)
      ) {
        console.log("条件不足");
        router.go(-1)
      }
    }
  },
}

window.RootApp = new Vue({
  el: '#app',
  store,
  router,
  methods:window.RootApp,
  created:function(){
    var len = routes.length
    var ToPath=localStorage.getItem('LastPath')
    if(ToPath){
      router.push(ToPath)
    }
    var ToPath = (ToPath||location.pathname).toLowerCase()
    if (ToPath==="/") {return}
    console.log(ToPath);
    for (var i = 0; i < len; i++) {
      if (ToPath.search(routes[i].path.toLowerCase())>-1&&routes[i].path!='/') {
        this.beforEnter({matched:[routes[i]]})
        break
      }
    }
  },
  render: h => h(App),
});

router.beforeEach((to, from, next) => {
  console.log("beforeEach");
  if(state.UserName&&state.UserName!==localStorage.getItem('UserName')){
    setState(UserArr)
  }
  state.turning=true
  RootApp.beforEnter(to)
  next();
});

router.afterEach((to, from) => {
  state.turning=false
  layer.closeAll()
  state.needVerify++
  sessionStorage.setItem("needVerify",state.needVerify)
});

//全局指令
Vue.directive('copyBtn', {
  bind: function(el, binding, vnode){
    el.addEventListener('click', function(){
      var siblings= Array.prototype.filter.call(el.parentNode.children, function(child){ return child !== el; });
      var targetInput = siblings[0];
      targetInput.select()
      document.execCommand('copy')
    })
  }
})

//如果检测到copy事件
document.addEventListener('copy', function(e){
  var el = e.target
  var btn = [].filter.call(el.parentNode.children, child=>(child !== el))[0]
  if(btn.className.indexOf('copy') > -1){
    layer.msgWarn('已将内容复制到剪切板')
  }
})
