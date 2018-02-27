<template>
	<div class="facetext" :class="{keyboard:keyboard}">
    <div class="title">
      <div class="type">
        <span @click="changeBarrage" :class="{open:$parent.barrageIsOpen}">
          <em>弹</em>
        </span>
      </div>
      <div class="content">
        <input type="text" ref="content" :maxlength="inputLength" @focus="inputFocus" @blur="inputBlur" @keydown="inputDown($event)" @keyup="inputUp($event)" :placeholder="(showDefaultText  && !faceortext)?'点击输入可自由发言':'请选择您要发送的表情'" v-model="content">
        <div class="faceortext" :class="{text:faceortext,face:!faceortext}" @click.stop="changeFaceText">
          <i class="iconfont">{{faceortext?'&#xe615;':'&#xe616;'}}</i>
        </div>
      </div>
      <div class="btn" :class="{curr:(content.length>0 || sendIsActive)}" @click="send">发布</div>
    </div>
    <div class="desktop">
      <div ref="text" class="facetext-text" v-show="!faceortext">
        <ul class="fix">
          <li v-for="(v,k) in textData" :class="{curr:v.Content===selectText}" @click.stop="pushContent(v.Content,1,v.ID)"><em>{{v.Content}}</em></li>
        </ul>
      </div>
      <div ref="face" class="facetext-face">
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
        showDefaultText:1,
        selectText:null,
        sendIsActive:0,
        textOrDefault:'text',
        keyboard:0,
        inputLength:null,
			}
		},
		mounted(){
      this.faceData = this.$parent.faceData
      this.$nextTick(() => {
        setTimeout(()=>{
          if(this.$parent.$parent.checkPermissionsLevel('SysSpeak') === -1){
            this.sysSpeak = 0
          }
          this.textData = this.$parent.$parent.RandomBarrage
          this.inputLength = this.$parent.$parent.GameConfig.LiveBroadcastFreedomSpeak.Length
          this.face = new BScroll(this.$refs.face,{click:true})
        },1)
        setTimeout(()=>{
          this.text = new BScroll(this.$refs.text,{click:true})
        },100)
      })
		},
		methods:{
      reset(){
        this.face.refresh()
        this.text.refresh()
      },
      inputDown(e){
        if (e.key === 'Backspace') {
          //删除输入框的功能
          var position = this.getPositionForInput(this.$refs.content)
          var _content = this.content.substring(0,position)
          var res = _content.match(/\[[\u4e00-\u9fa5]{1,3}\]$/) || 0
          if(res){
            _content = _content.replace(/\[[\u4e00-\u9fa5]{1,3}\]$/,'')
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
        if(this.$parent.$parent.checkPermissionsLevel('SysSpeak') > -1){
          this.keyboard = 1
        }
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
        var keys = _content.match(/\[[\u4e00-\u9fa5]{1,3}\]/g) || []
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
        console.log(i)
        var length = this.$parent.$parent.GameConfig.LiveBroadcastFreedomSpeak.Length
        document.activeElement.blur()
				if (!type) {
          this.showDefaultText = 0
          if (this.getCount()[0]<length) {
            this.inputLength = this.inputLength + `[${i}]`.length - 1
            this.content += `[${i}]`
          }else{
            layer.alert(`为防止遮挡，仅限输入${length}个字符`)
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
        if(/^##[\d]{1,3}##$/.test(content)){
          if (!this.sysSpeak) {
            return [0,'您当前的等级无法发送系统弹幕！']
          }
        }else{
          if(this.$parent.$parent.checkPermissionsLevel('FreedomSpeak') === -1){
            return [0,'您当前的等级无法自由发言！']
          }
          var reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5|,|.|!|?]/
          if(reg.test(content)){
            return [0,'自由发言不能包含标点符号']
          }
        }
        if (content.length <= 0) {
          return [0,'请输入您要发布的弹幕！']
        }
        if (content.length > freedomSpeakArr.Length) {
          //替换表情的长度
          var temp = content.replace(/\[[\u4e00-\u9fa5]{0,3}\]/g,'a')
          if (temp.length > freedomSpeakArr.Length) {
            //验证是否内置弹幕
            console.log(content)
            if(!/^##[\d]{1,3}##$/.test(content)){
              return [0,'您最长能发布'+freedomSpeakArr.Length+'个字！']
            }
          }
        }
        if(this.$parent.$parent.checkPermissionsLevel('Barrage') === -1){
          return [0,'您当前的等级已关闭弹幕功能！']
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
        var content = ''
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
        console.log(this.checkText)
        content = content.replace(this.$parent.$parent.DefaultBarrage[this.checkText],`##${this.checkText}##`)
        var contentFace = content.match(/\[[\u4e00-\u9fa5]{1,3}\]$/g) || 0
        for (var i = 0; i < contentFace.length; i++) {
          if(this.faceData[contentFace[i].replace('[','').replace(']','')] === undefined){
            content = content.replace(contentFace[i],'')
            this.content = content
          }
        }
        //权限检测
        let permissions = this.checkPermissions(content)
        if (!permissions[0]) {
          return layer.msgWarn(permissions[1])
        }
        this.$parent.barrageIsOpen = 1
        content = this.Simplized(content)
        this.$parent.activeHide = 0
        _fetch({
          Action:'SendBarrage',
          GameID:this.$parent.$parent.lcode,
          Barrage:content,
        })
        .then(d=>{
          if (d.Code === 1) {
            this.content = ''
            this.lastTime = new Date().getTime()
            this.checkFace = []
            this.checkText = 0
            this.selectText = ''
            this.showDefaultText = 1
            this.sendIsActive = 0
          }else{
            layer.msgWarn(d.StrCode)
          }
        })
			},
      changeBarrage(){
        this.$parent.barrageIsOpen = !this.$parent.barrageIsOpen
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
      JTPYStr(){
        return '皑蔼碍爱翱袄奥坝罢摆败颁办绊帮绑镑谤剥饱宝报鲍辈贝钡狈备惫绷笔毕毙闭边编贬变辩辫鳖瘪濒滨宾摈饼拨钵铂驳卜补参蚕残惭惨灿苍舱仓沧厕侧册测层诧搀掺蝉馋谗缠铲产阐颤场尝长偿肠厂畅钞车彻尘陈衬撑称惩诚骋痴迟驰耻齿炽冲虫宠畴踌筹绸丑橱厨锄雏础储触处传疮闯创锤纯绰辞词赐聪葱囱从丛凑窜错达带贷担单郸掸胆惮诞弹当挡党荡档捣岛祷导盗灯邓敌涤递缔点垫电淀钓调迭谍叠钉顶锭订东动栋冻斗犊独读赌镀锻断缎兑队对吨顿钝夺鹅额讹恶饿儿尔饵贰发罚阀珐矾钒烦范贩饭访纺飞废费纷坟奋愤粪丰枫锋风疯冯缝讽凤肤辐抚辅赋复负讣妇缚该钙盖干赶秆赣冈刚钢纲岗皋镐搁鸽阁铬个给龚宫巩贡钩沟构购够蛊顾剐关观馆惯贯广规硅归龟闺轨诡柜贵刽辊滚锅国过骇韩汉阂鹤贺横轰鸿红后壶护沪户哗华画划话怀坏欢环还缓换唤痪焕涣黄谎挥辉毁贿秽会烩汇讳诲绘荤浑伙获货祸击机积饥讥鸡绩缉极辑级挤几蓟剂济计记际继纪夹荚颊贾钾价驾歼监坚笺间艰缄茧检碱硷拣捡简俭减荐槛鉴践贱见键舰剑饯渐溅涧浆蒋桨奖讲酱胶浇骄娇搅铰矫侥脚饺缴绞轿较秸阶节茎惊经颈静镜径痉竞净纠厩旧驹举据锯惧剧鹃绢杰洁结诫届紧锦仅谨进晋烬尽劲荆觉决诀绝钧军骏开凯颗壳课垦恳抠库裤夸块侩宽矿旷况亏岿窥馈溃扩阔蜡腊莱来赖蓝栏拦篮阑兰澜谰揽览懒缆烂滥捞劳涝乐镭垒类泪篱离里鲤礼丽厉励砾历沥隶俩联莲连镰怜涟帘敛脸链恋炼练粮凉两辆谅疗辽镣猎临邻鳞凛赁龄铃凌灵岭领馏刘龙聋咙笼垄拢陇楼娄搂篓芦卢颅庐炉掳卤虏鲁赂禄录陆驴吕铝侣屡缕虑滤绿峦挛孪滦乱抡轮伦仑沦纶论萝罗逻锣箩骡骆络妈玛码蚂马骂吗买麦卖迈脉瞒馒蛮满谩猫锚铆贸么霉没镁门闷们锰梦谜弥觅绵缅庙灭悯闽鸣铭谬谋亩钠纳难挠脑恼闹馁腻撵捻酿鸟聂啮镊镍柠狞宁拧泞钮纽脓浓农疟诺欧鸥殴呕沤盘庞国爱赔喷鹏骗飘频贫苹凭评泼颇扑铺朴谱脐齐骑岂启气弃讫牵扦钎铅迁签谦钱钳潜浅谴堑枪呛墙蔷强抢锹桥乔侨翘窍窃钦亲轻氢倾顷请庆琼穷趋区躯驱龋颧权劝却鹊让饶扰绕热韧认纫荣绒软锐闰润洒萨鳃赛伞丧骚扫涩杀纱筛晒闪陕赡缮伤赏烧绍赊摄慑设绅审婶肾渗声绳胜圣师狮湿诗尸时蚀实识驶势释饰视试寿兽枢输书赎属术树竖数帅双谁税顺说硕烁丝饲耸怂颂讼诵擞苏诉肃虽绥岁孙损笋缩琐锁獭挞抬摊贪瘫滩坛谭谈叹汤烫涛绦腾誊锑题体屉条贴铁厅听烃铜统头图涂团颓蜕脱鸵驮驼椭洼袜弯湾顽万网韦违围为潍维苇伟伪纬谓卫温闻纹稳问瓮挝蜗涡窝呜钨乌诬无芜吴坞雾务误锡牺袭习铣戏细虾辖峡侠狭厦锨鲜纤咸贤衔闲显险现献县馅羡宪线厢镶乡详响项萧销晓啸蝎协挟携胁谐写泻谢锌衅兴汹锈绣虚嘘须许绪续轩悬选癣绚学勋询寻驯训讯逊压鸦鸭哑亚讶阉烟盐严颜阎艳厌砚彦谚验鸯杨扬疡阳痒养样瑶摇尧遥窑谣药爷页业叶医铱颐遗仪彝蚁艺亿忆义诣议谊译异绎荫阴银饮樱婴鹰应缨莹萤营荧蝇颖哟拥佣痈踊咏涌优忧邮铀犹游诱舆鱼渔娱与屿语吁御狱誉预驭鸳渊辕园员圆缘远愿约跃钥岳粤悦阅云郧匀陨运蕴酝晕韵杂灾载攒暂赞赃脏凿枣灶责择则泽贼赠扎札轧铡闸诈斋债毡盏斩辗崭栈战绽张涨帐账胀赵蛰辙锗这贞针侦诊镇阵挣睁狰帧郑证织职执纸挚掷帜质钟终种肿众诌轴皱昼骤猪诸诛烛瞩嘱贮铸筑驻专砖转赚桩庄装妆壮状锥赘坠缀谆浊兹资渍踪综总纵邹诅组钻致钟么为只凶准启板里雳余链泄';
      },
      FTPYStr(){
        return '皚藹礙愛翺襖奧壩罷擺敗頒辦絆幫綁鎊謗剝飽寶報鮑輩貝鋇狽備憊繃筆畢斃閉邊編貶變辯辮鼈癟瀕濱賓擯餅撥缽鉑駁蔔補參蠶殘慚慘燦蒼艙倉滄廁側冊測層詫攙摻蟬饞讒纏鏟産闡顫場嘗長償腸廠暢鈔車徹塵陳襯撐稱懲誠騁癡遲馳恥齒熾沖蟲寵疇躊籌綢醜櫥廚鋤雛礎儲觸處傳瘡闖創錘純綽辭詞賜聰蔥囪從叢湊竄錯達帶貸擔單鄲撣膽憚誕彈當擋黨蕩檔搗島禱導盜燈鄧敵滌遞締點墊電澱釣調叠諜疊釘頂錠訂東動棟凍鬥犢獨讀賭鍍鍛斷緞兌隊對噸頓鈍奪鵝額訛惡餓兒爾餌貳發罰閥琺礬釩煩範販飯訪紡飛廢費紛墳奮憤糞豐楓鋒風瘋馮縫諷鳳膚輻撫輔賦複負訃婦縛該鈣蓋幹趕稈贛岡剛鋼綱崗臯鎬擱鴿閣鉻個給龔宮鞏貢鈎溝構購夠蠱顧剮關觀館慣貫廣規矽歸龜閨軌詭櫃貴劊輥滾鍋國過駭韓漢閡鶴賀橫轟鴻紅後壺護滬戶嘩華畫劃話懷壞歡環還緩換喚瘓煥渙黃謊揮輝毀賄穢會燴彙諱誨繪葷渾夥獲貨禍擊機積饑譏雞績緝極輯級擠幾薊劑濟計記際繼紀夾莢頰賈鉀價駕殲監堅箋間艱緘繭檢堿鹼揀撿簡儉減薦檻鑒踐賤見鍵艦劍餞漸濺澗漿蔣槳獎講醬膠澆驕嬌攪鉸矯僥腳餃繳絞轎較稭階節莖驚經頸靜鏡徑痙競淨糾廄舊駒舉據鋸懼劇鵑絹傑潔結誡屆緊錦僅謹進晉燼盡勁荊覺決訣絕鈞軍駿開凱顆殼課墾懇摳庫褲誇塊儈寬礦曠況虧巋窺饋潰擴闊蠟臘萊來賴藍欄攔籃闌蘭瀾讕攬覽懶纜爛濫撈勞澇樂鐳壘類淚籬離裏鯉禮麗厲勵礫曆瀝隸倆聯蓮連鐮憐漣簾斂臉鏈戀煉練糧涼兩輛諒療遼鐐獵臨鄰鱗凜賃齡鈴淩靈嶺領餾劉龍聾嚨籠壟攏隴樓婁摟簍蘆盧顱廬爐擄鹵虜魯賂祿錄陸驢呂鋁侶屢縷慮濾綠巒攣孿灤亂掄輪倫侖淪綸論蘿羅邏鑼籮騾駱絡媽瑪碼螞馬罵嗎買麥賣邁脈瞞饅蠻滿謾貓錨鉚貿麽黴沒鎂門悶們錳夢謎彌覓綿緬廟滅憫閩鳴銘謬謀畝鈉納難撓腦惱鬧餒膩攆撚釀鳥聶齧鑷鎳檸獰甯擰濘鈕紐膿濃農瘧諾歐鷗毆嘔漚盤龐國愛賠噴鵬騙飄頻貧蘋憑評潑頗撲鋪樸譜臍齊騎豈啓氣棄訖牽扡釺鉛遷簽謙錢鉗潛淺譴塹槍嗆牆薔強搶鍬橋喬僑翹竅竊欽親輕氫傾頃請慶瓊窮趨區軀驅齲顴權勸卻鵲讓饒擾繞熱韌認紉榮絨軟銳閏潤灑薩鰓賽傘喪騷掃澀殺紗篩曬閃陝贍繕傷賞燒紹賒攝懾設紳審嬸腎滲聲繩勝聖師獅濕詩屍時蝕實識駛勢釋飾視試壽獸樞輸書贖屬術樹豎數帥雙誰稅順說碩爍絲飼聳慫頌訟誦擻蘇訴肅雖綏歲孫損筍縮瑣鎖獺撻擡攤貪癱灘壇譚談歎湯燙濤縧騰謄銻題體屜條貼鐵廳聽烴銅統頭圖塗團頹蛻脫鴕馱駝橢窪襪彎灣頑萬網韋違圍爲濰維葦偉僞緯謂衛溫聞紋穩問甕撾蝸渦窩嗚鎢烏誣無蕪吳塢霧務誤錫犧襲習銑戲細蝦轄峽俠狹廈鍁鮮纖鹹賢銜閑顯險現獻縣餡羨憲線廂鑲鄉詳響項蕭銷曉嘯蠍協挾攜脅諧寫瀉謝鋅釁興洶鏽繡虛噓須許緒續軒懸選癬絢學勳詢尋馴訓訊遜壓鴉鴨啞亞訝閹煙鹽嚴顔閻豔厭硯彥諺驗鴦楊揚瘍陽癢養樣瑤搖堯遙窯謠藥爺頁業葉醫銥頤遺儀彜蟻藝億憶義詣議誼譯異繹蔭陰銀飲櫻嬰鷹應纓瑩螢營熒蠅穎喲擁傭癰踴詠湧優憂郵鈾猶遊誘輿魚漁娛與嶼語籲禦獄譽預馭鴛淵轅園員圓緣遠願約躍鑰嶽粵悅閱雲鄖勻隕運蘊醞暈韻雜災載攢暫贊贓髒鑿棗竈責擇則澤賊贈紮劄軋鍘閘詐齋債氈盞斬輾嶄棧戰綻張漲帳賬脹趙蟄轍鍺這貞針偵診鎮陣掙睜猙幀鄭證織職執紙摯擲幟質鍾終種腫衆謅軸皺晝驟豬諸誅燭矚囑貯鑄築駐專磚轉賺樁莊裝妝壯狀錐贅墜綴諄濁茲資漬蹤綜總縱鄒詛組鑽緻鐘麼為隻兇準啟闆裡靂餘鍊洩';
      },
      Simplized(cc){
        var str='',ss=this.JTPYStr(),tt=this.FTPYStr();
        for(var i=0;i<cc.length;i++)
        {
          if(cc.charCodeAt(i)>10000&&tt.indexOf(cc.charAt(i))!=-1)str+=ss.charAt(tt.indexOf(cc.charAt(i)));
            else str+=cc.charAt(i);
        }
        return str;
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
</style>