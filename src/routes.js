const login =resolve => require(['./views/login'],resolve)
const index =resolve => require(['./views/index'],resolve)
const activity =resolve => require(['./views/activity'],resolve)
const newWinners =resolve => require(['./views/newWinners'],resolve)
const userCenter =resolve => require(['./views/userCenter'],resolve)
const service =resolve => require(['./views/service'],resolve)
const notfound =resolve => require(['./views/notfound'],resolve)
const personalInfo =resolve => require(['./views/personalInfo'],resolve)
const securityCenter =resolve => require(['./views/securityCenter'],resolve)
const lottery_k3 =resolve => require(['./views/lottery_k3'],resolve)
const dailyPrise =resolve => require(['./views/dailyPrise'],resolve)
const upgrade =resolve => require(['./views/upgrade'],resolve)
const activityInfo =resolve => require(['./views/activityInfo'],resolve)

module.exports = [{
  path: '/',
  redirect: '/index' //重定向配置
}, {
  path: '/index',
  name: '主页',
  meta:{
    title:'购彩大厅',
    nav:true,
    link:false,
    user:false,
    agent:false
  },
  component: index
}, {
  path: '/lottery_k3',
  name: '快3',
  meta:{
    title:'快3',
    nav:0,
    link:'index',
    user:1,
    agent:false
  },
  component: lottery_k3
}, {
  path: '/notfound',
  name: '404',
  component: notfound
}, {
  path: '/service',
  name: '客服',
  meta:{
    title:"在线客服",
    nav:false,
    link:"/index",
    service:0,
    user:false,
    agent:false
  },
  component: service
}, {
  path: '/login',
  name: '登录',
  meta:{
    title:"用户登录",
    nav:false,
    link:"/index",
    service:true,
    user:false,
    agent:false
  },
  component: login
}, {
  path: '/activity',
  name: '活动',
  meta:{
    title:"活动",
    nav:1,
  },
  component: activity
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
  path: '/newWinners',
  name: '发现',
  meta:{
    titleList:[{
      title:"中奖信息",
      to:"/newWinners"
    },{
      title:"昨日奖金榜",
      to:"/competition"
    }],
    nav:1,
  },
  component: newWinners
}, {
  path: '/userCenter',
  name: '我的账户',
  meta:{
    title:"我的账户",
    nav:1,
    service:true,
    user:1,
  },
  component: userCenter
},{
  path: '/personalInfo',
  name: '账户信息',
  meta:{
    title:"账户信息",
    nav:1,
    service:true,
    user:1,
  },
  component: personalInfo
},{
  path: '/securityCenter',
  name: '安全中心',
  meta:{
    title:"安全中心",
    link:"/userCenter",
    user:1,
  },
  component: securityCenter
},{
  path: '/agentCenter',
  redirect: '/notfound' //重定向配置
}, {
  path: '/PLstatement',
  redirect: '/notfound' //重定向配置
},{
  path: '/Notice',
  redirect: '/notfound' //重定向配置
}, {
  path: '*',
  redirect: '/notfound' //重定向配置
}]
