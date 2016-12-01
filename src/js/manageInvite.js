export default {
  data:()=>{
    return{
      caiName:{SSC:"时时彩",XYNC:"幸运农场",PK10:"北京PK10",KL8:"北京快乐8",PL35:"排列3/5",FC3D:"福彩3D",SYX5:"11选5",K3:"快3"},
      UserType:1,
      caiList:''
    }
  },
  created(){
    var vm=this
     var arr = ["AgentRebate"];
     this.$root.GetInitData(arr,state=>{
      this.caiList=state.AgentRebate
     })
     console.log(this.$refs)
    vm.vaConfig || (vm.vaConfig = {})/*初始化vaConfig对象*/
    for(var i=0;i<vm.caiList.length;i++){
      var item = vm.caiList[i]
      vm.vaConfig[item.LotteryType] || (vm.vaConfig[item.LotteryType] = [])
      vm.vaConfig[item.LotteryType].push(new vm.VaConfig('limit',[item.MinPoint,item.Point], '', item.LotteryType, vm.caiName[item.LotteryType]))
    }
   },
   methods:{
    $vaSubmit(){
      var inputObj=this.vaVal
      var vm=this
      var Objrr='';var i=-1;for(var n in inputObj){++i;if(i>0){Objrr+='@'}Objrr+=n+'#'+inputObj[n];}
      var Arr={Action:"SetInviteUrl"}
          Arr.PointJson=Objrr
          Arr.UserType=this.UserType
          Arr.Remark="未设置"
      _fetch(Arr).then(ref=>{
        ref.json().then(json=>{
          if(json.Code==1){
            layer.open({
              shadeClose: false,
              className: "layerConfirm",
              content: json.StrCode + '，是否查看?',
              title: "温馨提示",
              btn: ["确定", '取消'],
              yes:function(index){
                layer.close(index)
                vm.$root.$router.push('/manageIcode')
              },
              no:function(index){
                layer.close(index)
                location.reload()
              }
            })
            console.log(this.vaConfig)
          }else{
            layer.msgWarn(json.StrCode)
          }
        })
      })
    }
   }
}
