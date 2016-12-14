<template>
  <div class="main">
    <article>
      <h2>{{res_data.Title}}</h2>
      <time>{{res_data.Time}}</time>
         <span>发件人：{{res_data.Sender}}</span>
         <p class='hr1px'></p>
         <div>{{res_data.Content}}</div>
    </article>
  </div>
</template>

<script>
export default {
  data(){
    return {
      res_data:{}
    }
  },
  created(){
    _fetch({
      Action:"GetLetterContent",
      ID:this.$route.query.ID
    }).then((data)=>{
      if(data.Code===1){
        this.res_data=data.BackData
      }else {
        layer.msgWarn(data.StrCode)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/public.scss';
</style>
