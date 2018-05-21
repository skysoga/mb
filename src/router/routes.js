import ZhiMing from './zhiming'
import XiaoSen from './xiaosen'
import lottery from './lottery'

import index from '../views/index'
import NotFound from '../views/notfound'
import MainTain from '../views/maintain'
import LiveList from '../views/live/livelist'

var publicRoute = [
  {
    path: '/index.html',
    // name: '投注梦想，注定精彩',
    redirect: '/index'
  },
  {
    path: '*',
    name: 'NotFound',
    redirect: '/NotFound' // 重定向配置
  }
]

var routes = [
  {
    path: '/',
    // name: '投注梦想，注定精彩',
    redirect: '/index' // 重定向配置
  }, {
    path: '/index',
    name: 'index',
    meta: {
      title: '未登录',
      nav: true,
      link: false,
      user: false,
      agent: false
    },
    component: index
  }, {
    path: '/livelist',
    name: '直播首页',
    meta: {
      title: '未登录',
      nav: true,
      link: false,
      user: false,
      agent: false
    },
    component: LiveList
  }, {
    path: '/maintain',
    name: '维护中...',
    meta: {
      title: '系统维护'
    },
    component: MainTain
  }, {
    path: '/notfound',
    name: '404',
    meta: {
      title: '找不到页面'
    },
    component: NotFound
  }
]

routes = routes.concat(lottery).concat(XiaoSen).concat(ZhiMing).concat(publicRoute)
export default routes
