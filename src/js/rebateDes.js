import BottomBox from '../components/bottom-box';
var BJSC = ['双面盘', '冠亚和','两面-','龙虎斗','猜豹子']//1元玩法
  export default{
    data(){
      return{
        BetweenType:'',
        BottomBoxShow:false,
        BottomBoxList:{K3:"快3",SSC:"时时彩",SYX5:"11选5",FC3D:"福彩3D",PL35:"排列3",KL8:"北京快乐8",PK10:"PK10",LHC:"六合彩"},
        AgentRebate:'',//自身返点数组
        setObj:{Max:8.0,Min:0.0},//最大返点
        ArrObj:'',//当前总数据
        reeData:{},
        theWidth:'',//当前列表宽度
        OrData:'',//可能性注数
        ListArr:''//大小值
      }
    },
    created(){
      this.BetweenType=this.$route&&this.$route.params.id||"K3"

      var isLaw=!this.BottomBoxList[this.BetweenType]
      if(isLaw){
        return router.replace('/manageInvite')
      }
      this.AgentRebate=JSON.parse(localStorage.getItem("AgentRebate"))
      this.OrData={
        "SSC":[
          {"Mode":"大小单双-二星","Odd":[1,4]},
          {"Mode":"大小单双-三星","Odd":[1,8]},
          {"Mode":"一星-复式","Odd":[1,10]},
          {"Mode":"二星-直选复式","Odd":[1,100]},
          {"Mode":"二星-直选单式","Odd":[1,100]},
          {"Mode":"二星-直选和值","Odd":[1,100]},
          {"Mode":"二星-跨度","Odd":[1,100]},
          {"Mode":"二星-组选复式","Odd":[2,100]},
          {"Mode":"二星-组选单式","Odd":[2,100]},
          {"Mode":"二星-组选和值","Odd":[2,100]},
          {"Mode":"二星-组选包胆","Odd":[2,100]},
          {"Mode":"三星-复式","Odd":[1,1000]},
          {"Mode":"三星-单式","Odd":[1,1000]},
          {"Mode":"三星-直选和值","Odd":[1,1000]},
          {"Mode":"三星-跨度","Odd":[1,1000]},
          {"Mode":"三星-组选和值","Odd":[6,1000]},
          {"Mode":"三星-组三","Odd":[3,1000]},
          {"Mode":"三星-组六","Odd":[6,1000]},
          {"Mode":"三星-混合组选","Odd":[6,1000]},
          {"Mode":"三星-组选包胆","Odd":[6,1000]},
          {"Mode":"三星-组三单式","Odd":[3,1000]},
          {"Mode":"三星-组六单式","Odd":[6,1000]},
          {"Mode":"三星-一码不定位","Odd":[271,1000]},
          {"Mode":"三星-二码不定位","Odd":[54,1000]},
          {"Mode":"四星-复式","Odd":[1,10000]},
          {"Mode":"四星-单式","Odd":[1,10000]},
          {"Mode":"四星-组选24","Odd":[24,10000]},
          {"Mode":"四星-组选12","Odd":[12,10000]},
          {"Mode":"四星-组选6","Odd":[6,10000]},
          {"Mode":"四星-组选4","Odd":[4,10000]},
          {"Mode":"四星-一码不定位","Odd":[3439,10000]},
          {"Mode":"四星-二码不定位","Odd":[974,10000]},
          {"Mode":"五星-复式","Odd":[1,100000]},
          {"Mode":"五星-单式","Odd":[1,100000]},
          {"Mode":"五星-组选120","Odd":[120,100000]},
          {"Mode":"五星-组选60","Odd":[60,100000]},
          {"Mode":"五星-组选30","Odd":[30,100000]},
          {"Mode":"五星-组选20","Odd":[20,100000]},
          {"Mode":"五星-组选10","Odd":[10,100000]},
          {"Mode":"五星-组选5","Odd":[5,100000]},
          {"Mode":"五星-一码不定位","Odd":[40951,100000]},
          {"Mode":"五星-二码不定位","Odd":[14670,100000]},
          {"Mode":"五星-三码不定位","Odd":[4350,100000]},
          {"Mode":"五星-一帆风顺","Odd":[40951,100000]},
          {"Mode":"五星-好事成双","Odd":[8146,100000]},
          {"Mode":"五星-三星报喜","Odd":[856,100000]},
          {"Mode":"五星-四季发财","Odd":[46,100000]},
          {"Mode":"两面-总和大小单双","Odd":[50000,100000]},
          {"Mode":"两面-大小单双质合","Odd":[50000,100000]},
          {"Mode":"龙虎斗-龙虎","Odd":[45,100]},
          {"Mode":"龙虎斗-和","Odd":[10,100]},
          {"Mode":"猜豹子","Odd":[1,100000]}
        ],
        "SYX5":[
          {"Mode":"前三直选复式","Odd":[1,990]},
          {"Mode":"前三直选单式","Odd":[1,990]},
          {"Mode":"前三组选复式","Odd":[6,990]},
          {"Mode":"前三组选单式","Odd":[6,990]},
          {"Mode":"前三组选胆拖","Odd":[6,990]},
          {"Mode":"前三一码不定位","Odd":[270,990]},
          {"Mode":"前二直选复式","Odd":[1,110]},
          {"Mode":"前二直选单式","Odd":[1,110]},
          {"Mode":"前二组选复式","Odd":[2,110]},
          {"Mode":"前二组选单式","Odd":[2,110]},
          {"Mode":"前二组选胆拖","Odd":[2,110]},
          {"Mode":"定位胆-复式","Odd":[1,11]},
          {"Mode":"定单双-5单0双","Odd":[720,55440]},
          {"Mode":"定单双-4单1双","Odd":[9000,55440]},
          {"Mode":"定单双-3单2双","Odd":[24000,55440]},
          {"Mode":"定单双-2单3双","Odd":[18000,55440]},
          {"Mode":"定单双-1单4双","Odd":[3600,55440]},
          {"Mode":"定单双-0单5双","Odd":[120,55440]},
          {"Mode":"猜中位-03/09","Odd":[3360,55440]},
          {"Mode":"猜中位-04/08","Odd":[7560,55440]},
          {"Mode":"猜中位-05/07","Odd":[10800,55440]},
          {"Mode":"猜中位-06","Odd":[12000,55440]},
          {"Mode":"任选复式-1中1","Odd":[25200,55440]},
          {"Mode":"任选复式-2中2","Odd":[10080,55440]},
          {"Mode":"任选复式-3中3","Odd":[3360,55440]},
          {"Mode":"任选复式-4中4","Odd":[840,55440]},
          {"Mode":"任选复式-5中5","Odd":[120,55440]},
          {"Mode":"任选复式-6中5","Odd":[720,55440]},
          {"Mode":"任选复式-7中5","Odd":[2520,55440]},
          {"Mode":"任选复式-7中5","Odd":[6720,55440]},
          {"Mode":"任选单式-1中1","Odd":[25200,55440]},
          {"Mode":"任选单式-2中2","Odd":[10080,55440]},
          {"Mode":"任选单式-3中3","Odd":[3360,55440]},
          {"Mode":"任选单式-4中4","Odd":[840,55440]},
          {"Mode":"任选单式-5中5","Odd":[120,55440]},
          {"Mode":"任选单式-6中5","Odd":[720,55440]},
          {"Mode":"任选单式-7中5","Odd":[2520,55440]},
          {"Mode":"任选单式-8中5","Odd":[6720,55440]},
          {"Mode":"任选胆拖-2中2","Odd":[10080,55440]},
          {"Mode":"任选胆拖-3中3","Odd":[3360,55440]},
          {"Mode":"任选胆拖-4中4","Odd":[840,55440]},
          {"Mode":"任选胆拖-5中5","Odd":[120,55440]},
          {"Mode":"任选胆拖-6中5","Odd":[720,55440]},
          {"Mode":"任选胆拖-7中5","Odd":[2520,55440]},
          {"Mode":"任选胆拖-8中5","Odd":[6720,55440]},
        ],
        "FC3D":[
          {"Mode":"大小单双-二星","Odd":[1,4]},
          {"Mode":"一星-复式","Odd":[1,10]},
          {"Mode":"后二-直选","Odd":[1,100]},
          {"Mode":"后二-组选","Odd":[2,100]},
          {"Mode":"前二-直选","Odd":[1,100]},
          {"Mode":"前二-组选","Odd":[2,100]},
          {"Mode":"三星-直选","Odd":[1,1000]},
          {"Mode":"三星-组选和值","Odd":[3,1000]},
          {"Mode":"三星-组三","Odd":[3,1000]},
          {"Mode":"三星-组六","Odd":[6,1000]},
          {"Mode":"三星-混合组选","Odd":[3,1000]},
          {"Mode":"三星-组选包胆","Odd":[3,1000]},
          {"Mode":"三星-组三单式","Odd":[3,1000]},
          {"Mode":"三星-组六单式","Odd":[6,1000]},
          {"Mode":"三星-一码不定位","Odd":[271,1000]},
          {"Mode":"三星-二码不定位","Odd":[54,1000]},
        ],
        "PL35":[
          {"Mode":"大小单双-二星","Odd":[1,4]},
          {"Mode":"一星-复式","Odd":[1,10]},
          {"Mode":"后二-直选","Odd":[1,100]},
          {"Mode":"后二-组选","Odd":[2,100]},
          {"Mode":"前二-直选","Odd":[1,100]},
          {"Mode":"前二-组选","Odd":[2,100]},
          {"Mode":"三星-直选","Odd":[1,1000]},
          {"Mode":"三星-组选和值","Odd":[3,1000]},
          {"Mode":"三星-组三","Odd":[3,1000]},
          {"Mode":"三星-组六","Odd":[6,1000]},
          {"Mode":"三星-混合组选","Odd":[3,1000]},
          {"Mode":"三星-组选包胆","Odd":[3,1000]},
          {"Mode":"三星-组六单式","Odd":[6,1000]},
          {"Mode":"三星-一码不定位","Odd":[271,1000]},
          {"Mode":"三星-二码不定位","Odd":[54,1000]},
        ],
        /*"KL8":[
          {"Mode":"任选一","Odd":[20,80]},
          {"Mode":"任选二","Odd":[190,3160]},
          {"Mode":"任选三(中三)","Odd":[1140,82160]},
          {"Mode":"任选三(中二)","Odd":[11400,82160]},
          {"Mode":"任选四(中四)","Odd":[4845,1581580]},
          {"Mode":"任选四(中三)","Odd":[68400,1581580]},
          {"Mode":"任选四(中二)","Odd":[336300,1581580]},
          {"Mode":"任选五(中五)","Odd":[15504,24040016]},
          {"Mode":"任选五(中四)","Odd":[290700,24040016]},
          {"Mode":"任选五(中三)","Odd":[2017800,24040016]},
          {"Mode":"任选六(中六)","Odd":[38760,300500200]},
          {"Mode":"任选六(中五)","Odd":[930240,300500200]},
          {"Mode":"任选六(中四)","Odd":[8575650,300500200]},
          {"Mode":"任选六(中三)","Odd":[39010800,300500200]},
          {"Mode":"任选七(中七)","Odd":[77520,3176716400]},
          {"Mode":"任选七(中六)","Odd":[2325600,3176716400]},
          {"Mode":"任选七(中五)","Odd":[27442080,3176716400]},
          {"Mode":"任选七(中四)","Odd":[165795900,3176716400]},
          {"Mode":"任选七(中零)","Odd":[386206920,3176716400]},
          {"Mode":"上下盘(上下)","Odd":[1408393885741460000,3535316142212170000]},
          {"Mode":"上下盘(和)","Odd":[718528370729238000,3535316142212170000]},
          {"Mode":"奇偶盘(奇偶)","Odd":[1408393885741460000,3535316142212170000]},
          {"Mode":"奇偶盘(和)","Odd":[718528370729238000,3535316142212170000]},
          {"Mode":"和值大小单双","Odd":[1,4]},
        ],*/
        "PK10":[  {"Mode":"定位胆-标准","Odd":[1,10]},
          {"Mode":"前五-复式","Odd":[120,3628800]},
          {"Mode":"前五-单式","Odd":[120,3628800]},
          {"Mode":"前四-复式","Odd":[720,3628800]},
          {"Mode":"前四-单式","Odd":[720,3628800]},
          {"Mode":"前三-复式","Odd":[5040,3628800]},
          {"Mode":"前三-单式","Odd":[5040,3628800]},
          {"Mode":"前二-复式","Odd":[40320,3628800]},
          {"Mode":"前二-单式","Odd":[40320,3628800]},
          {"Mode":"前一-复式","Odd":[362880,3628800]},
          {"Mode":"双面盘-大小单双龙虎","Odd":[1,2]},
          {"Mode":"冠亚和-和大/和双","Odd":[40,90]},
          {"Mode":"冠亚和-和小/和单","Odd":[50,90]},
          {"Mode":"冠亚和-03/04","Odd":[2,90]},
          {"Mode":"冠亚和-05/06","Odd":[4,90]},
          {"Mode":"冠亚和-07/08","Odd":[6,90]},
          {"Mode":"冠亚和-09/10","Odd":[8,90]},
          {"Mode":"冠亚和-11","Odd":[10,90]},
          {"Mode":"冠亚和-12/13","Odd":[8,90]},
          {"Mode":"冠亚和-14/15","Odd":[6,90]},
          {"Mode":"冠亚和-16/17","Odd":[4,90]},
          {"Mode":"冠亚和-18/19","Odd":[2,90]},
        ]
      }
      this.ListArr={
          "K3":{"Rebate": [8.5, 0.0], "List": [{"Mode": "\u5927/\u5C0F/\u5355/\u53CC", "Odd": [1.97, 1.80] }, {"Mode": "\u548C\u503C3/18", "Odd": [191.16, 172.80] }, {"Mode": "\u548C\u503C4/17", "Odd": [63.72, 57.60] }, {"Mode": "\u548C\u503C5/16", "Odd": [31.86, 28.80] }, {"Mode": "\u548C\u503C6/15", "Odd": [19.11, 17.28] }, {"Mode": "\u548C\u503C7/14", "Odd": [12.74, 11.52] }, {"Mode": "\u548C\u503C8/13", "Odd": [9.1, 8.228] }, {"Mode": "\u548C\u503C9/12", "Odd": [7.64, 6.912] }, {"Mode": "\u548C\u503C10/11", "Odd": [7.08, 6.40] }, {"Mode": "\u4E09\u540C\u53F7\u901A\u9009", "Odd": [31.86, 28.80] }, {"Mode": "\u4E09\u540C\u53F7\u5355\u9009", "Odd": [191.16, 172.80] }, {"Mode": "\u4E09\u4E0D\u540C\u53F7", "Odd": [31.86, 28.80] }, {"Mode": "\u4E09\u8FDE\u53F7\u901A\u9009", "Odd": [7.96, 7.20] }, {"Mode": "\u4E8C\u540C\u53F7\u590D\u9009", "Odd": [12.74, 11.52] }, {"Mode": "\u4E8C\u540C\u53F7\u5355\u9009", "Odd": [63.72, 57.60] }, {"Mode": "\u4E8C\u4E0D\u540C\u53F7", "Odd": [6.37, 5.76] }] },
          "LHC":{
            "Rebate":[10.0,0.00],
            "List":[
              {"Mode":"特码直选","Odd":[48.51000,43.61000]},
              {"Mode":"特码大小单双","Odd":[1.98042,1.77625]},
              {"Mode":"特码大单","Odd":[3.96083,3.55250]},
              {"Mode":"特码大双","Odd":[3.96083,3.55250]},
              {"Mode":"特码小单","Odd":[3.96083,3.55250]},
              {"Mode":"特码小双","Odd":[3.96083,3.55250]},
              {"Mode":"特码合单","Odd":[1.98042,1.77625]},
              {"Mode":"特码合双","Odd":[1.98042,1.77625]},
              {"Mode":"特码合大","Odd":[1.98042,1.77625]},
              {"Mode":"特码合小","Odd":[1.98042,1.77625]},
              {"Mode":"特码尾大","Odd":[1.98042,1.77625]},
              {"Mode":"特码尾小","Odd":[1.98042,1.77625]},
              {"Mode":"特码红波","Odd":[2.79588,2.50765]},
              {"Mode":"特码蓝绿波","Odd":[2.97063,2.66438]},
              {"Mode":"特码家禽","Odd":[1.90120,1.70520]},
              {"Mode":"特码野兽","Odd":[1.98042,1.77625]},
              {"Mode":"正码任选","Odd":[8.00333,7.18667]},
              {"Mode":"正码正特","Odd":[47.04000, 42.14000]},
              {"Mode":"正码两面大","Odd":[1.98042,1.77625]},
              {"Mode":"正码两面小","Odd":[1.98042,1.77625]},
              {"Mode":"正码两面单","Odd":[1.98042,1.77625]},
              {"Mode":"正码两面双","Odd":[1.98042,1.77625]},
              {"Mode":"正码两面大单","Odd":[3.96083,3.55250]},
              {"Mode":"正码两面大双","Odd":[3.96083,3.55250]},
              {"Mode":"正码两面小单","Odd":[3.96083,3.55250]},
              {"Mode":"正码两面小双","Odd":[3.96083,3.55250]},
              {"Mode":"正码两面合单","Odd":[1.98042,1.77625]},
              {"Mode":"正码两面合双","Odd":[1.98042,1.77625]},
              {"Mode":"正码两面合大","Odd":[1.98042,1.77625]},
              {"Mode":"正码两面合小","Odd":[1.98042,1.77625]},
              {"Mode":"正码两面尾大","Odd":[1.98042,1.77625]},
              {"Mode":"正码两面尾小","Odd":[1.98042,1.77625]},
              {"Mode":"正码两面红波","Odd":[2.79588,2.50765]},
              {"Mode":"正码两面蓝绿波","Odd":[2.97063,2.66438]},
              {"Mode":"连码三全中","Odd":[663.26400,571.14400]},
              {"Mode":"连码三中二","Odd":[20.88053,18.42400]},
              {"Mode":"连码三中二之中三","Odd":[109.62280,96.72600]},
              {"Mode":"连码二全中","Odd":[66.64,58.8]},
              {"Mode":"连码二中特之二中","Odd":[53.31200,47.04000]},
              {"Mode":"连码二中特之中特","Odd":[33.32000,29.40000]},
              {"Mode":"连码特串","Odd":[160.72000,141.12000]},
              {"Mode":"半波特码红大","Odd":[6.65000,5.95000]},
              {"Mode":"半波特码红小","Odd":[4.65500,4.16500]},
              {"Mode":"半波特码红单","Odd":[5.81875,5.20625]},
              {"Mode":"半波特码红双","Odd":[5.17222,4.62778]},
              {"Mode":"半波特码红合单","Odd":[5.17222,4.62778]},
              {"Mode":"半波特码红合双","Odd":[5.81875,5.20625]},
              {"Mode":"半波特码绿大","Odd":[5.81875,5.20625]},
              {"Mode":"半波特码绿小","Odd":[6.65000,5.95000]},
              {"Mode":"半波特码绿单","Odd":[5.81875,5.20625]},
              {"Mode":"半波特码绿双","Odd":[6.65000,5.95000]},
              {"Mode":"半波特码绿合单","Odd":[6.65000,5.95000]},
              {"Mode":"半波特码绿合双","Odd":[5.81875,5.20625]},
              {"Mode":"半波特码蓝大","Odd":[5.17222,4.62778]},
              {"Mode":"半波特码蓝小","Odd":[6.65000,5.95000]},
              {"Mode":"半波特码蓝单","Odd":[5.81875,5.20625]},
              {"Mode":"半波特码蓝双","Odd":[5.81875,5.20625]},
              {"Mode":"半波特码蓝合单","Odd":[5.81875,5.20625]},
              {"Mode":"半波特码蓝合双","Odd":[5.81875,5.20625]},
              {"Mode":"特肖本命","Odd":[9.31000,8.33000]},
              {"Mode":"特肖非本命","Odd":[11.63750,10.41250]},
              {"Mode":"一肖本命","Odd":[1.71512,1.53458]},
              {"Mode":"一肖非本命","Odd":[2.01391,1.80192]},
              {"Mode":"二肖连含本命","Odd":[3.62659,3.21448]},
              {"Mode":"二肖连不含本命","Odd":[4.28935,3.80193]},
              {"Mode":"三肖连含本命","Odd":[9.17145,8.12924]},
              {"Mode":"三肖连不含本命","Odd":[10.93630,9.69354]},
              {"Mode":"四肖连含本命","Odd":[26.57030,23.55095]},
              {"Mode":"四肖连不含本命","Odd":[31.97783,28.34398]},
              {"Mode":"尾数特码头尾0头","Odd":[5.17222,4.62778]},
              {"Mode":"尾数特码头尾非0头","Odd":[4.65500,4.16500]},
              {"Mode":"尾数特码头尾0尾","Odd":[11.63750,10.41250]},
              {"Mode":"尾数特码头尾非0尾","Odd":[9.31000,8.33000]},
              {"Mode":"尾数二尾连含0","Odd":[3.62659,3.21448]},
              {"Mode":"尾数二尾连不含0","Odd":[3.06783,2.71921]},
              {"Mode":"尾数三尾连含0","Odd":[7.69518,6.82072]},
              {"Mode":"尾数三尾连不含0","Odd":[6.45975,5.72569]},
              {"Mode":"尾数四尾连含0","Odd":[18.36832,16.28101]},
              {"Mode":"尾数四尾连不含0","Odd":[15.28279,13.54611]},
              {"Mode":"不中五不中","Odd":[2.12955,1.90539]},
              {"Mode":"不中六不中","Odd":[2.53244,2.26587]},
              {"Mode":"不中七不中","Odd":[3.02486,2.70645]},
              {"Mode":"不中八不中","Odd":[3.62983,3.24774]},
              {"Mode":"不中九不中","Odd":[4.37714,3.91639]},
              {"Mode":"不中十不中","Odd":[5.30563,4.74714]}
            ]
          },
          "SSC":{"Rebate":[8.0,0.00],"List":[]},
          "SYX5":{"Rebate":[8.0,0.00],"List":[]},
          "FC3D":{"Rebate":[8.0,0.00],"List":[]},
          "PL35":{"Rebate":[8.0,0.00],"List":[]},
          "KL8":{"Rebate":[7.5,0.00],"List":[
            {"Mode":"任选-任选一","Odd":[7.80,7.20]},
            {"Mode":"任选-任选二","Odd":[32.43,29.93]},
            {"Mode":"任选-任选三(中三)","Odd":[70.26,64.86]},
            {"Mode":"任选-任选三(中二)","Odd":[7.02,6.48]},
            {"Mode":"任选-任选四(中四)","Odd":[212.18,195.86]},
            {"Mode":"任选-任选四(中三)","Odd":[15.02,13.87]},
            {"Mode":"任选-任选四(中二)","Odd":[3.05,2.82]},
            {"Mode":"任选-任选五(中五)","Odd":[1007.86,930.34]},
            {"Mode":"任选-任选五(中四)","Odd":[53.75,49.61]},
            {"Mode":"任选-任选五(中三)","Odd":[7.74,7.14]},
            {"Mode":"任选-任选六(中六)","Odd":[3779.51,3488.77]},
            {"Mode":"任选-任选六(中五)","Odd":[157.47,145.36]},
            {"Mode":"任选-任选六(中四)","Odd":[17.08,15.76]},
            {"Mode":"任选-任选六(中三)","Odd":[3.75,3.46]},
            {"Mode":"任选-任选七(中七)","Odd":[15981.93,14752.55]},
            {"Mode":"任选-任选七(中六)","Odd":[532.72,491.75]},
            {"Mode":"任选-任选七(中五)","Odd":[45.14,41.67]},
            {"Mode":"任选-任选七(中四)","Odd":[7.47,6.89]},
            {"Mode":"任选-任选七(中零)","Odd":[3.20,2.96]},
            {"Mode":"趣味-上下盘(上下)","Odd":[4.89,4.51]},
            {"Mode":"趣味-上下盘(中)","Odd":[9.59,8.85]},
            {"Mode":"趣味-奇偶盘(奇偶)","Odd":[4.89,4.51]},
            {"Mode":"趣味-奇偶盘(和)","Odd":[9.59,8.85]},
            {"Mode":"趣味-和值大小单双","Odd":[7.80,7.20]},
          ]},
          "PK10":{"Rebate":[8.0,0.00],"List":[]}
      }
      this.setListDate(this.BetweenType)
    },
    methods:{
      bottomBox(k,v){
        this.BetweenType=k
        this.BottomBoxShow=false
        router.push('/rebateDes/'+k)
        this.setListDate(k)
      },
      setMsg(key,index){
        if(index>0){
          var isBJSC = this.ArrObj.Mode[index-1].slice(0,3)//1元玩法
          return (key !== "K3" && key !== "LHC") ? (BJSC.indexOf(isBJSC) > -1 ?"赔率":"奖金"):"赔率"
        }else{
          return ""
        }
      },
      setListDate(key){
          this.reeData=this.ListArr[key]
          key=key=='LHC'?'6HC':key
          var i=0;
          for(;i<this.AgentRebate.length;i++){
              var iCode=this.AgentRebate[i].LotteryType;
              if(iCode==key){
                  var Max=this.AgentRebate[i].Point
                  var Min=this.AgentRebate[i].MinPoint
                  this.reeData.Rebate[0]=+Max
                  this.reeData.Rebate[1]=+Min
              }

          }
          if(key!=='6HC'){
            if(key=='K3'){
              this.setObj.Max=8.5
              this.setObj.Min=0.0
            }else if(key=='KL8'){
              this.setObj.Max=7.5
              this.setObj.Min=0.0
            }else{
              this.setObj.Max=8.0
              this.setObj.Min=0.0
            }
          }else{
            this.setObj.Max=10.0
            this.setObj.Min=0.0
          }
          if(this.OrData[key]){
             this.setPlayArr(this.OrData[key]);
           }
          if(!this.reeData.List.length){
            this.ArrObj=""
            return
          }
          var {Mode,Data}=this.ReMode()
          var isArr=[],
                reArr=this.Rebate(this.setObj.Max,this.setObj.Min),
                i=0;
            for(;i<reArr.length;i++){
                var nArr=[],
                    Onum=reArr[i],
                        j=0;
                nArr.push(reArr[i]);
                for(;j<Data.length;j++){
                  var type = Mode[j].slice(0, 3)
                  var key = Data[j][i]
                  if ((this.BetweenType=='PK10'||this.BetweenType=='SSC')&&BJSC.indexOf(type) > -1) {
                    key = key/2
                    var isNum = Mode[j].match(/[大单双虎]/g)
                    if(!isNum){
                      key=Math.floor(key*100)/100
                    }else{
                      key=key.toFixed(3)
                    }
                  }                  
                  nArr.push(key);

                }
              if(Onum<=this.reeData.Rebate[0]&&Onum>=this.reeData.Rebate[1]){
                isArr.push(nArr)
              }
            }
            this.ArrObj={Data:isArr,Mode:Mode}
            this.theWidth={width:this.ArrObj.Data.length*7.4*.7*em+2+'px'}
      },
      Rebate(Max,Min){//返点区间
          var isArr=[],
                  toli=(Max-Min)*10;
          for(var i=0;i<=toli;i++){
              var theObj=(Max*10-i)/10;
              isArr.push(theObj.toFixed(1));
          }
          return isArr;
      },
      SetOdd(max,min,set){//赔率区间
          var Num=this.Rebate(this.setObj.Max,this.setObj.Min).length-1;
          var Arr=[];
          var toli=(max-min)/Num;
          for(var i=Num;i>=0;i--){
              var iser=toli*i+Number(min);
              if(set){
                  Arr.push(Number(Math.floor(iser*1000)/1000).toFixed(3));
              }else{
                  Arr.push(Number(Math.floor(iser*100)/100).toFixed(2));
              }
          }
          return Arr;
      },
      ReMode(){//玩法序列和赔率
          var isArr={
            Mode:[],
            Data:[]
          }
          var isMode= this.reeData['List'];
          for(var i=0;i<isMode.length;i++){
              isArr.Mode.push(isMode[i].Mode);
              var set=false,
                  Mode=isMode[i].Mode,
                  iMo
              if (this.BetweenType==="LHC") {
                var Mname=Mode.substr(0,2),
                    iMo=Mode.substr(2)
                set = Mname==="半波"||Mname==="一肖"||Mname==="特码"&&iMo!=="直选"||Mname==="正码"&&iMo!=="任选"&&iMo!=="正特"
              }else{
                iMo=Mode.substr(Mode.length-2);
                set = iMo=='三星'||iMo=='二星'||iMo=='/双'||iMo=='和双'||iMo=='和单'||iMo=='龙虎'||iMo=='单双'||iMo=='质合'||iMo=='-和'
              }
              var Num=this.SetOdd(isMode[i].Odd[0],isMode[i].Odd[1],set);
              isArr.Data.push(Num);
          }
          return isArr
      },
      setPlayArr(ObjArr){//可能性注数算法
          var Arr=[],i=0,ObjAll=ObjArr,Num=this.Rebate(this.setObj.Max,this.setObj.Min);
          for(var l=ObjAll.length;i<l;i++){
              var Obj=new Object(),j=0;
                  Obj.Mode=ObjAll[i].Mode;
                  Obj.Odd=[];
                  Obj.Odd.push(ObjAll[i].Odd[1]/ObjAll[i].Odd[0]*(0.9+8/100)*2,ObjAll[i].Odd[1]/ObjAll[i].Odd[0]*(0.9+0/100)*2)
                  Arr.push(Obj);
          }
          this.reeData['List']=Arr;
      }
    },
    components:{
      'bottom-box': BottomBox
    }
  }
