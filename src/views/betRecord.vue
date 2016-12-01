<template>
  <div class="main">
    <div class="" id="leftTabBox">
      <div class="hd">
          <ul>
            <li v-for="(x,index) in li_arr_obj" :class="li_state[index]" @click="show_state(index)">{{x}}</li>
          </ul>
      </div>
      <div class="bd dontSelect">
        <div class="scrollBox" v-if="li_state[0]">
          <div class="touchScroll" @touchend="scroll(0)">
            <template v-if="temp_ajax[0].DataCount===0">
              <div class='fullPageMsg' ><div class='fullPageIcon iconfont'>&#xe63c;</div><p>暂无记录</p></div>
            </template>
            <template v-else>
              <div class="" v-for="item in temp_ajax[0].res_data" @click="jump(item.ID)">
                <a class="active" href="betDetail.html?id=104">
                  <div><p>{{item.LotteryName}}<span>￥{{item.BetMoney}}</span></p><span>{{item.AddTime}}</span></div>
                  <div class="fr" v-if="Number(item.State)"><strong class="InMoney fr">+{{item.State}}</strong><span class="InMoney fr">已中奖</span></div>
                  <strong class="" v-else>{{item.State}}</strong>
                </a>
                <div class="hr1px"></div>
              </div>
              <div class="msg noMore" v-html="msg[temp_ajax[0].cant_scroll]"></div>
            </template>
          </div>
        </div>
        <div class="scrollBox" v-if="li_state[1]">
          <div class="touchScroll" @touchend="scroll(1)">
            <template v-if="temp_ajax[1].DataCount===0">
              <div class='fullPageMsg' ><div class='fullPageIcon iconfont'>&#xe63c;</div><p>暂无记录</p></div>
            </template>
            <template v-else>
              <div class="" v-for="item in temp_ajax[1].res_data">
                <a class="active" href="betDetail.html?id=103">
                  <div><p>{{item.LotteryName}}<span>￥{{item.BetMoney}}</span></p><span>{{item.AddTime}}</span></div>
                  <div class="fr"><strong class="InMoney fr">+{{item.State}}</strong><span class="InMoney fr">已中奖</span></div>
                </a>
                <div class="hr1px"></div>
              </div>
              <div class="msg noMore" v-html="msg[temp_ajax[1].cant_scroll]"></div>
            </template>
          </div>
        </div>
        <div class="scrollBox" v-if="li_state[2]">
          <div class="touchScroll" @touchend="scroll(2)">
            <template v-if="temp_ajax[2].DataCount===0">
              <div class='fullPageMsg' ><div class='fullPageIcon iconfont'>&#xe63c;</div><p>暂无记录</p></div>
            </template>
            <template v-else>
              <div class="" v-for="item in temp_ajax[2].res_data">
                <a class="active" href="betDetail.html?id=713677">
                  <div><p>{{item.LotteryName}}<span>￥{{item.BetMoney}}</span></p><span>{{item.AddTime}}</span> </div>
                  <strong class="">{{item.State}}</strong>
                </a>
                <div class="hr1px"></div>
              </div>
              <div class="msg noMore" v-html="msg[temp_ajax[2].cant_scroll]"></div>
            </template>
          </div>
        </div>
        <div class="scrollBox" v-if="li_state[3]">
          <div class="touchScroll" @touchend="scroll(3)">
            <template v-if="temp_ajax[3].DataCount===0">
              <div class='fullPageMsg' ><div class='fullPageIcon iconfont'>&#xe63c;</div><p>暂无记录</p></div>
            </template>
            <template v-else>
              <div class="" v-for="item in temp_ajax[3].res_data">
                <a class="active" href="betDetail.html?id=5330390">
                  <div><p>{{item.LotteryName}}<span>￥{{item.BetMoney}}</span></p><span>{{item.AddTime}}</span> </div>
                  <strong class="OutMoney">{{item.State}}</strong></a>
                <div class="hr1px"></div>
              </div>
              <div class="msg noMore" v-html="msg[temp_ajax[3].cant_scroll]"></div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      li_arr_obj:["全部","已中奖","未中奖","等待开奖"],
      li_state:["on","","",""],
      ajaxData:{
        Action:"GetBetData",
        BetweenDays:7,
        Index:0,
        UserId:0,
        DataNum:20,
        LotteryCode:-1,
        State:1
      },
      temp_ajax:[{   //这样初始化的原因是：可以不用$set来设置数组变化的问题，如果用for循环生成的话，
        State:1, //下面this.get()函数里面的索引都要用$set设置
        Index:0,
        DataCount:null,
        data_totalpage:0,
        cant_scroll:0, //为0,1,2分别对应上面的msg状态
        res_data:[] //储存三个页面返回来的数据
      },{
        State:2,
        Index:0,
        DataCount:null,
        data_totalpage:0,
        cant_scroll:0,
        res_data:[]
      },{
        State:3,
        Index:0,
        DataCount:null,
        data_totalpage:0,
        cant_scroll:0,
        res_data:[]
      },{
        State:4,
        Index:0,
        DataCount:null,
        data_totalpage:0,
        cant_scroll:0,
        res_data:[]
      }],
      msg:[null,layer.icon.load + "正在加载...","已显示7天内全部记录"],
      document_scrollTop:0,
      document_height:0,
      window_height:0
    }
  },
  mounted(){
    this.scroll_element=document.querySelector(".touchScroll")
    this.window_height=document.documentElement.clientHeight||document.body.clientHeight
    this.document_height=document.documentElement.scrollHeight||document.body.scollHeight
    for(var i=0;i<4;i++){
      this.ajaxData.State=i+1
      this.getData(i)
    }
  },
  methods:{
    show_state:function(index){
      this.li_state=["","","",""]
      this.li_state[index]="on"
    },
    getData:function(i){
      this.temp_ajax[i].cant_scroll=1
      this.ajaxData=Object.assign(this.ajaxData,{State:this.temp_ajax[i].State,Index:this.temp_ajax[i].Index})
      _fetch(this.ajaxData).then((res)=>{
        if(res.ok){
            res.json().then((data)=>{
              if(data.Code===1){
                this.temp_ajax[i].cant_scroll=0
                if(this.temp_ajax[i].Index===0){
                  this.temp_ajax[i].DataCount=data.DataCount
                  this.temp_ajax[i].data_totalpage=Math.ceil(data.DataCount/this.ajaxData.DataNum)
                }
                this.temp_ajax[i].Index++
                if(this.temp_ajax[i].Index>=this.temp_ajax[i].data_totalpage){
                  this.temp_ajax[i].cant_scroll=2
                }
                //this.$set(this.res_data,i,this.res_data[0].concat(data.BackData))
                this.temp_ajax[i].res_data=this.temp_ajax[i].res_data.concat(data.BackData)
              }else {
                layer.msgWarn(data.StrCode)
              }
            })
        }else {
          layer.msgWarn("request error")
        }
      })
    },
    scroll:function(i){
      this.document_scrollTop=this.scroll_element.scrollTop
      if (this.temp_ajax[i].cant_scroll) {
        return
      }else if (this.document_scrollTop-40>this.document_height-this.window_height) {
        this.getData(i)
      }
    },
    jump:function(id){
        router.push({ path: 'betDetail',query:{ID:id}})
    }
  },
}
</script>

<style lang="scss" scoped>
  @import '../scss/detailList.scss';
</style>
