const {interviewApp}=require("../main.js");
const CityJson=require("./CityJson.js")
export default {
  data:()=>{
    return{
      CityJson:CityJson,
      Address_P:'',
      Address_C:''
    }
  },
  computed:{
      CityFun(){
      var vm=this
      this.Address_C=''
      var jsonObj=this.CityJson
        for(var x in jsonObj){
          if(jsonObj[x].id==vm.Address_P){
            return jsonObj[x].city
          }
        }
      }
  }
}
