<template>
	<div class="facetext">
    <div class="title" :class="{tobottom:!sysSpeak}">
      <div class="type">
        <span @click="changeBarrage" :class="{open:$parent.barrageIsOpen}">
          <em>弹</em>
        </span>
      </div>
      <div class="content">
        <div class="testing" contenteditable="true" v-html="defaultContent" ref="content"></div>
        <div v-show="sysSpeak" class="faceortext" :class="{text:faceortext,face:!faceortext}" @click.stop="changeFaceText">
          <i class="iconfont">{{faceortext?'&#xe615;':'&#xe616;'}}</i>
        </div>
      </div>
      <div class="btn" @click="send">发送</div>
    </div>
    <div class="desktop" :class="{tobottom:!sysSpeak}">
      <div ref="text" class="facetext-text" v-show="sysSpeak && !faceortext">
        <ul class="fix">
          <li v-for="(d,i) in textData" @click.stop="pushContent(d,1,i)"><em>{{d.Content}}</em></li>
        </ul>
      </div>
      <div ref="face" class="facetext-face" v-show="sysSpeak">
        <ul class="fix">
          <li v-for="(v,k,i) in faceData" @click.stop="pushContent(v,0,k)">{{v}}</li>
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
        faceData:[],
        textData:[
          {Content:'买定离手',ID:1},
          {Content:'稳住，我们能赢',ID:2},
          {Content:'登顶盈利榜',ID:3},
          {Content:'这把一定中',ID:4},
          {Content:'中中中',ID:5},
          {Content:'大大大',ID:6},
          {Content:'小小小',ID:7},
          {Content:'单单单',ID:8},
          {Content:'双双双',ID:9},
          {Content:'豹子 豹子',ID:10},
          {Content:'天灵灵地灵灵 这把一定赢',ID:11},
          {Content:'吓得直哆嗦',ID:12},
          {Content:'赢钱娶老婆',ID:13},
          {Content:'赢钱就去～',ID:14},
          {Content:'我要打赏',ID:15}
        ],
        content:'',
        lastTime:0,
        checkText:0,
        checkFace:[],
        sysSpeak:1,//是否有内置弹幕的权限
        barrageIsOpen:0//弹幕是否有权限
			}
		},
    created(){
      this.faceData = this.$parent.faceData
      setTimeout(()=>{
        //检查系统弹幕的权限
        if(this.$parent.$parent.checkPermissionsLevel('SysSpeak') === -1){
          this.sysSpeak = 0
        }
        if(this.$parent.checkPermissionsLevel('Barrage') !== -1){
          this.barrageIsOpen = 1
        }
      },50)
    },
		mounted(){
      this.face = new BScroll(this.$refs.face,{click:true})
      this.text = new BScroll(this.$refs.text,{click:true})
		},
		methods:{
			pushContent(d,type,i){
				if (!type) {
					this.$refs.content.innerHTML += d
          if(this.checkFace.indexOf(i) === -1){
            this.checkFace.push(i)
          }
				}else{
					this.$refs.content.innerHTML = d.Content
          this.checkText = i
				}
			},
			changeFaceText(){
				this.faceortext = !this.faceortext
				this.$refs.content.innerHTML = ''
			},
      checkPermissions(){
        let freedomSpeakArr = this.$parent.$parent.GameConfig.LiveBroadcastFreedomSpeak
        if (this.$refs.content.innerHTML.length <= 0) {
          return [0,'请输入您要发表的弹幕！']
        }
        if (this.$refs.content.innerHTML.length > freedomSpeakArr.Length) {
          return [0,'您最长能发表'+freedomSpeakArr.Length+'个字！']
        }
        if(this.$parent.$parent.checkPermissionsLevel('FreedomSpeak') === -1){
          return [0,'您当前的等级无法发表弹幕！']
        }
        let time = new Date().getTime() - this.lastTime
        let barrage =  this.$parent.$parent.GameConfig.LiveBroadcastBarrage
        if (this.lastTime !== 0 && time < barrage.Interval*1000) {
          return [0,barrage.Interval+'秒内只能发送一次弹幕！']
        }
        return [1]
      },
			send(){
        let content = this.$refs.content.innerHTML
        //权限检测
        let permissions = this.checkPermissions()
        if (!permissions[0]) {
          return layer.msgWarn(permissions[1])
        }
        //默认弹幕改为ID
        content = content.replace(this.textData[this.checkText].Content,`##${this.textData[this.checkText].ID}##`)
        for (var i = 0; i < this.checkFace.length; i++) {
          content = content.replace(new RegExp(this.faceData[this.checkFace[i]],'g'),`[[${this.checkFace[i]}]]`)
        }

        _fetch({
          Action:'SendBarrage',
          GameID:this.$parent.$parent.lcode,
          Barrage:content,
        })
        .then(d=>{
          if (d.Code === 1) {
            this.$refs.content.innerHTML = ''
            this.lastTime = new Date().getTime()
            this.checkFace = []
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
      }
		}
	}
</script>
<style lang="scss" scoped>
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
    }
    .testing{
      position:absolute;
      width:calc(100% - 3em);
      padding:.3em .4em;
      font-size:.7em;
      height:3.4285em;
      overflow: auto;
      line-height: 1.5em;
      -webkit-user-select: auto;
      user-select: auto;
      padding-top:1em;
      outline: none;
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
      background:#ee4a52;
      text-align:center;
      font-size:.8em;
      color:white;
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
    li{
      width:50%;
      white-space:nowrap;
      text-overflow:ellipsis;
      overflow: hidden;
      margin:.2em 0;
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
}
.tobottom{
  transform:translateY(9.6em);
  pointer-events: initial;
}
</style>