const {interviewApp,state}=require("../main.js");
export default {
  data:()=>{
    return{
      UserName:'',
      UserNickName:'',
      UserGrade:'',
      UserPhoto:'',
      UserGradeGrow:'',
      GradeList:''
    }
  },
  created(){
    var arr=['UserName','UserNickName','UserGrade','UserPhoto','UserGradeGrow','GradeList']
    this.$root.GetInitData(arr,sef=>{
      this.GradeList=sef.GradeList
    })
  }
}
