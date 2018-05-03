<template>
  <header class="sscHeader fix">
    <router-link to="/index" class="iconfont back"></router-link>
    <div class="playSort" :class = "{active:ifShowModeSelect}">
      <p>玩
        <br>法</p>

        <span>
          <div @click.stop = "toggleModeSelect">
            <em>{{mode.tag}}</em>
            <i class="iconfont">&#xe61e;</i>
          </div>
          <div v-show = "ifShowModeSelect">
            <div class="playSortMore">
              <div class="playSortMoreCon">

                <ul class="betFilter fix" ref = "betFilter">
                  <li v-for = "(groupItem,group) in config"
                      @click.stop = "changeGroup(groupItem)"
                      :class = "{curr:group === mode.group, lastSelect: group === '大小单双'}">
                    {{group}}
                  </li>
                </ul>
                <ul class="betFilterAnd"
                    :style = "{padding: isHideSubGroup ? '0.2rem' : ''}">
                  <div class="choosePlayType"><div>玩法选择</div></div>
                  <li class="fix"
                      v-for = "(subGroup, subGroupName) in config[mode.group]"
                      :class = "addSubGroupClass(subGroupName)">
                    <span v-show = "!isHideSubGroup">{{subGroupName}}</span>
                    <div class="lhc fix">
                      <a v-for = "modeItem in subGroup"
                          :class = "modeItem.mode === mode.mode? 'curr': ''"
                          @click = "changeMode(modeItem)">
                        {{modeItem.name}}
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </span>
    </div>

    <div class="lotterySort" ref = "lotterySort" :class = "{active:ifShowTypeSelect}">
      <div @click.stop = "toggleTypeSelect">
        <em v-show = "noLotteryName.indexOf(ltype) === -1">{{lotteryName.replace(/六合彩/,'')}}</em>
        <i class="iconfont" v-show="lTopNav.indexOf(ltype)===-1">&#xe61e;</i>
      </div>

      <div class="lotteryList fix" v-show = "ifShowTypeSelect">
        <a v-for = "item in LotteryList"
           @click = "changeLottery(item.LotteryCode)">
            {{item.LotteryName}}
        </a>
      </div>
    </div>
  </header>
</template>

<script>
  import Vue from 'vue'
  import {mapState} from 'vuex'
  export default {
    created(){
      [,this.ltype, this.lcode] = this.$route.fullPath.slice(1).split('/')

      //处理得各彩种的List
      var LotteryConfig = this.$store.state.LotteryConfig
      LotteryConfig.forEach(item=>{
        if(item.LotteryClassID.indexOf(this.lcode.slice(0,2)) > -1){
          this.LotteryList = item.LotteryList.map(code=>{
              var el = state.LotteryList[code]
              return el.LotteryType=='6HC'&&el
          })
        }
      })
    },
    data () {
      return {
        LotteryList: [],//彩种list
        lTopNav:['PK10','KL8'],//导航隐藏配置
        hideSubGroup:['6HC'],         //没有次级补录
        noLotteryName: [],       //没有彩种名字
        ltype: '',      //彩种类型
        lcode: ''        //彩种code
      }
    },
    methods:{
      //更改玩法群
      changeGroup(groupItem){
        for(var subGroup in groupItem){
          var subGroupItem = groupItem[subGroup]
          subGroupItem.forEach(modeItem=>{
            if(modeItem.default){
              this.$store.commit('lt_changeMode', modeItem)
            }
          })
        }
      },
      //更改玩法
      changeMode(modeItem){
        this.$store.commit('lt_changeMode', modeItem)
      },
      //更改彩种
      changeLottery(code){
        if(this.$route.params.code!=code){
          // this.LotteryList.forEach(item=>{
          //   if(item.LotteryCode === code){
          //     this.lotteryName = item.LotteryName
          //   }
          // })
          this.$store.dispatch('lt_updateLottery', code)
        }
      },
      //玩法选择框，切换
      toggleModeSelect(){
        this.$store.state.lt.box === 'modeSelect' ?
           this.$store.commit('lt_changeBox', '') :
             this.$store.commit('lt_changeBox', 'modeSelect')
      },
      //彩种选择框，切换
      toggleTypeSelect(){
        if(this.lTopNav.indexOf(this.ltype)===-1){
          this.$store.state.lt.box === 'typeSelect' ?
             this.$store.commit('lt_changeBox', '') :
               this.$store.commit('lt_changeBox', 'typeSelect')
        }
      },
      addSubGroupClass(name){
        var table = {
          '直选': 'directSelect',
          '组选': 'groupSelect',
          '不定位': 'notPosition',
          '趣味': 'taste',
          '定位胆': 'otherPosition',
          '大小单双': 'lastSelect'
        }
        return table[name]
      }
    },
    computed: mapState({
      isHideSubGroup(){
        return this.hideSubGroup.indexOf(this.ltype) > -1
      },
      mode:state=>state.lt.mode,
      config: state=>state.lt.config,
      LotteryName: state=>state.lt.lottery.LotteryName,
      ifShowModeSelect (){
        return state.lt.box === 'modeSelect'
      },
      ifShowTypeSelect (){
        return state.lt.box === 'typeSelect'
      },
      lotteryName(){
        var removeName = {
          'SSC':'时时彩',
          'SYX5': '11选5'
        }
        return this.LotteryName.replace(removeName[this.ltype], '')
      }
    }),
  }
</script>

<style lang = "scss" scoped>

.active:active{
  background: initial !important;
}
@import '../../scss/scssConfig','../../scss/mixin';

  .sscHeader{
  background: #000;
  color:white;
  text-align: center;
  height: 2.3em;
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  z-index: 999;
  > .iconfont{
    position: absolute;
    left: 0;
    top:0;
    display: inline-block;
    vertical-align: top;
    height: 2.3em;
    line-height: 2.3em;
    padding: 0 0.6em;
  }
  .playSort{
    display: inline-block;
    height: 2.3em;
    line-height: 2.3em;
    .iconfont{
      transition: .6s;
      display: inline-block;
      color:#f0c930;
    }
    &.active{
      &:active{
        background:none;
      }
      .iconfont{
        transform: rotate(180deg);
      }
    }
    p{
      font-size: 0.54em;
      display: inline-block;
      line-height: 1.2em;
      height: 2.4em;
      vertical-align: middle;
      margin-left:-1.4em;
      text-align: left;
      position: absolute;
      margin-top: 1em;
    }
    > span{
      display: inline-block;
      font-size: 0.8em;
      border-radius: 0.2em;
      border:1px solid rgba(255,255,255,.5);
      vertical-align: top;
      height: 2em;
      margin:0.45em 0;
      line-height: 1.9em;
      padding: 0 0.4em;
      i{
        font-size: 0.9em;
      }
    }
    &.active{
      .playSortMore{
        display: block;
      }
    }
  }
  .lotterySort{
    float: right;
    position: absolute;
    top: 0;
    right: 0;
    height: 2.875em;
    line-height: 2.875em;
    padding: 0 0.8em;
    font-size: 0.8em;
    i{
      padding-left:0.2em;
      font-size: 0.9em;
    }
    .iconfont{
      transition: .6s;
      display: inline-block;
    }
    &.active{
      .lotteryList{
        display: block;
      }
      .iconfont{
        transform: rotate(180deg);
      }
    }
  }
}
.lotteryList{
  z-index: 12;
  position: fixed;
  right: 0;
  top:2.9em;
  background: white;
  width: 5.5em;
  box-shadow: 0 2px 10px rgba(41, 41, 41, 0.08);
  a{
    color:#333;
    float: left;
    width: 6em;
    font-size: .9em;
    text-align: center;
    &:after {
      content: "";
      display: block;
      background-image: -ms-linear-gradient(90deg, transparent 50%, #d0d0d0, #d0d0d0 50%);
      background-image: -moz-linear-gradient(90deg, transparent 50%, #d0d0d0, #d0d0d0 50%);
      background-image: -webkit-linear-gradient(90deg, transparent 50%, #d0d0d0, #d0d0d0 50%);
      height: 1px;
      width: 100%;
      position: absolute;
    }
    &:nth-last-of-type(1):after{
      display: none;
    }
    &:active{
      background: #ddd;
    }
    &:first-child:before {
      position: absolute;
      content: "";
      display: block;
      width: 0;
      height: 0;
      border-bottom: 1em solid rgba(255, 255, 255, 0.96);
      border-left: 1em solid transparent;
      right: 0;
      top: -0.96em;
    }
  }
}
.betFilter li{
  padding:0 0.8em;
  line-height: 2em;
  @include border-radius(3px);
  cursor: pointer;
  text-align: center;
  color: #555;
  font-size: 0.8em;
  margin: 0.2rem;
  float:left;
  border:1px solid #ddd;
  height: 2em;
}

.betFilterAnd a{
  line-height: 2em;
  @include border-radius(3px);
  cursor: pointer;
  text-align: center;
  color: #555;
  font-size: 0.8em;
  margin: 0.2rem;
  float:left;
  border:1px solid #ddd;
  height: 2em;
}

.betFilter{
  padding: 0.2rem;
  li{
    padding: 0;
    width: 2.72rem;
  }
  .lastSelect{
    width: 3.9rem;
  }
}
.betFilter .curr{
  background: #dc3b40;
  border:1px solid #dc3b40;
  color: white;
}
.betFilterAnd .curr{
  border:1px solid #dc3b40;
  color:#dc3b40;
}
.betFilterAnd{
  text-align: left;
  padding:.2rem .4rem;
  padding-left: 1.6rem;
  position: relative;
  .choosePlayType{
    width: 100%;
    position: absolute;
    top:-.5em;
    height: 1em;
    font-size: .5em;
    line-height: .5em;
    z-index: 3;
    margin-left: -.4em;
    text-align: center;
    padding:0;
    &:before{
      content:'';
      width: 100%;
      height: 1px;
      position:absolute;
      left: 0;
      top:0.45em;
      background-image: -webkit-linear-gradient(90deg, #dfdfdf, #dfdfdf 50%, transparent 50%);
    }
    >div{
      color: #999;
      margin: 0 auto;
      float: initial;
      width: 6.4em !important;
      padding: 0;
      display: block;
      height: 1em;
      line-height: 1em;
      background: white;
      position: relative;
      &:before,&:after{
        position:absolute;
        top:.3em;
        left: -.4em;
        content:'';
        display: block;
        height: .5em;
        width: .5em;
        border-radius: 50%;
        background: #dfdfdf;
      }
      &:after{
        left: inherit;
        right:-.4em;
      }
    }
  }
  li{
    &:last-child{
      span:after{
        background: white;
      }
    }
  }
  .groupSelect{
    a{
      width: 5em;
      padding: 0;
      text-align: center;
    }
  }
  li+li{
    border-top:1px dotted #ddd;
  }
  div{
    vertical-align: top;
    /*width: 10.8rem;*/
    display: block;
    float: left;
    padding: .2rem 0;
  }
  span{
    border:1px solid transparent;
    color:#666;
    vertical-align: top;
    width: 4.3em;
    height: 2em;
    display: block;
    float: left;
    line-height: 2em;
    font-size: .8em;
    position: relative;
    padding: .4rem 0;
    &:before,&:after{
      content: "";
      position: absolute;
      display: block;
    }
    &:before{
      left: -1rem;
      top:1.25em;
      width: .3em;
      height: .3em;
      border:.2em solid #ddd;
      border-radius: .6em;
      background: white;
      z-index: 14;
    }
    &:after{
      width: 1px;
      height: 10em;
      @include bgImg-linear-gradient('0deg, #d0d0d0, #d0d0d0 50%, transparent 50%');
      left: -.82rem;
      top:1.25em;
      z-index: 13;
    }
  }
  a{
    width:5em;
    color:#666;
    border:1px solid #ddd;
    display: inline-block;
    border-radius: .3em;
  }
}

.sscMain{
  margin-bottom: 3.6em;
}


.playSortMore{
  background: rgba(0, 0, 0, 0.4);
  top: 2.85em;
  position: fixed;
  bottom:0;
  width:100%;
  left:0;
  z-index: 999;
}
.playSortMoreCon{
  background: white;
}

.lhc{
  a{
    width: 3.5rem;

  }
}
</style>
