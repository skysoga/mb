<template>
  <div class="main main-list">
    <div class="textMore dataType" @click="BottomBoxShow=!BottomBoxShow"><em>{{top_text}}</em> <i class="iconfont"></i></div>
    <div class="" id="leftTabBox">
      <div class="hd">
          <ul>
            <li v-for="(x,index) in li_arr_obj" :class="li_state==index?'on':null" @click="search(index)">{{x}}</li>
          </ul>
      </div>
      <div class="bd dontSelect">
        <div class="scrollBox" v-for="x in 3">
          <div class="touchScroll touchScroll-list" @touchend="scroll(x-1)" v-if="li_state==x-1" ref="div">
            <template v-if="temp_ajax[newDay][x-1].DataCount===0">
              <div class='fullPageMsg' ><div class='fullPageIcon iconfont'>&#xe63c;</div><p>暂无记录</p></div>
            </template>
            <template v-else>
              <template v-if="x==1">
                <div class="" v-for="item in temp_ajax[newDay][x-1].res_data">
                  <a class="active">
                    <div><p>{{item.TypeName}}</p><span>{{item.AddTime}}</span> </div>
                    <strong :class="check_money(item.InMoney,item.OutMoney)>0?'InMoney':'OutMoney'">{{check_money(item.InMoney,item.OutMoney)}}</strong>
                  </a>
                  <div class="hr1px hr1px-list"></div>
                </div>
              </template>
              <template v-if="x==2">
                <div class="" v-for="item in temp_ajax[newDay][x-1].res_data">
                  <a class="active">
                    <div><p>提现扣款</p><span>{{item.AddTime}}</span> </div>
                    <div class="fr">
                      <strong class="OutMoney">-{{item.OutMoney}}</strong>
                      <span class="fr">{{item.State}}</span>
                    </div>
                  </a>
                  <div class="hr1px hr1px-list"></div>
                </div>
              </template>
              <template v-if="x==3">
              <div class="" v-for="item in temp_ajax[newDay][x-1].res_data">
                <a class="active">
                  <div><p>{{item.TypeName}}</p><span>{{item.AddTime}}</span> </div>
                  <div class="fr"><strong class="InMoney">{{"+"+item.ApplyMoney}}</strong><span class="fr">{{item.State}}</span></div>
                </a>
                <div class="hr1px hr1px-list"></div>
              </div>
              </template>
              <div class="msg noMore" v-html="msg[temp_ajax[newDay][x-1].cant_scroll]" v-if="temp_ajax[newDay][x-1].cant_scroll<2"></div>
                <div class="msg noMore" v-else v-html="msg[temp_ajax[newDay][x-1].cant_scroll][newDay]"></div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <bottom-box v-show = "BottomBoxShow" :list = "BottomBoxList"></bottom-box>
  </div>
</template>
<script>
import bottombox from '../components/bottom-box'
export default {
  data() {
    return {
      li_arr_obj: ["所有类型","提现记录","充值记录"],
      li_state: 0,
      ajaxData:{
        Action:"GetBillRecord",
        BetweenDays:0,
        Index:0,
        UserId:0,
        DataNum:10,
        Type:-1
      },
      BottomBoxShow:false,
      top_text:"今天",
      BottomBoxList:{
        0:"今天",
        1:"昨天",
        7:"七天"
      },
      type:['GetBillRecord','GetWithdrawRecord','GetRechargeRecord'],
      msg: [null, layer.icon.load + "正在加载...", {0:"已显示今天全部记录",1:"已显示昨天全部记录",7:"已显示七天全部记录"}],
      temp_ajax: {},
      page_index:0,
      newDay:0,
      oldDay:0,
      document_height:0,
      window_height:0
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
      this.check(this.newDay)
    },
    check:function(newDay){
      if (!this.temp_ajax[newDay]) {
        this.temp_ajax[newDay] = {}
        for (var i = 0; i < 3; i++) {
          this.temp_ajax[newDay][i] = {
            Action: this.type[i],
            Index: 0,
            BetweenDays:newDay,
            DataCount: null, //用datacount来判断是否有请求过，压入缓存，因为有请求过，datacount就会变化为0或者具体的number数值
            data_totalpage: 0,
            cant_scroll: 0,
            res_data: []
          }
        }
        this.getData(this.page_index)
      } else {
        if (this.temp_ajax[newDay][this.page_index].DataCount === null) { //说明只是生成占位，并没有请求过数据
          if(!this.temp_ajax[newDay][this.page_index].cant_scroll){
            this.getData(this.page_index)
            console.log("占位缓存")
          }
        } else {} //说明数据真的有缓存,不需要任何操作，因为vue会根据变化自动渲染
      }
    },
    search: function(index) {
      this.page_index = this.li_state = index || 0
     this.check(this.newDay)
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
    scroll:function(i){
      this.window_height=document.documentElement.clientHeight||document.body.clientHeight
      this.document_height=document.documentElement.scrollHeight||document.body.scollHeight
      if (this.temp_ajax[this.newDay][i].cant_scroll) {
        return
      }else if (this.$refs.div[0].scrollTop-40>this.document_height-this.window_height) {
        this.getData(i)
      }
    },
    create_obj: function(obj, username, i, j) {
      obj[username][i].cant_scroll = j
      return obj
    },
    getData: function(i) {
      let newUser=this.newDay
      this.temp_ajax = Object.assign({}, this.temp_ajax, this.create_obj(this.temp_ajax, newUser, i, 1))
        //从中间态中取数据
      this.ajaxData = Object.assign(this.ajaxData, {
        Action: this.temp_ajax[newUser][i].Action,
        Index: this.temp_ajax[newUser][i].Index
      })
      this.ajaxData.BetweenDays=this.newDay
      let temp_data=this.ajaxData
      _fetch(this.ajaxData).then((data) => {
        if (data.Code === 1) {
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
        }  else {
          layer.msgWarn(data.StrCode)
        }
      })
    }
  },
  created() {
    this.search()
  }
}
</script>