//广营负责页面的路由
const register =resolve => require(['../views/register'],resolve)
const rechargeWay =resolve => require(['../views/rechargeWay'],resolve)
const normalPay =resolve => require(['../views/normalPay'],resolve)
const quickPay =resolve => require(['../views/quickPay'],resolve)
const lottery_ssc = resolve => require(['../views/lottery_ssc'],resolve)
const lotteryPage = resolve => require(['../views/lotteryPage'],resolve)
const lottery_k3 = resolve => require(['../views/lottery_k3'],resolve)

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
    path: '/normalPay',
    name: '普通充值',
    meta: {
      title: '',
      link: '/rechargeWay',
      user: true,
    },
    component: normalPay
  },{
    path: '/quickPay',
    name: '快捷充值',
    meta: {
      title: '',
      link: '/rechargeWay',
      user: true
    },
    component: quickPay
  },{
    path: '/lottery',
    name: '彩种',
    meta: {
      user: true,
    },
    children:[
      {
        path: 'ssc/:code',
        name: '时时彩',
        component: lottery_ssc,
      },
      {
        path: 'k3/:code',
        name: '快三',
        component: lottery_k3
      }
    ],
    component: lotteryPage
  }
]

module.exports = routes