<template>
  <div class="main">
    <div class="" id="leftTabBox">
      <div class="hd">
          <ul>
            <li v-for="(x,index) in li_arr_obj" :class="li_state==index?'on':null" @click="li_state=index">{{x}}</li>
          </ul>
      </div>
      <div class="bd dontSelect">
        <div class="scrollBox" v-for="x in 3">
          <div class="touchScroll" @touchend="scroll(x-1)" v-if="li_state==x-1" ref="div">
            <template v-if="temp_ajax[x-1].DataCount===0">
              <div class='fullPageMsg' ><div class='fullPageIcon iconfont'>&#xe63c;</div><p>暂无记录</p></div>
            </template>
            <template v-else>
              <template v-if="x==1">
                <div class="" v-for="item in temp_ajax[x-1].res_data">
                  <a class="active">
                    <div><p>{{item.TypeName}}</p><span>{{item.AddTime}}</span> </div>
                    <strong :class="check_money(item.InMoney,item.OutMoney)>0?'InMoney':'OutMoney'">{{check_money(item.InMoney,item.OutMoney)}}</strong>
                  </a>
                  <div class="hr1px"></div>
                </div>
              </template>
              <template v-if="x==2">
                <div class="" v-for="item in temp_ajax[x-1].res_data">
                  <a class="active">
                    <div><p>提现扣款</p><span>{{item.AddTime}}</span> </div>
                    <div class="fr">
                      <strong class="OutMoney">-{{item.OutMoney}}</strong>
                      <span class="fr">{{item.State}}</span>
                    </div>
                  </a>
                  <div class="hr1px"></div>
                </div>
              </template>
              <template v-if="x==3">
              <div class="" v-for="item in temp_ajax[x-1].res_data">
                <a class="active">
                  <div><p>{{item.TypeName}}</p><span>{{item.AddTime}}</span> </div>
                  <div class="fr"><strong class="InMoney">{{"+"+item.ApplyMoney}}</strong><span class="fr">{{item.State}}</span></div>
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
      ajaxData:{
        Action:"GetBillRecord",
        BetweenDays:15,
        Index:0,
        UserId:0,
        DataNum:10,
        Type:-1
      },
      li_arr_obj:["所有类型","提现记录","充值记录"],
      li_state:0,//代表tab的显隐状态，默认“所有类型”显示
      type:['GetBillRecord','GetWithdrawRecord','GetRechargeRecord'],
      msg:[null,layer.icon.load + "正在加载...","已显示15天内全部记录"],
      document_height:0,
      window_height:0,
      //temp_ajax用来储存每个页面的状态，以及返回来的数据，因为页面切换的时候要还原当前页面的数据
      temp_ajax:[{   //这样初始化的原因是：可以不用$set来设置数组变化的问题，如果用for循环生成的话，
        Action:"GetBillRecord", //下面this.get()函数里面的索引都要用$set设置
        Index:0,
        DataCount:null,
        data_totalpage:0,
        cant_scroll:0, //为0,1,2分别对应上面的msg状态
        res_data:[] //储存三个页面返回来的数据
      },{
        Action:"GetWithdrawRecord",
        Index:0,
        DataCount:null,
        data_totalpage:0,
        cant_scroll:0,
        res_data:[]
      },{
        Action:"GetRechargeRecord",
        Index:0,
        DataCount:null,
        data_totalpage:0,
        cant_scroll:0,
        res_data:[]
      }]
    }
  },
  mounted(){
    this.window_height=document.documentElement.clientHeight||document.body.clientHeight
    this.document_height=document.documentElement.scrollHeight||document.body.scollHeight
    for(var i=0;i<this.type.length;i++){
      this.ajaxData.Action=this.type[i]
      this.getData(i)
    }
  },
  methods:{
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
    getData:function(i){
      this.temp_ajax[i].cant_scroll=1
      this.ajaxData=Object.assign(this.ajaxData,{Action:this.temp_ajax[i].Action,Index:this.temp_ajax[i].Index})
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
      }else if (this.$refs.div[0].scrollTop-50>this.document_height-this.window_height) {
        this.getData(i)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/detailList.scss';
</style>
