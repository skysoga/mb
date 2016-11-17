<template id="">
  <div class="main">
    <div class="touchScroll">
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
      <div class="msg">已显示全部私信</div>
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
        renderData:[]
      }
    },
    created(){
      _fetch(this.ajaxData).then((res)=>{
        if(res.ok){
          res.json().then((data)=>{
            if(data.Code===1){
              this.renderData=data.BackData;
            }else{
              console.log("return error");
            }
          })
        }else{
          console.log("request error");
        }
      })
    }
  }
</script>

<style lang="sass" scoped>
    @import '../scss/msgList.scss';
</style>
