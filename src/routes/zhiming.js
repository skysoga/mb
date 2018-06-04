//志明负责的路由
<<<<<<< HEAD
// const found = require('../views/found'
import letter from '../views/letter'
import newWinners from '../views/newWinners'
import letterDetail from '../views/letterDetail'
import Notice from '../views/Notice'
import NoticeDetail from '../views/NoticeDetail'
import playerHome from '../views/playerHome'
import competition from '../views/competition'
import billRecord from '../views/billRecord'
import agentMember from '../views/agentMember'
import lowerReport from '../views/lowerReport'
import betCenter from '../views/betCenter'
import betRecord from '../views/betRecord'
import betDetail from '../views/betDetail'
import seekDetail from '../views/seekDetail'
import seekOrder from '../views/seekOrder'
import agentIntro from '../views/agentIntro'
import agentBetRecord from '../views/agentBetRecord'
import agentBillRecord from '../views/agentBillRecord'
=======
// const found = require('../views/found')
const letter = require('../views/letter')
const newWinners =require('../views/newWinners')
// const letterDetail = require('../views/letterDetail')//失效
const Notice = require('../views/Notice')
const NoticeDetail = require('../views/NoticeDetail')
const playerHome = require('../views/playerHome')
const competition = require('../views/competition')
const billRecord = require('../views/billRecord')
const agentMember = require('../views/agentMember')
const lowerReport = require('../views/lowerReport')
const betCenter = require('../views/betCenter')
const betRecord = require('../views/betRecord')
const betDetail = require('../views/betDetail')
const seekDetail = require('../views/seekDetail')
const seekOrder = require('../views/seekOrder')
const agentIntro = require('../views/agentIntro')
const agentBetRecord = require('../views/agentBetRecord')
const agentBillRecord = require('../views/agentBillRecord')
>>>>>>> origin/投注与追号
var routes = [{
  path: '/Notice',
  name:"公告",
  meta: {
    titleList: [{
      title: "公告",
      to: "/Notice"
    }, {
      title: "私信",
      to: "/letter"
    }],
    link: "/userCenter"
  },
  component: Notice
}, {
  path: '/letter',
  name:"私信",
  meta: {
    titleList: [{
      title: "公告",
      to: "/Notice"
    }, {
      title: "私信",
      to: "/letter"
    }],
    link: "/userCenter"
  },
  component: letter
}, {
  path: "/NoticeDetail",
  name: "公告详情",
  meta: {
    title: "公告",
    user: 1,
    link: "/Notice"
  },
  component: NoticeDetail
},{
  path: "/letterDetail",
  name: "私信详情",
  meta: {
    title: "私信",
    user: 1,
    link: "/letter"
  },
  component: NoticeDetail
}, {
  path: "/playerHome",
  name: "玩家详情",
  meta: {
    title: "玩家信息",
    back: -1
  },
  component: playerHome
},{
  path: "/billRecord",
  name: "交易记录",
  meta: {
    title: "交易记录",
    link: "/userCenter"
  },
  component: betRecord
}, {
  path: "/agentMember",
  name: "会员管理",
  meta: {
    title: "会员管理",
    link: "/agentCenter",
    user: 1
  },
  component: agentMember
}, {
  path: "/lowerReport",
  name: "下级报表",
  meta: {
    title: "下级报表",
    link: "/agentCenter",
    user: 1
  },
  component: lowerReport
}, {
  path: "/betRecord",
  name: "投注记录",
  meta: {
    title: "投注记录",
    link: "/userCenter",
    user: 1
  },
  component: betRecord
}, {
  path: "/betDetail",
  name: "注单详情",
  meta: {
    title: "注单详情",
    user: 1,
    back:-1
  },
  component: betDetail
}, {
  path: "/agentBetRecord",
  name: "投注明细",
  meta: {
    title: "投注明细",
    link: "/agentCenter",
    user: 1
  },
  component: betRecord
},{
  path: "/agentBillRecord",
  name: "交易明细",
  meta: {
    title: "交易明细",
    link: "/agentCenter",
    user: 1
  },
  component: betRecord
},{
  path: '/betCenter',
  name: '投注中心',
  meta:{
    titleList:[{
      title:"投注记录",
      to:"/betCenter/betRecord",

    },{
      title:"追号记录",
      to:"/betCenter/seekOrder",
    }],
    link:"/userCenter"
  },
  component: betCenter,
  children:[{
    path:"",
    name:"",
    redirect:"/betCenter/betRecord"
  },{
    path:"betRecord",
    name:"投注记录",
    component:betRecord
  },{
    path:"seekOrder",
    name:"追号记录",
    component:seekOrder
  }]
}, {
  path: "/seekDetail",
  name: "追号详情",
  meta: {
    title: "追号详情",
    back:-1,
    user: 1
  },
  component: seekDetail
},{
  path: "/agentIntro",
  name: "代理说明",
  meta: {
    title: "代理说明",
    link:"/agentCenter",
    user: 1
  },
  component: agentIntro
}]

export default routes;
