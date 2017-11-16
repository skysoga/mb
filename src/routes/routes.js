import lottery from './lottery'
import zhiming from './zhiming'
import xiaosen from './xiaosen'

const login =require('../views/login')
const index =require('../views/index')
const activity =require('../views/activity')
const newWinners =require('../views/newWinners')
const center =require('../views/center')
const userCenter =require('../views/userCenter')
const service =require('../views/service')
const notfound =require('../views/notfound')
const securityCenter =require('../views/securityCenter')
const lottery_k3 =require('../views/lottery_k3')
const competition =require('../views/competition')
const maintain = require('../views/maintain')
const AppDownload = require('../views/AppDownload')
const AppPackage = require('../views/AppPackage')
const lotteryPage = require('../views/lotteryPage')


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
    title:'未登录',
    nav:true,
    link:false,
    user:false,
    agent:false
  },
  component: index
},{
  path: "/maintain",
  name: "维护中...",
  meta: {
    title: "系统维护"
  },
  component: maintain
},{
  path: '/lottery_k3',
  name: '快３',
  meta:{
    title:'快３',
    nav:0,
    link:'index',
    user:1,
    agent:false
  },
  component: lottery_k3
}, {
  path: '/notfound',
  name: '404',
  meta:{
    hide:1
  },
  component: notfound
}, {
  path: '/service',
  name: '客服',
  meta:{
    title:"在线客服",
    nav:false,
    // link:"/index",
    back:-1,
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
    title:"活动中心",
    nav:1,
  },
  component: activity
},{
  path: '/center',
  name: '发现',
  meta:{
    titleList:[{
      title:"中奖信息",
      to:"/center/newWinners",
    },{
      title:"昨日奖金榜",
      to:"/center/competition"
    }],
    nav:true,
  },
  component: center,
  children:[{
    path:"",
    redirect:"/center/newWinners"
  },{
    path:"newWinners",
    component:newWinners,
    name: '中奖信息'
  },{
    path:"competition",
    component:competition,
    name: '昨日奖金榜',
  }]
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
},{
  path: '/AppDownload',
  name: 'APP',
  meta:{
    title:"APP下载",
    link:"/index",
  },
  component: AppDownload
},{
  path: '/AppPackage',
  name: 'APP下载',
  meta:{
    title:"APP下载",
    link:"/index",
  },
  component: AppPackage
},{
  path: '/live/:type/:code',
  name: '彩种',
  meta:{
    // title:"彩种",
    user: true,
    component:lotteryPage
  },
  component: lotteryPage
}]

routes = routes.concat(lottery).concat(zhiming).concat(xiaosen).concat(publicRoute)


module.exports = routes
