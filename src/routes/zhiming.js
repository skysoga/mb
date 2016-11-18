//志明负责的路由
const letter =resolve => require(['../views/letter'],resolve)
const Notice =resolve => require(['../views/Notice'],resolve)
const NoticeDetail =resolve => require(['../views/NoticeDetail'],resolve)

var routes=[
  {
    path: '/Notice',
    meta:{
      titleList:[{
        title:"网站公告",
        to:"/Notice"
      },{
        title:"站内信",
        to:"/letter"
      }],
      link:"/userCenter"
    },
    component:Notice
  },{
    path: '/letter',
    meta:{
      titleList:[{
        title:"网站公告",
        to:"/Notice"
      },{
        title:"站内信",
        to:"/letter"
      }],
      link:"/userCenter"
    },
    component: letter
  },{
    path:"/NoticeDetail/:ID",
    name:"公告",
    meta:{
      title:"公告",
      user:1,
      link:"/Notice"
    },
    component:NoticeDetail
  }
]

module.exports = routes;
