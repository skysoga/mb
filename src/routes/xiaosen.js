const dailyPrise =resolve => require(['../views/dailyPrise'],resolve)//每日加奖
const upgrade =resolve => require(['../views/upgrade'],resolve)//晋级奖励
const activityInfo =resolve => require(['../views/activityInfo'],resolve)//站长活动
const setPwd =resolve => require(['../views/setPwd'],resolve)//设置密码
const verifyPwd =resolve => require(['../views/verifyPwd'],resolve)//修改登录密码
const verifySafePwd =resolve => require(['../views/verifySafePwd'],resolve)//修改安全密码
const setSafePwd =resolve => require(['../views/setSafePwd'],resolve)//设置安全密码
const verifyMobile =resolve => require(['../views/verifyMobile'],resolve)//修改手机
const setMobile =resolve => require(['../views/setMobile'],resolve)//设置手机
const verifyQuestion =resolve => require(['../views/verifyQuestion'],resolve)//修改密码问题
const setQuestion =resolve => require(['../views/setQuestion'],resolve)//设置密保问题
const verifyMail =resolve => require(['../views/verifyMail'],resolve)//修改邮箱
const setMail =resolve => require(['../views/setMail'],resolve)//设置邮箱
const manageBankcard =resolve => require(['../views/manageBankcard'],resolve)//银行卡管理
const resetWay =resolve => require(['../views/resetWay'],resolve)//找回方式
const forgetPwd =resolve => require(['../views/forgetPwd'],resolve)//忘记密码
const agentCenter =resolve => require(['../views/agentCenter'],resolve)//代理中心
const agentReport =resolve => require(['../views/agentReport'],resolve)//代理报表

var routes = [{
  path: '/manageBankcard',
  name: '银行卡管理',
  meta:{
    title:'银行卡管理',
    nav:false,
    link:'/securityCenter',
    user:true,
    agent:false
  },
  component: manageBankcard
},{
  path: '/setMail',
  name: '设置密保邮箱',
  meta:{
    title:'设置密保邮箱',
    nav:false,
    link:'/securityCenter',
    user:false,
    agent:false
  },
  component: setMail
},{
  path: '/verifyMail',
  name: '验证密保邮箱',
  meta:{
    title:'验证密保邮箱',
    nav:false,
    link:'/securityCenter',
    user:false,
    agent:false
  },
  component: verifyMail
},{
  path: '/setQuestion',
  name: '设置密保问题',
  meta:{
    title:'设置密保问题',
    nav:false,
    link:'/securityCenter',
    user:false,
    agent:false
  },
  component: setQuestion
},{
  path: '/verifyQuestion',
  name: '验证密保问题',
  meta:{
    title:'验证密保问题',
    nav:false,
    link:'/securityCenter',
    user:false,
    agent:false
  },
  component: verifyQuestion
},{
  path: '/setMobile',
  name: '设置密保手机',
  meta:{
    title:'设置密保手机',
    nav:false,
    link:'/securityCenter',
    user:false,
    agent:false
  },
  component: setMobile
},{
  path: '/verifyMobile',
  name: '验证密保手机',
  meta:{
    title:'验证密保手机',
    nav:false,
    link:'/securityCenter',
    user:false,
    agent:false
  },
  component: verifyMobile
},{
  path: '/setSafePwd',
  name: '设置安全密码',
  meta:{
    title:'设置安全密码',
    nav:false,
    link:'/securityCenter',
    user:false,
    agent:false
  },
  component: setSafePwd
},{
  path: '/verifySafePwd',
  name: '验证安全密码',
  meta:{
    title:'验证安全密码',
    nav:false,
    link:'/securityCenter',
    user:false,
    agent:false
  },
  component: verifySafePwd
},{
  path: '/verifyPwd',
  name: '验证原密码',
  meta:{
    title:'验证原密码',
    nav:false,
    link:'/securityCenter',
    user:true,
    agent:false
  },
  component: verifyPwd
},{
  path: '/setPwd',
  name: '设置登录密码',
  meta:{
    title:'设置登录密码',
    nav:false,
    link:'/securityCenter',
    user:false,
    agent:false
  },
  component: setPwd
},{
  path: '/dailyPrise',
  name: '每日加奖',
  meta:{
    title:"每日加奖",
    link:"/activity",
    nav:0,
  },
  component: dailyPrise
},{
  path: '/upgrade',
  name: '晋级奖励',
  meta:{
    title:"晋级奖励",
    link:"/activity",
    nav:0,
  },
  component: upgrade
},{
  path: '/activityInfo',
  name: '站长活动',
  meta:{
    title:"站长活动",
    link:"/activity",
    nav:0,
  },
  component: activityInfo
},{
  path: '/resetWay',
  name: '找回密码',
  meta:{
    title:"找回密码",
    link:"/securityCenter",
    nav:0,
  },
  component: resetWay
},{
  path: '/forgetPwd',
  name: '忘记密码',
  meta:{
    title:"忘记密码",
    link:"/index",
    nav:0,
  },
  component: forgetPwd
},{
  path: '/agentCenter',
  name: '代理中心',
  meta:{
    title:"代理中心",
    link:"/userCenter",
    nav:0,
    user:true,
    agent:true
  },
  component: agentCenter
},{
  path: '/agentReport',
  name: '代理报表',
  meta:{
    title:"代理报表",
    link:"/agentCenter",
    nav:0,
    user:true,
    agent:true
  },
  component: agentReport
}]
module.exports = routes
