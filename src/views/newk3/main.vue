<template>
  <div>
  <div class="newContainer">
    <gift :activegift="activegift" v-show="show == 'main'"></gift>
    <div class="middleBox loadingBg">
      <img :src="$store.state.constant.ImgHost+'/live/newk3-bg.jpg'" alt="" width="100%">
    </div>
    <div class="middleBox">
      <div v-if="loading" class="loading" id="loading"></div>
    </div>
    <div class="middleBox FGAndWifi">
      <div v-show="showFGbtn" :style="'background-image: url('+$store.state.constant.ImgHost+'/live/4g-bg.jpg);'"></div>
    </div>
    <div class="middleBox iframe">
      <iframe ref="iframe" src="/static/video.html" sandbox="allow-same-origin allow-scripts"></iframe>
    </div>
    <div class="changeShow" @click="changeShow"></div>
    <div class="g4view">
      <SicBo :lcode="lcode" v-show="WifiOrFG === 'FG'"></SicBo>
    </div>
    <div v-show="show == 'main'" @click="changeShow" class="mainPage">
      <div class="result">
        <div class="timebar" @click.stop="history = 1">
          <em v-show="/^\d/.test(TimeBar)">{{nowIssue}}期投注：</em>
          {{TimeBar}}<i class="iconfont">&#xe60e;</i>
        </div>
        <div class="oldissue" @click.stop="history = 2">
          {{oldIssue}}期开奖：<div class="DiceImg">
            <div class="Dice" :class="displayClass+results[0]"></div><div class="Dice" :class="displayClass+results[1]"></div><div class="Dice" :class="displayClass+results[2]"></div>
          </div>
          <i class="iconfont">&#xe60e;</i>
        </div><history v-if="history" :type="history"></history>
      </div>
      <div class="Anchor" @click.stop="showCard(1)" v-if="$parent.Anchor.Photo">
        <div class="AnchorImg" :style="'background: url('+$parent.Anchor.Photo+')'"></div>
        <div class="AnchorBg" :style="'background: url('+$store.state.constant.ImgHost+'/live/crown-anchor.png)'"></div>
      </div>
      <barrage ref="barrage" class="barrage" :class="{toTop:(activeHide===1),toBottom:(activeHide===3)}" v-if="barrageIsOpen"></barrage>
      <div class="g4">
        <a href="javascript:;" class="btn" :class="WifiOrFG" v-show="showFGbtn" @click.stop="changeNet"></a>
      </div>
      <div class="control">
        <ul class="con-btn fix">
          <li><router-link class="back" :to="backPage"></router-link></li>
          <li><a class="question" href="javascript:;" @click.stop="showCard(3)"></a></li>
          <li><a class="anchor" href="javascript:;" @click.stop="showCard(2)"></a></li>
          <li><a class="gift" href="javascript:;" @click.stop="showHide(3)"></a></li>
          <li><a class="facetext" href="javascript:;" v-if="barrageShow > -1" @click.stop="showHide(1)"><em>发弹幕...</em></a></li>
        </ul>
        <div class="hideCon" @click.stop="">
          <facetext ref="facetext" :class="{ined:activeHide === 1}"></facetext>
          <selectGift :class="{ined:activeHide === 3}"></selectGift>
        </div>
      </div>
      <broadCast></broadCast>
      <div class="mainBg"></div>
    </div>
    <div :class="{bet:(show === 'bet')?1:0}" class="betContainer">
      <div class="header">
        <div class="info fix">
          <div @click="changeShow" class="status-con">
            <div class="status"><span>
              <em v-show="/^\d/.test(TimeBar)">投注：</em>{{TimeBar}}</span></div>
          </div>
          <div class="title" @click.stop="playtypeShow='playtype'"><span>{{nowModeName}}</span></div>
        </div>
      </div>
      <div class="space"></div>
      <ul class="playtype fix" v-show="playtypeShow == 'playtype'" @click="changeShow">
        <li v-for="(d,i) in config" @click.stop="toPlay(d,i)"><em>{{d.name}}</em></li>
      </ul>
      <div class="betboxContainer" v-show="playtypeShow == ''">
        <div class="slider" ref="slider">
          <div class="slider-group" ref="sliderGroup">
            <div v-for="(d,i,j) in cfg">
                <div class="betbox" :class="i" @click="changeShow">
                    <p class="MethodMsg">{{tipsObj[i]}}
                      <template v-if="i !== 'A10'">赔率{{rebates[i]}}倍。</template>
                    </p>
                    <ul class="buttonList fix">
                      <li v-for="(e,index) in d.itemArr" :class = "{curr:chosen.indexOf(e) > -1,bgnone:e==0}"><span v-if="!(e==0)"  class="fix" @click.stop="choose(e)"><em><i>{{e}}</i></em><p v-if="A10Rebate[index]">{{index < 4 ? '赔率': '赔'}}{{A10Rebate[index]}}</p></span></li>
                    </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
      <mainfooter ref="footer" :betshow="bet.betting_count" :chosen="chosen"></mainfooter>
    </div>
    <userinfo v-if="userinfoShow"></userinfo>
  </div>
    <div class="testbg"></div>
  </div>
</template>
<script>
  import BScroll       from 'better-scroll'
  import {addClass}    from './dom'
  import barrage       from './barrage'
  import mainfooter    from './footer'
  import {unique,C,mul,BaseBet,deleteCompress,PERBET} from '../../js/kit'
  import {mapState}    from 'vuex'
  import gift          from './gifts'
  import selectGift    from './selectGift'
  import facetext      from './facetext'
  import history       from './history'
  import {gifts,giftsList,faceData,livecfg} from '../../js/liveconfig'
  import userinfo      from './userinfo'
  import broadCast     from './broadCast'
  import SicBo         from './SicBo'
  import '@/js/svga.min'
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
    props:['lcode'],
    components: {
      mainfooter,
      barrage,
      gift,
      selectGift,
      facetext,
      history,
      userinfo,
      broadCast,
      SicBo,
    },
    data:()=>{
      return{
        show:'main',                                      //main:直播，bet:投注
        playtypeShow:'',                                  //玩法显示
        clientWidth:document.documentElement.clientWidth,
        beforeScreenHeight:0,                             //窗口变化前的高度
        heightArrCon:0,                                  //投注面板容器的高度
        heightArr:0,                                     //补缺高度数组
        betshow:0,                                        //footer是否显示
        cfg:cfg,
        currentPageIndex: 0,
        loop:false,
        autoPlay:false,
        interval:4000,
        activegift:null,
        activeHide:0,
        face:null,
        text:null,
        barrageIsOpen:0,                //弹幕是否开启
        history:0,
        wait4Results:[1,2,3],              //等待开奖的默认状态
        wait4Resultst:null,
        changeSize:null,                   //改变窗口大小执行的函数
        giftsList:giftsList,
        faceData:faceData,
        textData:null,
        broadCastData:[],
        userinfoShow:0,
        userinfoBy:'',
        A10Rebate:[],
        tipsObj:{},//全部tip的对象
        rebates:{},//全部返点值
        barrageShow:-1,
        livecfg:livecfg,
        loading:1,
        player:null,
        available:[],
        WifiOrFG:'Wifi',
        showFGbtn:0,
        visibilitychange:null,
        backPage:window.preurl,
      }
    },
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
        if (state.lt.TimeBar === '等待开奖') {
          return this.nowIssue
        }
        let newRecord = state.lt.LotteryResults[this.lcode][0]
        return newRecord?newRecord.IssueNo.replace(/^.{4}/,''):''
      },
      nowIssue(){
        let issue = ''+state.lt.NowIssue
        if (issue) {
          return issue.substring(4,issue.length)
        }
        return '00000000'
      },
      // stopTime(){
      //   var dd = new Date(state.lt.StopTime/1000)
      //   var hour = (dd.getHours().toString().length<2)?'0'+dd.getHours():dd.getHours()
      //   var minute = (dd.getMinutes().toString().length<2)?'0'+dd.getMinutes():dd.getMinutes()
      //   var second = dd.getSeconds().toString().length<2?'0'+dd.getSeconds():dd.getSeconds()
      //   return hour+':'+minute+':'+second
      // },
      TimeBar:()=>{
        let time = state.lt.TimeBar
        time = time.substring(time.length-2,time.length)
        if (isNaN(time)) {
          return state.lt.TimeBar
        }
        if (time === '') {
          return ''
        }
        return time+'S'
      },
      results(){
        if(state.lt.LotteryResults[this.lcode].length<1){
          return ''
        }
        if (state.lt.TimeBar === '等待开奖') {
          this.$store.commit('lt_displayResults', false)
          return this.wait4Results
        }
        this.$store.commit('lt_displayResults', true)
        return state.lt.LotteryResults[this.lcode][0].LotteryOpen.split(',')
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
      basket:()=>state.lt.basket
    }),
    created(){
      _pushType('in')
      function circle(num){
        num ++
        if(num > 3){
          return 0
        }else{
          return num
        }
      }
      var arr = [0,0,0]
      this.wait4Resultst = setInterval(()=>{
        arr = arr.map(circle)
        this.wait4Results = arr
      },80)
      //计算A10的赔率
      for (var i = 0; i < cfg.A10.itemArr.length; i++) {
        this.A10Rebate.push(this.getSumRebate(i))
      }
      //生成全部tip
      var tipsObj = {}
      for(var i = 0;i < state.lt.config.length;i++){
        tipsObj[state.lt.config[i].mode] = state.lt.config[i].tip
      }
      this.tipsObj = tipsObj
      //生成其它返点
      var rebates = {}
      for (var i = 0; i < state.lt.Odds['K3'].length; i++) {
        rebates[state.lt.Odds['K3'][i].PlayCode] = state.lt.Odds['K3'][i].Bonus
      }
      this.rebates = rebates
      if (/^\/lottery\//.test(this.backPage)) {
        this.backPage = '/redirect?r=' + this.backPage
      }
    },
    methods:{
      clearBroadCast(){
        this.broadCastData = []
        this.available = []
      },
      changeNet(){
        this.$refs.iframe.contentWindow.destroy({func:(state)=>{
          if (state) {
            this.WifiOrFG = 'FG'
          }else{
            this.WifiOrFG = 'Wifi'
          }
          console.log(state,this.WifiOrFG)
        }})
      },
      startLoading(){
        console.log('加载动画')
        this.player = new gif.Player('#loading');
        var parser = new gif.Parser('#loading'); // 如果你需要支持 IE6+，那么必须把同样的选择器传给 Parser。
        parser.load(state.constant.ImgHost+'/live/loading.gif', videoItem=> {
        // parser.load('/static/img/loading.gif', videoItem=> {
          this.player.clearsAfterStop=true
          this.player.setVideoItem(videoItem);
          this.player.startAnimation();
        })
      },
      showCard(w){
        this.userinfoShow = !this.userinfoShow
        if (w === 1) {
          return this.userinfoBy = 'Anchor'
        }
        if (w === 2) {
          return this.userinfoBy = 'user'
        }
        return this.userinfoBy = 'help'
      },
      getSumRebate(index){
        if(!this.award || !this.award.length){
          return ''
        }

        if(index <= 3){
          return this.award ? this.award[8] : ''
        }else if(index >= 4 && index <=11){
          return this.award[index - 4]
        }else{
          return this.award[19 - index]
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
      changeShow(){
        if(document.activeElement.tagName === 'INPUT'){
          return document.activeElement.blur()
        }
        if (this.activeHide) {
          return this.activeHide = 0
        }
        if (this.show == 'main') {
          this.show = 'bet'
          return
        }
        return this.show = 'main'
      },
      toPlay(mode,witch){
        this.$store.commit('lt_changeMode', mode)
        this.playtypeShow=''
        this.slider.goToPage(witch, 0, 400)
      },
      changeMode(mode){
        this.$store.commit('lt_changeMode', mode)
      },
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children || 0
        if (!this.children) {
          return
        }
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
          click:true,
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
      },
      showHide(witch){
        if(this.activeHide){
          this.activeHide = 0
        }else{
          this.activeHide = witch
        }
        switch(witch){
          case 1:
            this.$refs.facetext.reset()
            break;
        }
      },
      giftPush(gift){
        //检验礼物是否存在并且价格是否正确
        if (gifts[gift.GiftName]) {
          if(gifts[gift.GiftName].price !== gift.GiftPrice){
            console.log('礼物价格错误')
            return
          }
        }else{
          console.log('没有这个礼物')
          return
        }
        gift.type = gift.GiftName
        this.activegift = gift
      },
      barragePush(barrage){
        let _barrage = this.$refs.barrage || 0
        if (_barrage) {
          //替换表情
          let arr = barrage.Message.match(/\[[\u4e00-\u9fa5]{1,3}\]/g) || 0
          if (arr) {
            for (var i = 0; i < arr.length; i++) {
              let ID = arr[i].replace(/\[/,'').replace(/\]/,'')
              if (this.faceData[ID] === undefined) {
                barrage.Message = barrage.Message.replace(arr[i],'')
              }else{
                barrage.Message = barrage.Message.replace(arr[i],this.faceData[ID])
              }
            }
          }
          //替换内置弹幕
          let arr2 = barrage.Message.match(/##[\d]{1,3}##/g) || 0
          if (arr2) {
            for (var i = 0; i < arr2.length; i++) {
              let ID = arr2[i].replace(/##/,'').replace(/##/,'')
              if (this.$parent.DefaultBarrage[ID] === undefined) {
                return
              }
              barrage.Message = barrage.Message.replace(arr2[i],this.$parent.DefaultBarrage[ID])
            }
          }

          _barrage.data.push(barrage)
        }
      },
      broadCastPush(json){
        for (var i = 0; i < this.broadCastData.length; i++) {
          if(this.broadCastData[i].ID === json.ID){
            return this.broadCastData[i] = json
          }
        }
        this.broadCastData.push(json)
      },
      getResults(){
        this.$store.dispatch('lt_getResults', {code:this.lcode,num:20})
      },
    },
    mounted(){

      this.startLoading()
      setTimeout(()=>{
        this.barrageShow = this.$parent.checkPermissionsLevel('Barrage')
        if(this.$parent.GameConfig.LiveBroadcastBarrage.State === 1){
          this.barrageIsOpen = 1
        }
      },1)

      this._setSliderWidth()
      setTimeout(() => {
        this._initSlider()
        if (this.autoPlay) {
          this._play()
        }
      }, 20)
      // 监听窗口大小改变时间
      this.changeSize = ()=>{
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      }
      var openlive = ()=>{
        let url = this.$parent.GameConfig.LiveWS
        if(url.search('0.0.0.0') > -1){
          this.WifiOrFG = 'FG'
          return
        }
        if(process.env.NODE_ENV !== 'production'){
          url = url.replace(/key=.+/,'')+'key=zhimakaimen'
        }
        console.log('执行开启视频')
        this.$refs.iframe.contentWindow.openlive(url,()=>{
          setTimeout(()=>{
            this.loading = 0
            this.player.stopAnimation()
            this.showFGbtn = 1
          },2000)
        })
      }
      this.$refs.iframe.contentWindow.onload = ()=>{
        openlive()
      }
      this.visibilitychange = ()=>{
        this.$refs.iframe.contentWindow.destroy({func:(state)=>{
          this.WifiOrFG = 'FG'
        },state : 1})
      }
      document.addEventListener("visibilitychange", this.visibilitychange)
    },
    watch:{
      '$parent.BroadCast'(n){
        for (var i = 0; i < n.length; i++) {
          n[i].StartTime = n[i].StartTime.replace(/-/g,'/').replace(/T/,' ').replace(/\.[\d]{0,3}/,'')
          n[i].EndTime = n[i].EndTime.replace(/-/g,'/').replace(/T/,' ').replace(/\.[\d]{0,3}/,'')
        }
        this.broadCastData = n
      },
    },
    // 生命周期destroyed销毁清除定时器，有利于内存释放
    destroyed() {
      clearTimeout(this.timer)
      clearTimeout(this.wait4Resultst)
      window.removeEventListener('resize',this.changeSize)
      document.removeEventListener("visibilitychange", this.visibilitychange)
    },
  }
</script>
<style lang="scss">
.loading canvas{
  width:100%;
  // height:28.44444em;
  transform:initial !important;
}
</style>
<style lang="scss" scoped>
@import "../../scss/dice";
.changeShow{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top:0;
  z-index: 11;
}
.loading{
  display: flex;
  justify-content: center;
  align-items: center;
  width:16rem;
}
.middleBox{
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index: 1;
  > *{
    display: flex;
    justify-content: center;
    align-items: center;
    width:16rem;
    min-height: 28.46rem;
    height: 100%;
  }
}
.iframe{
  z-index: 10;
  iframe{
    height:32rem;
    width:16rem;
    border: none;
  }
}
.FGAndWifi{
  z-index: 2;
  > div{
    width: 16rem;
    height: 100%;
    background-size: cover;
    background-position: center;
  }
}
.loadingBg{
  margin:0;
}
.g4view{

}
.g4view-bg{

}
.g4{
  position: fixed;
  z-index: 20;
  top:11em;
  right:0.3em;
  width: 2.62em;
  .btn{
    display: block;
    height: 1.8em;
    line-height: 1.8em;
    text-align: center;
    color:white;
    &:before{
      font-family: 'iconfont';
      font-size: 1.5em;
      color:#e7edec;
    }
    &.FG:before{
      content: '\e666';
    }
    &.Wifi:before{
      content: '\e667';
    }
  }
}
.testbg{
  height: 120vh;
  width: 100vw;
}
.MethodMsg{
  &:before{
    content:"\e648 ";
    font-family: 'iconfont';
    color:#d8d8d8;
  }
}
.Anchor{
  position: fixed;
  top:8em;
  right: .3em;
  width: 2.62em;
  z-index: 20;
}
.AnchorImg{
  position: absolute;
  width: 2em;
  height: 2em;
  background-size: cover !important;
  border-radius: 50%;
  margin-top: .4em;
  margin-left: .3em;
}
.AnchorBg{
  height: 3em;
  width: 3em;
  background-size: 2.6em !important;
  background-repeat: no-repeat !important;
  position: relative;
}
.toTop{
  transform: translateY(-9.6em);
  transition: .3s;
}
.toBottom{
  transform: translateY(9em);
  transition: .3s;
  opacity: 0;
}
.mainPage{
  height:100%;
}
.result{
  color:white;
  position:relative;
  top:.4em;
  left: .4em;
  display: inline-block;
  width: 11em;
  span{
    font-size:.7em;
    display:block;
    width:100%;
    line-height:1.4em;
    margin:.8em 0;
    border-right:1px solid rgba(0,0,0,.12);
  }
  i{
    display: inline-block;
    margin-left:.2em;
    font-size:.9em;
  }
}
.timebar,.oldissue{
  background:rgba(0,0,0,.25);
  display:inline-block;
}
.timebar,.oldissue{
  font-size:.68em;
  padding:0 .8em;
  height: 2.4em;
  line-height: 2.5em;
  border-radius: 1.4705em;
}
.timebar{
  position: relative;
  z-index: 25;
  em{
    display:inline;
  }
}
.oldissue{
  position: relative;
  z-index: 25;
  margin-top:.6em;
}

.DiceImg{
  display: inline-block;
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
    height:2.3em;
    line-height:2.3em;
    width:100%;
    > div{
      float:left;
      height:2.3em;
    }
    .status-con,.help{
      width:15%;
    }
    .title{
      color:white;
      width:70%;
      text-align:center;
      span{
        display: inline-block;
        border:1px solid #afa6a3;
        border-radius: 2.3em;
        font-size: .8em;
        height: 1.8em;
        padding: 0 .6em;
        line-height: 1.7em;
        &:after{
          display: inline-block;
          content:"\E61E";
          font-family: "iconfont";
          transform:scale(.7) translateX(.1em);
        }
      }
    }
  }
  .status{
    position: absolute;
    background: rgba(0,0,0,.2);
    height: 1.44em;
    width: 3.7em;
    line-height: 1.12em;
    border-radius: 0 1.44em 1.44em 0;
    margin-top:.43em;
    border:1px solid rgba(0,0,0,0);
    span{
      font-size: .56em;
      color:white;
      padding-left:.9em;
    }
  }
  //header样式结束


  .playtype{
    position:absolute;
    z-index:50;
    height:calc(100vh - 2.3em;
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
  .control{
    z-index: 25;
  }
  .control,.barrage{
    position: fixed;
    width:100%;
    left: 0;
    bottom:0;
  }
  .barrage{
    top:initial;
    bottom:2.8em;
  }
  .mainBg{
    position: fixed;
    z-index: 1;
    top:0;
    left: 0;
    right:0;
    bottom: 0;
  }
  .con-btn{
    height: 2em;
    padding:0 .24em;
    li{
      float: right;
      margin-left: .2em;
      a{
        display:block;
        width: 1.4em;
        height: 1.4em;
        line-height: 1.4em;
        text-align: center;
        background: rgba(0,0,0,0.3);
        border-radius: 50%;
        margin:0 .24em;
      }
      a:before{
        display: block;
        font-family: 'iconfont';
        color:white;
        font-size:.85em;
        transform:translateY(1px);
      }
      .back{
        &:before{
          content:'\e61b';
          transform:translateY(1px) scale(.9);
        }
      }
      .question{
        &:before{
          content:'\e617';
        }
      }
      .gift{
        &:before{
          content:'\E618';
        }
      }
      .anchor{
        &:before{
          content:'\e641';
          transform:translateY(1px) scale(1.1);
        }
      }
      .facetext{
        border-radius: .14em;
        width: 6.5em;
        text-align: left;
        padding-left: .4em;
        color: rgba(255,255,255,.8);
        line-height: 1.2em;
        &:before{
          content:'\e61a';
          display: inline;
          color: rgba(255,255,255,.8);
          font-size: .7em;
        }
        em{
          display: inline-block;
          transform:scale(.9);
          font-size: .7em;
          margin-left: .1em;
        }
      }
      &:first-child{
        a:before{
          content:'\e61b';
        }
      }
      &:last-child{
        float: left;
      }
    }
  }
  @media (min-width: 375px) {
  .con-btn{
    li{
      margin-left: .4em;
    }
  }
  }
  .newContainer{
    position:fixed;
    z-index:20;
    width:100%;
    height: 100%;
  }
  .betContainer{
    width:100%;
    height: 100%;
    overflow:hidden;
    transition:.2s;
    opacity: 0;
    position: relative;
    background: rgba(0,0,0,.4);
    pointer-events: none;
    z-index: 30;
  }
  .betContainer.bet{
    opacity: 1;
    pointer-events: initial;
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
    height: 100%;
    float:left;
    >p{
      margin:0 auto;
      margin-top: 1em;
      padding: 0 1.2em;
      color: white;
      font-size:.6em;
      width: 312px;
      text-align: left;
      white-space: normal;
    }
  }
  .buttonList{
    width:312px;
    margin:0 auto;
    font-size:26px;
    margin-top:.2em;
    >li{
      float:left;
      width:3em;
      height:2em;
      line-height: 1.55em;
      text-align:center;
      color:white;
      position:relative;
      overflow: hidden;
      &:after,span{
        position:absolute;
        width: 90%;
        height: 90%;
        left: 5%;
        top: 5%;
      }
      span{
        position:absolute;
        z-index:20;
        border:1px solid rgba(175, 166, 163,1);
        border-radius: .12em;
        em{
          height: .8em;
          i{
            font-size:.71em;
          }

        }
        p{
          font-size: .41em;
          line-height: .8em;
          display: none;
        }
      }
    }
    .curr{
      color:#f4c829;
      span{
        border:1px solid #f4c829;
      }
    }
  }
  .betbox.A10{
    .buttonList{
      li{
        line-height: 1em;
        span{
          p{
            display: block;
          }
        }
      }
    }
  }
  .betbox.B10,.betbox.E10{
    .buttonList{
      li{
        width:100%;
      }
      span{
        em{
        }
      }
      .curr{
        span{
          em{
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
        }
      }
    }
  }
  .bgnone{
    &:after{
      background:rgba(0,0,0,.4) !important;
    }
  }
  .betbox.A10,.betbox.D10,.betbox.F10,.betbox.G10,.betbox.H10{
    .MethodMsg{
      padding:0 0.4em;
    }
  }
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
  .hideCon{
    position:fixed;
    top: 100%;
    width:100%;
    left:0;
    >div{
      position:absolute;
      transform: translateY(12em);
    }
  }
  .facetext.ined,.giving.ined{
    transform:translateY(-12em);
  }
</style>
