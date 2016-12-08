import guangying from './guangying'
import zhiming from './zhiming'
import xiaosen from './xiaosen'

const login =resolve => require(['../views/login'],resolve)
const index =resolve => require(['../views/index'],resolve)
const activity =resolve => require(['../views/activity'],resolve)
const userCenter =resolve => require(['../views/userCenter'],resolve)
const service =resolve => require(['../views/service'],resolve)
const notfound =resolve => require(['../views/notfound'],resolve)
const securityCenter =resolve => require(['../views/securityCenter'],resolve)
const lottery_k3 =resolve => require(['../views/lottery_k3'],resolve)



var publicRoute = [
  {
    path: '*',
    redirect: '/notfound' //重定向配置
  }
]

var routes = [{
  path: '/',
  redirect: '/index' //重定向配置
},{
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
},{
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
  path: '/securityCenter',
  name: '安全中心',
  meta:{
    title:"安全中心",
    link:"/userCenter",
    user:1,
  },
  component: securityCenter
}]

routes = routes.concat(guangying).concat(zhiming).concat(xiaosen).concat(publicRoute)


module.exports = routes
