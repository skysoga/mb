<template>
<div class="main">
  <div class="searchBtn">
    <div class="searchCon">
      <input class="proxySearch" type="text" placeholder="下级交易查询" v-model="searchWord">
    </div>
    <a id="submitBtn">
      <div class="submitTouch" @click="search(li_state)"><i class="iconfont"></i></div>
    </a>
  </div>
  <div class="" id="leftTabBox">
    <div class="hd">
      <ul>
        <li v-for="(x,index) in li_arr_obj" :class="li_state==index?'on':null" @click="search(index)">{{x}}</li>
      </ul>
    </div>
    <div class="bd dontSelect">
      <div class="scrollBox" v-for="x in 3">
        <div class="touchScroll" @touchend="scroll(x-1)" v-if="li_state==x-1" ref="div">
          <template v-if="temp_ajax[ajaxData.UserName][x-1].DataCount===0">
          <div class='fullPageMsg'>
            <div class='fullPageIcon iconfont'>&#xe63c;</div>
            <p>暂无记录</p>
          </div>
          </template>
              <template v-else>
                  <template v-if="x==1">
                  <div class="" v-for="item in temp_ajax[ajaxData.UserName][x-1].res_data">
                    <a class="active">
                      <div><p>{{item.UserName}}</p><span>{{item.AddTime}}</span> </div>
                      <div class="fr">
                        <strong :class="check_money(item.InMoney,item.OutMoney)>0?'InMoney':'OutMoney'">{{check_money(item.InMoney,item.OutMoney)}}</strong>
                        <span class="fr">{{item.TypeName}}</span>
                      </div>
                    </a>
                    <div class="hr1px"></div>
                  </div>
                </template>
                <template v-if="x==2">
                <div class="" v-for="item in temp_ajax[ajaxData.UserName][x-1].res_data">
                  <a class="active">
                    <div>
                      <p>{{item.UserName}}<span>￥{{item.BetMoney}}</span></p><span>{{item.AddTime}}</span></div>
                    <div class="fr" v-if="Number(item.State)"><strong class="InMoney fr">+{{item.State}}</strong><span class="InMoney fr">已中奖</span></div>
                    <strong class="" v-else>{{item.State}}</strong>
                  </a>
                  <div class="hr1px"></div>
                </div>
                </template>
                <template v-if="x==3">
                <div class="" v-for="item in temp_ajax[ajaxData.UserName][x-1].res_data">
                  <a class="active">
                    <div><p>{{item.UserName}}</p><span>{{item.AddTime}}</span> </div>
                    <div class="fr"><div class="fr"><strong class="InMoney">+{{item.InMoney}}</strong><span class="fr">{{item.State}}</span></div> </div>
                  </a>
                  <div class="hr1px"></div>
                </div>
                </template>
                <div class="msg noMore" v-html="msg[temp_ajax[ajaxData.UserName][x-1].cant_scroll]"></div>
              </template>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      li_arr_obj: ["所有类型","提现记录","交易记录"],
      li_state: 0,
      ajaxData: {
        Action: "GetAgentBillRecord",
        BetweenDays: 15,
        Index: 0,
        UserName: 0,
        DataNum: 20,
        Type: -1
      },
      type:['GetAgentBillRecord','GetAgentWithdrawRecord','GetAgentRechargeRecord'],
      data_totalpage: 0,
      msg: [null, layer.icon.load + "正在加载...", "已显示15天内全部记录"],
      temp_ajax: {},
      UnFindUser: {},
      oldName: 0,
      searchWord: ''
    }
  },
  methods: {
    search: function(index) {
      let page_index = this.li_state = index || 0
      this.oldName = this.ajaxData.UserName //储存上一状态的用户名
      if (this.UnFindUser[this.searchWord]) {
        layer.msgWarn(this.UnFindUser[this.searchWord])
        this.searchWord = this.oldName || ""
        return
      } else {
        this.ajaxData.UserName = this.searchWord || 0
        if (!this.temp_ajax[this.ajaxData.UserName]) {
          this.temp_ajax[this.ajaxData.UserName] = {}
          for (var i = 0; i < 3; i++) {
            this.temp_ajax[this.ajaxData.UserName][i] = {
              Action: this.type[i],
              Index: 0,
              DataCount: null, //用datacount来判断是否有请求过，压入缓存，因为有请求过，datacount就会变化为0或者具体的number数值
              data_totalpage: 0,
              cant_scroll: 0,
              res_data: []
            }
          }
          this.getData(page_index)
        } else {
          if (this.temp_ajax[this.ajaxData.UserName][page_index].DataCount === null) { //说明只是生成占位，并没有请求过数据
            this.getData(page_index)
          } else {} //说明数据真的有缓存,不需要任何操作，因为vue会根据变化自动渲染
        }
      }
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
      if (this.temp_ajax[this.ajaxData.UserName][i].cant_scroll) {
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
      this.temp_ajax = Object.assign({}, this.temp_ajax, this.create_obj(this.temp_ajax, this.ajaxData.UserName, i, 1))
        //从中间态中取数据
      this.ajaxData = Object.assign(this.ajaxData, {
        Action: this.temp_ajax[this.ajaxData.UserName][i].Action,
        Index: this.temp_ajax[this.ajaxData.UserName][i].Index
      })
      _fetch(this.ajaxData).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            if (data.Code === 1) {
              this.temp_ajax = Object.assign({}, this.temp_ajax, this.create_obj(this.temp_ajax, this.ajaxData.UserName, i, 0))
              if (this.temp_ajax[this.ajaxData.UserName][i].Index === 0) {
                this.temp_ajax[this.ajaxData.UserName][i].DataCount = data.DataCount
                this.temp_ajax[this.ajaxData.UserName][i].data_totalpage = Math.ceil(data.DataCount / this.ajaxData.DataNum)
              }
              this.temp_ajax[this.ajaxData.UserName][i].Index++
                if (this.temp_ajax[this.ajaxData.UserName][i].Index >= this.temp_ajax[this.ajaxData.UserName][i].data_totalpage) {
                  this.temp_ajax = Object.assign({}, this.temp_ajax, this.create_obj(this.temp_ajax, this.ajaxData.UserName, i, 2))
                }
              this.temp_ajax[this.ajaxData.UserName][i].res_data = this.temp_ajax[this.ajaxData.UserName][i].res_data.concat(data.BackData)
            } else if (data.Code === 2) {
              delete this.temp_ajax[this.ajaxData.UserName]
              layer.msgWarn(data.StrCode)
              this.UnFindUser[this.ajaxData.UserName] = data.StrCode
              this.searchWord = this.oldName || ''
              this.ajaxData.UserName = this.oldName
            } else {
              layer.msgWarn(data.StrCode)
            }
          })
        } else {
          layer.msgWarn("request error")
        }
      })
    },
  },
  created() {
    this.search()
  }
}
</script>

<style lang="scss" scoped>@import '../scss/detailList.scss';</style>
