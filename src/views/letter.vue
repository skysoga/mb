<template id="">
  <div class="main">
    <div class="touchScroll" @touchend="scroll()" ref="div">
      <template v-if="data_count===0">
        <div class='fullPageMsg' ><div class='fullPageIcon iconfont'>&#xe63c;</div><p>暂无私信</p></div>
      </template>
      <template v-else>
        <div class="" v-for="item in res_data">
          <a class="active" :data-id="item.ID" @click="jump(item.ID)">
            <div>
              <p>{{item.Title}}<i class="iconfont noRead" v-if="!item.Is_Read">&#xe619;</i></p>
              <span style="color:#666;">{{item.PosUserName}}</span>
              <span>{{item.Post_Time}}</span>
            </div>
            <i class="fr iconfont" data-id="${Data[i].ID}">&#xe620;</i>
          </a>
          <div class="hr1px"></div>
        </div>
        <!-- <div class="msg" v-html="msg_arr[cant_scroll]"></div> -->
        <div class="msg noMore" v-if="cant_scroll===1">
          <svg class="svgLoad" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(0 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(30 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.08333333333333333s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(60 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.16666666666666666s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(90 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.25s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(120 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.3333333333333333s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(150 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.4166666666666667s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(180 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(210 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5833333333333334s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(240 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.6666666666666666s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(270 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.75s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(300 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.8333333333333334s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" transform="rotate(330 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.9166666666666666s" repeatCount="indefinite"></animate></rect></svg>
          正在加载...
        </div>
        <div class="msg noMore" v-if="cant_scroll===2" v-html="msg_arr[cant_scroll]"></div>
        <div class="msg noMore" v-if="cant_scroll===0" v-html="msg_arr[cant_scroll]"></div>
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
        data_length:0,
        msg_arr:[null,layer.icon.load+"正在加载...","已显示全部私信"]
      }
    },
    methods:{
      jump:function(id){
        this.$router.push({path:"letterDetail",query:{ID:id}})
      },
      getData:function(){
        this.cant_scroll=1//防止无限加载
        _fetch(this.ajaxData).then((json)=>{
          if(json.Code===1){
            this.cant_scroll=0
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
      },
      scroll:function(){
        if (this.cant_scroll) {
          return
        }else if (this.$ref.div.scrollTop>((this.res_data.length-6)*(3*em+1)-this.$ref.div.clientHeight)) {
          this.getData()
        }
      }
    },
    mounted(){
      this.getData()
    }
  }
</script>

<style lang="scss" scoped>
    @import '../scss/msgList.scss';
</style>
