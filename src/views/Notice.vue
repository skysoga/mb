<template id="">
  <div class="main">
    <div class="touchScroll" @touchend="scroll()" ref="div">
      <template v-if="data_count===0">
        <div class='fullPageMsg' ><div class='fullPageIcon iconfont'>&#xe63c;</div><p>暂无公告</p></div>
      </template>
      <template v-else>
        <div class="" v-for="item in renderData">
          <a class="active" :data-id="item.ID" @click="jump(item.ID)">
            <div>
              <p>{{item.Title}}</p>
              <span>{{item.Add_Time}}</span>
            </div>
          </a>
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
        data_length: 0,
        data_count: null,
        doc_height: 0,
      }
    },
    methods: {
      jump:function(id){
        this.$router.push({path:"NoticeDetail",query:{ID:id}})
      },
      getAjaxData: function() {
        this.cant_scroll = 1
        _fetch(this.ajaxData).then((json) => {
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
      },
      scroll: function() {
        if (this.cant_scroll) {
          return
        }else if (this.$refs.div.scrollTop > (this.renderData.length-6)*(3*em+1)-this.$refs.div.clientHeight) {
          this.getAjaxData()
        }
      }
    },
    mounted() {
      this.getAjaxData()
    }
  }
</script>
<style lang="scss" scoped>@import '../scss/msgList.scss';</style>
