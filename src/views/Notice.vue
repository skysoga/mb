<template id="">
  <div class="main">
    <div class="touchScroll" @touchend="scroll()">
      <div class="" v-for="item in renderData">
        <router-link class="active" :data-id="item.ID" :to="'/NoticeDetail/'+item.ID">
          <div>
            <p>{{item.Title}}</p>
            <span>{{item.Add_Time}}</span>
          </div>
        </router-link>
        <div class="hr1px"></div>
      </div>
      <div class="msg" v-html="msg"></div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default{
    data(){
      return {
        ajaxData:{
          Action:"GetMessageData",
          Index:0
        },
        renderData:[],
        msg:layer.icon.load+"正在加载...",
        scroollDom:null,
        data_length:0,
        data_count:0,
        can_scroll:true,
        nodata:"<div class='fullPageMsg'><div class='fullPageIcon iconfont'>&#xe63c;</div><p>暂无公告</p></div>"
      }
    },
    methods:{
      getAjaxData:function(){
        _fetch(this.ajaxData).then((res)=>{
          if(res.ok){
            res.json().then((data)=>{
              if (data.Code===1) {
                if(this.ajaxData.Index===0){
                  if(data.DataCount===0){
                    this.scroollDom.innerHTML=this.nodata
                  }else{
                    this.data_count=data.DataCount
                  }
                }
                this.renderData=this.renderData.concat(data.BackData)
                this.data_length+=data.BackData.length
                if(this.data_length>=this.data_count){
                  this.msg="已显示全部公告"
                  this.can_scroll=false
                }
                this.ajaxData.Index++
              }else {
                console.log("return error")
              }
            })
          }else {
            console.log("request error")
          }
        })
      },
      scroll:function(){
        if(this.can_scroll){
          this.getAjaxData()
        }
       }
    },
    mounted(){
      this.getAjaxData()
      this.scroollDom = document.querySelector(".touchScroll")
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/msgList.scss'
</style>
