<template>
  <div class="b-a-c">
    <div class="b-a-c-top">
      <a @click="toggleBetRecord" class="back"><em class="iconfont">&#xe60a;</em></a>
    </div>
  </div>
</template>
<script>
export default{
  methods:{
    toggleBetRecord(){
      this.$store.state.lt.box === 'BetRecord' ?
         this.$store.commit('lt_changeBox', '') :
           this.$store.commit('lt_changeBox', 'BetRecord')
    },
  }
}
</script>
<style lang="scss" scoped>
.b-a-c{
  width: 100%;
  height: 100%;
}
.b-a-c-top{
  height: 2.3em;
  background: rgba(250,250,250,1);
  position: relative;
}
.back{
  position: absolute;
  display: block;
  width: 2em;
  height: 100%;
  display: flex;
  align-items:center;
  justify-content: center;
}
</style>