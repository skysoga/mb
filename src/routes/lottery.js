//广营负责页面的路由
const register =require('../views/register')
const rechargeWay =require('../views/rechargeWay')
const lotteryHall =require('../views/lotteryHall')
const lotteryPage = require('../views/lotteryPage')
// const lottery_common = require('../views/lottery_common')
// const lottery_k3 = require('../views/lottery_k3')
// const lottery_syx5 = require('../views/lottery_syx5')

var routes = [
  {
    path: '/register',
    name: '注册',
    meta:{
      title:"用户注册",
      nav:false,
      link:"/index",
      service:true,
      user:false,
      agent:false
    },
    component: register
  },{
    path: '/rechargeWay',
    name: '选择充值方式',
    meta:{
      title:"选择充值方式",
      link:"/userCenter",
      user:1,
    },
    component: rechargeWay
  },{
    path: '/lotteryHall',
    name: '全部彩种',
    meta:{
      title:"全部彩种",
      nav:0,
      link:'index'
    },
    component: lotteryHall
  },{
    path: '/lottery/:type/:code',
    name: '彩种',
    meta:{
      // title:"彩种",
      user: true,
      component:lotteryPage
    },
    component: lotteryPage
  }
]

module.exports = routes
