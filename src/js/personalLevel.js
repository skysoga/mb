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
      var num=Number(num)||0
      var Obj=num?this.$store.state.GradeList[num].GradeGrow:0
      var minObj=num?this.$store.state.GradeList[num-1].GradeGrow:0
      this.perVal=parseInt(((this.UserGradeGrow||minObj)-minObj)/(Obj-minObj)*100)+'%'
      this.upGrow=Obj-this.UserGradeGrow||0
      this.GradeName=num?this.$store.state.GradeList[num-1].GradeName:this.UserGrade
    }
  }
}
