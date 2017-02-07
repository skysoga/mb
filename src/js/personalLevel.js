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
    var arr=['UserName','UserGrade','UserPhoto','UserGradeGrow','GradeList']
    RootApp.GetInitData(arr,stage=>{
      next(vm=>{
        vm.UserGrade=stage.UserGrade
        vm.UserGradeGrow=stage.UserGradeGrow||0
        vm.getPerLong(stage.UserGrade)
      })
    })
  },
  methods:{
    getPerLong(num){
      var num=Number(num)||0
      var maxnum=num<9?num:8
      var Obj=num?state.GradeList[maxnum].GradeGrow:0
      var minObj=num?state.GradeList[num-1].GradeGrow:0
      if(this.UserGradeGrow>Obj){
        this.UserGradeGrow=5000000
      }
      this.perVal=this.UserGradeGrow<Obj&&Math.ceil(((this.UserGradeGrow||minObj)-minObj)/(Obj-minObj)*100)||100
      this.upGrow=this.UserGradeGrow<Obj&&Obj-this.UserGradeGrow||0
      this.GradeName=num?state.GradeList[num-1].GradeName:this.UserGrade
    }
  }
}
