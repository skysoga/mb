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
const betRecord = resolve => require(['../views/betRecord'], resolve)
const betDetail = resolve => require(['../views/betDetail'], resolve)
const agentBetRecord = resolve => require(['../views/agentBetRecord'], resolve)
const agentBillRecord = resolve => require(['../views/agentBillRecord'], resolve)
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
  name: "站内信",
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
    link: "/newWinners"
  },
  component: playerHome
},{
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
},{
  path: "/agentBillRecord",
  name: "交易明细",
  meta: {
    title: "交易明细",
    link: "/agentCenter",
    user: 1
  },
  component: agentBillRecord
},/**{
  path: "/found",
  name: "发现",
  meta: {
    titleList: [{
      title: "中奖信息",
      to: "/newWinners"
    }, {
      title: "昨日奖金榜",
      to: "/competition"
    }],
    nav:1
  },
  component: found,
  children:[{
      path: '',
      meta:{
        nav:1
      },
      component: newWinners
    },{
      path:"/competition",
      meta:{
        nav:1
      },
      component:competition
    },{
      path:"/newWinners",
      meta:{
        nav:1
      },
      component:newWinners
    }]
}**/,{
path: "/newWinners",
name: "发现",
meta: {
  titleList: [{
    title: "中奖信息",
    to: "/newWinners"
  }, {
    title: "昨日奖金榜",
    to: "/competition"
  }],
  nav:1
},
component: newWinners
},{
  path: "/competition",
  name: "昨日奖金榜",
  meta: {
    titleList: [{
      title: "中奖信息",
      to: "/newWinners"
    }, {
      title: "昨日奖金榜",
      to: "/competition"
    }],
    nav:1
  },
  component: competition
}]

module.exports = routes;
