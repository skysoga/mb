<template id="">
  <div class="main">
    <div class="touchScroll" @touchend="scroll()">
      <template v-if="data_count===0">
        <div class='fullPageMsg' ><div class='fullPageIcon iconfont'>&#xe63c;</div><p>暂无公告</p></div>
      </template>
      <template v-else>
        <div class="" v-for="item in renderData">
          <router-link class="active" :data-id="item.ID" :to="'/NoticeDetail/'+item.ID">
            <div>
              <p>{{item.Title}}</p>
              <span>{{item.Add_Time}}</span>
            </div>
          </router-link>
          <div class="hr1px"></div>
        </div>
        <div class="msg" v-html="msg[cant_scroll]"></div>
      </template>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        ajaxData: {
          Action: "GetMessageData",
          Index: 0
        },
        cant_scroll: 0,//分别为0(默认状态),1(正在加载),2(已显示全部)
        msg:[null,layer.icon.load + "正在加载...","已显示全部公告"],
        renderData: [],
        scroollDom: null,
        data_length: 0,
        data_count: null,
        doc_height: 0,
      }
    },
    methods: {
      getAjaxData: function() {
        console.log("刷新");
        this.cant_scroll = 1
        _fetch(this.ajaxData).then((res) => {
          if (res.ok) {
            res.json().then((json) => {
              if (json.Code === 1) {
                this.cant_scroll=0
                if (this.ajaxData.Index === 0) {
                  this.data_count = json.DataCount
                }
                this.renderData = this.renderData.concat(json.BackData)
                this.data_length += json.BackData.length
                if (this.data_length >= this.data_count) {
                  this.cant_scroll = 2

                }
                this.ajaxData.Index++
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
        }else if (this.scroollDom.scrollTop > (this.renderData.length-6)*(3*em+1)-this.doc_height) {
          this.getAjaxData()
        }
      }
    },
    mounted() {
      this.renderData = [{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"},{ID: 2, Title: "测试", Add_Time: "2019-04-01 20:26:27"}]
      // this.getAjaxData()
      this.scroollDom = document.querySelector(".touchScroll")
      this.doc_height = this.scroollDom.clientHeight
    }
  }
  require('../scss/msgList.scss')
</script>

<!-- <style lang="scss">
  @import '../scss/msgList.scss'
</style> -->
