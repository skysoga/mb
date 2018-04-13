<template id="">
  <div class="main main-msg">
    <div class="touchScroll touchScroll-msg" @touchend="scroll()" ref="div">
      <template v-if="data_count===0">
        <div class='fullPageMsg' ><div class='fullPageIcon iconfont'>&#xe63c;</div><p>暂无私信</p></div>
      </template>
      <template v-else>
        <div class="" v-for="item in res_data">
          <a class="active">
            <div @click="jump(item.ID)">
              <p>{{item.Title}}<i class="iconfont noRead" v-if="!item.Is_Read">&#xe619;</i></p>
              <span style="color:#666;">{{item.PosUserName}}</span>
              <span>{{item.Post_Time}}</span>
            </div>
            <i class="fr iconfont" @click="delLIst(item.ID)">&#xe620;</i>
          </a>
          <div class="hr1px"></div>
        </div>
        <div class="msg" v-html="msg_arr[cant_scroll]"></div>

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
        msg_arr:[null,this.$store.state.tpl.load+"正在加载...","已显示全部私信"]
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
      delLIst(id){
        var vm=this
        var Arr={Action:'DelLetterData',
            LetterID:id}
            layer.open({
              content: '您确定要删除这条私信吗？',
              className: "layerConfirm",
              btn: ['确定', '取消'],
              yes: function(index){
                layer.close(index)
                _fetch(Arr).then(json=>{
                  if(json.Code==1){
                    layer.msgWarn(json.StrCode)
                    vm.res_data=[]
                    vm.ajaxData.Index=0
                    vm.getData()
                  }
                })
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
@import '../scss/detailList.scss';
.noRead{
  color:red;
  margin-top:-.3em;
}
.fr.iconfont{
  margin-top:-.2em;
  margin-right:-.8em;
  font-size:1em;
  line-height:3em;
  height:3em;
  width:3em;
  text-align: center;
  color:$font-gray;
}
</style>
