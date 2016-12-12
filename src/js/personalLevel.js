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
    var arr=['UserName','UserNickName','UserGrade','UserPhoto','UserGradeGrow','GradeList']
    RootApp.GetInitData(arr,stage=>{
      next(vm=>{
        vm.UserGrade=stage.UserGrade
        vm.UserGradeGrow=stage.UserGradeGrow
        vm.getPerLong(stage.UserGrade)
      })
    })
  },
  methods:{
    getPerLong(num){
      var Obj=this.$store.state.GradeList[num].GradeGrow
      var minObj=this.$store.state.GradeList[num-1].GradeGrow
      this.perVal=parseInt(((this.UserGradeGrow||minObj)-minObj)/(Obj-minObj)*100)+'%'
      this.upGrow=Obj-this.UserGradeGrow
      this.GradeName=this.$store.state.GradeList[num-1].GradeName
    }
  }
}
