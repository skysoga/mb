export default {
  data:()=>{
    return{
      caiName:{SSC:"时时彩",XYNC:"幸运农场",PK10:"北京PK10",KL8:"北京快乐8",PL35:"排列3/5",FC3D:"福彩3D",SYX5:"11选5",K3:"快3","6HC":"六合彩"},
      UserType:1,
      caiList:'',
      dval:''
    }
  },
  created(){
    var vm=this
    var arr = ["AgentRebate"];
     RootApp.GetInitData(arr,state=>{
      vm.TipShow=false
      vm.caiList=state.AgentRebate
      vm.vaConfig || (vm.vaConfig = {})/*初始化vaConfig对象*/
      for(var i=0;i<vm.caiList.length;i++){
        var item = vm.caiList[i]
        vm.vaConfig[item.LotteryType] || (vm.vaConfig[item.LotteryType] = [])
        vm.vaConfig[item.LotteryType].push(new vm.VaConfig('limit',[item.MinPoint,item.Point], '', item.LotteryType, vm.caiName[item.LotteryType]))
      }
     })
   },
   methods:{
    $vaSubmit(){
      var inputObj=this.vaVal
      var vm=this
      var Objrr='';var i=-1;for(var n in inputObj){++i;if(i>0){Objrr+='@'}Objrr+=n+'#'+inputObj[n];}
      var Arr={
        Action:"SetInviteUrl",
        PointJson:Objrr,
        UserType:this.UserType,
        Remark:"未设置"
      }
      layer.msgWait("正在提交")
      _fetch(Arr).then(json=>{
          if(json.Code==1){
            layer.confirm(json.StrCode+'，是否查看?',()=>{
              var msg=Arr.UserType==1?'AgentCode':'memberCode'
              router.push('/manageIcode/'+msg)
            },()=>{
              vm.caiList=""
              vm.caiList=state.AgentRebate
            })
          }else{
            layer.msgWarn(json.StrCode)
          }
      })
    }
   }
}
