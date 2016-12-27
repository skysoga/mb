<template id="">
  <div class="main">
    <div class="touchScroll" @touchend="scroll()" ref="div">
      <template v-if="data_count===0">
        <div class='fullPageMsg' ><div class='fullPageIcon iconfont'>&#xe63c;</div><p>暂无公告</p></div>
      </template>
      <template v-else>
        <div class="" v-for="item in renderData">
          <a class="active"  @click="$router.push({path:'NoticeDetail',query:{ID:item.ID}})">
            <div>
              <p>{{item.Title}}</p>
              <span>{{item.Add_Time}}</span>
            </div>
          </a>
          <div class="hr1px"></div>
        </div>
        <!-- <div class="msg noMore" v-if="cant_scroll===1">
          <svg class="svgLoad" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(0 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(30 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.08333333333333333s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(60 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.16666666666666666s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(90 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.25s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(120 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.3333333333333333s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(150 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.4166666666666667s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(180 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(210 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5833333333333334s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(240 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.6666666666666666s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(270 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.75s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(300 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.8333333333333334s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(330 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.9166666666666666s" repeatCount="indefinite"></animate></rect></svg>
          正在加载...
        </div>
        <div class="msg noMore" v-if="cant_scroll===2" v-html="msg[cant_scroll]"></div>
        <div class="msg noMore" v-if="cant_scroll===0" v-html="msg[cant_scroll]"></div> -->
        <div class="msg noMore" v-html="msg[cant_scroll]"></div>
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
        msg:[null,this.$store.state.tpl.load + "正在加载...","已显示全部公告"],
        renderData: [],
        data_length: 0,
        data_count: null
      }
    },
    methods: {
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
