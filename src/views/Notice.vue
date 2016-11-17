<template id="">
  <div class="main">
    <div class="touchScroll" @scroll="scroll()">
      <div data-v-e892c7a6=""><a data-v-e892c7a6="" data-id="2" class="active"><div data-v-e892c7a6=""><p data-v-e892c7a6="">玄德1</p> <span data-v-e892c7a6="">2019-04-01 20:26:27</span></div></a> <div data-v-e892c7a6="" class="hr1px"></div></div>
      <div data-v-e892c7a6=""><a data-v-e892c7a6="" data-id="2" class="active"><div data-v-e892c7a6=""><p data-v-e892c7a6="">玄德</p> <span data-v-e892c7a6="">2019-04-01 20:26:27</span></div></a> <div data-v-e892c7a6="" class="hr1px"></div></div>
      <div data-v-e892c7a6=""><a data-v-e892c7a6="" data-id="2" class="active"><div data-v-e892c7a6=""><p data-v-e892c7a6="">玄德</p> <span data-v-e892c7a6="">2019-04-01 20:26:27</span></div></a> <div data-v-e892c7a6="" class="hr1px"></div></div>
      <div data-v-e892c7a6=""><a data-v-e892c7a6="" data-id="2" class="active"><div data-v-e892c7a6=""><p data-v-e892c7a6="">玄德</p> <span data-v-e892c7a6="">2019-04-01 20:26:27</span></div></a> <div data-v-e892c7a6="" class="hr1px"></div></div>
      <div data-v-e892c7a6=""><a data-v-e892c7a6="" data-id="2" class="active"><div data-v-e892c7a6=""><p data-v-e892c7a6="">玄德</p> <span data-v-e892c7a6="">2019-04-01 20:26:27</span></div></a> <div data-v-e892c7a6="" class="hr1px"></div></div>
      <div data-v-e892c7a6=""><a data-v-e892c7a6="" data-id="2" class="active"><div data-v-e892c7a6=""><p data-v-e892c7a6="">玄德</p> <span data-v-e892c7a6="">2019-04-01 20:26:27</span></div></a> <div data-v-e892c7a6="" class="hr1px"></div></div>
      <div data-v-e892c7a6=""><a data-v-e892c7a6="" data-id="2" class="active"><div data-v-e892c7a6=""><p data-v-e892c7a6="">玄德</p> <span data-v-e892c7a6="">2019-04-01 20:26:27</span></div></a> <div data-v-e892c7a6="" class="hr1px"></div></div>
      <div data-v-e892c7a6=""><a data-v-e892c7a6="" data-id="2" class="active"><div data-v-e892c7a6=""><p data-v-e892c7a6="">玄德</p> <span data-v-e892c7a6="">2019-04-01 20:26:27</span></div></a> <div data-v-e892c7a6="" class="hr1px"></div></div>
      <div data-v-e892c7a6=""><a data-v-e892c7a6="" data-id="2" class="active"><div data-v-e892c7a6=""><p data-v-e892c7a6="">玄德</p> <span data-v-e892c7a6="">2019-04-01 20:26:27</span></div></a> <div data-v-e892c7a6="" class="hr1px"></div></div>
      <div data-v-e892c7a6=""><a data-v-e892c7a6="" data-id="2" class="active"><div data-v-e892c7a6=""><p data-v-e892c7a6="">玄德</p> <span data-v-e892c7a6="">2019-04-01 20:26:27</span></div></a> <div data-v-e892c7a6="" class="hr1px"></div></div>
      <div data-v-e892c7a6=""><a data-v-e892c7a6="" data-id="2" class="active"><div data-v-e892c7a6=""><p data-v-e892c7a6="">玄德</p> <span data-v-e892c7a6="">2019-04-01 20:26:27</span></div></a> <div data-v-e892c7a6="" class="hr1px"></div></div>
      <div data-v-e892c7a6=""><a data-v-e892c7a6="" data-id="2" class="active"><div data-v-e892c7a6=""><p data-v-e892c7a6="">玄德</p> <span data-v-e892c7a6="">2019-04-01 20:26:27</span></div></a> <div data-v-e892c7a6="" class="hr1px"></div></div>
      <div data-v-e892c7a6=""><a data-v-e892c7a6="" data-id="2" class="active"><div data-v-e892c7a6=""><p data-v-e892c7a6="">玄德</p> <span data-v-e892c7a6="">2019-04-01 20:26:27</span></div></a> <div data-v-e892c7a6="" class="hr1px"></div></div>
      <div class="" v-for="item in renderData">
        <a class="active" :data-id="item.ID">
          <div>
            <p>{{item.Title}}</p>
            <span>{{item.Add_Time}}</span>
          </div>
        </a>
        <div class="hr1px"></div>
      </div>
      <div class="msg">{{msg}}</div>
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
        msg:"正在加载"
      }
    },
    methods:{
      scroll:function(){
        // var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        var window_height=window.screen.height||window.outerHeight
        var dom_height=document.body.clientHeight||document.body.clientHeight
        var el_height=this.$el.childNodes[0].scrollTop
        
      }
    },
    created(){
      _fetch(this.ajaxData).then((res)=>{
        if(res.ok){
          res.json().then((data)=>{
            if(data.Code===1){
              this.renderData=data.BackData
            }else{
              console.log("return error")
            }
          })
        }else{
          console.log("request error")
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/msgList.scss'
</style>
