//广营负责页面的路由
const register =resolve => require(['../views/register'],resolve)
const rechargeWay =resolve => require(['../views/rechargeWay'],resolve)
const normalPay =resolve => require(['../views/normalPay'],resolve)
const quickPay =resolve => require(['../views/quickPay'],resolve)
const va =  resolve =>require(['../views/va'],resolve)

var routes = [
  {
    path: '/va' ,
    name: '测试',
    meta:{
      title: '表单验证'
    },
    component: va
  },
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
  }
]

module.exports = routes