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
          vm.getPerLong(stage.UserUpGradeBonus.Grade)
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
      var num=Number(num)
      var maxnum=num<9?num:8
      var Obj=num?state.GradeList[maxnum].GradeGrow:0
      var minObj=num?state.GradeList[num-1].GradeGrow:0
      if(this.UserGradeGrow>Obj){
        this.UserGradeGrow=state.GradeList[8].GradeGrow
      }
      this.perVal=num<9?(this.UserGradeGrow<Obj&&Math.ceil(((this.UserGradeGrow||minObj)-minObj)/(Obj-minObj)*100)||0):100
      this.upGrow=this.UserGradeGrow<Obj&&Obj-this.UserGradeGrow||0
      this.GradeName=state.GradeList[num-1].GradeName
    }
  }
}
