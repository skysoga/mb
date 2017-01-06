<template>
<div class="main" ref="div">
  <table class="col3Table col3TableTitle">
    <tbody>
      <tr>
        <th>账号</th>
        <th>类型</th>
        <th>登录时间</th>
        <th>下级人数</th>
      </tr>
    </tbody>
  </table>
  <table class="ajaxContent col3Table col3TableCon" @touchend="scroll()">
    <template v-if="data_count===0">
          <div class='fullPageMsg' ><div class='fullPageIcon iconfont'>&#xe63c;</div><p>暂无记录</p></div>
    </template>
    <template v-else>
    <tr class="active" :data-id="item.UserId" v-for="item in res_data" @click="look_agent(item.UserId,item.UserName,item.LowerCount)">
      <td><ins style="color:#38f">{{item.UserName}}</ins></td>
      <td>{{item.UserType}}</td>
      <td>{{splitTime(item.LoginTime)}}</td>
      <td style="color:red">{{item.LowerCount}}</td>
    </tr>
    <tr>
      <td class="msg loadingMsg" v-html='msg[cant_scroll]' colspan="4"></td>
    </tr>
    </template>
    </table>
    <bottom-box v-show = "BottomBoxShow" :list = "BottomBoxList"></bottom-box>
    <div class="showCodeDetail" v-if="isShow">
      <div class="blackBg"></div>
      <div class="creatAccountDetail">
      <h3 class="line"><em>返点详情</em><a><i class="iconfont" @click="isShow=false"></i></a></h3>
       <ul class="infoshow">
           <li v-for="x in code_obj"><span>{{x.lotteryname}}</span><input type="number" min="0" :value="x.value" disabled=""></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import bottombox from '../components/bottom-box'
export default {
  data() {
    return {
      ajaxData: {
        Action: "GetMemberManagement",
        UserId: 0,
        UserName: 0,
        MinMoney: -1,
        MaxMoney: -1,
        LoginTime: -1,
        Index: 0,
        UserType: -1,
        DataNum: 13
      },
      caiName:{
    		SSC:"时时彩",
    		XYNC:"幸运农场",
    		PK10:"北京PK10",
    		KL8:"北京快乐8",
    		PL35:"排列3/5",
    		FC3D:"福彩3D",
    		SYX5:"11选5",
    		K3:"快3"
    	},
      BetweenType: 0,
      res_data: [],
      msg: [null, this.$store.state.tpl.load + "正在加载...", "已显示全部数据"],
      window_height: 0, //窗口高度
      document_height: 0, //文档高度
      cant_scroll: 0,
      data_count: null,
      BottomBoxShow: false,
      BottomBoxList: {},
      agent_path_id: [0],
      data_storage: {}, //缓存数据,
      data_totalpage: 0, //总页数,
      code_obj: [],
      isShow: false
    }
  },
  components: {
    'bottom-box': bottombox
  },
  methods: {
    check_data: function() {
      let result = this.data_storage[this.ajaxData.UserId]
      if (result) {
        // if (result.index === 0) {
          this.res_data = result.save_data
        // } else {
        //   this.res_data = this.res_data.concat(result.save_data)
        // }
        this.data_count=result.data_count
        this.cant_scroll=result.cant_scroll
        this.ajaxData.Index=result.index+1
      } else {
        result = "" //占位
        this.res_data=[] //清空页面
        this.ajaxData.Index=0
        this.getData()
      }
    },
    save_dataM: function(temp, saveData,count,scroll_state) {
      this.data_storage[temp.userid] = {
        save_data: saveData,
        index: temp.index,
        data_count:count,
        cant_scroll:scroll_state
      }
    },
    reset: function() {
      this.ajaxData.Index = 0
      this.res_data = []
      this.check_data()
    },
    getData: function() {
      this.cant_scroll = 1
      // let temp_ajax = {
      //   userid: this.ajaxData.UserId,
      //   index: this.ajaxData.Index
      // }
      let temp_ajax=Object.assign({},{
       userid: this.ajaxData.UserId,
       index: this.ajaxData.Index
     })
      _fetch(this.ajaxData).then((json) => {
        if (json.Code === 1) {
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
          this.save_dataM(temp_ajax, json.BackData,this.data_count,this.cant_scroll)
          this.check_data()
        } else {
          layer.msgWarn(json.StrCode)
        }
      })
    },
    checkRebate: function(ajaxData_obj) {
      _fetch(ajaxData_obj).then((json) => {
        if (json.Code === 1) {
          let code_arr = []
          let StrCode = json.StrCode
          code_arr = StrCode.split("@")
          for (var i = 0; i < code_arr.length; i++) {
            let temp_obj = code_arr[i].split("#")
            this.code_obj[i] = {
              lotteryname: this.caiName[temp_obj[0]],
              value: temp_obj[1]
            }
          }
          this.isShow = true //弹窗显示
        } else {
          layer.msgWarn(data.StrCode)
        }
      })
    },
    scroll: function() {
      this.window_height = document.documentElement.clientHeight || document.body.clientHeight
      this.document_height = document.documentElement.scrollHeight || document.body.scrollHeight
      console.log(this.window_height ,this.document_height,document.body.scrollTop)
      if (this.cant_scroll) {
        return
      } else if ((document.body.scrollTop/(this.document_height - this.window_height))>0.8) {
        this.getData()
      }
    },
    splitTime: function(time) {
      //拆分时间 2016-09-02 19:34:23 ---> 2016-09-02
      let _time = time;
      let timeArr = _time.split(" ");
      return timeArr[0];
    },
    look_agent: function(UserId, UserName, LowerCount) {
      this.BottomBoxList = {}
      this.$set(this.BottomBoxList, UserId, '查看返点')
      if (Number(LowerCount)) {
        this.$set(this.BottomBoxList, UserId + " ", '查看下级')
      }
      if (this.agent_path_id.length > 1) {
        this.$set(this.BottomBoxList, this.agent_path_id[this.agent_path_id.length - 2] + "  ", '返回上级')
      }
      this.$set(this.BottomBoxList, "11", '<i class="iconfont"></i><ins>'+UserName+'</ins>' )
      this.BottomBoxShow = true
    },
    bottomBox: function(a, b) {
      if (b === "查看返点") {
        let ajaxData_obj = {
          Action: "GetRebateInfo",
          UserId: Number(a)
        }
        this.checkRebate(ajaxData_obj)
      } else if (b === "查看下级") {
        this.ajaxData.UserId = Number(a)
        this.reset()
        this.agent_path_id.push(this.ajaxData.UserId)
        this.BottomBoxShow = false
      } else if (b === "返回上级") {
        this.ajaxData.UserId = this.agent_path_id[this.agent_path_id.length - 2]
        this.reset()
        this.agent_path_id.pop()
        this.BottomBoxShow = false
      }
    }
  },
  mounted() {
    this.check_data()
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
