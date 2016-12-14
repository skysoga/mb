import bottombox from '../components/bottom-box'
export default {
  data() {
    return {
      li_arr_obj1: ["全部", "已中奖", "未中奖", "等待开奖"],
      li_arr_obj2: ["所有类型","提现记录","交易记录"],
      type:['GetAgentBillRecord','GetAgentWithdrawRecord','GetAgentRechargeRecord'],
      li_state: 0,
      BottomBoxShow:false,
      top_text:"今天",
      BottomBoxList:{
        0:"今天",
        1:"昨天",
        7:"七天"
      },
      ajaxData: {
        BetweenDays: 0,
        Index: 0,
        UserName: 0,
        DataNum: 10
      },
      msg: [null, layer.icon.load + "正在加载...", {0:"已显示今天全部记录",1:"已显示昨天全部记录",7:"已显示七天全部记录"}],
      temp_ajax: {},
      UnFindUser: {},
      oldName: 0,
      newName: 0,
      temp_name:'',
      page_index:0,
      newDay:0,
      oldDay:0,
      document_height:0,
      window_height:0,
      isAgentBetRecord:false
    }
  },
  components: {
    'bottom-box': bottombox
  },
  methods: {
    bottomBox:function(a,b){
      this.top_text=b
      this.BottomBoxShow=!this.BottomBoxShow
      if(a===this.oldDay){return}
      this.newDay=this.oldDay=a
      this.check(this.newName,this.newDay)
    },
    check_money:function(inmoney,outmoney){
      let inm=parseFloat(inmoney)
      let out=parseFloat(outmoney)
      inm=inm?inm:0
      out=out?out:0
      if(inm-out>=0){
        return "+"+(inm-out)
      }else{
        return inm-out
      }
    },
    check:function(newName,newDay){
      if (!this.temp_ajax[newName+"%"+newDay]) {
        console.log("无占位缓存")
        this.temp_ajax[newName+"%"+newDay] = {}
        for (var i = 0; i < 4; i++) {
          this.temp_ajax[newName+"%"+newDay][i] = {
            Index: 0,
            BetweenDays:newDay,
            DataCount: null, //用datacount来判断是否有请求过，压入缓存，因为有请求过，datacount就会变化为0或者具体的number数值
            data_totalpage: 0,
            cant_scroll: 0,
            res_data: []
          }
        }
        this.ajaxData.UserName = newName
        this.getData(this.page_index)
      } else {
        if (this.temp_ajax[newName+"%"+newDay][this.page_index].DataCount === null) { //说明只是生成占位，并没有请求过数据
          if (!this.temp_ajax[newName+"%"+newDay][this.page_index].cant_scroll) {
            this.ajaxData.UserName = newName
            this.getData(this.page_index)
            console.log("占位缓存")
          }
        } else {
          console.log("缓存") //说明数据真的有缓存,不需要任何操作，因为vue会根据变化自动渲染
        }
      }
    },
    search: function(index) {
       this.page_index = this.li_state = index || 0
      this.oldName = this.ajaxData.UserName //储存上一状态的用户名
      if (this.UnFindUser[this.temp_name||0]) {
        layer.msgWarn(this.UnFindUser[this.temp_name])
        this.temp_name = this.oldName || '' //搜索框填入上一状态的名字
        return
      }
      this.newName=this.temp_name||0
      this.check(this.newName,this.newDay)
    },
    create_obj: function(obj, username, i, j) {
      obj[username][i].cant_scroll = j
      return obj
    },
    scroll:function(i){
      this.window_height=document.documentElement.clientHeight||document.body.clientHeight
      this.document_height=document.documentElement.scrollHeight||document.body.scollHeight
      if (this.temp_ajax[this.newName+"%"+this.newDay][i].cant_scroll) {
        return
      }else if (this.$refs.div[0].scrollTop-40>this.document_height-this.window_height) {
        this.getData(i)
      }
    },
    getData: function(i) {
      let newUser=this.newName+"%"+this.newDay
      this.temp_ajax = Object.assign({}, this.temp_ajax, this.create_obj(this.temp_ajax, newUser, i, 1))
        //从中间态中取数据
      this.ajaxData = Object.assign(this.ajaxData, {
        //State: this.temp_ajax[newUser][i].State,
        Index: this.temp_ajax[newUser][i].Index,
        //BetweenDays: this.temp_ajax[newUser][i].BetweenDays
      })
      if(this.isAgentBetRecord){
        this.ajaxData.State=i+1
        this.ajaxData.Action="GetAgentBetData"
        this.ajaxData.LotteryCode=-1
      }else{
        this.ajaxData.Action=this.type[i]
        this.ajaxData.Type=-1
      }
      this.ajaxData.BetweenDays=this.newDay
      let temp_data=this.ajaxData
      _fetch(this.ajaxData).then((data) => {
        if (data.Code === 1) {
          console.log('ajax')
          if(temp_data.UserName!==this.newName){console.log("name切换太快");return}
          if(temp_data.BetweenDays!==this.newDay){console.log("day切换太快",temp_data.BetweenDays,this.newDay);return}
          this.temp_ajax = Object.assign({}, this.temp_ajax, this.create_obj(this.temp_ajax, newUser, i, 0))
          if (this.temp_ajax[newUser][i].Index === 0) {
            this.temp_ajax[newUser][i].DataCount = data.DataCount
            this.temp_ajax[newUser][i].data_totalpage = Math.ceil(data.DataCount / this.ajaxData.DataNum)
          }
          this.temp_ajax[newUser][i].Index++
            if (this.temp_ajax[newUser][i].Index >= this.temp_ajax[newUser][i].data_totalpage) {
              this.temp_ajax = Object.assign({}, this.temp_ajax, this.create_obj(this.temp_ajax, newUser, i, 2))
            }
          this.temp_ajax[newUser][i].res_data = this.temp_ajax[newUser][i].res_data.concat(data.BackData)
        } else if (data.Code === 2) {
          delete this.temp_ajax[newUser]
          layer.msgWarn(data.StrCode)
          this.UnFindUser[this.temp_name||0] = data.StrCode
          this.temp_name = this.oldName || '' //填入上次搜索的名字
          this.ajaxData.UserName =this.newName = this.oldName || 0
        } else {
          layer.msgWarn(data.StrCode)
        }
      })
    },
    jump:function(id,userid){
      this.$router.push({path:'betDetail',query:{ID:id,UID:userid}})
    }
  },
  created() {
    this.isAgentBetRecord=this.$route.fullPath.search("agentBetRecord")>0
    this.search()
  }
}
