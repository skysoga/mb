export default {
  data:()=>{
    return{
      UserGrade:'',
      UserGradeGrow:'',
      GradeName:'',
      upGrow:'',
      perVal:''
    }
  },
  beforeRouteEnter(to,from,next){
    var arr=['UserName','UserUpGradeBonus','UserPhoto','UserGradeGrow','GradeList']
    RootApp.GetInitData(arr,stage=>{
      next(vm=>{
        if(stage.UserUpGradeBonus.Grade!='-1'){
          vm.UserGradeGrow=stage.UserGradeGrow
          vm.UserGrade=stage.UserUpGradeBonus.Grade
          vm.getPerLong(Number(vm.UserGrade))
        }else{
          var UserText="测试组"
          vm.UserGrade=UserText
          vm.GradeName=UserText
        }
      })
    })
  },
  methods:{
    getPerLong(num){
      if (num<1) return //测试及黑名单不用处理
      var maxLev = state.GradeList.length
      if (num>=maxLev) {
        // 已满级
        this.UserGrade=maxLev
        this.perVal=100
        this.upGrow=0
        this.GradeName=state.GradeList[maxLev-1].GradeName
        this.UserGradeGrow=state.GradeList[maxLev-1].GradeGrow
      }else{
        // 未满级 需要计算显示
        var Obj=state.GradeList[num].GradeGrow
        var minObj=state.GradeList[num-1].GradeGrow
        var perVal = Math.round((this.UserGradeGrow-minObj)/(Obj-minObj)*10000)/100
        this.perVal = perVal<100?perVal:100 //防止超过100%
        var upGrow = Obj-this.UserGradeGrow
        this.upGrow= upGrow>0?upGrow:0  //防止出现负数
        this.GradeName=state.GradeList[num-1].GradeName
      }
    }
  }
}
