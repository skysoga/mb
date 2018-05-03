<template>
  <div class="main">
    <article>
      <h2>{{res_data.Title}}</h2>
      <time>{{res_data.Time}}</time>
         <span>发件人：{{res_data.Sender}}</span>
         <p class='hr1px'></p>
         <div class="wrapExplain" v-html="res_data.Content"></div>
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
  .main {
    background: #fff;
    min-height: 100%;
  }

  article {
    width: 15rem;
    margin: .5em auto;
    line-height: 1em
  }

  article h2 {
    font-size: .9em;
    line-height: 1.3
  }

  article>span,
  article time {
    font-size: .7em
  }

  article .hr1px {
    margin: .5em auto
  }

  article>div {
    font-size: .8em;
    line-height: 1.25em;
    font-weight: 400
  }

  article>div strong {
    font-style: normal;
    font-weight: 400
  }
</style>
