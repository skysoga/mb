const interviewApp=require("../main.js");
export default {
  data:()=>{
    return{
      Password:""
    }
  },
  methods:{
    postBtn:function(){
      console.log(this.Password)
    }
  }
}
