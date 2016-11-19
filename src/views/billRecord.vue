<template>
  <div class="main">
    <div class="" id="leftTabBox">
      <div class="hd">
          <ul>
              <li class="li on">所有类型</li>
              <li class="li">提现记录</li>
              <li class="li">充值记录</li>
          </ul>
      </div>
      <div class="touchScroll">
        <a class="active">
            <div><p>代理返点</p><span>2016-11-19 17:11:15</span> </div><strong class="InMoney">+2.4</strong>
        </a>
        <div class="hr1px"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      ajaxData:{
        Action:"GetRechargeRecord",
        BetweenDays:15,
        Index:0,
        UserId:0,
        DataNum:20,
        Type:-1
      }
    }
  },
  methods:{
    getData:function(){
      _fetch(this.ajaxData).then((res)=>{
        if(res.ok){
            res.json().then((data)=>{
              if(data.Code===1){

              }else {
                layer.msgWarn(data.StrCode)
              }
            })
        }else {
          layer.msgWarn("request error")
        }
      })
    }
  },
  created(){
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/detailList.scss';
</style>
