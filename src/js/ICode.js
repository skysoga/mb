import bottombox from '../components/bottom-box'
import showCodeDetail from '../components/showCodeDetail'
export default{
  props:['UserType'],
  data(){
    return{
      arr:{
        Action:"GetInviteUrl",
        UserType:'',
        Index:0,
        DataNum:15
      },
      data_count:null,
      ArrList:[],
      ArrNum:'',
      CodeInit:{},
      ArrIndex:'',
      data_length:0,
      scroollDom:null,
      msg:[null,layer.icon.load + "正在加载...","已显示全部内容"],
      doc_height:0,
      cant_scroll:0,
      BottomBoxShow:false,
      BottomBoxList:["查看返点详情","删除邀请码"],
      DetailShow:false,
      DetailList:[],
      caiName:{SSC:"时时彩",XYNC:"幸运农场",PK10:"北京PK10",KL8:"北京快乐8",PL35:"排列3/5",FC3D:"福彩3D",SYX5:"11选5",K3:"快3"}
    }
  },
  methods:{
    getAjaxData(){
      this.cant_scroll = 1
      var vm=this
      this.arr.UserType=vm.UserType
      _fetch(this.arr).then(json=>{
          if(json.Code==1){
            if(json.BackData.length){
              vm.cant_scroll=0
              if (vm.arr.Index === 0) {
                this.data_count = json.DataCount
              }
              vm.ArrList=vm.ArrList.concat(json.BackData)
              vm.data_length += json.BackData.length
              if(vm.data_length >= vm.data_count){
                  vm.cant_scroll = 2
                }
              vm.arr.Index++
            }else{
              vm.data_count=0
            }
          }else{
            layer.msgWarn(json.StrCode)
          }
      })
    },
    scroll(){
      if (this.cant_scroll) {
        return
      }else if (this.scroollDom.scrollTop > (this.ArrList.length-50)*(3*em+1)-this.doc_height) {
        this.getAjaxData()
      }
    },
    bottomBox(val,key){
      var vm=this
      if(val){
        layer.open({
          content: '您确定要删除邀请码吗？',
          className: "layerConfirm",
          btn: ['确定', '取消'],
          yes: function(index){
            layer.close(index)
            vm.delData(vm.ArrNum)
          }
        })
      }else{
        this.DetailShow=true
      }
      this.BottomBoxShow=false
    },
    getList(index,num){
      this.BottomBoxShow=true
      this.ArrIndex=index
      this.ArrNum=num
      var vm=this
      var Arr={Action:"GetRebateInfo",InviteCode:num};
      if(vm.CodeInit[num]){
        vm.setString(vm.CodeInit[num])
      }else{
        _fetch(Arr).then(json=>{
          if(json.Code==1){
            vm.setString(json.StrCode)
            vm.CodeInit[num]=json.StrCode
          }else{
            layer.msgWarn(json.StrCode)
          }
        })
      }
    },
    delData(Num){
      var vm=this
      var Arr={Action:"DelInviteUrl",InviteCode:Num};
      _fetch(Arr).then(json=>{
        if(json.Code==1){
          vm.ArrList.splice(vm.ArrIndex,1)
          vm.data_count=vm.ArrList.length
        }else{
          layer.msgWarn(json.StrCode)
        }
      })
    },
    setString(String){
      var vm=this
      var Arr=String.split('@')
      var listArr=[]
      for(var i=Arr.length-1;i>=0;i--){
        var theObj={}
        var Key=Arr[i].split('#')
        theObj.Name=vm.caiName[Key[0]]
        theObj.Num=Key[1]
        listArr.push(theObj)
      }
      vm.DetailList=listArr
    }
  },
  mounted(){
    this.getAjaxData()
    this.scroollDom = this.$parent.$refs.main
    this.doc_height = this.scroollDom.clientHeight
  },
  components:{
    'bottom-box':bottombox,
    'Detail-box':showCodeDetail
  }
}
