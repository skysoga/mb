//志明负责的路由
const letter = resolve => require(['../views/letter'], resolve)
const Notice = resolve => require(['../views/Notice'], resolve)
const NoticeDetail = resolve => require(['../views/NoticeDetail'], resolve)
const playerHome = resolve => require(['../views/playerHome'], resolve)
const competition = resolve => require(['../views/competition'], resolve)
const billRecord = resolve => require(['../views/billRecord'], resolve)
const agentMember = resolve => require(['../views/agentMember'], resolve)
const lowerReport = resolve => require(['../views/lowerReport'], resolve)
const betRecord = resolve => require(['../views/betRecord'], resolve)
const betDetail = resolve => require(['../views/betDetail'], resolve)
const agentBetRecord = resolve => require(['../views/agentBetRecord'], resolve)
var routes = [{
  path: '/Notice',
  meta: {
    titleList: [{
      title: "网站公告",
      to: "/Notice"
    }, {
      title: "站内信",
      to: "/letter"
    }],
    link: "/userCenter"
  },
  component: Notice
}, {
  path: '/letter',
  meta: {
    titleList: [{
      title: "网站公告",
      to: "/Notice"
    }, {
      title: "站内信",
      to: "/letter"
    }],
    link: "/userCenter"
  },
  component: letter
}, {
  path: "/NoticeDetail/:ID",
  name: "公告",
  meta: {
    title: "公告",
    user: 1,
    link: "/Notice"
  },
  component: NoticeDetail
}, {
  path: "/playerHome",
  name: "玩家详情",
  meta: {
    title: "玩家信息",
    link: "/newWinners"
  },
  component: playerHome
}, {
  path: '/competition',
  name: "昨日奖金榜",
  meta: {
    titleList: [{
      title: "中奖信息",
      to: "/newWinners"
    }, {
      title: "昨日奖金榜",
      to: "/competition"
    }]
  },
  component: competition
}, {
  path: "/billRecord",
  name: "交易记录",
  meta: {
    title: "交易记录",
    link: "/userCenter"
  },
  component: billRecord
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
  name: "投注详情",
  meta: {
    title: "投注详情",
    link: "/betRecord",
    user: 1
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
  component: agentBetRecord
}]

module.exports = routes;
