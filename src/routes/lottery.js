//广营负责页面的路由
import register from '../views/register'
import rechargeWay from '../views/rechargeWay'
import lotteryHall from '../views/lotteryHall'
import lotteryPage from '../views/lotteryPage'
// import lottery_common from '../views/lottery_common'
// import lottery_k3 from '../views/lottery_k3'
// import lottery_syx5 from '../views/lottery_syx5'

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

export default routes
