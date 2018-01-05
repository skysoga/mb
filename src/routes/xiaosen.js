const dailyPrise =require('../views/dailyPrise')//每日加奖
const upgrade =require('../views/upgrade')//晋级奖励
const activityInfo =require('../views/activityInfo')//站长活动
const setPwd =require('../views/setPwd')//设置密码
const verifyPwd =require('../views/verifyPwd')//修改登录密码
const verifySafePwd =require('../views/verifySafePwd')//修改安全密码
const setSafePwd =require('../views/setSafePwd')//设置安全密码
const verifyMobile =require('../views/verifyMobile')//修改手机
const setMobile =require('../views/setMobile')//设置手机
const verifyQuestion =require('../views/verifyQuestion')//修改密码问题
const setQuestion =require('../views/setQuestion')//设置密保问题
const verifyMail =require('../views/verifyMail')//修改邮箱
const setMail =require('../views/setMail')//设置邮箱
const manageBankcard =require('../views/manageBankcard')//银行卡管理
const resetWay =require('../views/resetWay')//找回方式
const forgetPwd =require('../views/forgetPwd')//忘记密码
const agentCenter =require('../views/agentCenter')//代理中心
const agentReport =require('../views/agentReport')//代理报表
const manageInvite =require('../views/manageInvite')//下级开户
const manageIcode =require('../views/manageIcode')//邀请码
const personalInfo =require('../views/personalInfo')//个人信息
const personalLevel =require('../views/personalLevel')//等级头衔
const PLstatement =require('../views/PLstatement')//今日盈亏
const setBankcard =require('../views/setBankcard')//设置银行卡
const verifyBankcard =require('../views/verifyBankcard')//验证银行卡
const AgentCode =require('../views/AgentCode')//邀请码代理
const memberCode =require('../views/memberCode')//邀请码玩家
const withdraw =require('../views/withdraw')//提现
const rebateDes =require('../views/rebateDes')//返点赔率表
const tool =require('../views/tool')//清缓存工具
const ping =require('../views/ping')//线路检测
const ArtificialAppeal =require('../views/ArtificialAppeal')//人工申诉
const ArtificialBank =require('../views/ArtificialBank')//人工申诉-银行卡验证
const ArtificialPhoto =require('../views/ArtificialPhoto')//人工申诉-核实
var routes = [{
  path: '/manageBankcard',
  name: '银行卡管理',
  meta:{
  title:'银行卡管理',
  nav:false,
  link:'/securityCenter',
  user:true,
  agent:false
  },
  component: manageBankcard
},{
  path: '/setMail',
  name: '绑定密保邮箱',
  meta:{
  title:'绑定密保邮箱',
  nav:false,
  link:'/securityCenter',
  user:true,
  verify:'UserMail',
  from:"Mail,",
  agent:false
  },
  component: setMail
},{
  path: '/verifyMail',
  name: '验证密保邮箱',
  meta:{
  title:'验证密保邮箱',
  nav:false,
  link:'/securityCenter',
  user:false,
  agent:false
  },
  component: verifyMail
},{
  path: '/setQuestion',
  name: '设置密保问题',
  meta:{
  title:'设置密保问题',
  nav:false,
  link:'/securityCenter',
  user:true,
  agent:false,
  verify:'UserSafeQuestions',
  from:"Question,"
  },
  component: setQuestion
},{
  path: '/verifyQuestion',
  name: '验证密保问题',
  meta:{
  title:'验证密保问题',
  nav:false,
  link:'/securityCenter',
  user:false,
  agent:false
  },
  component: verifyQuestion
},{
  path: '/setMobile',
  name: '绑定密保手机',
  meta:{
  title:'绑定密保手机',
  nav:false,
  link:'/securityCenter',
  user:true,
  agent:false,
  verify:'UserMobile',
  from:"Mobile,"
  },
  component: setMobile
},{
  path: '/verifyMobile',
  name: '验证密保手机',
  meta:{
  title:'验证密保手机',
  nav:false,
  link:'/securityCenter',
  user:false,
  agent:false
  },
  component: verifyMobile
},{
  path: '/setSafePwd',
  name: '设置安全密码',
  meta:{
  title:'设置安全密码',
  nav:false,
  link:'/securityCenter',
  user:true,
  agent:false,
  verify:'UserHasSafePwd',
  from:'SafePwd,Mobile,Question,Mail,Pwd'
  },
  component: setSafePwd
},{
  path: '/verifySafePwd',
  name: '验证安全密码',
  meta:{
  title:'验证安全密码',
  nav:false,
  link:'/securityCenter',
  user:false,
  agent:false
  },
  component: verifySafePwd
},{
  path: '/verifyPwd',
  name: '验证原密码',
  meta:{
  title:'验证原密码',
  nav:false,
  link:'/securityCenter',
  user:true,
  agent:false
  },
  component: verifyPwd
},{
  path: '/setPwd',
  name: '设置登录密码',
  meta:{
  title:'设置登录密码',
  nav:false,
  link:'/securityCenter',
  user:false,
  agent:false,
  verify:1,
  from:'Pwd,SafePwdForget,MobileForget,QuestionForget,MailForget,'
  },
  component: setPwd
},{
  path: '/dailyPrise',
  name: '每日加奖',
  meta:{
  title:"每日加奖",
  link:"/activity",
  nav:0,
  },
  component: dailyPrise
},{
  path: '/upgrade',
  name: '晋级奖励',
  meta:{
  title:"晋级奖励",
  link:"/activity",
  nav:0,
  },
  component: upgrade
},{
  path: '/activityInfo/:ID',
  name: 'activityInfo',
  meta:{
  title:"站长活动",
  link:"/activity",
  nav:0,
  },
  component: activityInfo
},{
  path: '/resetWay',
  name: '找回密码',
  meta:{
  title:"找回密码",
  link:"/securityCenter",
  user:false,
  nav:0,
  },
  component: resetWay
},{
  path: '/forgetPwd',
  name: '忘记密码',
  meta:{
  title:"忘记密码",
  link:"/login",
  user:false,
  nav:0,
  },
  component: forgetPwd
},{
  path: '/agentCenter',
  name: '代理中心',
  meta:{
  title:"代理中心",
  link:"/userCenter",
  nav:0,
  user:true,
  agent:true
  },
  component: agentCenter
},{
  path: '/agentReport',
  name: '代理报表',
  meta:{
  title:"代理报表",
  link:"/agentCenter",
  nav:0,
  user:true,
  agent:true
  },
  component: agentReport
},{
  path: '/manageInvite',
  name: '下级开户',
  meta:{
  titleList:[{
    title:"下级开户",
    to:"/manageInvite"
    },{
    title:"邀请码",
    to:"/manageIcode"
    }],
  user:true,
  link:'/agentCenter',
  agent:true
  },
  component: manageInvite
},{
  path: '/manageIcode',
  name: '邀请码',
  meta:{
  titleList:[{
    title:"下级开户",
    to:"/manageInvite"
    },{
    title:"邀请码",
    to:"/manageIcode"
    }],
  link:'/agentCenter',
  user:true,
  agent:true
  },
  component: manageIcode,
  children:[{
    path:'',
    component:AgentCode,
    name:'代理邀请码'
  },{
    path:'AgentCode',
    component:AgentCode,
    name:'代理邀请码'
  },{
    path:'memberCode',
    component:memberCode,
    name:'玩家邀请码'
  }]
},{
  path: '/personalInfo',
  name: '个人资料',
  meta:{
  titleList:[{
    title:"个人资料",
    to:"/personalInfo"
    },{
    title:"等级头衔",
    to:"/personalLevel"
    }],
  link:'/userCenter',
  user:true
  },
  component: personalInfo
},{
  path: '/personalLevel',
  name: '等级头衔',
  meta:{
  titleList:[{
    title:"个人资料",
    to:"/personalInfo"
    },{
    title:"等级头衔",
    to:"/personalLevel"
    }],
  link:'/userCenter',
  user:true
  },
  component: personalLevel
},{
  path: '/PLstatement',
  name: '今日盈亏',
  meta:{
  title:"今日盈亏",
  link:'/userCenter',
  user:true
  },
  component: PLstatement
},{
  path: '/setBankcard',
  name: '绑定银行卡',
  meta:{
  title:"绑定银行卡",
  link:'/manageBankcard',
  user:true
  },
  component: setBankcard
},{
  path: '/verifyBankcard',
  name: '验证银行卡',
  meta:{
  title:"验证银行卡",
  link:'/manageBankcard',
  user:true
  },
  component: verifyBankcard
},{
  path:'/withdraw',
  name:'提现',
  meta:{
  title:"提现",
  link:'/userCenter',
  user:true
  },
  component:withdraw
},
{
  path:'/rebateDes',
  name:'返点赔率',
  meta:{
    title:'返点赔率表',
    link:'/manageInvite',
    nav:0,
    user:true
  },
  children: [
        {
          path: '/rebateDes/:id',
          component: rebateDes,
          name:'返点赔率表'
        },
      ],
  component:rebateDes
},
{
  path:'/tool',
  name:'清缓存工具',
  meta:{
  title:'工具',
  link:'/index'
  },
  component:tool
},
{
  path:'/ArtificialAppeal',
  name:'登录密码验证',
  meta:{
    title:'登录密码验证',
    link:'/securityCenter',
    user:true
  },
  component:ArtificialAppeal
},{
  path:'/ArtificialBank',
  name:'银行卡验证',
  meta:{
    title:'银行卡验证',
    link:'/securityCenter',
    user:true
  },
  component:ArtificialBank
},{
  path:'/ArtificialPhoto',
  name:'人工身份核实',
  meta:{
    title:'人工身份核实',
    link:'/securityCenter',
    user:true
  },
  component:ArtificialPhoto
},
{
  path:'/ping',
  name:'线路检测',
  meta:{
    title:'线路检测',
    link:'/index',
    user:true
  },
  component:ping
}]
module.exports = routes
