<template>
  <div class="main">
    <div class="" id="leftTabBox">
      <div class="hd">
        <ul>
          <li v-for="(x,index) in li_arr_obj" :class="li_state==index?'on':null" @click="li_state=index">{{x}}</li>
        </ul>
      </div>
      <div class="bd dontSelect">
        <div class="scrollBox" v-for="x in 4">
          <div class="touchScroll" @touchend="scroll(x-1)" v-if="li_state==x-1" ref="div">
            <template v-if="temp_ajax[x-1].DataCount===0">
              <div class='fullPageMsg' ><div class='fullPageIcon iconfont'>&#xe63c;</div><p>暂无记录</p></div>
            </template>
            <template v-else>
              <template v-if="x==1">
                <div class="" v-for="item in temp_ajax[x-1].res_data">
                  <a class="active" @click="jump(item.ID,0)">
                    <div><p>{{item.LotteryName}}<span>￥{{item.BetMoney}}</span></p><span>{{item.AddTime}}</span></div>
                    <div class="fr" v-if="Number(item.State)"><strong class="InMoney fr">+{{item.State}}</strong><span class="InMoney fr">已中奖</span></div>
                    <strong :class="item.State==='等待开奖'?'OutMoney':''" v-else>{{item.State}}</strong>
                  </a>
                  <div class="hr1px"></div>
                </div>
              </template>
              <template v-if="x==2">
                <div class="" v-for="item in temp_ajax[x-1].res_data">
                  <a class="active" @click="jump(item.ID,0)">
                    <div><p>{{item.LotteryName}}<span>￥{{item.BetMoney}}</span></p><span>{{item.AddTime}}</span></div>
                    <div class="fr"><strong class="InMoney fr">+{{item.State}}</strong><span class="InMoney fr">已中奖</span></div>
                  </a>
                  <div class="hr1px"></div>
                </div>
              </template>
              <template v-if="x==3">
              <div class="" v-for="item in temp_ajax[x-1].res_data">
                <a class="active" @click="jump(item.ID,0)">
                  <div><p>{{item.LotteryName}}<span>￥{{item.BetMoney}}</span></p><span>{{item.AddTime}}</span> </div>
                  <strong class="">{{item.State}}</strong>
                </a>
                <div class="hr1px"></div>
              </div>
              </template>
              <template v-if="x==4">
              <div class="" v-for="item in temp_ajax[x-1].res_data">
                <a class="active" @click="jump(item.ID,0)">
                  <div><p>{{item.LotteryName}}<span>￥{{item.BetMoney}}</span></p><span>{{item.AddTime}}</span> </div>
                  <strong class="OutMoney">{{item.State}}</strong>
                </a>
                <div class="hr1px"></div>
              </div>
              </template>
              <div class="msg noMore" v-html="msg[temp_ajax[x-1].cant_scroll]"></div>
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
      li_state:0,
      ajaxData:{
        Action:"GetBetData",
        BetweenDays:7,
        Index:0,
        UserId:0,
        DataNum:13,
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
      document_height:0,
      window_height:0
    }
  },
  mounted(){
    console.log(this.$el,)
    this.window_height=document.documentElement.clientHeight||document.body.clientHeight
    this.document_height=document.documentElement.scrollHeight||document.body.scollHeight
    for(var i=0;i<4;i++){
      this.ajaxData.State=i+1
      this.getData(i)
    }
  },
  methods:{
    jump:function(id,userid){
      this.$router.push({path:'betDetail',query:{ID:id,UID:userid}})
    },
    getData:function(i){
      this.temp_ajax[i].cant_scroll=1
      this.ajaxData=Object.assign(this.ajaxData,{State:this.temp_ajax[i].State,Index:this.temp_ajax[i].Index})
      _fetch(this.ajaxData).then((data)=>{
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
          this.temp_ajax[i].res_data=this.temp_ajax[i].res_data.concat(data.BackData)
        }else {
          layer.msgWarn(data.StrCode)
        }
      })
    },
    scroll:function(i){
      if (this.temp_ajax[i].cant_scroll) {
        return
      }else if (this.$refs.div[0].scrollTop-40>this.document_height-this.window_height) {
        this.getData(i)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  @import '../scss/detailList.scss';
</style>
