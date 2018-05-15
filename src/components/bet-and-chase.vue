<template>
  <div class="b-a-c" @click.stop="">
    <div class="b-a-c-top fix">
      <a @click.stop="toggleBetRecord" class="back"><em class="iconfont">&#xe60a;</em></a>
      <div :class="['mybet',Type==1&&'curr']" @click.stop="getChange(1)"><em>我的投注</em></div>
      <div :class="['mychase',Type==2&&'curr']" @click.stop="getChange(2)"><em>我的追号</em></div>
    </div>
    <div class='fullPageMsg' v-if="!Arr.length"><div class='fullPageIcon iconfont'>&#xe63c;</div><p>暂无记录</p></div>
    <div class="betboxlist" v-else>
        <betbox v-if="!isShow" :Arr="Arr" :Type="Type"></betbox>
        <div class="msg noMore" v-else v-html="msg[0]"></div>
      <div class="msg noMore">更多记录请到"<router-link to="/userCenter" id="account">我的账户</router-link>"查看</div>
    </div>
    <seekDetailShow v-show="Type==2&&defaultShow" :betID="defaultID" :UID="defaultUID" :noShow="Type!=2"/>
    <betDetailShow v-show="Type==1&&defaultShow" :betID="defaultID" :UID="defaultUID" :noShow="Type!=1"/>
  </div>
</template>
<script>
import betbox from '../components/betbox';
import betDetailShow from '../components/betDetailShow';
import seekDetailShow from '../components/seekDetailShow';
export default{
  props:['Types'],
  components:{
    betbox,
    seekDetailShow,
    betDetailShow
  },
  watch:{
    'Types'(n){
      if(n==1){
        this.getBet()
      }else if(n==2){
        this.getChase()
      }
      setTimeout(()=>{
        this.getChange(n)
      },0)
    }
  },
  data(){
    return{
      Type:1,
      Arr:[],
      isShow:false,
      defaultUID:0,
      defaultID:'',
      defaultShow:false,
      msg:[this.$store.state.tpl.load + "正在加载..."]
    }
  },
  computed:{
    BetRecord(){
      return state.lt.BetRecord
    },
    ChaseRecord(){
      return state.lt.ChaseRecord
    }
  },
  created(){
    this.getBet()
    this.getChase()
    this.getChange(this.Type)
  },
  methods:{
    getShow(ID,UID){//追号详情
      this.defaultShow=true
      this.defaultUID=UID
      this.defaultID=ID
    },
    toggleBetRecord(){
      this.$store.state.lt.box === 'BetRecord' ?
         this.$store.commit('lt_changeBox', '') :
           this.$store.commit('lt_changeBox', 'BetRecord')
    },
    getChange(num){
      this.defaultUID=0
      this.defaultID=0
      this.defaultShow=false      
      if(this.Type==num)return;
      this.$parent.BetKey=num
      // this.Arr=[]
      this.Type=num
      this.getList(num)
    },
    getBet(){
      this.$store.dispatch('lt_updateBetRecord')
    },
    getChase(){
      this.$store.dispatch('lt_updateChaseRecord')
    },
    getList(num){
      this.isShow=true
      // this.getBet()
      if(num===1){
        this.Arr=this.BetRecord
        this.isShow=false
      }else{
        this.Arr=this.ChaseRecord
        this.isShow=false
        // var key=num==1?"GetBetting":"GetChaseBetting"
        // var obj={Action:"GetChaseBetting"}
        // _fetch(obj).then(json=>{
        //   if(json.Code==1){
        //     this.Arr=json.Data
        //     this.isShow=false
        //   }else{
        //     layer.msgWarn(json.StrCode)
        //   }
        // })
      }
    }
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
  // background: rgba(250,250,250,1);
  position: relative;
  border-bottom: 1px solid #d7d6d6;
  > div{
    height: 100%;
    width: 50%;
    float: left;
    text-align: center;
    line-height: 2.3em;
    em{
      font-size: .8em;
    }
  }
  .curr{
    color: #ee3945;
    border-bottom: 2px solid;
  }
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
.betboxlist{
  padding: 10px 0;
}
.msg {
  height: 2.5em;
  text-align: center;
  font-size: .7em;
  padding: 1.9em 0;
  color: #4c4c4c;
  a{
    display: inline;
    padding: 0;
    color: #ee3945;
  }
}
</style>