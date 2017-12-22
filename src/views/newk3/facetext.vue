<template>
	<div class="facetext">
    <div class="title">
      <div class="type">
        <span @click="$parent.barrageIsOpen = !$parent.barrageIsOpen" :class="{open:$parent.barrageIsOpen}">
          <em>弹</em>
        </span>
      </div>
      <div class="content">
        <div class="testing" contenteditable="true" v-html="defaultContent" ref="content"></div>
        <div class="faceortext" :class="{text:faceortext,face:!faceortext}" @click.stop="changeFaceText">
          <i class="iconfont">{{faceortext?'&#xe615;':'&#xe616;'}}</i>
        </div>
      </div>
      <div class="btn" @click="send">发送</div>
    </div>
    <div class="desktop">
      <div ref="face" class="facetext-face" v-show="faceortext">
        <ul class="fix">
          <li v-for="d in faceData" @click.stop="pushContent(d,0)">{{d}}</li>
        </ul>
      </div>
      <div ref="text" class="facetext-text">
        <ul class="fix">
          <li v-for="d in textData" @click.stop="pushContent(d,1)"><em>{{d}}</em></li>
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
        faceortext:true,                   //默认表情true
        faceData:['😀','😁','😂','😄','😅','😆','😇','😉','😊','😋','😌','😍','😘','😙','😜','😝','😎','😏','😶','😑','😒','😳','😞','😟','😠','😡','😔','😕','😣','😖','😫','😤','😮','😱','😨','😰'],
        textData:[
          '买定离手',
          '稳住，我们能赢',
          '登顶盈利榜',
          '这把一定中',
          '中中中',
          '大大大',
          '小小小',
          '单单单',
          '双双双',
          '豹子 豹子',
          '天灵灵地灵灵 这把一定赢',
          '吓得直哆嗦',
          '赢钱娶老婆',
          '赢钱就去～',
          '我要打赏',
        ],
        content:'',
        lastTime:0,
			}
		},
		mounted(){
      this.face = new BScroll(this.$refs.face,{click:true})
      this.text = new BScroll(this.$refs.text,{click:true})
		},
		methods:{
			pushContent(msg,type){
				if (!type) {
					this.$refs.content.innerHTML += msg
				}else{
					this.$refs.content.innerHTML = msg
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
        if (this.lastTime !== 0 && time < freedomSpeakArr.Interval*1000) {
          return [0,freedomSpeakArr.Interval+'秒内只能发送一次弹幕！']
        }
        return [1]
      },
			send(){
        let permissions = this.checkPermissions()
        if (!permissions[0]) {
          return layer.msgWarn(permissions[1])
        }
        layer.alert('已发送！')
        _fetch({
          Action:'SendBarrage',
          GameID:'0101',
          Barrage:this.$refs.content.innerHTML,
        })
        .then(d=>{
          if (d.Code === 1) {
            this.$refs.content.innerHTML = ''
            this.lastTime = new Date().getTime()
          }else{
            layer.msgWarn(d.StrCode)
          }
        })
			},
		}
	}
</script>
<style lang="scss" scoped>
.facetext{
  height:12em;
  transition:.2s;
  width:100%;
  .title{
    display:table;
    width:100%;
    border-bottom:1px solid #d4d4d4;
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
</style>