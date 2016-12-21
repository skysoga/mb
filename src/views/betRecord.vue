<template>
  <div class="main">
    <div class="textMore dataType" @click="BottomBoxShow=!BottomBoxShow"><em>{{top_text}}</em> <i class="iconfont"></i></div>
    <!-- 判断是明细页面还是记录页面，明细页面有搜索框，记录则无 -->
    <div class="searchBtn" v-if="isAgent">
      <div class="searchCon">
        <!-- placeholder需要判断是投注明细页面还是交易明细页面 -->
        <input class="proxySearch" type="text" :placeholder="isBetPage?'下级投注查询':'下级交易查询'" v-model.lazy="temp_name">
      </div>
      <a id="submitBtn">
        <div class="submitTouch" @click="search(li_state)"><i class="iconfont"></i></div>
      </a>
    </div>
    <div class="" id="leftTabBox">
      <!-- 判断是投注页面还是交易页面，两者的title不一样 -->
      <div class="hd">
        <ul><li v-for="(x,index) in (isBetPage?li_bet:li_bill)" :class="li_state==index?'on':null" @click="search(index)">{{x}}</li></ul>
      </div>
      <div class="bd dontSelect">
        <div class="scrollBox" v-for="x in (isBetPage?4:3)">
          <div class="touchScroll" @touchend="scroll(x-1)" v-if="li_state==x-1" ref="div">
            <!-- 投注模板页面 -->
            <template v-if="isBetPage">
              <template v-if="temp_ajax[newName+'%'+newDay][x-1].DataCount===0">
                <div class='fullPageMsg'>
                  <div class='fullPageIcon iconfont'>&#xe63c;</div>
                  <p>暂无记录</p>
                </div>
              </template>
              <template v-else>
                <template v-if="x==1">
                  <div class="" v-for="item in temp_ajax[newName+'%'+newDay][x-1].res_data">
                    <a class="active" @click="$router.push({path:'/betDetail',query:{ID:item.ID,UID:item.UserId||0}})">
                      <div><p>{{isAgent?item.UserName:item.LotteryName}}<span>￥{{item.BetMoney}}</span></p><span>{{item.AddTime}}</span></div>
                      <div class="fr" v-if="Number(item.State)"><strong class="InMoney fr">+{{item.State}}</strong><span class="InMoney fr">已中奖</span></div>
                      <strong :class="item.State==='等待开奖'?'OutMoney':''" v-else>{{item.State}}</strong>
                    </a>
                    <div class="hr1px"></div>
                  </div>
                </template>
                <template v-if="x==2">
                <div class="" v-for="item in temp_ajax[newName+'%'+newDay][x-1].res_data">
                  <a class="active" @click="$router.push({path:'/betDetail',query:{ID:item.ID,UID:item.UserId||0}})">
                    <div>
                      <p>{{isAgent?item.UserName:item.LotteryName}}<span>￥{{item.BetMoney}}</span></p><span>{{item.AddTime}}</span></div>
                    <div class="fr" v-if="Number(item.State)"><strong class="InMoney fr">+{{item.State}}</strong><span class="InMoney fr">已中奖</span></div>
                    <strong class="" v-else>{{item.State}}</strong>
                  </a>
                  <div class="hr1px"></div>
                </div>
                </template>
                <template v-if="x==3">
                <div class="" v-for="item in temp_ajax[newName+'%'+newDay][x-1].res_data">
                  <a class="active" @click="$router.push({path:'/betDetail',query:{ID:item.ID,UID:item.UserId||0}})">
                    <div>
                      <p>{{isAgent?item.UserName:item.LotteryName}}<span>￥{{item.BetMoney}}</span></p><span>{{item.AddTime}}</span></div>
                    <div class="fr" v-if="Number(item.State)"><strong class="InMoney fr">+{{item.State}}</strong><span class="InMoney fr">已中奖</span></div>
                    <strong class="" v-else>{{item.State}}</strong>
                  </a>
                  <div class="hr1px"></div>
                </div>
                </template>
                <template v-if="x==4">
                <div class="" v-for="item in temp_ajax[newName+'%'+newDay][x-1].res_data">
                  <a class="active" @click="$router.push({path:'/betDetail',query:{ID:item.ID,UID:item.UserId||0}})">
                    <div>
                      <p>{{isAgent?item.UserName:item.LotteryName}}<span>￥{{item.BetMoney}}</span></p><span>{{item.AddTime}}</span></div>
                     <strong class="OutMoney">{{item.State}}</strong>
                  </a>
                  <div class="hr1px"></div>
                </div>
                </template>
                <div class="msg noMore" v-html="msg[temp_ajax[newName+'%'+newDay][x-1].cant_scroll]" v-if="temp_ajax[newName+'%'+newDay][x-1].cant_scroll<2"></div>
                  <div class="msg noMore" v-else v-html="msg[temp_ajax[newName+'%'+newDay][x-1].cant_scroll][newDay]"></div>
              </template>
            </template>
            <!-- 投注模板页面 -->
            <!-- 交易模板页面 -->
            <template v-else>
              <template v-if="temp_ajax[newName+'%'+newDay][x-1].DataCount===0">
                <div class='fullPageMsg'>
                  <div class='fullPageIcon iconfont'>&#xe63c;</div>
                  <p>暂无记录</p>
                </div>
              </template>
              <template v-else>
                <template v-if="x==1">
                  <div class="" v-for="item in temp_ajax[newName+'%'+newDay][x-1].res_data">
                    <a class="active">
                      <div><p>{{isAgent?item.UserName:item.TypeName}}</p><span>{{item.AddTime}}</span> </div>
                      <div class="fr" v-if="isAgent">
                        <strong :class="check_money(item.InMoney,item.OutMoney)>0?'InMoney':'OutMoney'">{{check_money(item.InMoney,item.OutMoney)}}</strong>
                        <span class="fr">{{item.TypeName}}</span>
                      </div>
                      <strong v-else :class="check_money(item.InMoney,item.OutMoney)>0?'InMoney':'OutMoney'">{{check_money(item.InMoney,item.OutMoney)}}</strong>
                    </a>
                    <div class="hr1px"></div>
                  </div>
                </template>
                <template v-if="x==2">
                  <div class="" v-for="item in temp_ajax[newName+'%'+newDay][x-1].res_data">
                    <a class="active">
                      <div><p>{{isAgent?item.UserName:"提现扣款"}}</p><span>{{item.AddTime}}</span> </div>
                      <div class="fr">
                        <strong class="OutMoney">-{{item.OutMoney}}</strong>
                        <span class="fr">{{item.State}}</span>
                      </div>
                    </a>
                    <div class="hr1px"></div>
                  </div>
                </template>
                <template v-if="x==3">
                  <div class="" v-for="item in temp_ajax[newName+'%'+newDay][x-1].res_data">
                    <a class="active">
                      <div><p>{{isAgent?item.UserName:item.TypeName}}</p><span>{{item.AddTime}}</span> </div>
                      <div class="fr"><div class="fr"><strong class="InMoney" v-if="Number(item.InMoney)">+{{item.InMoney}}</strong>
                        <strong class="InMoney" v-else>+{{item.ApplyMoney}}</strong>
                        <span class="fr">{{item.State}}</span></div> </div>
                    </a>
                    <div class="hr1px"></div>
                  </div>
                </template>
                <div class="msg noMore" v-html="msg[temp_ajax[newName+'%'+newDay][x-1].cant_scroll]" v-if="temp_ajax[newName+'%'+newDay][x-1].cant_scroll<2"></div>
                  <div class="msg noMore" v-else v-html="msg[temp_ajax[newName+'%'+newDay][x-1].cant_scroll][newDay]"></div>
              </template>
            </template>
            <!-- 交易模板页面 -->
          </div>
        </div>
      </div>
    </div>
    <!-- 底部弹框组件 -->
    <bottom-box v-show="BottomBoxShow" :list="BottomBoxList"></bottom-box>
  </div>
</template>

<script>
import bottombox from '../components/bottom-box'
export default {
  data() {
    return {
      li_bet: ["全部", "已中奖", "未中奖", "等待开奖"],
      li_bill: ["所有类型","提现记录","充值记录"],
      type_agent:['GetAgentBillRecord','GetAgentWithdrawRecord','GetAgentRechargeRecord'],
      type_record:['GetBillRecord','GetWithdrawRecord','GetRechargeRecord'],
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
      isAgent:false,
      isBetPage:false
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
        if(this.isAgent){
          this.ajaxData.UserName = newName
        }
        this.getData(this.page_index)
      } else {
        if (this.temp_ajax[newName+"%"+newDay][this.page_index].DataCount === null) { //说明只是生成占位，并没有请求过数据
          if (!this.temp_ajax[newName+"%"+newDay][this.page_index].cant_scroll) {
            if(this.isAgent){
              this.ajaxData.UserName = newName
            }
            this.getData(this.page_index)
            console.log("占位缓存")
          }
        } else {}
      }
    },
    search: function(index) {
      this.page_index = this.li_state = index || 0
      if(this.isAgent){
        this.oldName = this.ajaxData.UserName //储存上一状态的用户名
        if (this.UnFindUser[this.temp_name||0]) {
          layer.msgWarn(this.UnFindUser[this.temp_name])
          this.temp_name = this.oldName || '' //搜索框填入上一状态的名字
          return
        }
        this.newName=this.temp_name||0
      }
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
      this.ajaxData = Object.assign(this.ajaxData, {  Index: this.temp_ajax[newUser][i].Index})
      if(this.isBetPage){
        this.ajaxData.State=i+1
      }else{
        if(this.isAgent){
          this.ajaxData.Action=this.type_agent[i]
        }else{
          this.ajaxData.Action=this.type_record[i]
        }
      }
      this.ajaxData.BetweenDays=this.newDay
      let temp_data=this.ajaxData
      _fetch(this.ajaxData).then((data) => {
        if (data.Code === 1) {
          if(this.isAgent){
            if(temp_data.UserName!==this.newName){
              console.log("name切换太快")
              this.temp_ajax = Object.assign({}, this.temp_ajax, this.create_obj(this.temp_ajax, newUser, i, 0))
              return
            }
          }
          if(temp_data.BetweenDays!==this.newDay){
            console.log("day切换太快",temp_data.BetweenDays,this.newDay)
            this.temp_ajax = Object.assign({}, this.temp_ajax, this.create_obj(this.temp_ajax, newUser, i, 0))
            return
          }
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
    }
  },
  created() {
    this.isAgent=this.$route.path.toLowerCase().search("agent")>0
    this.isBetPage=this.$route.path.toLowerCase().search("betrecord")>0
    if(this.isBetPage){
      this.ajaxData.LotteryCode=-1
      if(this.isAgent){
        this.ajaxData.Action="GetAgentBetData"
        this.ajaxData.UserName=0
      }else{
        this.ajaxData.Action="GetBetData"
        this.ajaxData.UserId=0
      }
    }else{
      this.ajaxData.Type=-1
      if(this.isAgent){
        this.ajaxData.UserName=0
      }else{
        this.ajaxData.UserId=0
      }
    }
    this.search()
    console.log(this.isAgent,this.isBetPage)
  }
}
</script>



<style lang="scss" scoped>
  @import '../scss/detailList.scss';
</style>
