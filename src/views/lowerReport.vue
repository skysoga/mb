<template>
<div class="main" ref="div">
  <topMenu></topMenu>
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
      <tr class="active" :data-id="item.UserId" v-for="item in res_data" @click="look_agent(item.UserName,item.BetNum,item.IsAgent)">
        <td><ins style="color:#38f">{{item.UserName}}</ins></td>
        <td>{{item.UserType}}</td>
        <td style="color:#e4393c">{{item.BetNum}}</td>
        <td style="color:#e4393c">{{item.ProfitMoney}}</td>
      </tr>
      <tr>
        <td class="msg loadingMsg" colspan="4" v-if="cant_scroll<2" v-html="msg[cant_scroll]"></td>
        <td class="msg loadingMsg" colspan="4" v-else v-html="msg[cant_scroll][BetweenType]"></td>
      </tr>
      </template>
    </table>
    <bottom-box v-show = "BottomBoxShow" :list = "BottomBoxList"></bottom-box>
  </div>
</template>

<script>
import topMenu from "../components/top-right-chose"
import bottombox from '../components/bottom-box'
export default {
  data() {
    return {
      ajaxData: {
        Action: "GetReportInfo",
        BetweenType:0,
        Index:0,
        DataNum:13,
        UserName:0
      },
      BetweenType:0,//顶部右侧按钮，默认为0，每次点击将会返回值
      res_data: [],
      msg: [null, this.$store.state.tpl.load + "正在加载...", {0:"已显示今天全部数据",1:"已显示昨天全部数据",2:"已显示本月全部数据",3:"已显示上月全部数据"}],
      window_height: 0, //窗口高度
      document_height: 0, //文档高度
      cant_scroll: 0,
      data_count: null,
      data_totalpage: 0, //总页数
      BottomBoxShow: false, //控制底部弹框的显，隐状态
      BottomBoxList: {},
      agent_path_name: [0],
      data_storage: {}, //缓存数据
      see_name:'',
      oldDay:0
    }
  },
  components: {
    'topMenu': topMenu,
    'bottom-box': bottombox
  },
  methods: {
    doSearch:function(){
      if(this.BetweenType===this.oldDay){return}
      this.oldDay=this.BetweenType
      this.ajaxData.BetweenType=this.BetweenType
      this.ajaxData.Index=0
      this.ajaxData.UserName=0
      this.agent_path_name=[0]
      this.res_data=[]
      this.cant_scroll=0
      this.check_data()
    },
    check_data: function() {
      console.log("执行check")
      let result = this.data_storage[[this.ajaxData.UserName,this.ajaxData.BetweenType].join("")]
      if (result) {
        console.log("有缓存")
        // if (result.index === 0) {
        //   this.res_data = result.save_data
        // } else {
          this.res_data = result.save_data
        // }
        this.data_count=result.data_count
        this.cant_scroll=result.cant_scroll
        this.ajaxData.Index=result.index+1
      } else {
        console.log("无缓存")
        if(!this.cant_scroll){
          result = "" //占位
          this.res_data=[] //清空页面
          this.ajaxData.Index=0
          this.getData()
        }
      }
    },
    save_dataM: function(temp, saveData,count,scroll_state) {
      this.data_storage[[temp.username,temp.betweentype].join("")] = {
        save_data: saveData,
        index: temp.index,
        data_count:count,
        cant_scroll:scroll_state
      }
    },
    reset: function() {
      this.ajaxData.Index = 0
      this.cant_scroll=0
      this.res_data = []
      this.check_data()
    },
    getData: function() {
      this.cant_scroll = 1
      // let temp_ajax = {
      //   username: this.ajaxData.UserName,
      //   index: this.ajaxData.Index,
      //   betweentype:this.ajaxData.BetweenType
      // }
      let temp_ajax=Object.assign({},{
        username: this.ajaxData.UserName,
        index: this.ajaxData.Index,
        betweentype:this.ajaxData.BetweenType
      })
      console.log(this.ajaxData)
      _fetch(this.ajaxData).then((json) => {
        if (json.Code === 1) {
          if(temp_ajax.betweentype!=this.BetweenType){
            console.log("day切换太快")
            return
          }
          this.cant_scroll = 0
          if (this.ajaxData.Index === 0) {
            this.data_count = json.DataCount
            this.data_totalpage = Math.ceil(json.DataCount / this.ajaxData.DataNum)
          }
          this.ajaxData.Index++
            if (this.ajaxData.Index >= this.data_totalpage) {
              this.cant_scroll = 2
            }
            json.BackData=this.res_data.concat(json.BackData)
            console.log("开始检查")
          this.save_dataM(temp_ajax, json.BackData,this.data_count,this.cant_scroll)
          this.check_data()
        } else {
          layer.msgWarn(json.StrCode)
        }
      })
    },
    scroll: function() {
      this.window_height = document.documentElement.clientHeight || document.body.clientHeight
      this.document_height = document.documentElement.scrollHeight || document.body.scrollHeight
    //  console.log(this.window_height ,this.document_height,document.body.scrollTop)
      if (this.cant_scroll) {
        return
      } else if ((document.body.scrollTop/(this.document_height - this.window_height))>0.8) {
        console.log(this.$refs.div.scrollTop,this.document_height,this.window_height)
        this.getData()
      }
    },
    look_agent: function(UserName, LowerCount,isAgent) {
      this.BottomBoxList = {}
      this.see_name=UserName
      if (Number(LowerCount)&&isAgent) {
        this.$set(this.BottomBoxList, UserName, '查看下级')
      }
      if (this.agent_path_name.length > 1) {
        this.$set(this.BottomBoxList, this.agent_path_name[this.agent_path_name.length - 2] + "  ", '返回上级')
      }
      this.$set(this.BottomBoxList, "11",'<i class="iconfont"></i><ins>'+UserName+'</ins>' )
      this.$set(this.BottomBoxList,"22","查看报表")
      this.BottomBoxShow = true
    },
    bottomBox: function(a, b) {
       if (b === "查看下级") {
        this.ajaxData.UserName = a
        this.reset()
        this.agent_path_name.push(this.ajaxData.UserName)
      } else if (b === "返回上级") {
        this.ajaxData.UserName = this.agent_path_name[this.agent_path_name.length - 2]
        this.reset()
        this.agent_path_name.pop()
      }else if(b==="查看报表"){
        this.$router.push({path:'/agentReport',query:{username:this.see_name}})
      }
      this.BottomBoxShow = false
    }
  },
  created() {
    this.check_data()
    //this.getData()
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/personalinfo.scss';
.main{
    padding-bottom:0;
  }
  .col3Table{
    &:after{
      content: '';
      position: absolute;
      background: #d0d0d0;
      width: 100%;
      height: 1px;
      @include scaleY(0.5);
      @include origin( 0 0);
      left:0;
    }
    th,td{
      width:4rem;
    }
    th:nth-child(1){
      width:5rem;
    }
    th:nth-child(2){
      width:3rem;
    }
  }
.main{
  .col3Table{
      td:nth-child(1){
        width:5rem;
        ins{
          width:4.5rem;
          white-space:nowrap;
          text-overflow:ellipsis;
          overflow:hidden;
          display:block;
        }
      }
      td:nth-child(2){
        width:3rem;
      }
  }
}
</style>
