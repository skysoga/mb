import recordCenter from '../views/recordCenter'
import about from '../views/about'
import helpCenter from '../views/helpCenter'
import agentBillRecord from '../views/agentBillRecord'
import BetRecord from '../views/BetRecord'
import BillRecord from '../views/BillRecord'
import lowerReport from '../views/lowerReport'
import agentMember from '../views/agentMember'
import seekOrder from '../views/seekOrder'
import NoticeDetail from '../views/NoticeDetail'
import Notice from '../views/Notice'
import letter from '../views/letter'
import letterDetail from '../views/letterDetail'
import betDetail from '../views/betDetail'
import seekDetail from '../views/seekDetail'
import agentIntro from '../views/agentIntro'

var routes = [{
  path: '/agentBetRecord',
  name: '投注明细',
  meta: {
    title: '投注明细',
    nav: true,
    link: false,
    user: true,
    agent: true
  },
  component: recordCenter
}, {
  path: '/agentBillRecord',
  name: '交易明细',
  meta: {
    title: '交易明细',
    nav: true,
    link: false,
    user: true,
    agent: true
  },
  component: agentBillRecord
}, {
  path: '/BetRecord',
  name: '投注记录',
  meta: {
    title: '投注记录',
    nav: true,
    link: false,
    user: true,
    agent: false
  },
  component: BetRecord
}, {
  path: '/BillRecord',
  name: '交易记录',
  meta: {
    title: '交易记录',
    nav: true,
    link: false,
    user: true,
    agent: false
  },
  component: BillRecord
}, {
  path: '/about',
  name: '关于我们',
  meta: {
    title: '关于我们',
    nav: true,
    link: false,
    user: false,
    agent: false
  },
  component: about
}, {
  path: '/helpCenter',
  name: '帮助中心',
  meta: {
    title: '帮助中心',
    nav: true,
    link: false,
    user: false,
    agent: false
  },
  component: helpCenter
}, {
  path: '/lowerReport',
  name: '下级报表',
  meta: {
    title: '下级报表',
    nav: true,
    link: false,
    user: true,
    agent: true
  },
  component: lowerReport
}, {
  path: '/agentMember',
  name: '会员管理',
  meta: {
    title: '会员管理',
    nav: true,
    link: false,
    user: true,
    agent: true
  },
  component: agentMember
}, {
  path: '/seekOrder',
  name: '追号记录',
  meta: {
    title: '追号记录',
    nav: true,
    link: false,
    user: true,
    agent: false
  },
  component: seekOrder
}, {
  path: '/Notice',
  name: '网站公告',
  meta: {
    title: '网站公告',
    nav: true,
    link: false,
    user: true,
    agent: false
  },
  component: Notice
}, {
  path: '/NoticeDetail',
  name: '公告详情',
  meta: {
    title: '网站公告',
    nav: true,
    link: false,
    user: true,
    agent: false
  },
  component: NoticeDetail
}, {
  path: '/letter',
  name: '站内信',
  meta: {
    title: '站内信',
    nav: true,
    link: false,
    user: true,
    agent: false
  },
  component: letter
}, {
  path: '/letterDetail',
  name: '站内信息',
  meta: {
    title: '站内信息',
    nav: true,
    link: false,
    user: true,
    agent: false
  },
  component: letterDetail
}, {
  path: '/betDetail',
  name: '注单详情',
  meta: {
    title: '注单详情',
    nav: true,
    link: false,
    user: true,
    agent: false
  },
  component: betDetail
}, {
  path: '/seekDetail',
  name: '追号详情',
  meta: {
    title: '追号详情',
    nav: true,
    link: false,
    user: true,
    agent: false
  },
  component: seekDetail
}, {
  path: '/agentIntro',
  name: '代理说明',
  meta: {
    title: '代理说明',
    nav: true,
    link: false,
    user: true,
    agent: true
  },
  component: agentIntro
}]

export default routes
