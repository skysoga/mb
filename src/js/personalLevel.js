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
  created(){
    var arr=['UserName','UserNickName','UserGrade','UserPhoto','UserGradeGrow','GradeList']
    this.$root.GetInitData(arr,stage=>{
      this.UserGrade=stage.UserGrade
      this.UserGradeGrow=stage.UserGradeGrow
      this.getPerLong(stage.UserGrade)
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
