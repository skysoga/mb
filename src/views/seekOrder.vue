<template>
  <div class="main main-list">
    <div class="textMore dataType" @click="BottomBoxShow=!BottomBoxShow"><em>{{top_text}}</em> <i class="iconfont"></i></div>
    <div class="" id="leftTabBox">
      <div class="hd">
        <ul><li v-for="(x,index) in li_seek" :class="li_state==index?'on':null" @click="search(index)">{{x}}</li></ul>
      </div>
      <div class="bd dontSelect">
        <div class="scrollBox" v-for="x in 4">
          <div class="touchScroll touchScroll-list" @touchend="scroll(x-1)" v-if="li_state==x-1" ref="div">
              <template v-if="temp_ajax[newDay][x-1].DataCount===0">
                <div class='fullPageMsg'>
                  <div class='fullPageIcon iconfont'>&#xe63c;</div>
                  <p>暂无记录</p>
                </div>
              </template>
              <template v-else>
                <template v-if="x==1">
                  <div class="" v-for="item in temp_ajax[newDay][x-1].res_data">
                    <a class="active" @click="getShow(item.ID,0)">
                    <!-- <a class="active" @click="$router.push({path:'/seekDetail',query:{ID:item.ID}})"> -->
                      <div><p>{{item.LotteryName}}<span>￥{{item.CompleteMoney.toString().split('/')[1]}}</span></p><span>{{item.AddTime}}</span></div>
                      <strong :class="Number(item.State)?'InMoney':''">{{Number(item.State)?'+'+item.State:item.State}}</strong>
                    </a>
                    <div class="hr1px hr1px-list"></div>
                  </div>
                </template>
                <template v-if="x==2">
                <div class="" v-for="item in temp_ajax[newDay][x-1].res_data">
                  <a class="active" @click="getShow(item.ID,0)">
                  <!-- <a class="active" @click="$router.push({path:'/seekDetail',query:{ID:item.ID}})"> -->
                    <div>
                      <p>{{item.LotteryName}}<span>￥{{item.CompleteMoney.toString().split('/')[1]}}</span></p><span>{{item.AddTime}}</span></div>
                      <strong>{{item.State}}</strong>
                  </a>
                  <div class="hr1px hr1px-list"></div>
                </div>
                </template>
                <template v-if="x==3">
                <div class="" v-for="item in temp_ajax[newDay][x-1].res_data">
                  <a class="active" @click="getShow(item.ID,0)">
                  <!-- <a class="active" @click="$router.push({path:'/seekDetail',query:{ID:item.ID}})"> -->
                    <div>
                      <p>{{item.LotteryName}}<span>￥{{item.CompleteMoney.toString().split('/')[1]}}</span></p><span>{{item.AddTime}}</span></div>
                    <div class="fr" v-if="Number(item.State)"><strong class="InMoney fr">+{{item.State}}</strong><span class="InMoney fr">进行中</span></div>
                    <strong class="" v-else>{{item.State}}</strong>
                  </a>
                  <div class="hr1px hr1px-list"></div>
                </div>
                </template>
                <template v-if="x==4">
                <div class="" v-for="item in temp_ajax[newDay][x-1].res_data">
                  <a class="active" @click="getShow(item.ID,0)">
                  <!-- <a class="active" @click="$router.push({path:'/seekDetail',query:{ID:item.ID}})"> -->
                    <div>  <p>{{item.LotteryName}}<span>￥{{item.CompleteMoney.toString().split('/')[1]}}</span></p><span>{{item.AddTime}}</span></div>
                    <div class="fr" v-if="Number(item.State)"><strong class="InMoney fr">+{{item.State}}</strong><span class="InMoney fr">已结束</span></div>
                    <strong class="" v-else>{{item.State}}</strong>
                  </a>
                  <div class="hr1px hr1px-list"></div>
                </div>
                </template>
                <div class="msg noMore" v-html="msg[temp_ajax[newDay][x-1].cant_scroll]" v-if="temp_ajax[newDay][x-1].cant_scroll<2"></div>
                  <div class="msg noMore" v-else v-html="msg[temp_ajax[newDay][x-1].cant_scroll][newDay]"></div>
                  <!-- <div class="msg noMore" v-if="temp_ajax[newDay][x-1].cant_scroll===1">
                    <svg class="svgLoad" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(0 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(30 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.08333333333333333s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(60 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.16666666666666666s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(90 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.25s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(120 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.3333333333333333s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(150 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.4166666666666667s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(180 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(210 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5833333333333334s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(240 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.6666666666666666s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(270 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.75s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(300 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.8333333333333334s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(330 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.9166666666666666s" repeatCount="indefinite"></animate></rect></svg>
                    正在加载...
                  </div>
                  <div class="msg noMore" v-if="temp_ajax[newDay][x-1].cant_scroll===2" v-html="msg[temp_ajax[newDay][x-1].cant_scroll][newDay]"></div>
                  <div class="msg noMore" v-if="temp_ajax[newDay][x-1].cant_scroll===0" v-html="msg[temp_ajax[newDay][x-1].cant_scroll]"></div> -->
              </template>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部弹框组件 -->
    <bottomboxs v-show="BottomBoxShow" :list="BottomBoxList" />
    <seekDetailShow v-show="defaultShow" :betID="defaultID" :UID="defaultUID"/>
  </div>
</template>

<script>
import bottomboxs from '../components/bottom-box'
import seekDetailShow from '../components/seekDetailShow'
export default {
  data() {
    return {
      defaultUID:0,
      defaultID:'',
      defaultShow:false,
      li_seek: ["全部", "未开始", "进行中", "已结束"],
      li_state: 0,
      BottomBoxShow:false,
      top_text:"今天",
      BottomBoxList:{
        0:"今天",
        1:"昨天",
        7:"七天"
      },
      ajaxData: {
        Action:"GetChaseData",
        LotteryCode:-1,
        DataNum:10,
        Index:0
      },
      msg: [null, this.$store.state.tpl.load + "正在加载...", {0:"已显示今天全部记录",1:"已显示昨天全部记录",7:"已显示七天全部记录"}],
      temp_ajax: {},
      page_index:0,
      newDay:0,
      oldDay:0,
      document_height:0,
      window_height:0
    }
  },
  components: {
    seekDetailShow,
    bottomboxs
  },
  methods: {
    getShow(ID,UID){//追号详情
      this.defaultShow=true
      this.defaultUID=UID
      this.defaultID=ID
    },
    bottomBox:function(a,b){
      this.top_text=b
      this.BottomBoxShow=!this.BottomBoxShow
      if(a===this.oldDay){return}
      this.newDay=this.oldDay=a
      this.check(this.newDay)
    },
    check:function(newDay){
      if (!this.temp_ajax[newDay]) {
        console.log("无占位缓存")
        this.temp_ajax[newDay] = {}
        for (var i = 0; i < 4; i++) {
          this.temp_ajax[newDay][i] = {
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
          if (!this.temp_ajax[newDay][this.page_index].cant_scroll) {
            this.getData(this.page_index)
            console.log("占位缓存")
          }
        } else {}
      }
    },
    search: function(index) {
      this.page_index = this.li_state = index || 0
      this.check(this.newDay)
    },
    create_obj: function(obj, username, i, j) {
      obj[username][i].cant_scroll = j
      return obj
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
    getData: function(i) {
      let newUser=this.newDay
      this.temp_ajax = Object.assign({}, this.temp_ajax, this.create_obj(this.temp_ajax, newUser, i, 1))
        //从中间态中取数据
      this.ajaxData = Object.assign(this.ajaxData, {  Index: this.temp_ajax[newUser][i].Index})
      this.ajaxData.State=i+1
      this.ajaxData.BetweenDays=this.newDay
      let temp_data=this.ajaxData
      _fetch(this.ajaxData).then((data) => {
        if (data.Code === 1) {
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
        } else {
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