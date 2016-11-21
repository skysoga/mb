<template id="">
  <div class="main">
    <div class="touchScroll" @touchend="scroll()">
      <template v-if="data_count===0">
        <div class='fullPageMsg' ><div class='fullPageIcon iconfont'>&#xe63c;</div><p>暂无私信</p></div>
      </template>
      <template v-else>
        <div class="" v-for="item in res_data">
          <a class="active" :data-id="item.ID">
            <div>
              <p>{{item.Title}}<i class="iconfont noRead"></i></p>
              <span style="color:#666;">{{item.PosUserName}}</span>
              <span>{{item.Post_Time}}</span>
            </div>
            <i class="fr iconfont" :data-id="item.ID"></i>
          </a>
          <div class="hr1px"></div>
        </div>
        <div class="msg" v-html="msg_arr[cant_scroll]"></div>
      </template>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default{
    data(){
      return {
        ajaxData:{
          Action:"GetLetterData",
          Index:0
        },
        cant_scroll:0,//判断能不能滚动加载
        data_count:null,
        res_data:[],
        scroll_element:null,
        scroll_element_height:0,
        data_length:0,
        msg_arr:[null,layer.icon.load+"正在加载...","已显示全部私信"]
      }
    },
    methods:{
      getData:function(){
        this.cant_scroll=1//防止无限加载
        _fetch(this.ajaxData).then((res)=>{
          if (res.ok) {
            res.json().then((json)=>{
              if(json.Code===1){
                if(this.ajaxData.Index===0){
                  this.data_count=json.DataCount
                }
                this.res_data=this.res_data.concat(json.BackData)
                this.data_length+=json.BackData.length
                if(this.data_length>=this.data_count){
                  this.cant_scroll=2
                }
                this.ajaxData.Index++
              }else {
                layer.msgWarn(data.StrCode)
              }
            })
          }else {
            layer.msgWarn("request error")
          }
        })
      },
      scroll:function(){
        if (this.cant_scroll) {
          return
        }else if (this.scroll_element.scrollTop>((this.res_data.length-6)*(3*em+1)-this.scroll_element_height)) {
          this.getData()
        }
      }
    },
    mounted(){
      this.res_data=[{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"}]
      this.scroll_element=document.querySelector(".touchScroll")
      this.scroll_element_height=this.scroll_element.clientHeight
    }
  }
  require('../scss/msgList.scss')
</script>
<!--
<style lang="sass" scoped>
    @import '../scss/msgList.scss';
</style> -->
