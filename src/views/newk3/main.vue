<template>
  <div class="newContainer" :style="{height:containerHeight}">
    <div class="video">
      <canvas ref="videocanvas"></canvas>
      <iframe v-if="showType" src="http://666666.caishen08.com/hk.html"></iframe>
      <img src="/static/img/newk3-bg.jpg" alt="" width="100%">
    </div>
    <div v-show="show == 'main'" @click="changeShow" class="mainPage">
      <div class="result">
        <table>
          <tr>
            <td><span>开奖号码 3,5,6</span></td>
            <td><span>截止 {{stopTime}}</span></td>
            <td><span>期号 {{nowIssue?nowIssue:'0000000000'}}</span></td>
          </tr>
          <tr>
            <td colspan="3" style="font-size: .7em;">{{TimeBar}}</td>
          </tr>
          <tr>
            <td colspan="3" style="font-size: .7em;" @click.stop="changeVideo">点击<br>{{player===undefined?'开启':'关闭'}}视频</td>
          </tr>
        </table>
        <div class="sound">
          <em></em>
        </div>
      </div>
      <div class="userContent"></div>
    </div>
    <div :style="{opacity:getBetShow?1:0,'z-index':getBetShow?20:0,height:containerHeight}" class="betContainer">
      <div class="header">
        <div class="info fix">
          <div @click="changeShow" class="back"></div>
          <div class="title" @click.stop="playtypeShow='playtype'">{{nowModeName}}</div>
          <div class="help"></div>
        </div>
      </div>
      <div class="space"></div>
      <ul class="playtype fix" v-show="playtypeShow == 'playtype'">
        <li v-for="(d,i) in config" @click="toPlay(d,i)"><em>{{d.name}}</em></li>
      </ul>
      <!-- <div ref="betboxContainer" class="betboxContainer fix" :class="{noscroll:canScorll}" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" :style="{ transform: 'translate3d('+movey+'px, 0px, 0px)',transition:transition+'s',width:8*clientWidth+'px'}" v-show="playtypeShow == ''">
        <div class="betbox" @touchmove.stop="scrollList" :class="i" v-for="(d,i,j) in cfg" :style="{width:clientWidth+'px'}">
          <div class="topshadow"></div>
          <div ref="buttonList" class="newmain">
            <ul class="buttonList fix">
              <li v-for="e in d.itemArr" :class = "{curr:chosen.indexOf(e) > -1,bgnone:e==0}"><span v-if="!(e==0)" @click="choose(e)" class="fix"><em><i>{{e}}</i></em></span></li>
            </ul>
          </div>
          <div class="topshadow"></div>
          <div class="bottomshadow" :style="{height:heightArr[j]+'px'}"></div>
        </div>
      </div> -->
      <div class="betboxContainer" v-show="playtypeShow == ''">
        <div class="slider" ref="slider">
          <div class="slider-group" ref="sliderGroup">
            <div v-for="(d,i,j) in cfg">
              <div :ref="'wrapperCon'+j" class="betbox" :class="i" :style="{height:heightArrCon[j]?heightArrCon[j]+'px':'inherit'}">
                <div class="scrollCon">
                  <div class="topshadow"></div>
                  <div ref="buttonList" class="newmain">
                    <ul class="buttonList fix">
                      <li v-for="e in d.itemArr" :class = "{curr:chosen.indexOf(e) > -1,bgnone:e==0}"><span v-if="!(e==0)" @touchstart="choose(e)" class="fix"><em><i>{{e}}</i></em></span></li>
                    </ul>
                  </div>
                  <div class="topshadow" v-touchtab="changeShow"></div>
                  <div class="bottomshadow" :style="{height:heightArr[j]+'px'}" v-touchtab="changeShow"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <mainfooter ref="footer" :betshow="bet.betting_count" :chosen="chosen"></mainfooter>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import {addClass} from './dom'
  import mainfooter from './footer'
  import {unique,C,mul,BaseBet,deleteCompress,PERBET} from '../../js/kit'
  import {mapState} from 'vuex'
  var eachLen = data=>data.map(arr=>arr.length)
  var getBetStr = (data, mode)=>{
    var line =  data.map(arr=>arr.join(' '))
    if(mode === 'C10'){
      return line.filter(str=>str).join(',')
    }else{
      return line.join(',')
    }
  }
  var cfg = {
    'A10':{
      itemArr:['大','小','单','双',3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
      index:0,
      line:[['大','小','单','双'],[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]],
      alg:data=>eachLen(data).reduce((p,c)=>p+c)
    },
    'B10':{
      itemArr:['三同号通选'],
      index:1,
      line:[['三同号通选']],
      alg:data=>data[0].length
    },
    'C10':{
      itemArr:[111,222,333,444,555,666],
      index:2,
      line:[[111],[222],[333],[444],[555],[666]],
      alg:data=>eachLen(data).reduce((p,c)=>p+c)
    },
    'D10':{
      itemArr:[1,2,3,4,5,6,0,0],
      index:3,
      line:[[1,2,3,4,5,6,0,0]],
      alg:data=>C(data[0].length, 3)
    },
    'E10':{
      itemArr:['三连号通选'],
      index:4,
      line:[['三连号通选']],
      alg:data=>data[0].length
    },
    'F10':{
      itemArr:[11,22,33,44,55,66,0,0],
      index:5,
      line:[[11,22,33,44,55,66,0,0]],
      alg:data=>data[0].length
    },
    'G10':{
      itemArr:[11,22,33,44,55,66,1,2,3,4,5,6],
      index:6,
      line:[[11,22,33,44,55,66],[1,2,3,4,5,6]],
      alg:data=>mul(2,eachLen(data))
    },
    'H10':{
      itemArr:[1,2,3,4,5,6,0,0],
      index:7,
      line:[[1,2,3,4,5,6,0,0]],
      alg:data=>C(data[0].length, 2)
    },
  }
  export default {
    props:["showType"],
    components: {
      mainfooter,
    },
    data:()=>{
      return{
        show:'main',                                      //main:直播，bet:投注
        playtypeShow:'',                                  //玩法显示
        tempy:0,                                          //touchstart的位置
        movey:0,                                          //移动中的y位置
        transition:0,                                     //左右切换面板的动画速度
        card:0,                                           //当前处于哪一块投注面板
        maxCard:8,                                        //最多有几块投注面板
        clientWidth:document.documentElement.clientWidth,
        beforeScreenHeight:0,                             //窗口变化前的高度
        heightArrCon:[],                                  //投注面板容器的高度
        heightArr:[],                                     //补缺高度数组
        canScorll:0,                                      //投注面板是否能滚动
        containerHeight:'auto',                           //当投注面板不能滚动时，newContainer和betContainer需要100%高度来撑起高度
        betshow:0,                                        //footer是否显示
        cfg:cfg,
        currentPageIndex: 0,
        loop:false,
        autoPlay:false,
        interval:4000,
        //新增字段
        videoUrl:'ws://47.52.109.168:8082/',
        option:null,
        player:null,
        showType:''
      }
    },
    // computed:{
    //   getBetShow(){
    //     return (this.show == 'bet')
    //   },
    //   swiper() {
    //     return this.$refs.mySwiper.swiper
    //   }
    // },
    computed:mapState({
      //header部分
      ifShowTypeSelect (){
        return this.$store.state.lt.box === 'typeSelect'
      },
      ifShowModeSelect (){
        return this.$store.state.lt.box === 'modeSelect'
      },
      LotteryName: ()=>state.lt.lottery.LotteryName,
      config:()=>state.lt.config,
      award:()=>state.lt.award,
      odds:()=>state.lt.Odds['K3'],
      nowModeName:()=>state.lt.mode.name,
      nowModeIndex:()=>cfg[state.lt.mode.mode].index,
      //开奖结果部分
      oldIssue(){
        return state.lt.lottery.LotteryCode === '1406' ? state.lt.OldIssue : state.lt.OldIssue.slice(4)
      },
      nowIssue(){
        return state.lt.NowIssue
      },
      stopTime(){
        var dd = new Date(state.lt.StopTime/1000)
        var hour = (dd.getHours().toString().length<2)?'0'+dd.getHours():dd.getHours()
        var minute = (dd.getMinutes().toString().length<2)?'0'+dd.getMinutes():dd.getMinutes()
        var second = dd.getSeconds().toString().length<2?'0'+dd.getSeconds():dd.getSeconds()
        return hour+':'+minute+':'+second
      },
      TimeBar:()=>state.lt.TimeBar,
      results(){
        var _results = state.lt.WS.openNum
        if(!_results){
          return []
        }else{
          return _results.LotteryOpen.split(',')
        }
      },
      display(){
        console.log(state.lt.displayResults)
        return state.lt.displayResults ? this.results : this.wait4Results
      },
      displayClass(){
        return state.lt.displayResults ? 'Dice' : 'rDice'
      },
      ifShowPastOpen(){
        return this.$store.state.lt.box === 'pastOpen'
      },
      ifShowBetRecord(){
        return this.$store.state.lt.box === 'BetRecord'
      },
      pastOpen(){
        var pastOpen = state.lt.LotteryResults[this.lcode].map(item=>{
          var el = {}
          el.IssueNo = item.IssueNo.length < 7 ? item.IssueNo :item.IssueNo.slice(4)        //把年份砍掉
          var results = item.LotteryOpen.split(',')
          el.LotteryOpen = results
          el.sum = results.reduce((a,b)=>(+a)+(+b))
          el.bigOrSmall = el.sum > 10 ? '大' : '小'
          el.singleOrDouble = el.sum % 2 === 1 ? '单' : '双'
          return el
        })
        return pastOpen
      },
      BetRecord(){
        var Record = state.lt.BetRecord
        if(!Record || Record.length === 0){
          var emptyObj = {issueNo:'xxxx', normal_money:'', openState:''}
          Record = [0,0,0].map(item=>emptyObj)
        }
        return Record
      },
      tip:()=>state.lt.mode.tip,
      //玩法区
      itemArr:()=>cfg[state.lt.mode.mode].itemArr,
      mode:()=>state.lt.mode.mode,
      award:()=>state.lt.award,
      tipRebate(){
        return typeof this.award === 'string' ? `赔率${this.award}倍。` : ''
      },
      chosen:()=>state.lt.tmp['K3']?state.lt.tmp['K3']:[],
      bet:()=>state.lt.bet,
      betStr:()=>state.lt.bet.betting_number,
      betCountStr:()=>state.lt.bet.betting_number ? `共${state.lt.bet.betting_count}注`:'',
      betMoneyStr(){
        return (state.lt.bet.betting_money && this.showPrice)  ? `，${state.lt.bet.betting_money}元` : ''
      },
      basket:()=>state.lt.basket,
      getBetShow(){
        return (this.show == 'bet')
      },
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    }),
    methods:{
      changeVideo(){
        if(this.player === undefined){
          this.player = new Live.Player(this.videoUrl, this.option);
          console.log('开启')
        }else{
          this.player.destroy()
          this.player = undefined
          layer.alert('已关闭视频')
        }
      },
      choose(item){
        if(!this.award)return
        var _pos = this.chosen.indexOf(item),
            _chosen = this.chosen.slice(0)

        //如果已经存在，就删除该项
        if(_pos > -1){
          _chosen.splice(_pos, 1)
          var tmp = _chosen
        }else{
          if(this.mode === 'G10'){
            //如果是二同号单选
            var firstChar = item.toString()[0]
                ,_x = _chosen.indexOf(+firstChar)
                ,_xx = _chosen.indexOf(+(firstChar + firstChar))
                ,removeArr = [_x, _xx]

            removeArr.forEach(pos=>{
              if(pos > -1){
                _chosen.splice(pos,1)
              }
            })
          }

          //不存在添加该项
          _chosen.push(item)
          //去重加排序
          _chosen = unique(_chosen)
          var tmp = []
          for(var i = 0;i < this.itemArr.length;i++){
            if(_chosen.indexOf(this.itemArr[i]) > -1){
              tmp.push(this.itemArr[i])
            }
          }
        }
        this.$store.commit({
          type:'lt_updateTmp',
          alias: 'K3',
          arr: tmp
        })

        //分行
        var line = cfg[this.mode].line,
            _data = []

        line.forEach(lineArr=>{
          var _l = []
          for(var i = 0;i < lineArr.length;i++){
            if(_chosen.indexOf(lineArr[i]) > -1){
              _l.push(lineArr[i])
            }
          }
          _data.push(_l)
        })

        console.log(cfg[this.mode])
        var betCount = cfg[this.mode].alg(_data)

        this.$store.commit('lt_setBetCount', betCount)
        this.$store.commit('lt_setBetStr', getBetStr(_data, this.mode))
        document.activeElement.blur()
      },
      setHeight(){
        console.log('继续检测高度')
        var screenHeight = document.documentElement.clientHeight
        if (this.beforeScreenHeight == screenHeight) {
          return
        }
        console.log('高度变化')
        this.beforeScreenHeight = screenHeight
        var footerHeight = this.$refs.footer.$el.offsetHeight
        var buttonList = document.getElementsByClassName('buttonList')
        var temp = []
        for (var i = 0; i < buttonList.length; i++) {
          var mainHeight = screenHeight - (2.3+1+1+2.5)*em - buttonList[i].offsetHeight
          if (temp[0]<0) {
            console.log('高度不够，需要滚动')
            mainHeight-=temp[0]
            var dom = document.getElementsByClassName('scrollCon')[0].offsetHeight
            this.heightArrCon[0]=dom+temp[0]
          }else{
            this.canScorll = 1
            this.containerHeight = '100%'
          }
          temp.push(mainHeight)
        }
        if (temp[0]<0) {
          var temp0 = temp[0] *-1
          for (var i = 0; i < temp.length; i++) {
            temp[i] = temp[i]+3.2*em + temp0
          }
        }
        // temp.unshift(temp[temp.length-1])
        this.heightArr = temp
        console.log(this.heightArr)
        console.log('继续检测高度结束')
      },
      changeHeight(){
        var screenHeight = document.documentElement.clientHeight
        var temp = screenHeight - this.beforeScreenHeight
        this.beforeScreenHeight = screenHeight
        for (var i = 0; i < this.heightArr.length; i++) {
          this.heightArr[i] += temp
        }
      },
      touchChangeHeight(){
        this.heightArr = []
        this.heightArrCon = []
        this.setHeight()
      },
      changeShow(){
        if(document.activeElement.tagName === 'INPUT'){
          return document.activeElement.blur()
        }
        if (this.show == 'main') {
          this.show = 'bet'
          this.changeHeight()
          return
        }
        return this.show = 'main'
      },
      toPlay(mode,witch){
        this.$store.commit('lt_changeMode', mode)
        this.playtypeShow=''
        this.transition = .5
        this.slider.goToPage(witch, 0, 400)
      },
      // touchstart(e){
      //   this.tempy = e.touches[0].clientX
      // },
      // touchmove(e){
      //   this.moving(e)
      //   e.preventDefault()
      // },
      // moving(e){
      //   var dragWidth = 20
      //   var newpoint = e.touches[0].clientX
      //   // alert(`起始点：${this.tempy}，校对点：${newpoint}`)
      //   if(this.tempy+dragWidth<newpoint){
      //     this.movey = e.touches[0].clientX-this.tempy-this.card*this.clientWidth - dragWidth
      //   }else if(this.tempy>newpoint+dragWidth){
      //     this.movey = e.touches[0].clientX-this.tempy-this.card*this.clientWidth + dragWidth
      //   }
      //   else{
      //     // e.preventDefault()
      //   }
      // },
      // touchend(e){
      //   this.tempy = 0
      //   if(this.movey > -this.clientWidth * this.card + 40 && this.card > 0){
      //     this.transition = .3
      //     this.movey = -this.clientWidth * (this.card-1)
      //     this.card -=1
      //     setTimeout(()=>{
      //       this.transition = 0
      //     },500)
      //   }else if(this.movey < -this.clientWidth * this.card - 40 && this.card < this.maxCard-1){
      //     this.transition = .3
      //     this.movey = -this.clientWidth * (this.card+1)
      //     this.card +=1
      //     setTimeout(()=>{
      //       this.transition = 0
      //     },500)
      //   }else{
      //     this.transition = .2
      //     this.movey = -this.clientWidth * this.card
      //     setTimeout(()=>{
      //       this.transition = 0
      //     },200)
      //   }
      // },
      scrollList(e){
        this.moving(e)
      },
      changeMode(mode){
        this.$store.commit('lt_changeMode', mode)
      },
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children
        let width = 0
        // slider 可见宽度
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          // 设置每个子元素的样式及高度
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          // 计算总宽度
          width += sliderWidth
        }
        // 循环播放首尾各加一个,因此总宽度还要加两倍的宽度
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400,
          // click:true
          bounce:false
        })
        // 监听滚动结束时间获取pageX
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          if (pageIndex !== this.currentPageIndex) {
            this.$store.commit('lt_changeMode', this.config[pageIndex])
          }
          if (this.loop) {
            // 由于bscroll循环播放首尾各加一个,因此索引-1
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex
          if (this.autoPlay) {
            this._play()
          }
        })
        this.slider.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _play() {
        // currentPageIndex为不含首尾副本的索引，因此若有循环要+2
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    },
    watch:{
      showType(n,o){
        if (this.showType) {
          if (this.player!==undefined) {
            this.player.destroy()
          }
        }
      }
    },
    mounted(){
      if (!this.showType) {
        var canvas = this.$refs.videocanvas
        this.option = {canvas: canvas, chunkSize:1};
        this.player = new Live.Player(this.videoUrl, this.option); 
      }
      this.setHeight()
      setTimeout(()=>{
        this.changeHeight()
      },200)

      this._setSliderWidth()
      setTimeout(() => {
        this._initSlider()
        if (this.autoPlay) {
          this._play()
        }
      }, 20)
      // 监听窗口大小改变时间
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
      console.log(this.$refs.wrapperCon0[0])
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapperCon0[0], {bounce:false})
      })
    },
    // 生命周期destroyed销毁清除定时器，有利于内存释放
    destroyed() {
      this.player.destroy()
      clearTimeout(this.timer)
    },
  }
</script>
<style lang="scss" scoped>
  .mainPage{
    height:100%;
    position:fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    z-index:20;
  }
  .result{
    color:white;
    position:relative;
    table{
      width:100%;
      text-align:center;
      background:rgba(0, 0, 0, 0.2);
      border-bottom:1px solid rgba(0, 0, 0, 0.12);
      table-layout: fixed;

    }
    span{
      font-size:.7em;
      display:block;
      width:100%;
      line-height:1.4em;
      margin:.8em 0;
      border-right:1px solid rgba(0,0,0,.12);
    }
  }
  .sound{
    position:absolute;
    width:2em;
    height:2em;
    line-height:2em;
    text-align:center;
    right:.3em;
    em{
      display:block;
      &:before{
        content:'\e64b';
        font-family:'iconfont';
        display:block;
      }
    }
  }

  //header样式
  .header{
    height:2.3em;
    position:fixed;
    z-index:50;
    top:0;
    left:0;
    width:100%;
  }
  .info{
    background: rgba(0, 0, 0, 0.6);
    height:2.3em;
    line-height:2.3em;
    width:100%;
    > div{
      float:left;
      height:2.3em;
    }
    .back,.help{
      width:15%;
    }
    .title{
      color:white;
      width:70%;
      text-align:center;
    }
  }
  .back:before,.help:before{
    font-family:'iconfont';
    color:rgba(255, 255, 255, 0.3);
    display:block;
    text-align:center;
  }
  .back:before{
    content:'\e64b';
  }
  .help:before{
    content:'\e64b';
  }
  //header样式结束

  
  .playtype{
    position:fixed;
    z-index:50;
    height:calc(100% - 2.3em - 2.5em);
    background:rgba(0, 0, 0, 0.6);
    padding:0 .35rem;
    li{
      color:white;
      float:left;
      width:4.4rem;
      border:1px solid #aaa;
      border-radius:.25rem;
      margin:.35rem;
      em{
        font-size:.75em;
        display:block;
        text-align:center;
        line-height:2.6em;
      }
    }
  }


  .space{
    height:2.3em;
    width:100%;
  }
  .space2{
    height:2.15em;
    width:100%;
  }
  .video{
    position:fixed;
    top:0;
    left:0;
    height:100%;
    width:100%;
    img{
      position:absolute;
      top:0;
      left:0;
      z-index: 9;
    }
    canvas{
      position:absolute;
      top:0;
      left: 0;
      z-index: 10;
      width: 100%;
      height:100%;
    }
    iframe{
      position: absolute;
      top:-100px;
      z-index: 10;
      height: 150%;
      width: 100%;
    }
  }
  .newContainer{
    position:relative;
    z-index:20;
    width:100%;
  }
  .betContainer{
    width:100%;
    overflow:hidden;
    transition:.2s;
  }
  .topshadow{
    height:1em;
    background:rgba(0,0,0,.6);
    width:100%;
    position: relative;
  }
  .betboxContainer{
    padding-bottom:2.5em;
    height:calc(100% - 2.3em);
  }
  .noscroll{
    position:fixed;
  }
  .betbox{
    width:100%;
    float:left;
  }
  .newmain{
    position:relative;
    &:before,&:after{
      content:'';
      position:absolute;
      top:0;
      left:0;
      width:calc((100vw - 288px)/2);
      height:100%;
      background:rgba(0,0,0,.6);
    }
    &:after{
      left:initial;
      right:0;
    }
  }
  .buttonList{
    width:288px;
    margin:0 auto;
    font-size:24px;
    >li{
      float:left;
      width:3em;
      height:3em;
      line-height:3em;
      text-align:center;
      color:white;
      position:relative;
      overflow: hidden;
      &:after,span{
        position:absolute;
        width:100%;
        height:100%;
        left:0;
        top:0;
      }
      &:after{
        content:'';
        background:url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA4MTkuMiA4MTkuMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgODE5LjIgODE5LjI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPi5zdDB7b3BhY2l0eTowLjY7fTwvc3R5bGU+PHBhdGggY2xhc3M9InN0MCIgZD0iTTY5LjYsNDA5LjZjMCwxODcuOCwxNTIuMiwzNDAsMzQwLDM0MHMzNDAtMTUyLjIsMzQwLTM0MHMtMTUyLjItMzQwLTM0MC0zNDBTNjkuNiwyMjEuOCw2OS42LDQwOS42TDY5LjYsNDA5LjZ6Ii8+PHBhdGggY2xhc3M9InN0MCIgZD0iTTQwOS42LDBIMHY4MTkuMmg4MTkuMlYwSDQwOS42eiBNNDA5LjYsNzY0QzIxNC4yLDc2NCw1NS4yLDYwNSw1NS4yLDQwOS42czE1OS0zNTQuNCwzNTQuNC0zNTQuNFM3NjQsMjE0LjIsNzY0LDQwOS42UzYwNSw3NjQsNDA5LjYsNzY0eiIvPjxwYXRoIGQ9Ik00MjQsNDkxIi8+PC9zdmc+') no-repeat;
        background-size:100%;
      }
      span{
        position:absolute;
        z-index:20;
        em{
          i{
            font-size:1em;
          }
          
        }
      }
    }
    .curr{
      &:after{
        background:url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA4MTkuMiA4MTkuMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgODE5LjIgODE5LjI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPi5zdDB7b3BhY2l0eTowLjg7ZmlsbDojN0M3QzdDO2VuYWJsZS1iYWNrZ3JvdW5kOm5ldzt9LnN0MXtvcGFjaXR5OjAuNjtlbmFibGUtYmFja2dyb3VuZDpuZXc7fTwvc3R5bGU+PHBhdGggY2xhc3M9InN0MCIgZD0iTTY5LjYsNDA5LjZjMCwxODcuOCwxNTIuMiwzNDAsMzQwLDM0MHMzNDAtMTUyLjIsMzQwLTM0MHMtMTUyLjItMzQwLTM0MC0zNDBTNjkuNiwyMjEuOCw2OS42LDQwOS42TDY5LjYsNDA5LjZ6Ii8+PHBhdGggY2xhc3M9InN0MSIgZD0iTTQwOS42LDBIMHY4MTkuMmg4MTkuMlYwSDQwOS42eiBNNDA5LjYsNzQ5LjdjLTE4Ny41LDAtMzQwLjEtMTUyLjYtMzQwLjEtMzQwLjFTMjIyLjEsNjkuNSw0MDkuNiw2OS41czM0MC4xLDE1Mi42LDM0MC4xLDM0MC4xUzU5Ny4xLDc0OS43LDQwOS42LDc0OS43eiIvPjxwYXRoIGQ9Ik00MjQsNDkxIi8+PC9zdmc+') no-repeat;
      }
    }
  }
  .bottomshadow{
    width:100%;
    background:rgba(0,0,0,.6);
  }
  .betbox.B10,.betbox.E10{
    .buttonList{
      li{
        width:100%;
        &:before,&:after{
          background:rgba(0,0,0,.6);
          width:2em;
          content:'';
          height:3em;
          display:block;
        }
        &:before{
          float:right;
        }
      }
      span{
        width:100%;
        margin-left:2em;
        &:before,&:after{
          background:url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0MDkuNiA4MTkuMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDA5LjYgODE5LjI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPi5zdDB7b3BhY2l0eTowLjY7ZW5hYmxlLWJhY2tncm91bmQ6bmV3O308L3N0eWxlPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02OS42LDQwOS42YzAsMTg3LjgsMTUyLjIsMzQwLDM0MCwzNDBsMC02ODBDMjIxLjgsNjkuNiw2OS42LDIyMS44LDY5LjYsNDA5LjZMNjkuNiw0MDkuNnoiLz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDA5LjYsMEgwdjgxOS4yaDgxOS4yVjBINDA5LjZ6IE00MDkuNiw3NjRDMjE0LjIsNzY0LDU1LjIsNjA1LDU1LjIsNDA5LjZzMTU5LTM1NC40LDM1NC40LTM1NC40Uzc2NCwyMTQuMiw3NjQsNDA5LjZTNjA1LDc2NCw0MDkuNiw3NjR6Ii8+PHBhdGggZD0iTTQyNCw0OTEiLz48L3N2Zz4=') no-repeat left;
          content:'';
          display:block;
          height:3em;
          width:1.5em;
          float:left;
        }
        &:after{
          background:url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0MDkuNiA4MTkuMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDA5LjYgODE5LjI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPi5zdDB7b3BhY2l0eTowLjY7ZW5hYmxlLWJhY2tncm91bmQ6bmV3O308L3N0eWxlPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zNDAsNDA5LjZjMC0xODcuOC0xNTIuMi0zNDAtMzQwLTM0MHY2ODBDMTg3LjgsNzQ5LjYsMzQwLDU5Ny40LDM0MCw0MDkuNkwzNDAsNDA5LjZ6Ii8+PHBhdGggY2xhc3M9InN0MCIgZD0iTTAsODE5LjJoNDA5LjZWMGgtODE5LjJ2ODE5LjJIMHogTTAsNTUuMmMxOTUuNCwwLDM1NC40LDE1OSwzNTQuNCwzNTQuNFMxOTUuNCw3NjQsMCw3NjRzLTM1NC40LTE1OS0zNTQuNC0zNTQuNFMtMTk1LjQsNTUuMiwwLDU1LjJ6Ii8+PHBhdGggZD0iTS0xNC40LDMyOC4yIi8+PC9zdmc+') no-repeat left;
          clear:inherit;
        }
        em{
          float:left;
          width:5em;
          display:block;
          height:3em;
          background:url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA4MTkuMiA4MTkuMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgODE5LjIgODE5LjI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPi5zdDB7b3BhY2l0eTowLjY7ZW5hYmxlLWJhY2tncm91bmQ6bmV3O308L3N0eWxlPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0wLDY5LjZ2NjgwaDgxOS4yYzAsMCwwLTQ5Mi4yLDAtNjgwSDB6Ii8+PHBhdGggY2xhc3M9InN0MCIgZD0iTTQwOS42LDBIMGwwLDU1LjJoODE5LjJsMC01NS4ySDQwOS42eiBNNDA5LjYsNTUuMiIvPjxwYXRoIGQ9Ik00MjQsNDkxIi8+PHBhdGggY2xhc3M9InN0MCIgZD0iTTQwOS42LDc2NEgwbDAsNTUuMmg4MTkuMmwwLTU1LjJINDA5LjZ6IE00MDkuNiw4MTkuMiIvPjwvc3ZnPg==')
        }
      }
      .curr{
        span{
          &:before{
            background:url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0MDkuNiA4MTkuMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDA5LjYgODE5LjI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPi5zdDB7b3BhY2l0eTowLjg7ZmlsbDojN0M3QzdDO2VuYWJsZS1iYWNrZ3JvdW5kOm5ldzt9LnN0MXtvcGFjaXR5OjAuNjtlbmFibGUtYmFja2dyb3VuZDpuZXc7fTwvc3R5bGU+PHBhdGggY2xhc3M9InN0MCIgZD0iTTY5LjYsNDA5LjZjMCwxODcuOCwxNTIuMiwzNDAsMzQwLDM0MHMzNDAtMTUyLjIsMzQwLTM0MHMtMTUyLjItMzQwLTM0MC0zNDBTNjkuNiwyMjEuOCw2OS42LDQwOS42TDY5LjYsNDA5LjZ6Ii8+PHBhdGggY2xhc3M9InN0MSIgZD0iTTQwOS42LDBIMHY4MTkuMmg4MTkuMlYwSDQwOS42eiBNNDA5LjYsNzQ5LjdjLTE4Ny41LDAtMzQwLjEtMTUyLjYtMzQwLjEtMzQwLjFTMjIyLjEsNjkuNSw0MDkuNiw2OS41czM0MC4xLDE1Mi42LDM0MC4xLDM0MC4xUzU5Ny4xLDc0OS43LDQwOS42LDc0OS43eiIvPjxwYXRoIGQ9Ik00MjQsNDkxIi8+PC9zdmc+') no-repeat left;
          }
          &:after{
            background:url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0MDkuNiA4MTkuMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDA5LjYgODE5LjI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPi5zdDB7b3BhY2l0eTowLjg7ZmlsbDojN0M3QzdDO2VuYWJsZS1iYWNrZ3JvdW5kOm5ldzt9LnN0MXtvcGFjaXR5OjAuNjtlbmFibGUtYmFja2dyb3VuZDpuZXc7fTwvc3R5bGU+PHBhdGggY2xhc3M9InN0MCIgZD0iTS0zNDAsNDA5LjZjMCwxODcuOCwxNTIuMiwzNDAsMzQwLDM0MHMzNDAtMTUyLjIsMzQwLTM0MFMxODcuOCw2OS42LDAsNjkuNlMtMzQwLDIyMS44LTM0MCw0MDkuNkwtMzQwLDQwOS42eiIvPjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0wLDBoLTQwOS42djgxOS4yaDgxOS4yVjBIMHogTTAsNzQ5LjdjLTE4Ny41LDAtMzQwLjEtMTUyLjYtMzQwLjEtMzQwLjFTLTE4Ny41LDY5LjUsMCw2OS41czM0MC4xLDE1Mi42LDM0MC4xLDM0MC4xUzE4Ny41LDc0OS43LDAsNzQ5Ljd6Ii8+PHBhdGggZD0iTTE0LjQsNDkxIi8+PC9zdmc+') no-repeat left;
          }
          em{
          background:url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA4MTkuMiA4MTkuMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgODE5LjIgODE5LjI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPi5zdDB7b3BhY2l0eTowLjg7ZmlsbDojN0M3QzdDO2VuYWJsZS1iYWNrZ3JvdW5kOm5ldzt9LnN0MXtvcGFjaXR5OjAuNjtlbmFibGUtYmFja2dyb3VuZDpuZXc7fTwvc3R5bGU+PHBhdGggY2xhc3M9InN0MCIgZD0iTTAsNjkuNnY2ODBoODE5LjJjMCwwLDAtNDkyLjIsMC02ODBMMCw2OS42TDAsNjkuNnoiLz48cGF0aCBjbGFzcz0ic3QxIiBkPSJNNDA5LjYsMEgwdjY5LjZoODE5LjJWMEg0MDkuNnoiLz48cGF0aCBkPSJNNDI0LDQ5MSIvPjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00MDkuNiw3NDkuNkgwdjY5LjZoODE5LjJ2LTY5LjZINDA5LjZ6Ii8+PC9zdmc+')
          }
        }
      }
    }
  }
  .betbox.C10{
    .buttonList{
      li{
        margin:0 .5em;
        position:relative;
        overflow:inherit;
        em{
          &:before,&:after{
            position:absolute;
            top:0;
            left:-.5em;
            content:'';
            display:block;
            height:3em;
            width:.5em;
            background:rgba(0,0,0,.6);
          }
          &:after{
            left:inherit;
            right:-.5em;
          }
        }
      }
    }
  }
  .bgnone{
    &:after{
      background:rgba(0,0,0,.6) !important;
    }
  }
</style>
<style>
.slider-wrapper{
  width: 100%;
  position: relative;
  overflow: hidden;
}
.scroll{
  height: 500px;
}
  .slider{
    min-height: 1px;
    position: relative;
    height:100%;
  }

  .slider-group{
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    height:100%;
  }

  .slider-item{
    float: left;
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
    height: 100%;
    overflow: hidden;
  }

  .slider-item a{
    display: block;
    width: 100%;
    overflow: hidden;
    text-decoration: none;
  }


  .slider-item img{
    display: block;
    width: 100%;
  }
</style>