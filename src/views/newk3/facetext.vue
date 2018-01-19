<template>
	<div class="facetext" :class="{keyboard:keyboard}">
    <div class="title" :class="{tobottom:!sysSpeak}">
      <div class="type">
        <span @click="changeBarrage" :class="{open:$parent.barrageIsOpen}">
          <em>弹</em>
        </span>
      </div>
      <div class="content">
        <input type="text" ref="content" :maxlength="inputLength" @focus="inputFocus" @blur="inputBlur" @keydown="inputDown($event)" @keyup="inputUp($event)" :placeholder="(showDefaultText  && !faceortext)?'点击输入可自由发言':'请选择您要发送的表情'" v-model="content">
        <!-- <div class="testing" @focus="contentFocus" @blur="contentBlur" @keyup="keyup($event)" @keydown="limitLength($event)" ref="content">
        </div> -->
        <div v-show="sysSpeak" class="faceortext" :class="{text:faceortext,face:!faceortext}" @click.stop="changeFaceText">
          <i class="iconfont">{{faceortext?'&#xe615;':'&#xe616;'}}</i>
        </div>
      </div>
      <div class="btn" :class="{curr:(content.length>0 || sendIsActive)}" @click="send">发布<template v-if="sending">中</template></div>
    </div>
    <div class="desktop" :class="{tobottom:!sysSpeak}">
      <div ref="text" class="facetext-text" v-show="sysSpeak && !faceortext">
        <ul class="fix">
          <li v-for="(v,k) in textData" :class="{curr:v===selectText}" @click.stop="pushContent(v,1,k)"><em>{{v}}</em></li>
        </ul>
      </div>
      <div ref="face" class="facetext-face" v-show="sysSpeak">
        <ul class="fix">
          <li v-for="(v,k) in faceData" @click.stop="pushContent(v,0,k)">{{v}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
	export default {
		data:()=>{
			return {
				face:null,
				text:null,
        faceortext:false,                   //默认表情true
        faceData:null,
        textData:null,
        content:'',
        lastTime:0,
        checkText:0,
        checkFace:[],
        sysSpeak:1,//是否有内置弹幕的权限
        barrageIsOpen:0,//弹幕是否有权限
        showDefaultText:1,
        selectText:null,
        sendIsActive:0,
        textOrDefault:'text',
        keyboard:0,
        inputLength:null,
        sending:0,
			}
		},
    created(){
      this.faceData = this.$parent.faceData
      this.textData = this.$parent.textData
      //权限检查
      setTimeout(()=>{
        //检查系统弹幕的权限
        if(this.$parent.$parent.checkPermissionsLevel('SysSpeak') === -1){
          this.sysSpeak = 0
        }
        if(this.$parent.$parent.checkPermissionsLevel('Barrage') !== -1){
          this.barrageIsOpen = 1
        }
      },50)
    },
		mounted(){
      this.face = new BScroll(this.$refs.face,{click:true})
      this.text = new BScroll(this.$refs.text,{click:true})
      setTimeout(()=>{
        this.inputLength = this.$parent.$parent.GameConfig.LiveBroadcastFreedomSpeak.Length
      },10)
		},
		methods:{
      inputDown(e){
        if (e.key === 'Backspace') {
          //删除输入框的功能
          var position = this.getPositionForInput(this.$refs.content)
          var _content = this.content.substring(0,position)
          var res = _content.match(/\[[\u4e00-\u9fa5]{0,3}\]$/) || 0
          if(res){
            _content = _content.replace(/\[[\u4e00-\u9fa5]{0,3}\]$/,'')
            this.content = _content + this.content.substring(position,this.content.length)
            e.preventDefault()
            setTimeout(()=>{
              this.setCursorPosition(this.$refs.content,_content.length)
            },1)
            
          }
        }
      },
      inputUp(e){
        if (e.key === 'Backspace') {
          //删除输入框的功能
        }
      },
      inputFocus(){
        this.textOrDefault = 'text'
        this.selectText = null
        this.keyboard = 1
      },
      inputBlur(){
        this.keyboard = 0
      },
      keyup(e){
        if (this.content.length>0) {
          this.showDefaultText = 0
          return this.sendIsActive = 1
        }
        this.sendIsActive = 0
        this.showDefaultText = 1
      },
      limitLength(e){
        var length = this.content.length
        let key = parseInt(e.key)
        if(length >= 20 && e.key !=="Enter" && e.key !=="Backspace"){
          e.preventDefault()
        }
      },
      getCount(){
        //检测已存在的表情有多少个
        var _content = this.content
        var face = 0
        var allFaceLength = 0
        var keys = _content.match(/\[[\u4e00-\u9fa5]{0,3}\]/g) || []
        for (var y = 0; y < keys.length; y++) {
          let key = keys[y].replace('[','').replace(']','')
          if(this.faceData[key]){
            face++
            _content = _content.replace(keys[y],'a')
            allFaceLength+=keys[y].length
          }
        }
        this.inputLength = allFaceLength+(_content.length - face)+(this.$parent.$parent.GameConfig.LiveBroadcastFreedomSpeak.Length - (face + (_content.length - face)))
        return [_content.length,face]
      },
			pushContent(d,type,i){
        var length = this.$parent.$parent.GameConfig.LiveBroadcastFreedomSpeak.Length
        document.activeElement.blur()
				if (!type) {
          this.showDefaultText = 0
          if (this.getCount()[0]<length) {
            this.inputLength = this.inputLength + `[${i}]`.length - 1
            this.content += `[${i}]`
          }else{
            layer.alert(`为防止遮盖，仅限输入${length}个字符`)
          }
          if(this.checkFace.indexOf(i) === -1){
            this.checkFace.push(i)
          }
				}else{
          if (this.selectText === d) {
            this.selectText = null
            this.sendIsActive = 0
            return
          }
          this.selectText = d
          this.checkText = i
          this.textOrDefault = 'default'
				}
        this.sendIsActive = 1
			},
			changeFaceText(){
				this.faceortext = !this.faceortext
				// this.$refs.content.innerText = ''
        this.checkText = 0
        this.sendIsActive = 0
        this.selectText = null
        this.showDefaultText = 1
			},
      checkPermissions(content){
        let freedomSpeakArr = this.$parent.$parent.GameConfig.LiveBroadcastFreedomSpeak
        if (content.length <= 0) {
          return [0,'请输入您要发表的弹幕！']
        }
        if (content.length > freedomSpeakArr.Length) {
          //替换表情的长度
          var temp = content.replace(/\[[\u4e00-\u9fa5]{0,3}\]/g,'a')
          if (temp.length > freedomSpeakArr.Length) {
            //验证是否内置弹幕
            if(!/^##[\d]{1,3}##$/.test(content)){
              return [0,'您最长能发表'+freedomSpeakArr.Length+'个字！']
            }
          }
        }
        if(this.$parent.$parent.checkPermissionsLevel('FreedomSpeak') === -1){
          return [0,'您当前的等级无法发表弹幕！']
        }
        let time = new Date().getTime() - this.lastTime
        let barrage =  this.$parent.$parent.GameConfig.LiveBroadcastBarrage
        if (this.lastTime !== 0 && time < barrage.Interval*1000) {
          return [0,barrage.Interval+'秒内只能发送一次弹幕！']
        }
        if (!/^[\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5|.|,!\[\]]{0,999}$/.test(content.replace(/##[\d]{1,3}##/g,'').replace(/\[\[[\d]{1,3}\]\]/g,''))) {
          return [0,'只能发送中文字符！']
        }
        return [1]
      },
			send(){
        var content = null
        if (this.faceortext) {
          content = this.content
        }else{
          if (this.textOrDefault === 'default') {
            content = this.selectText
          }else{
            content = this.content
            console.log(content)
          }
        }
        //默认弹幕改为ID
        content = content.replace(this.textData[this.checkText],`##${this.checkText}##`)
        // for (var i = 0; i < this.checkFace.length; i++) {
        //   content = content.replace(new RegExp(this.faceData[this.checkFace[i]],'g'),`[[${this.checkFace[i]}]]`)
        // }
        //权限检测
        let permissions = this.checkPermissions(content)
        if (!permissions[0]) {
          return layer.msgWarn(permissions[1])
        }
        if (this.sending === 1) {
          return
        }
        this.sending = 1
        _fetch({
          Action:'SendBarrage',
          GameID:this.$parent.$parent.lcode,
          Barrage:content,
        })
        .then(d=>{
          this.sending = 0
          if (d.Code === 1) {
            this.content = ''
            this.lastTime = new Date().getTime()
            this.checkFace = []
            this.checkText = 0
            this.selectText = null
            this.showDefaultText = 1
            this.sendIsActive = 0
          }else{
            layer.msgWarn(d.StrCode)
          }
        })
			},
      changeBarrage(){
        if (this.barrageIsOpen) {
          this.$parent.barrageIsOpen = !this.$parent.barrageIsOpen
        }else{
          layer.msgWarn('您当前的等级无法打开弹幕！')
        }
      },

      //获取光标位置
      getPositionForInput(ctrl) {
        var CaretPos = 0;
        if (document.selection) { // IE Support 
            ctrl.focus();
            var Sel = document.selection.createRange();
            Sel.moveStart('character', -ctrl.value.length);
            CaretPos = Sel.text.length;
        } else if (ctrl.selectionStart || ctrl.selectionStart == '0') { // Firefox support 
            CaretPos = ctrl.selectionStart;
        }
        return (CaretPos);
      },
      //设置光标位置函数 
      setCursorPosition(ctrl, pos) {
        if (ctrl.setSelectionRange) {
          ctrl.focus();
          ctrl.setSelectionRange(pos, pos);
        } else if (ctrl.createTextRange) {
          var range = ctrl.createTextRange();
          range.collapse(true);
          range.moveEnd('character', pos);
          range.moveStart('character', pos);
          range.select();
        }
      },
		},
    watch:{
      'content'(n){
        var a,b
        [a,b] = this.getCount()
        // console.log(a,b)
      },
    },
	}
</script>
<style lang="scss" scoped>
.content{
  .testing{
    width:calc(16rem - 3.4em - 4.25em - 1em);
    overflow: hidden;
  }
  input{
    border: none;
    width: calc(100% - 2.6em);
    font-size: .7em;
    color:#333;
    padding:0 .2em;
    outline: none;
  }
}
.keyboard{
  transform:translateY(-8em) !important;
}
.facetext{
  height:12em;
  transition:.2s;
  width:100%;
  pointer-events: none;
  .title{
    display:table;
    width:100%;
    border-bottom:1px solid #d4d4d4;
    pointer-events: initial;
    >div{
      display:table-cell;
    }
    .type,.content,.btn{
      height:2.4em;
      line-height:2.4em;
    }
    .type{
      width:3.4em;
      background:#fdfdfd;
      text-align:center;
      position:relative;
      span{
        display:inline-block;
        text-align:center;
        background:#d1d0cc;
        border-radius:.8em;
        width: 2.4em;
        height: 1.4em;
        transform: translateY(.5em);
        transition: .2s;
        &:after{
          content:'';
          display:block;
          position:absolute;
          top:-.1em;
          right:-.5em;
          height:1.6em;
          width:1px;
          background:#d1d0cc;
        }
      }
      span.open{
        background:#ef4b52;
        em{
          transform:translate(0.7em, -0.9em);
          color:#ef4b52;
        }
      }
      em{
        transition: .2s;
        display: inline-block;
        line-height: 1.5em;
        transform: translate(-0.72em,-.9em);
        font-size: .7em;
        color: #b9b8b4;
        background: #fdfdfd;
        border-radius: 0.75em;
        width: 1.5em;
        height: 1.5em;
        box-shadow: -1px 1px 4px rgba(0,0,0,.45);
      }
    }
    .content{
      background:#fdfdfd;
      position:relative;
      vertical-align: top;
    }
    .faceortext{
      position:absolute;
      top:0;
      right:0;
      width:1.4em;
      font-size:1.3em;
      line-height: 1.9em;
      color:#888;
    }
    .btn{
      width:4.25em;
      text-align:center;
      font-size:.8em;
      color:white;
      background: #ccc;
      line-height: 2.2em;
    }
    .curr{
      background:#ee4a52;
      &:active{
        background:red;
      }
    }
  }
  .desktop{
    height:9.6em;
    background:#fdfdfd;
    pointer-events: initial;
  }
}
.facetext-face,.facetext-text{
  height:100%;
  overflow: hidden;
  ul{
    padding:.3em .5em;
    li{
      float:left;
    }
  }
}
.facetext-face{
  ul{
    li{
      width:14.2857%;
      text-align:center;
      font-size:1.4em;
      height: 1.4em;
      line-height: 1.4em;
    }
  }
}
.facetext-text{
  ul{
    text-align: center;
    li{
      display: inline-block;
      white-space:nowrap;
      margin:.2em 0;
      float: initial;
      padding:0 .2em;
      em{
        font-size:.7em;
        background:#f0f0f0;
        color:#666;
        display: inline-block;
        border-radius: 1em;
        padding:.2em .7em;
        max-width: 98%;
        &:active{
          color:#ee575d;
        }
      }
    }
  }
  .curr{
    em{
      background:#ee4a52;
      color:white;
    }
  }
}
.tobottom{
  transform:translateY(9.6em);
  pointer-events: initial;
}
</style>