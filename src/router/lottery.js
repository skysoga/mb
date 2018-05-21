import lotteryHall from '../views/lotteryHall'
import lottery from '../views/lottery'
import live from '../views/live/live'

var routes = [
  {
    path: '/lotteryHall',
    name: '购彩大厅',
    meta: {
      title: '购彩大厅'
    },
    component: lotteryHall
  }, {
    path: '/lottery/:type/:code',
    name: '彩种',
    meta: {
      title: '彩种',
      user: true
      // component:lottery
    },
    component: lottery
  }, {
    path: '/live/:type/:code',
    name: 'live彩种',
    meta: {
      title: '彩种',
      user: true
      // component:lottery
    },
    component: live
  }, {
    path: '/lottery',
    redirect: '/lotteryHall'
  }
]
export default routes
