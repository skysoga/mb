<template>
  <div class="main">
    <table class="col3Table col3TableTitle">
      <tbody>
        <tr>
          <th>账号</th>
          <th>类型</th>
          <th>报表人数</th>
          <th>盈利</th>
        </tr>
     </tbody>
   </table>
    <table class="ajaxContent col3Table col3TableCon" @touchend="scroll()">
        <template v-if="data_count===0">
          <div class='fullPageMsg' ><div class='fullPageIcon iconfont'>&#xe63c;</div><p>暂无记录</p></div>
        </template>
        <template v-else>
          <tr class="active" :data-id="item.UserId" v-for="item in res_data" @click="look_agent(item.UserId,item.UserName)">
            <td><ins style="color:#38f">{{item.UserName}}</ins></td>
            <td>{{item.UserType}}</td>
            <td>{{splitTime(item.LoginTime)}}</td>
            <td style="color:red">{{item.LowerCount}}</td>
          </tr>
          <tr><td class="msg loadingMsg" v-html='msg[cant_scroll]' colspan="4"></td></tr>
        </template>
    </table>
  </div>
</template>

<script>
export default {
  data(){
    return {
      ajaxData:{
        Action:"GetReportInfo",
        BetweenType:0,
        Index:0,
        DataNum:13,
        UserName:0
      },
      res_data:[],
      msg:[null,layer.icon.load + "正在加载...","已显示全部公告"],
      scroll_element:null,
      document_scrollTop:0,//滚动距离
      window_height:0 ,//窗口高度
      document_height:0, //文档高度
      cant_scroll:0,
      data_length:0,
      data_count:null,
    }
  },
  methods:{
    getData:function(){
      this.cant_scroll=1
      _fetch(this.ajaxData).then((res)=>{
        if(res.ok){
          res.json().then((json)=>{
            if (json.Code===1) {
              if (this.ajaxData.Index === 0) {
                this.data_count = json.DataCount
              }
              this.res_data=this.res_data.concat(json.BackData)
              this.data_length += json.BackData.length
              if (this.data_length >= this.data_count) {
                this.cant_scroll = 2
              }
              this.ajaxData.Index++
            }else {
              layer.msgWarn(json.StrCode)
            }
          })
        }else {
          layer.msgWarn("request error")
        }
      })
    },
    scroll:function(){
      this.document_scrollTop=document.documentElement.scrollTop||document.body.scrollTop
      this.window_height=document.documentElement.clientHeight||document.body.clientHeight
      this.document_height=document.documentElement.scrollHeight||document.body.scollHeight
      if (this.cant_scroll) {
        return
      }else if (this.document_scrollTop+50>this.document_height-this.window_height) {
        this.getData()
      }
    },
    splitTime:function(time){
      //拆分时间 2016-09-02 19:34:23 ---> 2016-09-02
    		let _time = time;
    		let timeArr = _time.split(" ");
    		return timeArr[0];
    },
    look_agent:function(params1,params2){
      console.log(params1,params2)
    }
  },
  mounted(){
    this.getData()
    this.scroll_element=document.querySelector(".main")
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/personalinfo.scss';
</style>
