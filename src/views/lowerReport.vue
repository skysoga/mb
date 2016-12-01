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
      <tr class="active" :data-id="item.UserId" v-for="item in res_data" @click="look_agent(item.UserName,item.BetNum)">
        <td><ins style="color:#38f">{{item.UserName}}</ins></td>
        <td>{{item.UserType}}</td>
        <td>{{item.BetNum}}</td>
        <td style="color:red">{{item.ProfitMoney}}</td>
      </tr>
      <tr>
        <td class="msg loadingMsg" v-html='msg[cant_scroll]' colspan="4"></td>
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
        BetweenType:1,
        Index:0,
        DataNum:13,
        UserName:0
      },
      res_data: [],
      msg: [null, layer.icon.load + "正在加载...", "已显示全部数据"],
      window_height: 0, //窗口高度
      document_height: 0, //文档高度
      cant_scroll: 0,
      data_count: null,
      data_totalpage: 0, //总页数
      BottomBoxShow: false, //控制底部弹框的显，隐状态
      BottomBoxList: {
        UserName:"<i class='iconfont'></i>",
        Report:"查看报表",
        Lower:"查看下级",
        Return:"返回上级"
      },
      agent_path_name: [0],
      data_storage: {}, //缓存数据
    }
  },
  components: {
    'topMenu': topMenu,
    'bottom-box': bottombox
  },
  methods: {
    // check_data: function() {
    //   let result = this.data_storage[[this.ajaxData.UserName,this.ajaxData.BetweenType].join('')]
    //   if (result) {
    //     if (result.index === 0) {
    //       this.res_data = result.save_data
    //     } else {
    //       this.res_data = this.res_data.concat(result.save_data)
    //     }
    //   } else {
    //     result = "" //占位
    //     this.getData()
    //   }
    // },
    save_dataM: function(temp, saveData) {
      this.data_storage[[temp.username,temp.betweentype].join('')] = {
        save_data: saveData,
        index: temp.index
      }
    },
    reset: function() {
      this.ajaxData.Index = 0
      this.res_data = []
      this.check_data()
    },
    getData: function() {
      this.cant_scroll = 1
      let temp_ajax = {
        userid: this.ajaxData.UserName,
        index: this.ajaxData.Index,
        betweentype:this.ajaxData.BetweenType
      }
      _fetch(this.ajaxData).then((res) => {
        if (res.ok) {
          res.json().then((json) => {
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
              this.save_dataM(temp_ajax, json.BackData)
              this.check_data()
            } else {
              layer.msgWarn(json.StrCode)
            }
          })
        } else {
          layer.msgWarn("request error")
        }
      })
    },
    scroll: function() {
      if (this.cant_scroll) {
        return
      } else if (this.$refs.div[0].scrollTop + 50 > this.document_height - this.window_height) {
        this.getData()
      }
    },
    look_agent: function(UserName, LowerCount) {
      // this.BottomBoxList = {}
      // if (Number(LowerCount)) {
      //   this.$set(this.BottomBoxList, UserName + " ", '查看下级')
      // }
      // if (this.agent_path_id.length > 1) {
      //   this.$set(this.BottomBoxList, this.agent_path_id[this.agent_path_id.length - 2] + "  ", '返回上级')
      // }
      // this.$set(this.BottomBoxList, "1", UserName)
      this.BottomBoxShow = true
    },
    bottomBox: function(a, b) {
       if (b === "查看下级") {
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
    this.window_height = document.documentElement.clientHeight || document.body.clientHeight
    this.document_height = document.documentElement.scrollHeight || document.body.scollHeight
  }
}
</script>

<style lang="scss" scoped>@import '../scss/personalinfo.scss';</style>
