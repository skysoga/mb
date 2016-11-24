const {interviewApp,state}=require("../main.js");
export default {
  data:()=>{
    return{
      UserGrade:''
    }
  },
  created(){
    var arr=['UserName','UserNickName','UserGrade','UserPhoto','UserGradeGrow','GradeList']
    this.$root.GetInitData(arr,stage=>{
      this.UserGrade=stage.UserGrade
    })
  }
}
