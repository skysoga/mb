<template id="">
  <div class="main">
    <article>
      <h2>{{initData.Title}}</h2>
      <time>{{initData.Add_Time}}</time>
      <p class="hr1px"></p>
      <div class="wrapExplain" v-html='initData.Content'></div>
    </article>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        initData: []
      }
    },
    created() {
      _fetch({
        Action: "GetNoticeContent",
        ID: this.$route.params.ID
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            if (data.Code === 1) {
              this.initData = data.BackData[0];
            } else {
              layer.msgWarn("return error");
            }
          })
        } else {
          layer.msgWarn("request error");
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/public.scss';
  body {
    background: #fff
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
