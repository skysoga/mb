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
  beforeRouteEnter(to,from,next){
    var F=sessionStorage.getItem('isFind')
    var U=localStorage.getItem('UserName')
    if(!(U||F)){
      router.push('/login')
    }
    next()
  },
  created(){
    var arr = ["SafeQuestionList"];
    var vm=this
     RootApp.GetInitData(arr,State=>{
      vm.Questions=State.SafeQuestionList
     })
  },
  mounted(){
    var vm = this
    // 替换验证错误信息
    for(var config in vm.vaConfig){
      vm.vaConfig[config].map(function(item){
        if(item.type === 'unique'){
          item.errMsg = '请勿选择相同的问题'
        }
      })
    }
  },
  methods:{
    $vaSubmit(){
      var ajax = {
        Answer1:this.answer1,
        Answer2:this.answer2,
        Answer3:this.answer3
      }
      ajax.Action="SetQuestion"
      var F=sessionStorage.getItem('isFind')
      if(F){
        ajax.Action=ajax.Action+'Forget';
      }
      ajax.QuestionID1=this.question1
      ajax.QuestionID2=this.question2
      ajax.QuestionID3=this.question3
      ajax.Question1=this.getTitle(this.question1)
      ajax.Question2=this.getTitle(this.question2)
      ajax.Question3=this.getTitle(this.question3)
      layer.msgWait("正在提交")
      _fetch(ajax).then((json)=>{
          if(json.Code===1) {
            layer.msgWarn(json.StrCode)
            RootApp.AjaxGetInitData(["UserSafeQuestions"],function(){
              router.push('/securityCenter')
            })
          }else{
            layer.msgWarn(json.StrCode)
          }
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
