import login from '../views/login' //登录
import register from '../views/register' //注册
import securityCenter from '../views/securityCenter' // 安全中心
import personalInfo from '../views/personalInfo' // 个人资料
import personalLevel from '../views/personalLevel' // 等级头衔
import manageBankcard from '../views/manageBankcard' // 银行卡管理
import verifyBankcard from '../views/verifyBankcard' // 验证首张银行卡
import setBankcard from '../views/setBankcard' // 绑定银行卡
import activity from '../views/activity' // 活动中心
import PLstatement from '../views/PLstatement' // 今日盈亏
import agentReport from '../views/agentReport' // 代理报表
import manageInvite from '../views/manageInvite' // 下级开户
import manageIcode from '../views/manageIcode' // 邀请码
const AgentCode = () => import('../views/AgentCode') // 邀请码代理
import memberCode from '../views/memberCode' // 邀请码玩家
import rebateDes from '../views/rebateDes' // 返点赔率表
import verifyPwd from '../views/verifyPwd' // 验证密码
import setPwd from '../views/setPwd' // 设置密码
import setSafePwd from '../views/setSafePwd' // 设置安全密码
import verifySafePwd from '../views/verifySafePwd'// 验证安全密码
import setMobile from '../views/setMobile'// 绑定密保手机
import verifyMobile from '../views/verifyMobile'// 验证密保手机
import verifyQuestion from '../views/verifyQuestion'// 验证密保问题
import setQuestion from '../views/setQuestion'// 设置密保问题
import verifyMail from '../views/verifyMail'// 验证密保邮箱
import setMail from '../views/setMail'// 绑定密保邮箱
import resetWay from '../views/resetWay'// 找回密码
import forgetPwd from '../views/forgetPwd'// 忘记密码
import ping from '../views/ping'// 线路检测
import ebankPay from '../views/ebankPay'// 银行转帐
import quickPay from '../views/quickPay'// 快捷支付
import alipay from '../views/alipay'// 支付宝充值
import wechatPay from '../views/wechatPay'// 微信充值
import withdraw from '../views/withdraw'// 提现
import mobile from '../views/mobile'// 手机购彩
import trendChart from '../views/trendChart'// 走势图
import howtoplay from '../views/howtoplay'// 玩法说明
import qqPay from '../views/qqPay'// QQ支付
import unionPay from '../views/unionPay'// 银联二维码支付
import ArtificialAppeal from '../views/ArtificialAppeal'// 身份识别
var routes = [
  {
    path: '/login',
    name: '登录',
    meta: {
      title: '用户登录',
      user: false
    },
    component: login
  }, {
    path: '/register',
    name: '注册',
    meta: {
      title: '用户注册',
      user: false
    },
    component: register
  }, {
    path: '/securityCenter',
    name: '我的帐户',
    meta: {
      title: '我的帐户',
      user: true
    },
    component: securityCenter
  }, {
    path: '/personalInfo',
    name: '个人资料',
    meta: {
      title: '个人资料',
      user: true
    },
    component: personalInfo
  }, {
    path: '/personalLevel',
    name: '等级头衔',
    meta: {
      title: '等级头衔',
      user: true
    },
    component: personalLevel
  }, {
    path: '/manageBankcard',
    name: '银行卡管理',
    meta: {
      title: '银行卡管理',
      user: true
    },
    component: manageBankcard
  }, {
    path: '/verifyBankcard',
    name: '验证首张银行卡',
    meta: {
      title: '验证首张银行卡',
      user: true
    },
    component: verifyBankcard
  }, {
    path: '/setBankcard',
    name: '绑定银行卡',
    meta: {
      title: '绑定银行卡',
      user: true
    },
    component: setBankcard
  }, {
    path: '/activity',
    name: "活动",
    meta: {
      title: '活动中心',
      user: false
    },
    children: [{
      path: '/activity/:id',
      component: activity,
      name: '活动中心'
    }],
    component: activity
  }, {
    path: '/PLstatement',
    name: '今日盈亏',
    meta: {
      title: '今日盈亏',
      user: true
    },
    component: PLstatement
  }, {
    path: '/agentReport',
    name: '代理报表',
    meta: {
      title: '代理报表',
      user: true,
      agent: true
    },
    component: agentReport
  }, {
    path: '/manageInvite',
    name: '下级开户',
    meta: {
      title: '下级开户',
      user: true,
      agent: true
    },
    component: manageInvite
  }, {
    path: '/manageIcode',
    meta: {
      title: '邀请码',
      user: true,
      agent: true
    },
    children: [{
      path: '',
      redirect: '/AgentCode'
    }, {
      path: 'AgentCode',
      component: AgentCode,
      name: '代理邀请码'
    }, {
      path: 'memberCode',
      component: memberCode,
      name: '玩家邀请码'
    }],
    component: manageIcode
  }, {
    path: '/rebateDes',
    name: '返点赔率表',
    meta: {
      title: '返点赔率表',
      user: true
    },
    component: rebateDes
  }, {
    path: '/verifyPwd',
    name: '验证密码',
    meta: {
      title: '验证密码',
      user: true
    },
    component: verifyPwd
  }, {
    path: '/setPwd',
    name: '设置密码',
    meta: {
      title: '设置密码',
      user: false,
      verify: 1,
      from: 'Pwd,SafePwdForget,MobileForget,QuestionForget,MailForget,'
    },
    component: setPwd
  }, {
    path: '/setSafePwd',
    name: '设置安全密码',
    meta: {
      title: '设置安全密码',
      user: true,
      verify: 'UserHasSafePwd',
      from: 'SafePwd,Mobile,Question,Mail,Pwd,BankCard,'
    },
    component: setSafePwd
  }, {
    path: '/verifySafePwd',
    name: '验证安全密码',
    meta: {
      title: '验证安全密码',
      user: false
    },
    component: verifySafePwd
  }, {
    path: '/setMobile',
    name: '绑定密保手机',
    meta: {
      title: '绑定密保手机',
      user: true,
      verify: 'UserMobile',
      from: 'Mobile,'
    },
    component: setMobile
  }, {
    path: '/verifyMobile',
    name: '验证密保手机',
    meta: {
      title: '验证密保手机',
      user: false
    },
    component: verifyMobile
  }, {
    path: '/verifyQuestion',
    name: '验证密保问题',
    meta: {
      title: '验证密保问题',
      user: false
    },
    component: verifyQuestion
  }, {
    path: '/setQuestion',
    name: '设置密保问题',
    meta: {
      title: '设置密保问题',
      user: true,
      verify: 'UserSafeQuestions',
      from: 'Question,'
    },
    component: setQuestion
  }, {
    path: '/verifyMail',
    name: '验证密保邮箱',
    meta: {
      title: '验证密保邮箱',
      user: false
    },
    component: verifyMail
  }, {
    path: '/setMail',
    name: '绑定密保邮箱',
    meta: {
      title: '绑定密保邮箱',
      user: true,
      verify: 'UserMail',
      from: 'Mail,'
    },
    component: setMail
  }, {
    path: '/resetWay',
    name: '找回密码',
    meta: {
      title: '找回密码',
      user: false
    },
    component: resetWay
  }, {
    path: '/forgetPwd',
    name: '忘记密码',
    meta: {
      title: '忘记密码',
      user: false
    },
    component: forgetPwd
  }, {
    path: '/ping',
    name: '线路检测',
    meta: {
      title: '线路检测',
      user: true
    },
    component: ping
  }, {
    path: '/withdraw',
    name: '提现',
    meta: {
      title: '提现',
      user: true
    },
    component: withdraw
  }, {
    path: '/ebankPay',
    name: '银行转帐',
    meta: {
      title: '银行转帐',
      user: true
    },
    component: ebankPay
  }, {
    path: '/quickPay',
    name: '快捷支付',
    meta: {
      title: '快捷支付',
      user: true
    },
    component: quickPay
  }, {
    path: '/alipay',
    name: '支付宝充值',
    meta: {
      title: '支付宝充值',
      user: true
    },
    component: alipay
  }, {
    path: '/wechatPay',
    name: '微信充值',
    meta: {
      title: '微信充值',
      user: true
    },
    component: wechatPay
  }, {
    path: '/qqPay',
    name: 'QQ钱包',
    meta: {
      title: 'QQ钱包',
      user: true
    },
    component: qqPay
  }, {
    path: '/mobile',
    name: '手机购彩',
    meta: {
      title: '手机购彩',
      user: false
    },
    component: mobile
  }, {
    path: '/trendChart/:ID',
    name: '走势图',
    meta: {
      title: '走势图',
      user: true
    },
    component: trendChart
  }, {
    path: '/howtoplay/:ID',
    name: '玩法说明',
    meta: {
      title: '玩法说明',
      user: false
    },
    component: howtoplay
  }, {
    path: '/unionPay',
    name: '银联扫码',
    meta: {
      title: '银联扫码',
      user: true
    },
    component: unionPay
  }, {
    path: '/ArtificialAppeal',
    name: '身份识别',
    meta: {
      title: '身份识别',
      user: true
    },
    component: ArtificialAppeal
  }
]
export default routes
