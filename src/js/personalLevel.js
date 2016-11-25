const {interviewApp,state}=require("../main.js");
export default {
  data:()=>{
    return{
      UserGrade:'',
      UserGradeGrow:'',
      upGrow:'',
      perVal:''
    }
  },
  created(){
    var arr=['UserName','UserNickName','UserGrade','UserPhoto','UserGradeGrow','GradeList']
    this.$root.GetInitData(arr,stage=>{
      this.UserGrade=stage.UserGrade
      this.UserGradeGrow=stage.UserGradeGrow
    })
    this.getPerLong(this.UserGrade)
  },
  methods:{
    getPerLong(num){
      var Obj=this.$store.state.GradeList[num].GradeGrow
      var minObj=this.$store.state.GradeList[num-1].GradeGrow
      this.perVal=(minObj-this.UserGradeGrow)/(Obj-this.UserGradeGrow)*100+'%'
      this.upGrow=Obj-this.UserGradeGrow
      console.log(Obj)
    }
  }
}
