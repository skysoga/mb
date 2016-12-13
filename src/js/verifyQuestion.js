export default {
  data:()=>{
    return{
      Questions:"",
      question1:"",
      question2:"",
      answer1:"",
      answer2:"",
      nextUrl:""
    }
  },
  beforeRouteEnter:(to,from,next)=>{
    var F=sessionStorage.getItem('isFind')
    var U=localStorage.getItem('UserName')
    if(!(U||F)){
      router.push('/login')
    }
    if(F){
      to.meta.link="/resetWay?Q=ResetPwd"
    }
    next()
  },
  created(){
    var Q=this.$route.query.Q
    if(Q){this.nextUrl=Q.substr(2)}
    var arr = ["UserSafeQuestions"];
    var vm=this
     RootApp.GetInitData(arr,State=>{
      var Nums=vm.doOne()
      vm.Questions=State.UserSafeQuestions
      vm.question1=vm.Questions[Nums[0]].Id
      vm.question2=vm.Questions[Nums[1]].Id
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
      var vm=this
      var ajax = {
        Answer1:this.answer1,
        Answer2:this.answer2
      }
      ajax.Action="VerifyQuestion"
      var F=sessionStorage.getItem('isFind')
      if(F){
        ajax.Action=ajax.Action+'Forget';
      }
      ajax.QuestionID1=this.question1
      ajax.QuestionID2=this.question2
      layer.msgWait("正在提交")
      _fetch(ajax).then((json)=>{
          if(json.Code===1) {
            layer.msgWarn(json.StrCode);
            var url=vm.nextUrl
            url=url?'/'+url:'/setQuestion'
            router.push(url)
          }else{
            layer.msgWarn(json.StrCode);
          }
      })
    },
    doOne(){
      var Arr=[];
      Arr[0]=Math.floor(Math.random()*3)
      Arr[1]=Math.floor(Math.random()*3)
      if(Arr[0]==Arr[1]){
        return this.doOne()
      }else{
        return Arr
      }
    }
  }
}
