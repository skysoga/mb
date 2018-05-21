import lottery from './lottery'
import zhiming from './zhiming'
import xiaosen from './xiaosen'

import login from '../views/login'
import index from '../views/index'
import liveList from '../views/liveList'
import _redirect from '../views/newk3/redirect'
import reload from '../views/reload'
import activity from '../views/activity'
import newWinners from '../views/newWinners'
import center from '../views/center'
import userCenter from '../views/userCenter'
import service from '../views/service'
import notfound from '../views/notfound'
import securityCenter from '../views/securityCenter'
import lottery_k3 from '../views/lottery_k3'
import competition from '../views/competition'
import maintain from '../views/maintain'
import AppDownload from '../views/AppDownload'
import AppPackage from '../views/AppPackage'
import lotteryPage from '../views/lotteryPage'


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
  path: '/reload',
  name: '重载',
  meta:{
    title:'重载',
    nav:false,
    link:false,
    user:false,
    agent:false
  },
  component: reload
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
  path: '/liveList',
  name: '主页',
  meta:{
    title:'',
    nav:true,
    link:false,
    user:false,
    agent:false
  },
  component: liveList
},{
  path: '/redirect',
  meta:{
    nav:false,
    link:false,
    user:false,
    agent:false
  },
  component: _redirect
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
      title:"昨日盈利榜",
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
    name: '昨日盈利榜',
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

export default routes
