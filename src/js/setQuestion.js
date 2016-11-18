const interviewApp=require("../main.js");
export default {
  data:()=>{
    return{
      Questions:"",
      question1:"",
      question2:"",
      question3:"",
      answer1:"",
      answer2:"",
      answer3:""
    }
  },
  created(){
    var arr = ["SafeQuestionList"];
    var vm=this
     this.$root.GetInitData(arr,State=>{
      vm.Questions=State.SafeQuestionList
     })
  },
  methods:{
    postBtn(){
      var $root=this.$root
      var ajax = {
        Answer1:this.answer1,
        Answer2:this.answer2,
        Answer3:this.answer3
      }

      if(!this.question1||!this.question2||!this.question3){
        layer.msgWarn('请选择问题');
        return;
      }
      if(this.OddGet()!=3){
        layer.msgWarn('请勿选择相同的问题');
        return;
      }
      if(!this.answer1||!this.answer2||!this.answer3){
        layer.msgWarn('您还有信息未填写');
        return;
      }
      ajax.Action="SetQuestion"
      ajax.QuestionID1=this.question1
      ajax.QuestionID2=this.question2
      ajax.QuestionID3=this.question3
      ajax.Question1=this.getTitle(this.question1)
      ajax.Question2=this.getTitle(this.question2)
      ajax.Question3=this.getTitle(this.question3)
      layer.msgWait("正在提交")
      _fetch(ajax).then((res)=>{
        res.json().then((json) => {
          if(json.Code===1) {
            layer.msgWarn(json.StrCode)
            $root.AjaxGetInitData(["UserSafeQuestions"],function(){
              $root.$router.push('/securityCenter')
            })
          }else{
            layer.msgWarn(json.StrCode)
          }
        })
      })
    },
    OddGet(){
      let Qs=[]
      let Arr=[]
      let i=0
          Qs.push(this.question1,this.question2,this.question3)
          for(;i<Qs.length;i++){
            if(Arr.indexOf(Qs[i])==-1)Arr.push(Qs[i])
          }
        return Arr.length
    },
    getTitle(id){
      let i=0
      let Obj=this.Questions
      for(;i<Obj.length;i++){
        if(Obj[i].Question_Id==id){
          return Obj[i].Question
        }
      }
    }
  }
}
