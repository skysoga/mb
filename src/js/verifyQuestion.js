const interviewApp=require("../main.js");
export default {
  data:()=>{
    return{
      Questions:"",
      question1:"",
      question2:"",
      answer1:"",
      answer2:"",
    }
  },
  created(){
    var arr = ["UserSafeQuestions"];
    var vm=this
     this.$root.GetInitData(arr,State=>{
      vm.Questions=State.UserSafeQuestions
      vm.question1=vm.Questions[0].Id
      vm.question2=vm.Questions[1].Id
     })
  },
  methods:{
    postBtn(){
      var $root=this.$root
      var ajax = {
        Answer1:this.answer1,
        Answer2:this.answer2
      }
      if(this.question1==this.question2){
        layer.msgWarn('问题不能相同');
        return;
      };
      var selfCheck = {
        Answer1:{
          Name: '问题一答案',
          Reg: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
          ErrMsg:"问题一答案不能为空！"
        },
        Answer2:{
          Name: '问题二答案',
          Reg: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
          ErrMsg:"问题二答案不能为空！"
        }
      }
      var err = this.$root.format(ajax, ['Answer1','Answer2'], selfCheck);
      if (err) {
        layer.msgWarn(err[1]);
        return;
      }
      ajax.Action="VerifyQuestion"
      ajax.QuestionID1=this.question1
      ajax.QuestionID2=this.question2
      layer.msgWait("正在提交")
      _fetch(ajax).then((res)=>{
        res.json().then((json) => {
          if(json.Code===1) {
            layer.msgWarn(json.StrCode);
            $root.$router.push('/setQuestion')
          }else{
            layer.msgWarn(json.StrCode);
          }
        })
      })
    }
  }
}
