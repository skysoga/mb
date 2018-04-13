<template id="">
  <div class="main">
    <article>
      <h2>{{initData.Title}}</h2>
      <time>{{isNotice?initData.Add_Time:initData.Time}}</time>
      <span v-if="!isNotice">发件人：{{initData.Sender}}</span>
      <p class="hr1px"></p>
      <div class="wrapExplain" v-html='initData.Content'></div>
    </article>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        initData: [],
        isNotice:false
      }
    },
    created() {
      this.isNotice=this.$route.path.toLowerCase().search('notice')>0
      _fetch({
        Action: this.isNotice?"GetNoticeContent":"GetLetterContent",
        ID: this.$route.query.ID
      }).then((data) => {
        if (data.Code === 1) {
          var initData = this.isNotice?data.BackData[0]:data.BackData
          if (!initData) {
            router.replace('/notfount')
          }else{
            this.initData=initData
          }
        } else {
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
    font-size: .8em;
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

  .cGold {
    color: #f46e00
  }

  .cGray {
    color: #bababa
  }

  .cGreen {
    color: #dc2e2e
  }
</style>
