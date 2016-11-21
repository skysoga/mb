<template id="">
  <div class="main">
    <div class="touchScroll" @touchend="scroll()">
      <template v-if="data_count===0">
        <div class='fullPageMsg' ><div class='fullPageIcon iconfont'>&#xe63c;</div><p>暂无私信</p></div>
      </template>
      <template v-else>
        <div class="" v-for="item in renderData">
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
        <div class="msg" v-html="msg"></div>
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
      renderData:[],
      msg:layer.icon.load+"正在加载...",
      scroollDom:null,
      data_length:0,
      data_count:null,
      can_scroll:true,
      // nodata:"<div class='fullPageMsg'><div class='fullPageIcon iconfont'>&#xe63c;</div><p>暂无私信</p></div>"
    }
  },
  methods:{
    getAjaxData:function(){
      _fetch(this.ajaxData).then((res)=>{
        if(res.ok){
          res.json().then((data)=>{
            if (data.Code===1) {
              if(this.ajaxData.Index===0){
                this.data_count=data.DataCount
                /*if(data.DataCount===0){
                  this.scroollDom.innerHTML=this.nodata
                }else{
                  this.data_count=data.DataCount
                }*/
              }
              this.renderData=this.renderData.concat(data.BackData)
              this.data_length+=data.BackData.length
              if(this.data_length>=this.data_count){
                this.msg="已显示全部私信"
                this.can_scroll=false
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

<style lang="sass" scoped>
    @import '../scss/msgList.scss';
</style>
