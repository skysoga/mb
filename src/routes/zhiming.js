//志明负责的路由
// const found = resolve => require(['../views/found'], resolve)
const letter = resolve => require(['../views/letter'], resolve)
const newWinners =resolve => require(['../views/newWinners'],resolve)
const letterDetail = resolve => require(['../views/letterDetail'], resolve)
const Notice = resolve => require(['../views/Notice'], resolve)
const NoticeDetail = resolve => require(['../views/NoticeDetail'], resolve)
const playerHome = resolve => require(['../views/playerHome'], resolve)
const competition = resolve => require(['../views/competition'], resolve)
const billRecord = resolve => require(['../views/billRecord'], resolve)
const agentMember = resolve => require(['../views/agentMember'], resolve)
const lowerReport = resolve => require(['../views/lowerReport'], resolve)
const betCenter = resolve => require(['../views/betCenter'], resolve)
const betRecord = resolve => require(['../views/betRecord'], resolve)
const betDetail = resolve => require(['../views/betDetail'], resolve)
const seekDetail = resolve => require(['../views/seekDetail'], resolve)
const seekOrder = resolve => require(['../views/seekOrder'], resolve)
const agentIntro = resolve => require(['../views/agentIntro'], resolve)
const maintain = resolve => require(['../views/maintain'], resolve)
const agentBetRecord = resolve => require(['../views/agentBetRecord'], resolve)
const agentBillRecord = resolve => require(['../views/agentBillRecord'], resolve)
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
  name: "公告",
  meta: {
    title: "公告",
    user: 1,
    link: "/Notice"
  },
  component: NoticeDetail
},{
  path: "/letterDetail",
  name: "私信",
  meta: {
    title: "站内信",
    user: 1,
    link: "/letter"
  },
  component: letterDetail
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
    redirect:"/betCenter/betRecord"
  },{
    path:"betRecord",
    component:betRecord
  },{
    path:"seekOrder",
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
},{
  path: "/maintain",
  name: "维护中...",
  meta: {
    title: "系统维护"
  },
  component: maintain
}]

module.exports = routes;
